import React, { useState, useEffect } from 'react';
import { Plus, Settings, X, GripHorizontal, List, ArrowDownToLine } from 'lucide-react';
import { CountdownList } from './CountdownList';
import { AddCountdown } from './AddCountdown';
import { SettingsPanel } from './SettingsPanel';
import { DeployInstructions } from './DeployInstructions';
import { Countdown, WidgetSettings, Tab } from '../types';

// Default data
const DEFAULT_COUNTDOWNS: Countdown[] = [
  { id: '1', title: 'Project Launch', targetDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0], color: 'bg-emerald-500' },
  { id: '2', title: 'New Year', targetDate: `${new Date().getFullYear() + 1}-01-01`, color: 'bg-indigo-500' }
];

export const Widget: React.FC = () => {
  // State for data
  const [countdowns, setCountdowns] = useState<Countdown[]>(() => {
    const saved = localStorage.getItem('zen-countdowns');
    return saved ? JSON.parse(saved) : DEFAULT_COUNTDOWNS;
  });

  // State for visual settings
  const [settings, setSettings] = useState<WidgetSettings>(() => {
    const saved = localStorage.getItem('zen-settings');
    return saved ? JSON.parse(saved) : { opacity: 0.85, isLocked: false, theme: 'dark' };
  });

  const [activeTab, setActiveTab] = useState<Tab>(Tab.LIST);

  // Persistence
  useEffect(() => {
    localStorage.setItem('zen-countdowns', JSON.stringify(countdowns));
  }, [countdowns]);

  useEffect(() => {
    localStorage.setItem('zen-settings', JSON.stringify(settings));
  }, [settings]);

  // Handlers
  const handleAddCountdown = (newCountdown: Countdown) => {
    setCountdowns([...countdowns, newCountdown]);
    setActiveTab(Tab.LIST);
  };

  const handleDeleteCountdown = (id: string) => {
    setCountdowns(countdowns.filter(c => c.id !== id));
  };

  return (
    <div 
      className={`fixed top-5 right-5 w-80 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl transition-all duration-300 border border-white/10`}
      style={{ 
        backgroundColor: `rgba(15, 23, 42, ${settings.opacity})`,
        color: 'white',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header / Draggable Area */}
      <div className={`flex items-center justify-between px-4 py-3 bg-white/5 cursor-move ${settings.isLocked ? 'cursor-default' : 'cursor-move'}`}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
        </div>
        
        {/* Navigation Tabs (Mini) */}
        <div className="flex bg-black/20 rounded-lg p-0.5">
            <button 
                onClick={() => setActiveTab(Tab.LIST)}
                className={`p-1.5 rounded-md transition ${activeTab === Tab.LIST ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white/80'}`}
                title="Your Countdowns"
            >
                <List size={14} />
            </button>
            <button 
                onClick={() => setActiveTab(Tab.ADD)}
                className={`p-1.5 rounded-md transition ${activeTab === Tab.ADD ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white/80'}`}
                title="Add New"
            >
                <Plus size={14} />
            </button>
            <button 
                onClick={() => setActiveTab(Tab.SETTINGS)}
                className={`p-1.5 rounded-md transition ${activeTab === Tab.SETTINGS ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white/80'}`}
                title="Settings"
            >
                <Settings size={14} />
            </button>
             <button 
                onClick={() => setActiveTab(Tab.DEPLOY)}
                className={`p-1.5 rounded-md transition ${activeTab === Tab.DEPLOY ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white/80'}`}
                title="Build .EXE"
            >
                <ArrowDownToLine size={14} />
            </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 min-h-[200px]">
        {activeTab === Tab.LIST && (
            <CountdownList items={countdowns} onDelete={handleDeleteCountdown} />
        )}
        
        {activeTab === Tab.ADD && (
            <AddCountdown onAdd={handleAddCountdown} onCancel={() => setActiveTab(Tab.LIST)} />
        )}

        {activeTab === Tab.SETTINGS && (
            <SettingsPanel settings={settings} onUpdate={setSettings} />
        )}

        {activeTab === Tab.DEPLOY && (
            <DeployInstructions />
        )}
      </div>

      {/* Footer / Status */}
      <div className="px-4 py-2 bg-black/20 text-[10px] text-white/30 text-center uppercase tracking-widest font-medium">
        ZenCountdown v1.0
      </div>
    </div>
  );
};