export type CurrencyRate = {
    exchangeRate: number;
    fromCurrencyCode: string;
    fromCurrencyName: string;
    toCurrencyCode: string;
    toCurrencyName: string;
}

export type Conversion = {
    currency: string;
    country: string;
    amount: number;
    path: string;
}

export enum DefaultCurrency {
    Code = 'CAD',
    Value = 100
}

export type CurrencyRateAGraph = { [T: string]: { name: string, nodes: CurrencyRate[], weight: number } }
