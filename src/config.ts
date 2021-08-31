import dotenv from "dotenv";
import { toNumber, toStr } from "./__helpers";

// Start dotenv configuration
dotenv.config();

type EnvironmentVariables = {
	// Application vars
	API_PATH: string;
	PAGE_LIMIT: number;
	MAX_RETRIES: number;
};

function getEnv(): EnvironmentVariables {
	return {
		// Application vars
		API_PATH: toStr(process.env.API_PATH, "http://app-homevision-staging.herokuapp.com"),
		PAGE_LIMIT: toNumber(process.env.PAGE_LIMIT, 5),
		MAX_RETRIES: toNumber(process.env.MAX_RETRIES, 3),
	};
}

export { EnvironmentVariables, getEnv };
