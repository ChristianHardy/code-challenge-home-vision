import { getEnv } from "../../config";
import { getHouses, House } from "../../__repository/houses";
import { downloadHousePhoto } from "../../__repository/photos";

async function getHouseList(): Promise<House[]> {
	// Get the envs vars
	const { PAGE_LIMIT } = getEnv();

	// Set the promise array
	const promises = [];
	let apiResponse: House[][] = [];

	// Create a promise array just to handle easy
	for (let index = 0; index < PAGE_LIMIT; index++) {
		promises.push(getHouses(index + 1));
	}

	// Execute promises
	try {
		apiResponse = await Promise.all(promises);
	} catch (error) {
		throw new Error("Error getting externals house list from API");
	}

	// Flattening the sub-array elements using ".flat"
	const houses: House[] = apiResponse.flat();

	// Set the response
	const response: House[] = [];

	for (const house of houses) {
		// #1 Download the house image
		const downloadedImage = await downloadHousePhoto(house);

		// #2 Parse the response to be returned
		response.push({
			...house,
			photoURL: downloadedImage,
		});
	}

	return response;
}

export { getHouseList };
