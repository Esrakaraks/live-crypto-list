export type TypeCryptoData= {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: Sparklinein7d;
}

interface Sparklinein7d {
  price: number[];
}
export type TypeCryptoDataArray = TypeCryptoData[];