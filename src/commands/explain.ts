import * as vscode from "vscode";
import { EditorService } from "../editor/EditorService";
import { PromptBuilder } from "../ai/PromptBuilder";
import { AIService } from "../ai/AIService";

export async function explainCommand(
    webview: vscode.Webview
): Promise<void> {

    if (!EditorService.hasActiveEditor()) {
        vscode.window.showWarningMessage("No active editor found.");
        return;
    }

    if (!EditorService.hasSelection()) {
        vscode.window.showWarningMessage(
            "Please select some code first."
        );
        return;
    }

    const code = EditorService.getSelectedCode();

    if (!code) {
        vscode.window.showWarningMessage(
            "Unable to read selected code."
        );
        return;
    }

    const language = EditorService.getLanguage() ?? "text";

    const prompt = PromptBuilder.explain(
        code,
        language
    );

    const response = await AIService.generate(
        prompt
    );

    vscode.window.showInformationMessage(response);

    console.log("========== PROMPT ==========");
    console.log(prompt);

    console.log("========== RESPONSE ==========");
    console.log(response);
}