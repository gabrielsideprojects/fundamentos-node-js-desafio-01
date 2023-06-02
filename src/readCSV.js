import fs from 'node:fs';
import {parse} from 'csv-parse';
import fetch from "node-fetch";

const CSVPath = new URL('./data.csv', import.meta.url)

const stream = fs.createReadStream(CSVPath);

const parser = parse({
delimiter: ',',    
skipEmptyLines: true,
fromLine:2})

async function readCSVAndSendToApi() {
    const csvParsedLines = stream.pipe(parser)
    for await (const line of csvParsedLines) {
        const [title, description] = line
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description})
        };
        await fetch('http://localhost:3333/task', requestOptions)
    }
}

readCSVAndSendToApi()


