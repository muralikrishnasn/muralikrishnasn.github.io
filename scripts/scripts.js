(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    const tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
    const tabPanels = {
      profile: document.getElementById('tab-profile'),
      research: document.getElementById('tab-research'),
      teaching: document.getElementById('tab-teaching'),
      collab: document.getElementById('tab-collab'),
      pubs: document.getElementById('tab-pubs'),
      events: document.getElementById('tab-events'),
      ann: document.getElementById('tab-ann'),
    };

    function activateTab(key, scroll = true) {
      if (!tabPanels[key]) return;

      // toggle buttons
      tabButtons.forEach(btn => btn.setAttribute('aria-selected', 'false'));
      const currentBtn = document.getElementById('tabbtn-' + key);
      if (currentBtn) currentBtn.setAttribute('aria-selected', 'true');

      // toggle panels
      Object.values(tabPanels).forEach(panel => panel && panel.classList.remove('active'));
      const panel = tabPanels[key];
      if (panel) {
        panel.classList.add('active');
        if (scroll) {
          panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }

    // Handle clicks (with scroll)
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = (btn.id || '').replace('tabbtn-', '');
        activateTab(id, true);
        if (history.replaceState) history.replaceState(null, '', '#' + id);
      });
    });

    // Initial load (without scroll)
    const hash = (location.hash || '').replace('#','') || 'profile';
    activateTab(tabPanels[hash] ? hash : 'profile', false);

    // Back-to-top
    const toTop = document.querySelector('.to-top');
    if (toTop) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) toTop.classList.add('show');
        else toTop.classList.remove('show');
      });
      toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
  });
})();
