# The Debate Arena (ChatBot Frontend)

A modern, high-performance React/TypeScript application serving as the battleground for AI vs AI debates.

![Debate Arena UI](public/debate-logo.png)

## 🌟 New Features: The Debate Arena
This latest version introduces the **Debate Arena**—a completely overhauled UI for multi-agent interactions.

*   **Split-Stage Layout**: Watch Agent A (OpenAI) and Agent B (Gemini/Mock) debate side-by-side.
*   **Round-Based Analysis**: 
    1.  **Draft**: Initial proposals from both agents.
    2.  **Cross-Exam**: Agents critique each other’s logic.
    3.  **Verdict**: A third "Judge" agent synthesizes the debate into a final action plan.
*   **Glassmorphism Design**: High-end dark mode aesthetics with gradients and motion.
*   **Error Intelligence**: "Exact Error" reporting tells you precisely why a request failed (e.g. "Quota exceeded", "Input too short").

## 🚀 Getting Started

### Prerequisites
*   Node.js 18+
*   The backend (`distributed-scheduler`) running on port 8080.

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```
Access the app at `http://localhost:3000`.

## 🛠️ Tech Stack

*   **Framework**: React 18 + TypeScript + Vite
*   **Styling**: Pure CSS (Glassmorphism), Framer Motion (Animations)
*   **Icons**: Lucide React
*   **Communication**: REST API (connecting to Spring Boot)

## 🔑 Configuration

The app expects the backend at `http://localhost:8080`.
To change this, update `src/components/api/debateApi.ts` or set `VITE_API_BASE_URL` in `.env`.
