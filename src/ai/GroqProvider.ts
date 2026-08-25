import Groq from "groq-sdk";

export class GroqProvider {

    public async generate(
        prompt: string,
        apiKey: string
    ): Promise<string> {

        if (!apiKey) {
            throw new Error(
                "Groq API key not configured. Please set your API key first."
            );
        }

        const groq = new Groq({
            apiKey,
        });

        try {

            const completion =
                await groq.chat.completions.create({

                    model: "openai/gpt-oss-120b",

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

            console.error(
                "========== GROQ ERROR =========="
            );

            console.error(error);

            throw error;
        }
    }
}