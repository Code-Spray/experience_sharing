import { useCallback, useEffect, useState } from 'react';
import {
  fetchExperienceById,
  markExperienceHelpful,
} from '../serveses/experienceService.js';

/**
 * Fetches a single experience and exposes a handler to increment its helpful count.
 */
export function useExperienceDetail(id) {
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasVoted, setHasVoted] = useState(false);

  const loadExperience = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchExperienceById(id);
      setExperience(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadExperience();
  }, [loadExperience]);

  const handleHelpful = useCallback(async () => {
    if (hasVoted || !experience) return;
    try {
      const updated = await markExperienceHelpful(experience.id);
      setExperience(updated);
      setHasVoted(true);
    } catch (err) {
      setError(err.message);
    }
  }, [experience, hasVoted]);

  return { experience, loading, error, hasVoted, handleHelpful };
}
