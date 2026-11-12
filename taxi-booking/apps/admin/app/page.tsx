const metrics = [
  ["Today's bookings", "—", "Live data not connected"],
  ["Active drivers", "—", "Live data not connected"],
  ["Revenue today", "—", "Live data not connected"],
  ["Pending verification", "—", "Live data not connected"]
];
export default function Home() {
  return <main className="dashboard">
    <aside><div className="logo">RIDE<span>KH</span></div><p className="nav active">Overview</p><p className="nav">Bookings</p><p className="nav">Drivers</p><p className="nav">Customers</p><p className="nav">Pricing</p><p className="nav">Settings</p></aside>
    <section className="content"><header><div><small>OPERATIONS / PHNOM PENH</small><h1>Dashboard</h1></div><span className="status">API not connected</span></header>
      <div className="cards">{metrics.map(([label,value,note])=><article key={label}><small>{label}</small><strong>{value}</strong><p>{note}</p></article>)}</div>
      <article className="notice"><h2>Welcome to RideKH Operations</h2><p>This admin interface is a starter shell. Connect authenticated admin APIs before using it for live operations.</p></article>
    </section>
  </main>;
}
