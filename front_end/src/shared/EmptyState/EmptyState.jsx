import { Inbox } from 'lucide-react';
import { Link } from 'react-router-dom';
import './EmptyState.css';

export function EmptyState({ title, description, actionLabel, actionTo }) {
  return (
    <div className="empty-state">
      <Inbox size={36} color="var(--text-muted)" />
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-desc">{description}</p>
      {actionLabel && actionTo ? (
        <Link to={actionTo} className="btn btn-primary">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
