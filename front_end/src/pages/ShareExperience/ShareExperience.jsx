import { Send } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORY_OPTIONS } from '../../serveses/categoryConfig.js';
import { createExperience } from '../../serveses/experienceService.js';
import { ResourceLinksField } from './components/ResourceLinksField/ResourceLinksField.jsx';
import { StringListField } from './components/StringListField/StringListField.jsx';
import './ShareExperience.css';

const INITIAL_FORM = {
  title: '',
  authorName: '',
  authorRole: '',
  category: 'internship',
  summary: '',
  story: '',
  howIGotIt: '',
  coursesTaken: [],
  resources: [],
  tags: [],
};

export function ShareExperience() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const created = await createExperience(form);
      navigate(`/experiences/${created.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const selectableCategories = CATEGORY_OPTIONS.filter((opt) => opt.id !== 'all');

  return (
    <div className="share-page">
      <div className="share-header">
        <h1 className="share-title">شارك تجربتك الشخصية</h1>
        <p className="share-subtitle">
          احكي للناس اشتغلت ازاي، خدت إنترنشيب ازاي، وإيه الكورسات والمواقع اللي فادتك.
        </p>
      </div>

      {error ? <div className="status-banner">{error}</div> : null}

      <form className="share-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="field-label" htmlFor="title">
            عنوان التجربة *
          </label>
          <input
            id="title"
            type="text"
            required
            className="form-input"
            placeholder="مثال: ازاي جبت أول إنترنشيب في تطوير الويب"
            value={form.title}
            onChange={(e) => updateField('title', e.target.value)}
          />
        </div>

        <div className="form-grid-two">
          <div className="form-field">
            <label className="field-label" htmlFor="authorName">
              اسمك *
            </label>
            <input
              id="authorName"
              type="text"
              required
              className="form-input"
              placeholder="مثال: أحمد محمود"
              value={form.authorName}
              onChange={(e) => updateField('authorName', e.target.value)}
            />
          </div>

          <div className="form-field">
            <label className="field-label" htmlFor="authorRole">
              مجالك أو مسماك الوظيفي
            </label>
            <input
              id="authorRole"
              type="text"
              className="form-input"
              placeholder="مثال: Frontend Developer / طالب هندسة"
              value={form.authorRole}
              onChange={(e) => updateField('authorRole', e.target.value)}
            />
          </div>
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="category">
            نوع التجربة *
          </label>
          <select
            id="category"
            className="form-input"
            value={form.category}
            onChange={(e) => updateField('category', e.target.value)}
          >
            {selectableCategories.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="summary">
            ملخص سريع (اختياري)
          </label>
          <input
            id="summary"
            type="text"
            className="form-input"
            placeholder="سطرين بيلخصوا تجربتك في الكارت الرئيسي"
            value={form.summary}
            onChange={(e) => updateField('summary', e.target.value)}
          />
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="story">
            تفاصيل التجربة والخطوات اللي مشيت عليها *
          </label>
          <textarea
            id="story"
            required
            className="form-input form-textarea"
            placeholder="احكي بدأت ازاي، اتعلمت إيه، وإيه التحديات اللي قابلتك..."
            value={form.story}
            onChange={(e) => updateField('story', e.target.value)}
          />
        </div>

        <div className="form-field">
          <label className="field-label" htmlFor="howIGotIt">
            جبت الشغل أو الإنترنشيب ازاي؟
          </label>
          <textarea
            id="howIGotIt"
            className="form-input form-textarea"
            placeholder="قدمت فين؟ لينكدإن، معارف، بورتفوليو، أو نصيحة للإنترفيو..."
            value={form.howIGotIt}
            onChange={(e) => updateField('howIGotIt', e.target.value)}
          />
        </div>

        <StringListField
          label="كورسات أخدتها في مجالك"
          placeholder="اكتب اسم الكورس واضغط إضافة"
          items={form.coursesTaken}
          onChange={(next) => updateField('coursesTaken', next)}
        />

        <ResourceLinksField
          resources={form.resources}
          onChange={(next) => updateField('resources', next)}
        />

        <StringListField
          label="وسوم (Tags)"
          placeholder="مثال: React, Python, إنترنشيب"
          items={form.tags}
          onChange={(next) => updateField('tags', next)}
        />

        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={() => navigate('/')}>
            إلغاء
          </button>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            <Send size={16} />
            {submitting ? 'جاري النشر...' : 'نشر التجربة'}
          </button>
        </div>
      </form>
    </div>
  );
}
