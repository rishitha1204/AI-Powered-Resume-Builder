# 🚀 ResumeAI – AI-Powered Resume Builder

A full-stack web application to create ATS-friendly professional resumes using AI.

## ✨ Features

- 🤖 AI-generated professional summaries & career objectives
- 📄 4 professional resume templates (Modern, Minimal, Creative, Corporate)
- ⚡ Real-time resume preview
- 📥 PDF export (high quality)
- 🔐 JWT authentication with bcrypt password hashing
- 💾 MongoDB database storage
- 📊 ATS resume score & improvement tips
- 🎨 Dark, modern UI with smooth animations

## 🛠️ Tech Stack

**Frontend:** React.js · Vite · Tailwind CSS · Framer Motion · React Router · Axios  
**Backend:** Node.js · Express.js  
**Database:** MongoDB with Mongoose  
**Auth:** JWT + bcrypt  
**AI:** OpenAI API (with fallback)  
**PDF:** html2pdf.js

---

## 📂 Project Structure

```
resume-builder/
├── backend/
│   ├── controllers/     # authController, resumeController, aiController
│   ├── models/          # User.js, Resume.js
│   ├── routes/          # auth.js, resume.js, ai.js
│   ├── middleware/       # auth.js (JWT protect)
│   ├── server.js
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── resume/ResumePreview.jsx
    │   ├── context/AuthContext.jsx
    │   ├── pages/
    │   │   ├── LandingPage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── ResumeBuilder.jsx
    │   │   └── NotFound.jsx
    │   ├── services/api.js
    │   ├── App.jsx
    │   └── index.css
    └── index.html
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- OpenAI API key (optional – fallback works without it)

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/resume-builder.git
cd resume-builder
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/resumebuilder
JWT_SECRET=your_super_secret_key_min_32_chars
JWT_EXPIRE=7d
OPENAI_API_KEY=sk-your-openai-key-here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Start backend:

```bash
npm run dev
```

Backend runs at: `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🌐 Deployment

### Frontend → Vercel

1. Push `frontend/` to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Set **Root Directory** to `frontend`
4. Set env var: `VITE_API_URL=https://your-backend.onrender.com`
5. Deploy!

### Backend → Render

1. Push `backend/` to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Set **Root Directory** to `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add all environment variables from `.env`
7. Deploy!

### MongoDB Atlas

1. Create free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create database user
3. Whitelist IP (0.0.0.0/0 for Render)
4. Copy connection string to `MONGO_URI`

---

## 🔑 API Endpoints

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |

### Resume (Protected)
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/resume/create | Create resume |
| GET | /api/resume/all | Get all user resumes |
| GET | /api/resume/:id | Get single resume |
| PUT | /api/resume/update/:id | Update resume |
| DELETE | /api/resume/delete/:id | Delete resume |

### AI (Protected)
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/ai/generate-summary | AI professional summary |
| POST | /api/ai/generate-objective | AI career objective |
| POST | /api/ai/analyze-resume | Resume ATS analysis |

---

## 📸 Pages

- `/` — Landing page (hero, features, templates, testimonials, FAQ)
- `/register` — Create account
- `/login` — Sign in
- `/dashboard` — Resume management
- `/builder` — Create new resume
- `/builder/:id` — Edit existing resume

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License

MIT © 2024 ResumeAI
