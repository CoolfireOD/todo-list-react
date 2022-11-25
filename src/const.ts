if (process.env.REACT_APP_API_DOMAIN === undefined)
  throw new Error("REACT_APP_API_DOMAIN env variable is not set");

export const BASE_URL: string = process.env.REACT_APP_API_DOMAIN;
