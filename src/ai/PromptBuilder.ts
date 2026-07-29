export class PromptBuilder {

    public static explain(code: string, language: string): string {

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

    public static debug(code: string, error: string): string {

        return `
Debug this code.

Code:
${code}

Error:
${error}

Explain:
- Why it happened
- How to fix it
- Best practices
`;

    }

}