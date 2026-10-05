"""
Giftly ML API — Flask
Expose le modèle KNN + Random Forest via une API REST
Appelé par backend/routes/chat.js
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import re

app = Flask(__name__)
CORS(app)

# Load model
with open('model.pkl', 'rb') as f:
    model_data = pickle.load(f)

knn             = model_data['knn']
rf              = model_data['rf']
feature_cols    = model_data['feature_cols']
personality_map = model_data['personality_map']
price_map       = model_data['price_map']
gifts_df        = model_data['gifts_df']
X               = model_data['X']

# ── Age & gender compatibility map ──
# age values: enfant, ado, jeune, adulte, mature, senior
# gender values: femme, homme, neutre, inconnu

AGE_COMPAT = {
    'Boussole de randonnée':                  ['ado','jeune','adulte','mature','senior'],
    'Gourde isotherme 1L':                    ['ado','jeune','adulte','mature','senior'],
    'Lampe frontale LED':                     ['ado','jeune','adulte','mature','senior'],
    'Sac à dos de randonnée 40L':             ['ado','jeune','adulte','mature','senior'],
    'Montre GPS outdoor':                     ['jeune','adulte','mature'],
    'Kit de survie complet':                  ['ado','jeune','adulte','mature'],
    'Tente de camping 2 personnes':           ['jeune','adulte','mature'],
    'GoPro HERO12 Black':                     ['ado','jeune','adulte','mature'],
    'Drone DJI Mini 4 Pro':                   ['jeune','adulte','mature'],
    'Kayak gonflable premium':                ['jeune','adulte','mature'],
    'Couteau multifonction Victorinox':       ['ado','jeune','adulte','mature','senior'],
    'Hamac de camping ultraléger':            ['ado','jeune','adulte','mature'],
    'Chaussures de randonnée imperméables':   ['ado','jeune','adulte','mature','senior'],
    'Veste softshell outdoor':                ['ado','jeune','adulte','mature','senior'],
    'Vélo électrique tout-terrain':           ['jeune','adulte','mature'],
    'Stage escalade en salle 5 séances':      ['enfant','ado','jeune','adulte','mature'],
    'Carnet Leuchtturm1917':                  ['ado','jeune','adulte','mature','senior'],
    'Set de crayons aquarelle 48 couleurs':   ['enfant','ado','jeune','adulte','mature','senior'],
    'Kit origami premium':                    ['enfant','ado','jeune','adulte','mature','senior'],
    'Tablette graphique Wacom Intuos':        ['ado','jeune','adulte','mature'],
    'Appareil photo instantané Instax Mini 12':['ado','jeune','adulte','mature'],
    'Cours de poterie en ligne':              ['jeune','adulte','mature','senior'],
    'Imprimante photo portable Canon':        ['jeune','adulte','mature','senior'],
    'Machine Cricut Explore Air 2':           ['jeune','adulte','mature'],
    'iPad Pro 11 pouces + Apple Pencil':      ['ado','jeune','adulte','mature'],
    'Cours MasterClass annuel':               ['jeune','adulte','mature','senior'],
    'Bougie parfumée Yankee Candle':          ['jeune','adulte','mature','senior'],
    'Plaid sherpa doux':                      ['ado','jeune','adulte','mature','senior'],
    'Tisanes du monde coffret':               ['jeune','adulte','mature','senior'],
    'Diffuseur d\'huiles essentielles':       ['jeune','adulte','mature','senior'],
    'Machine à café à capsules':              ['jeune','adulte','mature','senior'],
    'Kit spa maison Lush':                    ['jeune','adulte','mature','senior'],
    'Couverture chauffante électrique':       ['mature','senior'],
    'Hamac de jardin avec support':           ['jeune','adulte','mature','senior'],
    'Matelas à mémoire de forme premium':     ['jeune','adulte','mature','senior'],
    'Spa balnéo gonflable Lay-Z-Spa':         ['jeune','adulte','mature'],
    'Coffret 3 romans Prix Nobel':            ['jeune','adulte','mature','senior'],
    'Abonnement Audible 3 mois':              ['jeune','adulte','mature','senior'],
    'Jeu d\'échecs en bois':                  ['ado','jeune','adulte','mature','senior'],
    'Abonnement Brilliant.org 1 an':          ['ado','jeune','adulte'],
    'Télescope astronomique débutant':        ['enfant','ado','jeune','adulte','mature'],
    'Puzzle 3D architecture mondiale':        ['enfant','ado','jeune','adulte','mature','senior'],
    'Liseuse Kindle Paperwhite':              ['jeune','adulte','mature','senior'],
    'Microscope numérique USB':               ['enfant','ado','jeune','adulte'],
    'Encyclopédie Universalis complète':      ['adulte','mature','senior'],
    'Abonnement MasterClass + Coursera 1 an': ['jeune','adulte','mature'],
    'Manette Xbox Series sans fil':           ['enfant','ado','jeune','adulte'],
    'Carte cadeau Steam 50€':                 ['ado','jeune','adulte'],
    'Tapis de souris XXL gaming':             ['ado','jeune','adulte'],
    'Casque gaming HyperX Cloud II':          ['ado','jeune','adulte'],
    'Clavier mécanique gaming RGB':           ['ado','jeune','adulte'],
    'Abonnement Xbox Game Pass Ultimate 6 mois':['ado','jeune','adulte'],
    'Écran gaming 144Hz 27 pouces':           ['ado','jeune','adulte'],
    'Chaise gaming ergonomique':              ['ado','jeune','adulte','mature'],
    'Nintendo Switch OLED + jeux':            ['enfant','ado','jeune','adulte'],
    'PC Gaming assemblé':                     ['ado','jeune','adulte'],
    'Figurine collector gaming':              ['ado','jeune','adulte'],
    'Tapis de yoga premium':                  ['ado','jeune','adulte','mature','senior'],
    'Coffret huiles essentielles bio':        ['jeune','adulte','mature','senior'],
    'Journal de gratitude':                   ['ado','jeune','adulte','mature','senior'],
    'Abonnement Calm Premium 1 an':           ['jeune','adulte','mature','senior'],
    'Blender Nutribullet Pro':                ['jeune','adulte','mature','senior'],
    'Kit de massage shiatsu':                 ['adulte','mature','senior'],
    'Theragun Prime':                         ['jeune','adulte','mature'],
    'Montre connectée santé Fitbit Sense 2':  ['jeune','adulte','mature'],
    'Vélo d\'appartement connecté':           ['jeune','adulte','mature'],
    'Séance spa & hammam premium':            ['jeune','adulte','mature','senior'],
    'Foulard en soie':                        ['jeune','adulte','mature','senior'],
    'Trousse de maquillage organiseur':       ['ado','jeune','adulte','mature'],
    'Coffret parfum miniatures Sephora':      ['ado','jeune','adulte','mature','senior'],
    'Lunettes de soleil Ray-Ban Wayfarer':    ['ado','jeune','adulte','mature'],
    'Sac à main canvas Tod\'s':               ['jeune','adulte','mature'],
    'Montre femme Michael Kors':              ['jeune','adulte','mature'],
    'Bijou personnalisé or 18 carats':        ['jeune','adulte','mature','senior'],
    'Sac Longchamp Le Pliage':               ['jeune','adulte','mature'],
    'Parfum Chanel N°5 Eau de Parfum':       ['adulte','mature','senior'],
    'Montre homme Tag Heuer Formula 1':       ['adulte','mature'],
}

GENDER_COMPAT = {
    'femme': [
        'Foulard en soie','Trousse de maquillage organiseur','Coffret parfum miniatures Sephora',
        'Lunettes de soleil Ray-Ban Wayfarer','Sac à main canvas Tod\'s','Abonnement Vogue Arabia 1 an',
        'Montre femme Michael Kors','Bijou personnalisé or 18 carats','Sac Longchamp Le Pliage',
        'Parfum Chanel N°5 Eau de Parfum','Pochette de soirée clutch','Coffret soin visage Kiehl\'s',
        'Séance relooking professionnel','Ceinture en cuir véritable','Abonnement box beauté Birchbox 6 mois',
        'Kit spa maison Lush','Coffret bain aux sels de la mer Morte','Tapis de yoga premium',
        'Journal de gratitude','Séance spa & hammam premium',
    ],
    'homme': [
        'Montre GPS outdoor','Kit de survie complet','GoPro HERO12 Black','Drone DJI Mini 4 Pro',
        'Manette Xbox Series sans fil','Carte cadeau Steam 50€','Casque gaming HyperX Cloud II',
        'Clavier mécanique gaming RGB','PC Gaming assemblé','Chaise gaming ergonomique',
        'Montre mécanique automatique','Montre homme Tag Heuer Formula 1','Theragun Prime',
        'Couteaux japonais Shun Classic set','Jeu d\'échecs en bois','Billard de salon compact',
    ],
}

def is_age_compatible(gift_name, age):
    if not age or age == 'inconnu':
        return True
    compat = AGE_COMPAT.get(gift_name)
    if not compat:
        return True
    return age in compat

def is_gender_compatible(gift_name, gender):
    if not gender or gender in ('neutre', 'inconnu'):
        return True
    exclusion = GENDER_COMPAT.get('femme' if gender == 'homme' else 'homme', [])
    return gift_name not in exclusion

# Keyword detection
PERSONALITY_KEYWORDS = {
    'aventurier':   ['aventure','aventurier','outdoor','randonnée','camping','sport','nature','escalade','trek','montagne'],
    'créatif':      ['créatif','créativité','art','dessin','peinture','artiste','design','photo','créer','bricolage'],
    'cosy':         ['cosy','maison','confort','relaxation','calme','repos','doux','chaud','intérieur','détente'],
    'intellectuel': ['intellectuel','lecture','livre','science','apprendre','culture','connaissance','étude','curieux','intelligent'],
    'social':       ['social','fête','amis','soirée','groupe','convivial','sortir','célébration','festif','amusant'],
    'wellness':     ['bien-être','wellness','yoga','méditation','santé','fitness','équilibre','soin','détox','zen'],
    'gamer':        ['gamer','jeux','gaming','console','pc','xbox','playstation','nintendo','jeu vidéo','streamer'],
    'foodie':       ['foodie','cuisine','cuisinier','gastronomie','nourriture','chef','recette','manger','gourmet','restaurant'],
    'fashionista':  ['mode','fashion','style','vêtement','tendance','beauté','maquillage','bijou','luxe','élégant'],
}

BUDGET_KEYWORDS = {
    'low':    ['petit budget','pas cher','économique','moins de 50','abordable'],
    'mid':    ['moyen','raisonnable','correct','milieu','modéré'],
    'high':   ['généreux','beau cadeau','qualité','bien'],
    'luxury': ['luxe','luxueux','premium','haut de gamme','sans limite','exceptionnel'],
}

OCCASION_KEYWORDS = {
    'anniversaire': ['anniversaire','birthday','ans','naissance'],
    'noël':         ['noël','noel','christmas','fêtes','décembre'],
    'fête':         ['fête','célébration','félicitation','promotion','réussite'],
    'eid':          ['aïd','aid','eid','ramadan'],
    'mariage':      ['mariage','mariés','noces','wedding','fiançailles'],
}

def detect_personality(text):
    text = text.lower()
    for p, keywords in PERSONALITY_KEYWORDS.items():
        if any(k in text for k in keywords):
            return p
    return None

def detect_budget(text):
    text = text.lower()
    # Support: 200tnd, 200 tnd, 200dt, 200 dt, 200 dinar, 200dinars
    match = re.search(r'(\d+)\s*(?:tnd|dt|dinar[s]?)', text)
    if match:
        amount = int(match.group(1))
        if amount < 50:  return 'low'
        if amount < 150: return 'mid'
        if amount < 400: return 'high'
        return 'luxury'
    for b, keywords in BUDGET_KEYWORDS.items():
        if any(k in text for k in keywords):
            return b
    return None

def detect_gender(text):
    text = text.lower()
    male_keywords   = ['homme','garçon','gars','mec','fils','frère','père','uncle','oncle','mari','copain','ami masculin','boy']
    female_keywords = ['femme','fille','dame','mère','sœur','tante','épouse','copine','amie','girl']
    if any(k in text for k in male_keywords):
        return 'homme'
    if any(k in text for k in female_keywords):
        return 'femme'
    return None

def detect_age(text):
    text = text.lower()
    # Match patterns like "22ans", "22 ans", "age 22"
    match = re.search(r'(\d{1,2})\s*ans', text)
    if not match:
        match = re.search(r'age[:\s]+(\d{1,2})', text)
    if match:
        age = int(match.group(1))
        if age < 12:  return 'enfant'
        if age < 18:  return 'ado'
        if age < 26:  return 'jeune'
        if age < 36:  return 'adulte'
        if age < 51:  return 'mature'
        return 'senior'
    return None

def detect_occasion(text):
    text = text.lower()
    for o, keywords in OCCASION_KEYWORDS.items():
        if any(k in text for k in keywords):
            return o
    return None

def build_query_vector(personality, price_range, occasion):
    p_enc  = personality_map.get(personality, 0)
    pr_enc = price_map.get(price_range, 1)
    occ_cols = {
        'occasion_anniversaire': 0,
        'occasion_noël': 0,
        'occasion_fête': 0,
        'occasion_eid': 0,
        'occasion_mariage': 0,
    }
    if occasion and f'occasion_{occasion}' in occ_cols:
        occ_cols[f'occasion_{occasion}'] = 1
    vector = [p_enc, pr_enc] + list(occ_cols.values())
    return np.array([vector])

def get_recommendations(personality, price_range, occasion, age=None, gender=None, n=6):
    query_vec = build_query_vector(personality, price_range, occasion)

    # Get more candidates so we have room to filter by age/gender
    k = min(30, len(gifts_df))
    distances, indices = knn.kneighbors(query_vec, n_neighbors=k)

    candidates = gifts_df.iloc[indices[0]].copy()
    candidate_X = X[indices[0]]

    # Score with Random Forest
    if personality in personality_map:
        target_class = personality_map[personality]
        proba = rf.predict_proba(candidate_X)
        class_idx = list(rf.classes_).index(target_class) if target_class in rf.classes_ else 0
        candidates['score'] = proba[:, class_idx]
    else:
        candidates['score'] = 1.0 / (distances[0] + 1e-5)

    # Filter by priceRange
    if price_range:
        exact = candidates[candidates['priceRange'] == price_range]
        if len(exact) >= 3:
            candidates = exact

    # Sort by score
    candidates = candidates.sort_values('score', ascending=False)

    # Post-ML filter: age & gender
    results = []
    for _, row in candidates.iterrows():
        name = row['name']
        if not is_age_compatible(name, age):
            continue
        if not is_gender_compatible(name, gender):
            continue
        results.append({
            'name':        name,
            'price':       int(row['price']),
            'priceRange':  row['priceRange'],
            'personality': row['personality'],
            'tags':        row['tags'].split(',') if isinstance(row['tags'], str) else [],
            'image':       '🎁',
            'link':        f"https://www.amazon.fr/s?k={name.replace(' ', '+')}",
            'score':       float(row.get('score', 0)),
        })
        if len(results) >= n:
            break

    # Fallback: if too few results after filtering, relax gender filter
    if len(results) < 3:
        results = []
        for _, row in candidates.iterrows():
            name = row['name']
            if not is_age_compatible(name, age):
                continue
            results.append({
                'name':        name,
                'price':       int(row['price']),
                'priceRange':  row['priceRange'],
                'personality': row['personality'],
                'tags':        row['tags'].split(',') if isinstance(row['tags'], str) else [],
                'image':       '🎁',
                'link':        f"https://www.amazon.fr/s?k={name.replace(' ', '+')}",
                'score':       float(row.get('score', 0)),
            })
            if len(results) >= n:
                break

    return results

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'model': 'KNN + RandomForest', 'gifts': len(gifts_df)})

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    message    = data.get('message', '')
    age        = data.get('age')
    gender     = data.get('gender')

    personality = data.get('personality') or detect_personality(message)
    price_range = data.get('priceRange')  or detect_budget(message)
    occasion    = data.get('occasion')    or detect_occasion(message)
    age         = data.get('age')         or detect_age(message)
    gender      = data.get('gender')      or detect_gender(message)

    lower = message.lower()
    if any(w in lower for w in ['bonjour','salut','hello','bonsoir','salam']):
        return jsonify({
            'text': "Bonjour ! 👋 Je suis l'assistant Giftly propulsé par IA. Décrivez-moi la personne et je vous recommande le cadeau parfait ! Exemple : 'Cadeau pour mon ami gamer, anniversaire, 100 TND'",
            'gifts': [], 'detected': {}
        })

    if any(w in lower for w in ['merci','parfait','super','thanks']):
        return jsonify({
            'text': "Avec plaisir ! 😊 N'hésitez pas si vous avez d'autres questions. Bon shopping ! 🎁",
            'gifts': [], 'detected': {}
        })

    if not personality and not price_range:
        return jsonify({
            'text': "Je n'ai pas bien compris 🤔 Pouvez-vous préciser la personnalité (gamer, créatif, wellness...) et votre budget en TND ?",
            'gifts': [], 'detected': {}
        })

    if not price_range:
        price_range = 'mid'

    gifts = get_recommendations(personality, price_range, occasion, age=age, gender=gender, n=6)

    text = f"🎯 Mon modèle IA a trouvé {len(gifts)} cadeau(x) pour vous"
    if personality:
        text += f" — profil **{personality}**"
    if occasion:
        text += f", occasion **{occasion}**"
    if price_range:
        labels = {'low': 'moins de 50 TND', 'mid': '50-150 TND', 'high': '150-400 TND', 'luxury': '400+ TND'}
        text += f", budget **{labels.get(price_range, price_range)}**"
    if age:
        text += f", tranche d'âge **{age}**"
    if gender and gender not in ('neutre', 'inconnu'):
        text += f", genre **{gender}**"
    text += " !"

    return jsonify({
        'text': text,
        'gifts': gifts,
        'detected': {
            'personality': personality,
            'priceRange':  price_range,
            'occasion':    occasion,
            'age':         age,
            'gender':      gender,
        }
    })

if __name__ == '__main__':
    print("🚀 Giftly ML API démarrée sur http://localhost:5001")
    print(f"   Modèle: KNN + Random Forest")
    print(f"   Cadeaux: {len(gifts_df)}")
    app.run(port=5001, debug=False)