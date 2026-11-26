import { getCategoryMeta } from '../../serveses/categoryConfig.js';
import './CategoryBadge.css';

export function CategoryBadge({ category }) {
  const { label, tone } = getCategoryMeta(category);
  return <span className={`category-badge badge-${tone}`}>{label}</span>;
}
