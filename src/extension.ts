import * as vscode from "vscode";
import * as dotenv from "dotenv";
import * as path from "path";
import { SenseiViewProvider } from "./webview/SenseiViewProvider";

export function activate(context: vscode.ExtensionContext) {

    // Load .env
    const envPath = path.join(
        context.extensionPath,
        ".env"
    );

    const result = dotenv.config({
        path: envPath,
    });

    console.log("Env Path:", envPath);

    if (result.error) {
        console.error(
            "❌ Failed to load .env:",
            result.error
        );
    } else {
        console.log("✅ .env loaded successfully");
    }

    console.log(
        "Gemini API:",
        process.env.GEMINI_API_KEY
            ? "FOUND ✅"
            : "NOT FOUND ❌"
    );

    // Sidebar
    const provider =
        new SenseiViewProvider(
            context.extensionUri
        );

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            SenseiViewProvider.viewType,
            provider
        )
    );

    // Command Palette Commands

    context.subscriptions.push(

        vscode.commands.registerCommand(
            "codeSensei.explain",
            () => {
                vscode.window.showInformationMessage(
                    "💡 Explain command triggered!"
                );
            }
        ),

        vscode.commands.registerCommand(
            "codeSensei.review",
            () => {
                vscode.window.showInformationMessage(
                    "📊 Review command triggered!"
                );
            }
        ),

        vscode.commands.registerCommand(
            "codeSensei.debug",
            () => {
                vscode.window.showInformationMessage(
                    "🐞 Debug command triggered!"
                );
            }
        ),

        vscode.commands.registerCommand(
            "codeSensei.learn",
            () => {
                vscode.window.showInformationMessage(
                    "📚 Learn command triggered!"
                );
            }
        )

    );

    console.log("🥋 Code Sensei Activated");

}

export function deactivate() {}