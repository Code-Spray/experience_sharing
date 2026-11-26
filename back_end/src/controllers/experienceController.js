import { experienceService } from '../services/experienceService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getExperiences = asyncHandler(async (req, res) => {
  const { category, search, author } = req.query;
  const experiences = await experienceService.listExperiences({
    category,
    search,
    author,
  });

  res.json({
    success: true,
    count: experiences.length,
    data: experiences,
  });
});

export const getExperienceStats = asyncHandler(async (_req, res) => {
  const stats = await experienceService.getStats();
  res.json({
    success: true,
    data: stats,
  });
});

export const getExperienceById = asyncHandler(async (req, res) => {
  const experience = await experienceService.getExperienceById(req.params.id);
  res.json({
    success: true,
    data: experience,
  });
});

export const createExperience = asyncHandler(async (req, res) => {
  const created = await experienceService.createExperience(req.body);
  res.status(201).json({
    success: true,
    data: created,
  });
});

export const incrementHelpful = asyncHandler(async (req, res) => {
  const updated = await experienceService.markHelpful(req.params.id);
  res.json({
    success: true,
    data: updated,
  });
});
