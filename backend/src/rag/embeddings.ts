// Embeddings Module
// Simple TF-IDF-like embedding for zero-cost operation
// Can be upgraded to Groq/OpenAI embeddings for production

export class SimpleEmbeddings {
  private vocabulary: Map<string, number> = new Map();
  private idf: Map<string, number> = new Map();

  // Build vocabulary from documents
  buildVocabulary(documents: string[]): void {
    const docFreq: Map<string, number> = new Map();

    for (const doc of documents) {
      const words = this.tokenize(doc);
      const uniqueWords = new Set(words);

      for (const word of uniqueWords) {
        docFreq.set(word, (docFreq.get(word) || 0) + 1);
        if (!this.vocabulary.has(word)) {
          this.vocabulary.set(word, this.vocabulary.size);
        }
      }
    }

    // Calculate IDF
    const N = documents.length;
    for (const [word, df] of docFreq) {
      this.idf.set(word, Math.log(N / (df + 1)));
    }

    console.log(`📝 Embeddings: vocabulary size = ${this.vocabulary.size}`);
  }

  // Generate embedding for text
  embed(text: string): number[] {
    const words = this.tokenize(text);
    const vector = new Array(Math.min(this.vocabulary.size, 100)).fill(0);

    for (const word of words) {
      const idx = this.vocabulary.get(word);
      if (idx !== undefined && idx < vector.length) {
        vector[idx] = (this.idf.get(word) || 1);
      }
    }

    // Normalize
    const magnitude = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0));
    if (magnitude > 0) {
      return vector.map(v => v / magnitude);
    }
    return vector;
  }

  // Cosine similarity between two vectors
  static cosineSimilarity(a: number[], b: number[]): number {
    let dot = 0, magA = 0, magB = 0;
    const len = Math.min(a.length, b.length);

    for (let i = 0; i < len; i++) {
      dot += a[i] * b[i];
      magA += a[i] * a[i];
      magB += b[i] * b[i];
    }

    const denom = Math.sqrt(magA) * Math.sqrt(magB);
    return denom > 0 ? dot / denom : 0;
  }

  private tokenize(text: string): string[] {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2);
  }
}

export const embeddings = new SimpleEmbeddings();
