import OpenAI from 'openai';

// This service handles interactions with AI providers (OpenAI/Gemini)
// For now, we'll default to OpenAI, but structure it to be provider-agnostic if needed.

let openai = null;
let apiKey = localStorage.getItem('openai_api_key') || import.meta.env.VITE_OPENAI_API_KEY || '';

const initializeOpenAI = () => {
    if (apiKey && !openai) {
        openai = new OpenAI({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true // Client-side specific
        });
    }
};

// Initialize on load if key exists
initializeOpenAI();

export const setApiKey = (key) => {
    apiKey = key;
    localStorage.setItem('openai_api_key', key);
    openai = new OpenAI({
        apiKey: key,
        dangerouslyAllowBrowser: true
    });
};

export const getApiKey = () => apiKey;

/**
 * Improve existing text based on a specific instruction/tone
 * @param {string} text - The text to improve
 * @param {string} instruction - e.g., "Make it more professional", "Fix grammar", "Shorten"
 */
export const improveText = async (text, instruction) => {
    if (!openai) {
        throw new Error('API Key is missing. Please configure it in Settings.');
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a professional career coach and resume expert. Your goal is to improve resume content to be impactful, concise, and ATS-friendly."
                },
                {
                    role: "user",
                    content: `Improve the following text based on this instruction: "${instruction}".

Original Text: "${text}"

Return ONLY the improved text. Do not add quotes or explanations.`
                }
            ],
            temperature: 0.7,
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error("AI Error:", error);
        throw error;
    }
};

/**
 * Generate new text based on keywords or a prompt
 * @param {string} prompt - Keywords or topic (e.g., "Project management, agile, team leadership")
 * @param {string} context - 'summary', 'experience', 'skills'
 */
export const generateText = async (prompt, context = 'experience') => {
    if (!openai) {
        throw new Error('API Key is missing. Please configure it in Settings.');
    }

    let systemPrompt = "";
    if (context === 'summary') {
        systemPrompt = "You are a professional resume writer. Generate a concise, impactful professional summary (3-4 sentences) based on the provided keywords/role.";
    } else if (context === 'experience') {
        systemPrompt = "You are a professional resume writer. Generate a single, bullet-point style achievement (without the bullet point character) based on the provided keywords. Use action verbs and metrics if possible.";
    } else {
        systemPrompt = "You are a professional resume writer. Generate professional content for a resume based on the user's prompt.";
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Keywords/Prompt: "${prompt}"\n\nReturn ONLY the generated text.` }
            ],
            temperature: 0.7,
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error("AI Error:", error);
        throw error;
    }
};
