
import preactLogo from '../assets/preact.svg';

export function Header() {
  return (
    <header>
      <h1>Preact Islands</h1>
      <a href="https://preactjs.com" target="_blank">
        <img src={preactLogo} alt="Preact logo" height="160" width="160" />
      </a>
    </header>
  )
}
