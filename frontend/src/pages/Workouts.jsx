import React, { useState } from 'react';
import { Search, Dumbbell, Home, Filter } from 'lucide-react';
import { sendMessage } from '../utils/api';

export default function Workouts() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPart, setSelectedPart] = useState('all');
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const workoutTypes = [
    { id: 'all', label: 'All', icon: '🔄' },
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'gym', label: 'Gym', icon: '🏋️' },
  ];

  const bodyParts = [
    { id: 'all', label: 'Full Body', icon: '🔄' },
    { id: 'chest', label: 'Chest', icon: '💪' },
    { id: 'back', label: 'Back', icon: '🔙' },
    { id: 'shoulders', label: 'Shoulders', icon: '🤷' },
    { id: 'arms', label: 'Arms', icon: '💪' },
    { id: 'legs', label: 'Legs', icon: '🦵' },
    { id: 'core', label: 'Core', icon: '🎯' },
  ];

  const generatePlan = async () => {
    setLoading(true);
    const typeStr = selectedType === 'all' ? '' : `${selectedType} `;
    const partStr = selectedPart === 'all' ? 'full body' : selectedPart;
    const msg = `Give me a detailed ${typeStr}workout plan for ${partStr} with exercises, sets, reps, and rest times. Include warm-up and cool-down.`;

    try {
      const data = await sendMessage(msg);
      setPlan(data.response);
    } catch (error) {
      setPlan('⚠️ Could not generate plan. Make sure backend is running.');
    }
    setLoading(false);
  };

  const formatPlan = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/#{1,3}\s(.*)/g, '<strong style="font-size:1.1em">$1</strong>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl gradient-text">Workout Plans</h1>
        <p className="text-dark-200/50 text-sm mt-1">Generate personalized AI workout plans</p>
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl p-6 space-y-4">
        <h3 className="font-display font-semibold flex items-center gap-2">
          <Filter size={18} /> Customize Your Workout
        </h3>

        {/* Workout Type */}
        <div>
          <label className="text-xs text-dark-200/40 mb-2 block">Workout Type</label>
          <div className="flex gap-2 flex-wrap">
            {workoutTypes.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedType === t.id
                    ? 'bg-primary-600/20 border border-primary-500/30 text-primary-400'
                    : 'glass hover:bg-dark-800/80'
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Body Part */}
        <div>
          <label className="text-xs text-dark-200/40 mb-2 block">Target Body Part</label>
          <div className="flex gap-2 flex-wrap">
            {bodyParts.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPart(p.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedPart === p.id
                    ? 'bg-primary-600/20 border border-primary-500/30 text-primary-400'
                    : 'glass hover:bg-dark-800/80'
                }`}
              >
                {p.icon} {p.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generatePlan}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl font-display font-bold hover:shadow-lg hover:shadow-primary-500/20 transition-all disabled:opacity-50"
        >
          {loading ? '⏳ Generating Plan...' : '🏋️ Generate Workout Plan'}
        </button>
      </div>

      {/* Generated Plan */}
      {plan && (
        <div className="glass rounded-2xl p-6 animate-slide-up">
          <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
            <Dumbbell size={20} className="text-primary-400" />
            Your Workout Plan
          </h3>
          <div
            className="text-sm leading-relaxed text-dark-200/80"
            dangerouslySetInnerHTML={{ __html: formatPlan(plan) }}
          />
        </div>
      )}

      {/* Quick Templates */}
      {!plan && (
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: '🏠 30-Min Home Blast', desc: 'No equipment full body workout', msg: 'Give me a 30 minute home workout with no equipment' },
            { title: '💪 Push Day', desc: 'Chest, shoulders, triceps', msg: 'Give me a push day workout plan for gym' },
            { title: '🦵 Leg Destroyer', desc: 'Complete leg day workout', msg: 'Give me an intense leg day workout' },
            { title: '🧘 Flexibility Flow', desc: 'Stretching and yoga', msg: 'Give me a flexibility and stretching routine' },
          ].map((t, i) => (
            <button
              key={i}
              onClick={() => { setLoading(true); sendMessage(t.msg).then(d => { setPlan(d.response); setLoading(false); }); }}
              className="glass rounded-2xl p-5 text-left hover:border-primary-500/30 transition-all hover:-translate-y-1"
            >
              <div className="font-display font-bold text-lg mb-1">{t.title}</div>
              <div className="text-sm text-dark-200/40">{t.desc}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
