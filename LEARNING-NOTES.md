# Portfolio Project — Learning Notes

## Tech Stack

- **React** — UI library
- **Vite** — build tool + dev server

---

## Key Concepts

### Client-Side Rendering
Browser receives JavaScript, then JS builds the page in the browser.

### Vite
Transforms JSX into browser-compatible code. Runs local dev server. Bundles for production.

### useState
Holds data that can change. When it changes, React re-renders the component.
```jsx
const [data, setData] = useState(initialValue)
```
- `data` — the current value
- `setData` — function to update it (triggers re-render)
- `initialValue` — starting value (often `[]` for arrays)

### useEffect
Runs code at specific times (not on every render).
```jsx
useEffect(() => {
  // code here
}, [dependencies])
```
- `[]` — run once when component mounts
- `[var]` — run when `var` changes

**Use useEffect when:** state changes automatically (not from user action), like fetching data on page load.

### Fetching Data Pattern
```jsx
const [data, setData] = useState([])

useEffect(() => {
  fetch(url)
    .then(response => response.json())
    .then(data => setData(data))
}, [])
```

### Environment Variables (Vite)
Store secrets in `.env` file (add to `.gitignore`):
```
VITE_API_KEY=your_key_here
```
Access in code:
```jsx
const apiKey = import.meta.env.VITE_API_KEY
```

---

## Commands

### Create a Vite + React project
```bash
npm create vite@latest . -- --template react
```
- `npm create` — run a scaffolding package
- `vite@latest` — use latest Vite
- `.` — create in current directory
- `--` — pass remaining args to Vite
- `--template react` — use React template
