/**
 * A lightweight youtube embed. Still should feel the same to the user, just MUCH faster to initialize and paint.
 *
 * Thx to these as the inspiration
 *   https://storage.googleapis.com/amp-vs-non-amp/youtube-lazy.html
 *   https://autoplay-youtube-player.glitch.me/
 *
 * Once built it, I also found these:
 *   https://github.com/ampproject/amphtml/blob/master/extensions/amp-youtube (👍👍)
 *   https://github.com/Daugilas/lazyYT
 *   https://github.com/vb/lazyframe
 */
class LiteYTEmbed extends HTMLElement {
  constructor() {
      super();

      // Gotta encode the untrusted value
      // https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#rule-2---attribute-escape-before-inserting-untrusted-data-into-html-common-attributes
      this.videoId = encodeURIComponent(this.getAttribute('videoid'));
      this.posterUrl = this.getAttribute('thumbnail');
      this.playBtn = this.querySelector('.lty-playbtn');
  }

  connectedCallback() {
      this.style.backgroundImage = `url("${this.posterUrl}")`;

    //   const playBtn = document.createElement('div');
    //   playBtn.textContent = "Watch video"
    //   playBtn.classList.add('lty-playbtn absolute right-0 bottom-0 p-3 bg-green-700 hover:bg-green-900 focus:bg-green-900 text-white flex items-center justify-center z-10');
    //   this.append(playBtn);

      // On hover (or tap), warm up the TCP connections we're (likely) about to use.
      this.addEventListener('pointerover', LiteYTEmbed.warmConnections, {once: true});

      // Once the user clicks, add the real iframe and drop our play button
      // TODO: In the future we could be like amp-youtube and silently swap in the iframe during idle time
      //   We'd want to only do this for in-viewport or near-viewport ones: https://github.com/ampproject/amphtml/pull/5003
      this.playBtn.addEventListener('click', e => this.addIframe());
  }

  // // TODO: Support the the user changing the [videoid] attribute
  // attributeChangedCallback() {
  // }

  /**
   * Add a <link rel={preload | preconnect} ...> to the head
   */
  static addPrefetch(kind, url, as) {
      const linkElem = document.createElement('link');
      linkElem.rel = kind;
      linkElem.href = url;
      if (as) {
          linkElem.as = as;
      }
      linkElem.crossOrigin = 'anonymous';
      document.head.append(linkElem);
  }

  /**
   * Begin pre-connecting to warm up the iframe load
   * Since the embed's network requests load within its iframe,
   *   preload/prefetch'ing them outside the iframe will only cause double-downloads.
   * So, the best we can do is warm up a few connections to origins that are in the critical path.
   *
   * Maybe `<link rel=preload as=document>` would work, but it's unsupported: http://crbug.com/593267
   * But TBH, I don't think it'll happen soon with Site Isolation and split caches adding serious complexity.
   */
  static warmConnections() {
      if (LiteYTEmbed.preconnected) return;

      // The iframe document and most of its subresources come right off youtube.com
      LiteYTEmbed.addPrefetch('preconnect', 'https://www.youtube-nocookie.com');
      // The botguard script is fetched off from google.com
      LiteYTEmbed.addPrefetch('preconnect', 'https://www.google.com');

      // Not certain if these ad related domains are in the critical path. Could verify with domain-specific throttling.
      LiteYTEmbed.addPrefetch('preconnect', 'https://googleads.g.doubleclick.net');
      LiteYTEmbed.addPrefetch('preconnect', 'https://static.doubleclick.net');

      LiteYTEmbed.preconnected = true;
  }

  addIframe(){
      const iframeHTML = `
<iframe width="560" height="315" frameborder="0"
allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
src="https://www.youtube-nocookie.com/embed/${this.videoId}?autoplay=1"
></iframe>`;
      this.insertAdjacentHTML('beforeend', iframeHTML);
      this.classList.add('lyt-activated');
  }
}
// Register custome element
customElements.define('lite-youtube', LiteYTEmbed);
