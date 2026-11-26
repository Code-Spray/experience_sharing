import { apiRequest } from './apiClient.js';

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

export async function fetchExperiences(filters = {}) {
  const query = buildQueryString(filters);
  const result = await apiRequest(`/experiences${query}`);
  return result.data;
}

export async function fetchExperienceStats() {
  const result = await apiRequest('/experiences/stats');
  return result.data;
}

export async function fetchExperienceById(id) {
  const result = await apiRequest(`/experiences/${id}`);
  return result.data;
}

export async function createExperience(payload) {
  const result = await apiRequest('/experiences', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return result.data;
}

export async function markExperienceHelpful(id) {
  const result = await apiRequest(`/experiences/${id}/helpful`, {
    method: 'PATCH',
  });
  return result.data;
}
