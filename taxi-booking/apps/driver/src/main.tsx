import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
declare global { interface Window { Telegram?: { WebApp?: { ready(): void; expand(): void } } } }
window.Telegram?.WebApp?.ready(); window.Telegram?.WebApp?.expand();
function App(){return <main><div className="tag">RIDEKH · DRIVER</div><h1>Ready to<br/><span>drive?</span></h1><p>Manage your availability and trips from one place.</p><section><b>Driver account</b><p>Sign in with Telegram to continue.</p><button disabled>Driver verification · Coming soon</button></section></main>}
createRoot(document.getElementById("root")!).render(<React.StrictMode><App/></React.StrictMode>);
