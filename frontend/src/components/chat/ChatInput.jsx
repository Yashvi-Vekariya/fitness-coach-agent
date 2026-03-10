import React, { useRef } from 'react';
import { Send, Mic, Loader2 } from 'lucide-react';

export default function ChatInput({ input, setInput, onSend, loading }) {
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-4 border-t border-dark-700/30">
      <div className="max-w-4xl mx-auto flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about fitness, workouts, nutrition..."
          className="flex-1 bg-dark-900/50 border border-dark-700/50 rounded-xl px-4 py-3 text-sm text-white placeholder-dark-200/30 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition"
          disabled={loading}
        />
        <button
          onClick={onSend}
          disabled={loading || !input.trim()}
          className="px-4 py-3 bg-primary-600 hover:bg-primary-500 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary-500/20"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        </button>
      </div>
    </div>
  );
}
