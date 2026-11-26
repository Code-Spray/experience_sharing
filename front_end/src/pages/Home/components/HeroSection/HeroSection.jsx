import { PenSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

export function HeroSection({ stats }) {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <h1 className="hero-title">
          تجارب حقيقية في الشغل، الإنترنشيب، الكورسات وأفضل المصادر
        </h1>
        <p className="hero-subtitle">
          اقرأ قصص ناس مرت بنفس الطريق، واعرف جابوا شغلهم ازاي وإيه قنوات اليوتيوب والمواقع
          اللي فرقت معاهم — وشارك تجربتك عشان تفيد غيرك.
        </p>
        <Link to="/share" className="btn hero-cta">
          <PenSquare size={18} />
          اكتب تجربتك الآن
        </Link>
      </div>

      {stats ? (
        <div className="hero-stats" aria-label="إحصائيات المنصة">
          <div className="stat-box">
            <span className="stat-value">{stats.totalExperiences}</span>
            <span className="stat-label">تجربة منشورة</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{stats.totalHelpful}</span>
            <span className="stat-label">إفادة للآخرين</span>
          </div>
        </div>
      ) : null}
    </section>
  );
}
