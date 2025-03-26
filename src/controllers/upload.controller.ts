import { getResponseFromBase64StrImg } from "../../src/utils/gemini";
import { Request, Response } from "express";

export async function uploadPost(req: Request, res: Response) {
  const foodImgFile = req.file;
  if (!foodImgFile) {
    res.json({ message: "no image supplied" });
  }

  const aiResponse = await getResponseFromBase64StrImg(
    `
    List the details provided using this JSON schema only provide the json

    "title": "Food Image Analysis Result",
  "description": "Schema for the result of analyzing a food image.",
  "type": "object",
  "properties": {
  "foodName":{"type":"string","description":"Name of the food"}
    "calories":{
    "type":"array",
    "items":{
    "type":"string",
    "description":"Calories of individual food"
    }
    "description":"A list of calories of all food items indvidually like (idly calory and chutney calory)"
    }

    "ingredients": {
      "type": "array",
      "items": {
        "type": "string",
        "description": "An identified ingredient in the food."
      },
      "description": "A list of identified ingredients."
    },
     "nutrients": {
      "type": "array",
      "items": {
        "type": "string",
        "description": "An identified nutrient in the food."
      },
      "description": "A list of identified nutrients."
    },
    "foodItemsIncluded": {
      "type": "array",
      "items": {
        "type": "string",
        "description": "A recognized food item within the image (e.g., 'salad', 'pizza', 'apple')."
      },
      "description": "A list of recognized food items."
    },
     "benefits": {
      "type": "array",
      "items": {
        "type": "string",
        "description": "Potential health benefits associated with the food items and ingredients."
      },
      "description": "A list of potential health benefits."
    },
    "allergies": {
      "type": "array",
      "items": {
        "type": "string",
        "description": "Potential allergens present in the food."
      },
      "description": "A list of potential allergens."
    }
  },
  "required": [
    "ingredients",
    "foodItemsIncluded",
    "benefits",
    "allergies",
    "calories"
  ]
    `,

    req.file?.mimetype,
    req.file?.buffer.toString("base64")
  );

  res.json(JSON.parse(aiResponse.slice(8).slice(0, -4)));
}
