import { Link2, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatArabicDate } from '../../../../serveses/categoryConfig.js';
import { CategoryBadge } from '../../../../shared/CategoryBadge/CategoryBadge.jsx';
import './ExperienceCard.css';

export function ExperienceCard({ experience }) {
  const resourceCount = experience.resources?.length || 0;

  return (
    <Link to={`/experiences/${experience.id}`} className="experience-card">
      <div className="card-top">
        <CategoryBadge category={experience.category} />
        <span className="card-date">{formatArabicDate(experience.createdAt)}</span>
      </div>

      <h2 className="card-title">{experience.title}</h2>
      <p className="card-summary">{experience.summary}</p>

      {experience.tags?.length > 0 ? (
        <div className="card-tags">
          {experience.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag-chip">
              #{tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="card-footer">
        <div className="author-meta">
          <span className="author-name">{experience.authorName}</span>
          <span className="author-role">{experience.authorRole}</span>
        </div>

        <div className="card-stats">
          {resourceCount > 0 ? (
            <span className="stat-inline" title="عدد المصادر">
              <Link2 size={15} />
              {resourceCount}
            </span>
          ) : null}
          <span className="stat-inline" title="مفيد">
            <ThumbsUp size={15} />
            {experience.helpfulCount || 0}
          </span>
        </div>
      </div>
    </Link>
  );
}
