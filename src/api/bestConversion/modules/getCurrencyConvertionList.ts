import { Conversion, CurrencyRate, DefaultCurrency } from "../types";
import { getTheBestConvertion } from "./getTheBestConversion";

/**
 * This function is responsible for building the list of conversions
 */
export const getCurrencyConvertionList = (validCurrencyList: string[], currencyRateList: CurrencyRate[]): Conversion[] => {
    /**
     * Given the list of valid currencies, we will go one by one to identify the best conversion
     */
    return validCurrencyList.map(currency => {
        /**
         * This will be the function responsible for informing the best conversion path for each currency
         */
        const pathList = getTheBestConvertion(DefaultCurrency.Code, currency, currencyRateList);

        /**
         * This function is responsible for carrying out the search 
         * for the name of the country of the final currency
         */
        const country = getCountryInformation(currencyRateList, currency);

        /**
         * This function is responsible for calculating the final amount received in final currency amounts
         */
        const amount = getAmountInformation(pathList, currencyRateList);

        return {
            currency,
            country,
            amount,
            path: pathList.join(' | ')
        };
    });
}

/**
 * This is the function responsible for the search for the name of the country of the currency, 
 * for this a search is carried out in the list of currency rate for the code of the currency, 
 * after which the resulting object contains the information of the country
 */
export const getCountryInformation = (currencyRateList: CurrencyRate[], currency: string): string =>
    (currencyRateList.find(({ fromCurrencyCode }) => fromCurrencyCode === currency)?.fromCurrencyName) ?? '';

/**
 * This is the function that calculates the final amount after the conversions, 
 * for this it is necessary to go through the list of the best conversion path, 
 * and for each conversion it is multiplied with the total amount that by default starts at $100CAD
 */
export const getAmountInformation = (pathList: string[], currencyRateList: CurrencyRate[]): number => {
    return pathList.reduce((acc, currencyNode, index) => {

        const nextNode = pathList[index + 1];

        if (nextNode) {
            const currencyElement = currencyRateList.find(el =>
                el.fromCurrencyCode === currencyNode
                && nextNode === el.toCurrencyCode);

            return acc * (currencyElement?.exchangeRate ?? 1);
        }

        return Number(acc.toFixed(6));

    }, DefaultCurrency.Value as number);

}