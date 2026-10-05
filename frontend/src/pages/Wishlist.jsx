import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Wishlist() {
  const { token } = useParams();
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) return;
    fetch('http://localhost:5000/api/wishlists/share/' + token)
      .then(r => r.json())
      .then(data => {
        if (data._id) setWishlist(data);
        else setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="results-spinner" />
    </div>
  );

  if (error || !wishlist) return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <span style={{ fontSize: 48 }}>🎁</span>
      <p style={{ color: 'var(--forest)', fontSize: 18 }}>Liste introuvable ou lien expiré.</p>
      <Link to="/" style={{ color: 'var(--gold)' }}>Retour à l'accueil</Link>
    </div>
  );

  return (
    <div style={{ maxWidth: 720, margin: '48px auto', padding: '0 24px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--forest)', marginBottom: 6 }}>
          {wishlist.name}
        </h1>
        {wishlist.recipientId?.name && (
          <p style={{ color: '#888', fontSize: 14 }}>👤 Liste pour {wishlist.recipientId.name}</p>
        )}
        <p style={{ color: '#aaa', fontSize: 13, marginTop: 4 }}>
          {wishlist.gifts?.length || 0} cadeau{wishlist.gifts?.length !== 1 ? 'x' : ''}
        </p>
      </div>

      {wishlist.gifts?.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 48, color: '#aaa' }}>
          <span style={{ fontSize: 40 }}>🎁</span>
          <p style={{ marginTop: 12 }}>Aucun cadeau dans cette liste.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {wishlist.gifts.map(gift => {
            const purchased = wishlist.purchasedGifts?.some(p => p === gift._id || p?._id === gift._id);
            return (
              <div key={gift._id} style={{
                background: '#fff',
                border: '0.5px solid #e0d8c8',
                borderRadius: 12,
                padding: 16,
                opacity: purchased ? 0.6 : 1,
                position: 'relative',
              }}>
                {purchased && (
                  <span style={{
                    position: 'absolute', top: 10, right: 10,
                    background: '#1a3a2a', color: '#c9a84c',
                    fontSize: 10, padding: '2px 8px', borderRadius: 8, fontWeight: 600
                  }}>Acheté</span>
                )}
                <div style={{ fontSize: 32, marginBottom: 8 }}>{gift.image}</div>
                <div style={{ fontWeight: 500, fontSize: 14, color: 'var(--forest)', marginBottom: 4 }}>{gift.name}</div>
                <div style={{ color: 'var(--gold)', fontWeight: 600, fontSize: 13, marginBottom: 10 }}>{gift.price} TND</div>
                <a href={gift.link} target="_blank" rel="noreferrer" style={{
                  display: 'block', textAlign: 'center',
                  background: 'var(--forest)', color: 'var(--gold)',
                  padding: '6px 0', borderRadius: 8, fontSize: 12, fontWeight: 500
                }}>
                  Voir →
                </a>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ marginTop: 40, textAlign: 'center' }}>
        <Link to="/quiz" style={{
          background: 'var(--gold)', color: 'var(--forest)',
          padding: '10px 24px', borderRadius: 24, fontWeight: 600, fontSize: 14
        }}>
          Trouver un cadeau similaire ✨
        </Link>
      </div>
    </div>
  );
}
