import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { Bot } from 'lucide-react';

export default function ChatWindow({ messages, loading }) {
  const messagesEndRef = useRef(null);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      {messages.map((msg, i) => (
        <MessageBubble key={i} message={msg} />
      ))}

      {loading && (
        <div className="flex gap-3 message-enter">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-dark-700 to-dark-800 border border-dark-700/50 flex items-center justify-center">
            <Bot size={16} />
          </div>
          <div className="glass rounded-2xl px-4 py-3 flex items-center gap-1">
            <div className="typing-dot w-2 h-2 bg-primary-500 rounded-full" />
            <div className="typing-dot w-2 h-2 bg-primary-500 rounded-full" />
            <div className="typing-dot w-2 h-2 bg-primary-500 rounded-full" />
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
