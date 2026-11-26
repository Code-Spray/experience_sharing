import { useState } from 'react';
import { useExperiences } from '../../hooks/useExperiences.js';
import { EmptyState } from '../../shared/EmptyState/EmptyState.jsx';
import { ExperienceCard } from '../Home/components/ExperienceCard/ExperienceCard.jsx';
import { UserInfoCard } from './components/UserInfoCard/UserInfoCard.jsx';
import './Profile.css';

export function Profile() {
  const [authorFilter, setAuthorFilter] = useState('');
  const { experiences, loading, error } = useExperiences({ author: authorFilter });

  return (
    <div className="profile-page">
      <UserInfoCard authorName={authorFilter} experienceCount={experiences.length} />

      <div className="profile-filter-bar">
        <input
          type="search"
          className="profile-author-input"
          placeholder="ابحث باسم الكاتب لعرض تجاربه..."
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
          aria-label="تصفية حسب اسم الكاتب"
        />
      </div>

      {error ? <div className="status-banner">{error}</div> : null}

      {loading ? (
        <div className="loading-state">جاري تحميل التجارب...</div>
      ) : experiences.length === 0 ? (
        <EmptyState
          title="لا توجد تجارب لهذا الاسم"
          description="تأكد من كتابة الاسم أو أضف تجربة جديدة باسمك."
          actionLabel="شارك تجربتك"
          actionTo="/share"
        />
      ) : (
        <section className="experiences-grid">
          {experiences.map((item) => (
            <ExperienceCard key={item.id} experience={item} />
          ))}
        </section>
      )}
    </div>
  );
}
