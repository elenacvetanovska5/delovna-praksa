
if (typeof document !== 'undefined') {
  function storageGet(key){
    try { return localStorage.getItem(key); } catch(e){ return null; }
  }
  function storageSet(key, value){
    try { localStorage.setItem(key, value); } catch(e){  }
  }

  // ---------- LANGUAGE TOGGLE ----------
  const html = document.documentElement;
  const langToggle = document.getElementById('lang-toggle');
  function setLang(lang){
    html.setAttribute('data-lang', lang);
    html.setAttribute('lang', lang);
    storageSet('klasje-lang', lang);
  }
  langToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-lang');
    setLang(current === 'mk' ? 'en' : 'mk');
  });
  const savedLang = storageGet('klasje-lang');
  if(savedLang) setLang(savedLang);

  // ---------- MOBILE MENU ----------
  const burger = document.getElementById('burger');
  const mobileLinks = document.getElementById('mobile-links');
  burger.addEventListener('click', () => {
    const open = mobileLinks.style.display === 'flex';
    mobileLinks.style.display = open ? 'none' : 'flex';
    burger.setAttribute('aria-expanded', String(!open));
  });
  mobileLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileLinks.style.display = 'none';
  }));

  // ---------- COOKIE BANNER ----------
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieChoice = storageGet('klasje-cookie-choice');
  if(!cookieChoice){
    cookieBanner.classList.add('show');
  }
  document.getElementById('cookie-accept').addEventListener('click', () => {
    storageSet('klasje-cookie-choice', 'all');
    cookieBanner.classList.remove('show');
  });
  document.getElementById('cookie-necessary').addEventListener('click', () => {
    storageSet('klasje-cookie-choice', 'necessary');
    cookieBanner.classList.remove('show');
  });

  // ---------- CONTACT FORM VALIDATION (only present on index.html) ----------
  const form = document.getElementById('contact-form');
  const successBox = document.getElementById('form-success');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      const nameField = document.getElementById('field-name');
      const emailField = document.getElementById('field-email');
      const messageField = document.getElementById('field-message');

      [nameField, emailField, messageField].forEach(f => f.classList.remove('invalid'));

      if(!nameInput.value.trim()){
        nameField.classList.add('invalid'); valid = false;
      }
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRe.test(emailInput.value.trim())){
        emailField.classList.add('invalid'); valid = false;
      }
      if(!messageInput.value.trim()){
        messageField.classList.add('invalid'); valid = false;
      }

      if(valid){
        successBox.style.display = 'block';
        form.reset();
        successBox.scrollIntoView({behavior:'smooth', block:'center'});
      }
    });
  }

  // ---------- BLOG "READ MORE" (expand full article in place) ----------
  document.querySelectorAll('.post-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      const isOpen = target.classList.toggle('open');
      btn.querySelectorAll('.more-label').forEach(el => el.hidden = isOpen);
      btn.querySelectorAll('.less-label').forEach(el => el.hidden = !isOpen);
      if(isOpen){
        target.scrollIntoView({behavior:'smooth', block:'nearest'});
      }
    });
  });

  // ---------- SCROLL REVEAL ----------
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});
  revealEls.forEach(el => io.observe(el));
}
