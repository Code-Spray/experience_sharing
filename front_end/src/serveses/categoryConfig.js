export const CATEGORY_OPTIONS = [
  { id: 'all', label: 'الكل' },
  { id: 'job', label: 'تجربة شغل' },
  { id: 'internship', label: 'إنترنشيب' },
  { id: 'courses', label: 'كورسات ومسارات' },
  { id: 'resources', label: 'مواقع ويوتيوب' },
];

const CATEGORY_MAP = {
  job: { label: 'تجربة شغل', tone: 'teal' },
  internship: { label: 'إنترنشيب', tone: 'amber' },
  courses: { label: 'كورسات ومسارات', tone: 'indigo' },
  resources: { label: 'مواقع ويوتيوب', tone: 'rose' },
};

const RESOURCE_TYPE_LABELS = {
  youtube: 'يوتيوب',
  website: 'موقع / مقال',
  course: 'كورس',
};

export function getCategoryMeta(category) {
  return CATEGORY_MAP[category] || { label: 'تجربة عامة', tone: 'teal' };
}

export function getResourceTypeLabel(type) {
  return RESOURCE_TYPE_LABELS[type] || 'رابط';
}

export function formatArabicDate(isoString) {
  if (!isoString) return '';
  return new Date(isoString).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
