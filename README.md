# milano-kelly — Budget dashboard

Private, password-protected budget tracker for Kelly's Milan Italian course
(27 May – 13 Jul 2026). Italian + English.

- `index.html` — the **encrypted** page (StatiCrypt). This is what GitHub Pages serves.
- `source.html` — plaintext source (gitignored). Edit this, then re-encrypt.

## Re-encrypt after editing source.html
```
npx staticrypt source.html -p '<password>' --short -c .staticrypt.json -d encrypted \
  --template-title 'Spese di Kelly · Milano 2026' \
  --template-instructions 'Inserisci la password per vedere le spese · Enter the password' \
  --template-button 'Apri · Open' --template-color-primary '#008c45' --template-color-secondary '#0aa055'
cp encrypted/source.html index.html
node bust-cache.mjs   # re-inject cache-buster (StatiCrypt drops it on re-encrypt)
```

`bust-cache.mjs` adds a `?v=<timestamp>` redirect to the gate page so re-opening the
URL in the same browser always pulls the latest content (StatiCrypt's no-cache
`<meta>` tags are ignored by browsers for the document itself). It's idempotent.

## Publish (when ready)
```
gh repo create dballesteros7/milano-kelly --public --source=. --push
gh api -X POST repos/dballesteros7/milano-kelly/pages -f 'source[branch]=main' -f 'source[path]=/'
```
