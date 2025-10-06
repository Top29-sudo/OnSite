# Bolt.new Clone - AI Website Builder

A powerful AI-powered website builder clone using Gemini 2.0 Flash API and WebContainer technology from StackBlitz.

## 🚀 Features

- **AI-Powered Generation**: Uses Google Gemini 2.0 Flash to generate complete, production-ready websites from a single prompt
- **Live Preview**: Instant preview of generated websites using WebContainer technology
- **Code Editor**: Full-featured code editor with syntax highlighting and file tree navigation
- **Terminal Integration**: Integrated terminal for running commands and viewing build output
- **Error Detection & Fixing**: Automatic error detection with AI-powered fixes
- **Hot Reload**: Real-time updates when editing code
- **Modern UI**: Beautiful, responsive interface inspired by Bolt.new

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **AI**: Google Gemini 2.0 Flash API
- **Container**: WebContainer API from StackBlitz
- **Terminal**: XTerm.js
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router v6

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Navigate to `/bolt` route in your browser

## 🎯 Usage

1. **Access the AI Builder**: Navigate to `/bolt` route
2. **Enter a Prompt**: Describe the website you want to build
3. **Generate**: Click send and wait for AI to generate your website
4. **Preview**: View your website in the live preview panel
5. **Edit**: Make changes to any file using the code editor
6. **Terminal**: Run commands in the integrated terminal

## 🔑 API Configuration

The application is pre-configured with Gemini API credentials:
- **API Key**: `AIzaSyAEY3YcIGMKvTJp0RAmhq7pkLq8sLcjvLM`
- **Model**: `gemini-2.0-flash-exp`

WebContainer authentication is handled automatically.

## 📁 Project Structure

```
src/
├── components/
│   └── bolt/
│       ├── BoltChat.tsx         # Chat interface
│       ├── CodeEditor.tsx       # Code editor component
│       ├── FileTree.tsx         # File tree navigator
│       ├── Preview.tsx          # Live preview iframe
│       └── Terminal.tsx         # Terminal component
├── services/
│   ├── gemini.ts               # Gemini AI integration
│   └── webcontainer.ts         # WebContainer service
├── pages/
│   └── Bolt.tsx                # Main Bolt application
└── App.tsx                     # Main app with routing
```

## 🎨 Features in Detail

### AI Generation
- Converts natural language prompts into complete web applications
- Generates all necessary files (HTML, CSS, JavaScript, package.json)
- Creates production-ready, modern, and responsive code
- Includes error handling and best practices

### Code Editor
- Syntax highlighting for multiple languages
- Line numbers
- File saving functionality
- Real-time editing

### Terminal
- Full terminal emulation
- Execute npm commands
- View build output
- Error tracking

### Live Preview
- Instant preview of your application
- Auto-refresh capability
- External window support
- Sandboxed execution

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

No environment variables are required as API keys are pre-configured.

## 🌟 Example Prompts

Try these prompts to get started:

1. "Create a beautiful landing page for a SaaS product"
2. "Build a todo app with React and local storage"
3. "Create a portfolio website with dark mode"
4. "Build a weather app with API integration"
5. "Create an e-commerce product page"

## 📝 Notes

- WebContainer only works in modern browsers (Chrome, Edge, etc.)
- Some browser features may require HTTPS in production
- Large applications may take longer to install dependencies

## 🚀 Deployment

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is for educational purposes. Please ensure you comply with Google's Gemini API terms of service and StackBlitz's WebContainer usage terms.

## 🙏 Acknowledgments

- Inspired by [Bolt.new](https://bolt.new) by StackBlitz
- Powered by Google Gemini AI
- Built with WebContainer technology

---

**Happy Building! 🎉**
