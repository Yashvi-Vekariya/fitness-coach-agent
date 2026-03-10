import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Flame, Trophy, Target, Dumbbell, Loader2 } from 'lucide-react';
import { getDashboard } from '../utils/api';

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const result = await getDashboard();
      setData(result);
    } catch (error) {
      console.error('Dashboard load error:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 size={40} className="animate-spin text-primary-500" />
      </div>
    );
  }

  const stats = data?.stats;
  const report = data?.weeklyReport;
  const gamification = data?.gamification;
  const chartData = data?.chartData;

  // Sample data if no real data yet
  const weightData = chartData?.weights?.length > 0
    ? chartData.weights.map(w => ({ date: new Date(w.logged_at).toLocaleDateString('en', { month: 'short', day: 'numeric' }), weight: w.weight }))
    : [{ date: 'Today', weight: 0 }];

  const macroData = [
    { name: 'Protein', value: 30 },
    { name: 'Carbs', value: 45 },
    { name: 'Fat', value: 25 },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-3xl gradient-text">Dashboard</h1>
        <p className="text-dark-200/50 text-sm mt-1">Your fitness journey at a glance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Current Weight', value: `${stats?.user?.weight || '--'} kg`, icon: TrendingUp, color: 'from-blue-500 to-cyan-500', change: report?.weightChange ? `${report.weightChange > 0 ? '+' : ''}${report.weightChange}kg` : null },
          { label: 'Streak', value: `${stats?.user?.streak || 0} days`, icon: Flame, color: 'from-orange-500 to-red-500', extra: '🔥' },
          { label: 'Workouts This Week', value: report?.workoutsCompleted || 0, icon: Dumbbell, color: 'from-primary-500 to-emerald-500' },
          { label: 'Points', value: gamification?.points || 0, icon: Trophy, color: 'from-yellow-500 to-amber-500', extra: gamification?.level?.badge },
        ].map((stat, i) => (
          <div key={i} className="glass rounded-2xl p-5 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon size={20} className="text-white" />
              </div>
              {stat.extra && <span className="text-xl">{stat.extra}</span>}
            </div>
            <div className="font-display font-bold text-2xl">{stat.value}</div>
            <div className="text-xs text-dark-200/40 mt-1">{stat.label}</div>
            {stat.change && (
              <div className={`text-xs mt-1 ${parseFloat(stat.change) <= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change} this week
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weight Progress Chart */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-display font-bold text-lg mb-4">Weight Progress</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#475569" fontSize={12} />
              <YAxis stroke="#475569" fontSize={12} />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Line type="monotone" dataKey="weight" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Macro Distribution */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-display font-bold text-lg mb-4">Macro Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={macroData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                {macroData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2">
            {macroData.map((m, i) => (
              <div key={m.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i] }} />
                <span className="text-xs text-dark-200/50">{m.name} {m.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Level Progress & Achievements */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Level Progress */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-display font-bold text-lg mb-4">Level Progress</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">{gamification?.level?.badge || '🌱'}</div>
            <div>
              <div className="font-display font-bold text-xl">{gamification?.level?.name || 'Beginner'}</div>
              <div className="text-xs text-dark-200/40">{gamification?.points || 0} points</div>
            </div>
          </div>
          <div className="w-full bg-dark-800 rounded-full h-3 mb-2">
            <div
              className="bg-gradient-to-r from-primary-500 to-primary-400 h-3 rounded-full transition-all duration-500"
              style={{ width: `${gamification?.progressToNext || 0}%` }}
            />
          </div>
          {gamification?.nextLevel && (
            <div className="text-xs text-dark-200/40">
              {gamification.nextLevel.pointsNeeded} points to {gamification.nextLevel.badge} {gamification.nextLevel.name}
            </div>
          )}
        </div>

        {/* Achievements */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-display font-bold text-lg mb-4">
            Achievements ({gamification?.unlockedCount || 0}/{gamification?.totalAchievements || 6})
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {(gamification?.achievements || [
              { icon: '🎯', name: 'First Step', unlocked: false },
              { icon: '🔥', name: 'On Fire', unlocked: false },
              { icon: '💪', name: 'Unstoppable', unlocked: false },
              { icon: '📊', name: 'Data Driven', unlocked: false },
              { icon: '🥗', name: 'Nutrition Pro', unlocked: false },
              { icon: '💯', name: 'Century Club', unlocked: false },
            ]).map((a, i) => (
              <div key={i} className={`rounded-xl p-3 text-center transition-all ${a.unlocked ? 'bg-primary-500/10 border border-primary-500/30' : 'bg-dark-900/50 opacity-40'}`}>
                <div className="text-2xl mb-1">{a.icon}</div>
                <div className="text-xs font-medium">{a.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-display font-bold text-lg mb-4">Weekly Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Workouts Done', value: report?.workoutsCompleted || 0 },
            { label: 'Total Duration', value: `${report?.totalDuration || 0} min` },
            { label: 'Calories Burned', value: report?.totalCaloriesBurned || 0 },
            { label: 'Meals Logged', value: report?.mealsLogged || 0 },
          ].map((item, i) => (
            <div key={i} className="bg-dark-900/50 rounded-xl p-4 text-center">
              <div className="font-display font-bold text-2xl text-primary-400">{item.value}</div>
              <div className="text-xs text-dark-200/40 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
