(function() {
  function injectAll() {

    // =====================
    // 1. OPRAVA HEADERU
    // =====================
    // Najdeme původní Shoptet header
    var shoptetHeader = document.querySelector('#header, .header-main, [id="header"]');
    
    if (shoptetHeader) {
      // Topbar
      var topbar = document.createElement('div');
      topbar.id = 'om-topbar';
      topbar.innerHTML = '<div class="om-topbar-inner"><a href="tel:+420774772405">📞 +420 774 772 405</a><div><a href="/jak-nakupovat/">Jak nakupovat</a> | <a href="/obchodni-podminky/">Obchodní podmínky</a></div></div>';

      // Custom header
      var header = document.createElement('div');
      header.id = 'om-header';
      header.innerHTML = `
        <div class="om-header-inner">
          <a class="om-logo" href="/">
            <img src="https://oldmans.cz/wp-content/themes/rev-klient/assets/img/logo.png" alt="Old Man's">
          </a>
          <a href="/kontakt/" class="om-contact">
            <div class="om-contact-icon">
              <img src="https://oldmans.cz/wp-content/uploads/2025/09/om-icon-map.png" alt="">
            </div>
            <div>
              <div class="om-contact-numb">podpora@oldmans.cz</div>
              <div class="om-contact-text">Napište nám</div>
            </div>
          </a>
          <div class="om-search">
            <form action="/vyhledavani/" method="get">
              <input type="search" name="q" placeholder="Napište, co hledáte..">
              <button type="submit">Hledat</button>
            </form>
          </div>
          <ul class="om-nav">
            <li><a href="/recepty/">🍴 Recepty</a></li>
            <li><a href="/velkoobchod/">🤝 B2B</a></li>
          </ul>
          <div class="om-icons">
            <div class="om-login"><a href="/muj-ucet/">👤</a></div>
            <div class="om-cart"><a href="/kosik/">Prázdný košík</a></div>
          </div>
        </div>`;

      shoptetHeader.parentNode.insertBefore(header, shoptetHeader);
      shoptetHeader.parentNode.insertBefore(topbar, header);
      shoptetHeader.style.display = 'none';
    }

    // =====================
    // 2. NAVIGACE KATEGORIÍ — zajistíme že je viditelná
    // =====================
    var nav = document.querySelector('#navigation, .navigation, [id="navigation"]');
    if (nav) {
      nav.style.display = '';
      nav.style.background = '#fff';
    }

    // =====================
    // 3. HOMEPAGE SEKCE — přidáme pouze na homepage
    // =====================
    if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') return;

    var mainContent = document.querySelector('#content, .content, main, #main, .page-content');
    if (!mainContent) return;

    // --- BESTSELLERY ---
    var bestsellers = document.createElement('div');
    bestsellers.className = 'om-section om-bestsellers';
    bestsellers.innerHTML = `
      <div class="om-section-inner">
        <div class="om-section-header">
          <h2>BESTSELLERY</h2>
          <a href="/stitky/top-produkty/" class="om-btn-more">Ukázat všechny</a>
        </div>
        <div class="om-products-grid" id="om-bestsellers-grid">
          <!-- Produkty načteme přes Shoptet seznam -->
        </div>
      </div>`;

    // --- PARTNEŘI ---
    var partners = document.createElement('div');
    partners.className = 'om-section om-partners';
    partners.innerHTML = `
      <div class="om-section-inner">
        <h3>Naše omáčky najdete</h3>
        <div class="om-partners-track">
          <div class="om-partners-list">
            <img src="https://oldmans.cz/wp-content/uploads/2025/01/oldmans-partner-shell.png" alt="Shell">
            <img src="https://oldmans.cz/wp-content/uploads/2025/01/oldmans-partner-shell-cafe.png" alt="Shell Cafe">
            <img src="https://oldmans.cz/wp-content/uploads/2024/01/oldmans-partner-bageterie-boulevard-logo.png" alt="Bageterie Boulevard">
            <img src="https://oldmans.cz/wp-content/uploads/2023/06/turbopizza.png" alt="Turbo Pizza">
            <img src="https://oldmans.cz/wp-content/uploads/2024/01/oldmans-partner-faency-fries-logo.png" alt="Fancy Fries">
            <img src="https://oldmans.cz/wp-content/uploads/2024/07/oldmans-partner-rohlik-logo.png" alt="Rohlik">
            <img src="https://oldmans.cz/wp-content/uploads/2024/07/oldmans-logo-partner-zvoska.png" alt="Zvoska">
            <img src="https://oldmans.cz/wp-content/uploads/2024/07/oldmans-logo-partner-foodora.png" alt="Foodora">
            <img src="https://oldmans.cz/wp-content/uploads/2024/07/oldmans-logo-partner-fany.png" alt="Fany">
            <img src="https://oldmans.cz/wp-content/uploads/2024/07/oldmans-partner-hotel-u-prince-logo.png" alt="Hotel U Prince">
            <img src="https://oldmans.cz/wp-content/uploads/2024/11/pizza-raketou-logo-partner.png" alt="Raketou">
            <!-- Duplikát pro plynulý loop -->
            <img src="https://oldmans.cz/wp-content/uploads/2025/01/oldmans-partner-shell.png" alt="Shell">
            <img src="https://oldmans.cz/wp-content/uploads/2024/01/oldmans-partner-bageterie-boulevard-logo.png" alt="Bageterie">
            <img src="https://oldmans.cz/wp-content/uploads/2024/07/oldmans-partner-rohlik-logo.png" alt="Rohlik">
          </div>
        </div>
      </div>`;

    // --- KATEGORIE ---
    var categories = document.createElement('div');
    categories.className = 'om-section om-categories';
    categories.innerHTML = `
      <div class="om-section-inner">
        <p class="om-subtitle">Vyberte si dle vaší chuti</p>
        <h2>Kategorie omáček</h2>
        <div class="om-cats-grid">
          <a href="/kategorie/squeeze-blast/" class="om-cat-item">🧴 Squeeze Blast</a>
          <a href="/kategorie/omacky-a-majonezy/" class="om-cat-item">🥫 Omáčky a majonézy</a>
          <a href="/kategorie/salatove-dressingy/" class="om-cat-item">🥗 Salátové dresingy</a>
          <a href="/kategorie/omacky-a-majonezy/chilli-omacky/" class="om-cat-item">🌶️ Chilli omáčky</a>
          <a href="/kategorie/chilli-mash/" class="om-cat-item">🔥 Chilli Mash</a>
          <a href="/kategorie/okurkove-relishe/" class="om-cat-item">🥒 Okurkové Relishe</a>
          <a href="/kategorie/premiove-pomazanky/" class="om-cat-item">🧈 Prémiové pomazánky</a>
          <a href="/kategorie/snacky-a-orechy/" class="om-cat-item">🥜 Snacky a ořechy</a>
          <a href="/kategorie/gumovi-medvidci/" class="om-cat-item">🐻 Gumoví medvídci</a>
        </div>
      </div>`;

    // --- O NÁS ---
    var about = document.createElement('div');
    about.className = 'om-section om-about';
    about.innerHTML = `
      <div class="om-section-inner om-about-inner">
        <div class="om-about-text">
          <h2>OLD MAN's : omáčky na míru</h2>
          <p><strong>RODINNÁ firma THE SAUCE MAKERS s.r.o a značka OLD MAN's - Prémiové Omáčky a Dressingy PRO LIDI, kteří Milují Chuťové Dobrodružství.</strong></p>
          <p>Firma THE SAUCE MAKERS s.r.o., zakládaná v roce 2020, je výsledkem vášně a oddanosti zakladatele Tomáše, který po více než dvě léta sbíral receptury na omáčky z celého světa.</p>
          <a href="/o-nas/" class="om-btn-primary">Více o nás</a>
        </div>
        <div class="om-about-img">
          <img src="https://oldmans.cz/wp-content/themes/rev-klient/assets/img/about-logo.png" alt="Old Man's">
        </div>
      </div>`;

    // --- RECEPTY ---
    var recipes = document.createElement('div');
    recipes.className = 'om-section om-recipes';
    recipes.innerHTML = `
      <div class="om-section-inner">
        <div class="om-section-header">
          <h2>Vybrané recepty</h2>
          <a href="/recepty/" class="om-btn-more">Ukázat všechny</a>
        </div>
        <div class="om-recipes-list">
          <a href="/recepty/smashburger-s-karamelizovanou-cibulkou-a-cheddarovym-dipem/" class="om-recipe-item">🧀 Smashburger s karamelizovanou cibulkou a Cheddarovým dipem</a>
          <a href="/recepty/snidanovy-muffin-se-slaninou-vejcem-a-slaninovou-majonezou/" class="om-recipe-item">🥓 Snídaňový muffin se slaninou, vejcem a Slaninovou Majonézou</a>
          <a href="/recepty/caesar-wrap-s-kuretem-a-parmazanem/" class="om-recipe-item">🥗 Caesar wrap s kuřetem a parmazánem</a>
          <a href="/recepty/loaded-hranolky-s-jalapeno-majonezou-a-cedarem/" class="om-recipe-item">🌶️ Loaded hranolky s Jalapeño Majonézou a čedarem</a>
          <a href="/recepty/pikantni-kureci-tacos-s-habanero-majonezou/" class="om-recipe-item">🌶️🔥 Pikantní kuřecí tacos s Habanero Majonézou</a>
          <a href="/recepty/buffalo-kridylka-s-blue-cheese-dipem/" class="om-recipe-item">🍗 Buffalo křidýlka s blue cheese dipem</a>
        </div>
      </div>`;

    // --- INSTAGRAM ---
    var instagram = document.createElement('div');
    instagram.className = 'om-section om-instagram';
    instagram.innerHTML = `
      <div class="om-section-inner om-insta-inner">
        <div class="om-insta-text">
          <p class="om-subtitle">Sledujte nás</p>
          <h2>Na INSTAGRAMU</h2>
          <p>Chcete být v obraze co se u nás děje? Sledujte nás na instagramu!</p>
          <a href="https://www.instagram.com/old_mans_style/" target="_blank" class="om-btn-primary">Sledovat @OLD_MANS_STYLE</a>
        </div>
      </div>`;

    // Vložíme sekce za ikony výhod (konkurenční výhody)
    var uspSection = document.querySelector('.usp, [class*="benefits"], [class*="advantages"], [class*="usp"]');
    var insertAfter = uspSection || mainContent.firstChild;

    if (uspSection && uspSection.parentNode) {
      var ref = uspSection.nextSibling;
      var parent = uspSection.parentNode;
      [partners, categories, about, recipes, instagram].forEach(function(el) {
        parent.insertBefore(el, ref);
      });
    } else {
      [partners, categories, about, recipes, instagram].forEach(function(el) {
        mainContent.appendChild(el);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectAll);
  } else {
    injectAll();
  }
})();
