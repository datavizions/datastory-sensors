import fs from 'fs'
import {parse} from '@elekcsv/core'

import type { QuestionsMetadata, Category } from './types'
import {preprocess} from './preprocess'
import {answers} from './repsonses'
import { parseMetadata } from './parser'

// load survey data sample file for testing 
// to do: later use the full survey dataset here
const csvSurveyData = fs.readFileSync('src/data/Daten_Werte_Sensoren_sample.csv', 'utf8')
const metadata:  Record<string, QuestionsMetadata> = parseMetadata()

const result = parse(csvSurveyData, {
    header: true,
    delimiter: ';'
}) as any

const headers: string[] = result.headers
const rows: any[] = result.rows ?? []

const collected: Record<string, any> = {}

headers.forEach((header, index) =>{
    const values = rows.map(row => {
        const raw = 
            Array.isArray(row)
                ? row[index]
                : row[header];

        return preprocess(raw)
    
    });

    // map csv columns to codes

    const key = header.replace(/_\d+$/, '')
    const meta = metadata[header] ?? metadata[key] ?? null;

    collected[header] = {
        label: meta?.label ?? header,
        category: meta?.category ?? "Unbekannt",
        description: meta?.description ?? null,
        values,
        answers: answers(values)
    };

})

// save to json objects to later use for analysis 
// rows and colums to look at individual data and use rows to statistically compute stats

 fs.writeFileSync('src/data/rows.json', 
        JSON.stringify(
            rows.map((row) => {
                const object: Record <string, any> = {}
                headers.forEach((header, index) => {
                    const raw = Array.isArray(row) ? row[index] : row[header]
                    object[header] = preprocess(raw)
                })
                return object
            }),
            null, 2
    ))

  fs.writeFileSync(
        'src/data/columns.json',
        JSON.stringify(collected, null, 2))