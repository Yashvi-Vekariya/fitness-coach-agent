# 🏋️ FitCoach AI Agent

> AI-Powered Fitness Coach with Multi-Agent Architecture | Web App + Telegram Bot

Built with **OpenClaw** + **Groq AI** + **React** + **Node.js**

---

## 🚀 Features

### Core Features
- ✅ **Multi-Agent AI System** — Supervisor routes queries to specialized agents
- ✅ **Personalized Workout Plans** — Home & Gym, by body part, adaptive
- ✅ **Nutrition Coaching** — Meal plans, calorie tracking, macro calculations
- ✅ **Progress Tracking** — Weight logs, BMI, weekly reports, charts
- ✅ **Gamification** — Points, levels, badges, streaks, achievements

### Advanced Features
- ✅ **RAG Knowledge Base** — AI enhanced with fitness research data
- ✅ **Meal Photo Analysis** — Send food photos for calorie estimation (Gemini Vision)
- ✅ **Exercise Library** — 50+ exercises with instructions
- ✅ **BMI Calculator** — Instant calculation with health advice
- ✅ **Telegram Bot** — Full-featured bot with inline keyboards
- ✅ **Voice Support** — Voice message handling (Telegram)
- ✅ **Multilingual** — Hindi + English support
- ✅ **Visual Dashboard** — Charts, graphs, streak calendar

### Architecture
```
User → Web App / Telegram Bot
          ↓
    OpenClaw Gateway
          ↓
    Supervisor Agent (routes queries)
          ↓
  ┌───────────────────────────┐
  │ Workout │ Nutrition │ Progress │ Motivation │
  │  Agent  │   Agent   │  Agent   │   Agent    │
  └───────────────────────────┘
          ↓
    RAG Knowledge Base + SQLite Database
          ↓
    Groq API (Llama 3.3) + Gemini Vision
```

---

## 📋 Prerequisites

- **Node.js 18+** (20+ recommended)
- **npm** or **pnpm**
- **Groq API Key** (free at https://console.groq.com)
- **Gemini API Key** (free at https://aistudio.google.com)
- **Telegram Bot Token** (from @BotFather on Telegram)

---

## ⚡ Quick Start (Local Development)

### 1. Clone & Setup
```bash
git clone https://github.com/YOUR_USERNAME/fitness-coach-agent.git
cd fitness-coach-agent
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` with your API keys:
```env
GROQ_API_KEY=gsk_your_key_here
GEMINI_API_KEY=AIza_your_key_here
TELEGRAM_BOT_TOKEN=your_telegram_token_here
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### 3. Install Dependencies
```bash
# Install all packages
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
cd telegram-bot && npm install && cd ..
```

### 4. Start Backend
```bash
cd backend
npm run dev
```
Backend runs on http://localhost:3000

### 5. Start Frontend (new terminal)
```bash
cd frontend
npm run dev
```
Frontend runs on http://localhost:5173

### 6. Start Telegram Bot (new terminal)
```bash
cd telegram-bot
npm run dev
```

---


---

## 📁 Project Structure

```
fitness-coach-agent/
├── backend/          # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── agents/   # Multi-agent system
│   │   ├── api/      # REST API routes
│   │   ├── database/ # SQLite schema
│   │   ├── rag/      # Knowledge base
│   │   ├── services/ # Business logic
│   │   ├── skills/   # BMI, exercise library, meal analyzer
│   │   └── utils/    # Prompts, validators, constants
│   └── package.json
├── frontend/         # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── utils/
│   └── package.json
├── telegram-bot/     # Telegram Bot
│   ├── src/
│   │   └── bot.ts
│   └── package.json
├── .env.example
├── render.yaml
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| AI/LLM | Groq (Llama 3.3 70B) |
| Vision | Google Gemini 1.5 Flash |
| Backend | Node.js + Express + TypeScript |
| Frontend | React + Vite + Tailwind CSS |
| Database | SQLite (better-sqlite3) |
| Telegram | node-telegram-bot-api |
| Charts | Recharts |
| Hosting | Render + Vercel |

---

## 📝 License

MIT License - Built for 91Agents hiring exercise.
