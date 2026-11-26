import fs from 'node:fs/promises';
import { supabase } from '../config/supabaseClient.js';
import { env } from '../config/env.js';

// ─── helpers ────────────────────────────────────────────────────────────────

/**
 * Maps a Supabase snake_case row to the camelCase shape used by the API.
 */
function toEntity(row) {
  return {
    id:           row.id,
    title:        row.title,
    authorName:   row.author_name,
    authorRole:   row.author_role,
    category:     row.category,
    summary:      row.summary,
    story:        row.story,
    howIGotIt:    row.how_i_got_it,
    coursesTaken: row.courses_taken ?? [],
    resources:    row.resources     ?? [],
    tags:         row.tags          ?? [],
    helpfulCount: row.helpful_count ?? 0,
    createdAt:    row.created_at,
  };
}

/**
 * Maps a camelCase entity to Supabase snake_case columns.
 */
function toRow(entity) {
  return {
    id:            entity.id,
    title:         entity.title,
    author_name:   entity.authorName,
    author_role:   entity.authorRole,
    category:      entity.category,
    summary:       entity.summary,
    story:         entity.story,
    how_i_got_it:  entity.howIGotIt,
    courses_taken: entity.coursesTaken,
    resources:     entity.resources,
    tags:          entity.tags,
    helpful_count: entity.helpfulCount,
    created_at:    entity.createdAt,
  };
}

// ─── JSON fallback (used when SUPABASE_URL is not set) ──────────────────────

async function readJsonAll() {
  const raw = await fs.readFile(env.dataFilePath, 'utf-8');
  return JSON.parse(raw);
}

async function writeJsonAll(items) {
  await fs.writeFile(env.dataFilePath, JSON.stringify(items, null, 2), 'utf-8');
}

// ─── Supabase implementations ────────────────────────────────────────────────

async function sbReadAll() {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data.map(toEntity);
}

async function sbFindById(id) {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? toEntity(data) : null;
}

async function sbCreate(entity) {
  const { data, error } = await supabase
    .from('experiences')
    .insert(toRow(entity))
    .select()
    .single();
  if (error) throw new Error(error.message);
  return toEntity(data);
}

async function sbUpdateById(id, updater) {
  const current = await sbFindById(id);
  if (!current) return null;
  const updated = updater(current);
  const { data, error } = await supabase
    .from('experiences')
    .update({ helpful_count: updated.helpfulCount })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return toEntity(data);
}

// ─── JSON fallback implementations ──────────────────────────────────────────

async function jsonFindById(id) {
  const all = await readJsonAll();
  return all.find((item) => item.id === id) || null;
}

async function jsonCreate(entity) {
  const all = await readJsonAll();
  await writeJsonAll([entity, ...all]);
  return entity;
}

async function jsonUpdateById(id, updater) {
  const all = await readJsonAll();
  const index = all.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const updatedItem = updater(all[index]);
  all[index] = updatedItem;
  await writeJsonAll(all);
  return updatedItem;
}

// ─── Public repository (auto-selects Supabase or JSON) ───────────────────────

export const experienceRepository = {
  readAll:    () => (supabase ? sbReadAll()          : readJsonAll()),
  findById:   (id) => (supabase ? sbFindById(id)     : jsonFindById(id)),
  create:     (e)  => (supabase ? sbCreate(e)        : jsonCreate(e)),
  updateById: (id, fn) => (supabase ? sbUpdateById(id, fn) : jsonUpdateById(id, fn)),
};
