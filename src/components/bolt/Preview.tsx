import React, { useEffect, useState } from 'react';
import { RefreshCw, ExternalLink } from 'lucide-react';
import { webContainerService } from '../../services/webcontainer';

interface PreviewProps {
  onUrlChange?: (url: string) => void;
}

export const Preview: React.FC<PreviewProps> = ({ onUrlChange }) => {
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    loadPreview();
  }, []);

  const loadPreview = async () => {
    setIsLoading(true);
    try {
      const url = await webContainerService.getUrl();
      if (url) {
        setPreviewUrl(url);
        onUrlChange?.(url);
      }
    } catch (error) {
      console.error('Failed to load preview:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    setKey(prev => prev + 1);
  };

  const handleOpenExternal = () => {
    if (previewUrl) {
      window.open(previewUrl, '_blank');
    }
  };

  return (
    <div className="h-full bg-white rounded-lg overflow-hidden flex flex-col">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="flex-1 bg-white rounded px-3 py-1 text-sm text-gray-600 flex items-center">
          <span className="text-gray-400 mr-2">🔒</span>
          {previewUrl || 'Loading preview...'}
        </div>
        <button
          onClick={handleRefresh}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Refresh"
          disabled={isLoading}
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
        <button
          onClick={handleOpenExternal}
          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
          title="Open in new tab"
          disabled={!previewUrl}
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-500" />
              <p className="text-gray-600">Loading preview...</p>
            </div>
          </div>
        )}
        {previewUrl ? (
          <iframe
            key={key}
            src={previewUrl}
            className="w-full h-full border-0"
            title="Preview"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <p className="mb-2">No preview available yet</p>
              <p className="text-sm">Start the dev server to see your app</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
