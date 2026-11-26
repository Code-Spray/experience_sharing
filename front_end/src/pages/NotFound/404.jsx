import { Link } from 'react-router-dom';
import './404.css';

export function NotFound() {
  return (
    <div className="not-found-page">
      <p className="not-found-code">404</p>
      <h1 className="not-found-title">الصفحة غير موجودة</h1>
      <p className="not-found-desc">الرابط الذي تحاول الوصول إليه غير متاح أو تم نقله.</p>
      <Link to="/" className="btn btn-primary">
        العودة للرئيسية
      </Link>
    </div>
  );
}
