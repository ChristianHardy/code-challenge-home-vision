import { getEnv } from "../../config";
import { getHouses, House } from "../../__repository/houses";

async function getHouseList(): Promise<House[]> {
	// Get the envs vars
	const env = getEnv();

	// Set the promise array
	const promises = [];

	for (let index = 0; index < env.PAGE_LIMIT; index++) {
		promises.push(getHouses(index + 1));
	}

	// Execute promises
	try {
		const responses = await Promise.all(promises);
		console.log(JSON.stringify(responses));
	} catch (error) {
		throw new Error("Error getting externals house list from API");
	}

	return [];
}

export { getHouseList };
