const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Executes an HTTP request against the backend API and returns parsed JSON.
 */
export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      ...options.headers,
    },
    ...options,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = payload?.message || 'حدث خطأ أثناء الاتصال بالسيرفر';
    throw new Error(message);
  }

  return payload;
}
