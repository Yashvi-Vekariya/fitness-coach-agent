import { useState, useEffect, useCallback } from 'react';
import { getUser, updateProfile, getUserId } from '../utils/api';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const data = await getUser();
      setUser(data);
    } catch (err) {
      console.error('Failed to load user:', err);
    }
    setLoading(false);
  }, []);

  const saveProfile = useCallback(async (profileData) => {
    try {
      const updated = await updateProfile(profileData);
      setUser(updated);
      return updated;
    } catch (err) {
      console.error('Failed to save profile:', err);
      throw err;
    }
  }, []);

  useEffect(() => { loadUser(); }, [loadUser]);

  return { user, loading, userId: getUserId(), saveProfile, refresh: loadUser };
}
