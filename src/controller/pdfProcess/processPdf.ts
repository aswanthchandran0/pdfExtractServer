import { Request, Response, NextFunction } from 'express';
import { PDFDocument } from 'pdf-lib';
import { pdfUpload } from '../../middleware/multer';
import { extractPages } from './extractPages';
import { join } from 'path';
import { writeFileSync } from 'fs';

interface CustomRequest extends Request {
  file?: Express.Multer.File;
}

export const processPdf = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No PDF file uploaded' });
      return;
    }
    if (!req.body.pages) {
      res.status(400).json({ error: 'No pages selected' });
      return;
    }

    // Extract the uploaded PDF buffer and selected pages
    const pdfBuffer = req.file.buffer;
    const selectedPages: number[] = JSON.parse(req.body.pages);

    // Process the PDF to extract selected pages
    const processedPdf = await extractPages(pdfBuffer, selectedPages);
    console.log('Processed PDF Buffer:', processedPdf);
    console.log('Buffer Length:', processedPdf.length);

    // Save the processed PDF to a temporary file for testing
    const tempFilePath = join(__dirname, 'temp', `extracted_${req.file.originalname}`);
    writeFileSync(tempFilePath, processedPdf); // Write the buffer to a file
    console.log(`Processed PDF saved to: ${tempFilePath}`);

    // Convert the processed PDF buffer to a Base64-encoded string
    const pdfBase64 = processedPdf.toString('base64');

    // Send the Base64-encoded string in the response
    res.json({
      success: true,
      pdfBase64, // Include the Base64-encoded PDF in the response
    });
  } catch (error) {
    next(error);
  }
};