import fs from 'node:fs/promises';
import { env } from '../config/env.js';

/**
 * Reads all experiences from the JSON storage file.
 */
async function readAll() {
  const raw = await fs.readFile(env.dataFilePath, 'utf-8');
  return JSON.parse(raw);
}

/**
 * Persists the full list of experiences to the JSON storage file.
 */
async function writeAll(experiences) {
  const serialized = JSON.stringify(experiences, null, 2);
  await fs.writeFile(env.dataFilePath, serialized, 'utf-8');
}

/**
 * Finds a single experience by ID.
 */
async function findById(id) {
  const experiences = await readAll();
  return experiences.find((item) => item.id === id) || null;
}

/**
 * Prepends a new experience to storage and returns it.
 */
async function create(experience) {
  const experiences = await readAll();
  const updated = [experience, ...experiences];
  await writeAll(updated);
  return experience;
}

/**
 * Updates an experience matched by ID using the provided updater function.
 */
async function updateById(id, updater) {
  const experiences = await readAll();
  const index = experiences.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const updatedItem = updater(experiences[index]);
  experiences[index] = updatedItem;
  await writeAll(experiences);
  return updatedItem;
}

export const experienceRepository = {
  readAll,
  findById,
  create,
  updateById,
};
