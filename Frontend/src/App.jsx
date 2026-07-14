import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import InvestigationPage from './pages/InvestigationPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/investigate" element={<InvestigationPage />} />
      </Routes>
    </BrowserRouter>
  );
}
