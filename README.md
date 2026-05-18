# 🫚 Gingembre LLN – Site Web

Site officiel de **Gingembre**, jus frais & boissons chaudes à Louvain-la-Neuve.

## Structure

```
gingembre/
├── index.html          ← page principale
├── css/
│   └── style.css       ← tous les styles
├── js/
│   └── main.js         ← carousel 3D, animations, interactions
└── README.md
```

## Déploiement sur GitHub Pages

1. Créer un repo GitHub (ex: `gingembre-lln`)
2. Uploader tous les fichiers (maintenir la structure de dossiers)
3. Aller dans **Settings → Pages**
4. Source : `Deploy from a branch` → `main` → `/ (root)`
5. Sauvegarder → le site est live sur `https://ton-username.github.io/gingembre-lln`

## Fonctionnalités

- ✅ Carousel 3D en losange (4 smoothies qui tournent)
- ✅ Fruits qui pop au scroll et au clic
- ✅ Explosions de fruits à chaque rotation du carousel
- ✅ Menu complet avec onglets (Piquant / Aromatique / Doux / Gourmand / Chaud)
- ✅ Horaires d'ouverture
- ✅ Google Maps intégré
- ✅ Liens Instagram & Facebook
- ✅ Responsive mobile
- ✅ Animations CSS fluides

## Personnalisation

- **Numéro de téléphone** : dans `index.html`, chercher `+32 (0)000 000 000` et remplacer
- **Adresse Maps** : déjà configurée sur Rue Charlemagne 1, LLN
- **Couleurs** : modifier les variables CSS en haut de `css/style.css`
- **Smoothies** : ajouter/modifier dans les sections `.card-wrap`

## Fonts utilisées

- [Baloo 2](https://fonts.google.com/specimen/Baloo+2) – titres
- [Nunito](https://fonts.google.com/specimen/Nunito) – corps de texte

Chargées depuis Google Fonts (internet requis).
