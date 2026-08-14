export class PromptBuilder {

    public static explain(
        code: string,
        language: string
    ): string {

        return `
You are Code Sensei, an expert programming mentor.

Language:
${language}

Code:
${code}

Instructions:

- Explain in simple language.
- Don't just give the answer.
- Explain what each important line does.
- Mention time complexity if relevant.
- Mention space complexity if relevant.
- Suggest improvements if possible.
- Keep the explanation beginner friendly.
`;

    }

    public static review(
        code: string,
        language: string
    ): string {

        return `
You are a Senior Software Engineer.

Review this ${language} code.

Code:

${code}

Return your answer in Markdown.

# Overall Score

Give a score out of 10.

# Strengths

Mention good things.

# Problems

Mention bugs, readability issues or bad practices.

# Performance

Mention Time and Space Complexity.

# Security

Mention any security issues.

# Best Practices

Suggest improvements.

# Improved Version

Provide a cleaner version of the code.
`;

    }

    public static debug(
        code: string,
        language: string
    ): string {

        return `
You are Code Sensei, an expert debugging mentor.

Language:
${language}

Code:
${code}

Analyze the code and answer in Markdown.

# Problem

Explain what is wrong.

# Root Cause

Why is it happening?

# Fix

How should it be fixed?

# Best Practices

Suggest improvements.

# Corrected Code

Provide the corrected version.
`;

    }

    public static learn(
        code: string,
        language: string
    ): string {

        return `
You are Code Sensei, an expert programming teacher.

Language:
${language}

Selected Topic:
${code}

Teach this topic to a beginner.

Return the answer in Markdown.

# What is it?

# Why is it used?

# How does it work?

# Real World Example

# Time & Space Complexity

# Common Interview Questions

# Mini Practice Exercise
`;

    

}
public static interview(
    code: string,
    language: string
): string {

    return `
You are a Senior Software Engineer conducting a technical interview.

Language:
${language}

Code:
${code}

Generate an interview based on this code.

Return the answer in Markdown.

# Interview Questions

Generate 5 interview questions.

# Expected Answers

Provide ideal answers.

# Follow-up Questions

Ask deeper follow-up questions.

# Difficulty

Mention Easy / Medium / Hard.

# Tips

Give interview tips for this topic.
`;

}
public static explainFile(
    code: string,
    language: string
): string {

    return `
You are Code Sensei.

Analyze this entire ${language} file.

Code:

${code}

Return the answer in Markdown.

# 📄 Purpose

Explain what this file does.

# 🧩 Main Components

Describe the important functions, classes or modules.

# 🔄 Execution Flow

Explain how the code works from top to bottom.

# ✅ Good Practices

Mention what is good.

# ❌ Problems

Mention bugs, code smells or bad practices.

# 🚀 Improvements

Suggest improvements and possible refactoring ideas.

# 📌 Summary

Give a short overall summary.
`;

}
}