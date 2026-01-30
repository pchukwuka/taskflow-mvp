# TASKFLOW — Mini Task Manager (MVP) ✅

A lightweight, responsive task management web app built with **HTML**, **CSS**, and **JavaScript**
 

##  Live Demo

 Live URL: **REPLACE_WITH_YOUR_DEPLOYED_URL**

(If you deploy to Vercel, Netlify, or GitHub Pages, put the final URL above.)

 

##  Problem Statement & Idea

Startups need a fast, low-cost way to validate ideas. TASKFLOW is an MVP to quickly capture and track tasks in the browser and share a public prototype with users.

 

##  Features

- Add new tasks (title, project, priority, due date)
- Display tasks with priority and due date
- Mark tasks as completed
- Delete tasks
- Persistent tasks using `localStorage`
- Responsive design and accessible interactions

 

##  Technology Stack

- HTML (structure)
- CSS (styling, responsive design)
- JavaScript (logic, localStorage)
- Hosting: **Vercel** — static hosting

 

##  Run Locally

1. Clone the repo:

```bash
git clone <your-repo-url>
cd peace
```

2. Quick options to run locally:

- Double-click `index.html` and open in browser
- Use VS Code Live Server (recommended)



##  Deployment (Summary)

This project is a static site (HTML/CSS/JS only). You can deploy it to any static hosting platform: **Vercel**, **Netlify**, or **GitHub Pages**.

See `DEPLOYMENT.md` for step-by-step instructions (Vercel preferred for simplicity).

 

##  Web Infrastructure — Quick Explanation

- **Browser**: Requests your site, parses HTML, loads CSS/JS, and executes JavaScript.
- **DNS**: Translates your friendly domain to the hosting provider's IP addresses.
- **Web server / CDN (Vercel/Netlify)**: Serves the static `index.html`, `style.css`, and `script.js` files over HTTP(S).
- **Static files**: These files are delivered directly to browser and cached at the edge for speed.

A more detailed explanation and diagram are in `INFRASTRUCTURE.md`.


 


##  Design Choices

- No backend: persistence is via `localStorage` for simplicity and to satisfy the assignment's constraints (static hosting).
- Prioritized accessibility and clear UI for quick MVP validation.



##  Repository Structure


/peace
  ├── index.html
  ├── style.css
  ├── script.js
  ├── README.md
  ├── DEPLOYMENT.md
  └── INFRASTRUCTURE.md

