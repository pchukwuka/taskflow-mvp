# Web Infrastructure Overview — TASKFLOW 🌐

This document explains how a static web app is delivered from server to user in plain terms and with a small diagram.

 

## Diagram (flow)

```
User -> Browser -> Internet -> DNS -> Web Server / CDN -> Static files (index.html, style.css, script.js)
```

See `diagram.png` for a visual flow (also included in repo).

 

## What happens when a user types the site URL?

1. **DNS lookup**: The browser asks DNS for the IP address of the domain. DNS returns the IP of the hosting provider/CDN.
2. **TCP/TLS handshake**: The browser establishes a secure TLS connection to the server (if HTTPS).
3. **HTTP request**: The browser issues an HTTP GET for `/` which typically resolves to `index.html`.
4. **Server response**: The web server (or edge cache in a CDN) returns `index.html` (200 OK). The browser parses the HTML.
5. **Resource loading**: Browser requests CSS (`style.css`), JavaScript (`script.js`), and other assets referenced in the HTML.
6. **Execution**: JavaScript runs in the browser, attaches event listeners, and may use `localStorage` for persistence.

 

## Roles & Responsibilities

- **Browser**: Makes requests, parses and renders content, executes JavaScript.
- **DNS**: Maps domain names to IP addresses (transparent to end user).
- **Web server/CDN**: Hosts files and responds to HTTP requests. For static hosting, files are served from object storage or an edge network.
- **Static files**: Files that contain HTML, CSS, JS — delivered unchanged.

 

## How assets are fetched

- The browser reads `index.html`, parses `<link>` and `<script>` tags, and issues parallel requests to fetch those files. JavaScript is executed in the order requested (unless `defer`/`async` is used).

 

## Scalability & Reliability (conceptual)

- **CDN**: Caches files close to users for low latency and high availability.
- **Load balancing**: For dynamic or high-traffic sites, traffic is distributed across multiple servers.
- **Caching headers**: Proper `Cache-Control` settings reduce origin load and improve performance.

 

## Security & Best Practices

- Use HTTPS (TLS) — Vercel/Netlify/GitHub Pages provide free TLS.
- Keep client-side code minimal and avoid exposing secrets in frontend code.

