#!/usr/bin/env node
// Injects a cache-busting redirect into the StatiCrypt gate page (index.html).
// StatiCrypt's no-cache <meta> tags are ignored by browsers for the document
// itself, so the page is served stale from disk cache on re-open. This bounces
// each fresh load to ?v=<timestamp> — a new cache key — forcing GitHub Pages to
// serve current content. Loop-safe: only redirects when the URL's v is stale.
// Idempotent; re-run after every `cp encrypted/source.html index.html`.
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'index.html';
const MARK = 'cache-bust-redirect';
const SNIPPET = `
        <!-- ${MARK} -->
        <script>
        (function(){
          var p=new URLSearchParams(location.search),v=+p.get('v')||0,now=Date.now();
          if(now-v>3000){p.set('v',now);location.replace(location.pathname+'?'+p.toString()+location.hash);}
        })();
        </script>`;

let html = readFileSync(FILE, 'utf8');
if (html.includes(MARK)) {
  console.log('cache-bust: already present, nothing to do');
} else {
  html = html.replace('</head>', SNIPPET + '\n    </head>');
  writeFileSync(FILE, html);
  console.log('cache-bust: injected into', FILE);
}
