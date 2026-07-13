(function () {

  /* =====================================================
     OLD MAN'S Shoptet – Custom Header + Homepage sekce
     GitHub: serbus-create/oldmans-shoptet
     Verze: 3.4 — Odstraněna mapa poboček (bude řešeno doplňkem)
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
          <p class="om-footer-ig-label"><strong>Sledujte nás na instagramu</strong></p>
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
       0. SKRÝT PRÁZDNÝ SIDEBAR NA STATICKÝCH STRÁNKÁCH
    ------------------------------------------------- */
    var sidebar = document.querySelector('.sidebar-left, aside.sidebar');
    if (sidebar) {
      var sidebarText = sidebar.textContent.trim().replace(/\s+/g, ' ');
      /* Sidebar je prázdný pokud obsahuje jen nadpis "Postranní panel" */
      if (sidebarText === '' || sidebarText === 'Postranní panel') {
        sidebar.style.setProperty('display', 'none', 'important');
        var content = document.querySelector('.content.narrow, .content-body');
        if (content) {
          content.style.setProperty('width', '100%', 'important');
          content.style.setProperty('max-width', '100%', 'important');
          content.style.setProperty('flex', '0 0 100%', 'important');
        }
      }
    }

    /* Skrýt sekci Diskuze na statických stránkách */
    document.querySelectorAll('h2, h3').forEach(function(heading) {
      if (heading.textContent.trim().startsWith('Diskuze')) {
        var el = heading;
        while (el) {
          var next = el.nextElementSibling;
          el.style.setProperty('display', 'none', 'important');
          el = next;
        }
      }
    });

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
          <div class="om-login"><a href="/registrace/">👤</a></div>
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
        <a href="/kategorie/marinady/" class="om-cat-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/marinades.png" alt=""> Marinády
        </a>
        <a href="/kategorie/puff/" class="om-cat-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/puff.png" alt=""> Puff
        </a>
        <a href="https://788253.myshoptet.com/kategorie/squeeze-blast/" class="om-cat-item">
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

    /* USP lišta + footer se vkládají globálně (na všech stránkách)
       přes injectUspAndFooter() — viz níže. Na homepage se vloží
       za poslední homepage sekci. */
    injectUspAndFooter(instagram);

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

  /* --- Trust badges + price box + partner loga na detailu produktu --- */
  function enhanceProductDetail() {
    if (!document.body.classList.contains('type-product')) return;
    if (document.getElementById('om-trust-badges')) return;

    /* Kotva: unikátní formulář, který existuje jen jednou na stránce */
    var form = document.getElementById('product-detail-form');
    if (!form) return;

    var detailInner = form.closest('.p-detail-inner');
    if (!detailInner) return;

    var h1 = detailInner.querySelector('h1') || document.querySelector('h1');
    if (!h1) return;

    /* 0. Hodnocení (hvězdičky + Značka) přesuneme hned pod nadpis — hledáme nejmenší element obsahující "Značka:" */
    var brandCandidates = Array.from(detailInner.querySelectorAll('*')).filter(function(el) {
      return /Značka\s*:/i.test(el.textContent);
    });
    brandCandidates.sort(function(a, b) { return a.textContent.length - b.textContent.length; });
    var brandEl = brandCandidates[0];
    var ratingRow = null;
    if (brandEl) {
      ratingRow = brandEl;
      while (ratingRow && ratingRow.parentElement && !ratingRow.parentElement.contains(h1)) {
        ratingRow = ratingRow.parentElement;
      }
      if (ratingRow && ratingRow !== h1 && h1.parentNode) {
        h1.parentNode.insertBefore(ratingRow, h1.nextSibling);
      }
    }

    /* 0b. Skryjeme Tisk / Zeptat se / Sdílet */
    Array.from(detailInner.querySelectorAll('a')).forEach(function(a) {
      var t = a.textContent.trim();
      if (t === 'Tisk' || t === 'Zeptat se' || t === 'Sdílet') {
        a.style.setProperty('display', 'none', 'important');
      }
    });

    /* 1. Badges AŽ ZA hodnocením (nebo za nadpisem, pokud hodnocení nenajdeme) */
    var insertAfterEl = ratingRow || h1;

    var badges = document.createElement('div');
    badges.id = 'om-trust-badges';
    badges.innerHTML = `
      <div class="om-badge">
        <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/vyrobeno-cr.png" alt="">
        <div><strong>Vyrobeno v ČR</strong><span>Pouze česká značka</span></div>
      </div>
      <div class="om-badge">
        <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/rucni-vyroba.svg" alt="">
        <div><strong>Ruční výroba</strong><span>Pečlivě zpracováno</span></div>
      </div>
      <div class="om-badge">
        <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/cerstvost.svg" alt="">
        <div><strong>Vždy čerstvé</strong><span>S důrazem na kvalitu</span></div>
      </div>
    `;
    if (insertAfterEl && insertAfterEl.parentNode) {
      insertAfterEl.parentNode.insertBefore(badges, insertAfterEl.nextSibling);
    }

    /* 2. Tabulka Dostupnost/Kód — hledáme JEN uvnitř formuláře, přesuneme živý element dostupnosti */
    var table = form.querySelector('table.detail-parameters');
    var availTd = null;
    if (table) {
      var rows = table.querySelectorAll('tr');
      rows.forEach(function(tr) {
        var th = tr.querySelector('th');
        if (th && th.textContent.trim().replace(':', '') === 'Dostupnost') {
          availTd = tr.querySelector('td');
        }
      });
      table.style.setProperty('display', 'none', 'important');
    }

    /* 3. Box kolem ceny + množství + tlačítka (.p-to-cart-block) — hledáme JEN uvnitř formuláře */
    var priceBlock = form.querySelector('.p-to-cart-block');
    if (priceBlock) {
      priceBlock.classList.add('om-price-box');

      if (availTd) {
        var availWrap = document.createElement('div');
        availWrap.className = 'om-availability-line';
        availWrap.appendChild(availTd);
        if (/Vyprodáno|Není skladem|Na dotaz/i.test(availWrap.textContent)) {
          availWrap.classList.add('om-sold-out');
        }
        priceBlock.insertBefore(availWrap, priceBlock.firstChild);
      }

      var cartBtn = priceBlock.querySelector('.add-to-cart-button, .btn-conversion');
      if (cartBtn) cartBtn.classList.add('om-cart-btn-white');

      /* Množství + tlačítko vedle sebe v jednom řádku */
      var qtyInput = priceBlock.querySelector('input[name="amount"], input[type="number"]');
      var qtyWrap = qtyInput ? qtyInput.closest('div') : null;
      if (qtyWrap && cartBtn && !priceBlock.querySelector('.om-buy-row')) {
        var buyRow = document.createElement('div');
        buyRow.className = 'om-buy-row';
        qtyWrap.parentNode.insertBefore(buyRow, qtyWrap);
        buyRow.appendChild(qtyWrap);
        buyRow.appendChild(cartBtn);
      }

      /* Odkaz Pro firmy — UVNITŘ boxu, s ikonkou z GitHubu */
      var proFirmy = document.createElement('a');
      proFirmy.href = '/velkoobchod/';
      proFirmy.className = 'om-pro-firmy';
      proFirmy.innerHTML = '<img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/pro%20firmy.svg" alt=""> <strong>Pro firmy – Nabídka na míru</strong>';
      priceBlock.appendChild(proFirmy);
    }

    /* 4. Loga partnerů — do PRAVÉHO sloupce (.p-data-wrapper), hned pod box s cenou */
    var dataWrapper = form.closest('.p-data-wrapper');
    if (dataWrapper) {
      var partnersWrap = document.createElement('div');
      partnersWrap.id = 'om-product-partners';
      partnersWrap.innerHTML = `
        <div class="om-product-partners-label">NAŠE OMÁČKY NAJDETE:</div>
        <div class="om-product-partners-logos">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-partner-shell.png" alt="Shell">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-partner-shell-cafe.png" alt="Shell Café">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-partner-bageterie-boulevard-logo.png" alt="Bageterie Boulevard">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/turbopizza.png" alt="Turbo Pizza">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-partner-faency-fries-logo.png" alt="Fancy Fries">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-partner-rohlik-logo.png" alt="Rohlík">
        </div>
      `;
      dataWrapper.appendChild(partnersWrap);
    }

    /* 5b. Diskuze — úplně odstranit tab (i verzi v hidden-links pro mobil) */
    Array.from(document.querySelectorAll('li[data-testid="tabDiscussion"]')).forEach(function(li) {
      li.remove();
    });
    var discussionPane = document.getElementById('productDiscussion');
    if (discussionPane) discussionPane.remove();

    /* 5. Nová záložka "Specifikace" — přesuneme tabulku Kategorie/Záruka/Hmotnost z popisu */
    var descriptionPane = document.getElementById('description');

    /* 5a. Odstranit osamocený nadpis "Doplňkové parametry" (samostatný <p><strong>) ze záložky Popis */
    if (descriptionPane) {
      var specsHeading = Array.from(descriptionPane.querySelectorAll('strong')).find(function(el) {
        return el.textContent.trim() === 'Doplňkové parametry';
      });
      if (specsHeading) {
        var headingP = specsHeading.closest('p') || specsHeading;
        headingP.remove();
      }
    }

    var specsTable = descriptionPane ? descriptionPane.querySelector('table.detail-parameters') : null;
    var tabsList = document.getElementById('p-detail-tabs');
    var tabContent = document.getElementById('tab-content');
    if (specsTable && tabsList && tabContent && !document.getElementById('specifications')) {
      /* Tab tlačítko */
      var specsTabLi = document.createElement('li');
      specsTabLi.className = 'shp-tab';
      specsTabLi.setAttribute('data-testid', 'tabSpecifications');
      specsTabLi.innerHTML = '<a href="#specifications" class="shp-tab-link" role="tab" data-toggle="tab">Specifikace</a>';
      var descTabLi = tabsList.querySelector('.shp-tab[data-testid="tabDescription"]');
      if (descTabLi && descTabLi.parentNode) {
        descTabLi.parentNode.insertBefore(specsTabLi, descTabLi.nextSibling);
      } else {
        tabsList.appendChild(specsTabLi);
      }

      /* Obsah záložky */
      var specsPane = document.createElement('div');
      specsPane.id = 'specifications';
      specsPane.className = 'tab-pane fade wide-tab';
      specsPane.setAttribute('role', 'tabpanel');
      var specsWrap = document.createElement('div');
      specsWrap.className = 'om-specs-wrap';
      specsWrap.appendChild(specsTable);
      specsPane.appendChild(specsWrap);
      tabContent.appendChild(specsPane);
      specsTable.style.removeProperty('display');
      specsTable.classList.add('om-specs-table');
    }

    /* 6. Přejmenovat nadpis "Podobné produkty" */
    Array.from(document.querySelectorAll('h2, h3, h4')).forEach(function(h) {
      if (h.textContent.trim() === 'Podobné produkty') {
        h.textContent = 'Produkty, které by vás mohli zajímat';
      }
    });
  }

  enhanceProductDetail();

  /* Po přidání do košíku → přesměrovat na košík */
  function watchCart() {
    /* Sledujeme změnu našeho #om-cart-price elementu */
    var cartPrice = document.getElementById('om-cart-price');
    if (cartPrice) {
      var lastVal = cartPrice.textContent;
      var observer = new MutationObserver(function() {
        var newVal = cartPrice.textContent;
        if (newVal !== lastVal && newVal !== 'Košík') {
          lastVal = newVal;
          window.location.href = '/kosik/';
        }
      });
      observer.observe(cartPrice, { childList: true, subtree: true, characterData: true });
    }

    /* Shoptet AJAX eventy */
    document.addEventListener('cart-changed', function() {
      window.location.href = '/kosik/';
    });
    document.addEventListener('shoptet:cartUpdated', function() {
      window.location.href = '/kosik/';
    });
  }

  setTimeout(watchCart, 1000);

  /* Spustíme po načtení DOM */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectAll);
  } else {
    injectAll();
  }

})();
