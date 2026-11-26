import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import './StringListField.css';

export function StringListField({ label, placeholder, items, onChange }) {
  const [draft, setDraft] = useState('');

  const addItem = () => {
    const trimmed = draft.trim();
    if (!trimmed || items.includes(trimmed)) return;
    onChange([...items, trimmed]);
    setDraft('');
  };

  const removeItem = (target) => {
    onChange(items.filter((item) => item !== target));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addItem();
    }
  };

  return (
    <div className="list-field">
      <label className="field-label">{label}</label>
      <div className="list-field-row">
        <input
          type="text"
          className="form-input"
          placeholder={placeholder}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="button" className="btn btn-outline" onClick={addItem}>
          <Plus size={16} />
          إضافة
        </button>
      </div>

      {items.length > 0 ? (
        <div className="list-field-chips">
          {items.map((item) => (
            <span key={item} className="chip-item">
              {item}
              <button
                type="button"
                className="chip-remove"
                onClick={() => removeItem(item)}
                aria-label={`حذف ${item}`}
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
