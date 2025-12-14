import React from 'react';
import { Terminal, Copy } from 'lucide-react';

export const DeployInstructions: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-4 text-white/90">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-white mb-1 uppercase tracking-wider">Build .EXE</h2>
        <p className="text-xs text-white/50 leading-relaxed">
          This is a React Web App. To run it as a standalone Windows .exe with a transparent background, use <strong>Electron</strong>.
        </p>
      </div>

      <div className="space-y-4">
        {/* Step 1 */}
        <div className="bg-black/30 p-3 rounded-lg border border-white/5">
            <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold">1</span>
                <span className="text-xs font-medium">Initialize Electron</span>
            </div>
            <div className="bg-black/50 p-2 rounded text-[10px] font-mono text-gray-300 flex justify-between group">
                <code>npx create-electron-app countdown-widget</code>
                <button onClick={() => copyToClipboard('npx create-electron-app countdown-widget')} className="opacity-0 group-hover:opacity-100 hover:text-white"><Copy size={12} /></button>
            </div>
        </div>

        {/* Step 2 */}
        <div className="bg-black/30 p-3 rounded-lg border border-white/5">
             <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold">2</span>
                <span className="text-xs font-medium">Configure Main.js</span>
            </div>
            <p className="text-[10px] text-white/40 mb-2">In your Electron main.js, set the window options:</p>
            <div className="bg-black/50 p-2 rounded text-[10px] font-mono text-emerald-300 overflow-x-auto">
{`const win = new BrowserWindow({
  width: 320,
  height: 600,
  frame: false, // No title bar
  transparent: true, // Key feature
  alwaysOnTop: false,
  webPreferences: {
    nodeIntegration: true
  }
})`}
            </div>
        </div>

        {/* Step 3 */}
        <div className="bg-black/30 p-3 rounded-lg border border-white/5">
             <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold">3</span>
                <span className="text-xs font-medium">Build & Run</span>
            </div>
            <div className="bg-black/50 p-2 rounded text-[10px] font-mono text-gray-300 flex justify-between group">
                <code>npm run make</code>
                <button onClick={() => copyToClipboard('npm run make')} className="opacity-0 group-hover:opacity-100 hover:text-white"><Copy size={12} /></button>
            </div>
        </div>
      </div>
      
      <div className="p-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-[10px] text-yellow-200/80">
          <strong>Note:</strong> When compiled, this widget will sit on your desktop without the browser frame!
      </div>
    </div>
  );
};