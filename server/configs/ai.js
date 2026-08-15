// import OpenAI from "openai";

// const apiKey = process.env.OPENAI_API_KEY;
// const baseURL =
//     process.env.OPENAI_BASE_URL ||
//     "https://generativelanguage.googleapis.com/v1beta/openai/";

// if (!apiKey) {
//     console.error("ERROR: OPENAI_API_KEY is not set in .env");
// }

// console.log("AI Configuration:");
// console.log("API Key loaded:", !!apiKey);
// console.log("Base URL:", baseURL);
// console.log("Model:", process.env.OPENAI_MODEL);

// const ai = new OpenAI({
//     apiKey,
//     baseURL
// });

// export default ai;
// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY
// });

// export default ai;

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export default ai;
