import { GeminiProvider } from "./GeminiProvider";

export class AIService {
    private static readonly provider = new GeminiProvider();

    public static async generate(prompt: string): Promise<string> {
        return await this.provider.generate(prompt);
    }
}