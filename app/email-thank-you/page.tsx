export default function EmailThankYouPage() {
  return (
    <main className="section blossom-section">
      <img className="branch-accent branch-accent-left" src="/design-assets/logobranch.png" alt="" />
      <div className="section-inner checkout-panel stack">
        <div className="section-eyebrow">You are on the list</div>
        <h1 style={{ fontSize: 72 }}>Thank you.</h1>
        <p className="section-sub">
          We will send weekly menu notes, special offers, and supper club event updates once email
          sending is connected.
        </p>
        <a className="btn-primary" href="/">
          Back to Macon Supper Club
        </a>
      </div>
    </main>
  );
}
