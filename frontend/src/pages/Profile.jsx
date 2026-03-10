import React, { useState, useEffect } from 'react';
import { User, Save, CheckCircle } from 'lucide-react';
import { getUser, updateProfile, getUserId } from '../utils/api';

export default function Profile() {
  const [profile, setProfile] = useState({
    name: '', age: '', gender: 'male', weight: '', height: '',
    fitness_level: 'beginner', goal: 'general_fitness',
    diet_type: 'non_vegetarian', workout_type: 'home', injuries: '',
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const user = await getUser();
      if (user.name) {
        setProfile({
          name: user.name || '', age: user.age || '', gender: user.gender || 'male',
          weight: user.weight || '', height: user.height || '',
          fitness_level: user.fitness_level || 'beginner', goal: user.goal || 'general_fitness',
          diet_type: user.diet_type || 'non_vegetarian', workout_type: user.workout_type || 'home',
          injuries: user.injuries || '',
        });
      }
    } catch (e) { console.error(e); }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile({
        ...profile,
        age: parseInt(profile.age) || null,
        weight: parseFloat(profile.weight) || null,
        height: parseFloat(profile.height) || null,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const Field = ({ label, children }) => (
    <div>
      <label className="text-xs text-dark-200/40 block mb-1.5">{label}</label>
      {children}
    </div>
  );

  const inputClass = "w-full bg-dark-900/50 border border-dark-700/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-500/50 transition";

  const SelectGroup = ({ value, onChange, options }) => (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button key={opt.value} type="button" onClick={() => onChange(opt.value)}
          className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${value === opt.value ? 'bg-primary-600/20 border border-primary-500/30 text-primary-400' : 'glass hover:bg-dark-800/80'}`}
        >
          {opt.icon} {opt.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl gradient-text">Profile Setup</h1>
        <p className="text-dark-200/50 text-sm mt-1">Set up your profile for personalized AI coaching</p>
      </div>

      <div className="glass rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-dark-700/30">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center glow-green">
            <User size={28} />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg">{profile.name || 'New User'}</h2>
            <p className="text-xs text-dark-200/40">ID: {getUserId()?.slice(0, 12)}...</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Full Name">
            <input type="text" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} placeholder="Your name" className={inputClass} />
          </Field>
          <Field label="Age">
            <input type="number" value={profile.age} onChange={e => setProfile({ ...profile, age: e.target.value })} placeholder="25" className={inputClass} />
          </Field>
          <Field label="Weight (kg)">
            <input type="number" value={profile.weight} onChange={e => setProfile({ ...profile, weight: e.target.value })} placeholder="70" className={inputClass} />
          </Field>
          <Field label="Height (cm)">
            <input type="number" value={profile.height} onChange={e => setProfile({ ...profile, height: e.target.value })} placeholder="170" className={inputClass} />
          </Field>
        </div>

        <Field label="Gender">
          <SelectGroup value={profile.gender} onChange={v => setProfile({ ...profile, gender: v })} options={[
            { value: 'male', label: 'Male', icon: '👨' },
            { value: 'female', label: 'Female', icon: '👩' },
            { value: 'other', label: 'Other', icon: '🧑' },
          ]} />
        </Field>

        <Field label="Fitness Goal">
          <SelectGroup value={profile.goal} onChange={v => setProfile({ ...profile, goal: v })} options={[
            { value: 'weight_loss', label: 'Weight Loss', icon: '🔥' },
            { value: 'muscle_gain', label: 'Muscle Gain', icon: '💪' },
            { value: 'flexibility', label: 'Flexibility', icon: '🧘' },
            { value: 'endurance', label: 'Endurance', icon: '🏃' },
            { value: 'general_fitness', label: 'General Fitness', icon: '❤️' },
          ]} />
        </Field>

        <Field label="Fitness Level">
          <SelectGroup value={profile.fitness_level} onChange={v => setProfile({ ...profile, fitness_level: v })} options={[
            { value: 'beginner', label: 'Beginner', icon: '🌱' },
            { value: 'intermediate', label: 'Intermediate', icon: '⚡' },
            { value: 'advanced', label: 'Advanced', icon: '🔥' },
          ]} />
        </Field>

        <Field label="Diet Preference">
          <SelectGroup value={profile.diet_type} onChange={v => setProfile({ ...profile, diet_type: v })} options={[
            { value: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
            { value: 'non_vegetarian', label: 'Non-Veg', icon: '🍗' },
            { value: 'vegan', label: 'Vegan', icon: '🌱' },
            { value: 'eggetarian', label: 'Eggetarian', icon: '🥚' },
          ]} />
        </Field>

        <Field label="Workout Preference">
          <SelectGroup value={profile.workout_type} onChange={v => setProfile({ ...profile, workout_type: v })} options={[
            { value: 'home', label: 'Home Workout', icon: '🏠' },
            { value: 'gym', label: 'Gym Workout', icon: '🏋️' },
          ]} />
        </Field>

        <Field label="Injuries / Limitations (optional)">
          <input type="text" value={profile.injuries} onChange={e => setProfile({ ...profile, injuries: e.target.value })} placeholder="e.g., knee pain, lower back issue" className={inputClass} />
        </Field>

        <button onClick={handleSave} disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl font-display font-bold hover:shadow-lg hover:shadow-primary-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {saved ? <><CheckCircle size={18} /> Profile Saved!</> : loading ? '⏳ Saving...' : <><Save size={18} /> Save Profile</>}
        </button>
      </div>
    </div>
  );
}
