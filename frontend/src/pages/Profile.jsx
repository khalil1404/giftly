import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const api = (path, opts = {}) => {
  const token = localStorage.getItem('token');
  return fetch('http://localhost:5000' + path, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
      ...(opts.headers || {}),
    },
  });
};

function WishlistDetail({ wishlist, onClose, onPurchaseToggle, onRemoveGift }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box modal-large" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{wishlist.name}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <p className="modal-subtitle">{wishlist.gifts?.length || 0} cadeaux</p>
        {(!wishlist.gifts || wishlist.gifts.length === 0) ? (
          <div className="modal-empty">
            <p>Aucun cadeau dans cette liste.</p>
            <Link to="/quiz" className="btn-relancer" onClick={onClose}>Faire le quiz →</Link>
          </div>
        ) : (
          <div className="wl-detail-grid">
            {wishlist.gifts.map(gift => {
              const purchased = wishlist.purchasedGifts?.some(
                p => p === gift._id || p?._id === gift._id
              );
              return (
                <div key={gift._id} className={'wl-detail-card' + (purchased ? ' purchased' : '')}>
                  <span className="wl-detail-emoji">{gift.image}</span>
                  <div className="wl-detail-info">
                    <span className="wl-detail-name">{gift.name}</span>
                    <span className="wl-detail-price">{gift.price} TND</span>
                  </div>
                  <div className="wl-detail-actions">
                    <button
                      className={'btn-purchase' + (purchased ? ' done' : '')}
                      onClick={() => onPurchaseToggle(wishlist._id, gift._id, purchased)}
                    >
                      {purchased ? '✓ Acheté' : 'Marquer acheté'}
                    </button>
                    <button className="btn-remove-gift" onClick={() => onRemoveGift(wishlist._id, gift._id)}>✕</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function RenameModal({ wishlist, onClose, onSave }) {
  const [name, setName] = useState(wishlist.name);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Renommer la liste</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <input
          className="create-list-input"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSave(name)}
          autoFocus
        />
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button className="btn-create-list" onClick={() => onSave(name)}>Sauvegarder</button>
          <button className="btn-wl-action" onClick={onClose}>Annuler</button>
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  const { user, logout, setUser, loading } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');

  // Wishlists
  const [wishlists, setWishlists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [newListRecipient, setNewListRecipient] = useState('');
  const [viewingWishlist, setViewingWishlist] = useState(null);
  const [renamingWishlist, setRenamingWishlist] = useState(null);
  const [copied, setCopied] = useState({});

  // Proches
  const [proches, setProches] = useState([]);
  const [procheForm, setProcheForm] = useState({
    name: '', relation: '', personality: '', budgetPreference: 'mid',
    occasions: [], notes: ''
  });
  const [occasionInput, setOccasionInput] = useState({ type: '', date: '' });
  const [editingProche, setEditingProche] = useState(null);

  // Rappels
  const [rappels, setRappels] = useState([]);
  const [newRappel, setNewRappel] = useState({ label: '', date: '' });

  // Budget
  const [budgetTotal, setBudgetTotal] = useState(user?.budget || '');
  const [budgetSaving, setBudgetSaving] = useState(false);

  // Mon profil — avatar included
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    confirmPassword: '',
    avatar: user?.avatar || '',
  });
  const [profileMsg, setProfileMsg] = useState('');

  // History
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) { navigate('/login'); return; }
    fetchWishlists();
    fetchProches();
    fetchRappels();
    fetchHistory();
    setBudgetTotal(user.budget || '');
    setProfileForm(f => ({
      ...f,
      name: user.name,
      email: user.email,
      avatar: user.avatar || '',
    }));
  }, [user]);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
      <div className="results-spinner" />
    </div>
  );

  const fetchWishlists = async () => {
    const res = await api('/api/wishlists');
    const data = await res.json();
    setWishlists(Array.isArray(data) ? data : []);
  };

  const fetchProches = async () => {
    const res = await api('/api/profiles');
    const data = await res.json();
    setProches(Array.isArray(data) ? data : []);
  };

  const fetchRappels = async () => {
    const res = await api('/api/rappels');
    const data = await res.json();
    setRappels(Array.isArray(data) ? data : []);
  };

  const fetchHistory = async () => {
    setHistoryLoading(true);
    const res = await api('/api/history');
    const data = await res.json();
    setHistory(Array.isArray(data) ? data : []);
    setHistoryLoading(false);
  };

  // ── Wishlists ──
  const createList = async () => {
    if (!newListName.trim()) return;
    await api('/api/wishlists', {
      method: 'POST',
      body: JSON.stringify({ name: newListName, recipientId: newListRecipient || null })
    });
    setNewListName('');
    setNewListRecipient('');
    fetchWishlists();
  };

  const deleteList = async (id) => {
    await api('/api/wishlists/' + id, { method: 'DELETE' });
    setWishlists(w => w.filter(l => l._id !== id));
  };

  const renameList = async (id, name) => {
    if (!name.trim()) return;
    await api('/api/wishlists/' + id, { method: 'PATCH', body: JSON.stringify({ name }) });
    setRenamingWishlist(null);
    fetchWishlists();
  };

  const shareList = async (wishlist) => {
    let token = wishlist.shareToken;
    if (!wishlist.isPublic || !token) {
      const res = await api('/api/wishlists/' + wishlist._id + '/toggle-public', { method: 'PATCH' });
      const data = await res.json();
      token = data.shareToken;
      fetchWishlists();
    }
    const url = `http://localhost:5173/wishlist/share/${token}`;
    navigator.clipboard.writeText(url);
    setCopied(c => ({ ...c, [wishlist._id]: true }));
    setTimeout(() => setCopied(c => ({ ...c, [wishlist._id]: false })), 2000);
  };

  const togglePurchase = async (wishlistId, giftId, isPurchased) => {
    const method = isPurchased ? 'DELETE' : 'POST';
    await api(`/api/wishlists/${wishlistId}/purchase/${giftId}`, { method });
    const res = await api('/api/wishlists/' + wishlistId);
    const updated = await res.json();
    setWishlists(w => w.map(l => l._id === wishlistId ? updated : l));
    if (viewingWishlist?._id === wishlistId) setViewingWishlist(updated);
  };

  const removeGiftFromList = async (wishlistId, giftId) => {
    await api(`/api/wishlists/${wishlistId}/gifts/${giftId}`, { method: 'DELETE' });
    const res = await api('/api/wishlists/' + wishlistId);
    const updated = await res.json();
    setWishlists(w => w.map(l => l._id === wishlistId ? updated : l));
    if (viewingWishlist?._id === wishlistId) setViewingWishlist(updated);
  };

  // ── Proches ──
  const addOccasion = () => {
    if (!occasionInput.type || !occasionInput.date) return;
    setProcheForm(f => ({ ...f, occasions: [...f.occasions, { ...occasionInput }] }));
    setOccasionInput({ type: '', date: '' });
  };

  const saveProche = async () => {
    if (!procheForm.name.trim()) return;
    if (editingProche) {
      await api('/api/profiles/' + editingProche._id, { method: 'PUT', body: JSON.stringify(procheForm) });
      setEditingProche(null);
    } else {
      await api('/api/profiles', { method: 'POST', body: JSON.stringify(procheForm) });
    }
    setProcheForm({ name: '', relation: '', personality: '', budgetPreference: 'mid', occasions: [], notes: '' });
    fetchProches();
  };

  const deleteProche = async (id) => {
    await api('/api/profiles/' + id, { method: 'DELETE' });
    setProches(p => p.filter(x => x._id !== id));
  };

  const startEditProche = (proche) => {
    setEditingProche(proche);
    setProcheForm({
      name: proche.name, relation: proche.relation || '',
      personality: proche.personality || '',
      budgetPreference: proche.budgetPreference || 'mid',
      occasions: proche.occasions || [], notes: proche.notes || ''
    });
  };

  const launchQuizForProche = (proche) => {
    const personality = proche.personality;
    const budget      = proche.budgetPreference || 'mid';
    const occasion    = proche.occasions?.[0]?.type || '';
    const age         = proche.age    || '';
    const gender      = proche.gender || '';

    if (personality && budget) {
      const params = new URLSearchParams({
        personality, budget,
        recipient: proche.relation || proche.name,
        ...(occasion && { occasion }),
        ...(age      && { age }),
        ...(gender   && { gender }),
      });
      navigate('/results?' + params.toString());
      return;
    }

    const params = new URLSearchParams({
      recipient: proche.relation || proche.name,
      ...(personality && { personality }),
      ...(budget      && { budget }),
      ...(occasion    && { occasion }),
      ...(age         && { age }),
      ...(gender      && { gender }),
    });
    navigate('/quiz?' + params.toString());
  };

  // ── Rappels ──
  const addRappel = async () => {
    if (!newRappel.label.trim() || !newRappel.date) return;
    await api('/api/rappels', { method: 'POST', body: JSON.stringify(newRappel) });
    setNewRappel({ label: '', date: '' });
    fetchRappels();
  };

  const deleteRappel = async (id) => {
    await api('/api/rappels/' + id, { method: 'DELETE' });
    setRappels(r => r.filter(x => x._id !== id));
  };

  // ── Budget ──
  const saveBudget = async () => {
    setBudgetSaving(true);
    await api('/api/auth/update', { method: 'PUT', body: JSON.stringify({ budget: parseFloat(budgetTotal) || 0 }) });
    setBudgetSaving(false);
  };

  const totalSpent = wishlists.reduce((sum, wl) => {
    return sum + (wl.gifts || []).reduce((s, g) => {
      const isPurchased = wl.purchasedGifts?.some(p => p === g._id || p?._id === g._id);
      return s + (isPurchased ? (g.price || 0) : 0);
    }, 0);
  }, 0);

  const budgetPercent = budgetTotal
    ? Math.min(100, Math.round((totalSpent / parseFloat(budgetTotal)) * 100))
    : 0;

  // ── Mon profil ──
  const saveProfile = async () => {
    if (profileForm.password && profileForm.password !== profileForm.confirmPassword) {
      return setProfileMsg('Les mots de passe ne correspondent pas.');
    }
    const body = {
      name: profileForm.name,
      email: profileForm.email,
      avatar: profileForm.avatar,
    };
    if (profileForm.password) body.password = profileForm.password;
    const res = await api('/api/auth/update', { method: 'PUT', body: JSON.stringify(body) });
    const data = await res.json();
    if (res.ok) {
      setProfileMsg('Profil mis à jour !');
      if (setUser) setUser(u => ({ ...u, name: data.name, email: data.email, avatar: data.avatar }));
    } else {
      setProfileMsg(data.message || 'Erreur.');
    }
    setTimeout(() => setProfileMsg(''), 3000);
  };

  // ── Derived stats ──
  const displayName = user?.name || user?.email?.split('@')[0] || 'Utilisateur';
  const initials = displayName.slice(0, 2).toUpperCase();
  const totalGiftsSaved = wishlists.reduce((s, l) => s + (l.gifts?.length || 0), 0);
  const totalPurchased = wishlists.reduce((s, l) => s + (l.purchasedGifts?.length || 0), 0);
  const urgentRappels = rappels.filter(r => r.daysLeft <= 7 && r.daysLeft >= 0);
  const daysLeftColor = (d) => d <= 3 ? '#dc2626' : d <= 7 ? '#d97706' : 'var(--forest)';

  const NAV = [
    { id: 'dashboard', icon: '⊞', label: 'Tableau de bord' },
    { id: 'wishlists', icon: '♡', label: 'Mes wishlists' },
    { id: 'history',   icon: '⊟', label: 'Historique' },
    { id: 'proches',   icon: '👥', label: 'Mes proches' },
  ];
  const TOOLS = [
    { id: 'budget',    icon: '◎', label: 'Budget tracker' },
    { id: 'rappels',   icon: '🔔', label: 'Rappels' },
    { id: 'monprofil', icon: '◎', label: 'Mon profil' },
  ];

  // ── Avatar component ──
  const AvatarDisplay = ({ size = 36, className = 'profile-avatar' }) => (
    user?.avatar
      ? <img src={user.avatar} alt="avatar" className={className}
          style={{ width: size, height: size, objectFit: 'cover', borderRadius: '50%' }}
          onError={e => { e.target.style.display = 'none'; }} />
      : <div className={className}>{initials}</div>
  );

  return (
    <div className="profile-layout">

      {viewingWishlist && (
        <WishlistDetail
          wishlist={viewingWishlist}
          onClose={() => setViewingWishlist(null)}
          onPurchaseToggle={togglePurchase}
          onRemoveGift={removeGiftFromList}
        />
      )}
      {renamingWishlist && (
        <RenameModal
          wishlist={renamingWishlist}
          onClose={() => setRenamingWishlist(null)}
          onSave={(name) => renameList(renamingWishlist._id, name)}
        />
      )}

      <aside className="profile-sidebar">
        <div className="profile-avatar-section">
          {/* Sidebar avatar — shows photo if available, else initials */}
          <AvatarDisplay size={56} className="profile-avatar" />
          <div className="profile-identity">
            <span className="profile-name">{displayName}</span>
            <span className="profile-email">{user?.email || ''}</span>
          </div>
        </div>
        <nav className="profile-nav">
          {NAV.map(item => (
            <button key={item.id}
              className={'profile-nav-item ' + (activeSection === item.id ? 'active' : '')}
              onClick={() => setActiveSection(item.id)}>
              <span className="profile-nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="profile-nav-section-label">OUTILS</div>
        <nav className="profile-nav">
          {TOOLS.map(item => (
            <button key={item.id}
              className={'profile-nav-item ' + (activeSection === item.id ? 'active' : '')}
              onClick={() => setActiveSection(item.id)}>
              <span className="profile-nav-icon">{item.icon}</span>
              {item.label}
              {item.id === 'rappels' && urgentRappels.length > 0 && (
                <span className="nav-badge">{urgentRappels.length}</span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      <main className="profile-main">
        <div className="profile-topbar">
          <Link to="/quiz" className="btn-quiz-top">Lancer le quiz</Link>
          <button className="btn-newlist-top" onClick={() => setActiveSection('wishlists')}>
            + Nouvelle liste
          </button>
        </div>

        {/* ── DASHBOARD ── */}
        {activeSection === 'dashboard' && (
          <div className="profile-section">
            <h1 className="profile-greeting">Bonjour, {displayName} 👋</h1>
            <p className="profile-greeting-sub">Voici un aperçu de vos activités</p>

            <div className="profile-stats">
              <div className="stat-card"><span className="stat-number">{wishlists.length}</span><span className="stat-label">Wishlists</span></div>
              <div className="stat-card"><span className="stat-number">{totalGiftsSaved}</span><span className="stat-label">Cadeaux sauvegardés</span></div>
              <div className="stat-card"><span className="stat-number">{totalPurchased}</span><span className="stat-label">Achetés</span></div>
              <div className="stat-card"><span className="stat-number">{proches.length}</span><span className="stat-label">Proches</span></div>
            </div>

            {urgentRappels.length > 0 && (
              <div className="dashboard-alert">
                <span>🔔</span>
                <div>
                  <strong>{urgentRappels.length} rappel{urgentRappels.length > 1 ? 's' : ''} urgent{urgentRappels.length > 1 ? 's' : ''}</strong>
                  <p>{urgentRappels.map(r => r.label).join(', ')}</p>
                </div>
                <button className="btn-link" onClick={() => setActiveSection('rappels')}>Voir</button>
              </div>
            )}

            {budgetTotal > 0 && (
              <div className="profile-block">
                <div className="profile-block-header">
                  <h2>Budget cadeaux</h2>
                  <button className="btn-link" onClick={() => setActiveSection('budget')}>Modifier</button>
                </div>
                <div className="dashboard-budget">
                  <div className="budget-bar">
                    <div className="budget-bar-fill" style={{ width: budgetPercent + '%', background: budgetPercent > 90 ? '#dc2626' : 'var(--gold)' }} />
                  </div>
                  <div className="budget-bar-label">
                    <span>{totalSpent.toFixed(0)} TND dépensés</span>
                    <span>{budgetPercent}% du budget</span>
                  </div>
                </div>
              </div>
            )}

            <div className="profile-block">
              <div className="profile-block-header">
                <h2>Mes wishlists</h2>
                <button className="btn-link" onClick={() => setActiveSection('wishlists')}>Voir tout</button>
              </div>
              <div className="wishlists-grid">
                {wishlists.slice(0, 2).map(list => (
                  <div className="wishlist-card" key={list._id}>
                    <div className="wishlist-card-header">
                      <h3>{list.name}</h3>
                      <span className={'wishlist-badge ' + (list.isPublic ? 'public' : 'private')}>
                        {list.isPublic ? 'Publique' : 'Privée'}
                      </span>
                    </div>
                    {list.recipientId?.name && <p className="wishlist-proche-tag">👤 {list.recipientId.name}</p>}
                    <p className="wishlist-card-meta">{list.gifts?.length || 0} cadeaux · {list.purchasedGifts?.length || 0} achetés</p>
                    <div className="wishlist-progress">
                      <div className="wishlist-progress-fill" style={{
                        width: list.gifts?.length ? Math.round((list.purchasedGifts?.length || 0) / list.gifts.length * 100) + '%' : '0%'
                      }} />
                    </div>
                    <div className="wishlist-actions">
                      <button className="btn-wl-action" onClick={() => setViewingWishlist(list)}>Voir</button>
                    </div>
                  </div>
                ))}
                <button className="wishlist-create-card" onClick={() => setActiveSection('wishlists')}>
                  <span className="wishlist-create-plus">+</span>
                  <span>Créer une liste</span>
                </button>
              </div>
            </div>

            <div className="profile-block">
              <div className="profile-block-header">
                <h2>Mes proches</h2>
                <button className="btn-link" onClick={() => setActiveSection('proches')}>Gérer</button>
              </div>
              {proches.length === 0 ? (
                <div className="proches-empty">
                  <span>👥</span>
                  <p>Ajoutez vos proches pour ne jamais oublier leurs cadeaux.</p>
                  <button className="btn-add-proche" onClick={() => setActiveSection('proches')}>+ Ajouter un proche</button>
                </div>
              ) : (
                <div className="proches-list">
                  {proches.slice(0, 3).map(p => (
                    <div className="proche-item" key={p._id}>
                      <span className="proche-avatar">{p.name.slice(0, 1).toUpperCase()}</span>
                      <div style={{ flex: 1 }}>
                        <span className="proche-name">{p.name}</span>
                        {p.relation && <span className="proche-occasion">{p.relation}</span>}
                      </div>
                      <button className="btn-quiz-proche" onClick={() => launchQuizForProche(p)}>🎁 Quiz</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── WISHLISTS ── */}
        {activeSection === 'wishlists' && (
          <div className="profile-section">
            <h1 className="profile-greeting">Mes Wishlists</h1>
            <p className="profile-greeting-sub">Gérez et partagez vos listes de cadeaux</p>
            <div className="create-list-row">
              <input className="create-list-input" placeholder="Nom de la nouvelle liste..."
                value={newListName} onChange={e => setNewListName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && createList()} />
              <select className="create-list-input" value={newListRecipient}
                onChange={e => setNewListRecipient(e.target.value)}>
                <option value="">Lier à un proche (optionnel)</option>
                {proches.map(p => (
                  <option key={p._id} value={p._id}>{p.name} — {p.relation || ''}</option>
                ))}
              </select>
              <button className="btn-create-list" onClick={createList}>Créer</button>
            </div>
            {wishlists.length === 0 ? (
              <div className="proches-empty"><span>📋</span><p>Aucune liste créée.</p></div>
            ) : (
              <div className="wishlists-grid">
                {wishlists.map(list => {
                  const pct = list.gifts?.length ? Math.round((list.purchasedGifts?.length || 0) / list.gifts.length * 100) : 0;
                  return (
                    <div className="wishlist-card" key={list._id}>
                      <div className="wishlist-card-header">
                        <h3>{list.name}</h3>
                        <span className={'wishlist-badge ' + (list.isPublic ? 'public' : 'private')}>
                          {list.isPublic ? 'Publique' : 'Privée'}
                        </span>
                      </div>
                      {list.recipientId?.name && <p className="wishlist-proche-tag">👤 {list.recipientId.name}</p>}
                      <p className="wishlist-card-meta">{list.gifts?.length || 0} cadeaux · {list.purchasedGifts?.length || 0} achetés</p>
                      <div className="wishlist-progress">
                        <div className="wishlist-progress-fill" style={{ width: pct + '%' }} />
                      </div>
                      <p className="wishlist-progress-label">{pct}% acheté</p>
                      <div className="wishlist-actions">
                        <button className="btn-wl-action" onClick={() => shareList(list)}>{copied[list._id] ? '✓ Copié !' : 'Partager'}</button>
                        <button className="btn-wl-action" onClick={() => setRenamingWishlist(list)}>Modifier</button>
                        <button className="btn-wl-action" onClick={() => setViewingWishlist(list)}>Voir</button>
                        <button className="btn-wl-delete" onClick={() => deleteList(list._id)}>Supprimer</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── HISTORIQUE ── */}
        {activeSection === 'history' && (
          <div className="profile-section">
            <h1 className="profile-greeting">Historique</h1>
            <p className="profile-greeting-sub">Vos recherches passées</p>
            {historyLoading ? <div className="results-spinner" /> : history.length === 0 ? (
              <div className="proches-empty">
                <span>📜</span><p>Votre historique apparaîtra ici après vos recherches.</p>
                <Link to="/quiz" className="btn-add-proche">Faire le quiz</Link>
              </div>
            ) : (
              <div className="history-grid">
                {history.map(entry => {
                  const budgetLabel = { low: 'Moins de 50 TND', mid: '50–150 TND', high: '150–400 TND', luxury: '400+ TND' }[entry.priceRange] || entry.priceRange;
                  return (
                    <div className="history-card" key={entry._id}>
                      <div className="history-card-info">
                        <div className="history-card-tags">
                          {entry.personality && <span className="history-card-tag">{entry.personality}</span>}
                          {entry.occasion    && <span className="history-card-tag">{entry.occasion}</span>}
                          {entry.priceRange  && <span className="history-card-tag">{budgetLabel}</span>}
                        </div>
                        <p className="history-card-title">{entry.gifts?.length || 0} cadeaux suggérés</p>
                        <p className="history-card-date">{new Date(entry.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        <div className="history-card-emojis">{entry.gifts?.slice(0, 5).map((g, i) => <span key={i}>{g.image}</span>)}</div>
                      </div>
                      <div className="history-card-actions">
                        <Link to={`/results?personality=${entry.personality}&occasion=${entry.occasion}&budget=${entry.priceRange}`} className="btn-relancer">Relancer →</Link>
                        <button className="btn-delete-history" onClick={async () => {
                          await api('/api/history/' + entry._id, { method: 'DELETE' });
                          setHistory(h => h.filter(e => e._id !== entry._id));
                        }}>Supprimer</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── MES PROCHES ── */}
        {activeSection === 'proches' && (
          <div className="profile-section">
            <h1 className="profile-greeting">Mes proches</h1>
            <p className="profile-greeting-sub">Gérez vos proches et lancez des quiz personnalisés</p>
            <div className="proches-form-card">
              <h3>{editingProche ? 'Modifier' : 'Ajouter un proche'}</h3>
              <div className="proches-form">
                <input className="create-list-input" placeholder="Nom *" value={procheForm.name} onChange={e => setProcheForm(f => ({ ...f, name: e.target.value }))} />
                <input className="create-list-input" placeholder="Relation (ex: ami, maman)" value={procheForm.relation} onChange={e => setProcheForm(f => ({ ...f, relation: e.target.value }))} />
                <select className="create-list-input" value={procheForm.personality} onChange={e => setProcheForm(f => ({ ...f, personality: e.target.value }))}>
                  <option value="">Personnalité (optionnel)</option>
                  <option value="aventurier">Aventurier</option><option value="créatif">Créatif</option>
                  <option value="cosy">Cosy</option><option value="intellectuel">Intellectuel</option>
                  <option value="gamer">Gamer</option><option value="wellness">Wellness</option>
                  <option value="foodie">Foodie</option><option value="fashionista">Fashionista</option>
                </select>
                <select className="create-list-input" value={procheForm.budgetPreference} onChange={e => setProcheForm(f => ({ ...f, budgetPreference: e.target.value }))}>
                  <option value="low">Budget: Moins de 50 TND</option><option value="mid">Budget: 50–150 TND</option>
                  <option value="high">Budget: 150–400 TND</option><option value="luxury">Budget: 400+ TND</option>
                </select>
                <textarea className="create-list-input" placeholder="Notes (optionnel)" rows={2} value={procheForm.notes} onChange={e => setProcheForm(f => ({ ...f, notes: e.target.value }))} />
              </div>
              <div className="occasions-section">
                <p className="occasions-label">Occasions</p>
                <div className="occasions-row">
                  <select className="create-list-input" value={occasionInput.type} onChange={e => setOccasionInput(o => ({ ...o, type: e.target.value }))}>
                    <option value="">Type d'occasion</option>
                    <option value="anniversaire">Anniversaire</option><option value="noël">Noël</option>
                    <option value="eid">Aïd</option><option value="fête">Fête</option><option value="mariage">Mariage</option>
                  </select>
                  <input className="create-list-input" type="date" value={occasionInput.date} onChange={e => setOccasionInput(o => ({ ...o, date: e.target.value }))} />
                  <button className="btn-wl-action" onClick={addOccasion}>+ Ajouter</button>
                </div>
                {procheForm.occasions.length > 0 && (
                  <div className="occasions-list">
                    {procheForm.occasions.map((o, i) => (
                      <span key={i} className="occasion-chip">
                        {o.type} · {new Date(o.date).toLocaleDateString('fr-FR')}
                        <button onClick={() => setProcheForm(f => ({ ...f, occasions: f.occasions.filter((_, j) => j !== i) }))}>✕</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <button className="btn-create-list" onClick={saveProche}>{editingProche ? 'Mettre à jour' : '+ Ajouter'}</button>
                {editingProche && <button className="btn-wl-action" onClick={() => { setEditingProche(null); setProcheForm({ name: '', relation: '', personality: '', budgetPreference: 'mid', occasions: [], notes: '' }); }}>Annuler</button>}
              </div>
            </div>
            {proches.length === 0 ? (
              <div className="proches-empty" style={{ marginTop: 32 }}><span>👥</span><p>Aucun proche ajouté.</p></div>
            ) : (
              <div className="proches-cards" style={{ marginTop: 24 }}>
                {proches.map(p => (
                  <div className="proche-card" key={p._id}>
                    <span className="proche-avatar-big">{p.name.slice(0, 1).toUpperCase()}</span>
                    <div className="proche-info">
                      <span className="proche-name">{p.name}</span>
                      {p.relation    && <span className="proche-occasion">{p.relation}</span>}
                      {p.personality && <span className="proche-occasion">· {p.personality}</span>}
                      {p.occasions?.map((o, i) => <span key={i} className="proche-date">{o.type} — {new Date(o.date).toLocaleDateString('fr-FR')}</span>)}
                    </div>
                    <div className="proche-card-actions">
                      <button className="btn-quiz-proche" onClick={() => launchQuizForProche(p)}>🎁 Quiz</button>
                      <button className="btn-wl-action" onClick={() => startEditProche(p)}>Modifier</button>
                      <button className="btn-remove" onClick={() => deleteProche(p._id)}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── BUDGET TRACKER ── */}
        {activeSection === 'budget' && (
          <div className="profile-section">
            <h1 className="profile-greeting">Budget tracker</h1>
            <p className="profile-greeting-sub">Suivi automatique basé sur vos cadeaux achetés</p>
            <div className="budget-card">
              <div className="profil-field">
                <label>Budget total (TND)</label>
                <input className="profil-input" type="number" placeholder="ex: 500" value={budgetTotal} onChange={e => setBudgetTotal(e.target.value)} />
              </div>
              <button className="btn-create-list" onClick={saveBudget} disabled={budgetSaving}>{budgetSaving ? 'Sauvegarde...' : 'Sauvegarder'}</button>
              {budgetTotal > 0 && (
                <div style={{ marginTop: 24 }}>
                  <div className="budget-bar-label">
                    <span><strong>{totalSpent.toFixed(0)} TND</strong> dépensés sur {budgetTotal} TND</span>
                    <span>{budgetPercent}%</span>
                  </div>
                  <div className="budget-bar"><div className="budget-bar-fill" style={{ width: budgetPercent + '%', background: budgetPercent > 90 ? '#dc2626' : 'var(--gold)' }} /></div>
                  <p className="budget-remaining">Reste : <strong>{(parseFloat(budgetTotal) - totalSpent).toFixed(0)} TND</strong></p>
                </div>
              )}
              <div style={{ marginTop: 32 }}>
                <h3 style={{ marginBottom: 12, fontFamily: 'var(--font-display)', fontWeight: 400 }}>Détail par wishlist</h3>
                {wishlists.map(wl => {
                  const spent = (wl.gifts || []).reduce((s, g) => {
                    const bought = wl.purchasedGifts?.some(p => p === g._id || p?._id === g._id);
                    return s + (bought ? (g.price || 0) : 0);
                  }, 0);
                  return (
                    <div key={wl._id} className="budget-wl-row">
                      <span>{wl.name}{wl.recipientId?.name ? ` (${wl.recipientId.name})` : ''}</span>
                      <span className="budget-wl-amount">{spent.toFixed(0)} TND achetés</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── RAPPELS ── */}
        {activeSection === 'rappels' && (
          <div className="profile-section">
            <h1 className="profile-greeting">Rappels</h1>
            <p className="profile-greeting-sub">Ne ratez plus aucune occasion</p>
            <div className="proches-form-card">
              <div className="proches-form">
                <input className="create-list-input" placeholder="Ex: Anniversaire de Sami" value={newRappel.label} onChange={e => setNewRappel(r => ({ ...r, label: e.target.value }))} />
                <input className="create-list-input" type="date" value={newRappel.date} onChange={e => setNewRappel(r => ({ ...r, date: e.target.value }))} />
              </div>
              <button className="btn-create-list" style={{ marginTop: 12 }} onClick={addRappel}>+ Ajouter un rappel</button>
            </div>
            {rappels.length === 0 ? (
              <div className="proches-empty" style={{ marginTop: 32 }}><span>🔔</span><p>Aucun rappel configuré.</p></div>
            ) : (
              <div className="proches-cards" style={{ marginTop: 24 }}>
                {rappels.map(r => (
                  <div className={'proche-card' + (r.daysLeft <= 7 && r.daysLeft >= 0 ? ' urgent' : '')} key={r._id}>
                    <span className="proche-avatar-big">🔔</span>
                    <div className="proche-info">
                      <span className="proche-name">{r.label}</span>
                      <span className="proche-date">{new Date(r.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span className="rappel-countdown" style={{ color: daysLeftColor(r.daysLeft) }}>
                        {r.daysLeft < 0 ? 'Passé' : r.daysLeft === 0 ? "Aujourd'hui !" : `J-${r.daysLeft}`}
                      </span>
                      <button className="btn-remove" onClick={() => deleteRappel(r._id)}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── MON PROFIL ── */}
        {activeSection === 'monprofil' && (
          <div className="profile-section">
            <h1 className="profile-greeting">Mon profil</h1>
            <div className="profil-form">
              {/* Avatar preview */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                {profileForm.avatar ? (
                  <img src={profileForm.avatar} alt="avatar"
                    style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--gold)' }}
                    onError={e => { e.target.style.display = 'none'; }} />
                ) : (
                  <div className="profil-avatar-big">{initials}</div>
                )}
              </div>

              <div className="profil-field">
                <label>Nom</label>
                <input className="profil-input" value={profileForm.name} onChange={e => setProfileForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="profil-field">
                <label>Email</label>
                <input className="profil-input" type="email" value={profileForm.email} onChange={e => setProfileForm(f => ({ ...f, email: e.target.value }))} />
              </div>

              {/* Avatar URL field */}
              <div className="profil-field">
                <label>Photo de profil (URL)</label>
                <input className="profil-input" placeholder="https://exemple.com/ma-photo.jpg"
                  value={profileForm.avatar}
                  onChange={e => setProfileForm(f => ({ ...f, avatar: e.target.value }))} />
              </div>

              <div className="profil-field">
                <label>Nouveau mot de passe</label>
                <input className="profil-input" type="password" placeholder="Laisser vide pour ne pas changer"
                  value={profileForm.password} onChange={e => setProfileForm(f => ({ ...f, password: e.target.value }))} />
              </div>
              <div className="profil-field">
                <label>Confirmer le mot de passe</label>
                <input className="profil-input" type="password"
                  value={profileForm.confirmPassword} onChange={e => setProfileForm(f => ({ ...f, confirmPassword: e.target.value }))} />
              </div>

              {profileMsg && (
                <p className={'profil-msg ' + (profileMsg.includes('!') ? 'success' : 'error')}>{profileMsg}</p>
              )}
              <button className="btn-save-profil" onClick={saveProfile}>Sauvegarder</button>
              <button className="btn-logout-profil" onClick={() => { logout(); navigate('/'); }}>Se déconnecter</button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}