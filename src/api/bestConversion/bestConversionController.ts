import { Request, Response } from 'express';
import { fetchCurrencyRateList } from './modules/fetchCurrencyRateList';
import { filterInvalidConversions } from './modules/filterInvalidConversions';
import { getCurrencyConvertionList } from './modules/getCurrencyConvertionList';
import { writeConversionsInCSV } from './modules/writeConversionsInCSV';
import { Conversion, CurrencyRate } from './types';

/**
 * This controler is responsible for carrying out the conversion steps
 */

export const bestConversionController = async (_: Request, response: Response): Promise<void> => {

    /**
     *  In this step, the list of conversions for each currency will be searched
    */
    const currencyRateList: CurrencyRate[] = await fetchCurrencyRateList();

    /**
     * Here, a filter is performed where isolated nodes will be removed 
     * since it will not be possible for any conversion to pass through it
    */

    const validCurrencyRateList: string[] = filterInvalidConversions(currencyRateList);

    /**
     * In this module, it will be responsible for returning the list of conversions, 
     * where the search for the best path and construction of the object with 
     * the other data of the conversion will be carried out.
    */

    const conversionList: Conversion[] = getCurrencyConvertionList(validCurrencyRateList, currencyRateList);

    /**
     * Here the conversion list will be generated and written to the csv file
    */
    const fileLink: string = await writeConversionsInCSV(conversionList);

    /**
     * as a response from the api we send a link to access the generated file
     */

    response.json({
        file: fileLink
    });

}