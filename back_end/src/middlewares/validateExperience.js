import { AppError } from '../utils/appError.js';

const ALLOWED_CATEGORIES = ['job', 'internship', 'courses', 'resources'];

function isValidHttpUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validates incoming payload for creating a new experience.
 */
export function validateExperiencePayload(req, _res, next) {
  const { title, authorName, category, story, resources } = req.body || {};

  if (!title || String(title).trim().length < 5) {
    return next(new AppError('عنوان التجربة مطلوب ويجب أن يكون 5 أحرف على الأقل', 400));
  }

  if (!authorName || String(authorName).trim().length < 2) {
    return next(new AppError('اسم صاحب التجربة مطلوب', 400));
  }

  if (!category || !ALLOWED_CATEGORIES.includes(category)) {
    return next(new AppError('تصنيف التجربة غير صالح', 400));
  }

  if (!story || String(story).trim().length < 20) {
    return next(new AppError('تفاصيل التجربة مطلوبة (20 حرفاً على الأقل)', 400));
  }

  if (Array.isArray(resources)) {
    const hasInvalidUrl = resources.some((res) => res?.url && !isValidHttpUrl(res.url));
    if (hasInvalidUrl) {
      return next(new AppError('أحد روابط المصادر غير صالح (يجب أن يبدأ بـ http أو https)', 400));
    }
  }

  return next();
}
