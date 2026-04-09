# 🚀 OnboardAI — AI-Powered Onboarding Guide Generator

OnboardAI is a full-stack MERN application that generates comprehensive, personalized onboarding guides using AI (Groq + NVIDIA NIM). Users fill a multi-step wizard form with company and role context, and the system produces rich markdown onboarding documents.

---

## ✨ Features

- **🤖 AI-Powered Generation** — Uses LLaMA 3.1 models via Groq (primary) and NVIDIA NIM (fallback)
- **📝 Multi-Step Wizard** — 5-step form: Company Info → Role → Tools → Culture → Customize
- **📚 Template Library** — 6 pre-built templates (Developer, Marketing, Sales, Support, General, Open Source)
- **💾 Save & Manage** — Full CRUD for guides with search, filter, and pagination
- **🔗 Public Sharing** — Share guides via unique public links
- **📄 Export PDF** — Download any guide as a formatted PDF
- **📋 Copy to Clipboard** — One-click copy of markdown content
- **🔐 Authentication** — JWT-based auth with register/login
- **🎨 Beautiful UI** — Dark glassmorphism design with Framer Motion animations

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion, React Router v6 |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **AI/LLM** | Groq SDK (LLaMA 3.1 70B), NVIDIA NIM (LLaMA 3.1 405B) |
| **Auth** | JWT, bcryptjs |
| **Other** | Axios, React Markdown, html2pdf.js, Lucide Icons |

---

## 📦 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **MongoDB** (local or Atlas connection string)
- **Groq API Key** — Get from [console.groq.com](https://console.groq.com)
- **NVIDIA API Key** — Get from [build.nvidia.com](https://build.nvidia.com)

### 1. Configure Environment Variables

Edit `server/.env` with your values:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/onboardai
JWT_SECRET=your_secure_random_string_here
GROQ_API_KEY=gsk_your_groq_key_here
NVIDIA_API_KEY=nvapi-your_nvidia_key_here
```

### 2. Run with start.bat (Windows)

```bash
# Double-click start.bat or run:
start.bat
```

This will install all dependencies and start both servers automatically.

### 3. Manual Start

```bash
# Terminal 1 — Backend
cd server
npm install
npm run dev

# Terminal 2 — Frontend
cd client
npm install
npm run dev
```

### 4. Open in Browser

Navigate to **http://localhost:5173**

---

## 📁 Project Structure

```
onboarding-guides/
├── server/                    # Express.js backend
│   ├── config/db.js           # MongoDB connection
│   ├── middleware/             # Auth & validation middleware
│   ├── models/                # Mongoose models (User, Guide)
│   ├── routes/                # API routes (auth, guides, generate)
│   ├── services/llm.js        # Groq + NVIDIA NIM with fallback
│   ├── utils/promptBuilder.js # LLM prompt construction
│   └── server.js              # Express entry point
│
├── client/                    # React + Vite frontend
│   └── src/
│       ├── components/        # UI, layout, auth, generator, guides
│       ├── pages/             # Landing, Dashboard, Generator, etc.
│       ├── context/           # Auth context
│       ├── hooks/             # Custom hooks
│       ├── services/          # Axios API client
│       └── data/              # Template data
│
├── start.bat                  # Windows startup script
└── README.md
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Guides
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/guides` | List user's guides (search/filter) |
| GET | `/api/guides/stats` | Dashboard statistics |
| GET | `/api/guides/:id` | Get single guide |
| GET | `/api/guides/shared/:slug` | Get public guide |
| PUT | `/api/guides/:id` | Update guide |
| PATCH | `/api/guides/:id/toggle-public` | Toggle visibility |
| DELETE | `/api/guides/:id` | Delete guide |

### Generate
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/generate` | Generate guide with AI |
| POST | `/api/generate/save` | Save generated guide |

---

## 📝 License

MIT — Built for hackathons and production use.
