import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageSquare, LayoutDashboard, Dumbbell, Apple, User, X, Trophy } from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/chat', icon: MessageSquare, label: 'AI Chat' },
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/workouts', icon: Dumbbell, label: 'Workouts' },
  { path: '/nutrition', icon: Apple, label: 'Nutrition' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 glass border-r border-dark-700/50
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-dark-700/50">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center glow-green">
              <Dumbbell size={22} className="text-white" />
            </div>
            <div>
              <h2 className="font-display font-bold gradient-text">FitCoach AI</h2>
              <p className="text-xs text-dark-200/50">Powered by OpenClaw</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 rounded hover:bg-dark-800">
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive
                    ? 'bg-primary-600/20 text-primary-400 border border-primary-500/30 shadow-lg shadow-primary-500/10'
                    : 'text-dark-200/60 hover:text-white hover:bg-dark-800/50'
                  }
                `}
              >
                <Icon size={18} />
                <span className="font-medium text-sm">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-dark-700/50">
          <div className="glass rounded-xl p-3 text-center">
            <Trophy size={20} className="text-accent-300 mx-auto mb-1" />
            <p className="text-xs text-dark-200/60">Keep pushing! 💪</p>
          </div>
        </div>
      </aside>
    </>
  );
}
