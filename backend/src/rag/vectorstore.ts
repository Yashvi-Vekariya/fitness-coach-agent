// Vector Store Setup
// Using simple keyword-based retrieval for zero-cost operation
// Can be upgraded to HNSWLib or Pinecone for production use

import { retrieveContext } from './retriever';

export interface VectorEntry {
  id: string;
  content: string;
  metadata: Record<string, any>;
  embedding?: number[];
}

// Simple in-memory vector store (keyword-based)
export class VectorStore {
  private entries: VectorEntry[] = [];

  // Add entries to store
  addEntries(entries: VectorEntry[]): void {
    this.entries.push(...entries);
    console.log(`📚 Vector store: ${this.entries.length} entries loaded`);
  }

  // Search by query (keyword matching)
  search(query: string, topK: number = 3): VectorEntry[] {
    const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);

    const scored = this.entries.map(entry => {
      let score = 0;
      const content = entry.content.toLowerCase();

      for (const word of queryWords) {
        if (content.includes(word)) score += 1;
        // Bonus for metadata match
        if (entry.metadata?.topic?.toLowerCase().includes(word)) score += 2;
      }

      return { entry, score };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .filter(s => s.score > 0)
      .map(s => s.entry);
  }

  // Get total entries count
  getCount(): number {
    return this.entries.length;
  }
}

// Initialize and export a singleton instance
export const vectorStore = new VectorStore();

// Load data into vector store
export function initVectorStore(): void {
  try {
    const exercisesData = require('./data/exercises.json');
    const entries: VectorEntry[] = exercisesData.map((item: any, idx: number) => ({
      id: `exercise_${idx}`,
      content: item.content,
      metadata: { topic: item.topic, type: 'exercise_knowledge' },
    }));
    vectorStore.addEntries(entries);
  } catch (error) {
    console.error('Failed to load vector store data:', error);
  }
}
