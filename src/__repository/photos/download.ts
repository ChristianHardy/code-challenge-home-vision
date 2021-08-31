import { House } from "../houses";
import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import { getEnv } from "../../config";

/**
 * Download a file from internet
 * and save it in the local FS
 * @param house - The house attributes
 * @returns - The new path in the FS
 */
async function downloadHousePhoto(house: House): Promise<string> {
	// Get the envs
	const env = getEnv();

	// Create the folder if not exists
	if (!fs.existsSync(env.IMAGE_FOLDER_NAME)) {
		fs.mkdirSync(env.IMAGE_FOLDER_NAME);
	}

	// Set the formatted & clean address
	const cleanAddess = house.address
	.replace(/\./g, "")
	.replace(/,/g, "")
	.replace(/ /g, "-");

	// Get the file type using simple split pop
	const fileExt = house.photoURL.split(".").pop();

	// Set the ID
	const id = house.id.toString().padStart(3, "0");

	// Set the image name
	const imageName = `id-${id}-${cleanAddess}.${fileExt}`;

	// Set the full file path
	// const filePath = `images/${imageName}`
	const filePath = path.resolve(env.IMAGE_FOLDER_NAME, imageName);
	const fileWriter = fs.createWriteStream(filePath);

	try {
		console.log(`➡️ Downloading photo from house ID ${house.id}`);

		const res = await axios.get(house.photoURL, {
			responseType: "stream",
		});

		res.data.pipe(fileWriter);

		console.log(`✅ Done!, house ID ${house.id}`);
		return filePath;
	} catch (error) {
		throw new Error(`Error downloading image from internet`);
	}
}

export { downloadHousePhoto };
