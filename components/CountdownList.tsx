import React, { useEffect, useState } from 'react';
import { Trash2, Calendar, Clock } from 'lucide-react';
import { Countdown } from '../types';

interface Props {
  items: Countdown[];
  onDelete: (id: string) => void;
}

export const CountdownList: React.FC<Props> = ({ items, onDelete }) => {
  const [now, setNow] = useState(new Date());

  // Update timer every minute to keep day calculations roughly accurate without overkill
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getDaysLeft = (target: string) => {
    const t = new Date(target);
    // Reset hours to compare dates purely
    const current = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dest = new Date(t.getFullYear(), t.getMonth(), t.getDate());
    
    const diffTime = dest.getTime() - current.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (items.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-40 text-white/40">
            <Clock size={32} className="mb-2 opacity-50" />
            <p className="text-sm">No countdowns set.</p>
        </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const days = getDaysLeft(item.targetDate);
        const isPast = days < 0;
        const isToday = days === 0;

        return (
          <div key={item.id} className="group relative bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-xl p-3 transition-all duration-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-white/90 text-sm leading-tight mb-1">{item.title}</h3>
                <div className="flex items-center text-xs text-white/50 gap-1">
                  <Calendar size={10} />
                  <span>{item.targetDate}</span>
                </div>
              </div>
              
              <button 
                onClick={() => onDelete(item.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-red-400 hover:bg-red-500/10 rounded transition-all"
                title="Delete"
              >
                <Trash2 size={12} />
              </button>
            </div>

            <div className="mt-3 flex items-baseline gap-1">
               {isToday ? (
                 <span className="text-2xl font-bold text-yellow-400 animate-pulse">TODAY</span>
               ) : isPast ? (
                 <>
                   <span className="text-2xl font-bold text-gray-500">{-days}</span>
                   <span className="text-xs text-gray-500 uppercase tracking-wide">days ago</span>
                 </>
               ) : (
                 <>
                   <span className={`text-3xl font-bold ${days <= 3 ? 'text-red-400' : 'text-white'}`}>
                     {days}
                   </span>
                   <span className="text-xs text-white/60 uppercase tracking-wide">days left</span>
                 </>
               )}
            </div>
            
            {/* Progress bar simulation */}
            {!isPast && !isToday && (
               <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                   <div className={`h-full ${item.color} opacity-80 w-1/2`}></div>
               </div>
            )}
          </div>
        );
      })}
    </div>
  );
};