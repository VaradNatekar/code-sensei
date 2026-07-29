import * as vscode from "vscode";

export class EditorService {

    public static getActiveEditor(): vscode.TextEditor | undefined {
        return vscode.window.activeTextEditor;
    }

    public static hasActiveEditor(): boolean {
        return this.getActiveEditor() !== undefined;
    }

    public static hasSelection(): boolean {

        const editor = this.getActiveEditor();

        if (!editor) {
            return false;
        }

        return !editor.selection.isEmpty;
    }

    public static getSelectedCode(): string | null {

        const editor = this.getActiveEditor();

        if (!editor) {
            return null;
        }

        if (editor.selection.isEmpty) {
            return null;
        }

        return editor.document.getText(editor.selection);

    }

    public static getCurrentFileName(): string | null {

        const editor = this.getActiveEditor();

        if (!editor) {
            return null;
        }

        return editor.document.fileName;

    }

    public static getLanguage(): string | null {

        const editor = this.getActiveEditor();

        if (!editor) {
            return null;
        }

        return editor.document.languageId;

    }

    public static getFullFileContent(): string | null {

        const editor = this.getActiveEditor();

        if (!editor) {
            return null;
        }

        return editor.document.getText();

    }

}