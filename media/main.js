const vscode = acquireVsCodeApi();

const explainBtn = document.getElementById("explain");
const debugBtn = document.getElementById("debug");
const learnBtn = document.getElementById("learn");
const interviewBtn = document.getElementById("interview");

const status = document.getElementById("status");
const responseText = document.getElementById("responseText");

explainBtn?.addEventListener("click", () => {

    status.textContent = "🤔 Code Sensei is thinking...";

    responseText.textContent =
        "Generating explanation...";

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
                "🤔 Code Sensei is thinking...";

            responseText.textContent =
                "Analyzing your code...";

            break;

        case "response":

            status.textContent =
                "✅ Explanation Ready";

            responseText.textContent =
                message.text;

            break;

        case "error":

            status.textContent =
                "❌ Error";

            responseText.textContent =
                message.text;

            break;

    }

});