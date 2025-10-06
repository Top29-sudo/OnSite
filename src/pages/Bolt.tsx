import React, { useState, useCallback } from 'react';
import { BoltChat } from '../components/bolt/BoltChat';
import { Terminal } from '../components/bolt/Terminal';
import { Preview } from '../components/bolt/Preview';
import { CodeEditor } from '../components/bolt/CodeEditor';
import { FileTree } from '../components/bolt/FileTree';
import { geminiService } from '../services/gemini';
import { webContainerService } from '../services/webcontainer';
import toast from 'react-hot-toast';
import { Code2, Monitor, Terminal as TerminalIcon, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

type ViewMode = 'chat' | 'code';

export const Bolt: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [files, setFiles] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('chat');
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const addMessage = (type: Message['type'], content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const handlePromptSubmit = useCallback(async (prompt: string) => {
    addMessage('user', prompt);
    setIsGenerating(true);

    try {
      // Generate website using Gemini AI
      addMessage('system', '🤖 Generating your website with Gemini AI...');
      const result = await geminiService.generateWebsite(prompt);

      addMessage('system', `✅ Generated ${Object.keys(result.files).length} files`);
      addMessage('assistant', `I've created your website! Here's what I built:\n\n${Object.keys(result.files).join('\n')}`);

      // Mount files to WebContainer
      addMessage('system', '📦 Setting up WebContainer...');
      try {
        await webContainerService.mountFiles(result.files);
        setFiles(result.files);
      } catch (error) {
        console.error('WebContainer error:', error);
        addMessage('system', '⚠️ WebContainer unavailable on GitHub Pages. Files generated but cannot be executed here.');
        addMessage('system', '💡 To run the code: Download files or deploy to Vercel/Netlify, or run locally.');
        setFiles(result.files);
        setViewMode('code');
        return;
      }

      addMessage('system', '⚙️ Installing dependencies...');
      
      // Run installation and start dev server
      const installResult = await webContainerService.runCommand('npm install');
      
      if (installResult.exitCode === 0) {
        addMessage('system', '✅ Dependencies installed successfully');
        
        addMessage('system', '🚀 Starting development server...');
        
        // Start dev server
        try {
          await webContainerService.runCommand('npm start &');
          
          // Wait a bit for server to start
          await new Promise(resolve => setTimeout(resolve, 3000));
          
          const url = await webContainerService.getUrl();
          if (url) {
            setPreviewUrl(url);
            addMessage('system', `✅ Preview ready at ${url}`);
            toast.success('Website generated successfully!');
            
            // Switch to code view
            setViewMode('code');
          }
        } catch (error) {
          console.error('Server start error:', error);
          addMessage('system', '⚠️ Server started in background. Check terminal for status.');
          setViewMode('code');
        }
      } else {
        addMessage('system', `⚠️ Installation had some issues:\n${installResult.output}`);
        toast.error('Some issues during installation');
      }

    } catch (error) {
      console.error('Generation error:', error);
      addMessage('system', `❌ Error: ${(error as Error).message}`);
      toast.error('Failed to generate website');
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const handleFileSelect = (path: string) => {
    setSelectedFile(path);
  };

  const handleFileSave = () => {
    toast.success('File saved successfully!');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Top Navigation */}
      <div className="bg-gray-900 border-b border-gray-700 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('chat')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'chat'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Chat
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'code'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Code2 className="w-4 h-4" />
              Code
            </button>
          </div>
          <div className="text-sm text-gray-400">
            {Object.keys(files).length > 0 && `${Object.keys(files).length} files loaded`}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'chat' ? (
          <BoltChat
            messages={messages}
            isGenerating={isGenerating}
            onPromptSubmit={handlePromptSubmit}
          />
        ) : (
          <div className="h-full grid grid-cols-12 gap-4 p-4">
            {/* Left Sidebar - File Tree */}
            <div className="col-span-2">
              <FileTree
                files={files}
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
              />
            </div>

            {/* Middle - Code Editor and Terminal */}
            <div className="col-span-5 flex flex-col gap-4">
              <div className="flex-1">
                <CodeEditor
                  selectedFile={selectedFile}
                  onSave={handleFileSave}
                />
              </div>
              <div className="h-64">
                <Terminal />
              </div>
            </div>

            {/* Right - Preview */}
            <div className="col-span-5">
              <Preview onUrlChange={setPreviewUrl} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
