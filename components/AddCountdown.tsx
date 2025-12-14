import React, { useState } from 'react';
import { Countdown } from '../types';

interface Props {
  onAdd: (c: Countdown) => void;
  onCancel: () => void;
}

export const AddCountdown: React.FC<Props> = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [color, setColor] = useState('bg-blue-500');

  const colors = [
    'bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 
    'bg-pink-500', 'bg-orange-500', 'bg-red-500'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;

    onAdd({
      id: crypto.randomUUID(),
      title,
      targetDate: date,
      color
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-sm font-semibold text-white/80 mb-4 uppercase tracking-wider">New Countdown</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs text-white/50 mb-1">Event Name</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-black/40 transition"
            placeholder="e.g., Summer Vacation"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-xs text-white/50 mb-1">Target Date</label>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-black/40 transition [color-scheme:dark]"
          />
        </div>

        <div>
           <label className="block text-xs text-white/50 mb-2">Accent Color</label>
           <div className="flex gap-2">
             {colors.map((c) => (
               <button
                 key={c}
                 type="button"
                 onClick={() => setColor(c)}
                 className={`w-6 h-6 rounded-full ${c} ${color === c ? 'ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-100'} transition-all`}
               />
             ))}
           </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button 
            type="button" 
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white/70 text-sm rounded-lg transition"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={!title || !date}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition shadow-lg shadow-blue-900/20"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};