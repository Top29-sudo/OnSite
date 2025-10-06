# Quick Start Guide - Bolt.new Clone

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

This will install all required packages including:
- `@google/generative-ai` - Google Gemini AI SDK
- `@webcontainer/api` - WebContainer for running code in browser
- `@xterm/xterm` - Terminal emulator
- And all other dependencies

### Step 2: Start Development Server
```bash
npm run dev
```

This will start the Vite development server, typically at `http://localhost:5173`

### Step 3: Access the AI Builder
Navigate to: `http://localhost:5173/bolt`

## 🎯 First Time Usage

1. **You'll see a chat interface** with example prompts
2. **Click an example** or type your own prompt
3. **Wait for generation** - The AI will create your website (10-30 seconds)
4. **View the result** - Automatically switches to code view with preview

## 💡 Example Prompts to Try

### Beginner
- "Create a simple personal portfolio website"
- "Build a landing page for a coffee shop"

### Intermediate  
- "Create a todo app with React and local storage"
- "Build a weather app with a modern UI"

### Advanced
- "Create a full-featured e-commerce product page with cart"
- "Build a dashboard with charts and data visualization"

## 🔧 Using the Interface

### Chat View
- Type prompts to generate new websites
- See generation progress and logs
- View error messages and fixes

### Code View
Three panels:
1. **Left**: File tree - Click files to edit
2. **Middle Top**: Code editor - Edit and save files
3. **Middle Bottom**: Terminal - Run commands
4. **Right**: Live preview - See your changes

## 🎨 Editing Generated Code

1. Click any file in the file tree
2. Make your changes in the editor
3. Click "Save" button
4. Refresh preview to see changes

## 🖥️ Using the Terminal

The terminal allows you to run commands:
```bash
npm install <package-name>
npm run build
npm start
```

## 🔄 Common Workflows

### Generate → Edit → Preview
1. Generate website with prompt
2. Edit files as needed
3. Save changes
4. Preview updates automatically

### Add New Features
1. Use chat to request modifications
2. AI will update existing code
3. Review and test changes

### Debug Issues
1. Check terminal for errors
2. Use AI to fix errors
3. Save and test again

## ⚠️ Important Notes

- **Browser Compatibility**: Use Chrome, Edge, or other Chromium browsers
- **First Load**: May take 30-60 seconds to initialize WebContainer
- **Large Apps**: Complex applications need more time to install dependencies
- **Refreshing**: Refreshing the page will reset the WebContainer (files are lost)

## 🆘 Troubleshooting

### "WebContainer failed to boot"
- Refresh the page
- Check browser console for errors
- Ensure you're using a supported browser

### "Preview not loading"
- Wait for npm install to complete (check terminal)
- Ensure dev server started successfully
- Click refresh button in preview panel

### "AI generation slow"
- This is normal for complex prompts
- Gemini API may have rate limits
- Wait patiently, it typically completes in 10-30 seconds

### "Files not saving"
- Check that WebContainer is initialized
- Look for errors in browser console
- Try refreshing and regenerating

## 🎓 Tips for Best Results

1. **Be Specific**: "Create a landing page with hero section, features, and contact form"
2. **Mention Tech**: "Build a React todo app using hooks and local storage"
3. **Describe Style**: "Modern, minimal design with dark mode"
4. **Include Features**: "Add form validation and error handling"

## 📚 Next Steps

- Explore the code to understand how it works
- Try different types of websites
- Modify the AI prompts for better results
- Customize the UI to your liking

## 🎉 You're Ready!

Start building amazing websites with AI! Navigate to `/bolt` and start creating.

---

Need help? Check the main README_BOLT.md for detailed documentation.
