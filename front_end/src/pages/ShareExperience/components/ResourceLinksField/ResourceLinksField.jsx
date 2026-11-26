import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { getResourceTypeLabel } from '../../../../serveses/categoryConfig.js';
import './ResourceLinksField.css';

const EMPTY_DRAFT = { title: '', url: '', type: 'youtube' };

export function ResourceLinksField({ resources, onChange }) {
  const [draft, setDraft] = useState(EMPTY_DRAFT);

  const addResource = () => {
    const title = draft.title.trim();
    const url = draft.url.trim();
    if (!title || !url) return;

    onChange([...resources, { title, url, type: draft.type }]);
    setDraft(EMPTY_DRAFT);
  };

  const removeResource = (indexToRemove) => {
    onChange(resources.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="resources-field">
      <label className="field-label">روابط ومصادر ساعدتك (يوتيوب، مواقع، كورسات)</label>

      <div className="resource-inputs">
        <input
          type="text"
          className="form-input"
          placeholder="اسم المصدر (مثلاً: قناة الزيرو)"
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        />
        <input
          type="url"
          className="form-input"
          placeholder="https://..."
          value={draft.url}
          onChange={(e) => setDraft({ ...draft, url: e.target.value })}
        />
        <select
          className="form-input"
          value={draft.type}
          onChange={(e) => setDraft({ ...draft, type: e.target.value })}
        >
          <option value="youtube">يوتيوب</option>
          <option value="website">موقع / مقال</option>
          <option value="course">كورس</option>
        </select>
        <button type="button" className="btn btn-outline" onClick={addResource}>
          <Plus size={16} />
          إضافة
        </button>
      </div>

      {resources.length > 0 ? (
        <div className="resource-draft-list">
          {resources.map((res, index) => (
            <div key={`${res.url}-${index}`} className="resource-draft-item">
              <div className="resource-draft-meta">
                <strong>
                  {res.title} ({getResourceTypeLabel(res.type)})
                </strong>
                <span className="resource-draft-url">{res.url}</span>
              </div>
              <button
                type="button"
                className="chip-remove"
                onClick={() => removeResource(index)}
                aria-label="حذف المصدر"
              >
                <Trash2 size={16} color="var(--danger)" />
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
