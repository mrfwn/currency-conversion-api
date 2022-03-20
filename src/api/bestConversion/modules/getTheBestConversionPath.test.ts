import { CurrencyRate, CurrencyRateAGraph } from "../types";
import { buildCurrencyRateGraph, findForShortestConvertionPath, getTheBestConversionPath, updateCurrencyRateGraphWeights } from "./getTheBestConversionPath";

describe('Get The Best Conversion Path - Unit Test', () => {
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
        const expectedList = ["CAD", "HKD", "PHP", "USD"] as string[];
        const resultList = getTheBestConversionPath('CAD', 'USD', currencyRateArrayTest);
        expect(resultList).toStrictEqual(expectedList);
    });
    it('2) Should return the correct choose path', () => {
        const currencyRateArrayTest = [
            {
                "exchangeRate": 2,
                "fromCurrencyCode": "CAD",
                "fromCurrencyName": "Canada Dollar",
                "toCurrencyCode": "HKD",
                "toCurrencyName": "Hong Kong Dollar"
            },
            {
                "exchangeRate": 10,
                "fromCurrencyCode": "CAD",
                "fromCurrencyName": "Canada Dollar",
                "toCurrencyCode": "ERRORP1",
                "toCurrencyName": "Error P1"
            },
            {
                "exchangeRate": 10,
                "fromCurrencyCode": "ERRORP1",
                "fromCurrencyName": "Error P1",
                "toCurrencyCode": "ERRORP2",
                "toCurrencyName": "Error P2"
            },
            {
                "exchangeRate": 3,
                "fromCurrencyCode": "ERRORP2",
                "fromCurrencyName": "Error P2",
                "toCurrencyCode": "PHP",
                "toCurrencyName": "Philippines Peso"
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
        const expectedList = ["CAD", "HKD", "PHP", "USD"] as string[];
        const resultList = getTheBestConversionPath('CAD', 'USD', currencyRateArrayTest);
        expect(resultList).toStrictEqual(expectedList);
    })
});

describe('Build Currency Rate Graph - Unit Test', () => {
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
        const expectedObject = {
            "CAD": {
                "name": "CAD",
                "nodes": [
                    {
                        "exchangeRate": 2,
                        "fromCurrencyCode": "CAD",
                        "fromCurrencyName": "Canada Dollar",
                        "toCurrencyCode": "HKD",
                        "toCurrencyName": "Hong Kong Dollar",
                    },
                ],
                "weight": 0,
            },
            "HKD": {
                "name": "HKD",
                "nodes": [
                    {
                        "exchangeRate": Number.MAX_VALUE,
                        "fromCurrencyCode": "HKD",
                        "fromCurrencyName": "Hong Kong Dollar",
                        "toCurrencyCode": "CAD",
                        "toCurrencyName": "Canada Dollar",
                    },
                    {
                        "exchangeRate": 3,
                        "fromCurrencyCode": "HKD",
                        "fromCurrencyName": "Hong Kong Dollar",
                        "toCurrencyCode": "PHP",
                        "toCurrencyName": "Philippines Peso",
                    },
                ],
                "weight": Number.MAX_VALUE,
            },
            "PHP": {
                "name": "PHP",
                "nodes": [
                    {
                        "exchangeRate": Number.MIN_VALUE,
                        "fromCurrencyCode": "PHP",
                        "fromCurrencyName": "Philippines Peso",
                        "toCurrencyCode": "HKD",
                        "toCurrencyName": "Hong Kong Dollar",
                    },
                    {
                        "exchangeRate": 4,
                        "fromCurrencyCode": "PHP",
                        "fromCurrencyName": "Philippines Peso",
                        "toCurrencyCode": "USD",
                        "toCurrencyName": "USA Dollar",
                    },
                ],
                "weight": Number.MAX_VALUE,
            },
            "USD": {
                "name": "USD",
                "nodes": [
                    {
                        "exchangeRate": Number.MIN_VALUE,
                        "fromCurrencyCode": "USD",
                        "fromCurrencyName": "USA Dollar",
                        "toCurrencyCode": "PHP",
                        "toCurrencyName": "Philippines Peso",
                    },
                ],
                "weight": Number.MAX_VALUE,
            },
        } as CurrencyRateAGraph;
        const resultList = buildCurrencyRateGraph('CAD', currencyRateArrayTest);
        expect(resultList).toStrictEqual(expectedObject);
    });
})

