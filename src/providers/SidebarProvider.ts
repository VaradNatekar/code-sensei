import * as vscode from "vscode";

export class SidebarProvider implements vscode.TreeDataProvider<Item> {

    getTreeItem(element: Item): vscode.TreeItem {
        return element;
    }

    getChildren(): Thenable<Item[]> {
        return Promise.resolve([
            new Item("🥋 Welcome to Code Sensei"),
            new Item("🚀 AI Mentor Coming Soon"),
            new Item("📚 Learning Mode"),
            new Item("💡 Interview Coach")
        ]);
    }
}

class Item extends vscode.TreeItem {
    constructor(label: string) {
        super(label, vscode.TreeItemCollapsibleState.None);
    }
}