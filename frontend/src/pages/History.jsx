import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './History.css';

export default function History() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchHistory();
    else setLoading(false);
  }, [user]);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setHistory(Array.isArray(data) ? data : []);
    } catch {
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/history/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(h => h.filter(e => e._id !== id));
    } catch (err) { console.error(err); }
  };

  if (!user) return (
    <div className="history-auth">
      <h2>Connectez-vous pour voir l'historique</h2>
      <Link to="/login" className="btn-primary">Se connecter</Link>
    </div>
  );

  return (
    <div className="history-page">
      <div className="history-header">
        <span className="section-label">✦ HISTORIQUE</span>
        <h1>Mes recherches</h1>
        <p>Retrouvez vos résultats de quiz passés.</p>
      </div>

      {loading ? (
        <div className="history-loading"><div className="results-spinner" /></div>
      ) : history.length === 0 ? (
        <div className="history-empty">
          <span>🎁</span>
          <p>Aucune recherche enregistrée. Faites le quiz pour commencer !</p>
          <Link to="/quiz" className="btn-primary">Faire le quiz →</Link>
        </div>
      ) : (
        <div className="history-grid">
          {history.map((entry) => (
            <div className="history-card" key={entry._id}>
              <div className="history-card-info">
                <div className="history-card-meta">
                  <span className="gift-tag">{entry.personality}</span>
                  {entry.occasion && <span className="gift-tag">{entry.occasion}</span>}
                  {entry.priceRange && <span className="gift-tag">{entry.priceRange}</span>}
                </div>
                <p className="history-card-desc">
                  {entry.gifts?.length || 0} cadeaux suggérés
                </p>
                <p className="history-date">
                  {new Date(entry.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </p>
                <div className="history-gifts-preview">
                  {entry.gifts?.slice(0, 3).map((gift, i) => (
                    <span key={i} className="history-gift-emoji">
                      {gift.image}
                    </span>
                  ))}
                </div>
              </div>
              <div className="history-card-actions">
                <Link
                  to={`/results?personality=${entry.personality}&occasion=${entry.occasion}&budget=${entry.priceRange}`}
                  className="btn-buy"
                >
                  Relancer →
                </Link>
                <button className="btn-remove" onClick={() => deleteEntry(entry._id)}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}