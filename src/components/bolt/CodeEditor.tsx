import React, { useState, useEffect } from 'react';
import { Save, FileCode } from 'lucide-react';
import { webContainerService } from '../../services/webcontainer';

interface CodeEditorProps {
  selectedFile: string | null;
  onSave?: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ selectedFile, onSave }) => {
  const [content, setContent] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [lineNumbers, setLineNumbers] = useState<number[]>([]);

  useEffect(() => {
    if (selectedFile) {
      loadFile(selectedFile);
    } else {
      setContent('');
      setLineNumbers([]);
    }
  }, [selectedFile]);

  useEffect(() => {
    const lines = content.split('\n');
    setLineNumbers(Array.from({ length: lines.length }, (_, i) => i + 1));
  }, [content]);

  const loadFile = async (path: string) => {
    try {
      const fileContent = await webContainerService.readFile(path);
      setContent(fileContent);
    } catch (error) {
      console.error('Error loading file:', error);
      setContent(`// Error loading file: ${path}`);
    }
  };

  const handleSave = async () => {
    if (!selectedFile) return;
    
    setIsSaving(true);
    try {
      await webContainerService.writeFile(selectedFile, content);
      onSave?.();
    } catch (error) {
      console.error('Error saving file:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const getLanguageFromFilename = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'js':
      case 'jsx':
        return 'javascript';
      case 'ts':
      case 'tsx':
        return 'typescript';
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'json':
        return 'json';
      default:
        return 'plaintext';
    }
  };

  return (
    <div className="h-full bg-[#1e1e1e] rounded-lg overflow-hidden flex flex-col">
      <div className="bg-[#2d2d2d] px-4 py-2 border-b border-[#3e3e3e] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-gray-300">
            {selectedFile || 'No file selected'}
          </span>
        </div>
        {selectedFile && (
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded text-sm transition-colors"
          >
            <Save className="w-3 h-3" />
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        )}
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="bg-[#1e1e1e] text-gray-500 text-right pr-3 py-4 select-none font-mono text-sm border-r border-[#3e3e3e]">
          {lineNumbers.map((num) => (
            <div key={num} className="leading-6">
              {num}
            </div>
          ))}
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 bg-[#1e1e1e] text-gray-100 p-4 font-mono text-sm resize-none outline-none leading-6"
          style={{ tabSize: 2 }}
          spellCheck={false}
          placeholder={selectedFile ? 'Loading...' : 'Select a file to edit'}
        />
      </div>
    </div>
  );
};
