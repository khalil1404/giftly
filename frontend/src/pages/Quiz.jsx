import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Quiz.css';

const STEPS = [
  {
    id: 'recipient',
    label: 'Destinataire',
    question: 'Pour qui est ce cadeau ?',
    subtitle: 'Choisissez le type de relation',
    options: [
      { value: 'ami',        label: 'Un ami',        icon: '👫', desc: 'Ami proche, meilleur ami' },
      { value: 'parent',     label: 'Un parent',      icon: '👨‍👩‍👦', desc: 'Père, mère, grands-parents' },
      { value: 'partenaire', label: 'Mon partenaire', icon: '💑', desc: 'Conjoint, fiancé(e)' },
      { value: 'collègue',   label: 'Un collègue',    icon: '💼', desc: 'Collègue, manager' },
      { value: 'enfant',     label: 'Un enfant',      icon: '👶', desc: 'Fils, fille, neveu' },
      { value: 'moi-même',   label: 'Pour moi-même',  icon: '🤗', desc: 'Se faire plaisir' },
    ]
  },
  {
    id: 'personality',
    label: 'Personnalité',
    question: 'Quelle est sa personnalité ?',
    subtitle: 'Choisissez le profil qui correspond le mieux à votre proche',
    options: [
      { value: 'aventurier',   label: 'Aventurier',   icon: '🏕️', desc: 'Sports, plein air, sensations' },
      { value: 'créatif',      label: 'Créatif',      icon: '🎨', desc: 'Art, design, DIY, expression' },
      { value: 'cosy',         label: 'Cosy',         icon: '🏠', desc: 'Confort, maison, douceur' },
      { value: 'intellectuel', label: 'Intellectuel', icon: '📚', desc: 'Livres, culture, idées' },
      { value: 'gamer',        label: 'Gamer',        icon: '🎮', desc: 'Jeux vidéo, tech, geek' },
      { value: 'wellness',     label: 'Wellness',     icon: '🌿', desc: 'Santé, détente, bien-être' },
      { value: 'foodie',       label: 'Foodie',       icon: '🍽️', desc: 'Gastronomie, cuisine, goût' },
      { value: 'fashionista',  label: 'Fashionista',  icon: '👗', desc: 'Mode, style, tendances' },
    ]
  },
  {
    id: 'occasion',
    label: 'Occasion',
    question: "C'est pour quelle occasion ?",
    subtitle: "Précisez le moment pour affiner nos suggestions",
    options: [
      { value: 'anniversaire', label: 'Anniversaire', icon: '🎂', desc: "Fête d'anniversaire" },
      { value: 'noël',         label: 'Noël',         icon: '🎄', desc: 'Cadeau de Noël' },
      { value: 'eid',          label: 'Aïd',          icon: '🌙', desc: 'Aïd el-Fitr ou el-Adha' },
      { value: 'fête',         label: 'Fête',         icon: '🎉', desc: 'Célébration, réussite' },
      { value: 'mariage',      label: 'Mariage',      icon: '💍', desc: 'Noces, fiançailles' },
      { value: 'autre',        label: 'Autre',        icon: '🎁', desc: 'Autre occasion' },
    ]
  },
  {
    id: 'budget',
    label: 'Budget',
    question: 'Quel est votre budget ?',
    subtitle: 'En dinars tunisiens (TND)',
    options: [
      { value: 'low',    label: 'Moins de 50 TND', icon: '💶', desc: 'Petit budget' },
      { value: 'mid',    label: '50 – 150 TND',    icon: '💳', desc: 'Budget moyen' },
      { value: 'high',   label: '150 – 400 TND',   icon: '💰', desc: 'Budget généreux' },
      { value: 'luxury', label: 'Plus de 400 TND', icon: '💎', desc: 'Cadeau premium' },
    ]
  },
];

const AGE_OPTIONS = [
  { value: 'enfant', label: '< 12 ans' },
  { value: 'ado',    label: '13 – 17' },
  { value: 'jeune',  label: '18 – 25' },
  { value: 'adulte', label: '26 – 35' },
  { value: 'mature', label: '36 – 50' },
  { value: 'senior', label: '50 +' },
];

const GENDER_OPTIONS = [
  { value: 'femme',   label: 'Femme',               icon: '👩' },
  { value: 'homme',   label: 'Homme',               icon: '👨' },
  { value: 'neutre',  label: 'Non-binaire',         icon: '🧑' },
  { value: 'inconnu', label: 'Préfère ne pas dire', icon: '✨' },
];

