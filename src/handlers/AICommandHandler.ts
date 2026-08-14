import * as vscode from "vscode";
import { AIService } from "../ai/AIService";

export class AICommandHandler {

    public static async execute(
        webview: vscode.Webview,
        prompt: string,
        failureMessage: string,
        secrets: vscode.SecretStorage
    ): Promise<void> {

        try {

            webview.postMessage({
                command: "loading"
            });

            const apiKey =
                await secrets.get("groqApiKey");

            if (!apiKey) {

                webview.postMessage({
                    command: "error",
                    text: "❌ Groq API key not configured. Please set it first."
                });

                return;
            }

            const response =
                await AIService.generate(
                    prompt,
                    apiKey
                );

            webview.postMessage({
                command: "response",
                text: response
            });

        } catch (error) {

            console.error(error);

            let message =
                failureMessage;

            if (error instanceof Error) {
                message =
                    error.message;
            }

            webview.postMessage({
                command: "error",
                text: message
            });
        }
    }
}