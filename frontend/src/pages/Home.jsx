import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Brain, TrendingUp, Trophy, MessageSquare, Apple, BarChart3, Zap } from 'lucide-react';

const features = [
  { icon: Brain, title: 'Multi-Agent AI', desc: 'Supervisor routes your queries to specialized workout, nutrition, progress & motivation agents', color: 'from-blue-500 to-cyan-500' },
  { icon: Dumbbell, title: 'Smart Workouts', desc: 'Personalized plans adapting to your level, goals, and available equipment', color: 'from-primary-500 to-emerald-500' },
  { icon: Apple, title: 'Nutrition Coach', desc: 'Meal plans, calorie tracking, macro calculations & food photo analysis', color: 'from-orange-500 to-amber-500' },
  { icon: TrendingUp, title: 'Progress Tracking', desc: 'Weight logs, BMI tracking, visual charts & weekly progress reports', color: 'from-purple-500 to-pink-500' },
  { icon: Trophy, title: 'Gamification', desc: 'Earn points, unlock badges, maintain streaks & level up your fitness', color: 'from-yellow-500 to-orange-500' },
  { icon: Zap, title: 'RAG Knowledge', desc: 'AI enhanced with fitness knowledge base for accurate, research-backed advice', color: 'from-red-500 to-rose-500' },
];

export default function Home() {
  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-400/10 rounded-full blur-[128px]" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary-400 mb-6 animate-fade-in">
            <Zap size={14} />
            <span>Powered by OpenClaw + Groq AI</span>
          </div>

          <h1 className="font-display font-extrabold text-5xl lg:text-7xl mb-6 animate-slide-up">
            Your AI
            <span className="gradient-text"> Fitness Coach</span>
            <br />That Actually Works
          </h1>

          <p className="text-lg text-dark-200/60 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Multi-agent AI system with personalized workouts, nutrition plans, progress tracking, and gamification. Available on Web & Telegram.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/chat" className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl font-display font-bold text-lg hover:shadow-xl hover:shadow-primary-500/30 transition-all hover:-translate-y-1">
              <MessageSquare className="inline mr-2" size={20} />
              Start Chatting
            </Link>
            <Link to="/dashboard" className="px-8 py-4 glass rounded-2xl font-display font-bold text-lg hover:bg-dark-800/80 transition-all hover:-translate-y-1">
              <BarChart3 className="inline mr-2" size={20} />
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="font-display font-bold text-3xl text-center mb-12">
          Everything You Need to <span className="gradient-text">Transform</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="glass rounded-2xl p-6 hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-1 group animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <f.icon size={24} className="text-white" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-dark-200/50 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Section */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div className="glass rounded-3xl p-8 text-center">
          <h2 className="font-display font-bold text-2xl mb-6">Multi-Agent Architecture</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: '🧠', name: 'Supervisor', desc: 'Routes queries' },
              { emoji: '💪', name: 'Workout', desc: 'Exercise plans' },
              { emoji: '🥗', name: 'Nutrition', desc: 'Diet advice' },
              { emoji: '📊', name: 'Progress', desc: 'Tracks stats' },
            ].map(a => (
              <div key={a.name} className="bg-dark-900/50 rounded-xl p-4">
                <div className="text-3xl mb-2">{a.emoji}</div>
                <div className="font-display font-bold text-sm">{a.name}</div>
                <div className="text-xs text-dark-200/40">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center text-dark-200/30 text-sm border-t border-dark-700/30">
        <p>Built with OpenClaw + Groq + React | FitCoach AI Agent</p>
      </footer>
    </div>
  );
}
