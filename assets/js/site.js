/* Site statique sans dépendances : compatible GitHub Pages et consultation locale. */
(() => {
  'use strict';
  const config = window.COMPAGNIE_CONFIG || {};
  const $ = (selector, base = document) => base.querySelector(selector);
  const $$ = (selector, base = document) => [...base.querySelectorAll(selector)];

  // Menu principal mobile
  const menu = $('#menu-principal');
  const toggler = $('.menu-toggle');
  const closeMenu = () => {
    if (!menu || !toggler) return;
    menu.classList.remove('is-open');
    toggler.setAttribute('aria-expanded', 'false');
  };
  if (menu && toggler) {
    toggler.addEventListener('click', () => {
      const opened = menu.classList.toggle('is-open');
      toggler.setAttribute('aria-expanded', String(opened));
    });
    $$('.nav-link', menu).forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
    document.addEventListener('click', event => {
      if (!menu.contains(event.target) && !toggler.contains(event.target)) closeMenu();
    });
  }

  // Mise en évidence de la page active
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  $$('.nav-link').forEach(link => {
    const href = (link.getAttribute('href') || '').split('#')[0];
    if (href === currentPage) link.setAttribute('aria-current', 'page');
  });

  // Photos du site. IMPORTANT : insérer l'élément <img> dans le DOM
  // AVANT d'assigner src. Un <img loading="lazy"> hors du DOM ne se charge pas,
  // ce qui expliquait pourquoi seuls les trois visuels prioritaires apparaissaient.
  const photos = config.photos || {};
  $$('.photo-frame[data-photo]').forEach(frame => {
    const src = photos[frame.dataset.photo];
    if (!src) return;
    const image = document.createElement('img');
    image.alt = frame.dataset.alt || '';
    image.className = 'photo-img';
    image.decoding = 'async';
    if (frame.dataset.eager !== 'true') {
      image.loading = 'lazy';
    } else {
      image.loading = 'eager';
      image.fetchPriority = 'high';
    }
    image.addEventListener('load', () => frame.classList.add('has-photo'), { once: true });
    image.addEventListener('error', () => {
      image.remove(); // Garder le texte de remplacement si une photo est absente.
      frame.classList.remove('has-photo');
      console.warn('Photo introuvable : ' + src);
    }, { once: true });
    frame.prepend(image);
    image.src = src;
  });

  // Filtrage de la galerie, sans dépendance externe.
  const filterButtons = $$('.filter-button');
  const galleryCards = $$('.gallery-item');
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(b => {
      const selected = b === button;
      b.classList.toggle('is-selected', selected);
      b.setAttribute('aria-pressed', String(selected));
    });
    galleryCards.forEach(card => {
      card.hidden = filter !== 'tous' && card.dataset.era !== filter;
    });
  }));

  // Agrandissement des photographies réelles uniquement.
  const lightbox = $('#galerie-dialog');
  if (lightbox && typeof lightbox.showModal === 'function') {
    $$('.gallery-item button').forEach(btn => btn.addEventListener('click', () => {
      const frame = btn.querySelector('.photo-frame');
      const photo = frame && $('.photo-img', frame);
      if (!photo) return;
      const big = $('#galerie-dialog-image');
      const caption = $('#galerie-dialog-caption');
      big.src = photo.src;
      big.alt = photo.alt;
      caption.textContent = btn.dataset.caption || photo.alt;
      lightbox.showModal();
    }));
    $('.dialog-close', lightbox)?.addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', evt => { if (evt.target === lightbox) lightbox.close(); });
  }

  // Google Forms : iframe uniquement quand l'URL d'intégration est renseignée.
  const formBox = $('#google-form-container');
  if (formBox) {
    const raw = String(config.googleFormEmbedUrl || '').trim();
    let formUrl = null;
    try {
      const parsed = new URL(raw);
      if (parsed.protocol === 'https:' && parsed.hostname === 'docs.google.com' &&
          parsed.pathname.includes('/forms/') && parsed.pathname.endsWith('/viewform')) {
        parsed.searchParams.set('embedded', 'true');
        formUrl = parsed.href;
      }
    } catch (_) { /* Aucune URL fournie. */ }
    if (formUrl) {
      const iframe = document.createElement('iframe');
      iframe.src = formUrl;
      iframe.title = 'Formulaire de contact Google Forms — La Compagnie des Mille Ans';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.className = 'google-form-iframe';
      formBox.replaceChildren(iframe);
      formBox.classList.add('is-configured');
    } else if (raw) {
      $('.form-setup-message', formBox)?.insertAdjacentHTML('beforeend',
        '<p class="form-error">Le lien doit être une URL d’intégration Google Forms au format docs.google.com/forms/…/viewform.</p>');
    }
    const publicUrl = String(config.googleFormPublicUrl || '').trim();
    const formExternalLink = $('#google-form-external');
    if (formExternalLink) {
      try {
        const p = new URL(publicUrl);
        if (p.protocol === 'https:' && (p.hostname === 'docs.google.com' || p.hostname === 'forms.gle')) {
          formExternalLink.href = p.href;
          formExternalLink.hidden = false;
        }
      } catch (_) { /* lien non configuré */ }
    }
  }

  const emailLink = $('#email-public');
  if (emailLink && config.emailPublic) {
    emailLink.href = `mailto:${config.emailPublic}`;
    emailLink.textContent = config.emailPublic;
    emailLink.hidden = false;
  }
  const telephoneLink = $('#telephone-public');
  if (telephoneLink && config.telephonePublic) {
    const digits = String(config.telephonePublic).replace(/[^+\d]/g, '');
    telephoneLink.href = `tel:${digits}`;
    telephoneLink.textContent = config.telephonePublic;
    telephoneLink.hidden = false;
  }

  // Pied de page : date automatiquement actualisée.
  $$('.current-year').forEach(el => { el.textContent = String(new Date().getFullYear()); });
})();
