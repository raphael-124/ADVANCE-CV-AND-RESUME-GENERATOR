import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CVProvider } from './context/CVContext';
import { ResumeProvider } from './context/ResumeContext';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import EditorPage from './pages/EditorPage';
import ResumeEditorPage from './pages/ResumeEditorPage';
import './index.css';

function App() {
  return (
    <CVProvider>
      <ResumeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cv" element={<LandingPage />} />
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/resume" element={<ResumeEditorPage />} />
          </Routes>
        </Router>
      </ResumeProvider>
    </CVProvider>
  );
}

export default App;
