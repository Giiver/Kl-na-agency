# Kléa Agency - Site Web

Site vitrine moderne pour Kléa Agency, agence créative spécialisée en photographie, gestion des réseaux sociaux et création de chartes graphiques.

## 🚀 Démarrage Rapide

### Ouvrir le site
1. Ouvrir `index.html` directement dans un navigateur
2. Ou lancer un serveur local :
   ```bash
   python3 -m http.server 8080
   ```
   Puis ouvrir http://localhost:8080

## 📁 Structure du Projet

```
klena-agency-website/
├── index.html              # Page principale
├── css/
│   ├── reset.css          # Reset CSS
│   ├── variables.css      # Variables (couleurs, typo, espacements)
│   ├── components.css     # Composants réutilisables
│   ├── style.css          # Styles principaux
│   ├── animations.css     # Animations
│   └── responsive.css     # Media queries
├── js/
│   ├── main.js            # Navigation, scroll, animations
│   ├── gallery.js         # Lightbox galerie
│   ├── pricing.js         # Onglets tarifs
│   └── forms.js           # Validation formulaire
└── assets/
    └── images/
        ├── logo/          # Logos SVG
        ├── photos/        # Photos portfolio
        └── backgrounds/   # Fonds d'écran
```

## 🎨 Charte Graphique

### Couleurs
| Couleur | Hex |
|---------|-----|
| Cyan | #0097B2 |
| Violet | #481C4B |
| Orange | #FF751F |
| Rose | #FF66C4 |
| Jaune | #FFDE59 |
| Vert | #C1FF72 |

### Typographie
- **Titres** : Montserrat (fallback pour Aileron)
- **Corps** : Alice

## 📱 Sections

1. **Hero** - Accroche principale avec CTA
2. **À propos** - Présentation de l'agence
3. **Services** - 3 services principaux
4. **Tarifs** - Onglets avec formules détaillées
5. **Portfolio** - Galerie photo avec lightbox
6. **Contact** - Formulaire + infos
7. **Footer** - Navigation et réseaux sociaux

## ⚡ Fonctionnalités

- ✅ Design responsive (mobile-first)
- ✅ Navigation sticky avec smooth scroll
- ✅ Menu hamburger mobile
- ✅ Animations au scroll
- ✅ Lightbox galerie photos
- ✅ Système d'onglets pour tarifs
- ✅ Formulaire avec validation temps réel
- ✅ Accessibilité (ARIA, navigation clavier)

## 🛠️ Technologies

- HTML5 sémantique
- CSS3 (Variables, Flexbox, Grid)
- JavaScript Vanilla (ES6+)
- Google Fonts (Alice, Montserrat)

## 📝 Personnalisation

### Modifier les couleurs
Éditer `css/variables.css` :
```css
:root {
    --primary-cyan: #0097B2;
    --primary-purple: #481C4B;
    /* ... */
}
```

### Modifier le contenu
Éditer directement `index.html`

### Ajouter des photos au portfolio
1. Ajouter l'image dans `assets/images/photos/`
2. Ajouter un élément dans la section portfolio :
```html
<div class="gallery-item fade-in" data-index="N">
    <img src="assets/images/photos/votre-image.jpg" alt="Description" loading="lazy">
    <div class="gallery-overlay">
        <span>Titre</span>
    </div>
</div>
```

## 📧 Contact

Pour modifier les informations de contact, éditer la section `#contact` dans `index.html`.

---

© 2026 Kléa Agency. Tous droits réservés.
