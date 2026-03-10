import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { searchExercises } from '../../utils/api';
import ExerciseCard from './ExerciseCard';

export default function ExerciseLibrary() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const data = await searchExercises(query);
      setResults(data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-display font-bold text-lg mb-4">🔍 Exercise Library</h3>
      <div className="flex gap-2 mb-4">
        <input type="text" value={query} onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="Search exercises (e.g., chest, legs, beginner...)"
          className="flex-1 bg-dark-900/50 border border-dark-700/50 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary-500/50 transition" />
        <button onClick={handleSearch} className="px-4 py-2 bg-primary-600 rounded-xl hover:bg-primary-500 transition">
          <Search size={16} />
        </button>
      </div>
      {loading && <p className="text-sm text-dark-200/40">Searching...</p>}
      <div className="grid md:grid-cols-2 gap-3">
        {results.map((ex, i) => <ExerciseCard key={i} exercise={ex} />)}
      </div>
      {results.length === 0 && !loading && query && <p className="text-sm text-dark-200/40 text-center py-4">No exercises found. Try different keywords.</p>}
    </div>
  );
}
