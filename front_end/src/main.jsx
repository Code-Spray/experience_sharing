import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './main.css';
import { ExperienceDetail } from './pages/ExperienceDetail/ExperienceDetail.jsx';
import { Home } from './pages/Home/Home.jsx';
import { NotFound } from './pages/NotFound/404.jsx';
import { Profile } from './pages/Profile/Profile.jsx';
import { ShareExperience } from './pages/ShareExperience/ShareExperience.jsx';
import { Footer } from './shared/Footer/Footer.jsx';
import { Header } from './shared/Header/Header.jsx';

function AppLayout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/share" element={<ShareExperience />} />
          <Route path="/experiences/:id" element={<ExperienceDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  </StrictMode>,
);
