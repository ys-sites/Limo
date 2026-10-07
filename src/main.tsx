import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// After a new deploy, a tab opened earlier still points at old hashed files that no
// longer exist (broken images, subpages that fail to load). Reload once to pick up the new build.
const RELOAD_KEY = 'limoraf:stale-reload';
const reloadForNewBuild = () => {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
    if (Date.now() - last < 30_000) return; // never loop
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    return;
  }
  window.location.reload();
};

window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();
  reloadForNewBuild();
});

window.addEventListener(
  'error',
  (event) => {
    const el = event.target;
    if (el instanceof HTMLImageElement && el.currentSrc.includes('/assets/')) {
      reloadForNewBuild();
    }
  },
  true
);

createRoot(document.getElementById('root')!).render(<App />);
