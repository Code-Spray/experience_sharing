import { PenSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import './UserInfoCard.css';

export function UserInfoCard({ authorName, experienceCount }) {
  const initial = authorName ? authorName.trim().charAt(0) : 'م';

  return (
    <section className="user-info-card">
      <div className="user-info-main">
        <div className="user-avatar" aria-hidden="true">
          {initial}
        </div>
        <div>
          <h1 className="user-name">{authorName || 'جميع المساهمين'}</h1>
          <p className="user-bio">
            عدد التجارب المعروضة: <strong>{experienceCount}</strong>
          </p>
        </div>
      </div>

      <Link to="/share" className="btn btn-primary">
        <PenSquare size={17} />
        إضافة تجربة جديدة
      </Link>
    </section>
  );
}
