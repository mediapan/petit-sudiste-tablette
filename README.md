# Petit Sudiste 13 — Tablette kiosque

Application de gestion d'affichage pour tablette murale en location courte durée.

## Fichiers

| Fichier | Rôle |
|---|---|
| `data.json` | Les données affichées (modifié par l'admin) |
| `tablette.html` | Écran kiosque affiché sur la tablette |
| `admin.html` | Panneau de gestion depuis ton téléphone |

---

## Installation — étape par étape

### 1. Créer le repo GitHub

1. Va sur [github.com](https://github.com) → **New repository**
2. Nom : `petit-sudiste-tablette` (ou ce que tu veux)
3. Visibilité : **Public** (nécessaire pour que la tablette lise les données sans authentification)
4. Upload les 3 fichiers

### 2. Activer GitHub Pages

1. Dans ton repo → **Settings** → **Pages**
2. Source : **Deploy from a branch** → branche `main` → dossier `/root`
3. Sauvegarde
4. Attends 2 minutes → tu obtiens l'URL : `https://TON_USERNAME.github.io/TON_REPO/`

Tes deux pages seront accessibles à :
- **Tablette** : `https://TON_USERNAME.github.io/TON_REPO/tablette.html`
- **Admin** : `https://TON_USERNAME.github.io/TON_REPO/admin.html`

### 3. Créer un token GitHub (pour l'admin)

1. GitHub → clic sur ton avatar → **Settings**
2. Tout en bas → **Developer settings**
3. **Personal access tokens** → **Fine-grained tokens** → **Generate new token**
4. Nom : `tablette-admin`
5. Expiration : 1 an
6. Repository access : **Only selected repositories** → choisis ton repo
7. Permissions → **Contents** : `Read and write`
8. Génère et copie le token (commence par `github_pat_...`)

### 4. Configurer les fichiers

**Dans `tablette.html`**, remplace :
```javascript
const GITHUB_USER = "TON_GITHUB_USERNAME";
const GITHUB_REPO = "TON_REPO_NAME";
```

**Dans `admin.html`**, remplace :
```javascript
const GITHUB_TOKEN = "TON_PERSONAL_ACCESS_TOKEN";
const GITHUB_USER  = "TON_GITHUB_USERNAME";
const GITHUB_REPO  = "TON_REPO_NAME";
```

Puis re-upload les fichiers modifiés sur GitHub.

### 5. Installer sur la tablette Android

**Option A — Chrome (simple)**
1. Ouvre Chrome sur la tablette
2. Va sur l'URL de `tablette.html`
3. Menu ⋮ → **Ajouter à l'écran d'accueil**
4. Paramètres Android → **Sécurité** → **Épinglage d'écran** → active
5. Lance l'app → maintiens Aperçu + Retour pour épingler

**Option B — Fully Kiosk Browser (recommandé)**
1. Installe [Fully Kiosk Browser](https://play.google.com/store/apps/details?id=de.ozerov.fully) sur le Play Store
2. URL de démarrage : `https://TON_USERNAME.github.io/TON_REPO/tablette.html`
3. Active le mode kiosque, empêche la mise en veille, plein écran

### 6. Utiliser l'admin

Depuis ton téléphone, va sur :
`https://TON_USERNAME.github.io/TON_REPO/admin.html`

Modifie le contenu → **Publier** → la tablette se met à jour en moins de 30 secondes.

---

## Personnaliser les données de base

Édite `data.json` directement sur GitHub pour changer :
- Le nom de la propriété (`nom`)
- Les coordonnées GPS pour la météo (`lat`, `lon`, `ville`)
- Les règles, infos pratiques, WiFi, etc.

---

## Dépannage

| Problème | Solution |
|---|---|
| La tablette ne se met pas à jour | Vérifier la connexion internet, attendre 30 sec |
| "Erreur 401" à la publication | Token GitHub expiré ou mal configuré |
| La météo ne s'affiche pas | Vérifier les coordonnées GPS dans data.json |
| Page blanche sur la tablette | Vider le cache Chrome |
