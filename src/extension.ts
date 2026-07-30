import * as vscode from "vscode";
import * as dotenv from "dotenv";
import * as path from "path";
import { SenseiViewProvider } from "./webview/SenseiViewProvider";

export function activate(context: vscode.ExtensionContext) {

    // Load .env from the extension root
    const envPath = path.join(context.extensionPath, ".env");

    const result = dotenv.config({
        path: envPath,
    });

    console.log("Env Path:", envPath);

    if (result.error) {
        console.error("❌ Failed to load .env:", result.error);
    } else {
        console.log("✅ .env loaded successfully");
    }

    console.log(
        "Gemini API:",
        process.env.GEMINI_API_KEY ? "FOUND ✅" : "NOT FOUND ❌"
    );

    const provider = new SenseiViewProvider(context.extensionUri);

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            SenseiViewProvider.viewType,
            provider
        )
    );

    console.log("🥋 Code Sensei Activated");
}

export function deactivate() {}