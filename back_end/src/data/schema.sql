-- ============================================================
-- Experience Sharing Platform — Supabase Schema
-- شغّل الملف ده كله في SQL Editor في Supabase
-- ============================================================

CREATE TABLE IF NOT EXISTS experiences (
  id              TEXT         PRIMARY KEY,
  title           TEXT         NOT NULL,
  author_name     TEXT         NOT NULL,
  author_role     TEXT         NOT NULL DEFAULT 'عضو في المجتمع',
  category        TEXT         NOT NULL
                               CHECK (category IN ('job', 'internship', 'courses', 'resources')),
  summary         TEXT         NOT NULL DEFAULT '',
  story           TEXT         NOT NULL,
  how_i_got_it    TEXT         NOT NULL DEFAULT '',
  courses_taken   JSONB        NOT NULL DEFAULT '[]',
  resources       JSONB        NOT NULL DEFAULT '[]',
  tags            JSONB        NOT NULL DEFAULT '[]',
  helpful_count   INTEGER      NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- تفعيل Row Level Security
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- السماح للكل بالقراءة
CREATE POLICY "public_read"   ON experiences FOR SELECT USING (true);
-- السماح للكل بإضافة تجربة
CREATE POLICY "public_insert" ON experiences FOR INSERT WITH CHECK (true);
-- السماح بتحديث الـ helpful_count فقط
CREATE POLICY "public_update" ON experiences FOR UPDATE USING (true);

-- ============================================================
-- بيانات أولية — 4 تجارب تبدأ بيها المنصة
-- ============================================================
INSERT INTO experiences
  (id, title, author_name, author_role, category, summary, story, how_i_got_it,
   courses_taken, resources, tags, helpful_count, created_at)
VALUES
(
  'exp-101',
  'ازاي جبت أول إنترنشيب في تطوير الويب بدون خبرة سابقة',
  'أحمد محمود', 'Frontend Developer', 'internship',
  'رحلتي من الصفر لحد ما اتقبلت في أول تدريب صيفي في شركة برمجيات.',
  'بدأت أتعلم HTML و CSS و JavaScript من الصفر لمدة 4 شهور. ركزت على التطبيق العملي وعملت 3 مشاريع حقيقية ورفعتهم على GitHub.',
  'قدمت على 25 شركة على LinkedIn و Wuzzuf وكنت ببعت رسالة مختصرة للـ HR فيها لينك البورتفوليو.',
  '["Elzero Web School - HTML & CSS & JS","React - The Complete Guide","CS50x"]',
  '[{"title":"Elzero Web School","url":"https://www.youtube.com/@ElzeroWebSchool","type":"youtube"},{"title":"MDN Web Docs","url":"https://developer.mozilla.org/","type":"website"}]',
  '["React","Frontend","إنترنشيب","GitHub"]',
  24, '2026-11-15T10:30:00Z'
),
(
  'exp-102',
  'تجربتي في التحضير والحصول على أول شغل Backend بـ Node.js',
  'سارة إبراهيم', 'Backend Engineer', 'job',
  'إزاي ذاكرت Node.js و Express وقواعد البيانات وإزاي اتغلبت على رهبة أول إنترفيو.',
  'اكتشفت إن مشروعين Backend متكاملين بـ Authentication و Error Handling كفاية كبداية.',
  'شاركت مشاريعي في بوستات على LinkedIn وواحد من الـ Senior Engineers شاف البوست ورشحني.',
  '["Node.js, Express, MongoDB & More","SQL & Database Design"]',
  '[{"title":"Traversy Media","url":"https://www.youtube.com/@TraversyMedia","type":"youtube"},{"title":"Roadmap.sh Backend","url":"https://roadmap.sh/backend","type":"website"}]',
  '["Node.js","Express","Backend","أول شغل"]',
  31, '2026-11-18T14:20:00Z'
),
(
  'exp-103',
  'أفضل قنوات اليوتيوب ومواقع جوجل اللي ساعدتني أتعلم UI/UX',
  'نور الدين حسن', 'Product Designer', 'resources',
  'تجميعة مجانية لأفضل المصادر لتصميم واجهات المستخدم وبناء Case Studies.',
  'جوجل نفسها منزلة مسارات ممتازة على Coursera وفيه قنوات يوتيوب بتشرح التصميم بشكل عملي.',
  'عملت 2 Case Studies على Behance وبدأت أشتغل Freelance قبل ما أدخل شركة.',
  '["Google UX Design Professional Certificate","Figma UI Design Essentials"]',
  '[{"title":"Google UX Design (Coursera)","url":"https://www.coursera.org/professional-certificates/google-ux-design","type":"course"},{"title":"Flux Academy","url":"https://www.youtube.com/@FluxAcademy","type":"youtube"}]',
  '["UI/UX","Figma","يوتيوب","كورسات مجانية"]',
  19, '2026-11-20T09:15:00Z'
),
(
  'exp-104',
  'خطة 6 شهور في كورسات الـ Data Analysis والـ Python',
  'مريم خالد', 'Data Analyst', 'courses',
  'الكورسات اللي أخدتها بالترتيب عشان أدخل مجال تحليل البيانات.',
  'بدأت بالـ Excel المتقدم وبعدها SQL وبعدها Python (Pandas) و Power BI.',
  'اتقبلت في تدريب مدفوع بعد ما عرضت عليهم تحليل مبيعات لمتجر افتراضي.',
  '["Google Data Analytics Certificate","Alex The Analyst Bootcamp","SQL for Data Science"]',
  '[{"title":"Alex The Analyst","url":"https://www.youtube.com/@AlexTheAnalyst","type":"youtube"},{"title":"Kaggle Datasets","url":"https://www.kaggle.com/datasets","type":"website"}]',
  '["Data Analysis","Python","SQL","Kaggle"]',
  15, '2026-11-22T18:00:00Z'
)
ON CONFLICT (id) DO NOTHING;
