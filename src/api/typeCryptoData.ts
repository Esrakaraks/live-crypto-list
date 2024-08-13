/**
 * Represents the sparkline data for the last 7 days.
 * @interface Sparklinein7d
 * @property {number[]} price - Array of prices over the last 7 days.
 */
interface Sparklinein7d {
  price: number[]; // to get the last 24h, get the last 24 items
}


/**
 * Represents the cryptocurrency data.
 * @property {string} id - The unique identifier of the cryptocurrency.
 * @property {string} symbol - The symbol of the cryptocurrency.
 * @property {string} name - The name of the cryptocurrency.
 * @property {string} image - The URL to the cryptocurrency's image.
 * @property {number} current_price - The current price of the cryptocurrency.
 * @property {number} market_cap - The market capitalization of the cryptocurrency.
 * @property {number} price_change_percentage_24h - The percentage change in price over the last 24 hours.
 * @property {Sparklinein7d} sparkline_in_7d - The sparkline data for the last 7 days.(to get the last 24h, get the last 24 items)
 */
export type TypeCryptoData = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: Sparklinein7d;
}

/**
 * Represents an array of cryptocurrency data.
 *
 * @typedef {TypeCryptoData[]} TypeCryptoDataArray
 */
export type TypeCryptoDataArray = TypeCryptoData[];