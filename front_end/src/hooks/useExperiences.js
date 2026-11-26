import { useCallback, useEffect, useState } from 'react';
import {
  fetchExperiences,
  fetchExperienceStats,
} from '../serveses/experienceService.js';

/**
 * Fetches and manages filtered experiences alongside platform stats.
 */
export function useExperiences({ category = 'all', search = '', author = '' } = {}) {
  const [experiences, setExperiences] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [items, summaryStats] = await Promise.all([
        fetchExperiences({ category, search, author }),
        fetchExperienceStats(),
      ]);
      setExperiences(items);
      setStats(summaryStats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [category, search, author]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { experiences, stats, loading, error, reload: loadData };
}
