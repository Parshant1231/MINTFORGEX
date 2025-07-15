<h1 align="center">🧠 MINTFORGEX</h1>

**MINTFORGEX** is an AI-powered web app that helps content creators generate, structure, and remix short-form video ideas for platforms like **YouTube Shorts**, **Instagram Reels**, and **TikTok**.

Built with **Next.js App Router**, **TypeScript**, and **Groq's Mixtral AI**, this tool provides creative assistance using cutting-edge generative AI.

---

## 🚀 Features

- 🎬 **Generate viral content ideas** by category or topic
- 🛠️ **Structure story formats** with clear hooks, builds, and CTAs
- 🎨 **Remix existing scripts** into new versions for multi-posting
- 📈 **Explore trending topics** and AI-suggested variations
- 🔥 Powered by **Groq + Mixtral-8x7B** for GPT-4-level performance at blazing speed

---

## 🛠️ Tech Stack & Tools

- ![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white) **Next.js**
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) **TypeScript**
- ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white) **Tailwind CSS**
- ![Groq](https://img.shields.io/badge/Groq-000000?logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMu%0D%0Ab3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9IiMwMDAiLz48L3N2Zz4=) **Groq AI**
- 🔮 **Mixtral-8x7B**
- ![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white) **Axios**
- 🐻 **Zustand**
- ![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white) **Vercel**

---
## 📁 Folder Structure

```bash
/
├── app/
│   ├── api/                # API routes
│   ├── dashboard/          # Dashboard UI
│   ├── generate-idea/      # Idea generation screen
│   ├── remix-story/        # Story remixing UI
│   ├── structured-content/ # Structured output UI
│   └── trending/           # Trending topic explorer
├── lib/                    # AI logic & helper utilities
├── store/                  # Zustand state management
├── utils/                  # Custom helpers
├── public/
├── package.json
└── README.md


```
---

## 📍 How It Works
- User selects a category or pastes a script

- App sends a POST request to /api/generate/idea with a prompt

- Groq + Mixtral AI responds instantly with ideas or structured content

- UI updates using React + Zustand to show results


---
 
## 🌐 Getting Started

Follow these steps to run the project locally:

### 1. 📥 Clone the repository

```bash
git clone https://github.com/Parshant1231/MINTFORGEX.git
cd MINTFORGEX

```

### 2. 📦 Install dependencies

```bash
npm install

```

### 3. 🔐 Configure environment variables
Create a .env.local file in the root of the project:
```bash
# .env.local
GROQ_API_KEY=sk-your-groq-api-key-here

```

### 4. 🚀 Run the dev server
```bash
npm run dev


```
Now open http://localhost:3000 in your browser.


---

## 🙋 Author
Made with [❤️](https://github.com/Parshant1231)!

Project:  MINTFORGEX

## 📄 License

This project is licensed under the [MIT License](LICENSE).
---
---
<p align="center">
  <strong>⭐️ Show Your Support</strong><br/>
  If you found this project helpful, consider giving it a ⭐️ on GitHub!
</p>

---
