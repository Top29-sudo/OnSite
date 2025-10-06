import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { webContainerService } from '../../services/webcontainer';

export const Terminal: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const terminal = new XTerm({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      theme: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
        cursor: '#ffffff',
        selection: '#264f78',
        black: '#000000',
        red: '#cd3131',
        green: '#0dbc79',
        yellow: '#e5e510',
        blue: '#2472c8',
        magenta: '#bc3fbc',
        cyan: '#11a8cd',
        white: '#e5e5e5',
        brightBlack: '#666666',
        brightRed: '#f14c4c',
        brightGreen: '#23d18b',
        brightYellow: '#f5f543',
        brightBlue: '#3b8eea',
        brightMagenta: '#d670d6',
        brightCyan: '#29b8db',
        brightWhite: '#e5e5e5',
      },
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    
    terminal.open(terminalRef.current);
    fitAddon.fit();

    xtermRef.current = terminal;
    fitAddonRef.current = fitAddon;

    terminal.writeln('WebContainer Terminal Ready');
    terminal.writeln('Type commands to interact with your project...');
    terminal.write('\r\n$ ');

    let currentLine = '';

    terminal.onData(async (data) => {
      const code = data.charCodeAt(0);

      if (code === 13) { // Enter
        terminal.write('\r\n');
        
        if (currentLine.trim()) {
          try {
            const result = await webContainerService.runCommand(currentLine);
            terminal.write(result.output);
          } catch (error) {
            terminal.write(`Error: ${(error as Error).message}\r\n`);
          }
        }
        
        currentLine = '';
        terminal.write('$ ');
      } else if (code === 127) { // Backspace
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1);
          terminal.write('\b \b');
        }
      } else if (code >= 32) { // Printable characters
        currentLine += data;
        terminal.write(data);
      }
    });

    const handleResize = () => {
      fitAddon.fit();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      terminal.dispose();
    };
  }, []);

  return (
    <div className="h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
      <div className="bg-[#2d2d2d] px-4 py-2 border-b border-[#3e3e3e] flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <span className="text-sm text-gray-400 ml-2">Terminal</span>
      </div>
      <div ref={terminalRef} className="h-[calc(100%-40px)] p-2" />
    </div>
  );
};
