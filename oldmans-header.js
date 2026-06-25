(function () {

  /* =====================================================
     OLD MAN'S Shoptet – Custom Header + Homepage sekce
     GitHub: serbus-create/oldmans-shoptet
     Verze: 3.3 — Kompletní soubor se světlou mapou a žlutými špendlíky
     ===================================================== */

  /* --- Vytvoří červenou USP lištu --- */
  function buildUspBar() {
    var uspBar = document.createElement('div');
    uspBar.className = 'om-usp-bar';
    uspBar.innerHTML = `
      <div class="om-usp-inner">
        <div class="om-usp-item">
          <div class="om-usp-icon">🚚</div>
          <div class="om-usp-text">
            <strong>VYROBÍME DO 24H</strong>
            <span>Produkty expedujeme během 3-5 prac. dní.</span>
          </div>
        </div>
        <div class="om-usp-item">
          <div class="om-usp-icon">👍</div>
          <div class="om-usp-text">
            <strong>350 000 +</strong>
            <span>Spokojených zákazníků</span>
          </div>
        </div>
        <div class="om-usp-item">
          <div class="om-usp-icon">📦</div>
          <div class="om-usp-text">
            <strong>DOPRAVA ZDARMA</strong>
            <span>U objednávek nad 1 350 Kč</span>
          </div>
        </div>
        <div class="om-usp-item">
          <div class="om-usp-icon">✅</div>
          <div class="om-usp-text">
            <strong>RUČNÍ VÝROBA</strong>
            <span>Produkty se vyrábí vždy čerstvě v den Vaší objednávky</span>
          </div>
        </div>
      </div>`;
    return uspBar;
  }

  /* --- Vytvoří custom footer --- */
  function buildCustomFooter() {
    var customFooter = document.createElement('div');
    customFooter.className = 'om-custom-footer';
    customFooter.innerHTML = `
      <div class="om-footer-inner">
        <div class="om-footer-col">
          <h4>Kontaktní údaje</h4>
          <p><strong>Adresa kanceláře</strong> : Areál VRL Praha<br>Ke Kablu 378, 102 00, Praha - Dolní Měcholupy</p>
          <p><strong>E-mail</strong> : <a href="mailto:podpora@oldmans.cz">podpora@oldmans.cz</a></p>
          <p><strong>Telefon</strong> : <a href="tel:+420774772405">+420 774 772 405</a></p>
          <br>
          <strong>Sledujte nás na instagramu</strong><br><br>
          <a href="https://www.instagram.com/old_mans_style/" target="_blank" class="om-footer-ig">📷 SLEDOVAT @OLD_MANS_STYLE</a>
        </div>
        <div class="om-footer-col">
          <h4>Menu</h4>
          <ul>
            <li><a href="/">Úvod</a></li>
            <li><a href="/o-nas/">O nás</a></li>
            <li><a href="/kategorie/omacky-a-majonezy/">Omáčky a dressingy</a></li>
            <li><a href="/kategorie/bestseller/">TOP Produkty</a></li>
            <li><a href="/kontakty/">Kontakt</a></li>
          </ul>
        </div>
        <div class="om-footer-col">
          <h4>Kategorie</h4>
          <ul>
            <li><a href="/kategorie/squeeze-blast/">Squeeze Blast</a></li>
            <li><a href="/kategorie/omacky-a-majonezy/">Omáčky a majonézy</a></li>
            <li><a href="/kategorie/salatove-dressingy/">Salátové dressingy</a></li>
            <li><a href="/kategorie/chilli-mash/">Chilli Mash</a></li>
            <li><a href="/kategorie/okurkove-relishe/">Okurkové Relishe</a></li>
            <li><a href="/kategorie/premiove-pomazanky/">Prémiové pomazánky</a></li>
            <li><a href="/kategorie/snacky-a-orechy/">Snacky a ořechy</a></li>
            <li><a href="/kategorie/gumovi-medvidci/">Gumoví medvídci</a></li>
          </ul>
        </div>
        <div class="om-footer-col">
          <h4>Informace</h4>
          <ul>
            <li><a href="/doprava-a-platba/">Doprava a platba</a></li>
            <li><a href="/velkoobchod/">Velkoobchod</a></li>
            <li><a href="/obchodni-podminky/">Obchodní podmínky</a></li>
            <li><a href="/reklamace/">Reklamace</a></li>
            <li><a href="/caste-dotazy/">Časté dotazy</a></li>
            <li><a href="/podminky-ochrany-osobnich-udaju/">Ochrana osobních údajů</a></li>
          </ul>
        </div>
      </div>`;
    return customFooter;
  }

  /* --- Vloží USP lištu + footer na JAKOUKOLIV stránku ---
     refNode (volitelný): vloží se ZA tento element (homepage).
     Jinak se vloží PŘED Shoptetí .footer (copyright), aby copyright
     zůstal úplně dole. */
  function injectUspAndFooter(refNode) {
    /* Pojistka proti dvojímu vložení */
    if (document.querySelector('.om-usp-bar') || document.querySelector('.om-custom-footer')) return;

    var uspBar = buildUspBar();
    var customFooter = buildCustomFooter();

    if (refNode && refNode.parentNode) {
      /* Homepage — za poslední sekci */
      refNode.parentNode.insertBefore(uspBar, refNode.nextSibling);
      uspBar.parentNode.insertBefore(customFooter, uspBar.nextSibling);
      return;
    }

    /* Ostatní stránky — vložíme PŘED Shoptetí .footer (copyright),
       aby copyright zůstal jako úplně poslední prvek stránky. */
    var shoptetFooter = document.querySelector('.footer');
    if (shoptetFooter && shoptetFooter.parentNode) {
      shoptetFooter.parentNode.insertBefore(uspBar, shoptetFooter);
      shoptetFooter.parentNode.insertBefore(customFooter, shoptetFooter);
      return;
    }

    /* Fallback — za .benefitBanner nebo na konec */
    var anchor = document.querySelector('.benefitBanner');
    if (anchor && anchor.parentNode) {
      anchor.parentNode.insertBefore(uspBar, anchor.nextSibling);
      uspBar.parentNode.insertBefore(customFooter, uspBar.nextSibling);
    } else {
      var main = document.querySelector('.overall-wrapper') || document.body;
      main.appendChild(uspBar);
      main.appendChild(customFooter);
    }
  }

  /* --- Přebuduje stránku Recepty na galerii karet (jako originál) ---
     Z každého .news-item vytáhne nadpis, odkaz a první obrázek,
     postaví čistou klikací kartu a schová původní rozbalený obsah. */
  function buildRecipeGallery() {
    var wrapper = document.querySelector('.news-wrapper');
    if (!wrapper) return;
    if (wrapper.classList.contains('om-recipes-done')) return;

    var items = wrapper.querySelectorAll('.news-item');
    if (!items.length) return;

    items.forEach(function (item) {
      var link = item.querySelector('h2 a');
      var img = item.querySelector('img');
      if (!link) return;

      var href = link.getAttribute('href') || '#';
      var title = link.textContent.trim();
      var imgSrc = img ? img.getAttribute('src') : '';

      /* Postavíme kartu */
      var card = document.createElement('a');
      card.className = 'om-recipe-card';
      card.setAttribute('href', href);
      card.innerHTML =
        '<div class="om-recipe-img"' + (imgSrc ? ' style="background-image:url(\'' + imgSrc + '\')"' : '') + '></div>' +
        '<div class="om-recipe-title">' + title + '</div>';

      /* Schováme původní obsah a vložíme kartu */
      item.querySelectorAll(':scope > *').forEach(function (child) {
        child.style.setProperty('display', 'none', 'important');
      });
      item.appendChild(card);
      item.classList.add('om-recipe-item');
    });

    wrapper.classList.add('om-recipes-done', 'om-recipes-grid');
  }

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
        <a href="/kontakty/" class="om-contact">
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
          <li class="cat-favorite"><a href="/kategorie/bestseller/"><span class="cat-icon">⭐</span> Bestseller</a></li>
          <li class="cat-sale"><a href="/kategorie/v-akci/"><span class="cat-icon">🏷️</span> V akci</a></li>
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
        omPrice.textContent = 'Košík';
      }
    }
    setTimeout(syncCart, 800);
    setTimeout(syncCart, 2000);
    document.addEventListener('click', function () { setTimeout(syncCart, 500); });

    /* -------------------------------------------------
       7. HOMEPAGE SEKCE
       Vkládáme za .benefitBanner (USP lišta Shoptetu)
    ------------------------------------------------- */
    var isHomepage = (window.location.pathname === '/' || window.location.pathname === '');

    /* Na NE-homepage stránkách (kategorie, produkt, košík...) vložíme
       jen USP lištu + custom footer a skončíme. */
    if (!isHomepage) {
      buildRecipeGallery();
      injectUspAndFooter();
      return;
    }

    var benefitBanner = document.querySelector('.benefitBanner');
    if (!benefitBanner) {
      injectUspAndFooter();
      return;
    }
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
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/about-us-logo.png" alt="OLD MAN'S">
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
        <a href="/recepty/---smashburger-s-karamelizovanou-cibulkou-a-cheddarovym-dipem/" class="om-recipe-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/smashburger-s-karamelizovanou-cibulkou-a-cheddarovym-dipem.jpg" alt="">
          <div class="om-recipe-title">🧀 Smashburger s karamelizovanou cibulkou a Cheddarovým dipem</div>
        </a>
        <a href="/recepty/---snidanovy-muffin-se-slaninou--vejcem-a-slaninovou-majonezou/" class="om-recipe-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/snidanovy-muffin-se-slaninou-vejcem-a-slaninovou-majonezou.jpg" alt="">
          <div class="om-recipe-title">🥓 Snídaňový muffin se slaninou, vejcem a Slaninovou Majonézou</div>
        </a>
        <a href="/recepty/---caesar-wrap-s-kuretem-a-parmazanem/" class="om-recipe-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/caesar-wrap-s-kuretem-a-parmazanem.jpg" alt="">
          <div class="om-recipe-title">🥗 Caesar wrap s kuřetem a parmazánem</div>
        </a>
        <a href="/recepty/----loaded-hranolky-s-jalape--o-majonezou-a-cedarem/" class="om-recipe-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/loaded-hranolky-s-jalapeno-majonezou-a-cedarem.jpg" alt="">
          <div class="om-recipe-title">🌶️ Loaded hranolky s Jalapeño Majonézou a čedarem</div>
        </a>
        <a href="/recepty/----pikantni-kureci-tacos-s-habanero-majonezou/" class="om-recipe-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/pikantni-kureci-tacos-s-habanero-majonezou.jpg" alt="">
          <div class="om-recipe-title">🌶️🔥 Pikantní kuřecí tacos s Habanero Majonézou</div>
        </a>
        <a href="/recepty/---grilovana-bbq-zebra-s-cesnekovo-bbq-majonezou/" class="om-recipe-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/grilovana-bbq-zebra-s-cesnekovo-bbq-majonezou.jpg" alt="">
          <div class="om-recipe-title">🧄 Grilovaná BBQ žebra s česnekovo-BBQ majonézou</div>
        </a>
        <a href="/recepty/---buffalo-kridylka-s-blue-cheese-dipem/" class="om-recipe-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/buffalo-kridylka-s-blue-cheese-dipem.jpg" alt="">
          <div class="om-recipe-title">🍗 Buffalo křidýlka s blue cheese dipem</div>
        </a>
        <a href="/recepty/---luxusni-sendvic-s-roastbeefem-a-lanyzovou-majonezou/" class="om-recipe-item">
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

    /* --- 7g. MAPA PARTNERŮ --- */
    var partnersMap = document.createElement('div');
    partnersMap.className = 'om-section om-partners-map';
    partnersMap.innerHTML = `
      <div class="om-section-inner">
        <div class="om-section-header" style="justify-content: center; margin-bottom: 5px;">
          <h2 style="font-size: 32px !important; text-align: center; width: 100%;"><span style="color: #f7c91b;">POBOČKY</span> <span style="color: #9f1400;">PARTNERŮ</span></h2>
        </div>
        <p style="text-align:center;color:#555;margin-top:0;margin-bottom:30px;font-weight:500;text-transform:uppercase;font-size:13px;letter-spacing:1px;">Kde nakoupit naše produkty / Kde si na našich peckách pochutnat</p>
        <div id="om-map" style="width:100%;height:500px;border-radius:0;overflow:hidden;z-index:1;"></div>
      </div>`;
    insertAfter(partnersMap, instagram);

    /* Načteme Leaflet a inicializujeme mapu */
    setTimeout(function() {
      if (!document.getElementById('om-map')) return;

      /* Leaflet CSS */
      if (!document.getElementById('leaflet-css')) {
        var lCss = document.createElement('link');
        lCss.id = 'leaflet-css';
        lCss.rel = 'stylesheet';
        lCss.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(lCss);
      }

      /* Leaflet JS */
      var lScript = document.createElement('script');
      lScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      lScript.onload = function() {
        var map = L.map('om-map', { scrollWheelZoom: false }).setView([50.082, 14.43], 12);

        /* Světlejší dlaždice mapy (podobnější originálu) */
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '© OpenStreetMap contributors, © CARTO'
        }).addTo(map);

        /* Žlutý špendlík */
        var yellowIcon = L.divIcon({
          className: '',
          html: '<div style="width:18px;height:18px;background:#f7c91b;border:3px solid #fff;border-radius:50%;box-shadow:0 3px 6px rgba(0,0,0,.3);"></div>',
          iconSize: [18, 18],
          iconAnchor: [9, 9],
          popupAnchor: [0, -10]
        });

        var locations = [
          { name: 'Hotel Jalta',              addr: 'Václavské náměstí 45, Praha 1',    lat: 50.0814, lng: 14.4278 },
          { name: 'Hotel U Prince',            addr: 'Staroměstské náměstí 29, Praha 1', lat: 50.0874, lng: 14.4213 },
          { name: 'Hooters Praha',             addr: 'Na Příkopě 22, Praha 1',           lat: 50.0842, lng: 14.4261 },
          { name: 'Bageterie Boulevard',       addr: 'Náměstí Republiky, Praha 1',       lat: 50.0876, lng: 14.4296 },
          { name: 'Bagel Lounge',              addr: 'Mánesova 57, Praha 2',             lat: 50.0766, lng: 14.4405 },
          { name: 'Fancy Fries',               addr: 'Štěpánská 9, Praha 1',             lat: 50.0780, lng: 14.4277 },
          { name: 'Turbopizza',                addr: 'Sokolovská 131, Praha 8',          lat: 50.0963, lng: 14.4631 },
          { name: 'Pizza Raketou',             addr: 'Praha',                            lat: 50.0820, lng: 14.4510 },
          { name: "Rud's Pizza",               addr: 'Praha',                            lat: 50.0835, lng: 14.4190 },
          { name: 'Zvoska',                    addr: 'Praha',                            lat: 50.0760, lng: 14.4310 },
          { name: 'Fany Gastro',               addr: 'Praha',                            lat: 50.0895, lng: 14.4180 },
          { name: 'Bauer Group',               addr: 'Praha',                            lat: 50.0910, lng: 14.4490 },
          { name: 'Shell (Spořilov)',          addr: 'Hlavní 1144, Praha 4',             lat: 50.0395, lng: 14.4830 },
          { name: 'Shell Café (Chodov)',       addr: 'Roztylská, Praha 11',              lat: 50.0334, lng: 14.4948 },
        ];

        locations.forEach(function(loc) {
          L.marker([loc.lat, loc.lng], { icon: yellowIcon })
            .addTo(map)
            .bindPopup('<strong>' + loc.name + '</strong><br><span style="font-size:12px;color:#666;">' + loc.addr + '</span>');
        });
      };
      document.head.appendChild(lScript);
    }, 500);

    /* USP lišta + footer se vkládají globálně (na všech stránkách)
       přes injectUspAndFooter() — viz níže. Na homepage se vloží
       za poslední homepage sekci. */
    injectUspAndFooter(partnersMap);

    /* Nastavíme 5 sloupců PŘED inicializací Shoptet slideru */
    document.querySelectorAll('.product-slider[data-columns]').forEach(function(el) {
      el.setAttribute('data-columns', '5');
      el.setAttribute('data-columns-mobile', '2');
    });

    /* Skryjeme popisky po inicializaci slideru */
    setTimeout(function() {
      document.querySelectorAll('.products-block .p-desc, .products-block .p-code, .products-block .ratings-wrapper').forEach(function(el) {
        el.style.setProperty('display', 'none', 'important');
      });
      document.querySelectorAll('.products-block .quantity').forEach(function(el) {
        el.style.setProperty('display', 'none', 'important');
      });
    }, 2000);
  }

  /* Spustíme po načtení DOM */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectAll);
  } else {
    injectAll();
  }

})();
