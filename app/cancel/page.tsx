export default function CancelPage() {
  return (
    <main className="section">
      <div className="section-inner checkout-panel">
        <div className="section-eyebrow">Checkout canceled</div>
        <h1 style={{ fontSize: 72 }}>No charge was made.</h1>
        <p className="section-sub">You can return to the menu and try again while ordering is open.</p>
        <a className="btn-primary" href="/#reserve">
          Return to ordering
        </a>
      </div>
    </main>
  );
}

