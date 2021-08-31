import axios from "axios";
import axiosRetry from 'axios-retry';
import { getEnv } from "../../config";
import { toNumber } from "../../__helpers/parsers/_toNumber";
import { House, HouseAPIResponse } from "./__types";

// Get the envs & set a exponential backoff to make a retry
const env = getEnv();

axiosRetry(axios, {
	retries: env.MAX_RETRIES,
	retryDelay: axiosRetry.exponentialDelay,
});

/**
 * Call a external API
 * to get the house list
 * @param pageNumber - The page to get the list
 * @returns - Houses in a especific page number
 */
async function getHouses(pageNumber?: number): Promise<House[]> {
	// Set the page number, by default is 1
	const page = toNumber(pageNumber, 1);

	// Set the API path
	const apiPath = `${env.API_PATH}/api_project/houses?page=${page}`;

	// Make a external API request
	try {
		console.log(`➡️ Getting houses from service, page N° ${page}`);

		const res = await axios.get<HouseAPIResponse>(apiPath);

		console.log(`✅ Done!, page N° ${page}`);
		return res.data.houses;
	} catch (error) {
		throw new Error(`External API fails after ${env.MAX_RETRIES} retry attempts`);
	}
}

export { getHouses };
