import React from 'react';
import { Bot, User } from 'lucide-react';

const agentBadges = {
  workout: { label: '💪 Workout Agent', color: 'bg-blue-500/20 text-blue-400' },
  nutrition: { label: '🥗 Nutrition Agent', color: 'bg-green-500/20 text-green-400' },
  progress: { label: '📊 Progress Agent', color: 'bg-purple-500/20 text-purple-400' },
  motivation: { label: '🏆 Motivation Agent', color: 'bg-amber-500/20 text-amber-400' },
  general: { label: '🤖 FitCoach', color: 'bg-primary-500/20 text-primary-400' },
};

function formatContent(content) {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/#{1,3}\s(.*)/g, '<strong style="font-size:1.1em">$1</strong>')
    .replace(/\n/g, '<br/>');
}

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  const badge = agentBadges[message.agent] || agentBadges.general;

  return (
    <div className={`flex gap-3 message-enter ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${isUser ? 'bg-gradient-to-br from-primary-500 to-primary-700' : 'bg-gradient-to-br from-dark-700 to-dark-800 border border-dark-700/50'}`}>
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${isUser ? 'bg-primary-600/20 border border-primary-500/20' : 'glass'}`}>
        {message.agent && !isUser && (
          <div className={`inline-block text-xs px-2 py-0.5 rounded-full mb-2 ${badge.color}`}>
            {badge.label}
          </div>
        )}
        <div className="text-sm leading-relaxed text-dark-200/90" dangerouslySetInnerHTML={{ __html: formatContent(message.content) }} />
      </div>
    </div>
  );
}
