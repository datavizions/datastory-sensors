import { answers } from "./repsonses"

export interface Answers {
    answer: string
    count: number
    percent?: number
}

export interface Col {
    label: string
    category?: string
    description?: string | null
    values: any[]
    answers: Answers[]
}

export type Cols = Record<string, Col>

export type ColsMetadata = Record<string, {
    label: string,
    category?: string,
    description?: string | null
}>

// get columns from filtered rows

export function getColumns(
    rows: Record<string, any>[],
    meta: ColsMetadata
): Cols {
    const result: Cols = {}
    for (const key in meta) {
        const values = rows.map(r => r[key] ?? null)
        const n = values.filter(v => v !==null).length
        const counts: Record<string,number> = {}

        values.forEach(v =>{
            if (v === null) return
            const k = String(v)
            counts[k] = (counts[k] || 0) + 1
        })
        result[key] = {
            ...meta[key],
            values,
            answers: Object.entries(counts).map(([answer, count]) =>({
                answer,
                count,
                percent: n > 0 ? Math.round((count/n)*100) : 0
            }))
        }
    }
    return result
}

// chart builders for values based on columns (average/median/percentage of all surveyees) or on rows for individual data 

function total(col: Col): number {
    return col.values.filter(v => v !== null).length
}

function totalSafe(col: Col | undefined): number {
    return col ? col.values.filter(v => v !== null).length : 0
}

function totalExcluding(col: Col | undefined, excludedAnswers: string[]): number {
    if (!col) return 0
    return col.answers
        .filter(a => !excludedAnswers.includes(a.answer))
        .reduce((sum, a) => sum + a.count, 0)
}

// syntax issue
function countAnswer(col: Col, answer: string): number {
    return col.answers.find(r => r.answer === answer)?.count ?? 0 
}

export function percentage(col: Col | undefined, answers: string[]): number {
    if (!col) return 0
    const n = total(col)
    if (n === 0) return 0
    const count = answers.reduce((sum, a) => sum + countAnswer(col,a),0)
    return Math.round((count/n)*100)
}

export function percentageExcluding(
    col: Col | undefined,
    answers: string[],
    excludedAnswers: string[]
): number {
    if (!col) return 0
    const n = totalExcluding(col, excludedAnswers)
    if (n === 0) return 0
    const count = answers.reduce((sum, a) => sum + countAnswer(col,a),0)
    return Math.round((count/n)*100)
}

export function barList(
    cols: Cols,
    codes: string[]) : { code: string; label: string; count: number; percent: number}[] {
    const refCode = codes.find(c => cols[c])
    const n = refCode ? total(cols[refCode]) : 0
    return codes
        .filter(c => cols[c])
        .map(code => {
            const count = countAnswer(cols[code], '1')
            return {
                code,
                label: cols[code].label,
                count,
                percent: n > 0 ? Math.round((count/n)*100) : 0
            }
        })
}

export function multibarList(
    cols: Cols,
    codes: string[]) {
        return codes
        .filter(code => cols[code])
        .map(code => {
            const col = cols[code]
            const n = total(col)
            const count = countAnswer(col, '1') + countAnswer(col, '2')

            return {
                code,
                label: col.label,
                count, 
                percent: n > 0 ? Math.round((count/n)*100) : 0    
            }
        })
    }

export function answerbarList(
    col: Col | undefined,
    labelMap: Record<string, string> = {}
) {
    if (!col) return []

    const n = total(col)

    return col.answers.map(a => ({
        label: labelMap[a.answer] ?? a.answer,
        count: a.count,
        percent: n > 0 ? Math.round((a.count/n)*100) : 0
    }))
}

export function distribution(
    col: Col | undefined,
    labelMap: Record<string, string> = {}   
        ): {answer: string; label: string; count: number; percent: number}[]{
            if (!col) return[]
            const n = total(col)
            return col.answers.map(r =>({
                answer: r.answer,
                label: labelMap[r.answer] ?? r.answer,
                count: r.count,
                percent: n > 0 ? Math.round((r.count/n)*100) : 0
            }))
            .sort((a,b) => b.count - a.count)
}




// labels depending on answer codes in suvey data

// todo shorten answer for easier data viz readability


// answers based on likert answer matrix for chart labels

export const Likert: Record<string, string> = {
    '1': 'Trifft voll und ganz zu', '2': 'Trifft eher zu', '3': 'Trifft eher weniger zu', '4': 'Triff überhaupt nicht zu', '9': 'Weiß nicht/Keine Angabe'
}

// asnwers based on f8
export const Maßnahmen: Record<string, string> = {
    '1': 'Erhöht Zustimmung', '2': 'Kein Unterschied', '3': 'Verringert Zustimmung', '4': 'Weiß nicht / Keine Angabe'
}

// asnwers based on f20 
export const Zustimmung: Record<string, string> = {
    '1': 'Stimme uneingeschränkt zu', '2': 'Stimmer eingeschränkt zu', '3': 'Lehne es uneingeschränkt ab', '4': 'Weißß nicht / Keine Angabe'
}

// what each chart will show

