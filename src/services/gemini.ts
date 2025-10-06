import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyAEY3YcIGMKvTJp0RAmhq7pkLq8sLcjvLM';

class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI(API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
  }

  async generateWebsite(prompt: string): Promise<{ files: Record<string, string>, mainCommand: string }> {
    const systemPrompt = `You are an expert full-stack web developer. Generate complete, production-ready code for a website based on the user's request.

CRITICAL INSTRUCTIONS:
1. Return ONLY valid JSON, no markdown, no explanations
2. Include ALL necessary files (HTML, CSS, JavaScript, package.json, etc.)
3. Use modern, professional design patterns
4. Include proper error handling
5. Make it production-ready and beautiful

Return JSON in this EXACT format:
{
  "files": {
    "package.json": "...",
    "index.html": "...",
    "styles.css": "...",
    "script.js": "..."
  },
  "mainCommand": "npm install && npm start"
}

User request: ${prompt}`;

    try {
      const result = await this.model.generateContent(systemPrompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response (handle markdown code blocks)
      let jsonText = text.trim();
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/```\n?/g, '').replace(/```\n?$/g, '');
      }
      
      const parsed = JSON.parse(jsonText);
      return parsed;
    } catch (error) {
      console.error('Gemini API Error:', error);
      // Return a fallback template
      return this.getFallbackTemplate(prompt);
    }
  }

  async fixError(errorMessage: string, code: string, filename: string): Promise<string> {
    const fixPrompt = `Fix this error in the code. Return ONLY the corrected code, no explanations.

File: ${filename}
Error: ${errorMessage}

Current Code:
${code}

Return the fixed code:`;

    try {
      const result = await this.model.generateContent(fixPrompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Error fixing code:', error);
      return code;
    }
  }

  async enhanceCode(code: string, enhancement: string): Promise<string> {
    const enhancePrompt = `Enhance this code: ${enhancement}

Current Code:
${code}

Return ONLY the enhanced code, no explanations:`;

    try {
      const result = await this.model.generateContent(enhancePrompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Error enhancing code:', error);
      return code;
    }
  }

  private getFallbackTemplate(prompt: string): { files: Record<string, string>, mainCommand: string } {
    return {
      files: {
        'package.json': JSON.stringify({
          "name": "generated-app",
          "version": "1.0.0",
          "description": prompt,
          "main": "index.js",
          "scripts": {
            "start": "vite",
            "build": "vite build",
            "preview": "vite preview"
          },
          "dependencies": {
            "vite": "^5.0.0"
          }
        }, null, 2),
        'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${prompt}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Welcome</h1>
        <p>Your app: ${prompt}</p>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
        'styles.css': `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    background: white;
    padding: 3rem;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    text-align: center;
}

h1 {
    color: #333;
    margin-bottom: 1rem;
    font-size: 2.5rem;
}

p {
    color: #666;
    font-size: 1.2rem;
}`,
        'script.js': `console.log('App loaded successfully!');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM ready!');
});`
      },
      mainCommand: 'npm install && npm start'
    };
  }
}

export const geminiService = new GeminiService();
