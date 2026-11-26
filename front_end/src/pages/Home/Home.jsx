import { useState } from 'react';
import { useExperiences } from '../../hooks/useExperiences.js';
import { EmptyState } from '../../shared/EmptyState/EmptyState.jsx';
import { ExperienceCard } from './components/ExperienceCard/ExperienceCard.jsx';
import { FilterBar } from './components/FilterBar/FilterBar.jsx';
import { HeroSection } from './components/HeroSection/HeroSection.jsx';
import './Home.css';

export function Home() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const { experiences, stats, loading, error } = useExperiences({ category, search });

  return (
    <div className="home-page">
      <HeroSection stats={stats} />

      <FilterBar
        activeCategory={category}
        onCategoryChange={setCategory}
        searchQuery={search}
        onSearchChange={setSearch}
      />

      {error ? <div className="status-banner">{error}</div> : null}

      {loading ? (
        <div className="loading-state">جاري تحميل التجارب...</div>
      ) : experiences.length === 0 ? (
        <EmptyState
          title="مفيش تجارب مطابقة لبحثك حالياً"
          description="جرب تغير كلمات البحث أو التصنيف، أو كن أول من يشارك تجربة في هذا القسم."
          actionLabel="شارك تجربتك"
          actionTo="/share"
        />
      ) : (
        <section className="experiences-grid" aria-label="قائمة التجارب">
          {experiences.map((item) => (
            <ExperienceCard key={item.id} experience={item} />
          ))}
        </section>
      )}
    </div>
  );
}
