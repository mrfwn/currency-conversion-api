import { createObjectCsvWriter } from "csv-writer";
import { ObjectCsvWriterParams } from "csv-writer/src/lib/csv-writer-factory";
import { ObjectStringifierHeader } from "csv-writer/src/lib/record";
import path from "path";
import { URL_API } from "../../../config/env";
import AppError from "../../../errors/AppError";
import { Conversion } from "../types";

export const defaultPath: string = path.join(__dirname, '..', '..', '..', '..', 'tmp');

/**
 * This function performs the creation and writing of the conversions in the CSV file, 
 * we use the csv-writer library, and we return the link to access the file.
 */

export const writeConversionsInCSV = async (conversions: Conversion[]): Promise<string> => {
    try {
        const fileName = `currency_convertion_${Date.now()}.csv`;
        const filePath: string = path.join(defaultPath, fileName);

        const csvHeader: ObjectStringifierHeader = [
            { id: 'currency', title: 'Currency Code' },
            { id: 'country', title: 'Country' },
            { id: 'amount', title: 'Amount of currency' },
            { id: 'path', title: 'Path' },
        ]

        const csvWriterParams: ObjectCsvWriterParams = {
            path: filePath,
            header: csvHeader
        }

        const csvWriter = createObjectCsvWriter(csvWriterParams);

        await csvWriter.writeRecords(conversions);

        const fileLink = `${URL_API}/files/${fileName}`

        return fileLink;

    } catch (err: any) {
        throw new AppError(err.message, 500);
    }
}