import * as vscode from "vscode";
import { SidebarProvider } from "./providers/SidebarProvider";

export function activate(context: vscode.ExtensionContext) {

    console.log("🔥 Code Sensei Activated");

    vscode.window.showInformationMessage("🔥 Code Sensei Activated");

    vscode.window.registerTreeDataProvider(
        "codeSensei.sidebar",
        new SidebarProvider()
    );

    const disposable = vscode.commands.registerCommand(
        "code-sensei.helloWorld",
        () => {
            vscode.window.showInformationMessage(
                "Hello World from Code Sensei!"
            );
        }
    );

    context.subscriptions.push(disposable);
}

export function deactivate() {}