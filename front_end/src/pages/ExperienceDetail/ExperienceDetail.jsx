import { ArrowRight, ThumbsUp } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useExperienceDetail } from '../../hooks/useExperienceDetail.js';
import { formatArabicDate } from '../../serveses/categoryConfig.js';
import { CategoryBadge } from '../../shared/CategoryBadge/CategoryBadge.jsx';
import { ResourceList } from './components/ResourceList/ResourceList.jsx';
import './ExperienceDetail.css';

export function ExperienceDetail() {
  const { id } = useParams();
  const { experience, loading, error, hasVoted, handleHelpful } = useExperienceDetail(id);

  if (loading) {
    return <div className="loading-state">جاري تحميل تفاصيل التجربة...</div>;
  }

  if (error || !experience) {
    return (
      <div className="detail-page">
        <div className="status-banner">{error || 'التجربة غير موجودة'}</div>
        <Link to="/" className="btn btn-outline">
          العودة للرئيسية
        </Link>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <Link to="/" className="back-link">
        <ArrowRight size={17} />
        العودة لكل التجارب
      </Link>

      <article className="detail-card">
        <header className="detail-header">
          <div className="detail-meta-row">
            <CategoryBadge category={experience.category} />
            <span className="card-date">{formatArabicDate(experience.createdAt)}</span>
          </div>
          <h1 className="detail-title">{experience.title}</h1>
          <div className="detail-author">
            <strong>{experience.authorName}</strong>
            <span>•</span>
            <span>{experience.authorRole}</span>
          </div>
        </header>

        <section className="detail-section">
          <h2>القصة والخطوات</h2>
          <p className="detail-paragraph">{experience.story}</p>
        </section>

        {experience.howIGotIt ? (
          <section className="detail-section">
            <h2>إزاي جبت الفرصة؟</h2>
            <p className="detail-paragraph">{experience.howIGotIt}</p>
          </section>
        ) : null}

        {experience.coursesTaken?.length > 0 ? (
          <section className="detail-section">
            <h2>الكورسات اللي أخدتها</h2>
            <ul className="courses-list">
              {experience.coursesTaken.map((course) => (
                <li key={course}>{course}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {experience.resources?.length > 0 ? (
          <section className="detail-section">
            <h2>مصادر ومواقع وقنوات يوتيوب</h2>
            <ResourceList resources={experience.resources} />
          </section>
        ) : null}

        <footer className="detail-footer">
          <div className="card-tags">
            {experience.tags?.map((tag) => (
              <span key={tag} className="tag-chip">
                #{tag}
              </span>
            ))}
          </div>

          <button
            type="button"
            className={`btn btn-outline helpful-btn ${hasVoted ? 'voted' : ''}`}
            onClick={handleHelpful}
            disabled={hasVoted}
          >
            <ThumbsUp size={17} />
            {hasVoted ? 'تمت الإفادة' : 'تجربة مفيدة'} ({experience.helpfulCount || 0})
          </button>
        </footer>
      </article>
    </div>
  );
}
