![Zubi Exited Begin](https://raw.githubusercontent.com/Ceastin/zubidu/main/frontend/public/zubi-exited-begin.gif)
### Zubidu

<img width="2752" height="1536" alt="Gemini_Generated_Image_afsjvtafsjvtafsj (1)" src="https://github.com/user-attachments/assets/8ef941cf-f098-4386-9e1e-157338a1f9a1" />



Zubidu features a clear separation between the **backend** (server-side logic, APIs) and **frontend** (user interface), making it highly scalable, maintainable, and easy to develop.

---

## 📑 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features
- ⚡ **Fast full-stack setup:** Get developing in minutes.
- 🗂️ **Monorepo structure:** Clean separation of frontend and backend environments.
- 🌐 **Responsive frontend:** Solid foundation using CSS, HTML, and JavaScript.
- 🔒 **Secure architecture:** API-first backend design ready for scaling (coming soon).
- 🚀 **Extensible:** Easily adaptable for modern frameworks (React, Express, etc.).

---

## 🛠 Tech Stack

| Layer | Technologies | Notes |
| :--- | :--- | :--- |
| **Frontend** | JavaScript (84.3%), CSS (14.4%), HTML (1.3%) | Ready for React, Vue, Svelte, or Vanilla JS |
| **Backend** | Node.js | Planned: Express / Fastify / NestJS |
| **Package Mgr** | npm / Yarn / pnpm | Developer's choice |
| **Tools** | Git | Clean repo hygiene with `.gitignore` |

---

## 📂 Project Structure
```text
zubidu/
 ├── backend/                # Server, APIs, business logic
 │   ├── src/                # (planned) source code
 │   ├── package.json        # (add when initializing)
 │   └── ...
 ├── frontend/               # Client-side UI & logic
 │   ├── public/             # Static assets
 │   ├── src/                # Components, pages, styles
 │   ├── index.html          
 │   └── package.json        
 ├── assets/                 # Logos, banners, images 
 ├── diagrams/               # Architecture diagrams 
 ├── screenshots/            # UI snapshots for README
 ├── .gitignore              
 └── README.md               # ← You are here

```
## Architecture

Classic client-server separation with REST/GraphQL API communication (to be implemented).
<img width="1024" height="1536" alt="c0784d00-4e87-4dfa-a6bb-b43557a88494" src="https://github.com/user-attachments/assets/7c12a845-1486-43b3-9cdd-21290f880e0f" />
<img width="1536" height="1024" alt="ChatGPT Image Feb 16, 2026, 11_53_48 PM" src="https://github.com/user-attachments/assets/9980c214-bf80-4d55-a264-0a90acc1018e" />


## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm / Yarn / pnpm
- Git

### Quick Setup

1. Clone the repo
```
   git clone https://github.com/Ceastin/zubidu.git
   cd zubidu
```
2. Initialize backend (example with Express)
```
   cd backend
   npm init -y
   npm install express dotenv cors
   # Create index.js or src/server.js ...
```
3. Initialize frontend (example with Vite + vanilla JS)
```
   cd ../frontend
   npm create vite@latest . -- --template vanilla
   npm install
```
4. (Optional) Use a monorepo tool like Turborepo / Nx later for better workflows.
   # Backend (example)
```
   cd backend
   npm run dev    # or node src/server.js

   # Frontend
   cd frontend
   npm run dev    # usually opens http://localhost:5173
```
Screenshots
<img width="1891" height="916" alt="image" src="https://github.com/user-attachments/assets/5b3e596f-6acb-4c19-9e82-e79354835b86" />

<img width="1897" height="147" alt="image" src="https://github.com/user-attachments/assets/b0616226-3d92-42b0-b5af-5fd23cff6720" />


<img width="1878" height="923" alt="image" src="https://github.com/user-attachments/assets/437f8bb1-bda2-459d-ab78-643b63d62a49" />


Contributing
Contributions are welcome!

  Fork the repository
  Create your feature branch (git checkout -b feature/amazing-feature)
  Commit your changes (git commit -m 'Add some amazing feature')
  Push to the branch (git push origin feature/amazing-feature)
  Open a Pull Request

Please follow conventional commits if possible.

License
MIT License
See LICENSE for full text (add the file when ready).

Happy coding! 🚀
Built with ❤️ by Ceastin


Feel free to customize sections (especially the tech stack and setup commands) as you add real code to `backend/` and `frontend/`.  

When you add images:
- Create folders: `assets/`, `diagrams/`, `screenshots/`
- Upload files via GitHub or git
- Update the markdown image links accordingly

Let me know if you want variations (shorter version, different tone, specific framework assumptions, etc.)!
