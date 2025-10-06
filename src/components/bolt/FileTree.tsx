import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from 'lucide-react';
import { webContainerService } from '../../services/webcontainer';

interface FileTreeProps {
  files: Record<string, string>;
  onFileSelect: (path: string) => void;
  selectedFile: string | null;
}

interface TreeNode {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: TreeNode[];
}

export const FileTree: React.FC<FileTreeProps> = ({ files, onFileSelect, selectedFile }) => {
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set(['/']));

  useEffect(() => {
    const buildTree = () => {
      const root: TreeNode[] = [];
      const fileMap = new Map<string, TreeNode>();

      Object.keys(files).forEach((path) => {
        const parts = path.split('/').filter(Boolean);
        let currentPath = '';
        
        parts.forEach((part, index) => {
          const parentPath = currentPath;
          currentPath = currentPath ? `${currentPath}/${part}` : part;
          
          if (!fileMap.has(currentPath)) {
            const isDirectory = index < parts.length - 1;
            const node: TreeNode = {
              name: part,
              path: currentPath,
              isDirectory,
              children: isDirectory ? [] : undefined,
            };
            
            fileMap.set(currentPath, node);
            
            if (parentPath) {
              const parent = fileMap.get(parentPath);
              if (parent && parent.children) {
                parent.children.push(node);
              }
            } else {
              root.push(node);
            }
          }
        });
      });

      // Sort: directories first, then files, both alphabetically
      const sortNodes = (nodes: TreeNode[]) => {
        nodes.sort((a, b) => {
          if (a.isDirectory && !b.isDirectory) return -1;
          if (!a.isDirectory && b.isDirectory) return 1;
          return a.name.localeCompare(b.name);
        });
        nodes.forEach((node) => {
          if (node.children) sortNodes(node.children);
        });
      };

      sortNodes(root);
      return root;
    };

    setTree(buildTree());
  }, [files]);

  const toggleDirectory = (path: string) => {
    setExpandedDirs((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const renderNode = (node: TreeNode, depth: number = 0) => {
    const isExpanded = expandedDirs.has(node.path);
    const isSelected = selectedFile === node.path;

    if (node.isDirectory) {
      return (
        <div key={node.path}>
          <div
            onClick={() => toggleDirectory(node.path)}
            className="flex items-center gap-1 py-1 px-2 hover:bg-gray-700 cursor-pointer rounded"
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
            {isExpanded ? (
              <FolderOpen className="w-4 h-4 text-blue-400" />
            ) : (
              <Folder className="w-4 h-4 text-blue-400" />
            )}
            <span className="text-sm text-gray-200">{node.name}</span>
          </div>
          {isExpanded && node.children && (
            <div>
              {node.children.map((child) => renderNode(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        key={node.path}
        onClick={() => onFileSelect(node.path)}
        className={`flex items-center gap-1 py-1 px-2 hover:bg-gray-700 cursor-pointer rounded ${
          isSelected ? 'bg-gray-700' : ''
        }`}
        style={{ paddingLeft: `${depth * 12 + 28}px` }}
      >
        <File className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-200">{node.name}</span>
      </div>
    );
  };

  return (
    <div className="h-full bg-[#252526] rounded-lg overflow-auto">
      <div className="bg-[#2d2d2d] px-4 py-2 border-b border-[#3e3e3e]">
        <span className="text-sm font-semibold text-gray-300">FILES</span>
      </div>
      <div className="p-2">
        {tree.length > 0 ? (
          tree.map((node) => renderNode(node))
        ) : (
          <div className="text-center text-gray-500 text-sm py-4">
            No files yet
          </div>
        )}
      </div>
    </div>
  );
};
