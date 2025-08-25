import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/teams', label: 'Teams Standings', icon: '🏆' },
    { path: '/players', label: 'Players', icon: '👥' }
  ];

  return (
    <nav className="nav">
      {navItems.map(({ path, label, icon }) => (
        <Link 
          key={path}
          to={path} 
          className={`nav-link ${location.pathname === path ? 'active' : ''}`}
        >
          <span className="nav-icon">{icon}</span>
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
