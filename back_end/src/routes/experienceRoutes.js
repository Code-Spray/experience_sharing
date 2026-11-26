import { Router } from 'express';
import {
  createExperience,
  getExperienceById,
  getExperiences,
  getExperienceStats,
  incrementHelpful,
} from '../controllers/experienceController.js';
import { validateExperiencePayload } from '../middlewares/validateExperience.js';

const router = Router();

router.get('/', getExperiences);
router.get('/stats', getExperienceStats);
router.get('/:id', getExperienceById);
router.post('/', validateExperiencePayload, createExperience);
router.patch('/:id/helpful', incrementHelpful);

export default router;