export function mapCharts(cols: Cols): Record<string, any> {
    const col = (code: string) => cols[code]

    return {
        wahrnehmung: {
            type: 'bar',
            title: 'Wahrnehmung von Sensoren im öffentlichen Raum',
            note: 'Mehrfachnennung möglich',
            n: totalSafe(col('f2A1')),
            items: barList(cols, ['f2A1', 'f2A2', 'f2A3', 'f2A5']),
        },
        sensortypen: {
            type: 'bar',
            title: 'Bekanntheitsgrad nach Sensortyp',
            note: 'Mehrfachnennung möglich',
            n: totalSafe(col('f3A1')),
            items: barList(cols, ['f3A1', 'f3A2', 'f3A3', 'f3A4', 'f3A5', 'f3A6']),
        },
        wissensensoren: {
            type: 'bar',
            title: 'Wissen über die Funtionsweise von Sensoren',
            note: 'Mehrfachnennung möglich',
            n: totalSafe(col('f4A1')),
            items: barList(cols, ['f4A1', 'f4A2', 'f4A3', 'f4A5', 'f4A6', 'f4A7', 'f4A8', 'f4A9', 'f4A10']),            
        },
        einstellungtechnik: {
            type: 'bar',
            title: 'Einstellung zu digitalen Technologien',
            note: 'Mehrfachnennung möglich',
            n: totalSafe(col('f1')),
            items: answerbarList(col('f1'), {'1': 'Sehr positiv', '2': 'Eher positiv', '3': 'Eher negativ', '4': 'Sehr negativ', '9': 'Weiß nicht / keine Angabe'})            
        },
        überwachungsgefühl: {
            type: 'distribution',
            title: 'Überwachungsgefühl durch Sensoren',
            description: 'Anteil: trifft voll zu + trifft eher zu',
            percent: percentageExcluding(col('f6A3_1'), ['1','2'], ['9']),
            n: totalExcluding(col('f6A3_1'), ['9'])
        },
        befindlichkeit: {
            type: 'bargrouped',
            title: 'Gefühl gegenüber Sensoren im öffentlichen Raum',
            answerLabels: Likert,
            items: ['f6A1_1', 'f6A2_1','f6A3_1','f6A4_1', 'f6A5_1']
            .filter(c => col(c))
            .map(code => ({code, label: col(code).label, distribution: distribution(col(code), Likert)}))
        },
        akzeptanzmaßnahmen: {
            type: 'bargrouped',
            title: 'Einfluss von Maßnahmen auf Zustimmung zu Sensoren',
            answerLabels: Maßnahmen,
            n: totalSafe(col('f8A1_1')),
            items: ['f8A1_1', 'f8A2_1','f8A3_1','f8A4_1', 'f8A5_1', 'f8A6_1', 'f8A7_1', 'f8A8_1', 'f8A9_1']
            .filter(c => col(c))
            .map(code => ({code, label: col(code).label, distribution: distribution(col(code), Maßnahmen)}))
        },
        datenschutzhaltung: {
            type: 'bar',
            title: 'Haltung zu Datenschutz und Datennutzung',
            note: 'Mehrfachnennung möglich',
            n: totalSafe(col('f10A1')),
            items: barList(cols, ['f10A1', 'f10A2', 'f10A3', 'f10A5', 'f10A6']),            
        },
        vertrauenbetreiber: {
            type: 'distribution',
            title: 'Vertrauen in öffentliche vs private Betreiber',
            note: 'Nur die, die Einfluss auf Betreiber bestätigen (f11 = 1)', //wichtig
            description: 'Anteil: trifft voll zu + trifft eher zu',
            n: totalSafe(col('f11')),
            items: distribution(col('f11'), {
                '1': 'Nur privaten Betreibern', 
                '2': 'Eher privaten Betreibern', '3': 'Eher öffentlichen Betreibern', '4': 'Nur öffentlichen Betreibern', '5': 'Weiß nicht',
            }),
        },
        infobedürfnis: {
            type: 'stat',
            title: 'Wunsch nach mehr Informationen zur Datenerhebung',
            description: 'Anteil trifft voll zu + trifft eher zu',
            percent: percentageExcluding(col('f13A2_1'), ['1','2'], ['9']),
            n: totalExcluding(col('f13A2_1'), ['9']),
        },
        kamerabedeutung: {
         type: 'distribution',
        title: 'Was bedeutet mehr Videoüberwachung',
        items: distribution(col('f18'), {
                '1': 'Eher Sicherheit', 
                '2': 'Eher Eingriff in Freiheitsrecht', '3': 'Beides', '4': 'Weder noch', '5': 'Weiß nicht',
            }),    
        },
        kamerazustimmungort: {
            type: 'bar',
            title: 'Zustimmung zu Videoüberwachung je nach Ort',
            answerLabels: Zustimmung,
            n: totalSafe(col('f20A1_1')),
            items: multibarList(cols, ['f20A1_1', 'f20A2_1','f20A3_1','f20A4_1', 'f20A5_1', 'f20A6_1', 'f20A7_1', 'f20A8_1', 'f20A9_1', 'f20A10_1', 'f20A11_1'])

        },
        kamerabedenken: {
            type: 'stat',
            title: 'Bedenklichkeit intelligenter Kamerasysteme',
            description: 'Anteil trifft voll zu + trifft eher zu',
            percent: percentageExcluding(col('f19A2_1'), ['1','2'], ['9']),
            n: totalExcluding(col('f19A2_1'), ['9']),
        },
        verhaltensanpassung: {
            type: 'stat',
            title: 'Meidet Orte mit Videoüberwachung',
            description: 'Anteil immer/oft + gelegentlich',
            percent: percentageExcluding(col('f23A4_1'), ['1','2'], ['9']),
            n: totalExcluding(col('f23A4_1'), ['9']),
        }
    }
}