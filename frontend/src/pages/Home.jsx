import { Link } from 'react-router-dom';
import './Home.css';

const TICKER_ROW1 = [
  { img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop', name: 'Casque Sony WH-1000', price: '150 TND', tag: 'gamer' },
  { img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop', name: 'Instax Mini 12', price: '130 TND', tag: 'créatif' },
  { img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=300&fit=crop', name: 'Kit spa & wellness', price: '85 TND', tag: 'wellness' },
  { img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=400&h=300&fit=crop', name: 'Bougie de luxe', price: '65 TND', tag: 'cosy' },
  { img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop', name: 'Sac à main', price: '140 TND', tag: 'fashionista' },
  { img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop', name: 'Box livres', price: '75 TND', tag: 'intellectuel' },
  { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', name: 'Montre classique', price: '320 TND', tag: 'fashionista' },
  { img: 'https://images.unsplash.com/photo-1493219686142-5a8641badc78?w=400&h=300&fit=crop', name: 'Tablette graphique', price: '150 TND', tag: 'créatif' },
];

const TICKER_ROW2 = [
  { img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop', name: 'Sneakers tendance', price: '180 TND', tag: 'fashionista' },
  { img: 'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=400&h=300&fit=crop', name: 'Plante d\'intérieur', price: '35 TND', tag: 'cosy' },
  { img: 'https://images.unsplash.com/photo-1604537466608-109fa2f16c3b?w=400&h=300&fit=crop', name: 'Manette Xbox Pro', price: '200 TND', tag: 'gamer' },
  { img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop', name: 'Roman best-seller', price: '28 TND', tag: 'intellectuel' },
  { img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=300&fit=crop', name: 'Diffuseur arômes', price: '55 TND', tag: 'wellness' },
  { img: 'https://images.unsplash.com/photo-1586495777744-4e6232bf4e06?w=400&h=300&fit=crop', name: 'Palette maquillage', price: '95 TND', tag: 'fashionista' },
  { img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop', name: 'Appareil photo', price: '450 TND', tag: 'créatif' },
  { img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop', name: 'Kit pâtisserie', price: '70 TND', tag: 'foodie' },
];

function TickerRow({ items, reverse = false }) {
  const doubled = [...items, ...items];
  return (
    <div className="ticker-track-wrap">
      <div className={`ticker-track ${reverse ? 'ticker-reverse' : ''}`}>
        {doubled.map((item, i) => (
          <div className="ticker-card" key={i}>
            <div className="ticker-card-img-wrap">
              <img src={item.img} alt={item.name} className="ticker-card-img" loading="lazy" />
              <span className="ticker-card-tag">{item.tag}</span>
            </div>
            <div className="ticker-card-info">
              <span className="ticker-card-name">{item.name}</span>
              <span className="ticker-card-price">{item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <span className="hero-badge">✦ Trouvez le cadeau parfait en 2 minutes</span>
        <h1 className="hero-title">
          L'art d'offrir<br />
          <em>parfaitement.</em>
        </h1>
        <p className="hero-subtitle">
          Giftly vous aide à trouver le cadeau idéal grâce à un quiz personnalisé,
          un assistant intelligent et une communauté d'inspiration.
        </p>
        <div className="hero-actions">
          <Link to="/quiz" className="btn-primary">Commencer le quiz</Link>
          <Link to="/feed" className="btn-secondary">Voir l'inspiration</Link>
        </div>
      </section>

      {/* PHOTO TICKER */}
      <section className="ticker-section">
        <div className="ticker-label">
          <span>✦ 144 cadeaux curatés</span>
        </div>
        <div className="ticker-rows">
          <TickerRow items={TICKER_ROW1} reverse={false} />
          <TickerRow items={TICKER_ROW2} reverse={true} />
        </div>
        <div className="ticker-fade-left" />
        <div className="ticker-fade-right" />
      </section>

      {/* QUIZ CTA */}
      <section className="home-section quiz-cta">
        <div className="quiz-cta-text">
          <span className="section-label">✦ COMMENCER</span>
          <h2>Trouvez le cadeau parfait</h2>
          <p>Répondez à 4 questions simples sur votre proche et nous vous proposons des idées sur mesure avec des liens directs.</p>
          <div className="quiz-tags">
            <span>Destinataire</span>
            <span>Personnalité</span>
            <span>Occasion</span>
            <span>Budget</span>
          </div>
        </div>
        <Link to="/quiz" className="btn-primary">Lancer le quiz →</Link>
      </section>

      {/* HOW IT WORKS */}
      <section className="home-section how-it-works">
        <span className="section-label">✦ COMMENT ÇA MARCHE</span>
        <h2>Simple comme bonjour</h2>
        <div className="steps">
          {[
            { n:'01', icon:'🎯', title:'Faites le quiz', desc:"Répondez à 4 questions sur la personne et l'occasion." },
            { n:'02', icon:'🎁', title:'Découvrez des idées', desc:"Recevez des suggestions personnalisées avec des liens d'achat." },
            { n:'03', icon:'📋', title:'Sauvegardez', desc:'Créez des wishlists et partagez-les avec vos proches.' },
            { n:'04', icon:'💬', title:'Chattez', desc:'Utilisez notre assistant pour affiner vos recherches.' },
          ].map(s => (
            <div className="step" key={s.n}>
              <span className="step-number">{s.n}</span>
              <span className="step-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INSPIRATION TEASER */}
      <section className="home-section inspiration-teaser">
        <span className="section-label">✦ INSPIRATION</span>
        <h2>Ce que la communauté offre</h2>
        <p className="teaser-sub">Des idées cadeaux partagées par des milliers d'utilisateurs.</p>
        <Link to="/feed" className="btn-outline">Explorer l'inspiration →</Link>
      </section>

    </div>
  );
}
