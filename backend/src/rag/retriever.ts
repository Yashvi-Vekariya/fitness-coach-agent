const exercisesData = require('./data/exercises.json');

interface KnowledgeEntry {
  topic: string;
  content: string;
}

const knowledgeBase: KnowledgeEntry[] = exercisesData as KnowledgeEntry[];

// Simple keyword-based retrieval (no vector DB needed - works offline & free)
export function retrieveContext(query: string, topK: number = 3): string[] {
  const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);

  const scored = knowledgeBase.map(entry => {
    let score = 0;
    const content = (entry.topic + ' ' + entry.content).toLowerCase();

    for (const word of queryWords) {
      if (content.includes(word)) score += 1;
      // Bonus for topic match
      if (entry.topic.toLowerCase().includes(word)) score += 2;
    }

    return { entry, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .filter(s => s.score > 0)
    .map(s => s.entry.content);
}

export function getContextForAgent(message: string): string {
  const contexts = retrieveContext(message, 3);
  if (contexts.length === 0) return '';

  return '\n\n📚 KNOWLEDGE BASE CONTEXT:\n' + contexts.map((c, i) => `${i + 1}. ${c}`).join('\n');
}
