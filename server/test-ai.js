// import "dotenv/config";
// import OpenAI from "openai";

// const client = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//     baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
// });

// try {
//     const response = await client.chat.completions.create({
//         model: "gemini-2.5-flash",
//         messages: [
//             {
//                 role: "user",
//                 content: "Say hello in one short sentence."
//             }
//         ],
//         reasoning_effort: "none"
//     });

//     console.log("\nSUCCESS:");
//     console.log(response.choices[0].message.content);

// } catch (error) {
//     console.log("\nERROR:");
//     console.log("Status:", error.status);
//     console.log("Message:", error.message);
//     console.log("Code:", error.code);
//     console.log("Type:", error.type);
// }
// import "dotenv/config";
// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY
// });

// try {
//     const response = await ai.models.generateContent({
//         model: process.env.GEMINI_MODEL,
//         contents: "Say hello in one short sentence."
//     });

//     console.log("\nSUCCESS:");
//     console.log(response.text);
// } catch (error) {
//     console.log("\nERROR:");
//     console.log(error.message);
// }
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

console.log("GEMINI_API_KEY loaded:", !!process.env.GEMINI_API_KEY);
console.log("GEMINI_MODEL:", process.env.GEMINI_MODEL);

if (!process.env.GEMINI_API_KEY) {
    console.error("ERROR: GEMINI_API_KEY is missing from .env");
    process.exit(1);
}

if (!process.env.GEMINI_MODEL) {
    console.error("ERROR: GEMINI_MODEL is missing from .env");
    process.exit(1);
}

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

try {
    const response = await ai.models.generateContent({
        model: process.env.GEMINI_MODEL,
        contents: "Say hello in one short sentence."
    });

    console.log("\nSUCCESS:");
    console.log(response.text);
} catch (error) {
    console.log("\nERROR:");
    console.log(error.message);
}
