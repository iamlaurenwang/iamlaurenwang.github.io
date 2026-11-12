# TODO: SEO 優化

詳細規劃見 `docs/requirements/20260805-seo.md`。

## 待辦清單

- [ ] P0：router 切換 `createWebHashHistory` → `createWebHistory`
- [ ] P0：新增 `public/404.html`
- [ ] P1：更新 `index.html`（lang, title, meta, OG, Twitter Card, canonical, JSON-LD）
- [ ] P1：移除 `main.css` 的 `@import` Google Fonts，改為 `index.html` 的 `<link>`
- [ ] P1：準備 `public/favicon.svg`、`public/apple-toPuch-icon.png`
- [ ] P2：新增 `public/robots.txt`
- [ ] P2：新增 `public/sitemap.xml`
- [ ] P3：安裝 `@vueuse/head`，在 `main.ts` 掛載，各頁面加 `useHead`
- [ ] 製作正式 OG Image（1200×630px）放到 `public/og-image.png`
- [ ] 上線後至 Google Search Console 提交 sitemap
