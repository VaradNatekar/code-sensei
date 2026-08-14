const vscode = acquireVsCodeApi();

const explainBtn = document.getElementById("explain");
const reviewBtn = document.getElementById("review");
const debugBtn = document.getElementById("debug");
const learnBtn = document.getElementById("learn");
const interviewBtn = document.getElementById("interview");
const explainFileBtn = document.getElementById("explainFile");
const generateTestsBtn = document.getElementById("generateTests");

const copyBtn = document.getElementById("copyBtn");

const status = document.getElementById("status");
const chatHistory = document.getElementById("chatHistory");

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
    ${
        sender === "ai"
            ? marked.parse(text)
            : text
    }
</div>
    `;

    chatHistory.appendChild(message);

    chatHistory.scrollTo({
        top: chatHistory.scrollHeight,
        behavior: "smooth"
    });

}

// Copy

copyBtn?.addEventListener("click", async () => {

    if (!lastAIResponse) return;

    await navigator.clipboard.writeText(lastAIResponse);

    status.textContent = "📋 Response copied";

});

// Explain

explainBtn?.addEventListener("click", () => {

    status.textContent = "🤔 Thinking...";

    addMessage(
        "user",
        "💡 Explain the selected code."
    );

    vscode.postMessage({
        command: "explain"
    });

});

// Review

reviewBtn?.addEventListener("click", () => {

    console.log("Review button clicked");

    status.textContent = "🤔 Thinking...";

    addMessage(
        "user",
        "📊 Review my selected code."
    );

    vscode.postMessage({
        command: "review"
    });

});

// Debug

debugBtn?.addEventListener("click", () => {

    status.textContent = "🤔 Thinking...";

    addMessage(
        "user",
        "🐞 Debug my selected code."
    );

    vscode.postMessage({
        command: "debug"
    });

});

// Learn

learnBtn?.addEventListener("click", () => {

    status.textContent = "🤔 Thinking...";

    addMessage(
        "user",
        "📚 Teach me this concept."
    );

    vscode.postMessage({
        command: "learn"
    });

});

// Interview

interviewBtn?.addEventListener("click", () => {

    status.textContent = "🤔 Thinking...";

    addMessage(
        "user",
        "🧠 Generate interview questions."
    );

    vscode.postMessage({
        command: "interview"
    });

});
// Explain Current File

explainFileBtn?.addEventListener("click", () => {

    status.textContent = "🤔 Thinking...";

    addMessage(
        "user",
        "📄 Explain the current file."
    );

    vscode.postMessage({
        command: "explainFile"
    });

});


// Generate Unit Tests

generateTestsBtn?.addEventListener("click", () => {

    status.textContent = "🤔 Generating tests...";

    addMessage(
        "user",
        "🧪 Generate unit tests for my selected code."
    );

    vscode.postMessage({
        command: "generateTests"
    });

});

// Generate Unit Tests

generateTestsBtn?.addEventListener("click", () => {

    status.textContent = "🤔 Generating tests...";

    addMessage(
        "user",
        "🧪 Generate unit tests for my selected code."
    );

    vscode.postMessage({
        command: "generateTests"
    });

});



    // Generate Unit Tests

generateTestsBtn?.addEventListener("click", () => {

    status.textContent = "🤔 Generating tests...";

    addMessage(
        "user",
        "🧪 Generate unit tests for my selected code."
    );

    vscode.postMessage({
        command: "generateTests"
    });

});


// Messages from Extension

window.addEventListener("message", (event) => {

    const message = event.data;

    switch (message.command) {

        case "loading":

            status.textContent = "🤔 Thinking...";
            break;

        case "response":

    status.textContent = "✅ Ready";

    lastAIResponse = message.text;

    addMessage(
        "ai",
        message.text
    );

    setTimeout(() => {

        // Syntax Highlighting
        document
            .querySelectorAll("pre code")
            .forEach((block) => {

                hljs.highlightElement(block);

            });

        // Copy Button
        document
            .querySelectorAll("pre")
            .forEach((pre) => {

                // Prevent duplicate buttons
                if (
                    pre.previousElementSibling &&
                    pre.previousElementSibling.classList.contains("copy-code")
                ) {
                    return;
                }

                const button = document.createElement("button");

                button.className = "copy-code";

                button.textContent = "📋 Copy";

                button.addEventListener(
                    "click",
                    async () => {

                        await navigator.clipboard.writeText(
                            pre.innerText
                        );

                        button.textContent = "✅ Copied!";

                        setTimeout(() => {

                            button.textContent = "📋 Copy";

                        }, 1500);

                    }
                );

                pre.parentNode.insertBefore(
                    button,
                    pre
                );

            });

    }, 0);

    break;

        case "error":

            status.textContent = "❌ Error";

            lastAIResponse = message.text;

            addMessage(
                "ai",
                message.text
            );

            break;

    }

});