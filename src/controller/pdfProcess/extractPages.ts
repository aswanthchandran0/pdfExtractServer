import { PDFDocument } from "pdf-lib"
// In extractPages.ts
export const extractPages = async (inputPdfBytes: Buffer, pageNumbers: number[]) => {
    try {
      const originalPdf = await PDFDocument.load(inputPdfBytes);
      const newPdf = await PDFDocument.create();
      
      const zeroBasedPages = pageNumbers.map(n => n - 1);
      
      const pages = await newPdf.copyPages(originalPdf, zeroBasedPages);
      pages.forEach(page => newPdf.addPage(page));
      
      const outputPdfBytes = await newPdf.save();
       console.log("outputPdfBytes",outputPdfBytes)
      // Convert properly using underlying ArrayBuffer
      return Buffer.from(
        outputPdfBytes.buffer,
        outputPdfBytes.byteOffset,
        outputPdfBytes.byteLength
      );
    } catch (error) {
      throw error;
    }
  };