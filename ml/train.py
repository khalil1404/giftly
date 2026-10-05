"""
CRISP-DM — Giftly ML Model
Phase 1: Business Understanding  → recommend gifts by personality + occasion + budget
Phase 2: Data Understanding      → 144 gifts, 8 personalities, 5 occasions, 4 price ranges
Phase 3: Data Preparation        → encode features, build feature matrix
Phase 4: Modeling                → KNN content-based filtering + Random Forest ranking
Phase 5: Evaluation              → cross-validation accuracy
Phase 6: Deployment              → save model as .pkl for Flask API
"""

import pandas as pd
import numpy as np
from sklearn.neighbors import NearestNeighbors
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder, MultiLabelBinarizer
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import Pipeline
import pickle
import os

print("=" * 50)
print("CRISP-DM — Giftly Recommendation Model")
print("=" * 50)

# ── Phase 2 & 3: Data Understanding & Preparation ──
print("\n📊 Phase 2-3: Chargement et préparation des données...")

df = pd.read_csv('gifts_dataset.csv')
print(f"  → {len(df)} cadeaux chargés")
print(f"  → Personnalités: {df['personality'].nunique()} types")
print(f"  → Prix moyen: {df['price'].mean():.0f} TND")

# Feature matrix for KNN (content-based similarity)
occasion_cols = ['occasion_anniversaire', 'occasion_noël', 'occasion_fête', 'occasion_eid', 'occasion_mariage']
feature_cols = ['personality_encoded', 'priceRange_encoded'] + occasion_cols

X = df[feature_cols].values

# ── Phase 4: Modeling ──
print("\n🤖 Phase 4: Entraînement du modèle KNN...")

# KNN for finding similar gifts
knn = NearestNeighbors(n_neighbors=10, metric='euclidean', algorithm='ball_tree')
knn.fit(X)
print("  → KNN entraîné (10 voisins, distance euclidienne)")

# Random Forest for ranking/scoring gifts
print("\n🌲 Entraînement Random Forest pour le classement...")
y = df['personality_encoded'].values

rf = RandomForestClassifier(
    n_estimators=100,
    max_depth=8,
    random_state=42,
    class_weight='balanced'
)
rf.fit(X, y)

# ── Phase 5: Evaluation ──
print("\n📈 Phase 5: Évaluation...")
scores = cross_val_score(rf, X, y, cv=5, scoring='accuracy')
print(f"  → Précision cross-validation (5-fold): {scores.mean():.2%} ± {scores.std():.2%}")
print(f"  → Scores par fold: {[f'{s:.2%}' for s in scores]}")

feature_importance = pd.DataFrame({
    'feature': feature_cols,
    'importance': rf.feature_importances_
}).sort_values('importance', ascending=False)
print("\n  → Importance des features:")
for _, row in feature_importance.iterrows():
    bar = '█' * int(row['importance'] * 40)
    print(f"     {row['feature']:<35} {bar} {row['importance']:.3f}")

# ── Phase 6: Deployment — Save model ──
print("\n💾 Phase 6: Sauvegarde du modèle...")

personality_map = {
    'aventurier': 0, 'créatif': 1, 'cosy': 2, 'intellectuel': 3,
    'social': 4, 'wellness': 5, 'gamer': 6, 'foodie': 7, 'fashionista': 8
}
price_map = {'low': 0, 'mid': 1, 'high': 2, 'luxury': 3}

model_data = {
    'knn': knn,
    'rf': rf,
    'feature_cols': feature_cols,
    'personality_map': personality_map,
    'price_map': price_map,
    'gifts_df': df,
    'X': X,
}

with open('model.pkl', 'wb') as f:
    pickle.dump(model_data, f)

print("  → model.pkl sauvegardé ✅")
print("\n" + "=" * 50)
print("✅ Entraînement terminé avec succès!")
print("   Lance maintenant: python app.py")
print("=" * 50)
