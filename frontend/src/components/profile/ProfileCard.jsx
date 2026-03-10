import React from 'react';
import { User } from 'lucide-react';

export default function ProfileCard({ user = {} }) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center glow-green">
          <User size={32} />
        </div>
        <div>
          <h3 className="font-display font-bold text-xl">{user.name || 'New User'}</h3>
          <p className="text-sm text-dark-200/50">{user.level || 'Beginner'} • {user.goal?.replace('_', ' ') || 'General Fitness'}</p>
          <div className="flex gap-3 mt-1 text-xs text-dark-200/40">
            {user.age && <span>Age: {user.age}</span>}
            {user.weight && <span>Weight: {user.weight}kg</span>}
            {user.height && <span>Height: {user.height}cm</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
