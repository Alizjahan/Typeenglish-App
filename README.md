<div align="center">

# 🚀 TypeEnglish App
### Master English Through Interactive Typing, Listening, and Spaced Repetition

[![React](https://img.shields.io/badge/React-18-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple.svg?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[Features](#-features) • [Installation](#-installation) • [Architecture](#-architecture) • [Screenshots](#-screenshots) • [Contributing](#-contributing)

</div>

---

## 🌟 Overview

**TypeEnglish** is a comprehensive, desktop-first language learning platform designed to bridge the gap between passive reading and active production. By enforcing **typing** as the primary interaction method, the app builds muscle memory, grammatical accuracy, and rapid recall.

Operating entirely as a **100% Offline Local-First** application, it stores all progress securely in your browser using advanced state-management, requiring absolutely zero backend or server connection.

## ✨ Features

### 1. 📖 Vocabulary Training (4000 Essential English Words)
- **Leitner Spaced Repetition System:** Dynamically schedules reviews based on your memory retention (Boxes 1 to 6).
- **Rich Context:** Every word includes a native audio pronunciation, phonetic transcription (IPA), contextual image, Persian definition, and example sentence.
- **Active Recall:** Type the word from memory based on its definition and context.

### 2. 🎧 Listening & Dictation
- Practice transcription with real native audio.
- Automatically grades accuracy, handles punctuation gracefully, and tracks replays.
- CEFR-aligned progression (A1 to C1).

### 3. ⌨️ Speed Typing
- Improve physical keyboard fluency and WPM (Words Per Minute).
- Focus on specific letter combinations, common English syllables, and challenging punctuation.
- Real-time keystroke evaluation, finger-placement guides, and visual accuracy heatmaps.

### 4. 🧩 Grammar Typing
- Contextual fill-in-the-blank grammar challenges requiring full sentence typing.
- Topics categorized by CEFR level.

### 5. 🔁 Smart Review Dashboard
- The application automatically tracks your weak points across all four modules.
- A centralized dashboard compiles due Leitner words, missed grammar topics, low-accuracy listening exercises, and slow typing lessons into a single, cohesive daily review queue.

---

## 🚀 Installation & Setup

Since TypeEnglish is built on a modern Vite + React stack, running it locally is incredibly fast.

### Prerequisites
- **Node.js** (v18.0 or newer)
- **npm** or **yarn**

### Quick Start
```bash
# 1. Clone the repository
git clone https://github.com/Alizjahan/Typeenglish-App.git

# 2. Navigate to the directory
cd Typeenglish-App

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🏗 Architecture & Tech Stack

TypeEnglish takes a radical **Local-First** approach.

- **Frontend Framework:** React 18 with TypeScript for robust, bug-free components.
- **Styling:** Tailwind CSS for a highly responsive, modern, dark-mode prioritized UI.
- **Build Tool:** Vite for instantaneous HMR and optimized production bundling.
- **State Management & Persistence:** Custom Storage Services wrapping `localStorage`.
- **Audio/TTS:** Web Speech API integration combined with pre-rendered static assets for zero-latency playback.

### Data Security
Your data belongs to you. Progress can be securely exported to a `.json` backup and imported on any other device. No data is ever sent to the cloud.

---

## 📊 Progress Tracking

- **Daily Goals:** Set your study target (10 to 60 minutes).
- **Streaks:** Maintain your daily study habit.
- **XP System:** Gamified progression based on accuracy and completion.
- **Four-Pillar Dashboard:** Monitor your Mastery across Vocabulary, Grammar, Listening, and Typing independently.

---

## 👨‍💻 Author

**Alireza Jahanbakhsh**
- GitHub: [@Alizjahan](https://github.com/Alizjahan)
- Email: Alizjahnbakhsh@gmail.com

---

<div align="center">
  <i>Built with ❤️ for English learners worldwide.</i>
</div>
