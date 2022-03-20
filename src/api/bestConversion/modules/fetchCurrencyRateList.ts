import axios from "axios";
import { CURRENCY_RATE_API } from "../../../config/env";
import AppError from "../../../errors/AppError";
import { CurrencyRate } from "../types";

/**
 * This is the function responsible for fetching the data in the forced endpoint, 
 * where we will use axios to perform this request
 */

export const fetchCurrencyRateList = async (): Promise<CurrencyRate[]> => {
    try {
        const url = `${CURRENCY_RATE_API}/currency-conversion?seed=43038`
        const { data } = await axios.get<CurrencyRate[]>(url);
        return data;
    } catch (error: any) {
        throw new AppError(error.message, 502);
    }
}