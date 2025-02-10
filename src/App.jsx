import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VideoDetail from './pages/VideoDetail';
import Trending from './pages/Trending';
import News from './pages/News';
import Gaming from './pages/Gaming';
import Music from './pages/Music';
import Sports from './pages/Sports';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:videoId" element={<VideoDetail />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/news" element={<News />} />
        <Route path="/gaming" element={<Gaming />} />
        <Route path="/music" element={<Music />} />
        <Route path="/sports" element={<Sports />} />

      </Routes>
    </Router>
  );
}

export default App;