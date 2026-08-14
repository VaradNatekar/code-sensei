# 🥋 Code Sensei

> An AI-powered coding mentor that helps developers **learn, understand, debug, review, and improve code** instead of simply copying solutions.

Code Sensei is a Visual Studio Code extension designed around one idea:

**Learn instead of copy.**

It brings an AI programming mentor directly into VS Code so developers can understand their code, practice concepts, prepare for interviews, and improve their problem-solving skills without leaving the editor.

---

## ✨ Features

### 💡 Explain Selected Code

Select any piece of code and ask Code Sensei to explain:

- What the code does
- How it works
- Important concepts
- Step-by-step execution

### 📊 Code Review

Get an AI-powered review of selected code covering:

- Code quality
- Potential issues
- Best practices
- Improvements
- Maintainability

### 🐞 Debug My Code

Use Code Sensei to analyze selected code and identify:

- Bugs
- Possible causes
- Logic problems
- Suggested fixes
- Debugging approaches

### 📚 Learn a Concept

Learn programming concepts in a beginner-friendly format:

- What is it?
- Why is it used?
- How does it work?
- Real-world example
- Time & space complexity
- Interview questions
- Practice exercise

### 🧠 Interview Mode

Generate technical interview preparation based on your selected code.

Code Sensei provides:

- Interview questions
- Expected answers
- Follow-up questions
- Difficulty levels
- Interview tips

### 📄 Explain Current File

Analyze an entire source file and understand:

- File purpose
- Main components
- Execution flow
- Good practices
- Problems
- Possible improvements

### 🧪 Generate Unit Tests

Generate unit tests for selected code to help developers understand testing patterns and improve code reliability.

---

## 🎯 Why Code Sensei?

Most AI coding tools focus on generating the answer.

Code Sensei focuses on **teaching the developer how to arrive at the answer**.

The goal is to help developers:

- Understand code
- Develop problem-solving skills
- Learn programming concepts
- Prepare for technical interviews
- Improve existing code
- Write better tests

---

## 🛠️ Tech Stack

- **TypeScript**
- **Visual Studio Code Extension API**
- **VS Code Webviews**
- **Groq API**
- **Groq SDK**
- **Llama 3.3 70B**
- **esbuild**
- **Marked**
- **Highlight.js**

---

## 🏗️ Architecture

```text
┌──────────────────────────┐
│       VS Code UI         │
│                          │
│  Code Sensei Webview     │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│   SenseiViewProvider     │
│                          │
│   Message Handling       │
│   AI Request Pipeline    │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│       AIService          │
│                          │
│   Central AI Interface   │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│      GroqProvider        │
│                          │
│      Groq SDK            │
└────────────┬─────────────┘
             │
             ▼
        Groq API