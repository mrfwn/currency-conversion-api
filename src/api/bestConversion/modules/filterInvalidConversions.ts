import { CurrencyRate, DefaultCurrency } from "../types";

/**
 * This is the function that performs the filter of currencies that are not the origin (CAD) 
 * and are not the destination of any other currency, thus being an isolated node.
 * For that, we go through the list of conversions and insert in two set arrays to have values unique, 
 * done that we look for elements that are origin but not destinations, 
 * with the exception of the origin node (CAD)
 */

export const filterInvalidConversions = (currencyRateTree: CurrencyRate[]): string[] => {
    const sourceCurrencies = new Set<string>();
    const destinationCurrencies = new Set<string>();

    currencyRateTree.forEach((currency: CurrencyRate) => {
        sourceCurrencies.add(currency.fromCurrencyCode);
        destinationCurrencies.add(currency.toCurrencyCode);
    });
    const currencyListValid = Array
        .from(sourceCurrencies)
        .filter(el => destinationCurrencies.has(el) || el === DefaultCurrency.Code);

    return currencyListValid
}