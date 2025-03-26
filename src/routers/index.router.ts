import express from "express";
import * as indexController from "../../src/controllers/index.controller";
const router = express.Router();

router.get("/", indexController.indexGet);

export default router;
