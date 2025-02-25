import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("No API Key");
}

const genAi = new GoogleGenerativeAI(API_KEY);

const model = genAi.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `give the food's information in json format.
  
  Use this JSON schema:

info = {"name":str,"calories":str,"nutrients":list[str],"benefits":list[str],"allergies":list[str]}
Return: info"
just give the json starting with '{' and ending with '}' and nothing else
  `,
});

async function getAiResponse(
  prompt: string,
  imgBuffer: Buffer,
  mimeType: string
) {
  const result = await model.generateContent([
    prompt,
    {
      inlineData: { data: Buffer.from(imgBuffer).toString("base64"), mimeType },
    },
  ]);
  const text = result.response.text();
  return text;
}

export async function getImgInfo(imgBuffer: Buffer, mimeType: string) {
  const result = await getAiResponse("what is this?", imgBuffer, mimeType);
  // return JSON.parse(result.slice(7, -3)).calories;
  // console.log(JSON.parse(result));
  const answer = result.slice(8).slice(0, -4);

  console.log(answer);

  // return JSON.parse(result.slice(7, -3)).calories;
  console.log(JSON.parse(answer));
  return JSON.parse(answer);
}
