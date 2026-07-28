(function () {

  /* =====================================================
     OLD MAN'S Shoptet – Custom Header + Homepage sekce
     GitHub: serbus-create/oldmans-shoptet
     Verze: 5.13 — Desktop: dropdown s návrhy vyhledávání (searchWhisperer) přesunutý z hlavičky
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
            <li><a href="/kategorie/marinady/">Marinády</a></li>
            <li><a href="/kategorie/puff/">PUFF</a></li>
            <li><a href="/kategorie/squeeze-blast/">Squeeze</a></li>
            <li><a href="/kategorie/omacky-a-majonezy/">Omáčky a majonézy</a></li>
            <li><a href="/kategorie/salatove-dressingy/">Salátové dressingy</a></li>
          </ul>
        </div>
        <div class="om-footer-col">
          <h4 class="om-footer-cat-spacer" aria-hidden="true">Kategorie</h4>
          <ul class="om-footer-cat-cont">
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

  /* --- Přestaví nativní Shoptet copyright lištu (dole pod patičkou) ---
     Původní markup:
     <span id="signature"><a class="image">...</a><a class="title">Vytvořil Shoptet</a></span>
     <span class="copyright" data-testid="textCopyright">Copyright 2026 <strong>Oldmans.cz</strong>. Všechna práva vyhrazena. <a class="js-cookies-settings">Upravit nastavení cookies</a></span>
     Skryjeme Shoptet "signature" badge a přepíšeme text copyrightu, cookie odkaz
     zachováme (jinak přijdeme o funkční nastavení souhlasu cookies). */
  function customizeFooterCopyright() {
    var footerBottoms = document.querySelectorAll('#footer .footer-bottom, .footer .footer-bottom');
    footerBottoms.forEach(function (footerBottom) {
      if (footerBottom.dataset.omDone) return;

      var signature = footerBottom.querySelector('#signature');
      if (signature) signature.style.setProperty('display', 'none', 'important');

      var copyright = footerBottom.querySelector('.copyright[data-testid="textCopyright"], .copyright');
      if (copyright) {
        var cookiesLink = copyright.querySelector('.js-cookies-settings');
        var cookiesHtml = cookiesLink ? cookiesLink.outerHTML : '';
        copyright.innerHTML = '© Copyright 2026 <strong>Old Man\'s</strong>. Všechna práva vyhrazena. ' + cookiesHtml;
      }

      /* Loga platebních metod (Comgate, Visa, Mastercard, GPay, ApplePay)
         — jeden obrázek nahraný na GitHubu, zobrazený v KAŽDÉ patičce
         na webu (na všech typech stránek), stejně jako na oldmans.cz. */
      if (!footerBottom.querySelector('.om-footer-payments')) {
        var paymentsImg = document.createElement('img');
        paymentsImg.className = 'om-footer-payments';
        paymentsImg.src = 'https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/comgate-footer-logos.png';
        paymentsImg.alt = 'Způsoby platby';
        footerBottom.appendChild(paymentsImg);
      }

      footerBottom.dataset.omDone = 'true';
    });
  }

  function injectAll() {

    customizeFooterCopyright();

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
              <span class="om-cart-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                  <path d="M3 6h18"></path>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </span>
              <span id="om-cart-price" class="cart-price">Prázdný košík</span>
              <span id="om-cart-badge" class="om-cart-badge">0</span>
            </a>
          </div>
          <button type="button" id="om-mobile-menu-btn" class="om-mobile-menu-btn" aria-label="Menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
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
       4a. MOBILNÍ ROZBALOVACÍ MENU (hamburger)
       Na mobilu jsou hledání, Recepty/B2B a lišta kategorií schované
       (viz CSS) a přesunuté sem, do rozbalovacího panelu pod headerem —
       podle vzoru oldmans.cz (jen logo + ikony + hamburger v headeru).
    ------------------------------------------------- */
    var mobileBackdrop = document.createElement('div');
    mobileBackdrop.id = 'om-mobile-backdrop';
    mobileBackdrop.className = 'om-mobile-backdrop';

    var mobileDrawer = document.createElement('div');
    mobileDrawer.id = 'om-mobile-drawer';
    mobileDrawer.className = 'om-mobile-drawer';
    mobileDrawer.innerHTML = `
      <button type="button" class="om-mobile-close" aria-label="Zavřít menu">✕</button>
      <form class="om-mobile-search" action="/action/ProductSearch/prepareString/" method="post">
        <input type="hidden" name="language" value="cs">
        <input type="search" name="string" placeholder="Napište, co hledáte..">
        <button type="submit">Hledat</button>
      </form>
      <ul class="om-mobile-cats" id="omMobileCatList"></ul>
      <div class="om-mobile-quicklinks">
        <a href="/recepty/" class="om-mobile-quicklink">🍴 Recepty</a>
        <a href="/velkoobchod/" class="om-mobile-quicklink">🤝 B2B</a>
      </div>
      <a href="/kontakty/" class="om-mobile-contact">
        <span class="om-mobile-contact-icon">💬</span>
        <span class="om-mobile-contact-text">
          <span class="om-mobile-contact-email">podpora@oldmans.cz</span>
          <span class="om-mobile-contact-sub">Napište nám</span>
        </span>
      </a>`;

    document.body.appendChild(mobileBackdrop);
    document.body.appendChild(mobileDrawer);

    /* Přepíná otevření/zavření menu */
    (function initMobileMenu() {
      var btn = document.getElementById('om-mobile-menu-btn');
      var closeBtn = mobileDrawer.querySelector('.om-mobile-close');
      if (!btn) return;

      function openMenu() {
        document.body.classList.add('om-mobile-menu-open');
        document.body.style.overflow = 'hidden';
        btn.setAttribute('aria-expanded', 'true');
      }
      function closeMenu() {
        document.body.classList.remove('om-mobile-menu-open');
        document.body.style.overflow = '';
        btn.setAttribute('aria-expanded', 'false');
      }
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (document.body.classList.contains('om-mobile-menu-open')) {
          closeMenu();
        } else {
          openMenu();
        }
      });
      if (closeBtn) closeBtn.addEventListener('click', closeMenu);
      mobileBackdrop.addEventListener('click', closeMenu);
      mobileDrawer.addEventListener('click', function (e) {
        if (e.target.closest('a')) closeMenu();
      });
    })();

    /* -------------------------------------------------
       4c. NAŠEPTÁVÁNÍ VE VLASTNÍM VYHLEDÁVACÍM POLI
       (29. 7. 2026, na žádost klienta — DIAGNOSTICKÝ KROK)
       Naše vlastní vyhledávací pole (#om-header .om-search input a
       .om-mobile-search input) je čistě nový, samostatný <input>, NENÍ
       to nativní Shoptet input — proto na něj nefunguje vestavěné
       "napovídání" při psaní (to je nativní Shoptet funkce navázaná na
       PŮVODNÍ input uvnitř skrytého #header, viz .js-search-input).
       Řešení — ZRCADLIT text z našeho pole do skrytého nativního
       (#header input.js-search-input) a vyvolat na něm STEJNÉ události
       (input/keyup), na které nativní skript čeká, aby si sám dopočítal
       návrhy. Zatím JEN zrcadlení — jestli se návrhy i VIZUÁLNĚ
       zobrazí, záleží na tom, kam Shoptet svůj dropdown s návrhy
       vykresluje (pokud zůstává uvnitř skrytého #header, bude potřeba
       další krok, který přesune/zviditelní i samotný dropdown). */
    function mirrorSearchToNative() {
      var nativeInput = document.querySelector('#header input.js-search-input');
      if (!nativeInput) return;

      var customInputs = document.querySelectorAll('#om-header .om-search input[type="search"], .om-mobile-search input[type="search"]');
      customInputs.forEach(function (input) {
        if (input.dataset.omWhisperBound) return;
        input.dataset.omWhisperBound = 'true';
        input.addEventListener('input', function () {
          nativeInput.value = input.value;
          nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
          nativeInput.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
        });
      });

      /* Přesun dropdownu s návrhy (nativní .searchWhisperer, viz Network
         odpověď ajaxSearch/) ven ze skrytého #header (29. 7. 2026, na
         žádost klienta). Element sám o sobě má display:flex a jeho
         vlastní JS ho normálně zobrazuje/skrývá přidáváním/odebíráním
         třídy "active" — jen byl uvězněný uvnitř #header (display:none),
         takže byl vždycky neviditelný bez ohledu na svůj vlastní stav.
         Přesouváme HO SAMOTNÉHO (ne kopii) do našeho vlastního desktop
         vyhledávacího boxu — Shoptetí JS ho dál ovládá (mění obsah/třídu
         "active") přesně stejně jako předtím, jen teď sedí ve viditelné
         části stránky. Zatím JEN desktop (na žádost klienta — mobil
         later). */
      var whisperer = document.querySelector('.searchWhisperer');
      var desktopSearchBox = document.querySelector('#om-header .om-search');
      if (whisperer && desktopSearchBox && !desktopSearchBox.contains(whisperer)) {
        desktopSearchBox.appendChild(whisperer);
      }
    }
    mirrorSearchToNative();

    /* -------------------------------------------------
       4b. DYNAMICKÉ NAČTENÍ KATEGORIÍ ZE SHOPTETU
       Shoptet vykresluje vlastní kompletní menu kategorií do skryté
       nativní navigace (ul.menu-level-1, data-testid="headerMenuItems").
       Přečteme si z ní hlavní (top-level) kategorie a postavíme podle
       nich naše viditelné menu — když přibude nová kategorie ve Shoptetu,
       objeví se automaticky i tady, bez zásahu do kódu.
       Bestseller a V akci necháváme napevno kvůli vlastním ikonkám.

       DŮLEŽITÉ: .menu-level-1 se u Shoptetu může vykreslit/naplnit AŽ PO
       naší prvotní kontrole (asynchronně), proto to zkoušíme opakovaně
       (polling), ne jen jednou — a teprve po úspěšném naplnění spustíme
       přepočet responzivního "Více" menu (krok 5), aby počítal se
       správným, finálním seznamem položek.
    ------------------------------------------------- */
    function buildDynamicCategoryMenu() {
      var list = document.getElementById('omCatList');
      var moreBtn = document.getElementById('omMoreBtn');
      if (!list || !moreBtn) return false;

      var sourceMenu = document.querySelector('.menu-level-1');
      var sourceItems = sourceMenu ? sourceMenu.querySelectorAll(':scope > li') : [];
      if (!sourceItems.length) return false; /* nativní menu ještě není hotové */

      var cats = [];
      Array.prototype.slice.call(sourceItems).forEach(function (li) {
        var a = li.querySelector(':scope > a');
        if (!a) return;
        var href = a.getAttribute('href') || '';
        /* Jen skutečné kategorie, ne Obchodní podmínky / Kontakty / Značky apod. */
        if (href.indexOf('/kategorie/') === -1) return;
        /* Bestseller a V akci už máme napevno se speciální ikonkou */
        if (href.indexOf('/kategorie/bestseller/') !== -1) return;
        if (href.indexOf('/kategorie/v-akci/') !== -1) return;
        var name = a.textContent.trim();
        if (!name) return;
        cats.push({ name: name, href: href });
      });
      if (!cats.length) return false;

      /* Pojistka proti zdvojení při opakovaném volání */
      Array.prototype.slice.call(list.querySelectorAll('.om-cat-dynamic')).forEach(function (li) { li.remove(); });

      cats.forEach(function (cat) {
        var li = document.createElement('li');
        li.className = 'om-cat-dynamic';
        var a = document.createElement('a');
        a.href = cat.href;
        a.textContent = cat.name;
        li.appendChild(a);
        list.insertBefore(li, moreBtn);
      });
      return true;
    }

    /* Záložní pevný seznam — použije se jen když se ani po opakovaných
       pokusech nepodaří nativní menu Shoptetu najít (krajní případ). */
    function buildFallbackCategoryMenu() {
      var list = document.getElementById('omCatList');
      var moreBtn = document.getElementById('omMoreBtn');
      if (!list || !moreBtn || list.querySelector('.om-cat-dynamic')) return;
      var fallback = [
        { name: 'Omáčky a majonézy', href: '/kategorie/omacky-a-majonezy/' },
        { name: 'Salátové dresingy', href: '/kategorie/salatove-dressingy/' },
        { name: 'Chilli omáčky', href: '/kategorie/chilli-omacky/' },
        { name: 'Chilli Mash', href: '/kategorie/chilli-mash/' },
        { name: 'Okurkové Relishe', href: '/kategorie/okurkove-relishe/' },
        { name: 'Prémiové pomazánky', href: '/kategorie/premiove-pomazanky/' },
        { name: 'Snacky a ořechy', href: '/kategorie/snacky-a-orechy/' },
        { name: 'Gumoví medvídci', href: '/kategorie/gumovi-medvidci/' }
      ];
      fallback.forEach(function (cat) {
        var li = document.createElement('li');
        li.className = 'om-cat-dynamic';
        var a = document.createElement('a');
        a.href = cat.href;
        a.textContent = cat.name;
        li.appendChild(a);
        list.insertBefore(li, moreBtn);
      });
    }

    /* Zrcadlí kompletní seznam kategorií (Bestseller, V akci, dynamické
       i fallback) do mobilního rozbalovacího menu — voláno hned po
       sestavení #omCatList, PŘED setupResponsiveCatMenu(), aby se
       nezkopírovaly položky už schované kvůli "Více" na desktopu. */
    function syncMobileCategoryMenu() {
      var list = document.getElementById('omCatList');
      var mobileList = document.getElementById('omMobileCatList');
      if (!list || !mobileList) return;
      mobileList.innerHTML = '';
      Array.prototype.slice.call(list.children).forEach(function (li) {
        if (li.id === 'omMoreBtn') return;
        var clone = li.cloneNode(true);
        clone.style.display = '';
        mobileList.appendChild(clone);
      });
    }

    /* Zkusíme hned, a pokud nativní menu ještě není naplněné, zkusíme to
       ještě několikrát v krátkých intervalech. Teprve po úspěchu (nebo
       vyčerpání pokusů + použití zálohy) spustíme přepočet "Více". */
    (function initCategoryMenu() {
      var attempts = 0;
      var maxAttempts = 8;
      var delay = 200;

      function attempt() {
        attempts++;
        if (buildDynamicCategoryMenu()) {
          syncMobileCategoryMenu();
          setupResponsiveCatMenu();
          return;
        }
        if (attempts >= maxAttempts) {
          buildFallbackCategoryMenu();
          syncMobileCategoryMenu();
          setupResponsiveCatMenu();
          return;
        }
        setTimeout(attempt, delay);
      }
      attempt();
    })();

    /* -------------------------------------------------
       5. RESPONSIVE KATEGORIE MENU – overflow do "Více"
       Voláno z initCategoryMenu() výše, až je seznam kategorií finální.
    ------------------------------------------------- */
    function setupResponsiveCatMenu() {
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
      moreSubmenu.innerHTML = '';
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
      } else {
        moreBtn.style.display = 'none';
      }

      if (!moreBtn.dataset.omClickBound) {
        moreBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          var isOpen = moreSubmenu.style.display === 'block';
          moreSubmenu.style.display = isOpen ? 'none' : 'block';
        });
        document.addEventListener('click', function () {
          moreSubmenu.style.display = 'none';
        });
        moreBtn.dataset.omClickBound = 'true';
      }
    }

    /* -------------------------------------------------
       6. DYNAMICKÝ KOŠÍK – číst ze Shoptet DOM
    ------------------------------------------------- */
    function syncCart() {
      var priceEl = document.querySelector('.header-cart-total, .cart-total-price, [data-testid="headerCartPrice"]');
      var countEl = document.querySelector('.header-cart-items-count, .cart-count-value, [data-testid="headerCartCount"]');
      var omPrice = document.getElementById('om-cart-price');
      var omBadge = document.getElementById('om-cart-badge');
      if (!omPrice) return;

      var price = priceEl ? priceEl.textContent.trim() : '';
      var count = countEl ? countEl.textContent.trim() : '';

      if (price && price !== '0' && price !== '0 Kč') {
        omPrice.textContent = (count ? count + ' × ' : '') + price;
      } else {
        omPrice.textContent = 'Prázdný košík';
      }

      /* Odznak s počtem kusů — mobilní kulaté tlačítko košíku (viz vzor
         oldmans.cz), zobrazuje se vždy, i s hodnotou 0 při prázdném košíku */
      if (omBadge) {
        var countNum = parseInt(count, 10);
        omBadge.textContent = isNaN(countNum) ? '0' : String(countNum);
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
        <a href="/kategorie/squeeze-blast/" class="om-cat-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/squeeze-blast.png" alt=""> Squeeze Blast
        </a>
        <a href="/kategorie/omacky-a-majonezy/" class="om-cat-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/specials-oldmans.png" alt=""> Omáčky a majonézy
        </a>
        <a href="/kategorie/burger-a-steak/" class="om-cat-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/burger.png" alt=""> Burger a steak
        </a>
        <a href="/kategorie/chilli-omacky/" class="om-cat-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-icons-chilli.png" alt=""> Chilli omáčky
        </a>
        <a href="/kategorie/salatove-dressingy/" class="om-cat-item">
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/oldmans-icons-salads.png" alt=""> Salátové dresingy
        </a>
        <a href="/kategorie/ceska-klasika/" class="om-cat-item">
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
          <img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/foto-clanek.jpg" alt="Apetit clanek">
        </div>
        <div class="om-apetit-text">
          <img src="https://www.gastrotek.cz/assets/img/partners/apetit.jpg" alt="Apetit" class="om-apetit-logo">
          <h2>Napsali o nás</h2>
          <p>Značka OLD MAN's se stala známou v gastronomických kruzích díky svým prémiovým omáčkám a dressingům, které jsou vyrobeny s pečlivostí a důrazem na kvalitu. Společnost byla založena z potřeby nabídnout trhu produkty, které svou chutí a složením vynikají nad běžnými alternativami. Nedostatek prémiových omáček a dressingů v gastronomických provozech inspiroval zakladatele OLD MAN's k vytvoření značky, která by tuto mezeru na trhu vyplnila.</p>
          <p>Nyní, v roce 2024, se značka připravuje na vstup na retailový trh, aby i domácí kuchaři mohli ochutnat prémiovost, kterou doposud nabízeli pouze restaurace.</p>
          <p><em>Apetit (apetitonline.cz)</em></p>
        </div>
      </div>
    </div>`;

    /* --- 7e. RECEPTY S OBRÁZKY --- */
    var recipes = document.createElement('div');
    recipes.className = 'om-section om-recipes';
    recipes.innerHTML = `<div class="om-section-inner">
      <div class="om-section-header">
        <h2>🍴 Vybrané recepty</h2>
        <a href="/recepty/" class="om-btn-more om-show-all-btn">Ukázat všechny</a>
      </div>
      <div class="om-recipes-wrapper">
        <button type="button" class="om-recipe-nav om-recipe-nav-prev" aria-label="Předchozí"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 6l-6 6 6 6" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
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
        <button type="button" class="om-recipe-nav om-recipe-nav-next" aria-label="Další"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6l6 6-6 6" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      </div>
      <div class="om-show-all-wrap"><a href="/recepty/" class="om-btn-more">Ukázat všechny</a></div>
    </div>`;

    /* --- 7f. INSTAGRAM --- */
    var instagram = document.createElement('div');
    instagram.className = 'om-section om-instagram';
    instagram.innerHTML = `<div class="om-section-inner">
      <div class="om-insta-inner">
        <div class="om-insta-text">
          <p class="om-subtitle">Sledujte nás</p>
          <h2><span class="om-insta-na">Na</span> <span class="om-insta-word">INSTAGRAMU</span></h2>
          <p>Chcete být v obraze co se u nás děje, nebo jestli náhodou neděláme novou omáčku?</p>
          <p><strong>Sledujte nás na instagramu a dozvíte se víc!</strong></p>
          <a href="https://www.instagram.com/old_mans_style/" target="_blank" class="om-btn-primary">Sledovat @OLD_MANS_STYLE</a>
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

    /* Tlačítko "Ukázat všechny" — DESKTOP: v nadpisu, MOBIL: pod sliderem
       (obě varianty existují v DOM, přepínají se přes CSS media query) */
    function addShowAllButtonToHeading(heading, url) {
      if (!heading || heading.querySelector('.om-show-all-btn')) return;
      var btn = document.createElement('a');
      btn.href = url;
      btn.className = 'om-show-all-btn';
      btn.textContent = 'Ukázat všechny';
      heading.appendChild(btn);
    }
    function buildShowAllButton(url) {
      var wrap = document.createElement('div');
      wrap.className = 'om-show-all-wrap';
      var btn = document.createElement('a');
      btn.href = url;
      btn.className = 'om-btn-more';
      btn.textContent = 'Ukázat všechny';
      wrap.appendChild(btn);
      return wrap;
    }
    addShowAllButtonToHeading(bestsellers, '/kategorie/bestseller/');
    addShowAllButtonToHeading(sale, '/kategorie/v-akci/');

    /* Pomocná funkce — vloží element ZA jiný element */
    function insertAfter(newEl, refEl) {
      if (refEl && refEl.parentNode) {
        refEl.parentNode.insertBefore(newEl, refEl.nextSibling);
      } else {
        parent.appendChild(newEl);
      }
    }

    /* POŘADÍ dle originálu oldmans.cz:
       USP → Bestsellery → Ukázat všechny → Partneři → O nás → Kategorie
       → Apetit → Omáčky ve slevě → Ukázat všechny → Recepty → Instagram */

    var anchor = bestsellersWrapper || benefitBanner;
    if (bestsellersWrapper) {
      var bestsellersShowAll = buildShowAllButton('/kategorie/bestseller/');
      insertAfter(bestsellersShowAll, bestsellersWrapper);
      anchor = bestsellersShowAll;
    }
    insertAfter(partners, anchor);
    insertAfter(about, partners);
    insertAfter(categories, about);
    insertAfter(apetit, categories);

    /* Přesuneme "Omáčky ve slevě" za Apetit */
    var afterSale = apetit;
    if (sale && saleWrapper) {
      insertAfter(sale, apetit);
      insertAfter(saleWrapper, sale);
      var saleShowAll = buildShowAllButton('/kategorie/v-akci/');
      insertAfter(saleShowAll, saleWrapper);
      afterSale = saleShowAll;
    }

    insertAfter(recipes, afterSale);

    /* Šipky "Vybrané recepty" — vlastní scroll slider (nezávislý na Shoptet slideru) */
    var recipesTrack = recipes.querySelector('.om-recipes-grid');
    var recipesPrev = recipes.querySelector('.om-recipe-nav-prev');
    var recipesNext = recipes.querySelector('.om-recipe-nav-next');
    if (recipesTrack && recipesPrev && recipesNext) {
      /* Zdvojíme karty (kopie skryté pro čtečky obrazovky), aby šlo posouvat
         nekonečně dokola bez viditelného "skoku" zpátky na začátek. */
      var originalRecipeItems = Array.prototype.slice.call(recipesTrack.querySelectorAll('.om-recipe-item'));
      originalRecipeItems.forEach(function(item) {
        var clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.setAttribute('tabindex', '-1');
        recipesTrack.appendChild(clone);
      });

      var scrollByCard = function(dir) {
        var card = recipesTrack.querySelector('.om-recipe-item');
        var step = card ? (card.getBoundingClientRect().width + 20) * 2 : 300;
        /* Karty jsou zdvojené, takže polovina celé šířky = jedna sada originálů */
        var half = recipesTrack.scrollWidth / 2;

        if (dir > 0) {
          /* Na konci druhé (klonované) sady se potichu, bez animace, přepneme
             zpátky na odpovídající místo v první sadě — vizuálně identické,
             takže uživatel žádný skok nevidí. */
          if (recipesTrack.scrollLeft >= half - 5) {
            recipesTrack.scrollLeft -= half;
          }
          recipesTrack.scrollBy({ left: step, behavior: 'smooth' });
        } else {
          if (recipesTrack.scrollLeft <= 5) {
            recipesTrack.scrollLeft += half;
          }
          recipesTrack.scrollBy({ left: -step, behavior: 'smooth' });
        }
      };
      recipesPrev.addEventListener('click', function() { scrollByCard(-1); });
      recipesNext.addEventListener('click', function() { scrollByCard(1); });
    }

    insertAfter(instagram, recipes);

    /* USP lišta + footer se vkládají globálně (na všech stránkách)
       přes injectUspAndFooter() — viz níže. Na homepage se vloží
       za poslední homepage sekci. */
    injectUspAndFooter(instagram);

    /* Nastavíme 5 sloupců PŘED inicializací Shoptet slideru */
    document.querySelectorAll('.product-slider[data-columns]').forEach(function(el) {
      el.setAttribute('data-columns', '5');
      el.setAttribute('data-columns-mobile', '1');
    });

    /* Donutíme slider přepočítat rozměry vícekrát, ať to chytne i po pozdějším CSS/font loadu */
    [300, 800, 1500].forEach(function(delay) {
      setTimeout(function() { window.dispatchEvent(new Event('resize')); }, delay);
    });

    /* Skryjeme popisky po inicializaci slideru (dostupnost necháváme viditelnou) */
    setTimeout(function() {
      document.querySelectorAll('.products-block .p-desc, .products-block .p-code').forEach(function(el) {
        el.style.setProperty('display', 'none', 'important');
      });
      document.querySelectorAll('.products-block .quantity').forEach(function(el) {
        el.style.setProperty('display', 'none', 'important');
      });
      /* Donutíme Shoptet slider přepočítat výšku/pozice po naší úpravě velikosti karet */
      window.dispatchEvent(new Event('resize'));
    }, 2000);

    /* Mobilní vlastní slider (23. 7. 2026) — postaven AŽ PO ustálení
       nativního Shoptet slideru (2000ms výše), ať klonujeme finální,
       už správně vykreslené karty. Viz komentář u funkce níže. */
    setTimeout(buildMobileProductSliders, 2200);
  }

  /* --- Mobilní vlastní slider pro homepage produkty (Bestsellery,
     V akci) — 23. 7. 2026, na žádost klienta.
     Nativní Shoptet slider posouvá karty přes JS transform
     (translate3d), NE přes opravdové scrollování (potvrzeno
     konzolí: overflow:hidden + cursor:grab na wrapperu, transform
     na .products-block) — na mobilu se při tažení prstem
     nepřichytával na celé karty, uživatel viděl náhodné "půlky"
     kartiček. Řešení: NEBOJUJEME s nativním JS (jeho touch handlery
     pravděpodobně blokují nativní scroll přes preventDefault) —
     místo toho na mobilu nativní slider schováme (CSS) a vedle
     postavíme VLASTNÍ klon karet (ne nové načítání dat, jen
     zkopírované už vykreslené .product elementy) s opravdovým
     overflow-x:auto + scroll-snap-type — stejný, už ověřený princip
     jako slider "Vybrané recepty" (zdvojené karty + tichý skok na
     hranici sady pro nekonečné procházení). Desktop beze změny. */
  function buildMobileProductSlider(headingSelector) {
    var heading = document.querySelector(headingSelector);
    if (!heading) return;
    var holder = heading.nextElementSibling;
    if (!holder || !holder.classList.contains('product-slider-holder')) return;
    if (holder.querySelector('.om-mobile-product-slider')) return; /* už postaveno */

    var sourceProducts = holder.querySelectorAll('.products-block .product');
    if (!sourceProducts.length) return;

    var wrap = document.createElement('div');
    /* Třída product-slider-holder navíc = klonované karty automaticky
       zdědí existující "deluxe" styl karet (.product-slider-holder
       .product .p ...), nemusíme ho duplikovat. CSS výše přebíjí
       nechtěné vlastnosti (overflow:hidden, padding) vyšší specificitou. */
    wrap.className = 'om-mobile-product-slider product-slider-holder';
    wrap.innerHTML =
      '<button type="button" class="om-mobile-slider-nav om-mobile-slider-nav-prev" aria-label="Předchozí"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 6l-6 6 6 6" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
      '<div class="om-mobile-product-slider-track"></div>' +
      '<button type="button" class="om-mobile-slider-nav om-mobile-slider-nav-next" aria-label="Další"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6l6 6-6 6" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></button>';

    var track = wrap.querySelector('.om-mobile-product-slider-track');
    Array.prototype.slice.call(sourceProducts).forEach(function (p) {
      track.appendChild(p.cloneNode(true));
    });

    holder.appendChild(wrap);

    /* Zdvojení karet — tichý skok na hranici sady, stejné jako recepty */
    var originalItems = Array.prototype.slice.call(track.querySelectorAll('.product'));
    originalItems.forEach(function (item) {
      var clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.setAttribute('tabindex', '-1');
      track.appendChild(clone);
    });

    var prevBtn = wrap.querySelector('.om-mobile-slider-nav-prev');
    var nextBtn = wrap.querySelector('.om-mobile-slider-nav-next');

    var scrollByCard = function (dir) {
      var card = track.querySelector('.product');
      var step = card ? card.getBoundingClientRect().width + 14 : 300;
      var half = track.scrollWidth / 2;

      if (dir > 0) {
        if (track.scrollLeft >= half - 5) track.scrollLeft -= half;
        track.scrollBy({ left: step, behavior: 'smooth' });
      } else {
        if (track.scrollLeft <= 5) track.scrollLeft += half;
        track.scrollBy({ left: -step, behavior: 'smooth' });
      }
    };
    prevBtn.addEventListener('click', function () { scrollByCard(-1); });
    nextBtn.addEventListener('click', function () { scrollByCard(1); });

    /* Přesné svislé vycentrování šipek na obrázek karty (23. 7. 2026)
       — od doby, co karta má šířku 100 % kontejneru místo pevných
       84vw, nejde výšku obrázku (čtvercový poměr stran) spolehlivě
       spočítat čistě v CSS, protože záleží na skutečné pixelové šířce
       kontejneru (ta se liší podle paddingu na dané stránce/zařízení).
       Změříme SKUTEČNOU vykreslenou výšku prvního obrázku a podle ní
       nastavíme "top" šipek — s malou rezervou počkáme na načtení
       obrázku (naming/lazy-load), ať neměříme nulovou výšku. */
    function positionSliderArrows() {
      var firstImage = track.querySelector('.image, a.image');
      if (!firstImage) return;
      var h = firstImage.getBoundingClientRect().height;
      if (!h) return;
      prevBtn.style.top = (h / 2) + 'px';
      nextBtn.style.top = (h / 2) + 'px';
    }
    positionSliderArrows();
    window.addEventListener('resize', positionSliderArrows);
    /* Ještě jednou o kousek později — pro případ pozdě dotaženého obrázku */
    setTimeout(positionSliderArrows, 500);
  }

  function buildMobileProductSliders() {
    buildMobileProductSlider('.homepage-products-heading-1');
    buildMobileProductSlider('.homepage-products-heading-2');
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

    /* -1. Příznaky (Novinka/Tip/Akce/Chlazené/Více za méně) — přesunout
       PŘED nadpis. Nativně jsou v .p-image-wrapper .p-image (position:
       absolute, aby seděly přes fotku) — po přesunu do jiného rodiče
       proto MUSÍME vynutit position:static, jinak zůstanou
       "pozicované" mimo viditelnou oblast (zmizí).
       POZOR: stejná třída .flags.flags-default se používá i u kartiček
       ve slideru "Produkty, které by vás mohli zajímat" — ale ten
       slider je MIMO .p-detail-inner, takže querySelector scoped na
       detailInner ho nezasáhne (ověřeno přes debug skript v konzoli). */
    var flagsEl = detailInner.querySelector('.p-image-wrapper .p-image > .flags.flags-default');
    if (flagsEl) {
      flagsEl.classList.add('om-flags-relocated');
      h1.parentNode.insertBefore(flagsEl, h1);
    }

    /* 0. Hodnocení přesuneme hned pod nadpis. Cílíme přímo na
       .ratings-and-brand uvnitř .p-detail-inner-header (desktopová
       verze) — NE .p-detail-inner-header-mobile, což je skrytá
       duplicitní kopie téhož widgetu, kterou Shoptet renderuje pro
       mobilní zobrazení (ověřeno přes konzoli, obě mají identický
       text, jen jiného rodiče).
       PŮVODNÍ ŘEŠENÍ (hledání elementu obsahujícího text "Značka:")
       bylo nespolehlivé — pokud produkt značku nezobrazuje, hledání
       selhalo, hvězdičky se nepřesunuly a zůstaly na původním místě
       (proto se stávalo, že badges skončily NAD hvězdičkami místo
       pod nimi). */
    var ratingRow = detailInner.querySelector('.p-detail-inner-header .ratings-and-brand');
    if (ratingRow && ratingRow !== h1 && h1.parentNode) {
      h1.parentNode.insertBefore(ratingRow, h1.nextSibling);
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

    /* Obsah badge (Vyrobeno v ČR / Ruční výroba / Vždy čerstvé) — vytažený
       do proměnné, ať se nemusí opisovat 2× (druhá kopie se vkládá níž,
       na mobilu, viz krok 3 u priceBlock). */
    var trustBadgesHtml = `
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

    var badges = document.createElement('div');
    badges.id = 'om-trust-badges';
    badges.innerHTML = trustBadgesHtml;
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

      /* Přejmenovat text tlačítka "Do košíku" -> "Přidat do košíku".
         Procházíme jen textové uzly uvnitř TOHOTO konkrétního tlačítka
         (cartBtn), ne globálně přes celou stránku — jiná tlačítka
         Do košíku (kartičky v kategorii, slidery) zůstávají beze změny. */
      if (cartBtn) {
        var walker = document.createTreeWalker(cartBtn, NodeFilter.SHOW_TEXT, null);
        var textNode;
        while ((textNode = walker.nextNode())) {
          if (textNode.textContent.trim() === 'Do košíku') {
            textNode.textContent = textNode.textContent.replace('Do košíku', 'Přidat do košíku');
          }
        }
      }

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

      /* ── MOBILNÍ STICKY CTA LIŠTA (28. 7. 2026, na žádost klienta) ──
         Přilepená lišta dole s počítadlem kusů + tlačítkem Přidat do
         košíku, aktivuje se JEN když hlavní CTA (.om-buy-row) není
         vidět (odscrollováno pryč) — přes IntersectionObserver.
         Žádné duplicitní přepočty cen/slev: tlačítka +/- na sticky
         liště jen PROKLIKÁVAJÍ nativní tlačítka Shoptetu
         (button.increase/.decrease), a tlačítko Přidat do košíku jen
         PROKLIKÁVÁ nativní cartBtn — veškerá logika množstevní slevy
         (přepočet ceny, "ušetříte", mobilní karty) zůstává beze změny,
         protože běží přes stejný input#amount a jeho 'input' event,
         který už posloucháme jinde (updateMainPrice,
         updateMobileQtySelection). Karty množstevní slevy se na
         sticky liště NEZOBRAZUJÍ (jen počet + tlačítko), podle zadání. */
      if (buyRow && qtyInput && cartBtn && !document.getElementById('om-sticky-cta')) {
        var nativeIncreaseBtn = qtyWrap.querySelector('button.increase');
        var nativeDecreaseBtn = qtyWrap.querySelector('button.decrease');

        var stickyBar = document.createElement('div');
        stickyBar.id = 'om-sticky-cta';
        stickyBar.innerHTML =
          '<div class="om-sticky-cta-inner">' +
            '<div class="om-sticky-cta-qty">' +
              '<button type="button" class="om-sticky-cta-minus" aria-label="Snížit množství">−</button>' +
              '<span class="om-sticky-cta-count">1</span>' +
              '<button type="button" class="om-sticky-cta-plus" aria-label="Zvýšit množství">+</button>' +
            '</div>' +
            '<button type="button" class="om-sticky-cta-btn">Přidat do košíku</button>' +
          '</div>';
        document.body.appendChild(stickyBar);

        var stickyCount = stickyBar.querySelector('.om-sticky-cta-count');
        var stickyMinus = stickyBar.querySelector('.om-sticky-cta-minus');
        var stickyPlus = stickyBar.querySelector('.om-sticky-cta-plus');
        var stickyAddBtn = stickyBar.querySelector('.om-sticky-cta-btn');

        function syncStickyCount() {
          stickyCount.textContent = qtyInput.value || '1';
        }
        syncStickyCount();
        qtyInput.addEventListener('input', syncStickyCount);

        stickyMinus.addEventListener('click', function () {
          if (nativeDecreaseBtn) nativeDecreaseBtn.click();
          /* Nativní tlačítko Shoptetu mění hodnotu inputu synchronně,
             ale ne vždy vyvolá 'input' event, na který spoléhá
             syncStickyCount() výše (28. 7. 2026 — klient hlásil, že
             se počet na sticky liště po kliknutí neaktualizoval).
             Přímé zavolání HNED po kliknutí je spolehlivé bez ohledu
             na to, jaký event (pokud vůbec nějaký) Shoptet interně
             používá. */
          syncStickyCount();
        });
        stickyPlus.addEventListener('click', function () {
          if (nativeIncreaseBtn) nativeIncreaseBtn.click();
          syncStickyCount();
        });
        stickyAddBtn.addEventListener('click', function () {
          cartBtn.click();
        });

        /* Sledujeme viditelnost nativního řádku s počítadlem a
           tlačítkem (.om-buy-row) — lišta se ukáže, jen když tenhle
           řádek NENÍ vidět (uživatel ho odscrolloval pryč). */
        if ('IntersectionObserver' in window) {
          var stickyObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              stickyBar.classList.toggle('om-sticky-cta-visible', !entry.isIntersecting);
            });
          }, { threshold: 0 });
          stickyObserver.observe(buyRow);
        }
      }

      /* Odkaz Pro firmy — UVNITŘ boxu, s ikonkou z GitHubu */
      var proFirmy = document.createElement('a');
      proFirmy.href = '/velkoobchod/';
      proFirmy.className = 'om-pro-firmy';
      proFirmy.innerHTML = '<img src="https://cdn.jsdelivr.net/gh/serbus-create/oldmans-shoptet@main/pro%20firmy.svg" alt=""> <strong>Pro firmy – Nabídka na míru</strong>';
      priceBlock.appendChild(proFirmy);

      /* Druhá kopie trust badges (Vyrobeno v ČR / Ruční výroba / Vždy
         čerstvé) — JEN pro mobil (viz CSS #om-trust-badges-mobile),
         umístěná přesně mezi odkaz "Pro firmy" a box hodnocení/zákazníků,
         podle klientova zadání (28. 7. 2026). Nahoře pod nadpisem
         (#om-trust-badges) zůstává jen pro desktop. */
      if (!document.getElementById('om-trust-badges-mobile')) {
        var badgesMobile = document.createElement('div');
        badgesMobile.id = 'om-trust-badges-mobile';
        badgesMobile.innerHTML = trustBadgesHtml;
        priceBlock.appendChild(badgesMobile);
      }

      /* Box hodnocení + box spokojených zákazníků — pod tlačítkem
         Do košíku (podle návrhu klienta). Hodnoty pro hvězdičky/počet
         hodnocení čteme z nativního widgetu (.stars-wrapper), který je
         v kroku 0 přesunutý hned pod nadpis — čteme z NĚJ (klonujeme
         hodnoty, ne uzel), ať nezasahujeme do nativního chování odkazu
         "Podrobnosti hodnocení". */
      var starsWrapper = document.querySelector('.stars-wrapper');
      if (starsWrapper) {
        var starsOnCount = starsWrapper.querySelectorAll('.star.star-on').length;
        var starsLabelEl = starsWrapper.querySelector('.stars-label');
        var reviewCountText = starsLabelEl ? starsLabelEl.textContent.trim() : '';
        var ariaText = starsWrapper.getAttribute('aria-label') || starsWrapper.textContent || '';
        var ratingMatch = ariaText.match(/(\d+[,.]\d+)\s*z\s*5/i);
        var ratingValue = ratingMatch ? ratingMatch[1].replace(',', '.') : (starsOnCount ? starsOnCount + '.0' : '');

        var summaryRow = document.createElement('div');
        summaryRow.className = 'om-summary-row';
        summaryRow.innerHTML =
          '<a class="om-rating-box" href="#ratingTab" data-toggle="tab" data-external="1" data-force-scroll="1">' +
            '<div class="om-rating-top">' +
              '<span class="om-rating-stars">' + '★'.repeat(starsOnCount) + '☆'.repeat(5 - starsOnCount) + '</span>' +
              '<span class="om-rating-value">' + ratingValue + '</span>' +
            '</div>' +
            '<div class="om-rating-count">' + reviewCountText + '</div>' +
          '</a>' +
          '<div class="om-customers-box">' +
            '<span class="om-customers-icon">👥</span>' +
            '<span class="om-customers-text"><strong>350 000+</strong><span>spokojených zákazníků</span></span>' +
          '</div>';
        priceBlock.appendChild(summaryRow);

        /* Poznámka pod boxy hodnocení/zákazníků (podle klientova vzoru) */
        var pricingNote = document.createElement('div');
        pricingNote.className = 'om-pricing-note';
        pricingNote.textContent = 'Uvedené ceny jsou včetně DPH | Uvedená sleva se počítá z běžné ceny';
        priceBlock.appendChild(pricingNote);
      }
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

    /* 7. Množstevní sleva — rozdělit každý řádek na barevný štítek (Bez slevy /
       Sleva -X %) + počet kusů + cenu, aby šlo zobrazit jako karty vedle sebe.
       Vychází ze skutečné struktury: .quantity-discounts__item[data-price-ratio]
       > .quantity-discounts__title (text "2 ks = sleva 5 %") + .quantity-discounts__price-wrapper */
    var qdTable = document.querySelector('.quantity-discounts__table');
    var qdHeadline = document.querySelector('.quantity-discounts__headline');
    /* Nadpis — DESKTOP zůstává krátký "Množství" (jako doteď), MOBIL dostává
       delší variantu "Množstevní sleva — víc kusů, nižší cena za kus" podle
       klientova mockupu (28. 7. 2026). Obě varianty existují v DOM zároveň,
       přepínají se přes CSS media query (stejný princip jako tlačítko
       "Ukázat všechny" jinde na webu). */
    if (qdHeadline && !qdHeadline.dataset.omHeadlineDone) {
      qdHeadline.innerHTML =
        '<span class="qd-headline-desktop">Množství</span>' +
        '<span class="qd-headline-mobile">Množstevní sleva <span class="qd-mobile-subtitle">— víc kusů, nižší cena za kus</span></span>';
      qdHeadline.dataset.omHeadlineDone = 'true';
    }
    if (qdTable && !qdTable.dataset.omDone) {
      Array.prototype.slice.call(qdTable.querySelectorAll('.quantity-discounts__item')).forEach(function(item) {
        var titleEl = item.querySelector('.quantity-discounts__title');
        var priceWrapper = item.querySelector('.quantity-discounts__price-wrapper');
        if (!titleEl || !priceWrapper) return;

        /* Text typu "2 ks = sleva 5 %" nebo jen "1 ks" — vezmeme jen část před "=" */
        var rawText = titleEl.textContent.replace(/\s+/g, ' ').trim();
        var qtyText = rawText.split('=')[0].trim();

        var ratio = parseFloat(item.getAttribute('data-price-ratio'));
        var percent = isNaN(ratio) ? 0 : Math.round((1 - ratio) * 100);

        var badge = document.createElement('div');
        badge.className = 'qd-badge ' + (percent > 0 ? 'qd-badge--discount' : 'qd-badge--none');
        badge.textContent = percent > 0 ? ('Sleva -' + percent + '%') : 'Bez slevy';

        var body = document.createElement('div');
        body.className = 'qd-body';
        var qty = document.createElement('div');
        qty.className = 'qd-qty';
        qty.textContent = qtyText;

        body.appendChild(qty);
        body.appendChild(priceWrapper);

        item.innerHTML = '';
        item.appendChild(badge);
        item.appendChild(body);
      });
      qdTable.dataset.omDone = 'true';
    }

    /* 7b. MOBILNÍ vlastní grafika množstevní slevy (28. 7. 2026, podle
       klientova schváleného mockupu) — samostatná sada karet VEDLE
       nativní/desktop verze z kroku 7 výše (ta zůstává, jen se na
       mobilu schová přes CSS). Zdroj dat: stejné .quantity-discounts__item
       elementy (data-amount, data-price-ratio, .quantity-discounts__item--
       highlighted = nativní příznak "nejprodávanější", .qd-qty = už
       naformátovaný text množství z kroku 7 výše). */
    if (qdTable && !qdTable.dataset.omMobileDone) {
      var origPriceMobile = parseFloat(qdTable.getAttribute('data-orig-price'));
      var mobileItems = Array.prototype.slice.call(qdTable.querySelectorAll('.quantity-discounts__item[data-amount]'));

      if (!isNaN(origPriceMobile) && mobileItems.length) {
        var formatKc = function (value) {
          return Math.round(value) + ' Kč';
        };
        /* "2 ks" -> "2×", "3 - 5 ks" -> "3–5×", "6 a více ks" -> "6×+" */
        var formatQtyLabel = function (rawText) {
          var t = (rawText || '').replace(/\s+/g, ' ').trim();
          var m;
          if ((m = t.match(/^(\d+)\s*-\s*(\d+)\s*ks$/))) return m[1] + '\u2013' + m[2] + '\u00d7';
          if ((m = t.match(/^(\d+)\s*a\s*v[ií]ce\s*ks$/i))) return m[1] + '\u00d7+';
          if ((m = t.match(/^(\d+)\s*ks$/))) return m[1] + '\u00d7';
          return t;
        };

        var mobileTiers = mobileItems.map(function (item) {
          var qtyEl = item.querySelector('.qd-qty');
          return {
            amount: parseInt(item.getAttribute('data-amount'), 10),
            ratio: parseFloat(item.getAttribute('data-price-ratio')),
            /* Natvrdo vždy na tier s 2 kusy (na žádost klienta, 28. 7. 2026) —
               NE podle nativního Shoptet příznaku quantity-discounts__item--
               highlighted (ten by odznak dal na jinou hladinu, podle toho, co
               je zrovna nastavené v administraci Shoptetu). */
            highlighted: parseInt(item.getAttribute('data-amount'), 10) === 2,
            qtyLabel: formatQtyLabel(qtyEl ? qtyEl.textContent : '')
          };
        }).sort(function (a, b) { return a.amount - b.amount; });

        var grid = document.createElement('div');
        grid.className = 'qd-mobile-grid';

        mobileTiers.forEach(function (tier, idx) {
          var isLast = idx === mobileTiers.length - 1;
          var card = document.createElement('div');
          card.className = 'qd-mobile-item';
          card.setAttribute('data-amount', tier.amount);

          var priceValue = origPriceMobile * tier.ratio;
          var priceHtml = '<div class="qd-mobile-price">' + formatKc(priceValue) +
            ' <span class="qd-mobile-unit">/ ks</span>';
          if (tier.ratio < 1) {
            priceHtml += ' <span class="qd-mobile-orig">' + Math.round(origPriceMobile) + '</span>';
          }
          priceHtml += '</div>';

          var saveHtml = '';
          if (tier.ratio < 1) {
            var totalSave = Math.round((origPriceMobile - priceValue) * tier.amount);
            saveHtml = '<div class="qd-mobile-save' + (isLast ? ' qd-mobile-save--big' : '') + '">ušetříte ' + totalSave + ' Kč</div>';
          }

          card.innerHTML =
            '<div class="qd-mobile-pill-slot"></div>' +
            '<div class="qd-mobile-qty">' + tier.qtyLabel + '</div>' +
            priceHtml +
            saveHtml;

          card.addEventListener('click', function () {
            var qtyInput = document.querySelector('#product-detail-form input[name="amount"], #product-detail-form input[type="number"]');
            if (!qtyInput) return;
            qtyInput.value = tier.amount;
            qtyInput.dispatchEvent(new Event('input', { bubbles: true }));
          });

          grid.appendChild(card);
        });

        qdTable.parentNode.insertBefore(grid, qdTable.nextSibling);

        /* Zvýraznění aktuálně "vybrané" karty (červený rámeček + pilulka
           "✓ Vybráno") podle hodnoty v počítadle kusů — přepočítá se při
           načtení, po psaní do pole i po kliknutí na +/- v košíkovém
           formuláři (stejný vzorec jako updateMainPrice() výše). */
        var updateMobileQtySelection = function () {
          var qtyInput = document.querySelector('#product-detail-form input[name="amount"], #product-detail-form input[type="number"]');
          var qty = qtyInput ? parseInt(qtyInput.value, 10) : 1;
          if (!qty || qty < 1) qty = 1;

          var applicable = mobileTiers[0];
          mobileTiers.forEach(function (t) {
            if (qty >= t.amount && t.amount >= applicable.amount) applicable = t;
          });

          grid.querySelectorAll('.qd-mobile-item').forEach(function (card) {
            var amount = parseInt(card.getAttribute('data-amount'), 10);
            var slot = card.querySelector('.qd-mobile-pill-slot');
            var isSelected = amount === applicable.amount;
            card.classList.toggle('qd-mobile-item--selected', isSelected);
            if (!slot) return;

            if (isSelected) {
              slot.innerHTML = '<div class="qd-mobile-pill qd-mobile-pill--selected">\u2713 Vybráno</div>';
              return;
            }
            var idx = mobileTiers.map(function (t) { return t.amount; }).indexOf(amount);
            var tier = mobileTiers[idx];
            var isLast = idx === mobileTiers.length - 1;
            if (tier && tier.highlighted) {
              slot.innerHTML = '<div class="qd-mobile-pill qd-mobile-pill--popular">\u2605 Nejprodávanější</div>';
            } else if (isLast) {
              slot.innerHTML = '<div class="qd-mobile-pill qd-mobile-pill--savings">Největší úspora</div>';
            } else {
              slot.innerHTML = '';
            }
          });
        };

        updateMobileQtySelection();
        document.addEventListener('input', function (e) {
          if (e.target.matches('#product-detail-form input[name="amount"], #product-detail-form input[type="number"]')) {
            updateMobileQtySelection();
          }
        });
        document.addEventListener('click', function (e) {
          if (e.target.closest('#product-detail-form')) {
            setTimeout(updateMobileQtySelection, 50);
          }
        });

        /* Ukazatel dopravy zdarma (28. 7. 2026, podle mockupu) — vychází
           ZE SKUTEČNÉHO OBSAHU KOŠÍKU (ne jen z tohoto produktu), stejné
           čtení částky jako syncCart() výše (.header-cart-total apod.).
           Limit 1350 Kč — stejná hodnota jako v červené USP liště na
           homepage ("Doprava zdarma u objednávek nad 1 350 Kč"). */
        var FREE_SHIPPING_THRESHOLD = 1350;
        var shipWrap = document.createElement('div');
        shipWrap.className = 'qd-mobile-shipping';
        shipWrap.innerHTML =
          '<div class="qd-mobile-shipping-bar"><div class="qd-mobile-shipping-fill"></div></div>' +
          '<div class="qd-mobile-shipping-text">🚚 <span class="qd-mobile-shipping-msg"></span></div>';
        grid.parentNode.insertBefore(shipWrap, grid.nextSibling);

        var getCartTotalKc = function () {
          var el = document.querySelector('.header-cart-total, .cart-total-price, [data-testid="headerCartPrice"]');
          if (!el) return 0;
          var num = (el.textContent || '').replace(/[^\d,.]/g, '').replace(',', '.');
          var val = parseFloat(num);
          return isNaN(val) ? 0 : val;
        };

        var updateShippingProgress = function () {
          var total = getCartTotalKc();
          var remaining = FREE_SHIPPING_THRESHOLD - total;
          var pct = Math.max(0, Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100));
          var fillEl = shipWrap.querySelector('.qd-mobile-shipping-fill');
          var msgEl = shipWrap.querySelector('.qd-mobile-shipping-msg');
          if (fillEl) fillEl.style.width = pct + '%';
          if (msgEl) {
            msgEl.textContent = remaining > 0
              ? ('ještě ' + Math.ceil(remaining) + ' Kč a vezeme zdarma')
              : 'Máte dopravu zdarma!';
          }
        };

        updateShippingProgress();
        /* Košík se natahuje asynchronně (viz syncCart() výše) — zkusíme to
           i o kousek později, ať máme reálnou částku, ne jen "Prázdný košík". */
        setTimeout(updateShippingProgress, 1000);
        setTimeout(updateShippingProgress, 2500);
        document.addEventListener('click', function () { setTimeout(updateShippingProgress, 600); });

        qdTable.dataset.omMobileDone = 'true';
      }
    }

    /* 8. Hlavní cena se má měnit podle zadaného počtu kusů (dle množstevní slevy).
       Vychází z data-orig-price na .quantity-discounts__table a data-amount/
       data-price-ratio na jednotlivých .quantity-discounts__item (zůstávají
       zachovány i po přestavbě v kroku 7, protože jsme mazali jen jejich obsah). */
    if (qdTable) {
      var origPrice = parseFloat(qdTable.getAttribute('data-orig-price'));
      var priceFinalEl = document.querySelector('.om-price-box .price-final');
      var qdItems = Array.prototype.slice.call(qdTable.querySelectorAll('.quantity-discounts__item[data-amount]'));

      if (!isNaN(origPrice) && priceFinalEl && qdItems.length) {
        var tiers = qdItems.map(function(item) {
          return {
            amount: parseInt(item.getAttribute('data-amount'), 10),
            ratio: parseFloat(item.getAttribute('data-price-ratio'))
          };
        }).sort(function(a, b) { return a.amount - b.amount; });

        var origPriceEl = document.querySelector('.om-price-box .om-price-orig');
        if (!origPriceEl && priceFinalEl.parentNode) {
          origPriceEl = document.createElement('span');
          origPriceEl.className = 'om-price-orig';
          priceFinalEl.parentNode.insertBefore(origPriceEl, priceFinalEl);
        }
        if (priceFinalEl.parentNode) {
          priceFinalEl.parentNode.classList.add('om-price-row');
        }

        /* Přesuneme nativní "Ušetříte X Kč" k ceně, ať je to jeden ucelený řádek
           místo samostatného odděleného bloku pod kartami slev. */
        var saveEl = document.querySelector('.quantity-discounts__save');
        if (saveEl && priceFinalEl.parentNode && saveEl.parentNode !== priceFinalEl.parentNode) {
          priceFinalEl.parentNode.appendChild(saveEl);
        }

        var formatPrice = function(value) {
          var rounded = Math.round(value * 100) / 100;
          var text = (rounded % 1 === 0) ? String(rounded) : rounded.toFixed(2).replace('.', ',');
          return text + ' Kč';
        };

        var updateMainPrice = function() {
          var qtyInput = document.querySelector('#product-detail-form input[name="amount"], #product-detail-form input[type="number"]');
          var qty = qtyInput ? parseInt(qtyInput.value, 10) : 1;
          if (!qty || qty < 1) qty = 1;

          var applicable = { amount: 0, ratio: 1 };
          tiers.forEach(function(t) {
            if (qty >= t.amount && t.amount >= applicable.amount) applicable = t;
          });

          priceFinalEl.textContent = formatPrice(origPrice * applicable.ratio);
          if (origPriceEl) {
            if (applicable.ratio < 1) {
              origPriceEl.textContent = formatPrice(origPrice);
              origPriceEl.style.display = 'inline';
            } else {
              origPriceEl.style.display = 'none';
            }
          }
          if (saveEl) {
            saveEl.style.display = (applicable.ratio < 1) ? '' : 'none';
          }
        };

        updateMainPrice();
        document.addEventListener('input', function(e) {
          if (e.target.matches('#product-detail-form input[name="amount"], #product-detail-form input[type="number"]')) {
            updateMainPrice();
          }
        });
        document.addEventListener('click', function(e) {
          if (e.target.closest('#product-detail-form')) {
            setTimeout(updateMainPrice, 50);
          }
        });
      }
    }

    /* 9. "Hlídat dostupnost" u vyprodaných/nedostupných produktů
       (29. 7. 2026, na žádost klienta) — nativní odkaz "Hlídat"
       (a.watchdog) se přesune vedle textu "Položka byla vyprodána…"
       (.sold-out-wrapper > span.sold-out), zarovnaný doprava na stejný
       řádek, přejmenuje na "Hlídat dostupnost" a zvýrazní zeleně.
       Element .sold-out-wrapper existuje v DOM JEN když je produkt
       nedostupný — takže tahle úprava se sama netýká skladem produktů
       (ty žádný .sold-out-wrapper nemají, ověřeno konzolí). */
    var soldOutWrapper = document.querySelector('.sold-out-wrapper');
    var watchdogLink = document.querySelector('.link-icons .watchdog, a.watchdog');
    if (soldOutWrapper && watchdogLink && !soldOutWrapper.querySelector('.watchdog')) {
      watchdogLink.classList.add('om-watchdog-cta');
      var watchdogLabel = watchdogLink.querySelector('span');
      if (watchdogLabel) watchdogLabel.textContent = 'Hlídat dostupnost';
      soldOutWrapper.appendChild(watchdogLink);
    }
  }

  enhanceProductDetail();

  /* Mobilní vlastní slider i pro sekce na detailu produktu (28. 7.
     2026, na žádost klienta — dřív jen homepage). Stejná funkce
     buildMobileProductSlider() funguje beze změny, protože obě
     sekce mají STEJNOU strukturu jako homepage slidery — ověřeno
     přes konzoli:
       h2.products-related-header      -> sourozenec .product-slider-holder
       h2.products-alternative-header  -> sourozenec .product-slider-holder
     (obě "Související produkty" i "Produkty, které by vás mohli
     zajímat"). Malé zpoždění, ať jsou karty v DOMu už vykreslené
     (na detailu produktu se nedělá tak dlouhé čekání jako na
     homepage, protože tahle sekce se nespoléhá na JS přepočet
     sloupců stejným způsobem — 800ms je bezpečná rezerva). */
  setTimeout(function () {
    buildMobileProductSlider('h2.products-related-header');
    buildMobileProductSlider('h2.products-alternative-header');
  }, 800);

  /* Po přidání do košíku → přesměrovat na košík */
  function watchCart() {
    /* Sledujeme změnu našeho #om-cart-price elementu */
    var cartPrice = document.getElementById('om-cart-price');
    if (cartPrice) {
      var lastVal = cartPrice.textContent;
      var observer = new MutationObserver(function() {
        var newVal = cartPrice.textContent;
        if (newVal !== lastVal && newVal !== 'Prázdný košík') {
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
