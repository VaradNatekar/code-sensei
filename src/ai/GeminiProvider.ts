export class GeminiProvider {

    public async generate(prompt: string): Promise<string> {

        const { GoogleGenAI } = await import("@google/genai");

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            throw new Error("Gemini API key not found.");
        }

        const ai = new GoogleGenAI({
            apiKey,
        });

        try {

            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: prompt,
            });

            return response.text ?? "No response generated.";

        } catch (error: any) {

            console.error("========== GEMINI ERROR ==========");
            console.dir(error, { depth: null });

            console.error("Status:", error?.status);
            console.error("Message:", error?.message);
            console.error("Error:", error?.error);

            throw error;

        }

    }

}