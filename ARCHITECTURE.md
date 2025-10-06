# Architecture Overview - Bolt.new Clone

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Interface                        │
│  ┌───────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │  Chat View    │  │  Code View   │  │  Navigation     │  │
│  │  - Prompts    │  │  - Editor    │  │  - Route Mgmt   │  │
│  │  - Messages   │  │  - Terminal  │  │  - View Toggle  │  │
│  │  - Examples   │  │  - Preview   │  │                 │  │
│  └───────────────┘  └──────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                      Application Layer                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                      Bolt.tsx                           │ │
│  │  - State Management (messages, files, mode)            │ │
│  │  - Orchestrates all components                         │ │
│  │  - Handles user interactions                           │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
          │                           │
          ▼                           ▼
┌──────────────────────┐    ┌──────────────────────┐
│   Gemini Service     │    │ WebContainer Service │
│  ─────────────────   │    │  ──────────────────  │
│  - AI Integration    │    │  - Container Init    │
│  - Code Generation   │    │  - File System       │
│  - Error Fixing      │    │  - Command Exec      │
│  - Enhancement       │    │  - Dev Server        │
└──────────────────────┘    └──────────────────────┘
          │                           │
          ▼                           ▼
┌──────────────────────┐    ┌──────────────────────┐
│   Gemini 2.0 Flash   │    │  WebContainer API    │
│   Google AI API      │    │  StackBlitz          │
└──────────────────────┘    └──────────────────────┘
```

## 📦 Component Hierarchy

```
App.tsx
├── Routes
│   ├── / (Homepage)
│   └── /bolt ──────────┐
│                        │
│                        ▼
Bolt.tsx (Main App)
├── BoltChat (viewMode === 'chat')
│   ├── Message List
│   ├── Input Form
│   └── Example Prompts
│
└── Code View (viewMode === 'code')
    ├── FileTree
    │   ├── Directory Nodes
    │   └── File Nodes
    │
    ├── CodeEditor
    │   ├── File Content
    │   ├── Line Numbers
    │   └── Save Button
    │
    ├── Terminal
    │   ├── XTerm Instance
    │   ├── Command Input
    │   └── Output Stream
    │
    └── Preview
        ├── URL Bar
        ├── Controls
        └── Iframe
```

## 🔄 Data Flow

### 1. Website Generation Flow

```
User Input (Prompt)
      │
      ▼
BoltChat.tsx
      │
      ▼
Bolt.tsx (handlePromptSubmit)
      │
      ├──▶ Add user message
      │
      ├──▶ Gemini Service
      │         │
      │         ├─▶ Generate files
      │         └─▶ Return JSON
      │
      ├──▶ WebContainer Service
      │         │
      │         ├─▶ Mount files
      │         ├─▶ npm install
      │         └─▶ npm start
      │
      └──▶ Update UI State
            │
            ├─▶ Set files
            ├─▶ Add messages
            └─▶ Switch to code view
```

### 2. File Editing Flow

```
User Clicks File
      │
      ▼
FileTree.tsx (onFileSelect)
      │
      ▼
Bolt.tsx (handleFileSelect)
      │
      ▼
CodeEditor.tsx
      │
      ├─▶ Load file from WebContainer
      ├─▶ Display content
      └─▶ Enable editing
      
User Edits & Saves
      │
      ▼
CodeEditor.tsx (handleSave)
      │
      ▼
WebContainer.writeFile()
      │
      ▼
Preview Auto-Updates
```

### 3. Terminal Command Flow

```
User Types Command
      │
      ▼
Terminal.tsx (onData)
      │
      ▼
WebContainer Service
      │
      ├─▶ Parse command
      ├─▶ Execute via spawn()
      └─▶ Stream output
      
Output Streamed Back
      │
      ▼
Terminal Display
```

## 🗂️ Service Layer Design

### Gemini Service (`gemini.ts`)

**Purpose**: Handle all AI-related operations

**Methods**:
- `generateWebsite(prompt)` - Generate complete website
- `fixError(error, code)` - Auto-fix code errors
- `enhanceCode(code, instruction)` - Improve code

**Features**:
- JSON response parsing
- Markdown code block handling
- Fallback templates
- Error recovery

### WebContainer Service (`webcontainer.ts`)

**Purpose**: Manage browser-based Node.js environment

**Methods**:
- `init()` - Boot WebContainer
- `mountFiles(files)` - Write files to FS
- `runCommand(cmd)` - Execute commands
- `startDevServer()` - Launch preview
- `writeFile/readFile()` - File operations

**Features**:
- Singleton pattern
- Promise-based async operations
- Command chaining support
- Auto URL detection

## 💾 State Management

### Application State (Bolt.tsx)

```typescript
// Message History
messages: Message[]

// Generated Files
files: Record<string, string>

// Selected File for Editing
selectedFile: string | null

