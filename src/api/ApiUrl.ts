
/**
 * Constructs the URL to fetch cryptocurrency data from the CoinGecko API.
 *
 * @param {number} page - The page number to retrieve.
 * @param {number} perPage - The number of cryptocurrencies to retrieve per page.
 * @returns {string} The URL to fetch cryptocurrency data.
 */
const BASE_URL = 'https://api.coingecko.com/api/v3/coins/markets';
export const getCryptoDataAPI = (page: number, perPage: number) =>
  `${BASE_URL}?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true`;
