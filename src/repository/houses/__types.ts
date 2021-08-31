/*------------------------------------------------------------------------
 * Types for Hose attributes
 -----------------------------------------------------------------------*/
export interface House {
	id: number;
	address: string;
	homeowner: string;
	price: number;
	photoURL: string;
}

/*------------------------------------------------------------------------
 * Types for House List
 -----------------------------------------------------------------------*/
export interface HouseList {
	houses: House[];
}
