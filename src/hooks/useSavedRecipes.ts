import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '../data/recipes';

const STORAGE_KEY = '@crumb_saved_recipes';

export function useSavedRecipes() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load from storage on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(raw => {
        if (raw) setSavedIds(JSON.parse(raw));
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const persist = useCallback(async (ids: string[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {}
  }, []);

  const toggleSave = useCallback((id: string) => {
    setSavedIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      persist(next);
      return next;
    });
  }, [persist]);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  return { savedIds, isSaved, toggleSave, loaded };
}
