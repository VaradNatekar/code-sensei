import * as vscode from "vscode";

import { SenseiViewProvider } from "./webview/SenseiViewProvider";

export function activate(
    context: vscode.ExtensionContext
) {

    // -------------------------------
    // Register Sidebar
    // -------------------------------

    const provider =
        new SenseiViewProvider(
            context.extensionUri,
            context.secrets
        );

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            SenseiViewProvider.viewType,
            provider
        )
    );


    // -------------------------------
    // Register Commands
    // -------------------------------

    context.subscriptions.push(

        // Set Groq API Key
        vscode.commands.registerCommand(
            "codeSensei.setApiKey",
            async () => {

                const apiKey =
                    await vscode.window.showInputBox({

                        prompt:
                            "Enter your Groq API key",

                        password: true,

                        ignoreFocusOut: true,

                        placeHolder:
                            "gsk_..."
                    });

                if (!apiKey) {
                    return;
                }

                await context.secrets.store(
                    "groqApiKey",
                    apiKey
                );

                vscode.window.showInformationMessage(
                    "🔐 Groq API key saved securely."
                );
            }
        ),


        // Review
        vscode.commands.registerCommand(
            "codeSensei.review",
            () => {

                vscode.window.showInformationMessage(
                    "📊 Review command triggered!"
                );

            }
        ),


        // Debug
        vscode.commands.registerCommand(
            "codeSensei.debug",
            () => {

                vscode.window.showInformationMessage(
                    "🐞 Debug command triggered!"
                );

            }
        ),


        // Learn
        vscode.commands.registerCommand(
            "codeSensei.learn",
            () => {

                vscode.window.showInformationMessage(
                    "📚 Learn command triggered!"
                );

            }
        ),


        // Interview
        vscode.commands.registerCommand(
            "codeSensei.interview",
            () => {

                vscode.window.showInformationMessage(
                    "🧠 Interview command triggered!"
                );

            }
        )

    );

    console.log(
        "🥋 Code Sensei Activated"
    );
}


export function deactivate() {}