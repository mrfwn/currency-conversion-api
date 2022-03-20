import { CurrencyRate } from "../types";
import { filterInvalidConversions } from "./filterInvalidConversions";

describe('Filter Invalid Conversions Unit Test', () => {

    it(' 1) Should return the correct filter value as expected', () => {
        const currencyRateArrayTest = [
            {
                "exchangeRate": 6.169552813730895,
                "fromCurrencyCode": "CAD",
                "fromCurrencyName": "Canada Dollar",
                "toCurrencyCode": "HKD",
                "toCurrencyName": "Hong Kong Dollar"
            },
            {
                "exchangeRate": 0.7974982615150782,
                "fromCurrencyCode": "HKD",
                "fromCurrencyName": "Hong Kong Dollar",
                "toCurrencyCode": "USD",
                "toCurrencyName": "USA Dollar"
            },
            {
                "exchangeRate": 0.5737005434864729,
                "fromCurrencyCode": "PHP",
                "fromCurrencyName": "Philippines Peso",
                "toCurrencyCode": "HKD",
                "toCurrencyName": "Hong Kong Dollar"
            }
        ] as CurrencyRate[];
        const expectedList = ['CAD', 'HKD'] as string[];

        const resultList = filterInvalidConversions(currencyRateArrayTest);
        expect(resultList).toStrictEqual(expectedList);
    });
    it(' 2) Should return the list with the default value even if it is not destination', () => {
        const currencyRateArrayTest = [
            {
                "exchangeRate": 6.169552813730895,
                "fromCurrencyCode": "CAD",
                "fromCurrencyName": "Canada Dollar",
                "toCurrencyCode": "BRL",
                "toCurrencyName": "Brazil Real"
            },
            {
                "exchangeRate": 0.7974982615150782,
                "fromCurrencyCode": "HKD",
                "fromCurrencyName": "Hong Kong Dollar",
                "toCurrencyCode": "USD",
                "toCurrencyName": "USA Dollar"
            },
            {
                "exchangeRate": 0.5737005434864729,
                "fromCurrencyCode": "USD",
                "fromCurrencyName": "USA Dollar",
                "toCurrencyCode": "PHP",
                "toCurrencyName": "Philippines Peso"
            },
            {
                "exchangeRate": 0.5737005434864729,
                "fromCurrencyCode": "PHP",
                "fromCurrencyName": "Philippines Peso",
                "toCurrencyCode": "HKD",
                "toCurrencyName": "Hong Kong Dollar"
            }
        ] as CurrencyRate[];
        const expectedList = ['CAD', 'HKD', 'USD', 'PHP'] as string[];

        const resultList = filterInvalidConversions(currencyRateArrayTest);
        expect(resultList).toStrictEqual(expectedList);
    });
    it(' 3) Should return an empty array for an empty input', () => {
        const currencyRateArrayTest = [] as CurrencyRate[];
        const expectedList = [] as string[];

        const resultList = filterInvalidConversions(currencyRateArrayTest);
        expect(resultList).toStrictEqual(expectedList);
    });
})