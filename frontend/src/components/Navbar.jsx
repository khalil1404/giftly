import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useRef, useState } from 'react';
import { Bell, X } from 'lucide-react';
import axios from 'axios';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const displayName = user?.name || user?.email?.split('@')[0] || 'U';
  const initials = displayName.slice(0, 2).toUpperCase();

  const [notifs, setNotifs] = useState([]);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    fetchNotifs();
    const interval = setInterval(fetchNotifs, 60000);
    return () => clearInterval(interval);
  }, [user]);

  const fetchNotifs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/notifications', {
        headers: { Authorization: 'Bearer ' + token }
      });
      setNotifs(res.data.notifications || []);
      setUnread(res.data.unreadCount || 0);
    } catch {}
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const markAllRead = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/notifications/read-all', {}, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setNotifs(prev => prev.map(n => ({ ...n, read: true })));
      setUnread(0);
    } catch {}
  };

  const deleteNotif = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/notifications/${id}`, {
        headers: { Authorization: 'Bearer ' + token }
      });
      setNotifs(prev => prev.filter(n => n._id !== id));
      setUnread(prev => Math.max(0, prev - 1));
    } catch {}
  };

  const timeAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 60000);
    if (diff < 1) return "à l'instant";
    if (diff < 60) return `il y a ${diff} min`;
    if (diff < 1440) return `il y a ${Math.floor(diff / 60)}h`;
    return `il y a ${Math.floor(diff / 1440)}j`;
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Giftly</Link>
      <div className="navbar-links">
        <Link to="/" className={isActive('/') ? 'active' : ''}>Accueil</Link>
        <Link to="/quiz" className={isActive('/quiz') ? 'active' : ''}>Quiz</Link>
        <Link to="/feed" className={isActive('/feed') ? 'active' : ''}>Inspiration</Link>
      </div>
      <div className="navbar-auth">
        {user ? (
          <>
            <div className="navbar-notif-wrapper" ref={panelRef}>
              <button
                className="navbar-bell"
                onClick={() => { setOpen(o => !o); if (!open && unread > 0) markAllRead(); }}
                title="Notifications"
              >
                <Bell size={18} strokeWidth={1.8} />
                {unread > 0 && <span className="navbar-badge">{unread > 9 ? '9+' : unread}</span>}
              </button>

              {open && (
                <div className="notif-panel">
                  <div className="notif-panel-header">
                    <span>Notifications</span>
                    {notifs.length > 0 && (
                      <button className="notif-clear-all" onClick={markAllRead}>
                        Tout lire
                      </button>
                    )}
                  </div>

                  {notifs.length === 0 ? (
                    <div className="notif-empty">Aucune notification</div>
                  ) : (
                    <div className="notif-list">
                      {notifs.map(n => (
                        <div key={n._id} className={'notif-item' + (n.read ? '' : ' unread')}>
                          <div className="notif-text">{n.message}</div>
                          <div className="notif-meta">
                            <span className="notif-time">{timeAgo(n.createdAt)}</span>
                            <button className="notif-delete" onClick={() => deleteNotif(n._id)}>
                              <X size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link to="/profile" className="navbar-avatar" title={'Bonjour, ' + displayName}>
              {initials}
            </Link>
            <button onClick={logout} className="btn-logout">Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-login">Connexion</Link>
            <Link to="/register" className="btn-register">S'inscrire</Link>
          </>
        )}
      </div>
    </nav>
  );
}
