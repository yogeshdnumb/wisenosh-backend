import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import indexRouter from "./routers/index.router";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("bypass-tunnel-reminder", "Express");
  // res.setHeader("Content-Type", "application/json");
  next(); // Pass control to the next handler
});

// app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.1.2:5173/",
      "http://192.168.1.2:5173",
      "http://localhost:5173/",
      "http://localhost:5173",
      "https://smartbiten.netlify.app/",
      "https://smartbiten.netlify.app",
    ],
  })
);

app.use("/", indexRouter);

export { app };
