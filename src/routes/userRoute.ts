import { Router } from "express";
import { signup } from "../controller/authentication/signup";
import { sigin } from "../controller/authentication/signin";
import { pdfUpload } from "../middleware/multer";
import { processPdf } from "../controller/pdfProcess/processPdf";



const router = Router()

router.post("/signup",signup)
router.post("/signin",sigin)
router.post('/process-pdf',pdfUpload,processPdf)

export default router