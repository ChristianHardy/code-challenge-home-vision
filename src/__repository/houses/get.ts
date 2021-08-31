import axios from "axios";
import { getEnv } from "../../config";
import { toNumber } from "../../__helpers/parsers/_toNumber";
import { House, HouseAPIResponse } from "./__types";
import axiosRetry from 'axios-retry';

// Get the envs & set a exponential backoff to make a retry
const env = getEnv();

axiosRetry(axios, {
	retries: env.MAX_RETRIES,
	retryDelay: axiosRetry.exponentialDelay,
	
});

async function getHouses(pageNumber?: number): Promise<House[]> {
	// Set the page number, by default is 1
	const page = toNumber(pageNumber, 1);

	// Set the API path
	const apiPath = `${env.API_PATH}/api_project/houses?page=${page}`;

	// Make a external API request
	try {
		const res = await axios.get<HouseAPIResponse>(apiPath);
		return res.data.houses;
	} catch (error) {
		throw new Error(`External API fails after ${env.MAX_RETRIES} retry attempts`);
	}
}

export { getHouses };
