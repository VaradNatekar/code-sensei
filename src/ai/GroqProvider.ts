import Groq from "groq-sdk";

export class GroqProvider {

    public async generate(prompt: string): Promise<string> {

        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            throw new Error("Groq API key not found.");
        }

        const groq = new Groq({
            apiKey,
        });

        try {

            const completion =
                await groq.chat.completions.create({

                    model: "llama-3.3-70b-versatile",

                    messages: [
                        {
                            role: "user",
                            content: prompt,
                        },
                    ],

                    temperature: 0.4,

                });

            return (
                completion.choices[0]?.message?.content ??
                "No response generated."
            );

        } catch (error) {

            console.error("========== GROQ ERROR ==========");
            console.error(error);

            throw error;

        }

    }

}