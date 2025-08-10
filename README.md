# ☕ CaféLog — Roadmap V2 (RAF)

## 🎯 Objectif
Polisher l'expérience utilisateur (UX/UI), enrichir les données persistées et intégrer les retours clients prioritaires tout en gardant le MVP stable.

---

## ✅ Déjà livré en V1
- Authentification (email + mot de passe) via NextAuth
- Persistance Neon + Drizzle
- Gestion Tests / Cafés / Machines / Favoris
- Création + affichage + suppression avec UI Shadcn
- Sélecteurs de type (slider, texte, etc.)
- Typage strict (`NewTest` vs `Test`)

---

## 📌 V2 — Retours Clients & Améliorations

### 1) **Tests**
- [ ] **Nouveaux champs** dans `tests` :
    - Type de filtre (`filterType`) → select (Bottomless, Simple, Double, Pressurisé…)
    - Quantité de mouture (g) (`doseGrams`)
    - Pré-infusion (s) (`preinfusionSec`)
    - Infusion (s) (`extractionSec`)
    - Finesse de mouture (`grindFineness`) — rename du champ existant
    - Quantité d’eau (`waterQuantity`) → **optionnelle**
- [ ] Ajouter une jauge “Goût global” (1–5)
- [ ] **Edition rapide** depuis la liste (modal ou page `/tests/[id]/edit`)
- [ ] Ordre des champs optimisé (cf. retours)

---

### 2) **Cafés**
- [ ] **Nouvelles colonnes** :
    - Niveau de torréfaction (`roastLevel`) — select (Clair / Moyen / Foncé / Très foncé)
    - Note du café (`rating`) — étoiles (1–5)
- [ ] Tag input amélioré :
    - Dé-duplication
    - Suggestions de tags (fruité, floral, chocolaté…)
- [ ] Renommer “Description” → “Torréfaction / mélange / avis…”
- [ ] Recherche par origine
- [ ] Edition inline depuis la liste

---

### 3) **Machines**
- [ ] (Faible priorité) Champs spécifiques ou détails supplémentaires à définir
- [ ] Possible affichage de photo / image

---

### 4) **UX & UI**
- [ ] Feedback visuel amélioré (toasts, skeleton loading, etc.)
- [ ] Dark mode + thème cohérent
- [ ] Optimiser ordre tabulation dans les formulaires
- [ ] Rendre certains champs optionnels + placeholders explicites

---

## 🛠 Plan technique
1. **Migration Drizzle** :
    - Ajouter les nouvelles colonnes (`tests` + `cafes`)
    - Rendre certains champs optionnels
2. **MAJ types TS** (`Test`, `NewTest`, `Coffee`, `NewCoffee`)
3. **Formulaires** :
    - Ajouter champs et selects correspondants
    - Star rating component réutilisable
4. **API Routes** :
    - Adapter POST / PATCH pour gérer les nouveaux champs
5. **Liste & Edition rapide** :
    - Crayon → modal ou page dédiée
6. **TagInput amélioré** (UX + suggestions)
7. **Recherche cafés** (par origine + roastLevel)

---

## 🚀 Priorisation
1. Migration + MAJ types
2. Form Café (roastLevel + rating)
3. Form Test (nouveaux champs)
4. Edition rapide depuis les listes
5. TagInput amélioré
6. Recherche & filtres

---

## 📅 Timeline indicative
- **Semaine 1** : Migrations + form cafés complet
- **Semaine 2** : Form tests complet + édition rapide
- **Semaine 3** : TagInput amélioré + recherche
- **Semaine 4** : Finitions UI/UX + QA
