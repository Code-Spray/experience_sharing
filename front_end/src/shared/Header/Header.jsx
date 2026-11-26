import { BookOpen, PenSquare, User } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand-link">
          <span className="brand-icon" aria-hidden="true">
            <BookOpen size={20} />
          </span>
          <span>خِبرة</span>
        </Link>

        <nav className="header-nav" aria-label="التنقل الرئيسي">
          <NavLink to="/" end className="nav-link">
            التجارب
          </NavLink>
          <NavLink to="/profile" className="nav-link">
            <User size={16} style={{ verticalAlign: 'middle', marginLeft: 4 }} />
            الملف الشخصي
          </NavLink>
          <Link to="/share" className="btn btn-primary">
            <PenSquare size={17} />
            شارك تجربتك
          </Link>
        </nav>
      </div>
    </header>
  );
}
