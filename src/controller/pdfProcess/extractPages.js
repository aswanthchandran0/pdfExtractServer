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
exports.extractPages = void 0;
const pdf_lib_1 = require("pdf-lib");
// In extractPages.ts
const extractPages = (inputPdfBytes, pageNumbers) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const originalPdf = yield pdf_lib_1.PDFDocument.load(inputPdfBytes);
        const newPdf = yield pdf_lib_1.PDFDocument.create();
        const zeroBasedPages = pageNumbers.map(n => n - 1);
        const pages = yield newPdf.copyPages(originalPdf, zeroBasedPages);
        pages.forEach(page => newPdf.addPage(page));
        const outputPdfBytes = yield newPdf.save();
        console.log("outputPdfBytes", outputPdfBytes);
        // Convert properly using underlying ArrayBuffer
        return Buffer.from(outputPdfBytes.buffer, outputPdfBytes.byteOffset, outputPdfBytes.byteLength);
    }
    catch (error) {
        throw error;
    }
});
exports.extractPages = extractPages;
