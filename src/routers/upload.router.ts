import express from "express";
import * as uploadController from "../controllers/upload.controller";
const router = express.Router();
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("foodImg"), uploadController.uploadPost);

export default router;
