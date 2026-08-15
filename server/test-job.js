import ai from "./configs/ai.js";

const prompt = `You are an expert professional resume writer.

Improve the following job description for a professional resume.

Requirements:
- Make it professional and ATS-friendly.
- Use strong action verbs.
- Highlight responsibilities, skills, and achievements.
- Keep it concise.
- Do not invent specific numbers or achievements that are not provided.
- Return only the improved job description.
- Do not use headings, bullet points, quotation marks, or explanations.

Job description:
Worked on AI projects and helped train AI models.`;

console.log("Testing Gemini job description...");
console.log("Model:", process.env.GEMINI_MODEL);

try {
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL,
    contents: prompt,
  });

  console.log("\nSUCCESS:");
  console.log(response.text);
} catch (error) {
  console.log("\nERROR:");
  console.log("Message:", error.message);
  console.log("Status:", error.status);
  console.log("Code:", error.code);
}
