import { hydrate, prerender as render } from 'preact-iso';
import './style.css'

// the dev server (dev command) runs in development mode
const isDEV = import.meta.env.MODE === 'development';

// Hydrate the whole app while in development
if (isDEV && typeof window !== 'undefined') {
  import('./App').then(({ App }) => {
    hydrate(<App />, document.getElementById('app'));
  })
}

// Only hydrate Islands in production
if (!isDEV && typeof window !== 'undefined') {
  import('./islands/_manifest')
}

export async function prerender(data) {
  const { App } = await import('./App');
  return await render(<App {...data} />);
}
