const vscode = acquireVsCodeApi();

const explainBtn = document.getElementById("explain");
const debugBtn = document.getElementById("debug");
const learnBtn = document.getElementById("learn");
const interviewBtn = document.getElementById("interview");

const status = document.getElementById("status");
const chatHistory = document.getElementById("chatHistory");

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

            addMessage(
                "ai",
                message.text
            );

            break;

        case "error":

            status.textContent =
                "❌ Error";

            addMessage(
                "ai",
                message.text
            );

            break;

    }

});