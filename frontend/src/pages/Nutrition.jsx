import React, { useState } from 'react';
import { Apple, Calculator, Utensils } from 'lucide-react';
import { sendMessage, calculateBMI } from '../utils/api';

export default function Nutrition() {
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [bmiResult, setBmiResult] = useState(null);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const dietTypes = [
    { id: 'veg', label: '🥬 Vegetarian', msg: 'Create a vegetarian meal plan for today with Indian food options. Include calories and macros.' },
    { id: 'nonveg', label: '🍗 Non-Veg', msg: 'Create a non-vegetarian meal plan for today with Indian food options. Include calories and macros.' },
    { id: 'vegan', label: '🌱 Vegan', msg: 'Create a vegan meal plan for today. Include calories and macros.' },
    { id: 'keto', label: '🥑 Keto', msg: 'Create a keto diet meal plan for today. Include calories and macros.' },
  ];

  const handleDietPlan = async (msg) => {
    setLoading(true);
    try {
      const data = await sendMessage(msg);
      setPlan(data.response);
    } catch (e) {
      setPlan('⚠️ Error generating plan. Check backend.');
    }
    setLoading(false);
  };

  const handleBMI = async () => {
    if (!weight || !height) return;
    try {
      const result = await calculateBMI(parseFloat(weight), parseFloat(height));
      setBmiResult(result);
    } catch (e) {
      console.error(e);
    }
  };

  const formatPlan = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/#{1,3}\s(.*)/g, '<strong style="font-size:1.1em">$1</strong>').replace(/\n/g, '<br/>');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl gradient-text">Nutrition</h1>
        <p className="text-dark-200/50 text-sm mt-1">AI-powered diet plans & nutrition advice</p>
      </div>

      {/* BMI Calculator */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-display font-semibold flex items-center gap-2 mb-4">
          <Calculator size={18} className="text-primary-400" /> BMI Calculator
        </h3>
        <div className="flex flex-wrap gap-3 items-end">
          <div>
            <label className="text-xs text-dark-200/40 block mb-1">Weight (kg)</label>
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="70"
              className="w-28 bg-dark-900/50 border border-dark-700/50 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary-500/50" />
          </div>
          <div>
            <label className="text-xs text-dark-200/40 block mb-1">Height (cm)</label>
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="170"
              className="w-28 bg-dark-900/50 border border-dark-700/50 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary-500/50" />
          </div>
          <button onClick={handleBMI} className="px-6 py-2 bg-primary-600 hover:bg-primary-500 rounded-xl text-sm font-semibold transition">Calculate</button>
        </div>
        {bmiResult && (
          <div className="mt-4 p-4 bg-dark-900/50 rounded-xl animate-slide-up">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-display font-bold" style={{ color: bmiResult.color }}>{bmiResult.bmi}</div>
              <div>
                <div className="font-semibold" style={{ color: bmiResult.color }}>{bmiResult.category}</div>
                <div className="text-xs text-dark-200/40">{bmiResult.advice}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Diet Plans */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-display font-semibold flex items-center gap-2 mb-4">
          <Utensils size={18} className="text-primary-400" /> Generate Meal Plan
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {dietTypes.map(d => (
            <button
              key={d.id}
              onClick={() => handleDietPlan(d.msg)}
              disabled={loading}
              className="glass rounded-xl p-4 text-center hover:border-primary-500/30 transition-all hover:-translate-y-1 disabled:opacity-50"
            >
              <div className="text-2xl mb-2">{d.label.split(' ')[0]}</div>
              <div className="text-xs font-medium">{d.label.split(' ').slice(1).join(' ')}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Questions */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-display font-semibold mb-4">Quick Nutrition Questions</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            'What should I eat before a workout?',
            'How much protein do I need daily?',
            'Best foods for weight loss?',
            'How much water should I drink?',
            'Best post-workout meal?',
            'Healthy snack ideas?',
          ].map((q, i) => (
            <button
              key={i}
              onClick={() => handleDietPlan(q)}
              className="px-4 py-3 glass rounded-xl text-sm text-left hover:bg-dark-800/80 hover:border-primary-500/30 transition-all"
            >
              🥗 {q}
            </button>
          ))}
        </div>
      </div>

      {/* Generated Plan */}
      {plan && (
        <div className="glass rounded-2xl p-6 animate-slide-up">
          <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
            <Apple size={20} className="text-primary-400" /> Nutrition Plan
          </h3>
          <div className="text-sm leading-relaxed text-dark-200/80" dangerouslySetInnerHTML={{ __html: formatPlan(plan) }} />
        </div>
      )}
    </div>
  );
}
