# La Compagnie des Mille Ans — Site HTML

Site multipage statique aux couleurs du **logo officiel** : bordeaux, or vieilli, anthracite et ivoire. Compatible avec **GitHub Pages** et n’exige ni serveur, ni compilation, ni base de données.

## Lancer le site

1. Décompresser l’archive ZIP.
2. Ouvrir `index.html` dans un navigateur.
3. Tous les liens entre pages, le menu mobile et le filtrage de la galerie fonctionnent localement.
4. Pour publier sur GitHub Pages, placer **tout le contenu du dossier** à la racine du dépôt, puis activer **Settings > Pages > Deploy from a branch > main / (root)**.

## Intégrer le Google Form

1. Créer le formulaire sur Google Forms.
2. Cliquer sur **Envoyer / Publier**, puis choisir **Intégrer (icône `<>`)** et copier le code d’intégration `iframe` (l’interface peut varier).
3. Extraire uniquement l’URL de l’attribut `src`, de la forme `https://docs.google.com/forms/d/e/…/viewform?embedded=true`.
4. Ouvrir `assets/js/config.js` et renseigner :

```javascript
googleFormEmbedUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdgmyKDTwxPIiueA8l7H4D1eWEiPFF9tioYGYS2K1CcJtqPig/viewform?embedded=true',

```

5. Facultativement, indiquer le lien public dans `googleFormPublicUrl` pour fournir une ouverture dans un nouvel onglet.
6. Tester sur ordinateur et téléphone, vérifier que le formulaire accepte les réponses et que les notifications arrivent au bon compte.

**Important :** le formulaire n’est **pas actif** tant qu’une vraie URL n’est pas indiquée. Aucune adresse de réception n’est inventée. La page `contact.html` contient un état d’attente explicite. Si la collecte d’adresse e-mail, le dépôt de fichiers ou d’autres options sont activés, vérifier les paramètres d’accès et les conditions de confidentialité de Google Forms.

## Ajouter les vraies photographies

Le dossier Windows `C:\Users\bontemst\Desktop\La compagnie des Mille Ans\Communication\Image` est inaccessible depuis cette session. Le ZIP ne contient donc **aucune de tes photographies personnelles**. Il contient en revanche **17 images temporaires générées par IA**, toutes remplaçables sans toucher au HTML.

1. Lire `assets/photos/GUIDE-PHOTOS.txt` pour les noms attendus.
2. Copier les photographies choisies dans `assets/photos/`.
3. Respecter les noms et extensions indiqués dans `assets/photos/GUIDE-PHOTOS.txt`, ou modifier les chemins dans `assets/js/config.js`.
4. Actualiser le navigateur (`Ctrl + F5` sous Windows si la photo précédente reste en cache). Les emplacements se remplacent automatiquement par vos photos.
5. Les images sous le bandeau sont chargées au défilement pour améliorer les performances ; **le bug qui empêchait leur chargement a été corrigé dans `assets/js/site.js`**.

## Charte graphique

Couleurs principales dans `assets/css/styles.css` :
- Bordeaux : `#741c26`
- Or vieilli : `#ad8132`
- Anthracite : `#292929`
- Ivoire : `#faf7f0`

Le logo officiel est présent dans `assets/images/logo-officiel.webp`, avec une copie PNG.

## Structure des pages

- `index.html` — Accueil
- `compagnie.html` — Présentation
- `activites.html` — Vue d’ensemble des activités
- `reconstitutions.html` — Reconstitutions
- `ateliers.html` — Ateliers
- `conferences-gesticulees.html` — Conférences gesticulées
- `conferences.html` — Conférences
- `spectacles.html` — Escrime de spectacle, jonglerie de feu et danse historique
- `periodes.html` — Périodes historiques
- `galerie.html` — Photos avec filtres et agrandissement
- `contact.html` — Contact avec intégration Google Forms
- `mentions-legales.html` — Mentions légales à compléter
- `confidentialite.html` — Page de confidentialité à adapter
- `404.html` — Page introuvable

## Avant publication

- Ajouter les photographies et s’assurer des droits de diffusion.
- Activer et tester Google Forms.
- Compléter les champs entre crochets des mentions légales et de la confidentialité.
- Relire les contenus avant publication : les exemples restent volontairement génériques et n’inventent aucune prestation précise, date ou tarif.
- Vérifier les conditions techniques et les assurances nécessaires aux spectacles de feu.

## Fichiers techniques

- `assets/css/styles.css` — Styles et responsive
- `assets/js/site.js` — Menu mobile, galerie, Google Forms, chargement des photos
- `assets/js/config.js` — URLs et chemins personnalisables
- `assets/photos/GUIDE-PHOTOS.txt` — Guide d’intégration des images
- `assets/images/logo-officiel.webp` — Logo officiel optimisé

## Correctif photos — 11 novembre 2026

Le premier ZIP avait un défaut : les images au chargement différé étaient insérées dans la page seulement après leur chargement. Un navigateur ne charge normalement pas une image marquée `loading="lazy"` tant qu’elle n’est pas dans la page ; seuls les trois visuels prioritaires étaient donc visibles. Cette version insère d’abord chaque image dans la page puis attend son chargement pour masquer le cadre provisoire. Vérification effectuée sur la page d’accueil (10/10 visuels), la galerie (6/6 visuels) et la version mobile.

Aucune bibliothèque JavaScript distante n’est chargée. Les seules ressources externes sont celles du formulaire Google Forms **lorsque vous l’activez**, et les liens explicitement présents vers des sources de confidentialité.


## Photographies réelles — version du 11 novembre 2026

Cette version intègre les **17 photographies fournies par la compagnie**, recadrées et optimisées pour une consultation sur ordinateur et téléphone. Les noms correspondent à `assets/js/config.js`. Voir `assets/photos/GUIDE-PHOTOS.txt` pour la correspondance et les conseils de remplacement. Les photos originales restent à conserver à part ; les copies web sont recadrées pour les mises en page. Le Google Forms reste à configurer.
