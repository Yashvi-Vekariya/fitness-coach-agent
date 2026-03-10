import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  const toggle = () => {
    setDark(!dark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button onClick={toggle} className="p-2 rounded-lg hover:bg-dark-800 transition" title="Toggle theme">
      {dark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-blue-400" />}
    </button>
  );
}