describe('Update Currency Rate Graph Weights - Unit Test', () => {
    it(' 1) Should return the correct Object value as expected', () => {
        const currencyRateInitialGraphTest = {
            "CAD": {
                "name": "CAD",
                "nodes": [
                    {
                        "exchangeRate": 2,
                        "fromCurrencyCode": "CAD",
                        "fromCurrencyName": "Canada Dollar",
                        "toCurrencyCode": "HKD",
                        "toCurrencyName": "Hong Kong Dollar",
                    },
                ],
                "weight": 0,
            },
            "HKD": {
                "name": "HKD",
                "nodes": [
                    {
                        "exchangeRate": Number.MAX_VALUE,
                        "fromCurrencyCode": "HKD",
                        "fromCurrencyName": "Hong Kong Dollar",
                        "toCurrencyCode": "CAD",
                        "toCurrencyName": "Canada Dollar",
                    },
                    {
                        "exchangeRate": 3,
                        "fromCurrencyCode": "HKD",
                        "fromCurrencyName": "Hong Kong Dollar",
                        "toCurrencyCode": "PHP",
                        "toCurrencyName": "Philippines Peso",
                    },
                ],
                "weight": Number.MAX_VALUE,
            },
            "PHP": {
                "name": "PHP",
                "nodes": [
                    {
                        "exchangeRate": Number.MIN_VALUE,
                        "fromCurrencyCode": "PHP",
                        "fromCurrencyName": "Philippines Peso",
                        "toCurrencyCode": "HKD",
                        "toCurrencyName": "Hong Kong Dollar",
                    },
                    {
                        "exchangeRate": 4,
                        "fromCurrencyCode": "PHP",
                        "fromCurrencyName": "Philippines Peso",
                        "toCurrencyCode": "USD",
                        "toCurrencyName": "USA Dollar",
                    },
                ],
                "weight": Number.MAX_VALUE,
            },
            "USD": {
                "name": "USD",
                "nodes": [
                    {
                        "exchangeRate": Number.MIN_VALUE,
                        "fromCurrencyCode": "USD",
                        "fromCurrencyName": "USA Dollar",
                        "toCurrencyCode": "PHP",
                        "toCurrencyName": "Philippines Peso",
                    },
                ],
                "weight": Number.MAX_VALUE,
            },
        } as CurrencyRateAGraph;

        const expectedObject = {
            "CAD": {
                "name": "CAD",
                "nodes": [
                    {
                        "exchangeRate": 2,
                        "fromCurrencyCode": "CAD",
                        "fromCurrencyName": "Canada Dollar",
                        "toCurrencyCode": "HKD",
                        "toCurrencyName": "Hong Kong Dollar",
                    },
                ],
                "weight": 0,
            },
            "HKD": {
                "name": "HKD",
                "nodes": [
                    {
                        "exchangeRate": Number.MAX_VALUE,
                        "fromCurrencyCode": "HKD",
                        "fromCurrencyName": "Hong Kong Dollar",
                        "toCurrencyCode": "CAD",
                        "toCurrencyName": "Canada Dollar",
                    },
                    {
                        "exchangeRate": 3,
                        "fromCurrencyCode": "HKD",
                        "fromCurrencyName": "Hong Kong Dollar",
                        "toCurrencyCode": "PHP",
                        "toCurrencyName": "Philippines Peso",
                    },
                ],
                "weight": 2,
            },
            "PHP": {
                "name": "PHP",
                "nodes": [
                    {
                        "exchangeRate": Number.MIN_VALUE,
                        "fromCurrencyCode": "PHP",
                        "fromCurrencyName": "Philippines Peso",
                        "toCurrencyCode": "HKD",
                        "toCurrencyName": "Hong Kong Dollar",
                    },
                    {
                        "exchangeRate": 4,
                        "fromCurrencyCode": "PHP",
                        "fromCurrencyName": "Philippines Peso",
                        "toCurrencyCode": "USD",
                        "toCurrencyName": "USA Dollar",
                    },
                ],
                "weight": 5,
            },
            "USD": {
                "name": "USD",
                "nodes": [
                    {
                        "exchangeRate": Number.MIN_VALUE,
                        "fromCurrencyCode": "USD",
                        "fromCurrencyName": "USA Dollar",
                        "toCurrencyCode": "PHP",
                        "toCurrencyName": "Philippines Peso",
                    },
                ],
                "weight": 9,
            },
        } as CurrencyRateAGraph
        const resultList = updateCurrencyRateGraphWeights(currencyRateInitialGraphTest);
        expect(resultList).toStrictEqual(expectedObject);
    });
})

describe('Find For Shortest Convertion Path - Unit Test', () => {
    it(' 1) Should return the correct List value as expected', () => {
        const currencyRateGraphAfterUpdateTest = {
            "CAD": {
                "name": "CAD",
                "nodes": [
                    {
                        "exchangeRate": 2,
                        "fromCurrencyCode": "CAD",
                        "fromCurrencyName": "Canada Dollar",
                        "toCurrencyCode": "HKD",
                        "toCurrencyName": "Hong Kong Dollar",
                    },
                ],
                "weight": 0,
            },
            "HKD": {
                "name": "HKD",
                "nodes": [
                    {
                        "exchangeRate": Number.MAX_VALUE,
                        "fromCurrencyCode": "HKD",
                        "fromCurrencyName": "Hong Kong Dollar",
                        "toCurrencyCode": "CAD",
                        "toCurrencyName": "Canada Dollar",
                    },
                    {
                        "exchangeRate": 3,
                        "fromCurrencyCode": "HKD",
                        "fromCurrencyName": "Hong Kong Dollar",
                        "toCurrencyCode": "PHP",
                        "toCurrencyName": "Philippines Peso",
                    },
                ],
                "weight": 2,
            },
            "PHP": {
                "name": "PHP",
                "nodes": [
                    {
                        "exchangeRate": Number.MIN_VALUE,
                        "fromCurrencyCode": "PHP",
                        "fromCurrencyName": "Philippines Peso",
                        "toCurrencyCode": "HKD",
                        "toCurrencyName": "Hong Kong Dollar",
                    },
                    {
                        "exchangeRate": 4,
                        "fromCurrencyCode": "PHP",
                        "fromCurrencyName": "Philippines Peso",
                        "toCurrencyCode": "USD",
                        "toCurrencyName": "USA Dollar",
                    },
                ],
                "weight": 5,
            },
            "USD": {
                "name": "USD",
                "nodes": [
                    {
                        "exchangeRate": Number.MIN_VALUE,
                        "fromCurrencyCode": "USD",
                        "fromCurrencyName": "USA Dollar",
                        "toCurrencyCode": "PHP",
                        "toCurrencyName": "Philippines Peso",
                    },
                ],
                "weight": 9,
            },
        } as CurrencyRateAGraph;
        const expectedList = ["CAD", "HKD", "PHP", "USD"] as string[];
        const resultList = findForShortestConvertionPath('CAD', 'USD', currencyRateGraphAfterUpdateTest);
        expect(resultList).toStrictEqual(expectedList);
    });
})