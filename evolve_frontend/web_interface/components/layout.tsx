import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

interface LayoutProps {
  user: any;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <h1 className="logo">
              <Link to="/dashboard">Evolve</Link>
            </h1>
            <nav className="nav">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/agents/create" className="nav-link">Create Agent</Link>
            </nav>
            <div className="user-menu">
              <span className="user-name">{user?.username}</span>
              <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
            </div>
          </div>
        </div>
      </header>
      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Evolve - Free Alternative to Manus AI</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
