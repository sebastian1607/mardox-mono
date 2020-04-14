export interface Options {
    inputFile: string;
    outputFile?: string;
    encoding?: string;
    margins?: Margins;
    format?: PDFFormat;
    verbose?: boolean;
}

export interface Margins {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
}

export type PDFFormat =
    | 'Letter'
    | 'Legal'
    | 'Tabloid'
    | 'Ledger'
    | 'A0'
    | 'A1'
    | 'A2'
    | 'A3'
    | 'A4'
    | 'A5'
    | 'A6';
