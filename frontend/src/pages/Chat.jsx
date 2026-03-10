import React, { useState, useRef, useEffect } from 'react';
import { Send, Dumbbell, Apple, BarChart3, Zap, Bot, User, Loader2 } from 'lucide-react';
import { sendMessage } from '../utils/api';

const quickActions = [
  { icon: '💪', label: 'Workout Plan', message: 'Give me a personalized workout plan for today' },
  { icon: '🥗', label: 'Meal Plan', message: 'Suggest a healthy meal plan for today' },
  { icon: '📊', label: 'My Progress', message: 'Show me my progress report' },
  { icon: '📏', label: 'Calculate BMI', message: 'Calculate my BMI. My weight is 70kg and height is 170cm' },
  { icon: '🏆', label: 'My Stats', message: 'Show me my points, level, and achievements' },
  { icon: '🔥', label: 'Motivation', message: 'I need some motivation today' },
];

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hey there! 👋 I\'m your **FitCoach AI** — your personal fitness coach powered by multi-agent AI.\n\nI can help you with:\n- 💪 Personalized workout plans\n- 🥗 Nutrition & diet advice\n- 📊 Progress tracking & BMI\n- 🏆 Points, levels & achievements\n\nWhat would you like to start with? Or tell me about yourself so I can personalize your experience!', agent: 'general' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSend = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;

    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setInput('');
    setLoading(true);

    try {
      const data = await sendMessage(msg);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        agent: data.agent,
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '⚠️ Sorry, something went wrong. Please make sure the backend server is running and try again!',
        agent: 'error',
      }]);
    }

    setLoading(false);
    inputRef.current?.focus();
  };

  const getAgentBadge = (agent) => {
    const badges = {
      workout: { label: '💪 Workout Agent', color: 'bg-blue-500/20 text-blue-400' },
      nutrition: { label: '🥗 Nutrition Agent', color: 'bg-green-500/20 text-green-400' },
      progress: { label: '📊 Progress Agent', color: 'bg-purple-500/20 text-purple-400' },
      motivation: { label: '🏆 Motivation Agent', color: 'bg-amber-500/20 text-amber-400' },
      general: { label: '🤖 FitCoach', color: 'bg-primary-500/20 text-primary-400' },
    };
    return badges[agent] || badges.general;
  };

  const formatMessage = (content) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/#{1,3}\s(.*)/g, '<strong style="font-size:1.1em">$1</strong>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 message-enter ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div className={`
              flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm
              ${msg.role === 'user'
                ? 'bg-gradient-to-br from-primary-500 to-primary-700'
                : 'bg-gradient-to-br from-dark-700 to-dark-800 border border-dark-700/50'
              }
            `}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>

            {/* Message */}
            <div className={`
              max-w-[80%] rounded-2xl px-4 py-3
              ${msg.role === 'user'
                ? 'bg-primary-600/20 border border-primary-500/20'
                : 'glass'
              }
            `}>
              {msg.agent && msg.role === 'assistant' && (
                <div className={`inline-block text-xs px-2 py-0.5 rounded-full mb-2 ${getAgentBadge(msg.agent).color}`}>
                  {getAgentBadge(msg.agent).label}
                </div>
              )}
              <div
                className="text-sm leading-relaxed text-dark-200/90"
                dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
              />
            </div>
          </div>
        ))}

        {/* Typing indicator */}
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

      {/* Quick Actions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2 justify-center">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => handleSend(action.message)}
                className="px-3 py-2 glass rounded-xl text-xs hover:bg-dark-800/80 hover:border-primary-500/30 transition-all flex items-center gap-1.5"
              >
                <span>{action.icon}</span>
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-dark-700/30">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything about fitness, workouts, nutrition..."
            className="flex-1 bg-dark-900/50 border border-dark-700/50 rounded-xl px-4 py-3 text-sm text-white placeholder-dark-200/30 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition"
            disabled={loading}
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="px-4 py-3 bg-primary-600 hover:bg-primary-500 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary-500/20"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
