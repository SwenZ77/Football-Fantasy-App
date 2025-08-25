
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Players from './pages/Players';
import Teams from './pages/Teams';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="container">
            <div className="logo-container">
              <img src="/champions-league-logo.png" alt="UEFA Champions League" className="logo-image" />
              <h1 className="logo">Football Fantasy App</h1>
            </div>
            <Navigation />
          </div>
        </header>
        <main className="main">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/players" element={<Players />} />
              <Route path="/teams" element={<Teams />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
