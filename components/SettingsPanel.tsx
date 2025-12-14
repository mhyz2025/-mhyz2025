import React from 'react';
import { WidgetSettings } from '../types';

interface Props {
  settings: WidgetSettings;
  onUpdate: (s: WidgetSettings) => void;
}

export const SettingsPanel: React.FC<Props> = ({ settings, onUpdate }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
       <h2 className="text-sm font-semibold text-white/80 mb-4 uppercase tracking-wider">Appearance</h2>

       {/* Opacity Slider */}
       <div>
         <div className="flex justify-between mb-2">
           <label className="text-xs text-white/60">Background Opacity</label>
           <span className="text-xs text-white font-mono">{Math.round(settings.opacity * 100)}%</span>
         </div>
         <input 
            type="range" 
            min="0.1" 
            max="1" 
            step="0.05"
            value={settings.opacity}
            onChange={(e) => onUpdate({ ...settings, opacity: parseFloat(e.target.value) })}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
         />
         <p className="text-[10px] text-white/30 mt-1">
           Lower opacity creates a "glass" effect on your desktop.
         </p>
       </div>

       {/* Reset Button (Clean Local Storage) */}
       <div className="pt-4 border-t border-white/10">
         <h3 className="text-xs font-medium text-white/60 mb-2">Data Management</h3>
         <button 
           onClick={() => {
             if(confirm("Clear all countdowns?")) {
               localStorage.removeItem('zen-countdowns');
               window.location.reload();
             }
           }}
           className="w-full py-2 text-xs text-red-400 border border-red-500/30 hover:bg-red-500/10 rounded-lg transition"
         >
           Reset All Data
         </button>
       </div>
    </div>
  );
};