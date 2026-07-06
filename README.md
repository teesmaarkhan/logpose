
# LogPose

**A modern competitive programming workspace built for Codeforces.**

LogPose streamlines the competitive programming workflow by letting you import sample test cases from any Codeforces problem URL, solve problems in a Monaco-powered editor, execute code through Judge0, and analyze detailed execution results—all from a single interface.

</div>

---

## ✨ Features

### 📝 Smart Code Editor

- Monaco Editor
- C++, Python, Java and JavaScript support
- Adjustable font size
- Built-in competitive programming snippets
- Copy code
- Download source code
- Reset to default template
- Automatic editor layout

### 🚀 Competitive Programming Workflow

- Import sample test cases from any Codeforces problem URL
- Automatic problem name extraction from Codeforces
- Create unlimited custom test cases
- Edit and remove custom test cases
- Execute all test cases with a single click
- Execute individual test cases independently
- Scratch Runner for testing custom input without expected output
- Built-in contest timer with start, pause, and reset controls
- Download source code with the detected problem name
- Real-time verdicts, execution time, and memory usage for every test case


### ⚡ Execution Engine

Powered by **Judge0**

Supports:

- Compilation
- Runtime execution
- Runtime statistics
- Memory statistics
- Compilation errors
- Runtime errors
- Wrong Answer
- Accepted
- Time Limit Exceeded
- Memory Limit Exceeded

### 🎨 User Experience

- Responsive split layout
- Local storage persistence
- Keyboard shortcuts
- Compiler error modal
- Confetti animation after passing all tests
- Adjustable execution limits

---

# 🏗 Architecture

```text
          Codeforces
               │
               ▼
       Problem URL & Test Cases
               │
               ▼
      Puppeteer Scraper Service
               │
               ▼
      React + Monaco Workspace
               │
               ▼
      Express.js Backend Server
               │
               ▼
      Judge0 Execution Engine
               │
               ▼
      Compilation • Runtime • Memory
               │
               ▼
      Verdicts & Execution Report
               
```

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Monaco Editor
- Lucide React

## Backend

- Node.js
- Express.js
- Puppeteer
- Axios

## Code Execution

- Judge0 API

---

# 📂 Project Structure

```
LogPose
├── client/                          # React + Vite frontend
│
│   ├── src/
│   │
│   │   ├── components/              # Reusable UI components
│   │   │
│   │   │   ├── Common/              # Shared components used across the application
│   │   │   │   └── Confetti.jsx
│   │   │
│   │   │   ├── Editor/              # Monaco editor and editor-related UI
│   │   │   │   └── EditorPanel.jsx
│   │   │
│   │   │   ├── Header/              # Top navigation bar and controls
│   │   │   │   └── Header.jsx
│   │   │
│   │   │   ├── Modals/              # Popup dialogs and floating windows
│   │   │   │   ├── CompilerErrorModal.jsx
│   │   │   │   ├── LimitsModal.jsx
│   │   │   │   └── ScratchRunner.jsx
│   │   │   │
│   │   │   └── Sidebar/             # Test case panel and execution results
│   │   │       └── Sidebar.jsx
│   │   │
│   │   ├── constants/               # Static application data
│   │   │   ├── languages.js         # Supported programming languages
│   │   │   ├── snippets.js          # Competitive programming snippets
│   │   │   └── themes.js            # UI theme definitions
│   │   │
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useLocalStorage.js   # Persist editor state
│   │   │   ├── useResizableSidebar.js
│   │   │   └── useTimer.js          # Contest timer logic
│   │   │
│   │   ├── services/                # API communication layer
│   │   │   └── compilerApi.js
│   │   │
│   │   ├── utils/                   # Helper functions
│   │   │   ├── diffLines.js         # Compare expected and actual outputs
│   │   │   ├── formatClock.js       # Timer formatting
│   │   │   └── monacoTheme.js       # Custom Monaco theme
│   │   │
│   │   ├── App.jsx                  # Root application component
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Global styles
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Express backend
│
│   ├── src/
│   │
│   │   ├── controllers/             # Business logic
│   │   │   ├── compiler.controller.js   # Judge0 execution
│   │   │   └── scraper.controller.js    # Codeforces scraping
│   │   │
│   │   ├── routes/                  # API routes
│   │   │   └── compiler.routes.js
│   │   │
│   │   └── index.js                 # Express server entry point
│   │
│   ├── package.json
│
└── README.md
```
---

# 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/pbhutka/LogPose.git
cd LogPose
```

## Install Frontend

```bash
cd client
npm install
npm run dev
```

Runs on:

```text
http://localhost:5173
```

## Install Backend

```bash
cd server
npm install
npx ndoemon src/index.js
```

Runs on:

```text
http://localhost:5000
```

---

# 🔌 REST API

## Fetch Test Cases

```http
POST /api/fetch-tc
```

Example request

```json
{
  "url":"https://codeforces.com/problemset/problem/71/A"
}
```

Example response

```json
{
  "problemName": "way_too_long_words",
  "testCases": [
    {
      "input": "4\nword\nlocalization\ninternationalization\npneumonoultramicroscopicsilicovolcanoconiosis",
      "output": "word\nl10n\ni18n\np43s"
    }
  ]
}
```

---

## Execute Code

```http
POST /api/run-code
```

Example request

```json
{
  "language":"cpp",
  "code":"...",
  "testCases":[]
}
```

Example response

```json
{
  "results":[]
}
```

---

# ⌨ Keyboard Shortcuts

| Shortcut | Action |
|-----------|--------|
| Ctrl + Enter | Run all test cases |
| Ctrl + Shift + K | Reset editor |
| Ctrl + = | Increase font size |
| Ctrl + - | Decrease font size |

---

# 📸 Screenshots

Add screenshots after deployment.

```text
screenshots/
├── home.png
├── editor.png
├── testcase-panel.png
├── scratch-runner.png
├── compiler-error.png
└── accepted.png
```

---

# 🌱 Roadmap

- LeetCode support
- AtCoder support
- CodeChef support
- Submission history
- Authentication
- Cloud sync
- Docker deployment
- AI code review
- AI optimization suggestions
- Custom themes
- VS Code extension

---

# ⚠ Current Limitations

- Backend currently uses a fixed Judge0 language mapping unless extended.
- Designed primarily around Codeforces problem pages.
- Internet connection is required for scraping and execution.

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.

---

<div align="center">

Built for competitive programmers ❤️

</div>
