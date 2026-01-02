import path from 'path'
import fs from 'fs'

const ROOT = process.cwd()

export const filePaths = {
  csvSample: path.resolve(
    ROOT,
    'test-files/csv/EMP-1001-Single-Site 2.csv'
  ),

  pdfSample: path.resolve(
    ROOT,
    'test-files/pdf/SamplePDF1.pdf'
  )
}

// 🔍 DEBUG (temporary – remove later)
console.log('CSV PATH =>', filePaths.csvSample)
console.log('CSV EXISTS =>', fs.existsSync(filePaths.csvSample))

console.log('PDF PATH =>', filePaths.pdfSample)
console.log('PDF EXISTS =>', fs.existsSync(filePaths.pdfSample))
