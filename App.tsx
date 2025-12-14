import React, { useState, useEffect } from 'react';
import { Widget } from './components/Widget';
import { Settings, Info } from 'lucide-react';

const App: React.FC = () => {
  // This App component acts as the "Desktop" container for the web demo.
  // In a real Electron app, the Widget would be the only thing rendered in a transparent window.
  
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="relative w-full h-full">
      {/* Simulation of Desktop Icons to show transparency effect */}
      <div className="absolute top-10 left-10 flex flex-col gap-8 text-white/80 select-none">
        <div className="flex flex-col items-center gap-1 w-20 group cursor-pointer">
          <div className="w-12 h-12 bg-blue-500/80 rounded flex items-center justify-center group-hover:bg-blue-400/80 transition shadow-lg">
            <span className="font-bold text-xl">PC</span>
          </div>
          <span className="text-xs text-shadow drop-shadow-md">This PC</span>
        </div>
        <div className="flex flex-col items-center gap-1 w-20 group cursor-pointer">
          <div className="w-12 h-12 bg-yellow-500/80 rounded flex items-center justify-center group-hover:bg-yellow-400/80 transition shadow-lg">
            <span className="font-bold text-xl">📁</span>
          </div>
          <span className="text-xs drop-shadow-md">Documents</span>
        </div>
      </div>

      {/* The Actual Widget Application */}
      <Widget />

      {/* Helper text for the web demo */}
      {showIntro && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/80 text-white p-6 rounded-xl max-w-lg backdrop-blur-md shadow-2xl z-0 animate-in fade-in slide-in-from-bottom-10 duration-700">
           <div className="flex justify-between items-start mb-2">
             <h2 className="text-lg font-bold flex items-center gap-2">
               <Info className="w-5 h-5 text-blue-400" />
               Web Preview Mode
             </h2>
             <button onClick={() => setShowIntro(false)} className="text-gray-400 hover:text-white">&times;</button>
           </div>
           <p className="text-sm text-gray-300 mb-4">
             You are viewing the React source code running in a browser. 
             This simulates how the widget looks on a Windows desktop.
           </p>
           <p className="text-sm text-gray-300">
             To install this as a real <strong>.exe</strong>, click the 
             <span className="inline-block mx-1 bg-gray-700 px-1 rounded"><Settings className="w-3 h-3 inline mb-0.5" /></span>
             icon in the widget and select the <strong>Deployment</strong> tab.
           </p>
        </div>
      )}
    </div>
  );
};

export default App;