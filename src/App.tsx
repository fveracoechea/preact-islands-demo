import preactLogo from './assets/preact.svg';
import { Header } from './components/Header';
import { Resource } from './components/Resource';
import Button from './islands/Button';


export function App() {
  return (
    <div>
      <Header />
      <Button />
      <h2>Get Started building Vite-powered Preact Apps </h2>
      <section>
        <Resource
          title="Learn Preact"
          description="If you're new to Preact, try the interactive tutorial to learn important concepts"
          href="https://preactjs.com/tutorial"
        />
        <Resource
          title="Differences to React"
          description="If you're coming from React, you may want to check out our docs to see where Preact differs"
          href="https://preactjs.com/guide/v10/differences-to-react"
        />
        <Resource
          title="Learn Vite"
          description="To learn more about Vite and how you can customize it to fit your needs, take a look at their excellent documentation"
          href="https://vitejs.dev"
        />
      </section>
    </div>
  );
}

