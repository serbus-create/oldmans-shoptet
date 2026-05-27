(function() {
  function injectAll() {

    // Skryjeme jen header-top
    var headerTop = document.querySelector('#header .header-top');
    if (headerTop) headerTop.style.display = 'none';

    // Skryjeme původní navigaci Shoptetu
    var headerBottom = document.querySelector('#header .header-bottom');
    if (headerBottom) headerBottom.style.display = 'none';

    // Custom header
    var topbar = document.createElement('div');
    topbar.id = 'om-topbar';
    topbar.innerHTML = '<div class="om-topbar-inner"><a href="tel:+420774772405">📞 +420 774 772 405</a><div><a href="/jak-nakupovat/">Jak nakupovat</a> | <a href="/obchodni-podminky/">Obchodní podmínky</a></div></div>';

    var header = document.createElement('div');
    header.id = 'om-header';
    header.innerHTML = `
      <div class="om-header-inner">
        <a class="om-logo" href="/">
          <img src="https://cdn.myshoptet.com/usr/788253.myshoptet.com/user/logos/oldmans.png" alt="Old Man's">
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
          <form action="/action/ProductSearch/prepareString/" method="post">
            <input type="hidden" name="language" value="cs">
            <input type="search" name="string" placeholder="Napište, co hledáte..">
            <button type="submit">Hledat</button>
          </form>
        </div>
        <ul class="om-nav">
          <li><a href="/recepty/">🍴 Recepty</a></li>
          <li><a href="/velkoobchod/">🤝 B2B</a></li>
        </ul>
        <div class="om-icons">
          <div class="om-login"><a href="/muj-ucet/">👤</a></div>
          <div class="om-cart">
            <a href="/kosik/" class="cart-count toggle-window" data-target="cart" data-hover="true" data-redirect="true">
              <span class="cart-price visible-lg-inline-block" data-testid="headerCartPrice">Prázdný košík</span>
            </a>
          </div>
        </div>
      </div>`;

    // Kategorie navigace — přesně jako na WP
    var catMenu = document.createElement('div');
    catMenu.id = 'om-cat-menu';
    catMenu.innerHTML = `
      <div class="om-cat-menu-inner">
        <ul class="om-cat-list" id="omCatList">
          <li class="cat-favorite"><a href="/stitky/top-produkty/"><span class="cat-icon">⭐</span> Bestseller</a></li>
          <li class="cat-sale"><a href="/stitky/akcni-cena/"><span class="cat-icon">🏷️</span> V akci</a></li>
          <li><a href="/kategorie/omacky-a-majonezy/">Omáčky a majonézy</a></li>
          <li><a href="/kategorie/salatove-dressingy/">Salátové dresingy</a></li>
          <li><a href="/kategorie/chilli-omacky/">Chilli omáčky</a></li>
          <li><a href="/kategorie/chilli-mash/">Chilli Mash</a></li>
          <li><a href="/kategorie/okurkove-relishe/">Okurkové Relishe</a></li>
          <li><a href="/kategorie/premiove-pomazanky/">Prémiové pomazánky</a></li>
          <li><a href="/kategorie/snacky-a-orechy/">Snacky a ořechy</a></li>
          <li><a href="/kategorie/gumovi-medvidci/">Gumoví medvídci</a></li>
          <li class="om-more-btn" id="omMoreBtn" style="display:none">
            <span>≡ Více</span>
            <ul class="om-more-submenu" id="omMoreSubmenu"></ul>
          </li>
        </ul>
      </div>`;

    var shoptetHeader = document.querySelector('#header');
    if (shoptetHeader) {
      shoptetHeader.parentNode.insertBefore(catMenu, shoptetHeader);
      shoptetHeader.parentNode.insertBefore(header, catMenu);
      shoptetHeader.parentNode.insertBefore(topbar, header);
    }

    // Responsive kategorie menu — skryje přebývající položky do "Více"
    setTimeout(function() {
      var list = document.getElementById('omCatList');
      var moreBtn = document.getElementById('omMoreBtn');
      var moreSubmenu = document.getElementById('omMoreSubmenu');
      if (!list || !moreBtn) return;

      var items = Array.from(list.children).filter(function(li) { return li !== moreBtn; });
      var menuWidth = list.offsetWidth;
      var moreWidth = 80;
      var total = 0;
      var overflow = [];

      items.forEach(function(li) { li.style.display = 'inline-flex'; });

      items.forEach(function(li, i) {
        total += li.offsetWidth + 10;
        if (total + moreWidth > menuWidth) {
          overflow.push(i);
        }
      });

      if (overflow.length > 0) {
        overflow.forEach(function(i) {
          items[i].style.display = 'none';
          var clone = items[i].cloneNode(true);
          clone.style.display = 'flex';
          moreSubmenu.appendChild(clone);
        });
        moreBtn.style.display = 'inline-flex';
      }

      moreBtn.addEventListener('mouseenter', function() {
        moreSubmenu.style.display = 'block';
      });
      moreBtn.addEventListener('mouseleave', function() {
        moreSubmenu.style.display = 'none';
      });
    }, 200);

    // Homepage sekce
    if (window.location.pathname !== '/' && window.location.pathname !== '') return;

    var benefitBanner = document.querySelector('.benefitBanner');
    if (!benefitBanner) return;
    var parent = benefitBanner.parentNode;
    var ref = benefitBanner.nextSibling;

    // Partneři
    var partners = document.createElement('div');
    partners.className = 'om-section om-partners';
    partners.innerHTML = `<div class="om-section-inner">
      <h3>Naše omáčky najdete</h3>
      <div class="om-partners-track">
        <div class="om-partners-list">
          <img src="https://oldmans.cz/wp-content/uploads/2025/01/oldmans-partner-shell.png" alt="Shell">
          <img src="https://oldmans.cz/wp-content/uploads/2025/01/oldmans-partner-shell-cafe.png" alt="Shell Cafe">
          <img src="https://oldmans.cz/wp-content/uploads/2024/01/oldmans-partner-bageterie-boulevard-logo.png" alt="Bageterie">
          <img src="https://oldmans.cz/wp-content/uploads/2023/06/turbopizza.png" alt="Turbo Pizza">
          <img src="https://oldmans.cz/wp-content/uploads/2024/01/oldmans-partner-faency-fries-logo.png" alt="Fancy Fries">
          <img src="https://oldmans.cz/wp-content/uploads/2024/07/oldmans-partner-rohlik-logo.png" alt="Rohlik">
          <img src="https://oldmans.cz/wp-content/uploads/2024/07/oldmans-logo-partner-zvoska.png" alt="Zvoska">
          <img src="https://oldmans.cz/wp-content/uploads/2024/07/oldmans-logo-partner-foodora.png" alt="Foodora">
          <img src="https://oldmans.cz/wp-content/uploads/2024/07/oldmans-logo-partner-fany.png" alt="Fany">
          <img src="https://oldmans.cz/wp-content/uploads/2024/07/oldmans-partner-hotel-u-prince-logo.png" alt="Hotel U Prince">
          <img src="https://oldmans.cz/wp-content/uploads/2024/11/pizza-raketou-logo-partner.png" alt="Raketou">
          <img src="https://oldmans.cz/wp-content/uploads/2025/01/oldmans-partner-shell.png" alt="Shell">
          <img src="https://oldmans.cz/wp-content/uploads/2024/01/oldmans-partner-bageterie-boulevard-logo.png" alt="Bageterie">
          <img src="https://oldmans.cz/wp-content/uploads/2024/07/oldmans-partner-rohlik-logo.png" alt="Rohlik">
        </div>
      </div>
    </div>`;

    // Kategorie sekce
    var categories = document.createElement('div');
    categories.className = 'om-section om-categories';
    categories.innerHTML = `<div class="om-section-inner">
      <p class="om-subtitle">Vyberte si dle vaší chuti</p>
      <h2>Kategorie omáček</h2>
      <div class="om-cats-grid">
        <a href="/kategorie/salatove-dressingy--squeeze-blast/" class="om-cat-item">🧴 Squeeze Blast</a>
        <a href="/kategorie/omacky-a-majonezy/" class="om-cat-item">🥫 Omáčky a majonézy</a>
        <a href="/kategorie/salatove-dressingy/" class="om-cat-item">🥗 Salátové dresingy</a>
        <a href="/kategorie/chilli-mash/" class="om-cat-item">🌶️ Chilli omáčky</a>
        <a href="/kategorie/chilli-mash/" class="om-cat-item">🔥 Chilli Mash</a>
        <a href="/kategorie/okurkove-relishe/" class="om-cat-item">🥒 Okurkové Relishe</a>
        <a href="/kategorie/premiove-pomazanky/" class="om-cat-item">🧈 Prémiové pomazánky</a>
        <a href="/kategorie/snacky-a-orechy/" class="om-cat-item">🥜 Snacky a ořechy</a>
        <a href="/kategorie/gumovi-medvidci/" class="om-cat-item">🐻 Gumoví medvídci</a>
      </div>
    </div>`;

    // Recepty
    var recipes = document.createElement('div');
    recipes.className = 'om-section om-recipes';
    recipes.innerHTML = `<div class="om-section-inner">
      <div class="om-section-header">
        <h2>Vybrané recepty</h2>
        <a href="/recepty/" class="om-btn-more">Ukázat všechny</a>
      </div>
      <div class="om-recipes-list">
        <a href="/recepty/" class="om-recipe-item">🧀 Smashburger s karamelizovanou cibulkou a Cheddarovým dipem</a>
        <a href="/recepty/" class="om-recipe-item">🥓 Snídaňový muffin se slaninou, vejcem a Slaninovou Majonézou</a>
        <a href="/recepty/" class="om-recipe-item">🥗 Caesar wrap s kuřetem a parmazánem</a>
        <a href="/recepty/" class="om-recipe-item">🌶️ Loaded hranolky s Jalapeño Majonézou a čedarem</a>
        <a href="/recepty/" class="om-recipe-item">🌶️🔥 Pikantní kuřecí tacos s Habanero Majonézou</a>
        <a href="/recepty/" class="om-recipe-item">🍗 Buffalo křidýlka s blue cheese dipem</a>
      </div>
    </div>`;

    // Instagram
    var instagram = document.createElement('div');
    instagram.className = 'om-section om-instagram';
    instagram.innerHTML = `<div class="om-section-inner om-insta-inner">
      <p class="om-subtitle">Sledujte nás</p>
      <h2>Na INSTAGRAMU</h2>
      <p>Chcete být v obraze co se u nás děje? Sledujte nás na instagramu!</p>
      <a href="https://www.instagram.com/old_mans_style/" target="_blank" class="om-btn-primary">Sledovat @OLD_MANS_STYLE</a>
    </div>`;

    [partners, categories, recipes, instagram].forEach(function(el) {
      parent.insertBefore(el, ref);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectAll);
  } else {
    injectAll();
  }
})();
