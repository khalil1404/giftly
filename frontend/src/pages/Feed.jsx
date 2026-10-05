import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Feed.css';

const CATEGORIES = ['Tous', 'Anniversaire', 'Noël', 'Eid', 'Fête', 'Mariage', 'Autre'];
const OCCASION_MAP = {
  'Tous': 'tous', 'Anniversaire': 'anniversaire', 'Noël': 'noël',
  'Eid': 'eid', 'Fête': 'fête', 'Mariage': 'mariage', 'Autre': 'autre'
};
const EMOJIS = ['🎁','🎂','🌹','🎮','📚','✈️','🍫','💍','🌿','🎨','👗','⌚','🎵','🏆','💻','🧴','🕯️','🍷'];

export default function Feed() {
  const [posts, setPosts]           = useState([]);
  const [category, setCategory]     = useState('Tous');
  const [liked, setLiked]           = useState({});
  const [loading, setLoading]       = useState(true);
  const [showForm, setShowForm]     = useState(false);
  const [expanded, setExpanded]     = useState({}); // which post's comments are open
  const [commentText, setCommentText] = useState({});
  const [form, setForm] = useState({
    giftName: '', description: '', image: '🎁',
    photo: '', link: '', occasion: 'anniversaire'
  });
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => { fetchPosts(); }, [category]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const occ = OCCASION_MAP[category];
      const url = occ !== 'tous'
        ? `http://localhost:5000/api/feed?category=${occ}`
        : 'http://localhost:5000/api/feed';
      const res = await fetch(url);
      const data = await res.json();
      const list = Array.isArray(data) ? data : [];
      setPosts(list);
      if (user) {
        const likedMap = {};
        list.forEach(p => {
          likedMap[p._id] = p.likes?.some(id => id === (user._id || user.id));
        });
        setLiked(likedMap);
      }
    } catch { setPosts([]); }
    finally { setLoading(false); }
  };

  const toggleLike = async (postId) => {
    if (!user) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/feed/${postId}/like`, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token }
    });
    const data = await res.json();
    setLiked(l => ({ ...l, [postId]: data.liked }));
    setPosts(ps => ps.map(p =>
      p._id === postId ? { ...p, likes: Array(data.likes).fill(null) } : p
    ));
  };

  const submitPost = async () => {
    if (!form.giftName.trim() || !form.description.trim()) return;
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/feed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify(form),
      });
      const newPost = await res.json();
      setPosts(ps => [newPost, ...ps]);
      setForm({ giftName: '', description: '', image: '🎁', photo: '', link: '', occasion: 'anniversaire' });
      setShowForm(false);
    } catch (err) { console.error(err); }
    finally { setSubmitting(false); }
  };

  const deletePost = async (postId) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/api/feed/${postId}`, {
      method: 'DELETE', headers: { Authorization: 'Bearer ' + token }
    });
    setPosts(ps => ps.filter(p => p._id !== postId));
  };

  const submitComment = async (postId) => {
    const text = commentText[postId]?.trim();
    if (!text) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/feed/${postId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify({ text }),
    });
    const comments = await res.json();
    setPosts(ps => ps.map(p => p._id === postId ? { ...p, comments } : p));
    setCommentText(c => ({ ...c, [postId]: '' }));
  };

  const deleteComment = async (postId, commentId) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/api/feed/${postId}/comments/${commentId}`, {
      method: 'DELETE', headers: { Authorization: 'Bearer ' + token }
    });
    setPosts(ps => ps.map(p =>
      p._id === postId
        ? { ...p, comments: p.comments.filter(c => c._id !== commentId) }
        : p
    ));
  };

  return (
    <div className="feed-page">
      <div className="feed-header">
        <span className="section-label">✦ COMMUNAUTÉ</span>
        <h1>Inspiration cadeaux</h1>
        <p>Des idées partagées par la communauté Giftly.</p>
        {user && (
          <button className="btn-share-idea" onClick={() => setShowForm(s => !s)}>
            {showForm ? '✕ Annuler' : '+ Partager une idée'}
          </button>
        )}
      </div>

      {/* Share form */}
      {showForm && user && (
        <div className="feed-form-card">
          <h3>Partager une idée cadeau</h3>
          <div className="feed-form-grid">
            <div className="feed-form-field">
              <label>Nom du cadeau *</label>
              <input className="create-list-input" placeholder="ex: Coffret spa maison"
                value={form.giftName} onChange={e => setForm(f => ({ ...f, giftName: e.target.value }))} />
            </div>
            <div className="feed-form-field">
              <label>Occasion</label>
              <select className="create-list-input" value={form.occasion}
                onChange={e => setForm(f => ({ ...f, occasion: e.target.value }))}>
                <option value="anniversaire">Anniversaire</option>
                <option value="noël">Noël</option>
                <option value="eid">Aïd</option>
                <option value="fête">Fête</option>
                <option value="mariage">Mariage</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            <div className="feed-form-field" style={{ gridColumn: '1/-1' }}>
              <label>Description *</label>
              <textarea className="create-list-input" rows={3}
                placeholder="Pourquoi recommandez-vous ce cadeau ?"
                value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>
            <div className="feed-form-field">
              <label>Lien où acheter</label>
              <input className="create-list-input" placeholder="https://amazon.fr/..."
                value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} />
            </div>
            <div className="feed-form-field">
              <label>URL photo (optionnel)</label>
              <input className="create-list-input" placeholder="https://..."
                value={form.photo} onChange={e => setForm(f => ({ ...f, photo: e.target.value }))} />
            </div>
            <div className="feed-form-field" style={{ gridColumn: '1/-1' }}>
              <label>Emoji</label>
              <div className="emoji-picker">
                {EMOJIS.map(e => (
                  <button key={e}
                    className={'emoji-option ' + (form.image === e ? 'selected' : '')}
                    onClick={() => setForm(f => ({ ...f, image: e }))}>
                    {e}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button className="btn-create-list" onClick={submitPost} disabled={submitting}>
            {submitting ? 'Publication...' : 'Publier'}
          </button>
        </div>
      )}

      <div className="feed-filters">
        {CATEGORIES.map(c => (
          <button key={c}
            className={'feed-filter ' + (category === c ? 'active' : '')}
            onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 80 }}>
          <div className="results-spinner" />
        </div>
      ) : posts.length === 0 ? (
        <div className="feed-empty">
          <span>💡</span>
          <p>Aucune idée partagée pour cette catégorie.</p>
          {user && (
            <button className="btn-share-idea" onClick={() => setShowForm(true)}>
              Soyez le premier à partager !
            </button>
          )}
        </div>
      ) : (
        <div className="feed-grid">
          {posts.map(post => {
            const isOwner = user && (post.user?._id === (user._id || user.id) || post.user?.id === (user._id || user.id));
            const commentsOpen = expanded[post._id];
            return (
              <div className="feed-card" key={post._id}>

                {/* Photo or emoji */}
                {post.photo ? (
                  <div className="feed-card-photo">
                    <img src={post.photo} alt={post.giftName}
                      onError={e => { e.target.style.display='none'; }} />
                  </div>
                ) : (
                  <div className="feed-card-emoji">{post.image || '🎁'}</div>
                )}

                <div className="feed-card-body">
                  <span className="feed-card-category">{post.occasion?.toUpperCase()}</span>
                  <h3>{post.giftName || post.gift?.name}</h3>
                  <p>{post.description}</p>
                  {post.link && (
                    <a href={post.link} target="_blank" rel="noreferrer" className="feed-card-link">
                      🛒 Voir où acheter →
                    </a>
                  )}
                  {post.gift?.price && (
                    <span className="feed-card-price">{post.gift.price} TND</span>
                  )}
                </div>

                <div className="feed-card-footer">
                  <span className="feed-card-author">par {post.user?.name || 'Anonyme'}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {isOwner && (
                      <button className="btn-delete-feed" onClick={() => deletePost(post._id)}>✕</button>
                    )}
                    <button
                      className={'feed-comment-btn ' + (commentsOpen ? 'active' : '')}
                      onClick={() => setExpanded(e => ({ ...e, [post._id]: !e[post._id] }))}
                    >
                      💬 {post.comments?.length || 0}
                    </button>
                    <button
                      className={'feed-like ' + (liked[post._id] ? 'liked' : '')}
                      onClick={() => toggleLike(post._id)}
                      title={user ? 'Aimer' : 'Connectez-vous pour aimer'}
                    >
                      {liked[post._id] ? '♥' : '♡'} {post.likes?.length || 0}
                    </button>
                  </div>
                </div>

                {/* Comments section */}
                {commentsOpen && (
                  <div className="feed-comments">
                    {post.comments?.length === 0 && (
                      <p className="feed-no-comments">Aucun commentaire. Soyez le premier !</p>
                    )}
                    {post.comments?.map(c => (
                      <div className="feed-comment" key={c._id}>
                        <span className="feed-comment-avatar">
                          {c.user?.name?.slice(0,1).toUpperCase() || '?'}
                        </span>
                        <div className="feed-comment-body">
                          <span className="feed-comment-author">{c.user?.name || 'Anonyme'}</span>
                          <span className="feed-comment-text">{c.text}</span>
                          <span className="feed-comment-date">
                            {new Date(c.createdAt).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                        {user && c.user?._id === (user._id || user.id) && (
                          <button className="btn-delete-feed"
                            onClick={() => deleteComment(post._id, c._id)}>✕</button>
                        )}
                      </div>
                    ))}
                    {user && (
                      <div className="feed-comment-input">
                        <input
                          placeholder="Ajouter un commentaire..."
                          value={commentText[post._id] || ''}
                          onChange={e => setCommentText(c => ({ ...c, [post._id]: e.target.value }))}
                          onKeyDown={e => e.key === 'Enter' && submitComment(post._id)}
                        />
                        <button onClick={() => submitComment(post._id)}>→</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
