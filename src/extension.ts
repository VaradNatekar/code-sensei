import * as vscode from "vscode";
import { SenseiViewProvider } from "./webview/SenseiViewProvider";

export function activate(context: vscode.ExtensionContext) {

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