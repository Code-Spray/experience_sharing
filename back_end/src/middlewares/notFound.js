import { AppError } from '../utils/appError.js';

/**
 * Handles requests to undefined API routes.
 */
export function notFoundHandler(req, _res, next) {
  next(new AppError(`المسار غير موجود: ${req.originalUrl}`, 404));
}
