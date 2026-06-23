# 🛒 myT9adiya

**myT9adiya** est une application mobile moderne et intuitive de gestion de liste de courses (T9adiya en darija marocaine). Conçue avec **React Native** et **Expo**, elle permet aux utilisateurs de gérer efficacement leurs achats au quotidien, le tout avec une interface sombre (Dark Mode) élégante et une sauvegarde locale sécurisée.

---

## ✨ Fonctionnalités Principales

- **📝 Gestion des Articles :** Ajoutez, modifiez et supprimez vos produits facilement.
- **✅ Suivi des Achats :** Cochez les articles une fois placés dans votre panier.
- **💾 Sauvegarde Hors-Ligne :** Toutes vos données sont stockées localement sur votre appareil grâce à **SQLite** (aucune connexion Internet requise).
- **🌙 Interface Moderne :** Un design élégant et fluide, avec un thème sombre optimisé pour le confort visuel.
- **📱 Multi-Plateforme :** Compatible Android et iOS.

---

## 🛠️ Stack Technique

- **Framework :** [React Native](https://reactnative.dev/)
- **Outil de développement :** [Expo](https://expo.dev/) (Nouvelle Architecture activée)
- **Navigation :** [React Navigation v7](https://reactnavigation.org/)
- **Base de données :** [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- **Composants UI :** Expo Checkbox, React Native Safe Area Context

---

## 📂 Architecture du Projet

```text
myT9adiya/
├── assets/                 # Icônes et images (splash screen, icônes d'application)
├── src/
│   ├── components/         # Composants réutilisables (ex: ProductItem.js)
│   ├── database/           # Configuration et requêtes SQLite (db.js)
│   ├── navigation/         # Configuration des routes (AppNavigator.js)
│   └── screens/            # Vues principales de l'application
│       ├── HomeScreen.js   # Liste principale des courses
│       ├── FormScreen.js   # Formulaire d'ajout/modification
│       └── DetailScreen.js # Détails d'un article spécifique
├── App.js                  # Point d'entrée de l'application
├── app.json                # Configuration Expo
└── package.json            # Dépendances et scripts
```

---

## 🚀 Installation & Exécution Locale

Pour lancer le projet sur votre machine locale, suivez ces étapes :

### 1. Prérequis
- [Node.js](https://nodejs.org/) installé sur votre machine.
- L'application **Expo Go** installée sur votre smartphone (iOS ou Android), ou un émulateur configuré.

### 2. Cloner le dépôt
```bash
git clone https://github.com/medilyass37/MyT9adiya.git
cd MyT9adiya
```

### 3. Installer les dépendances
```bash
npm install
```

### 4. Lancer le serveur de développement
```bash
npx expo start
```
*Une fois le serveur lancé, scannez le QR code affiché dans votre terminal avec l'application Expo Go (Android) ou l'application Appareil Photo (iOS).*

---

## 🤝 Contribution

Les contributions, problèmes et demandes de fonctionnalités sont les bienvenus !
N'hésitez pas à consulter la page des [issues](https://github.com/medilyass37/MyT9adiya/issues) si vous souhaitez contribuer.

---

## 📜 Licence

Ce projet est conçu pour un usage personnel et éducatif.

---
*Fait avec ❤️ par [medilyass37](https://github.com/medilyass37)*
