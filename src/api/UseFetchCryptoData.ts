import { useQuery } from '@tanstack/react-query';
import { TypeCryptoData } from './typeCryptoData';
import { getCryptoDataAPI } from './apiurls';


const UseFetchCryptoData = (page: number, perPage: number) => {
  
    return useQuery<TypeCryptoData[], Error>({
      queryKey: ['cryptoData', page, perPage],
        queryFn: async () => {
        
          try {
            const response = await fetch(getCryptoDataAPI(page, perPage));
            return response.json();
          } catch (error) {
            console.log('errorrr', error);
          }
          
        },
      });
};

export default UseFetchCryptoData;
