const vscode = acquireVsCodeApi();

const explainBtn = document.getElementById("explain");
const debugBtn = document.getElementById("debug");
const learnBtn = document.getElementById("learn");
const interviewBtn = document.getElementById("interview");

const copyBtn = document.getElementById("copyBtn");

const status = document.getElementById("status");
const chatHistory = document.getElementById("chatHistory");
const reviewBtn =
    document.getElementById("review");

let lastAIResponse = "";

function addMessage(sender, text) {

    const message = document.createElement("div");

    message.className = "message " + sender;

    const now = new Date();

    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    message.innerHTML = `
        <div class="message-header">
            <span class="sender">
                ${sender === "user" ? "👤 You" : "🥋 Sensei"}
            </span>

            <span class="time">
                ${time}
            </span>
        </div>

        <div class="bubble">
            ${text}
        </div>
    `;

    chatHistory.appendChild(message);

    chatHistory.scrollTo({
    top: chatHistory.scrollHeight,
    behavior: "smooth"
});
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

    addMessage(
        "user",
        "🐞 Debug my selected code."
    );

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

reviewBtn?.addEventListener("click", () => {

    addMessage(
        "user",
        "📊 Review my selected code."
    );

    vscode.postMessage({
        command: "review"
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