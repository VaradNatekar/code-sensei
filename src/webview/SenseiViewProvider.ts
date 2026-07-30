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
                vscode.Uri.joinPath(this.extensionUri, "media")
            ]
        };

        const htmlPath = vscode.Uri.joinPath(
            this.extensionUri,
            "media",
            "index.html"
        );

        let html = fs.readFileSync(htmlPath.fsPath, "utf8");

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
            .replace("{{style}}", styleUri.toString())
            .replace("{{script}}", scriptUri.toString())
            .replace("{{icon}}", iconUri.toString());

        webview.html = html;

        webview.onDidReceiveMessage(async (message) => {

            switch (message.command) {

                case "explain": {

                    try {

                        const editor = vscode.window.activeTextEditor;

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

                        const code = editor.document.getText(
                            editor.selection
                        );

                        const language =
                            editor.document.languageId;

                        const prompt = PromptBuilder.explain(
                            code,
                            language
                        );

                        const response =
                            await AIService.generate(
                                prompt
                            );

                        vscode.window.showInformationMessage(
                            response
                        );

                        console.log(
                            "========== PROMPT =========="
                        );
                        console.log(prompt);

                        console.log(
                            "========== RESPONSE =========="
                        );
                        console.log(response);

                    } catch (error) {

                        console.error(error);

                        vscode.window.showErrorMessage(
                            error instanceof Error
                                ? error.message
                                : "Unknown AI error."
                        );

                    }

                    break;
                }

                case "debug":

                    vscode.window.showInformationMessage(
                        "🐞 Debug My Code clicked!"
                    );

                    break;

                case "learn":

                    vscode.window.showInformationMessage(
                        "📚 Learn a Concept clicked!"
                    );

                    break;

                case "interview":

                    vscode.window.showInformationMessage(
                        "🧠 Interview Mode clicked!"
                    );

                    break;

                default:

                    console.log(
                        "Unknown command:",
                        message.command
                    );

                    break;
            }

        });

    }
}