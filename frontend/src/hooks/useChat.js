import { useState, useCallback } from 'react';
import { sendMessage } from '../utils/api';

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const send = useCallback(async (text) => {
    if (!text.trim() || loading) return;

    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setLoading(true);

    try {
      const data = await sendMessage(text);
      setMessages(prev => [...prev, { role: 'assistant', content: data.response, agent: data.agent }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Error. Please try again.', agent: 'error' }]);
    }

    setLoading(false);
  }, [loading]);

  const clearChat = () => setMessages([]);

  return { messages, loading, send, clearChat };
}
