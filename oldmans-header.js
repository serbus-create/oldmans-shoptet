(function() {
  function injectHeader() {
    // Topbar
    var topbar = document.createElement('div');
    topbar.id = 'om-topbar';
    topbar.innerHTML = '<div class="om-topbar-inner"><a href="tel:+420774772405">📞 +420 774 772 405</a><div><a href="/jak-nakupovat/">Jak nakupovat</a> | <a href="/obchodni-podminky/">Obchodní podmínky</a></div></div>';

    // Header
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

    var body = document.body;
    body.insertBefore(header, body.firstChild);
    body.insertBefore(topbar, body.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHeader);
  } else {
    injectHeader();
  }
})();
