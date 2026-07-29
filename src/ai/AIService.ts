export class AIService {

    public static async generate(prompt: string): Promise<string> {

        console.log(prompt);

        return "AI response will come from Gemini.";

    }

}