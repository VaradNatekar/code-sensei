import { GroqProvider } from "./GroqProvider";

export class AIService {

    private static provider = new GroqProvider();

    public static async generate(
        prompt: string
    ): Promise<string> {

        return await this.provider.generate(prompt);

    }

}