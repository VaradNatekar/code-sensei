import * as vscode from "vscode";
import * as fs from "fs";
import { PromptBuilder } from "../ai/PromptBuilder";
import { AIService } from "../ai/AIService";

export class SenseiViewProvider implements vscode.WebviewViewProvider {

    public static readonly viewType = "codeSensei.sidebar";

    constructor(
        private readonly extensionUri: vscode.Uri
    ) {}

    public resolveWebviewView(
        webviewView: vscode.WebviewView
    ): void {

        const webview = webviewView.webview;

        webview.options = {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.joinPath(
                    this.extensionUri,
                    "media"
                )
            ]
        };

        const htmlPath = vscode.Uri.joinPath(
            this.extensionUri,
            "media",
            "index.html"
        );

        let html = fs.readFileSync(
            htmlPath.fsPath,
            "utf8"
        );

        const styleUri = webview.asWebviewUri(
            vscode.Uri.joinPath(
                this.extensionUri,
                "media",
                "styles.css"
            )
        );

        const scriptUri = webview.asWebviewUri(
            vscode.Uri.joinPath(
                this.extensionUri,
                "media",
                "main.js"
            )
        );

        const iconUri = webview.asWebviewUri(
            vscode.Uri.joinPath(
                this.extensionUri,
                "media",
                "icon.png"
            )
        );

        html = html
            .replace(
                "{{style}}",
                styleUri.toString()
            )
            .replace(
                "{{script}}",
                scriptUri.toString()
            )
            .replace(
                "{{icon}}",
                iconUri.toString()
            );

        webview.html = html;

        // -------------------------------
        // Shared AI Runner
        // -------------------------------

        const runAI = async (
            builder: (
                code: string,
                language: string
            ) => string,
            defaultError: string
        ) => {

            try {

                const editor =
                    vscode.window.activeTextEditor;

                if (!editor) {

                    vscode.window.showWarningMessage(
                        "No active editor found."
                    );

                    return;
                }

                if (editor.selection.isEmpty) {

                    vscode.window.showWarningMessage(
                        "Please select some code first."
                    );

                    return;
                }

                webview.postMessage({
                    command: "loading"
                });

                const code =
                    editor.document.getText(
                        editor.selection
                    );

                const language =
                    editor.document.languageId;

                const prompt =
                    builder(
                        code,
                        language
                    );

                const response =
                    await AIService.generate(
                        prompt
                    );

                webview.postMessage({
                    command: "response",
                    text: response
                });

            } catch (error) {

                let errorMessage =
                    defaultError;

                if (error instanceof Error) {
                    errorMessage =
                        error.message;
                }

                webview.postMessage({
                    command: "error",
                    text: errorMessage
                });

            }

        };

        // -------------------------------
        // Message Handler
        // -------------------------------

        webview.onDidReceiveMessage(
            async (message) => {

                switch (message.command) {

                    case "explain":

                        await runAI(
                            PromptBuilder.explain,
                            "❌ Failed to explain code."
                        );

                        break;

                    case "review":

                        await runAI(
                            PromptBuilder.review,
                            "❌ Failed to review code."
                        );

                        break;

                    case "debug":

                  await runAI(
                  PromptBuilder.debug,
                  "❌ Failed to debug code."
                  );

                    break;

                    case "learn":

                    await runAI(
                   PromptBuilder.learn,
                    "❌ Failed to teach concept."
                    );

                    break;

                    case "interview":

    await runAI(
        PromptBuilder.interview,
        "❌ Failed to generate interview questions."
    );

    break;

                    default:

                        console.log(
                            "Unknown command:",
                            message.command
                        );

                        break;

                }

            }
        );

    }

}