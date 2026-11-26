import { Router } from 'express';
import experienceRoutes from './experienceRoutes.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ success: true, status: 'ok' });
});

router.use('/experiences', experienceRoutes);

export default router;
