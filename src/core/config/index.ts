import packageJson from '../../../package.json';

export interface IConfigValue {
  appName: string;
  appVersion: string;
  apiBaseUrl: string;
  apiHostname: string;
  apiKey: string;
  apiVersion: string;
  locale: string;
}

export const CONFIG: IConfigValue = {
  appName: 'Google Flight',
  appVersion: packageJson.version,
  apiBaseUrl: import.meta.env.VITE_BASE_API_URL,
  apiHostname: import.meta.env.VITE_RAPID_API_HOSTNAME,
  apiKey: import.meta.env.VITE_RAPID_API_KEY,
  apiVersion: '/api/v1/',
  locale: 'en-US',
};
