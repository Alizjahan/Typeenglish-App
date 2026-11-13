<p align="center">
  <img src="./header1.jpg" alt="TypeEnglish App Banner" width="100%">
</p>

<div align="center">

# TypeEnglish App
### Interactive English Typing, Listening Dictation, and Spaced Repetition Platform

[![Release](https://img.shields.io/badge/Release-v1.0.0-0D9DF8?style=flat-square&logo=github)](https://github.com/Alizjahan/Typeenglish-App)
[![License](https://img.shields.io/badge/License-MIT-34C6BF?style=flat-square)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-89DB76?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-purple?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Maintainer](https://img.shields.io/badge/Maintainer-Alizjahan-0F6FFA?style=flat-square&logo=github)](https://github.com/Alizjahan)

A desktop-first language learning application designed to bridge the gap between passive reading and active production through motor memory, grammatical precision, and rapid vocabulary recall.

[Overview](#overview) • [Key Features](#-key-features) • [Architecture & Tech Stack](#-architecture--technical-stack) • [Installation & Setup](#-installation--setup) • [Progress Tracking](#-progress-tracking)

</div>

---

## Overview

TypeEnglish is a desktop-first language learning application designed to bridge the gap between passive reading and active production. By enforcing typing as the primary interaction method, the platform builds motor memory, grammatical precision, and rapid vocabulary recall.

Operating entirely as an offline, local-first application, TypeEnglish stores all user progress securely in the browser, requiring no external server connection or account dependency.

---

## ✨ Key Features

### 1. Vocabulary Training (4000 Essential English Words)
- **Leitner Spaced Repetition:** Reviews are scheduled dynamically across Boxes 1 through 6 based on recall retention.
- **Rich Context:** Every entry provides native audio pronunciation, International Phonetic Alphabet (IPA) transcriptions, contextual imagery, definitions, and model sentences.
- **Active Recall:** Prompts require typing the target word directly from contextual comprehension.

### 2. Listening and Dictation
- Native audio transcription practice across CEFR levels (A1 to C1).
- Automatic grading engine with tolerance for punctuation and casing nuances.
- Replay counters and word-level accuracy diagnostics.

### 3. Speed and Touch Typing
- Muscle memory development focused on high-frequency English letter combinations, syllables, and syntax.
- Real-time Words Per Minute (WPM) tracking, accuracy metrics, and visual key placement guidance.

### 4. Grammar Typing
- Contextual fill-in-the-blank exercises requiring full sentence typing.
- Structured progression covering fundamental to advanced grammatical patterns.

### 5. Unified Review Dashboard
- Automated aggregation of weak points across all four learning modules.
- Single queue combining due Leitner vocabulary, incorrect grammar selections, low-accuracy listening exercises, and speed typing practice recommendations.

---

## 🏗️ Architecture & Technical Stack

TypeEnglish is built on a local-first engineering foundation:

- **Frontend:** React 18 with TypeScript for type-safe UI architecture.
- **Styling:** Tailwind CSS with a clean, dark-mode prioritized interface.
- **Build System:** Vite for fast Hot Module Replacement and bundle optimization.
- **Persistence:** Custom storage service layer abstracting browser local storage.
- **Audio Delivery:** Pre-rendered static assets paired with Web Speech API fallbacks for low-latency playback.

```text
Typeenglish-App/
├── src/
│   ├── components/       # Reusable UI widgets, inputs, and modals
│   ├── hooks/            # Custom React hooks (audio, typing engine)
│   ├── modules/          # Core learning modules (vocab, listening, grammar)
│   ├── services/         # Local storage & Leitner scheduler
│   └── types/            # TypeScript schema definitions
├── public/               # Audio clips, IPA datasets, and static images
├── package.json
└── vite.config.ts
```

### Data Privacy & Offline Portability
All user progress, statistics, and review intervals are stored locally. Full backups can be exported as structured JSON and imported across devices at any time without cloud transmission.

---

## 🚀 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher)
- npm or yarn

### Quick Start
```bash
# Clone the repository
git clone https://github.com/Alizjahan/Typeenglish-App.git

# Navigate to the project directory
cd Typeenglish-App

# Install dependencies
npm install

# Start the local development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📊 Progress Tracking

- **Daily Study Goals:** Configurable daily targets ranging from 10 to 60 minutes.
- **Streak & Consistency:** Daily practice logging and habit tracking.
- **Performance Analytics:** Independent accuracy, mastery, and volume metrics across all four skill modules.

---

## Maintainer

- **GitHub:** [@Alizjahan](https://github.com/Alizjahan)
- **Contact:** [alizjahanbakhsh@gmail.com](mailto:alizjahanbakhsh@gmail.com)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>TypeEnglish &bull; Desktop-First English Learning Platform</sub>
</div>