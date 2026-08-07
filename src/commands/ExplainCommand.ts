import * as vscode from "vscode";

export async function explainCommand() {

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

    vscode.window.showInformationMessage(
        "🚀 Explain Command Works!"
    );

}