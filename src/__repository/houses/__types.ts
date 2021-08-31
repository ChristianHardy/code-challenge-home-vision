/*------------------------------------------------------------------------
 * Types for Hose attributes
 -----------------------------------------------------------------------*/
export type House = {
	id: number;
	address: string;
	homeowner: string;
	price: number;
	photoURL: string;
};

/*------------------------------------------------------------------------
 * Types for Hose list external API response
 -----------------------------------------------------------------------*/
export type HouseAPIResponse = {
	houses: House[];
	ok: boolean;
};
