import crypto from 'node:crypto';
import { experienceRepository } from '../repositories/experienceRepository.js';
import { AppError } from '../utils/appError.js';

const VALID_CATEGORIES = new Set(['job', 'internship', 'courses', 'resources']);
const VALID_RESOURCE_TYPES = new Set(['youtube', 'website', 'course']);

function matchesCategory(item, category) {
  if (!category || category === 'all') return true;
  return item.category === category;
}

function matchesAuthor(item, author) {
  if (!author) return true;
  return item.authorName.toLowerCase().includes(author.trim().toLowerCase());
}

function matchesSearch(item, query) {
  if (!query) return true;
  const normalized = query.trim().toLowerCase();
  const searchableFields = [
    item.title,
    item.summary,
    item.story,
    item.howIGotIt,
    item.authorName,
    item.authorRole,
    ...(item.tags || []),
    ...(item.coursesTaken || []),
  ];
  return searchableFields.some((field) =>
    String(field || '').toLowerCase().includes(normalized),
  );
}

function normalizeStringArray(items) {
  if (!Array.isArray(items)) return [];
  return items.map((entry) => String(entry).trim()).filter(Boolean);
}

function normalizeResources(resources) {
  if (!Array.isArray(resources)) return [];
  return resources
    .filter((res) => res && res.title && res.url)
    .map((res) => ({
      title: String(res.title).trim(),
      url: String(res.url).trim(),
      type: VALID_RESOURCE_TYPES.has(res.type) ? res.type : 'website',
    }));
}

function buildExperienceEntity(payload) {
  const storyText = String(payload.story).trim();
  const summaryText = payload.summary?.trim() || `${storyText.slice(0, 140)}...`;

  return {
    id: `exp-${crypto.randomUUID().slice(0, 8)}`,
    title: String(payload.title).trim(),
    authorName: String(payload.authorName).trim(),
    authorRole: String(payload.authorRole || 'عضو في المجتمع').trim(),
    category: VALID_CATEGORIES.has(payload.category) ? payload.category : 'job',
    summary: summaryText,
    story: storyText,
    howIGotIt: String(payload.howIGotIt || '').trim(),
    coursesTaken: normalizeStringArray(payload.coursesTaken),
    resources: normalizeResources(payload.resources),
    tags: normalizeStringArray(payload.tags),
    helpfulCount: 0,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Lists experiences filtered by category, search query, or author, newest first.
 */
async function listExperiences({ category, search, author } = {}) {
  const all = await experienceRepository.readAll();
  return all
    .filter((item) => matchesCategory(item, category))
    .filter((item) => matchesAuthor(item, author))
    .filter((item) => matchesSearch(item, search))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * Retrieves a single experience or throws 404 if not found.
 */
async function getExperienceById(id) {
  const experience = await experienceRepository.findById(id);
  if (!experience) {
    throw new AppError('التجربة غير موجودة', 404);
  }
  return experience;
}

/**
 * Creates and persists a new experience entry.
 */
async function createExperience(payload) {
  const entity = buildExperienceEntity(payload);
  return experienceRepository.create(entity);
}

/**
 * Increments the helpful counter for an experience.
 */
async function markHelpful(id) {
  const updated = await experienceRepository.updateById(id, (item) => ({
    ...item,
    helpfulCount: (item.helpfulCount || 0) + 1,
  }));

  if (!updated) {
    throw new AppError('التجربة غير موجودة', 404);
  }
  return updated;
}

/**
 * Computes aggregate counts across all shared experiences.
 */
async function getStats() {
  const all = await experienceRepository.readAll();
  const byCategory = all.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const totalHelpful = all.reduce((sum, item) => sum + (item.helpfulCount || 0), 0);

  return {
    totalExperiences: all.length,
    totalHelpful,
    byCategory,
  };
}

export const experienceService = {
  listExperiences,
  getExperienceById,
  createExperience,
  markHelpful,
  getStats,
};
