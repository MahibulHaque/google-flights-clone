export interface IConfigApiQueryResponse {
  status: boolean;
  message: string;
  timestamp: number;
  data: IAirScrapperApiConfig[];
}

export interface IAirScrapperApiConfig {
  country: string;
  countryCode: string;
  market: string;
  currencyTitle: string;
  currency: string;
  currencySymbol: string;
  site: string;
}
