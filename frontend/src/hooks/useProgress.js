import { useState, useEffect, useCallback } from 'react';
import { getDashboard, getWeeklyReport, getChartData, getGamificationData } from '../utils/api';

export default function useProgress() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getDashboard();
      setDashboard(data);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard');
      console.error(err);
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadDashboard(); }, [loadDashboard]);

  return { dashboard, loading, error, refresh: loadDashboard };
}
