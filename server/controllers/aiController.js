// import Resume from "../models/Resume.js";
// import ai from "../configs/ai.js";

// // Controller for enhancing a resume's professional summary
// // POST: /api/ai/enhance-pro-sum
// export const enhanceProfessionalSummary = async (req, res) => {
//   try {
//     const { userContent } = req.body;

//     if (!userContent) {
//       return res.status(400).json({
//         message: "Missing required fields",
//       });
//     }

//     console.log("AI Professional Summary: Sending request to Gemini...");
//     console.log("AI Model:", process.env.GEMINI_MODEL);

//     const response = await ai.models.generateContent({
//       model: process.env.GEMINI_MODEL,
//       contents: `You are an expert professional resume writer.

// Enhance the following professional summary for a resume.

// Requirements:
// - Keep it to 1-2 sentences.
// - Highlight important skills, experience, and career objectives.
// - Make it compelling and professional.
// - Make it ATS-friendly.
// - Return ONLY the improved summary.
// - Do not add headings, bullet points, explanations, or quotation marks.

// Original summary:
// ${userContent}`,
//     });

//     console.log("AI Professional Summary: Gemini response received.");

//     const enhancedContent = response.text;

//     if (!enhancedContent) {
//       throw new Error("Gemini returned an empty response");
//     }

//     return res.status(200).json({
//       enhancedContent,
//     });
//   } catch (error) {
//     console.error("AI Professional Summary Error:");
//     console.error("Message:", error.message);
//     console.error("Status:", error.status);
//     console.error("Code:", error.code);
//     console.error("Full error:", error);

//     return res.status(500).json({
//       message: error.message || "AI processing failed",
//     });
//   }
// };

// // Controller for enhancing a resume's job description
// // POST: /api/ai/enhance-job-desc
// export const enhanceJobDescription = async (req, res) => {
//   try {
//     const { userContent } = req.body;

//     if (!userContent) {
//       return res.status(400).json({
//         message: "Missing required fields",
//       });
//     }

//     console.log("AI Job Description: Sending request to Gemini...");
//     console.log("AI Model:", process.env.GEMINI_MODEL);

//     const response = await ai.models.generateContent({
//       model: process.env.GEMINI_MODEL,
//       contents: `You are an expert professional resume writer.

// Enhance the following job description for a resume.

// Requirements:
// - Keep it to 1-2 sentences.
// - Highlight key responsibilities and achievements.
// - Use strong action verbs.
// - Include measurable results where appropriate.
// - Make it professional and ATS-friendly.
// - Return ONLY the improved job description.
// - Do not add headings, bullet points, explanations, or quotation marks.

// Job description:
// ${userContent}`,
//     });

//     console.log("AI Job Description: Gemini response received.");

//     const enhancedContent = response.text;

//     if (!enhancedContent) {
//       throw new Error("Gemini returned an empty response");
//     }

//     return res.status(200).json({
//       enhancedContent,
//     });
//   } catch (error) {
//     console.error("AI Job Description Error:");
//     console.error("Message:", error.message);
//     console.error("Status:", error.status);
//     console.error("Code:", error.code);
//     console.error("Full error:", error);

//     return res.status(500).json({
//       message: error.message || "AI processing failed",
//     });
//   }
// };

// // Controller for uploading a resume and extracting its data using AI
// // POST: /api/ai/upload-resume
// export const uploadResume = async (req, res) => {
//   try {
//     const { resumeText, title } = req.body;
//     const userId = req.userId;

//     if (!resumeText) {
//       return res.status(400).json({
//         message: "Missing required fields",
//       });
//     }

//     const prompt = `
// You are an expert AI resume parser.

// Extract structured information from the resume text below.

// Return ONLY valid JSON.
// Do not include markdown.
// Do not include code fences.
// Do not include explanations before or after the JSON.

// Use exactly this JSON structure:

// {
//   "professional_summary": "",
//   "skills": [],
//   "personal_info": {
//     "image": "",
//     "full_name": "",
//     "profession": "",
//     "email": "",
//     "phone": "",
//     "location": "",
//     "linkedin": "",
//     "website": ""
//   },
//   "experience": [
//     {
//       "company": "",
//       "position": "",
//       "start_date": "",
//       "end_date": "",
//       "description": "",
//       "is_current": false
//     }
//   ],
//   "project": [
//     {
//       "name": "",
//       "type": "",
//       "description": ""
//     }
//   ],
//   "education": [
//     {
//       "institution": "",
//       "degree": "",
//       "field": "",
//       "graduation_date": "",
//       "gpa": ""
//     }
//   ]
// }

