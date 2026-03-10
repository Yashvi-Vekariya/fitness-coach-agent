import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dumbbell, Moon, Sun } from 'lucide-react';

export default function Navbar({ onMenuClick }) {
  const [dark, setDark] = React.useState(true);

  return (
    <nav className="glass border-b border-dark-700/50 px-4 py-3 flex items-center justify-between z-30">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-dark-800 transition">
          <Menu size={20} />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg glow-green">
            <Dumbbell size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-lg gradient-text hidden sm:block">FitCoach AI</span>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link to="/chat" className="px-4 py-2 bg-primary-600 hover:bg-primary-500 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary-500/20">
          Start Chat 💬
        </Link>
      </div>
    </nav>
  );
}
