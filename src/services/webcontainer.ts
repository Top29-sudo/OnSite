import { WebContainer } from '@webcontainer/api';
import type { FileSystemTree } from '@webcontainer/api';

class WebContainerService {
  private container: WebContainer | null = null;
  private bootPromise: Promise<void> | null = null;

  async init(): Promise<WebContainer> {
    if (this.container) {
      return this.container;
    }

    if (this.bootPromise) {
      await this.bootPromise;
      return this.container!;
    }

    this.bootPromise = (async () => {
      try {
        // Note: WebContainer requires specific CORS headers which GitHub Pages doesn't support
        // This will work on localhost and platforms like Vercel/Netlify
        this.container = await WebContainer.boot();
        console.log('WebContainer booted successfully');
      } catch (error) {
        console.error('Failed to boot WebContainer:', error);
        console.warn('WebContainer requires CORS headers. Please use Vercel, Netlify, or run locally.');
        // Don't throw - allow app to load even if WebContainer fails
        // throw error;
      }
    })();

    await this.bootPromise;
    return this.container!;
  }

  async mountFiles(files: Record<string, string>): Promise<void> {
    const container = await this.init();
    
    const fileTree: FileSystemTree = {};
    
    for (const [path, content] of Object.entries(files)) {
      const parts = path.split('/');
      let current = fileTree;
      
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) {
          current[part] = {
            directory: {}
          };
        }
        current = (current[part] as any).directory;
      }
      
      const filename = parts[parts.length - 1];
      current[filename] = {
        file: {
          contents: content
        }
      };
    }
    
    await container.mount(fileTree);
    console.log('Files mounted:', Object.keys(files));
  }

  async runCommand(command: string): Promise<{ output: string; exitCode: number }> {
    const container = await this.init();
    
    const parts = command.split('&&').map(c => c.trim());
    let output = '';
    
    for (const cmd of parts) {
      const [executable, ...args] = cmd.split(' ');
      
      try {
        const process = await container.spawn(executable, args);
        
        const outputPromise = new Promise<string>((resolve) => {
          let out = '';
          process.output.pipeTo(new WritableStream({
            write(data) {
              out += data;
              console.log(data);
            }
          }));
          
          process.exit.then(() => {
            resolve(out);
          });
        });
        
        const exitCode = await process.exit;
        const cmdOutput = await outputPromise;
        output += cmdOutput + '\n';
        
        if (exitCode !== 0) {
          return { output, exitCode };
        }
      } catch (error) {
        console.error('Command execution error:', error);
        return { 
          output: output + '\nError: ' + (error as Error).message, 
          exitCode: 1 
        };
      }
    }
    
    return { output, exitCode: 0 };
  }

  async startDevServer(): Promise<string> {
    const container = await this.init();
    
    try {
      // Start the dev server
      const installProcess = await container.spawn('npm', ['install']);
      await installProcess.exit;
      
      const devProcess = await container.spawn('npm', ['start']);
      
      // Wait for server to be ready
      container.on('server-ready', (port, url) => {
        console.log('Server ready on:', url);
      });
      
      // Get the URL
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Return the preview URL
      return container.url || '';
    } catch (error) {
      console.error('Failed to start dev server:', error);
      throw error;
    }
  }

  async getUrl(): Promise<string> {
    const container = await this.init();
    return container.url || '';
  }

  async writeFile(path: string, content: string): Promise<void> {
    const container = await this.init();
    await container.fs.writeFile(path, content);
  }

  async readFile(path: string): Promise<string> {
    const container = await this.init();
    const content = await container.fs.readFile(path, 'utf-8');
    return content;
  }

  async listFiles(path: string = '/'): Promise<string[]> {
    const container = await this.init();
    try {
      const files = await container.fs.readdir(path);
      return files;
    } catch (error) {
      console.error('Error listing files:', error);
      return [];
    }
  }

  getContainer(): WebContainer | null {
    return this.container;
  }
}

export const webContainerService = new WebContainerService();