// If a value is not available in the resume, use an empty string, empty array, or false as appropriate.

// Resume text:

// ${resumeText}
// `;

//     console.log("AI Resume Upload: Sending request to Gemini...");
//     console.log("AI Model:", process.env.GEMINI_MODEL);

//     const response = await ai.models.generateContent({
//       model: process.env.GEMINI_MODEL,
//       contents: prompt,
//       config: {
//         responseMimeType: "application/json",
//       },
//     });

//     console.log("AI Resume Upload: Gemini response received.");

//     const extractedData = response.text;

//     if (!extractedData) {
//       throw new Error("Gemini returned an empty response");
//     }

//     const parsedData = JSON.parse(extractedData);

//     const newResume = await Resume.create({
//       userId,
//       title,
//       ...parsedData,
//     });

//     return res.status(200).json({
//       resumeId: newResume._id,
//     });
//   } catch (error) {
//     console.error("AI Resume Upload Error:");
//     console.error("Message:", error.message);
//     console.error("Status:", error.status);
//     console.error("Code:", error.code);
//     console.error("Full error:", error);

//     return res.status(500).json({
//       message: error.message || "AI resume processing failed",
//     });
//   }
// };
import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

const PRIMARY_MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";
const FALLBACK_MODEL =
    process.env.GEMINI_FALLBACK_MODEL || "gemini-3.5-flash-lite";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateAIContent = async (prompt, config = {}) => {
    const modelsToTry = [PRIMARY_MODEL];

    if (FALLBACK_MODEL && FALLBACK_MODEL !== PRIMARY_MODEL) {
        modelsToTry.push(FALLBACK_MODEL);
    }

    let lastError;

    for (const model of modelsToTry) {
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                console.log(
                    `AI Model: ${model} | Attempt: ${attempt}`
                );

                const response = await ai.models.generateContent({
                    model,
                    contents: prompt,
                    ...(Object.keys(config).length > 0 ? { config } : {})
                });

                if (!response || !response.text) {
                    throw new Error("Gemini returned an empty response");
                }

                console.log(`AI response received from ${model}`);

                return response;
            } catch (error) {
                lastError = error;

                const status = error?.status;

                console.error(
                    `Gemini error | Model: ${model} | Attempt: ${attempt}`
                );
                console.error("Message:", error?.message);
                console.error("Status:", status);

                const shouldRetry =
                    status === 429 ||
                    status === 500 ||
                    status === 502 ||
                    status === 503 ||
                    status === 504;

                if (!shouldRetry) {
                    throw error;
                }

                if (attempt < 3) {
                    const delay = attempt * 1500;

                    console.log(
                        `Temporary Gemini error. Retrying in ${delay}ms...`
                    );

                    await sleep(delay);
                }
            }
        }

        console.log(
            `Primary model failed. Trying fallback model: ${FALLBACK_MODEL}`
        );
    }

    throw lastError || new Error("Gemini request failed");
};


// ============================================================
// PROFESSIONAL SUMMARY
// POST: /api/ai/enhance-pro-sum
// ============================================================

export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent || !userContent.trim()) {
            return res.status(400).json({
                message: "Please enter a professional summary first."
            });
        }

        console.log("AI Professional Summary: Sending request to Gemini...");

        const prompt = `
You are an expert professional resume writer.

Improve the following professional summary.

Requirements:
- Keep it concise: 1-2 sentences.
- Highlight relevant skills, experience, and career direction.
- Use professional and compelling language.
- Make it ATS-friendly.
- Do not invent qualifications, companies, degrees, achievements, or experience.
- Preserve the original meaning.
- Return ONLY the improved summary.
- Do not include headings.
- Do not use bullet points.
- Do not use quotation marks.
- Do not provide explanations.

Original summary:
${userContent.trim()}
`;

        const response = await generateAIContent(prompt);

        const enhancedContent = response.text.trim();

        console.log("AI Professional Summary: Gemini response received.");

        return res.status(200).json({
            enhancedContent
        });

    } catch (error) {
        console.error("AI Professional Summary Error:");
        console.error("Message:", error?.message);
        console.error("Status:", error?.status);
        console.error("Code:", error?.code);

        return res.status(500).json({
            message:
                "Unable to enhance the professional summary right now. Please try again."
        });
    }
};


