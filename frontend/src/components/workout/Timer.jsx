import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function Timer({ defaultSeconds = 60 }) {
  const [seconds, setSeconds] = useState(defaultSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, seconds]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const progress = ((defaultSeconds - seconds) / defaultSeconds) * 100;

  return (
    <div className="glass rounded-2xl p-6 text-center">
      <h3 className="font-display font-bold text-lg mb-4">⏱️ Workout Timer</h3>
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="6" />
          <circle cx="50" cy="50" r="45" fill="none" stroke="#22c55e" strokeWidth="6"
            strokeDasharray={`${progress * 2.83} 283`} strokeLinecap="round" className="transition-all duration-1000" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display font-bold text-2xl">{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</span>
        </div>
      </div>
      <div className="flex justify-center gap-3">
        <button onClick={() => setIsRunning(!isRunning)}
          className="px-4 py-2 bg-primary-600 hover:bg-primary-500 rounded-xl text-sm font-medium flex items-center gap-1 transition">
          {isRunning ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Start</>}
        </button>
        <button onClick={() => { setSeconds(defaultSeconds); setIsRunning(false); }}
          className="px-4 py-2 glass rounded-xl text-sm font-medium flex items-center gap-1 hover:bg-dark-800 transition">
          <RotateCcw size={16} /> Reset
        </button>
      </div>
    </div>
  );
}
