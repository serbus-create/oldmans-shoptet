(function () {

  /* =====================================================
     OLD MAN'S Shoptet – Custom Header + Homepage sekce
     GitHub: serbus-create/oldmans-shoptet
     Verze: 3.0
     ===================================================== */

  function injectAll() {

    /* -------------------------------------------------
       1. SKRYJEME PŮVODNÍ SHOPTET HEADER
    ------------------------------------------------- */
    var headerTop = document.querySelector('#header .header-top');
    if (headerTop) headerTop.style.display = 'none';
    var headerBottom = document.querySelector('#header .header-bottom');
    if (headerBottom) headerBottom.style.display = 'none';

    /* -------------------------------------------------
       2. TOP BAR
    ------------------------------------------------- */
    var topbar = document.createElement('div');
    topbar.id = 'om-topbar';
    topbar.innerHTML = '<div class="om-topbar-inner"><a href="tel:+420774772405">📞 +420 774 772 405</a><div><a href="/jak-nakupovat/">Jak nakupovat</a> | <a href="/obchodni-podminky/">Obchodní podmínky</a></div></div>';

    /* -------------------------------------------------
       3. HLAVNÍ HEADER
    ------------------------------------------------- */
    var header = document.createElement('div');
    header.id = 'om-header';
    header.innerHTML = `
      <div class="om-header-inner">
        <a class="om-logo" href="/">
          <img src="https://cdn.myshoptet.com/usr/788253.myshoptet.com/user/logos/oldmans.png" alt="Old Man's">
        </a>
        <a href="/kontakt/" class="om-contact">
          <div class="om-contact-icon">
            <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/conversation.png" alt="">
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
              <span id="om-cart-price" class="cart-price">Košík</span>
            </a>
          </div>
        </div>
      </div>`;

    /* -------------------------------------------------
       4. KATEGORIE MENU
    ------------------------------------------------- */
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

    /* Vložíme header před #header */
    var shoptetHeader = document.querySelector('#header');
    if (shoptetHeader) {
      shoptetHeader.parentNode.insertBefore(catMenu, shoptetHeader);
      shoptetHeader.parentNode.insertBefore(header, catMenu);
      shoptetHeader.parentNode.insertBefore(topbar, header);
    }

    /* -------------------------------------------------
       5. RESPONSIVE KATEGORIE MENU – overflow do "Více"
    ------------------------------------------------- */
    setTimeout(function () {
      var list = document.getElementById('omCatList');
      var moreBtn = document.getElementById('omMoreBtn');
      var moreSubmenu = document.getElementById('omMoreSubmenu');
      if (!list || !moreBtn) return;

      var items = Array.from(list.children).filter(function (li) { return li !== moreBtn; });
      var menuWidth = list.offsetWidth;
      var moreWidth = 90;
      var total = 0;
      var overflow = [];

      items.forEach(function (li) { li.style.display = 'inline-flex'; });
      items.forEach(function (li, i) {
        total += li.offsetWidth + 4;
        if (total + moreWidth > menuWidth) overflow.push(i);
      });

      if (overflow.length > 0) {
        overflow.forEach(function (i) {
          items[i].style.display = 'none';
          var clone = items[i].cloneNode(true);
          clone.style.display = 'flex';
          moreSubmenu.appendChild(clone);
        });
        moreBtn.style.display = 'inline-flex';
      }

      moreBtn.addEventListener('mouseenter', function () { moreSubmenu.style.display = 'block'; });
      moreBtn.addEventListener('mouseleave', function () { moreSubmenu.style.display = 'none'; });
    }, 250);

    /* -------------------------------------------------
       6. DYNAMICKÝ KOŠÍK – číst ze Shoptet DOM
    ------------------------------------------------- */
    function syncCart() {
      var priceEl = document.querySelector('.header-cart-total, .cart-total-price, [data-testid="headerCartPrice"]');
      var countEl = document.querySelector('.header-cart-items-count, .cart-count-value, [data-testid="headerCartCount"]');
      var omPrice = document.getElementById('om-cart-price');
      if (!omPrice) return;

      var price = priceEl ? priceEl.textContent.trim() : '';
      var count = countEl ? countEl.textContent.trim() : '';

      if (price && price !== '0' && price !== '0 Kč') {
        omPrice.textContent = (count ? count + ' × ' : '') + price;
      } else {
        omPrice.textContent = 'Prázdný košík';
      }
    }
    setTimeout(syncCart, 800);
    setTimeout(syncCart, 2000);
    document.addEventListener('click', function () { setTimeout(syncCart, 500); });

    /* -------------------------------------------------
       7. HOMEPAGE SEKCE
       Vkládáme za .benefitBanner (USP lišta Shoptetu)
    ------------------------------------------------- */
    if (window.location.pathname !== '/' && window.location.pathname !== '') return;

    var benefitBanner = document.querySelector('.benefitBanner');
    if (!benefitBanner) return;
    var parent = benefitBanner.parentNode;
    var ref = benefitBanner.nextSibling;

    /* --- 7a. PARTNEŘI (scrollující pás) --- */
    var partners = document.createElement('div');
    partners.className = 'om-section om-partners';
    partners.innerHTML = `<div class="om-section-inner">
      <h3>Naše omáčky najdete</h3>
      <div class="om-partners-track">
        <div class="om-partners-list">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-partner-shell.png" alt="Shell">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-partner-shell-cafe.png" alt="Shell Cafe">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-partner-bageterie-boulevard-logo.png" alt="Bageterie">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/turbopizza.png" alt="Turbo Pizza">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-partner-faency-fries-logo.png" alt="Fancy Fries">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/bagel-lange.png" alt="Bagel Lounge">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-partner-rohlik-logo.png" alt="Rohlik">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-logo-partner-zvoska.png" alt="Zvoska">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-logo-partner-foodora.png" alt="Foodora">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-logo-partner-fany.png" alt="Fany">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/ruds-pizza-partner-om.jpg" alt="Ruds Pizza">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-logo-partner-jalta.png" alt="Jalta">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-partner-hotel-u-prince-logo.png" alt="Hotel U Prince">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/pizza-raketou-logo-partner.png" alt="Raketou">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-partner-bauer-group-logo.png" alt="Bauer Group">
          <!-- duplikát pro plynulé scrollování -->
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-partner-shell.png" alt="Shell">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-partner-bageterie-boulevard-logo.png" alt="Bageterie">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-partner-rohlik-logo.png" alt="Rohlik">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/turbopizza.png" alt="Turbo Pizza">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-logo-partner-foodora.png" alt="Foodora">
        </div>
      </div>
    </div>`;

    /* --- 7b. O NÁS --- */
    var about = document.createElement('div');
    about.className = 'om-section om-about';
    about.innerHTML = `<div class="om-section-inner">
      <div class="om-about-inner">
        <div class="om-about-text">
          <h2>OLD MAN's : omáčky na míru</h2>
          <p><strong>RODINNÁ firma THE SAUCE MAKERS s.r.o a značka OLD MAN's – Prémiové Omáčky a Dressingy PRO LIDI, kteří Milují Chuťové Dobrodružství.</strong></p>
          <p>Firma zakládaná v roce 2020 je výsledkem vášně zakladatele Tomáše, který sbíral receptury na omáčky z celého světa. Jeho touha propojit různé kuchyně a kultury vedla k vytvoření značky OLD MAN's.</p>
          <p>OLD MAN's přináší prémiové omáčky a dressingy, které mají potěšit chuťové buňky a obohatit vaše pokrmy.</p>
          <a href="/o-nas/" class="om-btn-red">Více o nás</a>
        </div>
        <div class="om-about-img">
          <img src="https://cdn.myshoptet.com/usr/788253.myshoptet.com/user/logos/oldmans.png" alt="OLD MAN'S">
        </div>
      </div>
    </div>`;

    /* --- 7c. KATEGORIE OMÁČEK --- */
    var categories = document.createElement('div');
    categories.className = 'om-section om-categories';
    categories.innerHTML = `<div class="om-section-inner">
      <p class="om-subtitle">Vyberte si dle vaší chuti</p>
      <h2><span>Kategorie</span> omáček</h2>
      <div class="om-cats-grid">
        <a href="/kategorie/salatove-dressingy--squeeze-blast/" class="om-cat-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/squeeze-blast.png" alt=""> Squeeze Blast
        </a>
        <a href="/kategorie/omacky-a-majonezy/" class="om-cat-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/specials-oldmans.png" alt=""> Omáčky a majonézy
        </a>
        <a href="/kategorie/omacky-a-majonezy--burger-a-steak/" class="om-cat-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/burger.png" alt=""> Burger a steak
        </a>
        <a href="/kategorie/chilli-omacky/" class="om-cat-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-icons-chilli.png" alt=""> Chilli omáčky
        </a>
        <a href="/kategorie/salatove-dressingy/" class="om-cat-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-icons-salads.png" alt=""> Salátové dresingy
        </a>
        <a href="/kategorie/omacky-a-majonezy--ceska-klasika/" class="om-cat-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/czech-republic.png" alt=""> Česká klasika
        </a>
        <a href="/kategorie/chilli-mash/" class="om-cat-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/chilli-mash.png" alt=""> Chilli Mash
        </a>
        <a href="/kategorie/okurkove-relishe/" class="om-cat-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/cucumber.png" alt=""> Okurkové Relishe
        </a>
        <a href="/kategorie/premiove-pomazanky/" class="om-cat-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/sauce-cat.png" alt=""> Prémiové pomazánky
        </a>
        <a href="/kategorie/snacky-a-orechy/" class="om-cat-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/nuts.png" alt=""> Snacky a ořechy
        </a>
        <a href="/kategorie/gumovi-medvidci/" class="om-cat-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/bears.png" alt=""> Gumoví medvídci
        </a>
      </div>
    </div>`;

    /* --- 7d. NAPSALI O NÁS (Apetit) --- */
    var apetit = document.createElement('div');
    apetit.className = 'om-section om-apetit';
    apetit.innerHTML = `<div class="om-section-inner">
      <div class="om-apetit-inner">
        <div class="om-apetit-img">
          <a href="https://www.apetitonline.cz/old-mans-premiova-kvalita-v-kazde-lahvi" target="_blank">
            <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/foto-clanek.jpg" alt="Apetit clanek">
          </a>
        </div>
        <div class="om-apetit-text">
          <img src="https://www.gastrotek.cz/assets/img/partners/apetit.jpg" alt="Apetit" class="om-apetit-logo">
          <h2>Napsali o nás</h2>
          <p>Značka OLD MAN's se stala známou v gastronomických kruzích díky svým prémiovým omáčkám a dressingům. Společnost byla založena z potřeby nabídnout trhu produkty, které svou chutí a složením vynikají nad běžnými alternativami.</p>
          <p>Nyní se značka připravuje na vstup na retailový trh, aby i domácí kuchaři mohli ochutnat prémiovost, kterou doposud nabízeli pouze restaurace.</p>
          <p><em>Apetit (apetitonline.cz)</em></p>
          <a href="https://www.apetitonline.cz/old-mans-premiova-kvalita-v-kazde-lahvi" target="_blank" class="om-btn-red">Přečíst celý článek</a>
        </div>
      </div>
    </div>`;

    /* --- 7e. RECEPTY S OBRÁZKY --- */
    var recipes = document.createElement('div');
    recipes.className = 'om-section om-recipes';
    recipes.innerHTML = `<div class="om-section-inner">
      <div class="om-section-header">
        <h2>🍴 Vybrané recepty</h2>
        <a href="/recepty/" class="om-btn-more">Ukázat všechny</a>
      </div>
      <div class="om-recipes-grid">
        <a href="/recepty/smashburger-s-karamelizovanou-cibulkou-a-cheddarovym-dipem/" class="om-recipe-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/smashburger-s-karamelizovanou-cibulkou-a-cheddarovym-dipem.jpg" alt="">
          <div class="om-recipe-title">🧀 Smashburger s karamelizovanou cibulkou a Cheddarovým dipem</div>
        </a>
        <a href="/recepty/snidanovy-muffin-se-slaninou-vejcem-a-slaninovou-majonezou/" class="om-recipe-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/snidanovy-muffin-se-slaninou-vejcem-a-slaninovou-majonezou.jpg" alt="">
          <div class="om-recipe-title">🥓 Snídaňový muffin se slaninou, vejcem a Slaninovou Majonézou</div>
        </a>
        <a href="/recepty/caesar-wrap-s-kuretem-a-parmazanem/" class="om-recipe-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/caesar-wrap-s-kuretem-a-parmazanem.jpg" alt="">
          <div class="om-recipe-title">🥗 Caesar wrap s kuřetem a parmazánem</div>
        </a>
        <a href="/recepty/loaded-hranolky-s-jalapeno-majonezou-a-cedarem/" class="om-recipe-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/loaded-hranolky-s-jalapeno-majonezou-a-cedarem.jpg" alt="">
          <div class="om-recipe-title">🌶️ Loaded hranolky s Jalapeño Majonézou a čedarem</div>
        </a>
        <a href="/recepty/pikantni-kureci-tacos-s-habanero-majonezou/" class="om-recipe-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/pikantni-kureci-tacos-s-habanero-majonezou.jpg" alt="">
          <div class="om-recipe-title">🌶️🔥 Pikantní kuřecí tacos s Habanero Majonézou</div>
        </a>
        <a href="/recepty/grilovana-bbq-zebra-s-cesnekovo-bbq-majonezou/" class="om-recipe-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/grilovana-bbq-zebra-s-cesnekovo-bbq-majonezou.jpg" alt="">
          <div class="om-recipe-title">🧄 Grilovaná BBQ žebra s česnekovo-BBQ majonézou</div>
        </a>
        <a href="/recepty/buffalo-kridylka-s-blue-cheese-dipem/" class="om-recipe-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/buffalo-kridylka-s-blue-cheese-dipem.jpg" alt="">
          <div class="om-recipe-title">🍗 Buffalo křidýlka s blue cheese dipem</div>
        </a>
        <a href="/recepty/luxusni-sendvic-s-roastbeefem-a-lanyzovou-majonezou/" class="om-recipe-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/luxusni-sendvic-s-roastbeefem-a-lanyzovou-majonezou.jpg" alt="">
          <div class="om-recipe-title">🌱 Luxusní sendvič s roastbeefem a lanýžovou majonézou</div>
        </a>
      </div>
    </div>`;

    /* --- 7f. INSTAGRAM --- */
    var instagram = document.createElement('div');
    instagram.className = 'om-section om-instagram';
    instagram.innerHTML = `<div class="om-section-inner">
      <div class="om-insta-inner">
        <div class="om-insta-text">
          <p class="om-subtitle">Sledujte nás</p>
          <h2>Na INSTAGRAMU</h2>
          <p>Chcete být v obraze co se u nás děje, nebo jestli náhodou neděláme novou omáčku?</p>
          <p><strong>Sledujte nás na instagramu a dozvíte se víc!</strong></p>
          <a href="https://www.instagram.com/old_mans_style/" target="_blank" class="om-btn-primary">📸 Sledovat @OLD_MANS_STYLE</a>
        </div>
        <div class="om-insta-grid">
          <a href="https://www.instagram.com/old_mans_style/" target="_blank"><img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-ig-01.webp" alt=""></a>
          <a href="https://www.instagram.com/old_mans_style/" target="_blank"><img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-ig-02.webp" alt=""></a>
          <a href="https://www.instagram.com/old_mans_style/" target="_blank"><img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-ig-03.webp" alt=""></a>
          <a href="https://www.instagram.com/old_mans_style/" target="_blank"><img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-ig-04.webp" alt=""></a>
        </div>
      </div>
    </div>`;

    /* Shoptet produktové sekce */
    var bestsellers = document.querySelector('.homepage-products-heading-1');
    var bestsellersWrapper = bestsellers ? bestsellers.nextElementSibling : null;
    var sale = document.querySelector('.homepage-products-heading-2');
    var saleWrapper = sale ? sale.nextElementSibling : null;

    /* Pomocná funkce — vloží element ZA jiný element */
    function insertAfter(newEl, refEl) {
      if (refEl && refEl.parentNode) {
        refEl.parentNode.insertBefore(newEl, refEl.nextSibling);
      } else {
        parent.appendChild(newEl);
      }
    }

    /* POŘADÍ dle originálu oldmans.cz:
       USP → Bestsellery → Partneři → O nás → Kategorie → Apetit
       → Omáčky ve slevě → Recepty → Instagram */

    var anchor = bestsellersWrapper || benefitBanner;
    insertAfter(partners, anchor);
    insertAfter(about, partners);
    insertAfter(categories, about);
    insertAfter(apetit, categories);

    /* Přesuneme "Omáčky ve slevě" za Apetit */
    if (sale && saleWrapper) {
      insertAfter(sale, apetit);
      insertAfter(saleWrapper, sale);
    }

    var afterSale = saleWrapper || apetit;
    insertAfter(recipes, afterSale);
    insertAfter(instagram, recipes);

    /* MutationObserver — čeká až Shoptet načte produkty a pak je nastyluje */
    function fixProductCards() {
      document.querySelectorAll('.products-block .product').forEach(function(el) {
        el.style.setProperty('width', '220px', 'important');
        el.style.setProperty('min-width', '220px', 'important');
        el.style.setProperty('max-width', '220px', 'important');
      });
      document.querySelectorAll('.products-block .item-description, .products-block .p-code').forEach(function(el) {
        el.style.setProperty('display', 'none', 'important');
      });
      document.querySelectorAll('.products-block .buy-form .count, .products-block .item-quantity').forEach(function(el) {
        el.style.setProperty('display', 'none', 'important');
      });
      document.querySelectorAll('.products-block .to-cart-button').forEach(function(el) {
        el.style.setProperty('background', '#79b530', 'important');
        el.style.setProperty('color', '#fff', 'important');
        el.style.setProperty('border', 'none', 'important');
        el.style.setProperty('border-radius', '4px', 'important');
        el.style.setProperty('width', '100%', 'important');
      });
    }

    /* Spustíme hned */
    fixProductCards();

    /* Interval — opakovaně přepisuje šířky dokud je Shoptet nenastaví naposledy */
    var fixInterval = setInterval(fixProductCards, 200);
    setTimeout(function() { clearInterval(fixInterval); }, 8000);

    /* MutationObserver jako záloha */
    var observer = new MutationObserver(function() { fixProductCards(); });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(function() { observer.disconnect(); }, 10000);
  }

  /* Spustíme po načtení DOM */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectAll);
  } else {
    injectAll();
  }

})();
