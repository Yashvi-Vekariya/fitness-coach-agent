import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loader({ size = 40, text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 size={size} className="animate-spin text-primary-500 mb-3" />
      <p className="text-sm text-dark-200/40">{text}</p>
    </div>
  );
}
