import hydrate from "preact-iso/hydrate";
import render from 'preact-iso/prerender';

import { registerIslands } from "./lib/preact-islands";

import './style.css';

// the dev server (dev command) runs in development mode
const isDEV = import.meta.env.MODE === 'development';
const isBrowser = typeof window !== 'undefined';


if (isBrowser && isDEV) {
  // Hydrate the whole app while in development
  import('./App').then(({ App }) => {
    hydrate(<App />, document.getElementById('app'));
  });
}

if (isBrowser && !isDEV) {
  // Only hydrate Islands in production
  registerIslands({
    Button: () => import("./islands/Button"),
  });
}

export async function prerender(data) {
  const { App } = await import('./App');
  return await render(<App {...data} />);
}
