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
    const systemPrompt = `You are a GOD-TIER full-stack architect with 20+ years of experience. You create FLAWLESS, production-ready applications that Fortune 500 companies would pay millions for.

🎯 CORE MISSION: Generate a COMPLETE, BULLETPROOF, PRODUCTION-GRADE application based on user requirements.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 ABSOLUTE REQUIREMENTS - NO EXCEPTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ARCHITECTURE EXCELLENCE
   ✓ Component-based architecture with clear separation of concerns
   ✓ Modular, reusable, and maintainable code structure
   ✓ Type safety with JSDoc comments where applicable
   ✓ Clean code principles (DRY, SOLID, KISS)
   ✓ Professional folder structure

2. FRONTEND MASTERY
   ✓ Modern React with functional components and hooks
   ✓ Responsive design (mobile-first approach)
   ✓ Accessibility (WCAG 2.1 AA compliant)
   ✓ SEO optimized (meta tags, semantic HTML, structured data)
   ✓ Performance optimized (lazy loading, code splitting, memoization)
   ✓ Cross-browser compatibility
   ✓ Beautiful, modern UI with smooth animations
   ✓ Loading states, error states, empty states
   ✓ Form validation with helpful error messages
   ✓ Professional color schemes and typography

3. BACKEND EXCELLENCE (when required)
   ✓ RESTful API design with proper HTTP methods
   ✓ Input validation and sanitization
   ✓ Authentication & authorization (JWT, session management)
   ✓ Database schema design with relationships
   ✓ Error handling with meaningful messages
   ✓ Rate limiting and security headers
   ✓ CORS configuration
   ✓ Environment variables for sensitive data
   ✓ Logging and monitoring
   ✓ API documentation

4. DATA & STATE MANAGEMENT
   ✓ Proper state management (Context API, hooks, or state libraries)
   ✓ Local storage/session storage when appropriate
   ✓ Optimistic UI updates
   ✓ Data persistence strategies
   ✓ Caching mechanisms
   ✓ Real-time updates (when applicable)

5. SECURITY FORTRESS
   ✓ Input sanitization (XSS prevention)
   ✓ CSRF protection
   ✓ SQL injection prevention
   ✓ Secure authentication (bcrypt, JWT)
   ✓ HTTPS-ready configuration
   ✓ Security headers (helmet.js)
   ✓ Rate limiting
   ✓ Environment variables for secrets
   ✓ Secure cookie configuration

6. ERROR HANDLING & VALIDATION
   ✓ Try-catch blocks for async operations
   ✓ User-friendly error messages
   ✓ Fallback UI for errors
   ✓ Form validation (client & server)
   ✓ Input type checking
   ✓ Graceful degradation

7. PERFORMANCE OPTIMIZATION
   ✓ Code splitting and lazy loading
   ✓ Image optimization (WebP, lazy loading)
   ✓ Minification and compression
   ✓ CDN-ready assets
   ✓ Service workers for caching (PWA when applicable)
   ✓ Database query optimization
   ✓ Debouncing and throttling

8. TESTING & QUALITY
   ✓ No console.errors in production
   ✓ No TODO comments
   ✓ No placeholder/dummy data without context
   ✓ All imports used
   ✓ All functions implemented
   ✓ No broken links or references

9. DOCUMENTATION & MAINTAINABILITY
   ✓ Clear comments for complex logic
   ✓ README with setup instructions
   ✓ API endpoint documentation
   ✓ Environment variable examples (.env.example)
   ✓ Meaningful variable and function names

10. PRODUCTION READINESS
    ✓ Environment configurations (dev, staging, prod)
    ✓ Build scripts optimized
    ✓ Deployment-ready
    ✓ Health check endpoints
    ✓ Monitoring hooks
    ✓ Error tracking integration points

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 DESIGN STANDARDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Use modern, professional design systems
✓ Consistent spacing (8px grid system)
✓ Professional color palette (primary, secondary, accent, neutral)
✓ Modern typography (system fonts or Google Fonts)
✓ Smooth transitions and animations (0.2s-0.3s)
✓ Micro-interactions for better UX
✓ Proper visual hierarchy
✓ High contrast for readability
✓ Dark mode support (when applicable)
✓ Skeleton loaders for async content

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏗️ TECHNOLOGY STACK SELECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FRONTEND (Choose based on requirements):
- Simple sites: Vite + React or vanilla JS
- Complex apps: Vite + React with state management
- Static sites: Optimized HTML/CSS/JS

BACKEND (When required):
- API: Express.js with proper middleware
- Database: JSON file, SQLite, or MongoDB schema
- Authentication: JWT with refresh tokens

STYLING:
- Tailwind CSS (preferred for utility-first)
- Or modern CSS with CSS Grid/Flexbox
- CSS variables for theming

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 REQUIRED FILE STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ALWAYS INCLUDE:
✓ package.json (complete with all dependencies and scripts)
✓ index.html (SEO optimized with meta tags)
✓ Main application files
✓ README.md (setup and usage instructions)
✓ .env.example (if environment variables needed)
✓ .gitignore
✓ vite.config.js (for Vite projects)

FOR BACKEND PROJECTS, ALSO INCLUDE:
✓ server.js or index.js (backend entry)
✓ routes/ directory files
✓ controllers/ directory files
✓ models/ directory files
✓ middleware/ directory files
✓ config/ directory files
✓ utils/ directory files

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💎 CODE QUALITY STANDARDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ ES6+ modern JavaScript syntax
✓ Async/await over callbacks
✓ Descriptive variable names (no x, y, temp)
✓ Functions should be pure when possible
✓ Single Responsibility Principle
✓ Proper indentation (2 spaces)
✓ Semicolons for consistency
✓ No unused variables or imports
✓ PropTypes or TypeScript interfaces in comments
✓ Comprehensive error messages

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 RESPONSE FORMAT - CRITICAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Return ONLY valid JSON. NO markdown. NO explanations. NO comments outside files.

{
  "files": {
    "package.json": "{ complete package.json content }",
    "index.html": "<!DOCTYPE html>...",
    "vite.config.js": "export default...",
    "README.md": "# Project Name\\n\\n...",
    ".gitignore": "node_modules\\n...",
    ".env.example": "API_KEY=your_key_here\\n...",
    "src/App.jsx": "import React...",
    "src/components/Component.jsx": "...",
    "src/styles/main.css": "...",
    "src/utils/helpers.js": "...",
    "src/services/api.js": "...",
    "server/index.js": "...",
    "server/routes/api.js": "...",
    "server/controllers/controller.js": "...",
    "server/models/model.js": "...",
    "server/middleware/auth.js": "...",
    "server/config/database.js": "..."
  },
  "mainCommand": "npm install && npm run dev"
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 USER REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${prompt}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REMEMBER:
- This code will be deployed to production IMMEDIATELY
- Millions of users depend on this working FLAWLESSLY
- Your reputation as a god-tier developer is on the line
- NO ERRORS. NO SHORTCUTS. NO COMPROMISES.
- Make it BEAUTIFUL, FAST, SECURE, and BULLETPROOF.

NOW CREATE THE PERFECT APPLICATION.`;

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
      
      // Validate the response
      if (!parsed.files || Object.keys(parsed.files).length === 0) {
        console.warn('No files generated, using fallback');
        return this.getFallbackTemplate(prompt);
      }
      
      return parsed;
    } catch (error) {
      console.error('Gemini API Error:', error);
      // Return a fallback template
      return this.getFallbackTemplate(prompt);
    }
  }

  async fixError(errorMessage: string, code: string, filename: string): Promise<string> {
    const fixPrompt = `You are a MASTER DEBUGGER and ERROR ELIMINATION SPECIALIST.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🐛 CRITICAL ERROR FIX MISSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

File: ${filename}
Error: ${errorMessage}

REQUIREMENTS:
✓ Fix the error COMPLETELY - no band-aids, proper solutions
✓ Maintain all existing functionality
✓ Preserve code style and structure
✓ Add defensive programming where needed
✓ Include proper error handling
✓ Add comments explaining the fix (if complex)
✓ Ensure the fix won't introduce new bugs
✓ Follow best practices and patterns
✓ Make the code more robust than before

CURRENT CODE:
${code}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Return ONLY the COMPLETE, CORRECTED code for this file. No explanations outside the code.
Make it BULLETPROOF.`;

    try {
      const result = await this.model.generateContent(fixPrompt);
      const response = await result.response;
      let fixedCode = response.text().trim();
      
      // Remove markdown code blocks if present
      if (fixedCode.startsWith('```')) {
        fixedCode = fixedCode.replace(/```[\w]*\n?/g, '').replace(/```\n?$/g, '');
      }
      
      return fixedCode;
    } catch (error) {
      console.error('Error fixing code:', error);
      return code;
    }
  }

  async enhanceCode(code: string, enhancement: string): Promise<string> {
    const enhancePrompt = `You are a CODE OPTIMIZATION MASTER and FEATURE ENHANCEMENT EXPERT.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 CODE ENHANCEMENT MISSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Enhancement Request: ${enhancement}

REQUIREMENTS FOR ENHANCEMENT:
✓ Implement the requested enhancement PERFECTLY
✓ Maintain backward compatibility
✓ Keep existing functionality intact
✓ Follow best practices and design patterns
✓ Optimize performance where possible
✓ Add proper error handling for new code
✓ Include helpful comments for new/complex logic
✓ Ensure type safety
✓ Make code more maintainable
✓ Add input validation where needed
✓ Use modern ES6+ features
✓ Follow DRY principle

ADDITIONAL IMPROVEMENTS TO INCLUDE:
✓ Better variable/function names if needed
✓ Code organization improvements
✓ Performance optimizations
✓ Security enhancements
✓ Accessibility improvements (if UI code)

CURRENT CODE:
${code}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Return ONLY the COMPLETE, ENHANCED code. No explanations outside the code.
Make it PRODUCTION-GRADE.`;

    try {
      const result = await this.model.generateContent(enhancePrompt);
      const response = await result.response;
      let enhancedCode = response.text().trim();
      
      // Remove markdown code blocks if present
      if (enhancedCode.startsWith('```')) {
        enhancedCode = enhancedCode.replace(/```[\w]*\n?/g, '').replace(/```\n?$/g, '');
      }
      
      return enhancedCode;
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
          "type": "module",
          "scripts": {
            "dev": "vite",
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
    <meta name="description" content="${prompt}">
    <title>${prompt}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✨ Welcome</h1>
            <p class="subtitle">Production-Ready Application</p>
        </div>
        <div class="content">
            <p class="description">${prompt}</p>
            <div class="features">
                <div class="feature">
                    <span class="icon">🚀</span>
                    <span>Fast & Optimized</span>
                </div>
                <div class="feature">
                    <span class="icon">🔒</span>
                    <span>Secure by Default</span>
                </div>
                <div class="feature">
                    <span class="icon">📱</span>
                    <span>Fully Responsive</span>
                </div>
            </div>
        </div>
    </div>
    <script type="module" src="script.js"></script>
</body>
</html>`,
        'styles.css': `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary: #667eea;
    --secondary: #764ba2;
    --text-dark: #2d3748;
    --text-light: #718096;
    --bg-white: #ffffff;
    --shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}

.container {
    background: var(--bg-white);
    padding: 3rem;
    border-radius: 24px;
    box-shadow: var(--shadow);
    max-width: 600px;
    width: 100%;
    animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.header {
    text-align: center;
    margin-bottom: 2rem;
}

h1 {
    color: var(--text-dark);
    margin-bottom: 0.5rem;
    font-size: 2.5rem;
    font-weight: 700;
}

.subtitle {
    color: var(--text-light);
    font-size: 1rem;
}

.content {
    text-align: center;
}

.description {
    color: var(--text-dark);
    font-size: 1.1rem;
    margin-bottom: 2rem;
    line-height: 1.6;
}

.features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
}

.feature {
    padding: 1rem;
    background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    transition: transform 0.2s ease;
}

.feature:hover {
    transform: translateY(-4px);
}

.icon {
    font-size: 2rem;
}

@media (max-width: 640px) {
    .container {
        padding: 2rem;
    }
    
    h1 {
        font-size: 2rem;
    }
}`,
        'script.js': `// Production-ready JavaScript
console.log('🚀 Application initialized successfully!');

// DOM Ready Handler
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM loaded and ready');
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease-out';
        observer.observe(el);
    });
});

// Error handler
window.addEventListener('error', (event) => {
    console.error('Application error:', event.error);
});

// Performance monitoring
window.addEventListener('load', () => {
    if (performance && performance.getEntriesByType) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('📊 Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
    }
});`,
        'vite.config.js': `import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
});`,
        'README.md': `# ${prompt}

Production-ready web application built with modern technologies.

## 🚀 Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

## 📦 Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build

## ✨ Features

- ⚡ Lightning-fast performance
- 📱 Fully responsive design
- 🔒 Security best practices
- ♿ Accessible (WCAG 2.1 AA)
- 🎨 Beautiful modern UI

## 🛠️ Tech Stack

- Vite - Build tool
- Modern JavaScript (ES6+)
- CSS3 with animations

## 📄 License

MIT
`,
        '.gitignore': `# Dependencies
node_modules/

# Build output
dist/
build/

# Environment variables
.env
.env.local

# Logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# Editor directories
.vscode/
.idea/
`
      },
      mainCommand: 'npm install && npm run dev'
    };
  }
}

export const geminiService = new GeminiService();
