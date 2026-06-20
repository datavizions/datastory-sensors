import { describe, expect, it } from "vitest";

import { barList, distribution, mapCharts, percentage, getColumns, type Cols } from "../charts";

describe('charts functionalities', () => {
    it('gets answers and perentages from rows', () => {
        const rows = [
            {f1: '1', f2A1: '1'},
            {f1: '1', f2A1: '0'},
            {f1: '2', f2A1: 'null'},
            {f1: null, f2A1: '1'},
        ]

        const meta = {
            f1: {label: 'Frage 1'},
            f2A1: {label: 'Ich nehme Sensoren im öffentlichen Raum wahr'},
        }

        const cols = getColumns(rows, meta)

        expect(cols.f1.values).toEqual(['1','1','2',null])
        expect(cols.f1.answers).toEqual([
            {answer: '1', count:2, percent: 67},
            {answer: '2', count:1, percent: 33} // check percentage
        ])
    })

    it('perentages for selected answer values', () => {
        const col = {
            values: ['1','1','2',null],
            answers: [
                {answer: '1', count: 2 },
                {answer: '2', count: 1 },
            ],
        } as any
          

        expect(percentage(col, ['1'])).toBe(67)
        expect(percentage(col, ['1', '2'])).toBe(100)
        expect(percentage(undefined, ['1'])).toBe(0)
    })

    it('distribution list with mapped labels', () => {
        const col = {
            values: ['1','1','2',null],
            answers: [
                {answer: '1', count: 1 }
            ],
        } as any
          

        expect(distribution(col, { '1': '', '2': ''})).toEqual([
            {answer: '1', label: '', count:1, percent: 33}
        ])
    })

    it('bars', () => {
        const col: Cols = {
            f2A1: {
            label: 'Ich nehme Sensoren im öffentlichen Raum wahr.',
            values: ['1','1','2',null],
            answers: [
                {answer: '1', count: 2 },
            ],
            },
            f2A2: {
            label: 'Ich kann mind. einen konkreten Ort benennen, an dem sich ein Sensor im öffentlichen Raum befindet.',
            values: ['1','1',null,null],
            answers: [
                {answer: '1', count: 2 },
            ],
            },
           
        } as any
          
// check code label mapping 
        expect(barList(col, [ 'missing', 'f2A1', 'f2A2'])).toEqual([
            {code: 'Ich nehme Sensoren im öffentlichen Raum wahr.', label: 'Ich nehme Sensoren im öffentlichen Raum wahr.', count:2, percent: 67},
            {code: 'Ich kann mind. einen konkreten Ort benennen, an dem sich ein Sensor im öffentlichen Raum befindet.', label: 'Ich kann mind. einen konkreten Ort benennen, an dem sich ein Sensor im öffentlichen Raum befindet.', count:2, percent: 67},
        ])
    })

    it('chart specification check', () => {
        const cols: Cols = {
            f1: {
            label: 'Frage 1',
            values: ['1','2', null],
            answers: [
                {answer: '1', count: 2 },
                {answer: '2', count: 2 },
                {answer: '3', count: 2 },
            ],
            },
            f6A3: {
            label: 'Sensoren im öffentlichen Raum erzeugen ein Überwachungsgefühl.',
            values: ['1','2',null],
            answers: [
                {answer: '1', count: 1 },
                {answer: '2', count: 1 },
            ],
        },     
    }

    const charts = mapCharts(cols)

    // welhe chart typen werden verwendet
    expect(charts.einstellungtechnik.type).toBe('distribution')
    expect(charts.überwachungsgefühl.type).toBe('distribution')
    expect(charts.überwachungsgefühl.description).toBe('Anteil: trifft voll zu + trifft eher zu')
    })
})
