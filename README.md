# ☕ CaféLog

> Suis, note et améliore tes extractions café comme un vrai barista.

---

## 🌟 Présentation

**CaféLog** est une web app moderne construite avec **Next.js 14 + TypeScript + Tailwind + ShadCN UI + Drizzle + Neon PostgreSQL**, pensée pour les passionnés d’espresso et d’extraction manuelle.  
L’objectif : centraliser tes cafés, machines et tests d’infusion, pour suivre ton évolution et affiner ton palais tasse après tasse.

---

## 🧭 Fonctionnalités principales

### 🔐 Authentification
- Création de compte par email + mot de passe
- Sessions sécurisées (cookies HttpOnly via NextAuth)
- Pseudo unique pour personnaliser ton espace

### ☕ Tests d’extraction
- Création et suivi de tes tests avec tous les paramètres essentiels :
    - Finesse et quantité de mouture, température, eau, temps d’infusion, pré-infusion, pression…
- Système de **notation** (1–5 étoiles) + **évaluation sensorielle**
- Sélecteurs intelligents pour cafés et machines existants
- Détails visuels clairs et responsive design

### 🌱 Cafés & Machines
- Gestion de ta collection de cafés et de machines
- **Roast level**, **rating**, **tags aromatiques** (fruité, floral, chocolaté…)
- Favoris et filtres par type, origine, ou torréfaction

### ⭐ Favoris & recherche
- Marque tes extractions préférées
- Filtre et trie par méthode, note, machine ou favoris
- **Chips actifs** et **persistance des filtres dans l’URL** pour retrouver une vue précise en un clic

---

## 💻 Stack technique

| Côté | Outils |
|------|---------|
| **Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS, ShadCN UI |
| **Backend** | API Routes Next.js + Drizzle ORM |
| **Base de données** | Neon PostgreSQL |
| **Auth** | NextAuth.js (credentials) |
| **UI/UX** | Dark/light mode, responsive design, skeletons & toasts |

---

## 📱 Expérience utilisateur

CaféLog est pensé pour être **rapide, minimaliste et agréable à utiliser** :
- Interface claire, sans friction
- Navigation fluide entre les sections
- Données persistées en temps réel
- Préparation à une **PWA** pour usage hors ligne et ajout sur écran d’accueil

---

## 🧩 À suivre prochainement (V2+)

Les prochaines versions visent à enrichir la dimension analytique et communautaire de CaféLog :
- 📊 **Statistiques personnelles** : moyennes, tendances, historique visuel de progression
- 🏷️ **TagInput UX-friendly** (chips + suggestions intelligentes)
- 🔍 **Recherche globale** (tous les types confondus)
- 👤 **Page profil** utilisateur
- 🌍 **Partage public** de tests
- 📱 **PWA & appli mobile** (Capacitor / Expo)

---


## 📂 Licence

Projet personnel open-source, distribué sous licence MIT.

---

