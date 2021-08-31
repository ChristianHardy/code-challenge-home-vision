import { getHouseList } from "./server/houses/list";

// Execute the house list function
getHouseList().catch(error => console.log(error));