export default function Quiz() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Pre-fill answers from URL params (when launched from a proche)
  const [answers, setAnswers] = useState(() => {
    const pre = {};
    if (searchParams.get('recipient'))   pre.recipient   = searchParams.get('recipient');
    if (searchParams.get('personality')) pre.personality = searchParams.get('personality');
    if (searchParams.get('occasion'))    pre.occasion    = searchParams.get('occasion');
    if (searchParams.get('budget'))      pre.budget      = searchParams.get('budget');
    return pre;
  });

  const [age, setAge]       = useState(searchParams.get('age') || '');
  const [gender, setGender] = useState(searchParams.get('gender') || '');

  // Start at first unanswered step
  const [step, setStep] = useState(() => {
    if (!searchParams.get('recipient'))   return 0;
    if (!searchParams.get('personality')) return 1;
    if (!searchParams.get('occasion'))    return 2;
    if (!searchParams.get('budget'))      return 3;
    return 0;
  });

  const current   = STEPS[step];
  const isStep0   = step === 0;
  const step0Complete = isStep0 ? (answers['recipient'] && age && gender) : true;

  const select = (value) => {
    const updated = { ...answers, [current.id]: value };
    setAnswers(updated);
    if (isStep0) return; // wait for age+gender
    if (step < STEPS.length - 1) {
      setTimeout(() => setStep(step + 1), 250);
    } else {
      const params = new URLSearchParams({ ...updated, age, gender }).toString();
      navigate('/results?' + params);
    }
  };

  const goNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      const params = new URLSearchParams({ ...answers, age, gender }).toString();
      navigate('/results?' + params);
    }
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="quiz-page">
      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: progress + '%' }} />
      </div>

      <div className="quiz-card">
        <div className="quiz-tabs">
          {STEPS.map((s, i) => (
            <div key={s.id} className={'quiz-tab ' + (i < step ? 'done' : i === step ? 'active' : '')}>
              {i < step ? '✓ ' : ''}{s.label}
            </div>
          ))}
        </div>

        <div className="quiz-step-badge">Étape {step + 1} sur {STEPS.length}</div>
        <h1 className="quiz-question">{current.question}</h1>
        <p className="quiz-subtitle">{current.subtitle}</p>

        <div className="quiz-options">
          {current.options.map(opt => (
            <button
              key={opt.value}
              className={'quiz-option ' + (answers[current.id] === opt.value ? 'selected' : '')}
              onClick={() => select(opt.value)}
            >
              <span className="quiz-option-icon">{opt.icon}</span>
              <div className="quiz-option-text">
                <span className="quiz-option-label">{opt.label}</span>
                <span className="quiz-option-desc">{opt.desc}</span>
              </div>
              <span className="quiz-option-check">
                {answers[current.id] === opt.value ? '✓' : ''}
              </span>
            </button>
          ))}
        </div>

        {/* Age & gender — only on step 0 after relation is picked */}
        {isStep0 && answers['recipient'] && (
          <div className="quiz-extra-fields">
            <div className="quiz-extra-section">
              <p className="quiz-extra-label">Tranche d'âge</p>
              <div className="quiz-age-options">
                {AGE_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    className={'quiz-age-pill ' + (age === opt.value ? 'selected' : '')}
                    onClick={() => setAge(opt.value)}
                  >{opt.label}</button>
                ))}
              </div>
            </div>
            <div className="quiz-extra-section">
              <p className="quiz-extra-label">Genre <span className="quiz-optional">(optionnel)</span></p>
              <div className="quiz-gender-options">
                {GENDER_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    className={'quiz-gender-pill ' + (gender === opt.value ? 'selected' : '')}
                    onClick={() => setGender(opt.value)}
                  ><span>{opt.icon}</span> {opt.label}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="quiz-nav">
          {step > 0 && (
            <button className="quiz-back" onClick={() => setStep(step - 1)}>Retour</button>
          )}
          {isStep0 && step0Complete && (
            <button className="quiz-next" onClick={goNext}>Continuer</button>
          )}
          {!isStep0 && answers[current.id] && step < STEPS.length - 1 && (
            <button className="quiz-next" onClick={() => setStep(step + 1)}>Continuer</button>
          )}
          {!isStep0 && answers[current.id] && step === STEPS.length - 1 && (
            <button className="quiz-next" onClick={goNext}>Voir les résultats</button>
          )}
        </div>
      </div>
    </div>
  );
}
