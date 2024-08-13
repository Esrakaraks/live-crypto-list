import { useQuery } from '@tanstack/react-query';
import { TypeCryptoData } from './TypeCryptoData';
import { getCryptoDataAPI } from './ApiUrl';

/**
 * A custom hook to fetch cryptocurrency data using React Query.
 * @param {number} page - The current page number for pagination.
 * @param {number} perPage - The number of items to fetch per page.
 * @returns {object} - The result of the query, which includes data, status, and error if any.
 *
 * @property {TypeCryptoData[]} data - The array of cryptocurrency data.
 * @example
 * const { data, status, error } = UseFetchCryptoData(1, 50);
 */

const UseFetchCryptoData = (page: number, perPage: number) => {
  
    return useQuery<TypeCryptoData[], Error>({
      queryKey: ['cryptoData', page, perPage],
        queryFn: async () => {
        
          try {
            const response = await fetch(getCryptoDataAPI(page, perPage));
            return response.json();
          } catch (error) {
            console.log('error', error);
            throw error;
          }
        },
      });
};

export default UseFetchCryptoData;
