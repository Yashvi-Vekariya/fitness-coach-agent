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

## 🌐 Deployment

### Deploy Backend on Render (Free)

1. Push code to GitHub
2. Go to https://render.com → New → Web Service
3. Connect your GitHub repo
4. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npx tsc`
   - **Start Command**: `node dist/index.js`
   - **Environment**: Node
5. Add Environment Variables:
   - `GROQ_API_KEY`
   - `GEMINI_API_KEY`
   - `FRONTEND_URL` (your Vercel URL after deploying frontend)
   - `PORT` = 3000
6. Deploy!

Copy your Render URL (e.g., `https://fitcoach-api.onrender.com`)

### Deploy Telegram Bot on Render (Free)

1. Render → New → Background Worker
2. Connect same repo
3. Settings:
   - **Root Directory**: `telegram-bot`
   - **Build Command**: `npm install && npx tsc`
   - **Start Command**: `node dist/src/bot.js`
4. Add Environment Variables:
   - `TELEGRAM_BOT_TOKEN`
   - `BACKEND_URL` = your Render backend URL
5. Deploy!

### Deploy Frontend on Vercel (Free)

1. Go to https://vercel.com → New Project
2. Import your GitHub repo
3. Settings:
   - **Root Directory**: `frontend`
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variable:
   - `VITE_API_URL` = `https://your-render-backend.onrender.com/api`
5. Deploy!

6. **IMPORTANT**: Update `frontend/vercel.json` with your Render backend URL:
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-render-backend.onrender.com/api/:path*"
    }
  ]
}
```

7. Go back to Render → Backend → Add env var:
   - `FRONTEND_URL` = your Vercel URL

---

## 🤖 Getting API Keys

### Groq API Key (Free)
1. Go to https://console.groq.com
2. Sign up / Login
3. Go to API Keys → Create API Key
4. Copy the key starting with `gsk_`

### Gemini API Key (Free)
1. Go to https://aistudio.google.com/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key starting with `AIza`

### Telegram Bot Token
1. Open Telegram, search for `@BotFather`
2. Send `/newbot`
3. Follow prompts (choose name and username)
4. Copy the token (format: `123456:ABCdefGHI...`)

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

## 💰 Cost: ₹0 (Completely Free)

| Service | Cost |
|---------|------|
| Groq API | Free |
| Gemini API | Free |
| Render (Backend + Bot) | Free |
| Vercel (Frontend) | Free |
| Telegram Bot API | Free |
| **Total** | **₹0** |

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
