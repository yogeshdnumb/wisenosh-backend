import express from "express";
import * as indexController from "../controllers/index.controller";
const router = express.Router();

router.get("/", indexController.indexGet);

export default router;
