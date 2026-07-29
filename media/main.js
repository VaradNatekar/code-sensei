const vscode = acquireVsCodeApi();

const explainBtn = document.getElementById("explain");
const debugBtn = document.getElementById("debug");
const learnBtn = document.getElementById("learn");
const interviewBtn = document.getElementById("interview");

explainBtn?.addEventListener("click", () => {

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