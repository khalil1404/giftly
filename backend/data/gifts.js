const gifts = [
  // ===== AVENTURIER =====
  // Low (0-50 TND)
  {
    name: "Boussole de randonnée",
    description: "Boussole professionnelle pour ne jamais se perdre en pleine nature.",
    price: 35,
    priceRange: "low",
    category: "Aventure",
    personality: ["aventurier"],
    occasion: ["anniversaire", "noël", "fête", "eid"],
    tags: ["outdoor", "randonnée", "nature"],
    link: "https://www.amazon.fr/s?k=boussole+randonnée",
    image: "🧭"
  },
  {
    name: "Gourde isotherme 1L",
    description: "Garde vos boissons froides 24h ou chaudes 12h, idéale pour les aventures.",
    price: 45,
    priceRange: "low",
    category: "Aventure",
    personality: ["aventurier"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["outdoor", "sport", "hydratation"],
    link: "https://www.amazon.fr/s?k=gourde+isotherme",
    image: "🧴"
  },
  {
    name: "Lampe frontale LED",
    description: "Lampe frontale puissante, rechargeable USB, parfaite pour le camping.",
    price: 40,
    priceRange: "low",
    category: "Aventure",
    personality: ["aventurier"],
    occasion: ["anniversaire", "noël", "eid"],
    tags: ["camping", "outdoor", "lumière"],
    link: "https://www.amazon.fr/s?k=lampe+frontale+LED",
    image: "🔦"
  },
  // Mid (50-150 TND)
  {
    name: "Sac à dos de randonnée 40L",
    description: "Sac ergonomique avec compartiments multiples pour vos expéditions.",
    price: 120,
    priceRange: "mid",
    category: "Aventure",
    personality: ["aventurier"],
    occasion: ["anniversaire", "noël", "eid"],
    tags: ["randonnée", "voyage", "outdoor"],
    link: "https://www.amazon.fr/s?k=sac+dos+randonnée+40l",
    image: "🎒"
  },
  {
    name: "Montre GPS outdoor",
    description: "Montre sport avec GPS intégré, altimètre et suivi d'activité.",
    price: 140,
    priceRange: "mid",
    category: "Aventure",
    personality: ["aventurier"],
    occasion: ["anniversaire", "noël", "eid"],
    tags: ["sport", "GPS", "outdoor"],
    link: "https://www.amazon.fr/s?k=montre+GPS+outdoor",
    image: "⌚"
  },
  {
    name: "Kit de survie complet",
    description: "Trousse de survie avec 20 outils essentiels pour toute situation.",
    price: 80,
    priceRange: "mid",
    category: "Aventure",
    personality: ["aventurier"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["survie", "outdoor", "sécurité"],
    link: "https://www.amazon.fr/s?k=kit+survie+complet",
    image: "🛠️"
  },
  // High (150-400 TND)
  {
    name: "Tente de camping 2 personnes",
    description: "Tente légère et imperméable, montage rapide en 5 minutes.",
    price: 280,
    priceRange: "high",
    category: "Aventure",
    personality: ["aventurier"],
    occasion: ["anniversaire", "noël"],
    tags: ["camping", "outdoor", "voyage"],
    link: "https://www.amazon.fr/s?k=tente+camping+2+personnes",
    image: "⛺"
  },
  {
    name: "GoPro HERO12 Black",
    description: "Caméra d'action 5.3K, stabilisation HyperSmooth, waterproof 10m.",
    price: 380,
    priceRange: "high",
    category: "Aventure",
    personality: ["aventurier"],
    occasion: ["anniversaire", "noël", "mariage"],
    tags: ["caméra", "action", "vidéo"],
    link: "https://www.amazon.fr/s?k=GoPro+HERO12",
    image: "📷"
  },
  // Luxury (400+ TND)
  {
    name: "Drone DJI Mini 4 Pro",
    description: "Drone compact avec caméra 4K, parfait pour capturer vos aventures.",
    price: 800,
    priceRange: "luxury",
    category: "Aventure",
    personality: ["aventurier"],
    occasion: ["anniversaire", "noël"],
    tags: ["drone", "photo", "technologie"],
    link: "https://www.amazon.fr/s?k=DJI+Mini+4+Pro",
    image: "🚁"
  },
  {
    name: "Kayak gonflable premium",
    description: "Kayak 2 places, résistant, livré avec pagaies et pompe.",
    price: 650,
    priceRange: "luxury",
    category: "Aventure",
    personality: ["aventurier"],
    occasion: ["anniversaire", "mariage"],
    tags: ["water sport", "outdoor", "aventure"],
    link: "https://www.amazon.fr/s?k=kayak+gonflable",
    image: "🛶"
  },

  // ===== CRÉATIF =====
  // Low
  {
    name: "Carnet Leuchtturm1917",
    description: "Carnet premium avec pages numérotées, parfait pour les idées créatives.",
    price: 38,
    priceRange: "low",
    category: "Créativité",
    personality: ["créatif"],
    occasion: ["anniversaire", "fête", "noël", "eid"],
    tags: ["écriture", "carnet", "art"],
    link: "https://www.amazon.fr/s?k=carnet+leuchtturm1917",
    image: "📒"
  },
  {
    name: "Set de crayons aquarelle 48 couleurs",
    description: "Crayons aquarelle professionnels pour dessins et illustrations.",
    price: 42,
    priceRange: "low",
    category: "Créativité",
    personality: ["créatif"],
    occasion: ["anniversaire", "noël", "eid"],
    tags: ["dessin", "art", "couleurs"],
    link: "https://www.amazon.fr/s?k=crayons+aquarelle+48",
    image: "🎨"
  },
  {
    name: "Kit origami premium",
    description: "200 feuilles de papier origami + guide avec 50 modèles.",
    price: 30,
    priceRange: "low",
    category: "Créativité",
    personality: ["créatif"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["origami", "art", "papier"],
    link: "https://www.amazon.fr/s?k=kit+origami+premium",
    image: "🦢"
  },
  // Mid
  {
    name: "Tablette graphique Wacom Intuos",
    description: "Tablette graphique pour illustrateurs et designers numériques.",
    price: 150,
    priceRange: "mid",
    category: "Créativité",
    personality: ["créatif"],
    occasion: ["anniversaire", "noël", "eid"],
    tags: ["design", "digital", "art"],
    link: "https://www.amazon.fr/s?k=wacom+intuos",
    image: "✏️"
  },
  {
    name: "Appareil photo instantané Instax Mini 12",
    description: "Appareil photo polaroid moderne avec films inclus.",
    price: 130,
    priceRange: "mid",
    category: "Créativité",
    personality: ["créatif"],
    occasion: ["anniversaire", "noël", "fête", "mariage"],
    tags: ["photo", "instax", "souvenirs"],
    link: "https://www.amazon.fr/s?k=instax+mini+12",
    image: "📸"
  },
  {
    name: "Cours de poterie en ligne",
    description: "Accès 1 an à des cours de poterie en ligne avec certificat.",
    price: 100,
    priceRange: "mid",
    category: "Créativité",
    personality: ["créatif"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["poterie", "cours", "art"],
    link: "https://www.masterclass.com",
    image: "🏺"
  },
  // High
  {
    name: "Imprimante photo portable Canon",
    description: "Imprimante photo sans fil, format carte postale, qualité professionnelle.",
    price: 220,
    priceRange: "high",
    category: "Créativité",
    personality: ["créatif"],
    occasion: ["anniversaire", "noël", "mariage"],
    tags: ["photo", "impression", "créativité"],
    link: "https://www.amazon.fr/s?k=imprimante+photo+portable+canon",
    image: "🖨️"
  },
  {
    name: "Machine Cricut Explore Air 2",
    description: "Machine de découpe pour créer des stickers, t-shirts, et décorations.",
    price: 350,
    priceRange: "high",
    category: "Créativité",
    personality: ["créatif"],
    occasion: ["anniversaire", "noël"],
    tags: ["DIY", "découpe", "créativité"],
    link: "https://www.amazon.fr/s?k=cricut+explore+air+2",
    image: "✂️"
  },
  // Luxury
  {
    name: "iPad Pro 11 pouces + Apple Pencil",
    description: "La combinaison ultime pour les artistes et créatifs numériques.",
    price: 1200,
    priceRange: "luxury",
    category: "Créativité",
    personality: ["créatif"],
    occasion: ["anniversaire", "noël", "mariage"],
    tags: ["iPad", "digital", "art"],
    link: "https://www.apple.com/fr/shop/buy-ipad/ipad-pro",
    image: "📱"
  },
  {
    name: "Cours MasterClass annuel",
    description: "Accès illimité à tous les cours MasterClass — 180+ instructeurs de renom.",
    price: 500,
    priceRange: "luxury",
    category: "Créativité",
    personality: ["créatif"],
    occasion: ["anniversaire", "noël", "eid"],
    tags: ["cours", "apprentissage", "créativité"],
    link: "https://www.masterclass.com",
    image: "🎓"
  },

  // ===== COSY =====
  // Low
  {
    name: "Bougie parfumée Yankee Candle",
    description: "Grande bougie parfumée, 110h de combustion, parfum vanille/bois.",
    price: 35,
    priceRange: "low",
    category: "Bien-être",
    personality: ["cosy"],
    occasion: ["anniversaire", "fête", "noël", "eid"],
    tags: ["bougie", "relaxation", "maison"],
    link: "https://www.amazon.fr/s?k=yankee+candle+grande",
    image: "🕯️"
  },
  {
    name: "Plaid sherpa doux",
    description: "Plaid ultra-doux en sherpa, 150x200cm, parfait pour les soirées cosy.",
    price: 45,
    priceRange: "low",
    category: "Maison",
    personality: ["cosy"],
    occasion: ["anniversaire", "noël", "fête", "eid"],
    tags: ["plaid", "confort", "maison"],
    link: "https://www.amazon.fr/s?k=plaid+sherpa+doux",
    image: "🛋️"
  },
  {
    name: "Tisanes du monde coffret",
    description: "Coffret 20 variétés de tisanes bio du monde entier.",
    price: 28,
    priceRange: "low",
    category: "Bien-être",
    personality: ["cosy"],
    occasion: ["anniversaire", "fête", "noël", "eid"],
    tags: ["thé", "tisane", "relaxation"],
    link: "https://www.amazon.fr/s?k=coffret+tisanes+bio",
    image: "🍵"
  },
  // Mid
  {
    name: "Diffuseur d'huiles essentielles",
    description: "Diffuseur ultrasonique avec 7 couleurs LED et minuterie.",
    price: 75,
    priceRange: "mid",
    category: "Bien-être",
    personality: ["cosy"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["aromathérapie", "relaxation", "maison"],
    link: "https://www.amazon.fr/s?k=diffuseur+huiles+essentielles",
    image: "💨"
  },
  {
    name: "Machine à café à capsules",
    description: "Machine Nespresso compacte avec 16 capsules offertes.",
    price: 120,
    priceRange: "mid",
    category: "Cuisine",
    personality: ["cosy"],
    occasion: ["anniversaire", "noël", "mariage"],
    tags: ["café", "machine", "maison"],
    link: "https://www.amazon.fr/s?k=machine+nespresso",
    image: "☕"
  },
  {
    name: "Kit spa maison Lush",
    description: "Set bain moussant, bombes de bain et masques Lush.",
    price: 90,
    priceRange: "mid",
    category: "Bien-être",
    personality: ["cosy"],
    occasion: ["anniversaire", "fête", "noël", "eid"],
    tags: ["spa", "bain", "relaxation"],
    link: "https://www.lush.com",
    image: "🛁"
  },
  // High
  {
    name: "Couverture chauffante électrique",
    description: "Couverture chauffante avec 10 niveaux de chaleur et arrêt automatique.",
    price: 180,
    priceRange: "high",
    category: "Maison",
    personality: ["cosy"],
    occasion: ["anniversaire", "noël"],
    tags: ["chauffage", "confort", "maison"],
    link: "https://www.amazon.fr/s?k=couverture+chauffante",
    image: "🔥"
  },
  {
    name: "Hamac de jardin avec support",
    description: "Hamac coton avec support métallique, capacité 200kg.",
    price: 250,
    priceRange: "high",
    category: "Maison",
    personality: ["cosy"],
    occasion: ["anniversaire", "fête", "mariage"],
    tags: ["jardin", "repos", "extérieur"],
    link: "https://www.amazon.fr/s?k=hamac+jardin+support",
    image: "🌿"
  },
  // Luxury
  {
    name: "Matelas à mémoire de forme premium",
    description: "Matelas 160x200, mousse viscoélastique, 10 ans de garantie.",
    price: 900,
    priceRange: "luxury",
    category: "Maison",
    personality: ["cosy"],
    occasion: ["anniversaire", "mariage"],
    tags: ["sommeil", "confort", "maison"],
    link: "https://www.amazon.fr/s?k=matelas+memoire+forme+premium",
    image: "🛏️"
  },
  {
    name: "Spa balnéo gonflable Lay-Z-Spa",
    description: "Jacuzzi gonflable 4 personnes avec 140 jets massants.",
    price: 700,
    priceRange: "luxury",
    category: "Bien-être",
    personality: ["cosy"],
    occasion: ["anniversaire", "noël", "mariage"],
    tags: ["jacuzzi", "spa", "relaxation"],
    link: "https://www.amazon.fr/s?k=lay-z-spa+gonflable",
    image: "💦"
  },

  // ===== INTELLECTUEL =====
  // Low
  {
    name: "Coffret 3 romans Prix Nobel",
    description: "Sélection de 3 romans de lauréats du Prix Nobel de Littérature.",
    price: 40,
    priceRange: "low",
    category: "Culture",
    personality: ["intellectuel"],
    occasion: ["anniversaire", "fête", "noël", "eid"],
    tags: ["livre", "littérature", "culture"],
    link: "https://www.amazon.fr/s?k=romans+prix+nobel",
    image: "📚"
  },
  {
    name: "Abonnement Audible 3 mois",
    description: "3 mois d'accès illimité aux livres audio Audible.",
    price: 35,
    priceRange: "low",
    category: "Culture",
    personality: ["intellectuel"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["audiobook", "lecture", "apprentissage"],
    link: "https://www.audible.fr",
    image: "🎧"
  },
  {
    name: "Jeu d'échecs en bois",
    description: "Échiquier en bois massif avec pièces lestées, format tournoi.",
    price: 48,
    priceRange: "low",
    category: "Jeux",
    personality: ["intellectuel"],
    occasion: ["anniversaire", "noël", "fête", "eid"],
    tags: ["échecs", "stratégie", "jeu"],
    link: "https://www.amazon.fr/s?k=jeu+echecs+bois+massif",
    image: "♟️"
  },
  // Mid
  {
    name: "Abonnement Brilliant.org 1 an",
    description: "Plateforme d'apprentissage interactif — maths, science, informatique.",
    price: 100,
    priceRange: "mid",
    category: "Culture",
    personality: ["intellectuel"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["apprentissage", "science", "maths"],
    link: "https://brilliant.org",
    image: "🧮"
  },
  {
    name: "Télescope astronomique débutant",
    description: "Télescope 70mm, grossissement x200, idéal pour observer lune et planètes.",
    price: 130,
    priceRange: "mid",
    category: "Science",
    personality: ["intellectuel"],
    occasion: ["anniversaire", "noël", "eid"],
    tags: ["astronomie", "science", "telescope"],
    link: "https://www.amazon.fr/s?k=telescope+astronomique+debutant",
    image: "🔭"
  },
  {
    name: "Puzzle 3D architecture mondiale",
    description: "Puzzle 3D de la Tour Eiffel ou Big Ben, 800 pièces.",
    price: 60,
    priceRange: "mid",
    category: "Jeux",
    personality: ["intellectuel"],
    occasion: ["anniversaire", "noël", "fête", "eid"],
    tags: ["puzzle", "architecture", "3D"],
    link: "https://www.amazon.fr/s?k=puzzle+3D+architecture",
    image: "🗼"
  },
  // High
  {
    name: "Liseuse Kindle Paperwhite",
    description: "Liseuse 6.8 pouces, éclairage chaud, waterproof, 10 semaines d'autonomie.",
    price: 200,
    priceRange: "high",
    category: "Culture",
    personality: ["intellectuel"],
    occasion: ["anniversaire", "noël", "eid"],
    tags: ["liseuse", "lecture", "kindle"],
    link: "https://www.amazon.fr/s?k=kindle+paperwhite",
    image: "📖"
  },
  {
    name: "Microscope numérique USB",
    description: "Microscope 1000x avec écran LCD intégré et logiciel d'analyse.",
    price: 180,
    priceRange: "high",
    category: "Science",
    personality: ["intellectuel"],
    occasion: ["anniversaire", "noël"],
    tags: ["microscope", "science", "nature"],
    link: "https://www.amazon.fr/s?k=microscope+numerique+USB",
    image: "🔬"
  },
  // Luxury
  {
    name: "Encyclopédie Universalis complète",
    description: "Collection complète de l'Encyclopédie Universalis — 30 volumes.",
    price: 800,
    priceRange: "luxury",
    category: "Culture",
    personality: ["intellectuel"],
    occasion: ["anniversaire", "noël"],
    tags: ["encyclopédie", "culture", "référence"],
    link: "https://www.amazon.fr/s?k=encyclopedie+universalis",
    image: "📕"
  },
  {
    name: "Abonnement MasterClass + Coursera 1 an",
    description: "Accès illimité aux meilleures plateformes d'apprentissage en ligne.",
    price: 600,
    priceRange: "luxury",
    category: "Culture",
    personality: ["intellectuel"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["cours", "apprentissage", "premium"],
    link: "https://www.masterclass.com",
    image: "🎓"
  },

  // ===== SOCIAL =====
  // Low
  {
    name: "Jeu de société Catan",
    description: "Le classique des jeux de société, 3-4 joueurs, 60-120 minutes.",
    price: 45,
    priceRange: "low",
    category: "Jeux",
    personality: ["social"],
    occasion: ["anniversaire", "noël", "fête", "eid"],
    tags: ["jeu de société", "famille", "stratégie"],
    link: "https://www.amazon.fr/s?k=catan+jeu+societe",
    image: "🎲"
  },
  {
    name: "Cards Against Humanity",
    description: "Le jeu de cartes décalé pour les soirées entre amis.",
    price: 30,
    priceRange: "low",
    category: "Jeux",
    personality: ["social"],
    occasion: ["anniversaire", "fête"],
    tags: ["jeu", "soirée", "humour"],
    link: "https://www.amazon.fr/s?k=cards+against+humanity+français",
    image: "🃏"
  },
  {
    name: "Kit cocktails maison",
    description: "Set de shaker, verre doseur et recettes pour faire vos cocktails.",
    price: 40,
    priceRange: "low",
    category: "Cuisine",
    personality: ["social"],
    occasion: ["anniversaire", "fête", "noël", "mariage"],
    tags: ["cocktail", "soirée", "bar"],
    link: "https://www.amazon.fr/s?k=kit+cocktails+maison",
    image: "🍹"
  },
  // Mid
  {
    name: "Appareil à raclette 8 personnes",
    description: "Appareil à raclette avec 8 poêlons et pierre à griller.",
    price: 85,
    priceRange: "mid",
    category: "Cuisine",
    personality: ["social"],
    occasion: ["anniversaire", "noël", "fête", "eid"],
    tags: ["raclette", "repas", "convivial"],
    link: "https://www.amazon.fr/s?k=appareil+raclette+8+personnes",
    image: "🧀"
  },
  {
    name: "Karaoké Bluetooth portable",
    description: "Micro karaoké avec enceinte intégrée et application mobile.",
    price: 90,
    priceRange: "mid",
    category: "Musique",
    personality: ["social"],
    occasion: ["anniversaire", "fête", "mariage"],
    tags: ["karaoké", "musique", "soirée"],
    link: "https://www.amazon.fr/s?k=micro+karaoke+bluetooth",
    image: "🎤"
  },
  {
    name: "Polaroid Now+ avec film",
    description: "Appareil photo instantané avec 2 packs de films pour immortaliser les moments.",
    price: 140,
    priceRange: "mid",
    category: "Créativité",
    personality: ["social"],
    occasion: ["anniversaire", "fête", "noël", "mariage"],
    tags: ["photo", "polaroid", "souvenirs"],
    link: "https://www.amazon.fr/s?k=polaroid+now+plus",
    image: "📷"
  },
  // High
  {
    name: "Billard de salon compact",
    description: "Table de billard 6 pieds avec accessoires complets.",
    price: 350,
    priceRange: "high",
    category: "Jeux",
    personality: ["social"],
    occasion: ["anniversaire", "noël", "mariage"],
    tags: ["billard", "jeu", "salon"],
    link: "https://www.amazon.fr/s?k=billard+salon+compact",
    image: "🎱"
  },
  {
    name: "Enceinte JBL PartyBox 310",
    description: "Enceinte 240W avec effets lumineux pour animer vos soirées.",
    price: 380,
    priceRange: "high",
    category: "Musique",
    personality: ["social"],
    occasion: ["anniversaire", "fête", "mariage"],
    tags: ["enceinte", "musique", "soirée"],
    link: "https://www.amazon.fr/s?k=JBL+PartyBox+310",
    image: "🔊"
  },
  // Luxury
  {
    name: "Table de ping-pong pliable",
    description: "Table de tennis de table officielle avec 4 raquettes et filets.",
    price: 600,
    priceRange: "luxury",
    category: "Sport",
    personality: ["social"],
    occasion: ["anniversaire", "noël", "mariage"],
    tags: ["ping-pong", "sport", "jeu"],
    link: "https://www.amazon.fr/s?k=table+ping+pong+pliable",
    image: "🏓"
  },
  {
    name: "Console PS5 + jeux",
    description: "PlayStation 5 avec 2 manettes et 3 jeux au choix.",
    price: 750,
    priceRange: "luxury",
    category: "Gaming",
    personality: ["social", "gamer"],
    occasion: ["anniversaire", "noël", "eid"],
    tags: ["PS5", "gaming", "console"],
    link: "https://www.amazon.fr/s?k=PS5+console",
    image: "🎮"
  },

  // ===== WELLNESS =====
  // Low
  {
    name: "Tapis de yoga premium",
    description: "Tapis antidérapant 6mm, écologique, avec sangle de transport.",
    price: 42,
    priceRange: "low",
    category: "Sport",
    personality: ["wellness"],
    occasion: ["anniversaire", "fête", "noël", "eid"],
    tags: ["yoga", "sport", "bien-être"],
    link: "https://www.amazon.fr/s?k=tapis+yoga+premium",
    image: "🧘"
  },
  {
    name: "Coffret huiles essentielles bio",
    description: "Set 12 huiles essentielles 100% pures et biologiques.",
    price: 35,
    priceRange: "low",
    category: "Bien-être",
    personality: ["wellness"],
    occasion: ["anniversaire", "fête", "noël", "eid"],
    tags: ["huiles", "aromathérapie", "bien-être"],
    link: "https://www.amazon.fr/s?k=coffret+huiles+essentielles+bio",
    image: "🌿"
  },
  {
    name: "Journal de gratitude",
    description: "Carnet structuré pour la pratique quotidienne de la gratitude.",
    price: 25,
    priceRange: "low",
    category: "Bien-être",
    personality: ["wellness"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["journal", "bien-être", "mindfulness"],
    link: "https://www.amazon.fr/s?k=journal+gratitude",
    image: "📔"
  },
  // Mid
  {
    name: "Abonnement Calm Premium 1 an",
    description: "Application de méditation guidée et sommeil, accès complet 1 an.",
    price: 70,
    priceRange: "mid",
    category: "Bien-être",
    personality: ["wellness"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["méditation", "sommeil", "bien-être"],
    link: "https://www.calm.com",
    image: "🧠"
  },
  {
    name: "Blender Nutribullet Pro",
    description: "Blender puissant pour smoothies et jus, 900W, sans BPA.",
    price: 110,
    priceRange: "mid",
    category: "Cuisine",
    personality: ["wellness"],
    occasion: ["anniversaire", "noël", "mariage"],
    tags: ["smoothie", "nutrition", "santé"],
    link: "https://www.amazon.fr/s?k=nutribullet+pro",
    image: "🥤"
  },
  {
    name: "Kit de massage shiatsu",
    description: "Appareil de massage cervical et épaules avec chaleur infrarouge.",
    price: 95,
    priceRange: "mid",
    category: "Bien-être",
    personality: ["wellness"],
    occasion: ["anniversaire", "fête", "noël", "eid"],
    tags: ["massage", "relaxation", "bien-être"],
    link: "https://www.amazon.fr/s?k=massage+shiatsu+cervical",
    image: "💆"
  },
  // High
  {
    name: "Theragun Prime",
    description: "Pistolet de massage professionnel avec 5 têtes interchangeables.",
    price: 320,
    priceRange: "high",
    category: "Bien-être",
    personality: ["wellness"],
    occasion: ["anniversaire", "noël"],
    tags: ["massage", "récupération", "sport"],
    link: "https://www.therabody.com",
    image: "💪"
  },
  {
    name: "Montre connectée santé Fitbit Sense 2",
    description: "Montre santé avec ECG, SpO2, gestion du stress et sommeil.",
    price: 280,
    priceRange: "high",
    category: "Technologie",
    personality: ["wellness"],
    occasion: ["anniversaire", "noël", "eid"],
    tags: ["montre", "santé", "sport"],
    link: "https://www.amazon.fr/s?k=fitbit+sense+2",
    image: "⌚"
  },
  // Luxury
  {
    name: "Vélo d'appartement connecté",
    description: "Vélo indoor avec écran HD, cours en direct et suivi des performances.",
    price: 900,
    priceRange: "luxury",
    category: "Sport",
    personality: ["wellness"],
    occasion: ["anniversaire", "noël", "mariage"],
    tags: ["vélo", "sport", "fitness"],
    link: "https://www.amazon.fr/s?k=velo+appartement+connecte",
    image: "🚴"
  },
  {
    name: "Séance spa & hammam premium",
    description: "Bon cadeau pour une journée complète spa, hammam et massages.",
    price: 500,
    priceRange: "luxury",
    category: "Bien-être",
    personality: ["wellness"],
    occasion: ["anniversaire", "fête", "eid", "mariage"],
    tags: ["spa", "hammam", "luxe"],
    link: "https://www.groupon.fr/spa",
    image: "🌸"
  },

  // ===== GAMER =====
  // Low
  {
    name: "Manette Xbox Series sans fil",
    description: "Manette officielle Xbox compatible PC et mobile.",
    price: 65,
    priceRange: "low",
    category: "Gaming",
    personality: ["gamer"],
    occasion: ["anniversaire", "noël", "fête", "eid"],
    tags: ["manette", "xbox", "gaming"],
    link: "https://www.amazon.fr/s?k=manette+xbox+series",
    image: "🎮"
  },
  {
    name: "Carte cadeau Steam 50€",
    description: "Carte prépayée Steam pour acheter les jeux de son choix.",
    price: 55,
    priceRange: "low",
    category: "Gaming",
    personality: ["gamer"],
    occasion: ["anniversaire", "fête", "noël", "eid"],
    tags: ["steam", "jeux PC", "carte cadeau"],
    link: "https://store.steampowered.com",
    image: "💳"
  },
  {
    name: "Tapis de souris XXL gaming",
    description: "Tapis de souris grand format 90x40cm, surface optimisée pour le gaming.",
    price: 30,
    priceRange: "low",
    category: "Gaming",
    personality: ["gamer"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["souris", "gaming", "setup"],
    link: "https://www.amazon.fr/s?k=tapis+souris+xxl+gaming",
    image: "🖱️"
  },
  // Mid
  {
    name: "Casque gaming HyperX Cloud II",
    description: "Casque 7.1 surround, microphone détachable, compatible toutes plateformes.",
    price: 100,
    priceRange: "mid",
    category: "Gaming",
    personality: ["gamer"],
    occasion: ["anniversaire", "noël", "eid"],
    tags: ["casque", "gaming", "audio"],
    link: "https://www.amazon.fr/s?k=hyperx+cloud+2",
    image: "🎧"
  },
  {
    name: "Clavier mécanique gaming RGB",
    description: "Clavier mécanique switches Cherry MX Red, rétroéclairage RGB.",
    price: 120,
    priceRange: "mid",
    category: "Gaming",
    personality: ["gamer"],
    occasion: ["anniversaire", "noël", "eid"],
    tags: ["clavier", "mécanique", "gaming"],
    link: "https://www.amazon.fr/s?k=clavier+mecanique+gaming+RGB",
    image: "⌨️"
  },
  {
    name: "Abonnement Xbox Game Pass Ultimate 6 mois",
    description: "Accès à +400 jeux Xbox et PC pendant 6 mois.",
    price: 80,
    priceRange: "mid",
    category: "Gaming",
    personality: ["gamer"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["xbox", "game pass", "abonnement"],
    link: "https://www.xbox.com/fr-FR/xbox-game-pass",
    image: "🎯"
  },
  // High
  {
    name: "Écran gaming 144Hz 27 pouces",
    description: "Moniteur gaming 1ms, FHD 144Hz, AMD FreeSync.",
    price: 300,
    priceRange: "high",
    category: "Gaming",
    personality: ["gamer"],
    occasion: ["anniversaire", "noël"],
    tags: ["écran", "gaming", "144hz"],
    link: "https://www.amazon.fr/s?k=écran+gaming+144hz+27",
    image: "🖥️"
  },
  {
    name: "Chaise gaming ergonomique",
    description: "Chaise gaming avec support lombaire, accoudoirs 4D et repose-pieds.",
    price: 350,
    priceRange: "high",
    category: "Gaming",
    personality: ["gamer"],
    occasion: ["anniversaire", "noël"],
    tags: ["chaise", "gaming", "ergonomie"],
    link: "https://www.amazon.fr/s?k=chaise+gaming+ergonomique",
    image: "🪑"
  },
  // Luxury
  {
    name: "Nintendo Switch OLED + jeux",
    description: "Console portable avec écran OLED 7 pouces et 3 jeux inclus.",
    price: 450,
    priceRange: "luxury",
    category: "Gaming",
    personality: ["gamer"],
    occasion: ["anniversaire", "noël", "eid"],
    tags: ["nintendo", "switch", "portable"],
    link: "https://www.amazon.fr/s?k=nintendo+switch+oled",
    image: "🕹️"
  },
  {
    name: "PC Gaming assemblé",
    description: "PC gamer RTX 4060, Ryzen 5, 16Go RAM, SSD 1To — prêt à jouer.",
    price: 1500,
    priceRange: "luxury",
    category: "Gaming",
    personality: ["gamer"],
    occasion: ["anniversaire", "noël"],
    tags: ["PC", "gaming", "RTX"],
    link: "https://www.amazon.fr/s?k=pc+gaming+rtx+4060",
    image: "💻"
  },

  // ===== FOODIE =====
  // Low
  {
    name: "Livre de cuisine Ottolenghi",
    description: "Le best-seller de recettes végétariennes créatives et colorées.",
    price: 35,
    priceRange: "low",
    category: "Cuisine",
    personality: ["foodie"],
    occasion: ["anniversaire", "noël", "fête", "eid"],
    tags: ["livre", "cuisine", "recettes"],
    link: "https://www.amazon.fr/s?k=ottolenghi+livre+cuisine",
    image: "📗"
  },
  {
    name: "Coffret épices du monde",
    description: "25 épices rares du monde entier, idéales pour explorer de nouvelles saveurs.",
    price: 40,
    priceRange: "low",
    category: "Cuisine",
    personality: ["foodie"],
    occasion: ["anniversaire", "fête", "noël", "eid"],
    tags: ["épices", "cuisine", "saveurs"],
    link: "https://www.amazon.fr/s?k=coffret+epices+monde",
    image: "🌶️"
  },
  {
    name: "Kit raviolis maison",
    description: "Emporte-pièces à raviolis avec rouleau et recettes italiennes.",
    price: 28,
    priceRange: "low",
    category: "Cuisine",
    personality: ["foodie"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["pâtes", "cuisine", "DIY"],
    link: "https://www.amazon.fr/s?k=kit+raviolis+maison",
    image: "🍝"
  },
  // Mid
  {
    name: "Machine à pâtes KitchenAid",
    description: "Accessoire laminoir pour robot KitchenAid, 3 épaisseurs.",
    price: 80,
    priceRange: "mid",
    category: "Cuisine",
    personality: ["foodie"],
    occasion: ["anniversaire", "noël", "mariage"],
    tags: ["pâtes", "kitchenaid", "cuisine"],
    link: "https://www.amazon.fr/s?k=kitchenaid+machine+pates",
    image: "🍜"
  },
  {
    name: "Cours de cuisine en ligne Gordon Ramsay",
    description: "MasterClass de Gordon Ramsay — techniques de chef professionnel.",
    price: 90,
    priceRange: "mid",
    category: "Cuisine",
    personality: ["foodie"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["cours", "chef", "cuisine"],
    link: "https://www.masterclass.com",
    image: "👨‍🍳"
  },
  {
    name: "Coffret dégustation fromages affinés",
    description: "Sélection de 8 fromages affinés artisanaux avec accompagnements.",
    price: 75,
    priceRange: "mid",
    category: "Cuisine",
    personality: ["foodie"],
    occasion: ["anniversaire", "fête", "noël", "mariage"],
    tags: ["fromage", "dégustation", "gastronomie"],
    link: "https://www.amazon.fr/s?k=coffret+fromages+affinés",
    image: "🧀"
  },
  // High
  {
    name: "Couteaux japonais Shun Classic set",
    description: "Set de 3 couteaux japonais forgés, manche pakkawood.",
    price: 280,
    priceRange: "high",
    category: "Cuisine",
    personality: ["foodie"],
    occasion: ["anniversaire", "noël", "mariage"],
    tags: ["couteau", "japonais", "cuisine"],
    link: "https://www.amazon.fr/s?k=couteaux+japonais+shun",
    image: "🔪"
  },
  {
    name: "Robot pâtissier KitchenAid Artisan",
    description: "Robot pâtissier 4.8L, 10 vitesses, avec 3 accessoires inclus.",
    price: 380,
    priceRange: "high",
    category: "Cuisine",
    personality: ["foodie"],
    occasion: ["anniversaire", "noël", "mariage"],
    tags: ["pâtisserie", "kitchenaid", "robot"],
    link: "https://www.amazon.fr/s?k=kitchenaid+artisan",
    image: "🎂"
  },
  // Luxury
  {
    name: "Robot cuiseur Thermomix TM6",
    description: "Le robot cuiseur multifonction le plus avancé du marché.",
    price: 1300,
    priceRange: "luxury",
    category: "Cuisine",
    personality: ["foodie"],
    occasion: ["anniversaire", "noël", "mariage"],
    tags: ["robot", "cuiseur", "thermomix"],
    link: "https://www.vorwerk.fr/thermomix",
    image: "🤖"
  },
  {
    name: "Expérience dîner gastronomique étoilé",
    description: "Bon cadeau pour un dîner 3 services dans un restaurant étoilé Michelin.",
    price: 500,
    priceRange: "luxury",
    category: "Cuisine",
    personality: ["foodie"],
    occasion: ["anniversaire", "fête", "mariage"],
    tags: ["restaurant", "gastronomie", "luxe"],
    link: "https://www.lafourchette.com",
    image: "⭐"
  },
  {
    name: "Cave à vin électrique 46 bouteilles",
    description: "Cave à vin climatisée double zone, silencieuse, design premium.",
    price: 450,
    priceRange: "luxury",
    category: "Cuisine",
    personality: ["foodie"],
    occasion: ["anniversaire", "noël", "mariage"],
    tags: ["vin", "cave", "gastronomie"],
    link: "https://www.amazon.fr/s?k=cave+vin+electrique+46",
    image: "🍷"
  },

  // ===== FASHIONISTA =====
  // Low
  {
    name: "Foulard en soie",
    description: "Foulard 100% soie, motifs géométriques, 90x90cm.",
    price: 45,
    priceRange: "low",
    category: "Mode",
    personality: ["fashionista"],
    occasion: ["anniversaire", "fête", "noël", "eid"],
    tags: ["foulard", "soie", "mode"],
    link: "https://www.amazon.fr/s?k=foulard+soie+femme",
    image: "🧣"
  },
  {
    name: "Trousse de maquillage organiseur",
    description: "Trousse à maquillage transparente avec plusieurs compartiments.",
    price: 30,
    priceRange: "low",
    category: "Mode",
    personality: ["fashionista"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["maquillage", "organiseur", "beauté"],
    link: "https://www.amazon.fr/s?k=trousse+maquillage+organiseur",
    image: "💄"
  },
  {
    name: "Coffret parfum miniatures Sephora",
    description: "Set de 5 miniatures parfums de grandes maisons.",
    price: 48,
    priceRange: "low",
    category: "Mode",
    personality: ["fashionista"],
    occasion: ["anniversaire", "fête", "noël", "eid"],
    tags: ["parfum", "beauté", "miniature"],
    link: "https://www.sephora.fr",
    image: "🌺"
  },
  // Mid
  {
    name: "Lunettes de soleil Ray-Ban Wayfarer",
    description: "Lunettes de soleil iconiques, verres polarisés UV400.",
    price: 160,
    priceRange: "mid",
    category: "Mode",
    personality: ["fashionista"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["lunettes", "ray-ban", "mode"],
    link: "https://www.ray-ban.com",
    image: "🕶️"
  },
  {
    name: "Sac à main canvas Tod's",
    description: "Tote bag en canvas premium avec détails en cuir, format A4.",
    price: 140,
    priceRange: "mid",
    category: "Mode",
    personality: ["fashionista"],
    occasion: ["anniversaire", "noël", "mariage"],
    tags: ["sac", "canvas", "mode"],
    link: "https://www.amazon.fr/s?k=tote+bag+canvas+premium",
    image: "👜"
  },
  {
    name: "Abonnement Vogue Arabia 1 an",
    description: "Abonnement numérique Vogue Arabia avec accès archives.",
    price: 60,
    priceRange: "mid",
    category: "Mode",
    personality: ["fashionista"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["magazine", "mode", "vogue"],
    link: "https://en.vogue.me",
    image: "📰"
  },
  // High
  {
    name: "Montre femme Michael Kors",
    description: "Montre dorée avec bracelet en acier, cadran serti de cristaux.",
    price: 250,
    priceRange: "high",
    category: "Mode",
    personality: ["fashionista"],
    occasion: ["anniversaire", "noël", "mariage", "eid"],
    tags: ["montre", "michael kors", "bijoux"],
    link: "https://www.amazon.fr/s?k=montre+michael+kors+femme",
    image: "⌚"
  },
  {
    name: "Bijou personnalisé or 18 carats",
    description: "Collier ou bracelet en or 18 carats avec gravure personnalisée.",
    price: 300,
    priceRange: "high",
    category: "Mode",
    personality: ["fashionista"],
    occasion: ["anniversaire", "fête", "noël", "eid", "mariage"],
    tags: ["bijou", "or", "personnalisé"],
    link: "https://www.etsy.com/fr/search?q=bijou+personnalisé+or",
    image: "💍"
  },
  // Luxury
  {
    name: "Sac Longchamp Le Pliage",
    description: "L'iconique sac Longchamp en nylon et cuir, taille L.",
    price: 450,
    priceRange: "luxury",
    category: "Mode",
    personality: ["fashionista"],
    occasion: ["anniversaire", "noël", "mariage"],
    tags: ["longchamp", "sac", "luxe"],
    link: "https://www.longchamp.com",
    image: "👛"
  },
  {
    name: "Parfum Chanel N°5 Eau de Parfum",
    description: "L'emblématique Chanel N°5, flacon 100ml.",
    price: 600,
    priceRange: "luxury",
    category: "Mode",
    personality: ["fashionista"],
    occasion: ["anniversaire", "noël", "fête", "eid", "mariage"],
    tags: ["parfum", "chanel", "luxe"],
    link: "https://www.chanel.com",
    image: "🌹"
  },

  // ===== AVENTURIER — suppléments =====
  {
    name: "Couteau multifonction Victorinox",
    description: "Couteau suisse 21 fonctions, indispensable pour tout aventurier.",
    price: 45,
    priceRange: "low",
    category: "Aventure",
    personality: ["aventurier"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["couteau", "survie", "outdoor"],
    link: "https://www.amazon.fr/s?k=victorinox+multifonction",
    image: "🪛"
  },
  {
    name: "Hamac de camping ultraléger",
    description: "Hamac en nylon ripstop, 400g, supporte 200kg, se monte en 2 min.",
    price: 35,
    priceRange: "low",
    category: "Aventure",
    personality: ["aventurier"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["hamac", "camping", "légèreté"],
    link: "https://www.amazon.fr/s?k=hamac+camping+ultraléger",
    image: "🌲"
  },
  {
    name: "Chaussures de randonnée imperméables",
    description: "Chaussures mi-montante Gore-Tex, semelle Vibram, confort toute saison.",
    price: 160,
    priceRange: "mid",
    category: "Aventure",
    personality: ["aventurier"],
    occasion: ["anniversaire", "noël", "eid"],
    tags: ["chaussures", "randonnée", "imperméable"],
    link: "https://www.amazon.fr/s?k=chaussures+randonnée+goretex",
    image: "🥾"
  },
  {
    name: "Veste softshell outdoor",
    description: "Veste légère coupe-vent, stretch 4 directions, parfaite pour la montagne.",
    price: 200,
    priceRange: "high",
    category: "Aventure",
    personality: ["aventurier"],
    occasion: ["anniversaire", "noël"],
    tags: ["veste", "outdoor", "montagne"],
    link: "https://www.amazon.fr/s?k=veste+softshell+outdoor",
    image: "🧥"
  },
  {
    name: "Vélo électrique tout-terrain",
    description: "VTT électrique 250W, autonomie 80km, suspension avant et arrière.",
    price: 1200,
    priceRange: "luxury",
    category: "Aventure",
    personality: ["aventurier"],
    occasion: ["anniversaire", "noël"],
    tags: ["vélo", "électrique", "VTT"],
    link: "https://www.amazon.fr/s?k=velo+electrique+VTT",
    image: "🚵"
  },
  {
    name: "Stage escalade en salle 5 séances",
    description: "5 séances d'initiation à l'escalade avec moniteur certifié.",
    price: 120,
    priceRange: "mid",
    category: "Aventure",
    personality: ["aventurier"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["escalade", "sport", "cours"],
    link: "https://www.decathlon.fr",
    image: "🧗"
  },

  // ===== CRÉATIF — suppléments =====
  {
    name: "Set de peinture acrylique professionnelle",
    description: "24 tubes de peinture acrylique + 10 pinceaux + palette et toiles.",
    price: 48,
    priceRange: "low",
    category: "Créativité",
    personality: ["créatif"],
    occasion: ["anniversaire", "noël", "eid"],
    tags: ["peinture", "art", "acrylique"],
    link: "https://www.amazon.fr/s?k=set+peinture+acrylique+professionnelle",
    image: "🖌️"
  },
  {
    name: "Abonnement Skillshare 1 an",
    description: "Accès illimité à +30 000 cours créatifs en ligne.",
    price: 100,
    priceRange: "mid",
    category: "Créativité",
    personality: ["créatif"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["cours", "créativité", "design"],
    link: "https://www.skillshare.com",
    image: "🎨"
  },
  {
    name: "Kit calligraphie moderne",
    description: "Set de plumes, encres colorées et guide de calligraphie moderne.",
    price: 32,
    priceRange: "low",
    category: "Créativité",
    personality: ["créatif"],
    occasion: ["anniversaire", "fête", "eid", "mariage"],
    tags: ["calligraphie", "écriture", "art"],
    link: "https://www.amazon.fr/s?k=kit+calligraphie+moderne",
    image: "✍️"
  },
  {
    name: "Imprimante 3D Bambu Lab A1 Mini",
    description: "Imprimante 3D compacte, multi-matériaux, parfaite pour les créatifs.",
    price: 400,
    priceRange: "luxury",
    category: "Créativité",
    personality: ["créatif"],
    occasion: ["anniversaire", "noël"],
    tags: ["impression 3D", "technologie", "DIY"],
    link: "https://bambulab.com",
    image: "🖨️"
  },
  {
    name: "Cours de broderie moderne",
    description: "Kit complet + accès à 10 cours vidéo de broderie contemporaine.",
    price: 55,
    priceRange: "mid",
    category: "Créativité",
    personality: ["créatif"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["broderie", "couture", "art"],
    link: "https://www.amazon.fr/s?k=kit+broderie+moderne",
    image: "🧵"
  },
  {
    name: "Ukulélé soprano + cours débutant",
    description: "Ukulélé en bois d'acajou avec accordeur clip + 3 mois de cours en ligne.",
    price: 75,
    priceRange: "mid",
    category: "Musique",
    personality: ["créatif"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["musique", "ukulélé", "instrument"],
    link: "https://www.amazon.fr/s?k=ukulele+soprano+debutant",
    image: "🎸"
  },

  // ===== COSY — suppléments =====
  {
    name: "Coffret bain aux sels de la mer Morte",
    description: "Set de sels de bain minéraux, huile corporelle et gant de massage.",
    price: 32,
    priceRange: "low",
    category: "Bien-être",
    personality: ["cosy"],
    occasion: ["anniversaire", "fête", "noël", "eid"],
    tags: ["bain", "soin", "relaxation"],
    link: "https://www.amazon.fr/s?k=sels+bain+mer+morte",
    image: "🧖"
  },
  {
    name: "Lampe de sel de l'Himalaya",
    description: "Lampe décorative en sel rose, crée une atmosphère chaleureuse et apaisante.",
    price: 38,
    priceRange: "low",
    category: "Maison",
    personality: ["cosy"],
    occasion: ["anniversaire", "fête", "noël", "eid"],
    tags: ["lampe", "décoration", "ambiance"],
    link: "https://www.amazon.fr/s?k=lampe+sel+himalaya",
    image: "🪨"
  },
  {
    name: "Robot aspirateur Roomba",
    description: "Aspirateur robot connecté, programmable via application.",
    price: 280,
    priceRange: "high",
    category: "Maison",
    personality: ["cosy"],
    occasion: ["anniversaire", "noël", "mariage"],
    tags: ["aspirateur", "robot", "maison"],
    link: "https://www.amazon.fr/s?k=roomba+aspirateur+robot",
    image: "🤖"
  },
  {
    name: "Cafetière French Press premium",
    description: "French press double paroi en acier inox, 1L, garde le café chaud 2h.",
    price: 55,
    priceRange: "mid",
    category: "Cuisine",
    personality: ["cosy"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["café", "french press", "maison"],
    link: "https://www.amazon.fr/s?k=french+press+inox+premium",
    image: "☕"
  },
  {
    name: "Projecteur cinéma maison mini",
    description: "Vidéoprojecteur portable 1080p, WiFi, idéal pour les soirées films.",
    price: 230,
    priceRange: "high",
    category: "Maison",
    personality: ["cosy"],
    occasion: ["anniversaire", "noël"],
    tags: ["projecteur", "cinéma", "maison"],
    link: "https://www.amazon.fr/s?k=mini+projecteur+1080p+wifi",
    image: "🎬"
  },
  {
    name: "Abonnement Netflix + Disney+ 6 mois",
    description: "Carte cadeau combinée Netflix et Disney+ pour 6 mois de streaming.",
    price: 80,
    priceRange: "mid",
    category: "Divertissement",
    personality: ["cosy"],
    occasion: ["anniversaire", "fête", "noël", "eid"],
    tags: ["streaming", "films", "séries"],
    link: "https://www.netflix.com",
    image: "📺"
  },

  // ===== INTELLECTUEL — suppléments =====
  {
    name: "Jeu de Go en bambou",
    description: "Plateau de Go en bambou avec pierres de verre, format 19x19.",
    price: 45,
    priceRange: "low",
    category: "Jeux",
    personality: ["intellectuel"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["go", "stratégie", "jeu"],
    link: "https://www.amazon.fr/s?k=jeu+go+bambou",
    image: "⚫"
  },
  {
    name: "Abonnement The Economist 6 mois",
    description: "6 mois d'accès numérique à The Economist, analyses mondiales.",
    price: 90,
    priceRange: "mid",
    category: "Culture",
    personality: ["intellectuel"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["actualité", "économie", "presse"],
    link: "https://www.economist.com",
    image: "🗞️"
  },
  {
    name: "Carte du ciel personnalisée",
    description: "Impression artistique du ciel étoilé à une date et lieu précis.",
    price: 55,
    priceRange: "mid",
    category: "Culture",
    personality: ["intellectuel"],
    occasion: ["anniversaire", "mariage", "eid"],
    tags: ["astronomie", "personnalisé", "art"],
    link: "https://www.etsy.com/fr/search?q=carte+ciel+personnalisee",
    image: "🌌"
  },
  {
    name: "Abonnement Duolingo Super 1 an",
    description: "Apprentissage de langues sans pub avec tous les cours premium.",
    price: 80,
    priceRange: "mid",
    category: "Culture",
    personality: ["intellectuel"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["langue", "apprentissage", "éducation"],
    link: "https://www.duolingo.com",
    image: "🦜"
  },
  {
    name: "Montre mécanique automatique",
    description: "Montre squelette automatique, mécanisme visible, bracelet cuir.",
    price: 350,
    priceRange: "high",
    category: "Mode",
    personality: ["intellectuel"],
    occasion: ["anniversaire", "noël", "eid"],
    tags: ["montre", "mécanique", "précision"],
    link: "https://www.amazon.fr/s?k=montre+mecanique+automatique+squelette",
    image: "🕰️"
  },
  {
    name: "Globe terrestre lumineux interactif",
    description: "Globe terrestre avec LED, 20 modes géographiques et historiques.",
    price: 180,
    priceRange: "high",
    category: "Culture",
    personality: ["intellectuel"],
    occasion: ["anniversaire", "noël", "eid"],
    tags: ["globe", "géographie", "éducation"],
    link: "https://www.amazon.fr/s?k=globe+terrestre+lumineux+interactif",
    image: "🌍"
  },

  // ===== SOCIAL — suppléments =====
  {
    name: "Jeu de Uno édition collector",
    description: "Uno édition spéciale avec cartes illustrées et règles alternatives.",
    price: 25,
    priceRange: "low",
    category: "Jeux",
    personality: ["social"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["uno", "cartes", "famille"],
    link: "https://www.amazon.fr/s?k=uno+edition+collector",
    image: "🃏"
  },
  {
    name: "Set de fondue au chocolat",
    description: "Fontaine à fondue chocolat 3 niveaux avec 12 brochettes.",
    price: 45,
    priceRange: "low",
    category: "Cuisine",
    personality: ["social"],
    occasion: ["anniversaire", "fête", "noël", "eid"],
    tags: ["fondue", "chocolat", "convivial"],
    link: "https://www.amazon.fr/s?k=fontaine+fondue+chocolat",
    image: "🍫"
  },
  {
    name: "Appareil à churros électrique",
    description: "Machine à churros automatique avec moules et recettes incluses.",
    price: 35,
    priceRange: "low",
    category: "Cuisine",
    personality: ["social"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["churros", "cuisine", "convivial"],
    link: "https://www.amazon.fr/s?k=appareil+churros+electrique",
    image: "🥐"
  },
  {
    name: "Appareil à crêpes professionnel",
    description: "Crêpière électrique 35cm avec spatule et raclette en bois.",
    price: 65,
    priceRange: "mid",
    category: "Cuisine",
    personality: ["social"],
    occasion: ["anniversaire", "fête", "noël", "eid"],
    tags: ["crêpe", "cuisine", "convivial"],
    link: "https://www.amazon.fr/s?k=crepiere+electrique+professionnelle",
    image: "🥞"
  },
  {
    name: "Tente de jardin événementielle",
    description: "Tonnelle 3x4m avec parois, idéale pour les fêtes en plein air.",
    price: 320,
    priceRange: "high",
    category: "Maison",
    personality: ["social"],
    occasion: ["anniversaire", "fête", "mariage"],
    tags: ["tente", "jardin", "fête"],
    link: "https://www.amazon.fr/s?k=tonnelle+jardin+3x4",
    image: "🎪"
  },
  {
    name: "Coffret jeux de soirée adultes",
    description: "Coffret 5 jeux de soirée — Taboo, Pictionary, Time's Up et plus.",
    price: 75,
    priceRange: "mid",
    category: "Jeux",
    personality: ["social"],
    occasion: ["anniversaire", "fête", "noël", "eid"],
    tags: ["jeux", "soirée", "convivial"],
    link: "https://www.amazon.fr/s?k=coffret+jeux+soirée+adultes",
    image: "🎉"
  },

  // ===== WELLNESS — suppléments =====
  {
    name: "Bande de résistance fitness set",
    description: "Set de 5 bandes élastiques de résistance différente avec guide d'exercices.",
    price: 22,
    priceRange: "low",
    category: "Sport",
    personality: ["wellness"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["fitness", "sport", "élastique"],
    link: "https://www.amazon.fr/s?k=bandes+resistance+fitness+set",
    image: "🏋️"
  },
  {
    name: "Aromathérapie diffuseur + 6 huiles",
    description: "Diffuseur ultrasonique 500ml avec 6 huiles essentielles bio.",
    price: 48,
    priceRange: "low",
    category: "Bien-être",
    personality: ["wellness"],
    occasion: ["anniversaire", "fête", "noël", "eid"],
    tags: ["aromathérapie", "diffuseur", "huiles"],
    link: "https://www.amazon.fr/s?k=diffuseur+aromatherapie+huiles",
    image: "🌸"
  },
  {
    name: "Abonnement salle de sport 3 mois",
    description: "Carte cadeau 3 mois d'accès illimité salle de sport premium.",
    price: 120,
    priceRange: "mid",
    category: "Sport",
    personality: ["wellness"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["sport", "gym", "fitness"],
    link: "https://www.basic-fit.com",
    image: "💪"
  },
  {
    name: "Appareil de luminothérapie",
    description: "Lampe de luminothérapie 10 000 lux, traitement énergie et humeur.",
    price: 75,
    priceRange: "mid",
    category: "Bien-être",
    personality: ["wellness"],
    occasion: ["anniversaire", "noël"],
    tags: ["luminothérapie", "bien-être", "énergie"],
    link: "https://www.amazon.fr/s?k=lampe+luminotherapie+10000+lux",
    image: "☀️"
  },
  {
    name: "Sauna infrarouge 1 personne",
    description: "Cabine sauna infrarouge portable pliable, chromothérapie incluse.",
    price: 350,
    priceRange: "high",
    category: "Bien-être",
    personality: ["wellness"],
    occasion: ["anniversaire", "noël"],
    tags: ["sauna", "infrarouge", "détox"],
    link: "https://www.amazon.fr/s?k=sauna+infrarouge+portable",
    image: "🧖"
  },
  {
    name: "Coach nutrition en ligne 3 mois",
    description: "Programme personnalisé nutrition et bien-être avec suivi hebdomadaire.",
    price: 200,
    priceRange: "high",
    category: "Bien-être",
    personality: ["wellness"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["nutrition", "coaching", "santé"],
    link: "https://www.mycoach.fr",
    image: "🥗"
  },

  // ===== GAMER — suppléments =====
  {
    name: "Figurine collector gaming",
    description: "Figurine résine collector d'un personnage iconique de jeu vidéo, 25cm.",
    price: 45,
    priceRange: "low",
    category: "Gaming",
    personality: ["gamer"],
    occasion: ["anniversaire", "noël", "eid"],
    tags: ["figurine", "collector", "gaming"],
    link: "https://www.amazon.fr/s?k=figurine+gaming+collector",
    image: "🏆"
  },
  {
    name: "Lampe LED gaming RGB bureau",
    description: "Barre LED RGB 40cm pour bureau, synchronisation avec jeux, USB.",
    price: 28,
    priceRange: "low",
    category: "Gaming",
    personality: ["gamer"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["LED", "RGB", "décoration"],
    link: "https://www.amazon.fr/s?k=lampe+LED+RGB+gaming+bureau",
    image: "💡"
  },
  {
    name: "Souris gaming sans fil Logitech G305",
    description: "Souris gaming légère 200g, 400h d'autonomie, capteur HERO.",
    price: 55,
    priceRange: "low",
    category: "Gaming",
    personality: ["gamer"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["souris", "gaming", "logitech"],
    link: "https://www.amazon.fr/s?k=logitech+g305",
    image: "🖱️"
  },
  {
    name: "Webcam streaming 4K",
    description: "Webcam 4K 60fps avec autofocus, idéale pour le streaming et gaming.",
    price: 150,
    priceRange: "mid",
    category: "Gaming",
    personality: ["gamer"],
    occasion: ["anniversaire", "noël", "eid"],
    tags: ["webcam", "streaming", "4K"],
    link: "https://www.amazon.fr/s?k=webcam+4k+streaming",
    image: "📹"
  },
  {
    name: "Carte graphique RTX 4070",
    description: "GPU NVIDIA RTX 4070, ray-tracing temps réel, 12Go VRAM.",
    price: 700,
    priceRange: "luxury",
    category: "Gaming",
    personality: ["gamer"],
    occasion: ["anniversaire", "noël"],
    tags: ["GPU", "RTX", "PC"],
    link: "https://www.amazon.fr/s?k=rtx+4070",
    image: "🖥️"
  },
  {
    name: "Capture card Elgato HD60 X",
    description: "Carte de capture 4K pour streaming console vers PC.",
    price: 160,
    priceRange: "mid",
    category: "Gaming",
    personality: ["gamer"],
    occasion: ["anniversaire", "noël"],
    tags: ["capture", "streaming", "elgato"],
    link: "https://www.amazon.fr/s?k=elgato+hd60+x",
    image: "🎥"
  },

  // ===== FOODIE — suppléments =====
  {
    name: "Coffret chocolats artisanaux",
    description: "Sélection de 24 chocolats artisanaux de grands chocolatiers.",
    price: 45,
    priceRange: "low",
    category: "Cuisine",
    personality: ["foodie"],
    occasion: ["anniversaire", "fête", "noël", "eid"],
    tags: ["chocolat", "artisanal", "dégustation"],
    link: "https://www.amazon.fr/s?k=coffret+chocolats+artisanaux",
    image: "🍫"
  },
  {
    name: "Cours de sushi à domicile",
    description: "Kit complet + vidéo cours pour préparer des sushis chez soi.",
    price: 65,
    priceRange: "mid",
    category: "Cuisine",
    personality: ["foodie"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["sushi", "cours", "japonais"],
    link: "https://www.amazon.fr/s?k=kit+cours+sushi",
    image: "🍣"
  },
  {
    name: "Machine à glace italienne",
    description: "Sorbetière compacte 1.5L, fait gelato et sorbet en 20 minutes.",
    price: 95,
    priceRange: "mid",
    category: "Cuisine",
    personality: ["foodie"],
    occasion: ["anniversaire", "fête", "noël"],
    tags: ["glace", "gelato", "machine"],
    link: "https://www.amazon.fr/s?k=machine+glace+italienne",
    image: "🍦"
  },
  {
    name: "Coffret huiles d'olive premium",
    description: "Sélection de 5 huiles d'olive extra vierge de terroirs différents.",
    price: 38,
    priceRange: "low",
    category: "Cuisine",
    personality: ["foodie"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["huile", "olive", "gastronomie"],
    link: "https://www.amazon.fr/s?k=coffret+huiles+olive+premium",
    image: "🫒"
  },
  {
    name: "Plancha électrique de table",
    description: "Plancha 2000W, revêtement antiadhésif, thermostat précis.",
    price: 120,
    priceRange: "mid",
    category: "Cuisine",
    personality: ["foodie"],
    occasion: ["anniversaire", "noël", "mariage"],
    tags: ["plancha", "cuisine", "convivial"],
    link: "https://www.amazon.fr/s?k=plancha+electrique+table",
    image: "🔥"
  },

  // ===== FASHIONISTA — suppléments =====
  {
    name: "Pochette de soirée clutch",
    description: "Pochette pailletée dorée, chaîne amovible, pour soirées élégantes.",
    price: 42,
    priceRange: "low",
    category: "Mode",
    personality: ["fashionista"],
    occasion: ["anniversaire", "fête", "eid", "mariage"],
    tags: ["pochette", "soirée", "mode"],
    link: "https://www.amazon.fr/s?k=pochette+soirée+paillettes",
    image: "👝"
  },
  {
    name: "Coffret soin visage Kiehl's",
    description: "Routine 4 étapes Kiehl's — nettoyant, tonique, sérum, crème.",
    price: 85,
    priceRange: "mid",
    category: "Mode",
    personality: ["fashionista"],
    occasion: ["anniversaire", "fête", "noël", "eid"],
    tags: ["soin", "visage", "beauté"],
    link: "https://www.kiehls.fr",
    image: "✨"
  },
  {
    name: "Séance relooking professionnel",
    description: "Consultation image + shopping guidé avec une styliste certifiée.",
    price: 180,
    priceRange: "high",
    category: "Mode",
    personality: ["fashionista"],
    occasion: ["anniversaire", "fête", "mariage"],
    tags: ["relooking", "style", "conseil"],
    link: "https://www.etsy.com/fr/search?q=séance+relooking",
    image: "👗"
  },
  {
    name: "Ceinture en cuir véritable",
    description: "Ceinture artisanale en cuir véritable, boucle dorée, plusieurs tailles.",
    price: 38,
    priceRange: "low",
    category: "Mode",
    personality: ["fashionista"],
    occasion: ["anniversaire", "fête", "eid"],
    tags: ["ceinture", "cuir", "accessoire"],
    link: "https://www.amazon.fr/s?k=ceinture+cuir+véritable",
    image: "👔"
  },
  {
    name: "Abonnement box beauté Birchbox 6 mois",
    description: "6 box beauté mensuelles avec 5 produits cosmétiques sélectionnés.",
    price: 90,
    priceRange: "mid",
    category: "Mode",
    personality: ["fashionista"],
    occasion: ["anniversaire", "fête", "noël", "eid"],
    tags: ["beauté", "box", "cosmétiques"],
    link: "https://www.birchbox.fr",
    image: "💅"
  },
  {
    name: "Montre homme Tag Heuer Formula 1",
    description: "Montre quartz 43mm, lunette céramique, bracelet acier.",
    price: 1500,
    priceRange: "luxury",
    category: "Mode",
    personality: ["fashionista"],
    occasion: ["anniversaire", "noël", "mariage"],
    tags: ["montre", "tag heuer", "luxe"],
    link: "https://www.tagheuer.com",
    image: "⌚"
  }
];

module.exports = gifts;