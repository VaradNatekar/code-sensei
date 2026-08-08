import * as vscode from "vscode";
import { AIService } from "../ai/AIService";

export async function explainFileCommand() {

    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        vscode.window.showWarningMessage(
            "No active editor found."
        );
        return;
    }

    const code = editor.document.getText();
    const language = editor.document.languageId;
    const fileName = editor.document.fileName;

    const prompt = `
You are Code Sensei.

Analyze this entire ${language} file.

File:
${fileName}

Code:

${code}

Return the answer in Markdown.

# Purpose

Explain what this file does.

# Main Components

Describe the important classes/functions.

# Flow

Explain how execution flows.

# Good Practices

Mention what is good.

# Problems

Mention bugs or bad practices.

# Improvements

Suggest improvements.
`;

    const response = await AIService.generate(prompt);

    vscode.window.showInformationMessage(
        "Explain File feature created successfully!"
    );

    console.log(response);
}