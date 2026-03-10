import React, { useState } from 'react';
import { Camera, Upload } from 'lucide-react';

export default function PhotoAnalyzer({ onAnalyze }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-display font-bold text-lg mb-4">📸 Meal Photo Analyzer</h3>
      <p className="text-sm text-dark-200/40 mb-4">Upload a photo of your meal to get calorie and macro estimates</p>

      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-dark-700/50 rounded-xl cursor-pointer hover:border-primary-500/50 transition-all">
        {preview ? (
          <img src={preview} alt="Meal" className="h-full w-full object-cover rounded-xl" />
        ) : (
          <div className="text-center">
            <Camera size={32} className="mx-auto text-dark-200/30 mb-2" />
            <p className="text-sm text-dark-200/30">Click to upload meal photo</p>
            <p className="text-xs text-dark-200/20 mt-1">JPG, PNG (max 5MB)</p>
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </label>

      {preview && (
        <button onClick={() => onAnalyze && onAnalyze(preview)}
          className="w-full mt-4 py-3 bg-primary-600 hover:bg-primary-500 rounded-xl font-display font-bold transition flex items-center justify-center gap-2">
          <Upload size={18} /> Analyze Meal
        </button>
      )}
    </div>
  );
}
