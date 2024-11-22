
import { LocationProvider, Route, Router } from 'preact-iso/router';

import { Home } from './pages/Home/index';
import { NotFound } from './pages/_404';
import { Header } from './components/Header';


export function App() {
  return (
    <LocationProvider>
      <Header />
      <main>
        <Router>
          <Route path="/" component={Home} />
          <Route default component={NotFound} />
        </Router>
      </main>
    </LocationProvider>
  );
}
