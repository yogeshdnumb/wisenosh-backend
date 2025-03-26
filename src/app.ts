import express from "express";
import indexRouter from "@/routers/index.router";
import uploadRouter from "@/routers/upload.router";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

export const app = express();
app.use(morgan("dev"));
app.use(cors());

app.use("/upload", uploadRouter);
app.use("/", indexRouter);
