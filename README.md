# Portfolio - Paul Tallon

Bienvenue sur le dépôt de mon portfolio. Ce projet est une expérience web immersive utilisant une interface **Terminal** pour présenter mon parcours et mes projets.

## 🚀 Concept

Ce portfolio a été conçu pour mettre en avant mon profil de **Développeur Symfony Freelance** d'une manière créative et technique. Il propose une interface en ligne de commande réaliste avec historique, auto-complétion et commandes personnalisées pour explorer mon univers.

## 🛠️ Stack Technique

- **Framework** : [Vue.js 3](https://vuejs.org/) (SFC, Composition API)
- **Outil de Build** : [Vite](https://vitejs.dev/)
- **Stylisation** : [TailwindCSS](https://tailwindcss.com/)
- **Icônes** : [Lucide Vue Next](https://lucide.dev/)
- **Déploiement** : (Vercel/Netlify/GitHub Pages selon configuration)

## ✨ Fonctionnalités Clés

- **Commandes disponibles** : `help`, `about`, `skills`, `projects`, `open [id]`, `clear`, `contact`, `hire-me`.
- **Animation Typewriter** : Rendu fluide et séquentiel des sorties du terminal.
- **Liens cliquables** : Les URLs dans le terminal sont transformées dynamiquement en liens interactifs.
- **Navigation au clavier** : Utilisation des flèches pour naviguer dans l'historique (si implémenté).

## 📂 Structure du Projet

- `src/components/terminal/` : Composants de l'interface Terminal.
- `src/data/` : Fichiers JSON contenant les données du profil (`profile.json`) et des projets (`projects.json`).
- `src/views/` : Vues principales de l'application.

## 🛠️ Installation et Lancement

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/paultallon/portfolio.git
   cd portfolio
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

4. **Build pour la production** :
   ```bash
   npm run build
   ```

## 📝 Mise à jour des données

Pour personnaliser le portfolio, modifiez simplement les fichiers dans `src/data/` :
- **Profil** : `src/data/profile.json`
- **Projets** : `src/data/projects.json`

---
Développé avec passion par **Paul Tallon**.

