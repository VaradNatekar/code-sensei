import * as vscode from "vscode";
import * as fs from "fs";
import { PromptBuilder } from "../ai/PromptBuilder";
import { AIService } from "../ai/AIService";

export class SenseiViewProvider
    implements vscode.WebviewViewProvider {

    public static readonly viewType =
        "codeSensei.sidebar";

    constructor(
        private readonly extensionUri: vscode.Uri
    ) {}

    public resolveWebviewView(
        webviewView: vscode.WebviewView
    ): void {

        const webview =
            webviewView.webview;

        webview.options = {
            enableScripts: true,

            localResourceRoots: [
                vscode.Uri.joinPath(
                    this.extensionUri,
                    "media"
                )
            ]
        };

        // -------------------------------
        // Load HTML
        // -------------------------------

        const htmlPath =
            vscode.Uri.joinPath(
                this.extensionUri,
                "media",
                "index.html"
            );

        let html =
            fs.readFileSync(
                htmlPath.fsPath,
                "utf8"
            );

        const styleUri =
            webview.asWebviewUri(
                vscode.Uri.joinPath(
                    this.extensionUri,
                    "media",
                    "styles.css"
                )
            );

        const scriptUri =
            webview.asWebviewUri(
                vscode.Uri.joinPath(
                    this.extensionUri,
                    "media",
                    "main.js"
                )
            );

        const iconUri =
            webview.asWebviewUri(
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

            requiresSelection: boolean,

            defaultError: string
        ): Promise<void> => {

            try {

                const editor =
                    vscode.window.activeTextEditor;

                if (!editor) {

                    vscode.window.showWarningMessage(
                        "No active editor found."
                    );

                    return;
                }

                // Selected code required
                if (
                    requiresSelection &&
                    editor.selection.isEmpty
                ) {

                    vscode.window.showWarningMessage(
                        "Please select some code first."
                    );

                    return;
                }

                // Tell webview that AI is working
                webview.postMessage({
                    command: "loading"
                });

                // Get selected code OR entire file
                const code =
                    requiresSelection
                        ? editor.document.getText(
                            editor.selection
                        )
                        : editor.document.getText();

                const language =
                    editor.document.languageId;

                // Build prompt
                const prompt =
                    builder(
                        code,
                        language
                    );

                console.log(
                    "========== PROMPT =========="
                );

                console.log(prompt);

                // Generate AI response
                const response =
                    await AIService.generate(
                        prompt
                    );

                console.log(
                    "========== RESPONSE =========="
                );

                console.log(response);

                // Send response to webview
                webview.postMessage({
                    command: "response",
                    text: response
                });

            } catch (error) {

                console.error(error);

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

                    // -------------------
                    // Explain
                    // -------------------

                    case "explain":

                        await runAI(
                            PromptBuilder.explain,
                            true,
                            "❌ Failed to explain code."
                        );

                        break;


                    // -------------------
                    // Review
                    // -------------------

                    case "review":

                        await runAI(
                            PromptBuilder.review,
                            true,
                            "❌ Failed to review code."
                        );

                        break;


                    // -------------------
                    // Debug
                    // -------------------

                    case "debug":

                        await runAI(
                            PromptBuilder.debug,
                            true,
                            "❌ Failed to debug code."
                        );

                        break;


                    // -------------------
                    // Learn
                    // -------------------

                    case "learn":

                        await runAI(
                            PromptBuilder.learn,
                            true,
                            "❌ Failed to teach concept."
                        );

                        break;


                    // -------------------
                    // Interview
                    // -------------------

                    case "interview":

                        await runAI(
                            PromptBuilder.interview,
                            true,
                            "❌ Failed to generate interview questions."
                        );

                        break;


                    // -------------------
                    // Explain Current File
                    // -------------------

                    case "explainFile":

                        await runAI(
                            PromptBuilder.explainFile,
                            false,
                            "❌ Failed to explain current file."
                        );

                        break;


                    // -------------------
                    // Generate Unit Tests
                    // -------------------

                    case "generateTests":

                        await runAI(
                            PromptBuilder.generateTests,
                            true,
                            "❌ Failed to generate unit tests."
                        );

                        break;


                    // -------------------
                    // Unknown Command
                    // -------------------

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