import * as vscode from "vscode";
import { AIService } from "../ai/AIService";

export class AICommandHandler {

    public static async execute(
        webview: vscode.Webview,
        prompt: string,
        errorMessage: string
    ): Promise<void> {

        try {

            webview.postMessage({
                command: "loading"
            });

            const response =
                await AIService.generate(prompt);

            webview.postMessage({
                command: "response",
                text: response
            });

        } catch (error) {

            let message = errorMessage;

            if (error instanceof Error) {
                message = error.message;
            }

            webview.postMessage({
                command: "error",
                text: message
            });

        }

    }

}