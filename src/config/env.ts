require("dotenv").config();
export const PORT: string | undefined = process.env.PORT;
export const NODE_ENV: string | undefined = process.env.NODE_ENV;
export const APP_NAME: string | undefined = process.env.APP_NAME;
export const CURRENCY_RATE_API: string | undefined = process.env.CURRENCY_RATE_API;
export const URL_API: string | undefined = process.env.URL_API;