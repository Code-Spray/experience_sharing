import { apiRequest } from './apiClient.js';
import { localExperienceFallback } from './fallbackData.js';

function buildQueryString(filters = {}) {
  const params = new URLSearchParams();
  if (filters.category && filters.category !== 'all') {
    params.set('category', filters.category);
  }
  if (filters.search) {
    params.set('search', filters.search);
  }
  if (filters.author) {
    params.set('author', filters.author);
  }
  const query = params.toString();
  return query ? `?${query}` : '';
}

async function withFallback(apiCall, fallbackCall) {
  try {
    return await apiCall();
  } catch {
    return fallbackCall();
  }
}

export async function fetchExperiences(filters = {}) {
  const query = buildQueryString(filters);
  return withFallback(
    async () => (await apiRequest(`/experiences${query}`)).data,
    () => localExperienceFallback.list(filters),
  );
}

export async function fetchExperienceStats() {
  return withFallback(
    async () => (await apiRequest('/experiences/stats')).data,
    () => localExperienceFallback.stats(),
  );
}

export async function fetchExperienceById(id) {
  return withFallback(
    async () => (await apiRequest(`/experiences/${id}`)).data,
    () => {
      const item = localExperienceFallback.getById(id);
      if (!item) throw new Error('التجربة غير موجودة');
      return item;
    },
  );
}

export async function createExperience(payload) {
  return withFallback(
    async () =>
      (
        await apiRequest('/experiences', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
      ).data,
    () => localExperienceFallback.create(payload),
  );
}

export async function markExperienceHelpful(id) {
  return withFallback(
    async () => (await apiRequest(`/experiences/${id}/helpful`, { method: 'PATCH' })).data,
    () => localExperienceFallback.markHelpful(id),
  );
}
