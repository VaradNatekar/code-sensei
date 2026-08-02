const vscode = acquireVsCodeApi();

const explainBtn = document.getElementById("explain");
const debugBtn = document.getElementById("debug");
const learnBtn = document.getElementById("learn");
const interviewBtn = document.getElementById("interview");

const copyBtn = document.getElementById("copyBtn");

const status = document.getElementById("status");
const chatHistory = document.getElementById("chatHistory");

let lastAIResponse = "";

function addMessage(sender, text) {

    const bubble = document.createElement("div");

    bubble.className =
        sender === "user"
            ? "user-message"
            : "ai-message";

    bubble.textContent = text;

    chatHistory.appendChild(bubble);

    chatHistory.scrollTop =
        chatHistory.scrollHeight;
}

copyBtn?.addEventListener("click", async () => {

    if (!lastAIResponse) {
        return;
    }

    await navigator.clipboard.writeText(
        lastAIResponse
    );

    status.textContent =
        "📋 Response copied!";
});

explainBtn?.addEventListener("click", () => {

    status.textContent =
        "🤔 Code Sensei is thinking...";

    addMessage(
        "user",
        "💡 Explain the selected code."
    );

    vscode.postMessage({
        command: "explain"
    });

});

debugBtn?.addEventListener("click", () => {

    vscode.postMessage({
        command: "debug"
    });

});

learnBtn?.addEventListener("click", () => {

    vscode.postMessage({
        command: "learn"
    });

});

interviewBtn?.addEventListener("click", () => {

    vscode.postMessage({
        command: "interview"
    });

});

window.addEventListener("message", (event) => {

    const message = event.data;

    switch (message.command) {

        case "loading":

            status.textContent =
                "🤔 Thinking...";

            break;

        case "response":

            status.textContent =
                "✅ Ready";

            lastAIResponse = message.text;

            addMessage(
                "ai",
                message.text
            );

            break;

        case "error":

            status.textContent =
                "❌ Error";

            lastAIResponse = message.text;

            addMessage(
                "ai",
                message.text
            );

            break;

    }

});