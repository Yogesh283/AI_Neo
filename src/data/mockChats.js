export const chatHistory = [
  { id: '1', title: 'React project setup help' },
  { id: '2', title: 'Python data analysis tips' },
  { id: '3', title: 'Email draft for client' },
  { id: '4', title: 'Travel itinerary for Japan' },
  { id: '5', title: 'Explain quantum computing' },
]

export const suggestions = [
  { icon: '💡', text: 'Explain a complex topic simply' },
  { icon: '✍️', text: 'Help me write an email' },
  { icon: '🧠', text: 'Brainstorm creative ideas' },
  { icon: '💻', text: 'Debug my code' },
]

export const chatMessages = {
  '1': [
    { id: '1-1', role: 'user', content: 'How do I set up a new React project with Vite?' },
    {
      id: '1-2',
      role: 'assistant',
      content:
        "Here's how to set up a React project with Vite:\n\n**1.** Run `npm create vite@latest my-app -- --template react`\n\n**2.** `cd my-app` and run `npm install`\n\n**3.** Start dev server with `npm run dev`\n\nVite is fast and works great with React 19. Want help adding Tailwind or routing next?",
    },
  ],
  '2': [
    { id: '2-1', role: 'user', content: 'What are the best Python libraries for data analysis?' },
    {
      id: '2-2',
      role: 'assistant',
      content:
        "The essential Python data stack:\n\n**pandas** — data manipulation and analysis\n**NumPy** — numerical computing\n**matplotlib / seaborn** — visualization\n**scikit-learn** — machine learning\n**Jupyter** — interactive notebooks\n\nStart with pandas + matplotlib for most analysis tasks.",
    },
  ],
  '3': [
    { id: '3-1', role: 'user', content: 'Help me write a professional email to a client about project delay.' },
    {
      id: '3-2',
      role: 'assistant',
      content:
        "Here's a draft:\n\n**Subject:** Project Update — Revised Timeline\n\nDear [Client Name],\n\nI wanted to provide a quick update on [Project Name]. Due to [brief reason], we need to adjust our delivery timeline by approximately [X days/weeks].\n\nWe're committed to maintaining quality and will keep you updated weekly. Please let me know if you'd like to discuss.\n\nBest regards,\n[Your Name]",
    },
  ],
  '4': [
    { id: '4-1', role: 'user', content: 'Plan a 7-day trip to Japan for first-time visitors.' },
    {
      id: '4-2',
      role: 'assistant',
      content:
        "**Day 1–3: Tokyo** — Shibuya, Senso-ji, teamLab, Akihabara\n**Day 4:** Hakone or Nikko day trip\n**Day 5–6: Kyoto** — Fushimi Inari, Arashiyama, Gion\n**Day 7:** Osaka — Dotonbori, Osaka Castle\n\nGet a JR Pass if traveling between cities. Book accommodations near train stations.",
    },
  ],
  '5': [
    { id: '5-1', role: 'user', content: 'Explain quantum computing in simple terms.' },
    {
      id: '5-2',
      role: 'assistant',
      content:
        "Classical computers use bits — either 0 or 1. Quantum computers use **qubits** that can be 0, 1, or both at once (superposition).\n\nThis lets them explore many solutions simultaneously. They're powerful for specific problems like cryptography and drug discovery, but won't replace your laptop for everyday tasks.",
    },
  ],
}

export const libraryItems = [
  { id: 'lib-1', title: 'Professional email templates', type: 'Prompt', icon: '✉️' },
  { id: 'lib-2', title: 'Code review checklist', type: 'Guide', icon: '📋' },
  { id: 'lib-3', title: 'Travel planning assistant', type: 'GPT', icon: '✈️' },
  { id: 'lib-4', title: 'Resume builder', type: 'Tool', icon: '📄' },
  { id: 'lib-5', title: 'Recipe ideas by ingredients', type: 'GPT', icon: '🍳' },
  { id: 'lib-6', title: 'Study notes summarizer', type: 'Tool', icon: '📚' },
]

export const models = [
  { id: 'gpt-4o', label: 'GPT-4o', desc: 'Great for most tasks' },
  { id: 'gpt-4o-mini', label: 'GPT-4o mini', desc: 'Faster for everyday tasks' },
  { id: 'o1', label: 'o1', desc: 'Uses advanced reasoning' },
]

export const demoReply =
  "That's a great question! I'm Neo, your AI assistant. This is a design-ready interface — once you connect a backend API, I'll be able to give you real answers. For now, enjoy exploring the UI!"