// UI State
viewMode: 'chat' | 'code'
isGenerating: boolean
previewUrl: string
```

### Component State

Each component manages its own local state:
- **BoltChat**: Input value, scroll position
- **CodeEditor**: File content, save status, line numbers
- **Terminal**: Terminal instance, command buffer
- **Preview**: URL, loading state, refresh key
- **FileTree**: Expanded directories, tree structure

## 🔌 External Integrations

### 1. Google Gemini API

```typescript
Endpoint: generative-ai API
Model: gemini-2.0-flash-exp
API Key: AIzaSyAEY3YcIGMKvTJp0RAmhq7pkLq8sLcjvLM
Purpose: Generate code from natural language
```

### 2. WebContainer API

```typescript
Provider: StackBlitz
Technology: Browser-based Node.js
Purpose: Execute code in browser
Features: Full npm support, file system, processes
```

### 3. XTerm.js

```typescript
Package: @xterm/xterm
Addons: FitAddon
Purpose: Terminal emulation
Features: ANSI colors, cursor control, output streaming
```

## 🎨 UI/UX Architecture

### Design System

**Color Palette**:
- Background: Dark grays (#1e1e1e, #2d2d2d)
- Accents: Blue (#3b8eea), Purple (#bc3fbc)
- Text: White/Gray scale
- Status: Green (success), Red (error), Yellow (warning)

**Components**:
- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Gradient backgrounds, hover effects
- **Inputs**: Border focus states, placeholders
- **Terminal**: VSCode-inspired theme

### Responsive Design

```
Mobile (< 768px):
- Stacked layout
- Full-width panels
- Collapsible sidebar

Tablet (768px - 1024px):
- 2-column layout
- Resizable panels

Desktop (> 1024px):
- 3-column layout (12-grid)
- FileTree (2 cols)
- Editor/Terminal (5 cols)
- Preview (5 cols)
```

## 🔐 Security Architecture

### Sandboxing

1. **WebContainer**: Isolated browser environment
2. **Iframe**: Sandboxed preview with restrictions
3. **Code Execution**: No access to parent domain

### API Security

1. **CORS Headers**: Cross-origin policies configured
2. **API Keys**: Should be in environment variables (TODO)
3. **Input Validation**: Sanitize user inputs

### Content Security

1. **XSS Prevention**: React's built-in protection
2. **Iframe Sandbox**: Limited permissions
3. **Safe Execution**: WebContainer isolation

## 📊 Performance Optimization

### Code Splitting

```typescript
// Route-based splitting
const Bolt = lazy(() => import('./pages/Bolt'))

// Component-based splitting
const Terminal = lazy(() => import('./components/bolt/Terminal'))
```

### Build Optimization

- **Tree Shaking**: Remove unused code
- **Minification**: Reduce bundle size
- **CSS Purging**: Remove unused styles
- **Asset Optimization**: Compress images

### Runtime Optimization

- **Memo**: Prevent unnecessary re-renders
- **Lazy Loading**: Load components on demand
- **Virtual Scrolling**: For large file lists
- **Debouncing**: Limit frequent operations

## 🧪 Testing Strategy

### Unit Tests (Recommended)

```typescript
// Services
- gemini.service.test.ts
- webcontainer.service.test.ts

// Components
- BoltChat.test.tsx
- CodeEditor.test.tsx
- Terminal.test.tsx
```

### Integration Tests

```typescript
// Flows
- website-generation.test.ts
- file-editing.test.ts
- command-execution.test.ts
```

### E2E Tests (Recommended)

```typescript
// User Journeys
- create-website.spec.ts
- edit-and-preview.spec.ts
```

## 🚀 Deployment Architecture

### Build Process

```
Source Code
    │
    ▼
TypeScript Compilation
    │
    ▼
Vite Bundling
    │
    ▼
CSS Processing (Tailwind)
    │
    ▼
Asset Optimization
    │
    ▼
Production Bundle (dist/)
```

### Hosting Options

1. **Static Hosting** (Vercel, Netlify)
   - Deploy `dist` folder
   - Configure headers for CORS

2. **Container** (Docker)
   - Nginx serving static files
   - Health checks enabled

3. **CDN** (Cloudflare, AWS CloudFront)
   - Global distribution
   - Cache optimization

## 📈 Scalability Considerations

### Current Limitations

- Single Gemini API key (rate limits)
- Browser-based execution (memory limits)
- No persistence (files lost on refresh)

### Future Enhancements

1. **Backend API**: Centralize API calls
2. **Database**: Store generated projects
3. **User Accounts**: Save and manage projects
4. **Collaboration**: Real-time multi-user editing
5. **Templates**: Pre-built project templates

## 🔄 Future Architecture

```
                    Frontend (Current)
                           │
                           ▼
                    ┌─────────────┐
                    │   API GW    │
                    └─────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                   ▼
   ┌─────────┐      ┌──────────┐      ┌────────────┐
   │  Auth   │      │  AI Svc  │      │  Storage   │
   │ Service │      │ (Gemini) │      │  (S3/DB)   │
   └─────────┘      └──────────┘      └────────────┘
```

## 🎯 Design Principles

1. **Modularity**: Each component is self-contained
2. **Reusability**: Services can be used independently
3. **Scalability**: Easy to add new features
4. **Maintainability**: Clear structure and documentation
5. **Performance**: Optimized for speed and efficiency

---

**This architecture provides a solid foundation for a production-grade AI website builder.**
