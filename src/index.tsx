import { hydrate, prerender as render } from 'preact-iso';

// the dev server (dev command) runs in development mode
const isDEV = import.meta.env.MODE === 'development';

// Hydrate the whole app in development
if (isDEV && typeof window !== 'undefined') {
  import('./App').then(({ App }) => {
    hydrate(<App />, document.getElementById('app'));
  })
}

// Only hydrate Islands in production
if (!isDEV && typeof window !== 'undefined') {
  // import('./App').then(({ default: App }) => {
  //   hydrate(<App />, document.getElementById('app'));
  // })
}

export async function prerender(data) {
  const { App } = await import('./App');
  return await render(<App {...data} />);
}
