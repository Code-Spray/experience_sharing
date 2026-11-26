import { ExternalLink } from 'lucide-react';
import { getResourceTypeLabel } from '../../../../serveses/categoryConfig.js';
import './ResourceList.css';

export function ResourceList({ resources }) {
  if (!resources || resources.length === 0) return null;

  return (
    <div className="resource-list">
      {resources.map((resource, index) => (
        <a
          key={`${resource.url}-${index}`}
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="resource-link-card"
        >
          <div className="resource-info">
            <span className="resource-title">{resource.title}</span>
            <span className="resource-type">{getResourceTypeLabel(resource.type)}</span>
          </div>
          <ExternalLink size={17} color="var(--brand-primary)" />
        </a>
      ))}
    </div>
  );
}
