import { Conversion, CurrencyRate } from "../types";
import { getCurrencyConversionList } from "./getCurrencyConversionList";

describe('Get Currency Conversion List - Unit Test', () => {
    it(' 1) Should return the correct list value as expected', () => {
        const currencyRateArrayTest = [
            {
                "exchangeRate": 2,
                "fromCurrencyCode": "CAD",
                "fromCurrencyName": "Canada Dollar",
                "toCurrencyCode": "HKD",
                "toCurrencyName": "Hong Kong Dollar"
            },
            {
                "exchangeRate": 3,
                "fromCurrencyCode": "HKD",
                "fromCurrencyName": "Hong Kong Dollar",
                "toCurrencyCode": "PHP",
                "toCurrencyName": "Philippines Peso"
            },
            {
                "exchangeRate": 4,
                "fromCurrencyCode": "PHP",
                "fromCurrencyName": "Philippines Peso",
                "toCurrencyCode": "USD",
                "toCurrencyName": "USA Dollar"
            }
        ] as CurrencyRate[];
        const validListTest = ['CAD', 'HKD', 'PHP'] as string[];

        const expectedList = [
            {
                "amount": 100,
                "country": "Canada Dollar",
                "currency": "CAD",
                "path": "CAD",
            },
            {
                "amount": 200,
                "country": "Hong Kong Dollar",
                "currency": "HKD",
                "path": "CAD | HKD",
            },
            {
                "amount": 600,
                "country": "Philippines Peso",
                "currency": "PHP",
                "path": "CAD | HKD | PHP",
            }
        ] as Conversion[]
        const resultList = getCurrencyConversionList(validListTest, currencyRateArrayTest);
        expect(resultList).toStrictEqual(expectedList);
    });
});