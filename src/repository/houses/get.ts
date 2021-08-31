import { HouseList } from "./__types";
import axios from "axios";
import { toNumber } from "../../__helpers/parsers/_toNumber";

async function getHouses(pageNumber?: number): Promise<HouseList> {
	// Set the page number, by default is 1
	const page = toNumber(pageNumber, 1);
	
}
