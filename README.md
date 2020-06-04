# Mardox

Mardox ist a tool to convert Markdown to PDF.

## Cli

## Core

### API

`Options`:

|  property  |   type    |   default    |
| :--------: | :-------: | :----------: |
| inputFile  |   File    |  undefined   |
| outputFile |   File    |  undefined   |
|  encoding  |  string   |   'utf-8'    |
|  margins   |  Margins  |  undefined   |
|   format   | PDFFormat | PDFFormat.A4 |
|            |           |              |

`File`:

|  property  |  type  |  default  |
| :--------: | :----: | :-------: |
|    file    | string | undefined |
|    path    | string | undefined |
| fileEnding | string | undefined |
|            |        |           |

`Margins`:

| property |  type  | default |
| :------: | :----: | :-----: |
|   top    | string | '20px'  |
|  right   | string | '20px'  |
|  bottom  | string | '20px'  |
|   left   | string | '20px'  |
|          |        |         |

`PDFFormat`:

`PDFFormat = 'Letter' | 'Legal' | 'Tabloid' | 'Ledger' | 'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6';`