// ============================================================
// JOB DESCRIPTION
// POST: /api/ai/enhance-job-desc
// ============================================================

export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent || !userContent.trim()) {
            return res.status(400).json({
                message: "Please enter a job description first."
            });
        }

        console.log("AI Job Description: Sending request to Gemini...");

        const prompt = `
You are an expert professional resume writer.

Improve the following job description for a resume.

Requirements:
- Keep it concise: 1-2 sentences.
- Highlight important responsibilities and achievements.
- Use strong action verbs.
- Include measurable results only when supported by the original content.
- Do not invent statistics, achievements, responsibilities, companies, or technologies.
- Make it professional and ATS-friendly.
- Preserve the original meaning.
- Return ONLY the improved job description.
- Do not include headings.
- Do not use bullet points.
- Do not use quotation marks.
- Do not provide explanations.

Original job description:
${userContent.trim()}
`;

        const response = await generateAIContent(prompt);

        const enhancedContent = response.text.trim();

        console.log("AI Job Description: Gemini response received.");

        return res.status(200).json({
            enhancedContent
        });

    } catch (error) {
        console.error("AI Job Description Error:");
        console.error("Message:", error?.message);
        console.error("Status:", error?.status);
        console.error("Code:", error?.code);

        return res.status(500).json({
            message:
                "Unable to enhance the job description right now. Please try again."
        });
    }
};


// ============================================================
// UPLOAD / PARSE RESUME
// POST: /api/ai/upload-resume
// ============================================================

export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body;
        const userId = req.userId;

        if (!resumeText || !resumeText.trim()) {
            return res.status(400).json({
                message: "Resume text is required."
            });
        }

        const prompt = `
You are an expert AI resume parser.

Extract structured information from the resume text below.

Return ONLY valid JSON.
Do not include markdown.
Do not include code fences.
Do not include explanations before or after the JSON.

Use exactly this JSON structure:

{
    "professional_summary": "",
    "skills": [],
    "personal_info": {
        "image": "",
        "full_name": "",
        "profession": "",
        "email": "",
        "phone": "",
        "location": "",
        "linkedin": "",
        "website": ""
    },
    "experience": [
        {
            "company": "",
            "position": "",
            "start_date": "",
            "end_date": "",
            "description": "",
            "is_current": false
        }
    ],
    "project": [
        {
            "name": "",
            "type": "",
            "description": ""
        }
    ],
    "education": [
        {
            "institution": "",
            "degree": "",
            "field": "",
            "graduation_date": "",
            "gpa": ""
        }
    ]
}

Rules:
- If information is unavailable, use an empty string.
- If there are no skills, use an empty array.
- If there is no experience, use an empty array.
- If there are no projects, use an empty array.
- If there is no education information, use an empty array.
- Do not invent information.
- is_current must be true only when the resume indicates the person is currently working in that position.

Resume text:

${resumeText.trim()}
`;

        console.log("AI Resume Upload: Sending request to Gemini...");

        const response = await generateAIContent(prompt, {
            responseMimeType: "application/json"
        });

        console.log("AI Resume Upload: Gemini response received.");

        const extractedData = response.text.trim();

        let parsedData;

        try {
            parsedData = JSON.parse(extractedData);
        } catch (parseError) {
            console.error("AI Resume JSON Parse Error:");
            console.error(extractedData);

            return res.status(500).json({
                message:
                    "AI returned an invalid resume format. Please try again."
            });
        }

        const newResume = await Resume.create({
            userId,
            title,
            ...parsedData
        });

        return res.status(200).json({
            resumeId: newResume._id
        });

    } catch (error) {
        console.error("AI Resume Upload Error:");
        console.error("Message:", error?.message);
        console.error("Status:", error?.status);
        console.error("Code:", error?.code);

        return res.status(500).json({
            message:
                "Unable to process the resume right now. Please try again."
        });
    }
};
