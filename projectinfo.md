# 🚀 OnboardAI — Complete Project Documentation

> **OnboardAI** is a full-stack, AI-powered interactive onboarding platform built with the MERN stack. It uses advanced Large Language Models (LLaMA 3.1) via Groq and NVIDIA NIM to generate comprehensive, role-specific onboarding guides — then transforms them into interactive checklists, visual timelines, and chat-enabled documents with real-time AI assistance.

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Problem Statement](#-problem-statement)
3. [Solution](#-solution)
4. [Key Features](#-key-features)
5. [Technology Stack](#-technology-stack)
6. [Architecture & System Design](#-architecture--system-design)
7. [Project Structure](#-project-structure)
8. [Frontend Implementation](#-frontend-implementation)
9. [Backend Implementation](#-backend-implementation)
10. [AI/LLM Integration](#-aillm-integration)
11. [Database Design](#-database-design)
12. [Interactive Features Deep Dive](#-interactive-features-deep-dive)
13. [Authentication & Security](#-authentication--security)
14. [API Reference](#-api-reference)
15. [UI/UX Design](#-uiux-design)
16. [Template System](#-template-system)
17. [Setup & Installation](#-setup--installation)
18. [Environment Variables](#-environment-variables)
19. [How It Works — User Flow](#-how-it-works--user-flow)
20. [Screenshots & UI Components](#-screenshots--ui-components)
21. [Future Enhancements](#-future-enhancements)
22. [License](#-license)

---

## 🎯 Project Overview

**OnboardAI** is a production-ready web application that revolutionizes the employee onboarding process by leveraging cutting-edge AI models to automatically generate rich, personalized onboarding guides. Instead of spending days crafting onboarding documentation manually, HR teams, managers, and team leads can generate comprehensive guides in under a minute.

But OnboardAI goes far beyond static document generation. It transforms every guide into an **interactive onboarding experience** with:
- **Trackable checklists** that new hires check off as they complete tasks
- **AI chat assistants** that answer questions about each guide in real-time
- **Visual timelines** showing the complete onboarding journey from Day 1 to Month 3
- **Manager dashboards** to track progress across all new hires
- **Inline editing** with per-section AI regeneration
- **Voice input** for hands-free form filling
- **Smart AI suggestions** that auto-recommend tools, departments, and culture notes as you type

**Project Name:** OnboardAI  
**Project Type:** Full-Stack Interactive Web Application  
**Architecture:** MERN Stack (MongoDB, Express.js, React, Node.js)  
**AI Models:** LLaMA 3.1 70B (Groq) | LLaMA 3.1 405B (NVIDIA NIM)  
**Category:** HR Tech / AI Tool / Productivity  
**New Dependencies Added:** Zero — all interactive features use existing libraries or native browser APIs

---

## ❓ Problem Statement

### The Onboarding Challenge

Employee onboarding is one of the most critical processes in any organization. Yet, it remains one of the most neglected:

1. **Time-Consuming Manual Process** — Creating onboarding guides manually takes 2-5 business days per role, involving multiple stakeholders, document reviews, and formatting efforts.

2. **Inconsistency Across Departments** — Different teams create guides in different formats, tones, and levels of detail, leading to a fragmented experience for new hires.

3. **Outdated Documentation** — Onboarding guides quickly become outdated as tools, processes, and policies change, but no one has time to update them regularly.

4. **Lack of Personalization** — Generic, one-size-fits-all guides fail to address role-specific needs. A software developer and a marketing specialist have completely different onboarding requirements.

5. **No Centralized Management** — Onboarding documents are scattered across Google Docs, Notion pages, SharePoint sites, and email threads, making it hard to find, share, or maintain them.

6. **No Progress Tracking** — Managers have no visibility into whether new hires have actually read or completed their onboarding tasks.

7. **No Real-Time Help** — New hires can't ask questions about the guide content without bothering their busy colleagues.

### Impact of These Problems

- **68% of employees** feel their onboarding was inadequate (Gallup)
- Companies with poor onboarding are **2× more likely** to experience early employee turnover
- It takes an average of **8-12 months** for a new hire to reach full productivity without proper onboarding
- **$4,129** is the average cost of hiring a new employee — poor onboarding wastes this investment

---

## 💡 Solution

### How OnboardAI Solves These Problems

**OnboardAI** addresses every pain point with an intelligent, automated, and user-friendly solution:

| Problem | OnboardAI Solution |
|---------|-------------------|
| Time-consuming manual creation | AI generates comprehensive guides in **30-60 seconds** |
| Inconsistency across departments | Standardized generation with customizable **tone and length** settings |
| Outdated documentation | **Inline section editor** with AI regeneration for instant updates |
| Lack of personalization | **5-step wizard** with AI suggestions captures role-specific context |
| No centralized management | **Dashboard** with search, filter, pagination, and CRUD operations |
| Poor sharing capabilities | **Public sharing** via unique slugs — no login required for viewers |
| No progress tracking | **Interactive checklists** with manager dashboard and progress bars |
| No real-time help | **AI chat widget** answers questions using full guide content as context |

### Core Value Propositions

1. **Speed** — What takes days now takes seconds
2. **Quality** — AI-generated content is comprehensive and well-structured
3. **Customization** — Every guide is tailored to the specific role, company, and culture
4. **Interactivity** — Guides become trackable, editable, and chat-enabled experiences
5. **Visibility** — Managers can track onboarding progress across all new hires
6. **Smart Input** — AI suggestions and voice input make form filling effortless
7. **Collaboration** — Share guides publicly via unique links
8. **Export** — Download as PDF or copy to clipboard
9. **Templates** — Pre-built templates for common roles to get started even faster

---

## ✨ Key Features

### 1. 🤖 AI-Powered Guide Generation
- Uses **LLaMA 3.1 70B** via Groq as the primary model
- Falls back to **LLaMA 3.1 405B** via NVIDIA NIM if Groq fails
- Automatic provider detection and graceful fallback mechanism
- Generates rich Markdown with headings, checklists, tables, blockquotes, and timelines
- Content includes: Welcome message, First Day/Week/Month timeline, Tool setup guides, Culture overview, Key contacts, and Resources

### 2. 📝 Multi-Step Wizard Form (5 Steps) with AI Suggestions
The generator uses a 5-step wizard to collect comprehensive context, enhanced with real-time AI suggestions:

| Step | Name | Fields Collected | AI Enhancement |
|------|------|-----------------|----------------|
| **Step 1** | Basic Info | Company Name, Industry, Company Size | AI suggests related departments based on industry |
| **Step 2** | Role Details | Role/Position, Department, Seniority Level, Work Mode | — |
| **Step 3** | Tools & Tech | Tools/Technologies (tag-based input), Communication Platforms | AI suggests related tools (e.g., "React" → "VS Code, Git, npm") |
| **Step 4** | Culture | Culture Notes, Key Policies, Dress Code, Working Hours | AI auto-populates culture notes based on work mode |
| **Step 5** | Customize | Custom Instructions, Tone (4 options), Guide Length (3 options) | 🎤 Voice input via Web Speech API |

### 3. ✅ Interactive Checklist System
After a guide is generated or saved, it can be transformed into a trackable checklist:
- **Auto-generation** — Parse H2 headings from guide content into checklist items
- **Status flow** — Click to cycle: 🔴 Not Started → 🟡 In Progress → 🟢 Complete
- **Due categories** — Auto-assigned: Day 1, Day 3, Week 1, Week 2, Month 1, Month 2, Month 3
- **Progress bar** — Animated bar: "7/15 tasks completed (47%)"
- **Grouped by timeline** — Collapsible groups organized by due date
- **Persistent** — Status saved to database per guide

### 4. 💬 Floating AI Chat Widget
Every guide view page includes a context-aware AI chat assistant:
- **Full guide context** — The entire guide content is injected as the AI's system prompt
- **Suggested questions** — "What tools do I need on Day 1?", "Who should I contact about VPN access?"
- **Persistent history** — Chat messages saved per guide (last 50 messages)
- **Typing indicator** — Animated dots while AI generates a response
- **Uses Groq/NVIDIA fallback** — Same robust dual-provider system as guide generation
- **Glassmorphism UI** — Floating bottom-right bubble with expandable chat panel

### 5. 🗺️ Visual Timeline Component
An interactive timeline visualization auto-generated from guide content:
- **7 time periods** — Day 1 → Day 3 → Week 1 → Week 2 → Month 1 → Month 2 → Month 3
- **4 color-coded categories** — Setup (blue), Social (purple), Technical (green), Review (amber)
- **Hover preview** — Quick summary on hover
- **Click to expand** — Full section details in an expandable panel
- **Responsive** — Horizontal on desktop, vertical on mobile
- **Auto-parsed** — Extracts milestones from H2/H3 section titles and content

### 6. 📊 Manager Dashboard
A dedicated dashboard for managers to track onboarding progress:
- **Overview table** — All guides with assigned new hires and progress bars
- **Task breakdowns** — Not Started / In Progress / Complete counts per guide
- **Search & filter** — Filter by status, search by title/role/assignee
- **Summary cards** — Total guides, total tasks, in-progress count, overall percentage
- **Drill-down** — Click any guide to view its full checklist and content

### 7. ✏️ Rich Text Section Editor
Post-generation inline editing with AI-powered section regeneration:
- **Section-based** — Each H2 heading becomes an independently editable block
- **Markdown toolbar** — Bold, Italic, Heading, List, Checkbox, Link, Code buttons
- **Regenerate This Section** — AI rewrites a single section while keeping everything else
- **Reorder sections** — Move sections up/down with arrow buttons
- **Add/Delete sections** — Insert new sections or remove existing ones
- **Edit/Preview toggle** — Switch between editing and rendered preview
- **Available everywhere** — Works on both Generator result page and saved Guide view

### 8. 🎤 Voice Input (Web Speech API)
Hands-free input for the Custom Instructions textarea:
- **Native browser API** — Uses `window.SpeechRecognition` (zero API cost)
- **Continuous recognition** — Keeps listening until stopped
- **Pulsing animation** — Red dot pulses during active recording
- **Graceful fallback** — Shows disabled tooltip if browser doesn't support Speech API
- **Appends text** — Transcribed speech appends to existing textarea content

### 9. 🎯 Interactive Onboarding Tour
First-time users see a guided walkthrough of the platform:
- **5 steps**: Welcome modal → Stats highlight → Generate button → Templates → Completion
- **SVG spotlight mask** — Dims everything except the target element
- **Glowing border** — Primary-colored ring around highlighted elements
- **Step dots** — Progress indicator with Next/Skip/Prev buttons
- **localStorage persistence** — Shows only once; never re-appears
- **Custom built** — No external library; uses React + Framer Motion

### 10. 💡 AI-Powered Form Suggestions
Real-time AI suggestions while filling the generation wizard:
- **Industry field** → Suggests common departments for that industry
- **Tools field** → Suggests related tools the user likely also uses
- **Work mode selection** → Suggests culture notes appropriate for remote/hybrid/onsite
- **Debounced calls** — 600ms debounce prevents API spam
- **Click to accept** — Suggestion chips auto-fill the relevant field
- **Low-token calls** — Max 200 tokens per Groq call for instant responses

### 11. 📚 Template Library
6 pre-built templates for common roles, each with pre-filled form data:
- **Software Developer** — Engineering-focused with tools like VS Code, Git, Docker, React
- **Marketing Specialist** — HubSpot, Google Analytics, SEMrush focused
- **Sales Representative** — Salesforce, LinkedIn Sales Navigator pipeline
- **Customer Support Agent** — Zendesk, Intercom, ticketing workflows
- **General Employee** — Universal company basics, HR policies, benefits
- **Open Source Contributor** — GitHub workflow, community guidelines, contribution process

### 12. 💾 Guide Management (Full CRUD)
- **Create** — Generate and save guides to personal library
- **Read** — View any guide with full Markdown rendering + timeline + checklist
- **Update** — Edit guide content inline, update titles, assign to new hires
- **Delete** — Remove guides with confirmation modal

### 13. 🔍 Search, Filter & Pagination
- **Full-text search** across title, role, department, and company name
- **Department filter** dropdown populated from user's actual guide data
- **Pagination** with configurable page sizes (default: 20 per page)
- **Sort** by creation date (newest first)

### 14. 🔗 Public Sharing
- Toggle any guide between **public** and **private**
- Public guides get a unique slug URL (e.g., `/shared/acme-developer-a1b2c3d4`)
- Share links work without authentication
- Slug is auto-generated from the guide title + random hex string
- Copy share link to clipboard with one click

### 15. 📄 PDF Export & Copy
- Download any guide as a beautifully formatted PDF (A4, 2× scale)
- One-click copy of raw Markdown content

### 16. 🔐 User Authentication
- JWT-based authentication with 7-day expiry
- Secure registration with bcryptjs (12-round salt)
- Persistent sessions via localStorage token
- Auto-redirect for authenticated/unauthenticated routes
- Protected and public route wrappers

### 17. 🎨 Premium Dark UI
- Dark glassmorphism design with custom color palette
- Framer Motion animations throughout (page transitions, hover effects, loading states)
- Custom scrollbar styling
- Inter font from Google Fonts
- Fully responsive (mobile, tablet, desktop)
- Custom gradient text effects and glass-card effects with backdrop blur

### 18. 📊 Dashboard Statistics
- Total guides count, department breakdown, this month's activity
- Quick action cards for common tasks
- Recent guides list

---

## 🛠️ Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI component library |
| **Vite** | 5.3.1 | Build tool and dev server |
| **React Router** | v6.23.1 | Client-side routing (7 routes) |
| **Tailwind CSS** | 3.4.4 | Utility-first CSS framework |
| **Framer Motion** | 11.2.10 | Page and component animations |
| **Axios** | 1.7.2 | HTTP client for API calls |
| **React Markdown** | 9.0.1 | Markdown rendering engine |
| **remark-gfm** | 4.0.0 | GitHub-Flavored Markdown support |
| **React Hot Toast** | 2.4.1 | Toast notification system |
| **html2pdf.js** | 0.10.1 | Client-side PDF export |
| **Lucide React** | 0.396.0 | Icon library (50+ icons used) |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | JavaScript runtime |
| **Express.js** | 4.19.2 | HTTP server framework |
| **MongoDB** | — | NoSQL document database |
| **Mongoose** | 8.4.1 | MongoDB ODM with schemas |
| **Groq SDK** | 0.5.0 | Primary LLM API client |
| **JSON Web Token** | 9.0.2 | Authentication tokens |
| **bcryptjs** | 2.4.3 | Password hashing |
| **Helmet** | 7.1.0 | HTTP security headers |
| **Morgan** | 1.10.0 | HTTP request logging |
| **CORS** | 2.8.5 | Cross-origin resource sharing |
| **express-validator** | 7.1.0 | Request validation |
| **dotenv** | 16.4.5 | Environment variable management |

### AI/LLM Providers

| Provider | Model | Role | Use Cases |
|----------|-------|------|-----------|
| **Groq** | LLaMA 3.1 70B Versatile | Primary | Guide generation, Chat, Section regeneration, Form suggestions |
| **NVIDIA NIM** | LLaMA 3.1 405B Instruct | Fallback | Guide generation, Chat (when Groq fails) |

### Native Browser APIs Used

| API | Feature | Cost |
|-----|---------|------|
| **Web Speech API** | Voice-to-text input | Free (browser-native) |
| **Clipboard API** | Copy to clipboard | Free (browser-native) |
| **localStorage** | Tour persistence, auth tokens | Free (browser-native) |

---

## 🏗️ Architecture & System Design

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                     CLIENT (React + Vite)                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │ Landing  │ │Dashboard │ │Generator │ │    GuideView     │   │
│  │  Page    │ │  Page    │ │  Wizard  │ │ +Checklist+Chat  │   │
│  │          │ │ +Tour    │ │ +AI Sugg │ │ +Timeline+Editor │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │ Login/   │ │Templates │ │ Shared   │ │    Manager       │   │
│  │ Register │ │  Page    │ │  Guide   │ │   Dashboard      │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘   │
│              ┌──────────────────────────┐                        │
│              │  AuthContext + API       │                        │
│              │  (Axios + Interceptors)  │                        │
│              └────────────┬─────────────┘                        │
└───────────────────────────┼──────────────────────────────────────┘
                            │ HTTP (Axios)
                            │ Vite Proxy (/api → :5000)
┌───────────────────────────┼──────────────────────────────────────┐
│                     SERVER (Express.js)                           │
│              ┌────────────┴─────────────┐                        │
│              │       Middleware         │                        │
│              │  (Helmet, CORS, Morgan,  │                        │
│              │   Auth, Validate)        │                        │
│              └────────────┬─────────────┘                        │
│  ┌──────────┐ ┌───────────┴────────┐ ┌──────────┐ ┌──────────┐ │
│  │/api/auth │ │   /api/guides      │ │/api/gen  │ │/api/     │ │
│  │ register │ │ CRUD + search      │ │ generate │ │ suggest  │ │
│  │ login    │ │ stats, share       │ │ save     │ │ AI form  │ │
│  │ me       │ │ checklist (CRUD)   │ │ section  │ │ hints    │ │
│  │          │ │ chat (AI)          │ │ regen    │ │          │ │
│  │          │ │ manager overview   │ │          │ │          │ │
│  └──────────┘ └────────────────────┘ └────┬─────┘ └────┬─────┘ │
│                                           │             │        │
│              ┌────────────────────────────┴─────────────┘        │
│              │          LLM Service (llm.js)                     │
│              │  ┌─────────────┐    ┌──────────────────┐          │
│              │  │    Groq     │───▶│   NVIDIA NIM     │          │
│              │  │  (Primary)  │    │   (Fallback)     │          │
│              │  └─────────────┘    └──────────────────┘          │
│              └──────────────────────────────────────────          │
│                          │                                        │
│              ┌───────────┴───────────────────┐                    │
│              │     MongoDB (Mongoose)        │                    │
│              │  ┌──────┐  ┌───────────────┐  │                    │
│              │  │ User │  │     Guide     │  │                    │
│              │  │      │  │ +checklist[]  │  │                    │
│              │  │      │  │ +chatHistory[]│  │                    │
│              │  │      │  │ +assignedTo   │  │                    │
│              │  └──────┘  └───────────────┘  │                    │
│              └───────────────────────────────┘                    │
└──────────────────────────────────────────────────────────────────┘
```

### Data Flow — Guide Generation

1. **User fills the 5-step wizard** → Form data collected in React state (with AI suggestions)
2. **Form submitted** → POST to `/api/generate` with all form fields
3. **Server builds prompts** → `promptBuilder.js` creates system + user prompts
4. **LLM generates content** → Groq primary → NVIDIA NIM fallback
5. **Content returned** → Markdown content + provider info sent to client
6. **Client renders** → Timeline + ReactMarkdown + Editor toggle
7. **User saves** → POST to `/api/generate/save` → Guide stored in MongoDB
8. **Dashboard updates** → Guides list refreshed via GET `/api/guides`

### Data Flow — Chat Widget

1. **User sends message** → POST to `/api/guides/:id/chat` with message text
2. **Server loads guide** → Full guide content injected as system prompt
3. **Recent history included** → Last 10 messages appended for conversation context
4. **LLM responds** → Groq/NVIDIA generates contextual answer
5. **Both messages saved** → User + assistant messages appended to `chatHistory[]`
6. **Response returned** → Client renders new chat bubble with AI response

### Data Flow — Checklist

1. **User clicks "Generate Checklist"** → POST to `/api/guides/:id/checklist/generate`
2. **Server parses H2s** → Extracts section titles, assigns due categories by keyword matching
3. **Checklist stored** → Array of `{ sectionTitle, status, dueCategory }` saved to guide
4. **User toggles status** → PATCH to `/api/guides/:id/checklist` with new status
5. **Progress updated** → Server returns updated checklist + progress percentage

---

## 📁 Project Structure

```
onboarding-guides/
│
├── 📄 README.md                      # Project readme
├── 📄 projectinfo.md                  # This file — comprehensive docs
├── 📄 start.bat                       # Windows one-click startup script
│
├── 📂 server/                         # ===== EXPRESS.JS BACKEND =====
│   ├── 📄 server.js                   # Express entry point, middleware, routes
│   ├── 📄 .env                        # Environment variables (keys, DB URI)
│   ├── 📄 package.json                # Backend dependencies & scripts
│   │
│   ├── 📂 config/
│   │   └── 📄 db.js                   # MongoDB connection via Mongoose
│   │
│   ├── 📂 middleware/
│   │   ├── 📄 auth.js                 # JWT authentication middleware
│   │   └── 📄 validate.js             # Express-validator error handler
│   │
│   ├── 📂 models/
│   │   ├── 📄 User.js                 # User schema (name, email, password, company)
│   │   └── 📄 Guide.js                # Guide schema (20+ fields, checklist, chatHistory)
│   │
│   ├── 📂 routes/
│   │   ├── 📄 auth.js                 # POST /register, POST /login, GET /me
│   │   ├── 📄 guides.js               # Guides CRUD + checklist + chat + manager
│   │   ├── 📄 generate.js             # POST /generate, /save, /section
│   │   └── 📄 suggest.js              # POST /suggest — AI form suggestions
│   │
│   ├── 📂 services/
│   │   └── 📄 llm.js                  # Groq + NVIDIA NIM with auto-fallback
│   │
│   └── 📂 utils/
│       └── 📄 promptBuilder.js        # System & user prompt construction
│
├── 📂 client/                         # ===== REACT + VITE FRONTEND =====
│   ├── 📄 index.html                  # Entry HTML (SEO meta, fonts, favicon)
│   ├── 📄 package.json                # Frontend dependencies & scripts
│   ├── 📄 vite.config.js              # Vite config (proxy /api → :5000)
│   ├── 📄 tailwind.config.js          # Custom colors, animations, fonts
│   ├── 📄 postcss.config.js           # PostCSS plugins
│   │
│   ├── 📂 public/
│   │   ├── 📄 onboard logo.jpeg       # OnboardAI mascot/brand logo
│   │   └── 📄 vite.svg                # Default Vite icon (unused)
│   │
│   └── 📂 src/
│       ├── 📄 main.jsx                # React entry (BrowserRouter, AuthProvider, Toaster)
│       ├── 📄 App.jsx                 # Route definitions (7 protected + 4 public routes)
│       ├── 📄 index.css               # Global CSS (glass-card, gradients, markdown, new features)
│       │
│       ├── 📂 context/
│       │   └── 📄 AuthContext.jsx      # Auth state, login/register/logout, token mgmt
│       │
│       ├── 📂 services/
│       │   └── 📄 api.js              # Axios instance, interceptors, 12 API modules
│       │
│       ├── 📂 hooks/
│       │   └── 📄 useGuides.js        # Guide CRUD operations hook
│       │
│       ├── 📂 utils/
│       │   └── 📄 parseTimeline.js    # Parse markdown into timeline milestones
│       │
│       ├── 📂 data/
│       │   └── 📄 templates.js        # 6 pre-built template definitions
│       │
│       ├── 📂 pages/
│       │   ├── 📄 Landing.jsx         # Hero + Features + CTA landing page
│       │   ├── 📄 Login.jsx           # Login page wrapper
│       │   ├── 📄 Register.jsx        # Register page wrapper
│       │   ├── 📄 Dashboard.jsx       # Stats + Quick Actions + Guide list + Tour
│       │   ├── 📄 Generator.jsx       # Wizard + Animation + Timeline + Editor
│       │   ├── 📄 GuideView.jsx       # Guide + Checklist + Chat + Timeline + Editor
│       │   ├── 📄 ManagerDashboard.jsx # Manager progress tracking overview
│       │   ├── 📄 Templates.jsx       # Template library grid
│       │   ├── 📄 SharedGuide.jsx     # Public shared guide viewer
│       │   └── 📄 NotFound.jsx        # 404 page
│       │
│       └── 📂 components/
│           ├── 📂 auth/
│           │   ├── 📄 LoginForm.jsx    # Email + password form with validation
│           │   └── 📄 RegisterForm.jsx # Full registration form (5 fields)
│           │
│           ├── 📂 layout/
│           │   ├── 📄 Layout.jsx       # Navbar + Sidebar + Outlet wrapper
│           │   ├── 📄 Navbar.jsx       # Fixed top nav, logo, user menu, mobile menu
│           │   └── 📄 Sidebar.jsx      # Left nav (Dashboard, Generator, Templates, Manager View)
│           │
│           ├── 📂 generator/
│           │   ├── 📄 GeneratorWizard.jsx    # Multi-step wizard controller
│           │   ├── 📄 StepBasicInfo.jsx      # Step 1: Company info + AI suggestions
│           │   ├── 📄 StepRoleDetails.jsx    # Step 2: Role details
│           │   ├── 📄 StepToolsTech.jsx      # Step 3: Tools & platforms + AI suggestions
│           │   ├── 📄 StepCulture.jsx        # Step 4: Culture & policies + AI suggestions
│           │   ├── 📄 StepCustom.jsx         # Step 5: Tone, length, custom + Voice input
│           │   ├── 📄 AISuggestions.jsx      # Sparkle chips with debounced API calls
│           │   └── 📄 GeneratingAnimation.jsx # Loading animation during gen
│           │
│           ├── 📂 guides/
│           │   ├── 📄 GuideCard.jsx          # Guide card for dashboard list
│           │   ├── 📄 GuideViewer.jsx        # Markdown renderer with custom styles
│           │   ├── 📄 GuideEditor.jsx        # Section-based editor with AI regen
│           │   ├── 📄 ChecklistPanel.jsx     # Interactive checklist sidebar with progress
│           │   ├── 📄 OnboardingTimeline.jsx # Visual timeline (Day 1 → Month 3)
│           │   └── 📄 ChatWidget.jsx         # Floating AI chat with guide context
│           │
│           ├── 📂 tour/
│           │   └── 📄 OnboardingTour.jsx     # Custom spotlight tour system
│           │
│           ├── 📂 templates/
│           │   └── 📄 TemplateCard.jsx       # Template card with "Use Template" action
│           │
│           └── 📂 ui/
│               ├── 📄 Button.jsx       # Reusable button (5 variants, loading)
│               ├── 📄 Input.jsx        # Reusable input with icon + label + error
│               ├── 📄 Modal.jsx        # Reusable modal with overlay + animation
│               ├── 📄 VoiceInput.jsx   # Microphone button with Web Speech API
│               └── 📄 LoadingSpinner.jsx # Spinning loading indicator
```

**Total Files:** 50+ source files  
**Frontend Components:** 30 components  
**Backend Files:** 12 source files  
**New Files Added (Phase 2):** 11 files  
**Modified Files (Phase 2):** 15 files  

---

## 🖥️ Frontend Implementation

### Routing Structure (React Router v6)

```
/                   → Landing Page (PublicRoute)
/login              → Login Page (PublicRoute)
/register           → Register Page (PublicRoute)
/shared/:slug       → Shared Guide (Public — no auth)
/dashboard          → Dashboard + Tour (ProtectedRoute + Layout)
/generator          → Generator Wizard + AI Suggestions (ProtectedRoute + Layout)
/guide/:id          → Guide Viewer + Checklist + Chat + Timeline + Editor (ProtectedRoute + Layout)
/templates          → Template Library (ProtectedRoute + Layout)
/manager            → Manager Dashboard (ProtectedRoute + Layout)
*                   → 404 Not Found
```

### Route Guards

- **ProtectedRoute** — Checks `isAuthenticated` from AuthContext; redirects to `/login` if false
- **PublicRoute** — Redirects to `/dashboard` if already authenticated

### State Management

- **AuthContext** — Global authentication state (user, token, loading, login, register, logout)
- **Component-level state** — React `useState` for local UI state
- **Custom hooks** — `useGuides()` encapsulates all guide CRUD operations
- **No external state library** — Keeps things simple with Context API + hooks

### Key Design Patterns

1. **Compound Components** — GeneratorWizard manages step state, individual steps handle their own fields
2. **Custom Hook Pattern** — `useGuides.js` abstracts API calls and state management for guides
3. **Interceptor Pattern** — Axios interceptors handle token injection and 401 redirects
4. **Template Prefill** — Templates pass `prefillData` via React Router state to the Generator
5. **Section Parsing** — Guide content is split by H2 headings for checklist, timeline, and editor

---

## ⚙️ Backend Implementation

### Express Server Configuration

```javascript
// Key middleware stack (server.js)
app.use(helmet());          // Security headers
app.use(cors({ origin }));  // CORS for frontend
app.use(morgan('dev'));     // Request logging
app.use(express.json({ limit: '10mb' }));  // JSON body parsing
```

### Route Modules

| Module | Prefix | Endpoints | Auth Required |
|--------|--------|-----------|---------------|
| `auth.js` | `/api/auth` | 3 (register, login, me) | Partial |
| `guides.js` | `/api/guides` | 10 (CRUD, stats, shared, toggle, checklist, chat, manager) | Yes (except shared) |
| `generate.js` | `/api/generate` | 3 (generate, save, section) | Yes |
| `suggest.js` | `/api/suggest` | 1 (AI form suggestions) | Yes |

### Error Handling

- **Validation errors** — express-validator with custom error formatting
- **404 handler** — Catches unmatched routes
- **Global error handler** — Catches unhandled errors, returns dev-friendly messages in development
- **Graceful suggestion failures** — Suggest endpoint returns empty data instead of errors

### Health Check Endpoint

```
GET /api/health → { status: "OK", timestamp, uptime }
```

---

## 🤖 AI/LLM Integration

### AI Usage Across the Platform

| Feature | AI Provider | Max Tokens | Purpose |
|---------|-------------|------------|---------|
| Guide Generation | Groq → NVIDIA | 8,000 / 4,096 | Generate full onboarding guide |
| Chat Widget | Groq → NVIDIA | 8,000 / 4,096 | Answer questions about guide content |
| Section Regeneration | Groq → NVIDIA | 8,000 / 4,096 | Rewrite a single section |
| Form Suggestions | Groq only | 200 | Quick JSON suggestions for form fields |

### Prompt Architecture

**System Prompt** — Sets the AI's role, tone, and formatting requirements:
- 4 tone options: `professional`, `friendly`, `casual`, `corporate`
- 3 length options: `concise` (1500-2000 words), `standard` (3000-4000 words), `comprehensive` (5000-7000 words)
- Markdown formatting rules (headers, checklists, tables, blockquotes)
- Requires First Day/Week/Month timeline sections

**User Prompt** — Contains all the form data structured as a request

**Chat System Prompt** — Injects the full guide content as context:
```
You are a helpful onboarding assistant. You have access to the following onboarding guide...
FULL GUIDE CONTENT: [entire guide markdown]
Answer the user's question based on the guide above.
```

**Suggestion System Prompt** — Minimal, JSON-only responses:
```
You are a helpful assistant that returns only valid JSON. No markdown, no explanation, just JSON.
```

### Fallback Mechanism

```
User Request → Try Groq
                 ├─ Success → Return { content, provider: 'groq' }
                 └─ Failure → Try NVIDIA NIM
                                ├─ Success → Return { content, provider: 'nvidia' }
                                └─ Failure → Throw Error (both failed)
```

---

## 🗄️ Database Design

### User Model

```javascript
{
  name:         String,    // Required, 2-50 chars
  email:        String,    // Required, unique, lowercase
  password:     String,    // Required, min 6 chars, bcrypt hashed (12 rounds)
  companyName:  String,    // Optional
  createdAt:    Date,      // Auto (timestamps: true)
  updatedAt:    Date,      // Auto (timestamps: true)
}
```

### Guide Model (Extended)

```javascript
{
  userId:             ObjectId,     // Ref: 'User', indexed
  title:              String,       // Required, max 200 chars
  slug:               String,       // Unique, auto-generated, indexed
  
  // Form data (captured during generation)
  companyName:        String,
  industry:           String,
  companySize:        String,
  role:               String,
  department:         String,
  seniorityLevel:     String,       // Enum: intern/junior/mid/senior/lead
  workMode:           String,       // Enum: remote/hybrid/onsite
  tools:              [String],
  platforms:          [String],
  cultureNotes:       String,
  policies:           String,
  dressCode:          String,
  workingHours:       String,
  customInstructions: String,
  tone:               String,       // Enum: professional/friendly/casual/corporate
  guideLength:        String,       // Enum: concise/standard/comprehensive
  
  // Generated content
  content:            String,       // Required — the full markdown guide
  
  // Sharing & meta
  isPublic:           Boolean,      // Default: false
  llmProvider:        String,       // Enum: groq/nvidia/unknown
  
  // ===== INTERACTIVE FEATURES =====
  
  // Checklist tracking
  checklist: [{
    sectionTitle:  String,          // H2 section heading
    status:        String,          // Enum: not_started/in_progress/complete
    dueCategory:   String,          // Enum: day1/day3/week1/week2/month1/month2/month3
    completedAt:   Date,            // Set when status = 'complete'
  }],
  
  // New hire assignment
  assignedTo:        String,        // New hire's name or email
  
  // AI chat history
  chatHistory: [{
    role:          String,          // Enum: user/assistant
    content:       String,          // Message text
    timestamp:     Date,            // Auto: Date.now
  }],
  
  createdAt:          Date,         // Auto
  updatedAt:          Date,         // Auto
}
```

**Virtual Fields:**
- `checklistProgress` — Computed percentage of completed checklist items

**Indexes:**
- Text index on `title`, `role`, `department`, `companyName` for search
- Index on `userId` for fast per-user queries
- Unique index on `slug` for public sharing

---

## 🔄 Interactive Features Deep Dive

### Checklist Auto-Generation Algorithm

The system parses guide content to create checklist items with smart due date assignment:

```
For each line in guide content:
  If line matches /^## (.+)/:
    Extract section title
    Match title keywords against due category map:
      welcome, setup, getting started, day 1    → day1
      team, meet, introduction                   → day3
      first week, culture, policies              → week1
      second week                                 → week2
      review, goals, first month                  → month1
      development, second month                   → month2
      growth, third month, 90 day                → month3
    Default → week1
    Create checklist item with status: not_started
```

### Timeline Parsing Algorithm

The `parseTimeline.js` utility categorizes sections by both time period and type:

**Categories (by keyword matching):**
- **Setup** — setup, install, tools, environment, access, accounts
- **Social** — team, meet, introduction, buddy, mentor, networking
- **Technical** — project, code, development, training, architecture
- **Review** — review, feedback, goals, performance, evaluation

**Time Periods:**
- Day 1, Day 3, Week 1, Week 2, Month 1, Month 2, Month 3

### Chat Context Injection

The chat system injects the complete guide as context:
```
System Prompt:
  "You are a helpful onboarding assistant..."
  + Guide title, company, role, department
  + FULL guide markdown content
  + Last 10 conversation messages for context

Guard: Chat history capped at 50 messages to prevent document bloat
```

### Section Regeneration

When a user clicks "Regenerate This Section":
1. Client sends section title, current content, and truncated guide context
2. Server builds a focused prompt: "Rewrite this section with fresh, improved content"
3. LLM generates new content for just that section
4. Client replaces only the targeted section, keeping all others untouched

---

## 🔐 Authentication & Security

### Authentication Flow

```
1. Register → POST /api/auth/register
   → Validate input (express-validator)
   → Check email uniqueness
   → Hash password (bcrypt, 12 rounds)
   → Create User document
   → Generate JWT (7-day expiry)
   → Return { token, user }

2. Login → POST /api/auth/login
   → Validate input
   → Find user by email
   → Compare password hash
   → Generate JWT (7-day expiry)
   → Return { token, user }

3. Auth Middleware → For protected routes
   → Extract Bearer token from Authorization header
   → Verify JWT signature
   → Find user by decoded userId
   → Attach user to req.user
   → Continue to route handler
```

### Security Measures

| Layer | Measure | Implementation |
|-------|---------|---------------|
| HTTP | Security Headers | `helmet()` middleware |
| Auth | Password Hashing | bcryptjs with 12-round salt |
| Auth | Token-based Auth | JWT with 7-day expiry |
| Auth | Password Stripping | `toJSON()` removes password from responses |
| API | Input Validation | express-validator on all mutation routes |
| API | CORS | Restricted to configured client origin |
| API | Rate Limiting | JSON body limit: 10MB |
| API | Chat History Cap | Max 50 messages per guide to prevent bloat |
| Client | Token Storage | localStorage with auto-cleanup on 401 |
| Client | Route Protection | ProtectedRoute and PublicRoute wrappers |
| Client | Auto-Logout | Axios interceptor clears token on 401 |

---

## 📡 API Reference

### Authentication Endpoints

#### `POST /api/auth/register`
Creates a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "companyName": "Acme Inc."
}
```

**Response (201):**
```json
{
  "message": "Account created successfully!",
  "token": "eyJhbGciOiJI...",
  "user": { "_id": "...", "name": "John Doe", "email": "john@example.com" }
}
```

#### `POST /api/auth/login`

**Request Body:**
```json
{ "email": "john@example.com", "password": "securePassword123" }
```

#### `GET /api/auth/me`
Returns the currently authenticated user. **Requires: Bearer token**

---

### Guide Endpoints

#### `GET /api/guides`
List user's guides with search, filter, and pagination. **Requires: Bearer token**

**Query Parameters:** `search`, `department`, `sort` (default: `-createdAt`), `page`, `limit`

#### `GET /api/guides/stats`
Dashboard statistics (totalGuides, recentGuides, departmentStats). **Requires: Bearer token**

#### `GET /api/guides/manager/overview`
Manager dashboard data — all guides with checklist progress breakdowns. **Requires: Bearer token**

**Response:**
```json
{
  "overview": [{
    "title": "Acme - Developer Guide",
    "role": "Frontend Developer",
    "assignedTo": "jane@acme.com",
    "progress": { "total": 12, "completed": 5, "inProgress": 3, "notStarted": 4, "percentage": 42 }
  }]
}
```

#### `GET /api/guides/:id`
Get a single guide with full content, checklist, and chat history. **Requires: Bearer token**

#### `GET /api/guides/shared/:slug`
Get a public guide by slug. **No auth required.**

#### `PUT /api/guides/:id`
Update guide metadata, content, or assigned new hire. **Requires: Bearer token**

**Request Body (all optional):**
```json
{ "title": "...", "isPublic": true, "content": "...", "assignedTo": "jane@acme.com" }
```

#### `PATCH /api/guides/:id/toggle-public`
Toggle guide between public/private. **Requires: Bearer token**

#### `PATCH /api/guides/:id/checklist`
Update a checklist item's status. **Requires: Bearer token**

**Request Body:**
```json
{ "itemId": "64a1b2c3...", "status": "complete" }
```

**Response:**
```json
{
  "checklist": [...],
  "progress": { "total": 12, "completed": 6, "percentage": 50 }
}
```

#### `POST /api/guides/:id/checklist/generate`
Auto-generate checklist items from guide content H2 headings. **Requires: Bearer token**

#### `POST /api/guides/:id/chat`
Chat with AI about a specific guide. **Requires: Bearer token**

**Request Body:**
```json
{ "message": "What tools do I need to install on Day 1?" }
```

**Response:**
```json
{ "response": "Based on your onboarding guide, on Day 1 you'll need to...", "provider": "groq" }
```

#### `DELETE /api/guides/:id`
Delete a guide. **Requires: Bearer token**

---

### Generation Endpoints

#### `POST /api/generate`
Generate an onboarding guide using AI. **Requires: Bearer token**

**Request Body:**
```json
{
  "companyName": "Acme Inc.",
  "industry": "Technology",
  "role": "Software Developer",
  "department": "Engineering",
  "tools": ["VS Code", "Git", "Docker"],
  "tone": "friendly",
  "guideLength": "comprehensive"
}
```

#### `POST /api/generate/save`
Save a generated guide to the database. **Requires: Bearer token**

#### `POST /api/generate/section`
Regenerate a single section of a guide. **Requires: Bearer token**

**Request Body:**
```json
{
  "sectionTitle": "First Week Tasks",
  "sectionContent": "Current content...",
  "guideContext": "Truncated guide for context...",
  "tone": "friendly"
}
```

---

### Suggestion Endpoints

#### `POST /api/suggest`
Get AI-powered form field suggestions. **Requires: Bearer token**

**Request Body:**
```json
{ "field": "tools", "value": "React", "context": { "tools": ["React"] } }
```

**Response:**
```json
{ "field": "tools", "suggestions": { "suggestions": ["VS Code", "Git", "npm", "ESLint", "Prettier"] } }
```

**Supported fields:** `industry`, `tools`, `workMode`

---

## 🎨 UI/UX Design

### Design System

**Color Palette:**
- Primary: Indigo scale (50-950) — `#6366f1` as the main accent
- Surface: Slate scale (50-950) — `#020617` as the darkest background
- Accent colors: Purple, Pink, Green, Cyan, Yellow, Amber for feature icons
- Category colors: Blue (Setup), Purple (Social), Green (Technical), Amber (Review)

**Typography:**
- Font: Inter (Google Fonts) — weights 300-900
- Anti-aliased rendering on all platforms

**Effects:**
- Glassmorphism: `bg-surface-900/50 backdrop-blur-xl border border-surface-700/50`
- Gradient text: `bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400`
- Hover shadows: `hover:shadow-lg hover:shadow-primary-500/10`
- Custom scrollbar with surface colors
- Spotlight mask: SVG-based spotlight for onboarding tour

**Animations (Framer Motion):**
- Page entry: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`
- Button hover: `whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}`
- Progress bar growth with easeOut timing
- Staggered card animations on dashboard
- Floating orbs during generation
- Pulsing recording indicator for voice input
- Typing dots animation in chat widget
- Timeline line animation with progressive reveal

### Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| Mobile (< 768px) | Single column, hamburger menu, hidden sidebar, vertical timeline |
| Tablet (768px+) | Two-column grids, visible nav links |
| Desktop (1024px+) | Full sidebar, three-column grids, expanded layout, horizontal timeline |

### Component Library (30 components)

| Component | Variants | Description |
|-----------|----------|-------------|
| `Button` | primary, secondary, ghost, danger + loading state | Universal button |
| `Input` | With icon, label, error state | Form input field |
| `Modal` | Overlay + animated content | Confirmation dialogs |
| `LoadingSpinner` | With optional text | Loading indicator |
| `VoiceInput` | Idle, recording, unsupported states | Microphone with Speech API |
| `AISuggestions` | Loading dots, chips, dismissed | AI suggestion sparkle chips |
| `GuideCard` | With hover actions | Dashboard guide tile |
| `GuideViewer` | Custom markdown renderers | Markdown content viewer |
| `GuideEditor` | Edit/Preview toggle, per-section editing | Section-based markdown editor |
| `ChecklistPanel` | Empty, generating, populated states | Interactive checklist sidebar |
| `OnboardingTimeline` | Desktop horizontal, mobile vertical | Visual milestone timeline |
| `ChatWidget` | Closed bubble, expanded panel, typing indicator | Floating AI chat |
| `OnboardingTour` | Welcome modal, spotlight tooltips, completion | First-time user walkthrough |
| `TemplateCard` | With gradient badge | Template library tile |
| `GeneratingAnimation` | Floating orbs + pulsing text | AI generation loading |

---

## 📑 Template System

### How Templates Work

1. User navigates to `/templates`
2. Clicks "Use Template" on any template card
3. Template's `formData` is passed via React Router state
4. Generator page receives `prefillData` and merges it with `initialFormData`
5. User can modify any pre-filled field before generating (AI suggestions still work)
6. Generation proceeds normally with AI

### Available Templates

| Template | Department | Seniority | Tone | Length |
|----------|-----------|-----------|------|--------|
| Software Developer | Engineering | Mid | Friendly | Comprehensive |
| Marketing Specialist | Marketing | Mid | Professional | Standard |
| Sales Representative | Sales | Junior | Corporate | Comprehensive |
| Customer Support Agent | Support | Junior | Friendly | Standard |
| General Employee | General | Mid | Professional | Standard |
| Open Source Contributor | Community | Junior | Casual | Standard |

---

## 🚀 Setup & Installation

### Prerequisites

- **Node.js** 18 or higher
- **MongoDB** (local instance or MongoDB Atlas connection string)
- **Groq API Key** — Get from [console.groq.com](https://console.groq.com)
- **NVIDIA API Key** — Get from [build.nvidia.com](https://build.nvidia.com)

### Option 1: One-Click Start (Windows)

```batch
# Double-click start.bat or run from terminal:
start.bat
```

The `start.bat` script automatically:
1. Checks and installs backend dependencies
2. Checks and installs frontend dependencies
3. Starts the backend server (port 5000)
4. Starts the frontend dev server (port 5173)
5. Opens `http://localhost:5173` in the browser

### Option 2: Manual Start

```bash
# Terminal 1 — Backend
cd server
npm install
npm run dev        # Uses node --watch for auto-restart

# Terminal 2 — Frontend
cd client
npm install
npm run dev        # Vite dev server with HMR
```

### Access Points

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000/api |
| Health Check | http://localhost:5000/api/health |

---

## 🔑 Environment Variables

File: `server/.env`

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Backend server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/onboardai` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secure_random_string` |
| `JWT_EXPIRES_IN` | Token expiry duration | `7d` |
| `GROQ_API_KEY` | Groq API key for LLaMA 3.1 | `gsk_...` |
| `NVIDIA_API_KEY` | NVIDIA NIM API key | `nvapi-...` |

---

## 🔄 How It Works — User Flow

### Complete User Journey

```
1. LANDING PAGE
   ├─ View hero section with OnboardAI branding
   ├─ Browse feature cards
   └─ Click "Get Started Free" → Register

2. REGISTRATION
   ├─ Enter name, email, password, company (optional)
   ├─ Account created, JWT issued
   └─ Auto-redirect to Dashboard

3. FIRST-TIME DASHBOARD (with Onboarding Tour)
   ├─ Tour: Welcome modal → Stats highlight → Generate highlight → Templates
   ├─ View stats (Total Guides, Departments, This Month)
   ├─ Quick actions (Generate New Guide, Browse Templates)
   ├─ View guide list with search + filter
   └─ Click any guide to view details

4. GENERATE NEW GUIDE (with AI Suggestions)
   ├─ Step 1: Enter company info → AI suggests departments for industry
   ├─ Step 2: Enter role details (role, dept, seniority, work mode)
   ├─ Step 3: Add tools → AI suggests related tools automatically
   ├─ Step 4: Describe culture → AI suggests based on work mode
   ├─ Step 5: Set tone, length, add custom instructions (🎤 voice input)
   ├─ Click "Generate Guide" → AI creates the guide (30-60 seconds)
   ├─ View visual timeline + rendered guide
   ├─ Click "Edit" to modify sections, "Regenerate" per section
   ├─ Actions: Save | Copy | Download PDF | Edit | New
   └─ Save to library for future access

5. USE TEMPLATE (Alternative to manual input)
   ├─ Browse 6 pre-built templates
   ├─ Click "Use Template" → Pre-fills the wizard
   ├─ AI suggestions still work alongside pre-filled data
   ├─ Customize pre-filled fields as needed
   └─ Generate as normal

6. VIEW SAVED GUIDE (Interactive Experience)
   ├─ Visual timeline at top (Day 1 → Month 3)
   ├─ Full rendered content with custom markdown styling
   ├─ Checklist sidebar (click "Generate Checklist" to create)
   │   ├─ Toggle items: Not Started → In Progress → Complete
   │   ├─ Progress bar: "7/15 tasks (47%)"
   │   └─ Grouped by due date (Day 1, Week 1, Month 1, etc.)
   ├─ Floating chat widget (bottom-right)
   │   ├─ Ask: "What tools do I need on Day 1?"
   │   ├─ Ask: "Who should I contact about VPN?"
   │   └─ Persistent conversation history
   ├─ Edit mode toggle → Section-based editor
   │   ├─ Edit any section inline
   │   ├─ Regenerate sections with AI
   │   └─ Reorder, add, or delete sections
   ├─ Copy to clipboard
   ├─ Download as PDF
   ├─ Toggle public/private + copy share link
   └─ Delete with confirmation

7. MANAGER DASHBOARD (/manager)
   ├─ Overview table: All guides with progress bars
   ├─ Summary: Total tasks, in-progress, overall %
   ├─ Task breakdown per guide (not started / in progress / complete)
   ├─ Search & filter by status, title, assignee
   └─ Click to drill into any guide

8. SHARE GUIDE
   ├─ Toggle guide to "Public"
   ├─ Copy unique share URL
   ├─ Share with anyone — no login required
   └─ Recipients see branded OnboardAI viewer
```

---

## 🖼️ Screenshots & UI Components

### Pages Overview

| Page | Description |
|------|-------------|
| **Landing** | Hero with logo, gradient text, animated badge, feature grid, CTA, footer |
| **Login** | Centered card with logo, email/password form, link to register |
| **Register** | 5-field form (name, email, company, password, confirm), link to login |
| **Dashboard** | 3 stat cards, 2 quick action cards, guide list, search/filter, onboarding tour |
| **Generator** | 5-step wizard with AI suggestions, voice input, progress indicator, result view |
| **Guide View** | Timeline + markdown render + checklist sidebar + chat widget + edit mode |
| **Manager** | Summary cards, filterable table with progress bars, task breakdowns |
| **Templates** | Grid of 6 template cards with gradient icons |
| **Shared Guide** | Public viewer with branded top bar and footer |
| **404** | Friendly not-found page with navigation link |

### Logo

The OnboardAI logo (`client/public/onboard logo.jpeg`) features a friendly robot mascot holding a clipboard with checkmarks, representing the AI-powered automation of onboarding documentation. The logo appears across:
- Browser favicon (tab icon)
- Navbar (all pages)
- Landing page hero section
- Login and Register pages
- Footer
- Shared Guide top bar
- CTA section

---

## 🔮 Future Enhancements

1. **Multi-language Support** — Generate guides in different languages
2. **Real-time Collaboration** — Multiple users editing guides simultaneously
3. **Version History** — Track changes to guides over time
4. **Custom Branding** — Upload company logo and set brand colors
5. **Email Delivery** — Send guides directly to new hires via email
6. **Analytics Dashboard** — Track guide views, shares, and engagement
7. **Progressive Web App (PWA)** — Installable app experience
8. **Bulk Generation** — Generate guides for multiple roles at once
9. **Integration APIs** — Connect with Slack, Teams, HR systems
10. **Team Workspaces** — Organization-level guide management with role-based access
11. **Automated Reminders** — Notify new hires about incomplete checklist items
12. **Onboarding Calendar** — Sync timeline milestones with Google/Outlook calendar

---

## 📝 License

MIT — Built for hackathons and production use.

---

> **OnboardAI** — Transform your onboarding process with the power of AI. What used to take days now takes seconds. Generate, track, chat, and collaborate — all in one platform. 🚀
