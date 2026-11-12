import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

declare global { interface Window { Telegram?: { WebApp?: { ready(): void; expand(): void } } } }
window.Telegram?.WebApp?.ready();
window.Telegram?.WebApp?.expand();

function App() {
  return <main className="shell">
    <div className="brand">RIDE<span>KH</span></div>
    <p className="eyebrow">PHNOM PENH • CAMBODIA</p>
    <h1>Your city.<br/><em>Your ride.</em></h1>
    <p className="muted">Book a trusted ride in just a few taps.</p>
    <section className="panel">
      <label>Pickup location</label><input placeholder="Choose pickup point" />
      <label>Where to?</label><input placeholder="Enter your destination" />
      <button disabled>Find a ride · Coming soon</button>
    </section>
    <small>Secure booking • Live driver tracking</small>
  </main>;
}
createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
