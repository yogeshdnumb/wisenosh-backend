import { Request, Response } from "express";
export async function indexGet(req: Request, res: Response) {
  res.send("Welcome to server");
}
