import { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Results.css';
import axios from 'axios';

const BUDGET_MAP = {
  'low': 'low', 'mid': 'mid', 'high': 'high', 'luxury': 'luxury',
  '0-20': 'low', '20-50': 'low', '50-100': 'mid', '100+': 'high',
};

export default function Results() {
  const [params] = useSearchParams();
  const [gifts, setGifts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState({});
  const [filter, setFilter] = useState('Tout voir');
  const [wishlists, setWishlists] = useState([]);
  const [modal, setModal] = useState(null);
  const { user } = useAuth();
  const fetchedRef = useRef(false);

  const data = {
    recipient: params.get('recipient'),
    personality: params.get('personality'),
    occasion: params.get('occasion'),
    budget: params.get('budget'),
  };

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchGifts = async () => {
      try {
        const mappedBudget = BUDGET_MAP[data.budget] || 'mid';
        const res = await axios.get('http://localhost:5000/api/gifts/quiz', {
          params: {
            personality: data.personality,
            occasion: data.occasion,
            priceRange: mappedBudget,
            age: params.get('age'),
            gender: params.get('gender'),
          }
        });
        const list = Array.isArray(res.data) ? res.data : [];
        setGifts(list);
        setFiltered(list);
      } catch {
        setGifts([]);
        setFiltered([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGifts();
  }, []);

const openModal = async (gift) => {
  setModal(gift);
  try {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:5000/api/wishlists', {
      headers: { Authorization: 'Bearer ' + token }
    });
    const data = await res.json();
    setWishlists(Array.isArray(data) ? data : []);
  } catch {
    setWishlists([]);
  }
};

  const saveToWishlist = async (wishlistId) => {
    if (!modal) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/wishlists/${wishlistId}/gifts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify({ giftId: modal._id }),
      });
      setSaved(s => ({ ...s, [modal._id]: true }));
      setModal(null);
    } catch (err) { console.error(err); }
  };

  const applyFilter = (f) => {
    setFilter(f);
    if (f === 'Tout voir') return setFiltered(gifts);
    if (f === 'Le moins cher') return setFiltered([...gifts].sort((a, b) => a.price - b.price));
    if (f === 'Le mieux noté') return setFiltered([...gifts].sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0)));
  };

  if (loading) return (
    <div className="results-loading">
      <div className="results-spinner" />
      <p>Recherche des meilleurs cadeaux...</p>
    </div>
  );

  return (
    <div className="results-page">

{modal && (
  <div className="modal-overlay" onClick={() => setModal(null)}>
    <div className="modal-box" onClick={e => e.stopPropagation()}>
      <div className="modal-header">
        <h3>Ajouter à une liste</h3>
        <button className="modal-close" onClick={() => setModal(null)}>✕</button>
      </div>
      <p className="modal-subtitle">
        <strong>{modal.name}</strong> · {modal.price} TND
      </p>
      {wishlists.length === 0 ? (
        <div className="modal-empty">
          <p>Aucune liste trouvée.</p>
          <Link to="/profile" className="btn-relancer" onClick={() => setModal(null)}>
            Créer une liste →
          </Link>
        </div>
      ) : (
        <div className="modal-wishlists">
          {wishlists.map(wl => (
            <button
              key={wl._id}
              className="modal-wishlist-item"
              onClick={() => saveToWishlist(wl._id)}
            >
              <div className="modal-wl-left">
                <span className="modal-wl-name">{wl.name}</span>
                {/* Show linked proche if available */}
                {wl.recipientId?.name && (
                  <span className="modal-wl-proche">👤 {wl.recipientId.name}</span>
                )}
              </div>
              <span className="modal-wl-count">{wl.gifts?.length || 0} cadeaux</span>
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
)}

      <div className="results-header">
        <div className="results-breadcrumb">
          <span>✦ Profil {data.personality}</span>
          {data.occasion && <span>· {data.occasion}</span>}
          {data.budget && <span>· {data.budget} TND</span>}
        </div>
        <h1>{filtered.length} idées cadeaux sélectionnées pour vous</h1>
        <p>Recommandations personnalisées selon la personnalité, l'occasion et le budget</p>
      </div>

      <div className="results-filters">
        {['Tout voir', 'Le moins cher', 'Le mieux noté'].map(f => (
          <button
            key={f}
            className={'results-filter ' + (filter === f ? 'active' : '')}
            onClick={() => applyFilter(f)}
          >{f}</button>
        ))}
      </div>

      {user && (
        <div className="results-saved-banner">
          <span><strong>Résultats sauvegardés</strong> dans votre historique — retrouvez-les à tout moment</span>
          <Link to="/quiz">Modifier les critères</Link>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="results-empty">
          <span>🎁</span>
          <p>Aucune suggestion trouvée.</p>
          <Link to="/quiz" className="btn-outline">Relancer le quiz</Link>
        </div>
      ) : (
        <div className="results-grid">
          {filtered.map((gift) => (
            <div className="gift-card" key={gift._id}>
              <div className="gift-card-top">
                <div className="gift-card-emoji">{gift.image}</div>
              </div>
              <div className="gift-card-body">
                <div className="gift-card-header">
                  <h3>{gift.name}</h3>
                  <span className="gift-price">{gift.price} TND</span>
                </div>
                {gift.averageRating > 0 && (
                  <div className="gift-rating">
                    {'★'.repeat(Math.round(gift.averageRating))}{'☆'.repeat(5 - Math.round(gift.averageRating))}
                    <span>{gift.averageRating.toFixed(1)}</span>
                  </div>
                )}
                <p>{gift.description}</p>
                {gift.tags && (
                  <div className="gift-tags">
                    {gift.tags.map(t => <span key={t} className="gift-tag">{t}</span>)}
                  </div>
                )}
              </div>
              <div className="gift-card-actions">
                <a href={gift.link} target="_blank" rel="noreferrer">Voir sur Amazon</a>
                {user && (
                  <button
                    className={'btn-liste ' + (saved[gift._id] ? 'saved' : '')}
                    onClick={() => !saved[gift._id] && openModal(gift)}
                    disabled={saved[gift._id]}
                  >
                    {saved[gift._id] ? '✓ Sauvegardé' : '+ Liste'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="results-footer">
        <Link to="/quiz" className="btn-outline">Nouvelle recherche</Link>
      </div>
    </div>
  );
}
