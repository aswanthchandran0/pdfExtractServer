"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processPdf = void 0;
const extractPages_1 = require("./extractPages");
const path_1 = require("path");
const fs_1 = require("fs");
const processPdf = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const selectedPages = JSON.parse(req.body.pages);
        // Process the PDF to extract selected pages
        const processedPdf = yield (0, extractPages_1.extractPages)(pdfBuffer, selectedPages);
        console.log('Processed PDF Buffer:', processedPdf);
        console.log('Buffer Length:', processedPdf.length);
        // Save the processed PDF to a temporary file for testing
        const tempFilePath = (0, path_1.join)(__dirname, 'temp', `extracted_${req.file.originalname}`);
        (0, fs_1.writeFileSync)(tempFilePath, processedPdf); // Write the buffer to a file
        console.log(`Processed PDF saved to: ${tempFilePath}`);
        // Convert the processed PDF buffer to a Base64-encoded string
        const pdfBase64 = processedPdf.toString('base64');
        // Send the Base64-encoded string in the response
        res.json({
            success: true,
            pdfBase64, // Include the Base64-encoded PDF in the response
        });
    }
    catch (error) {
        next(error);
    }
});
exports.processPdf = processPdf;
