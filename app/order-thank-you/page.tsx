export default function OrderThankYouPage() {
  return (
    <main className="section blossom-section">
      <img className="branch-accent branch-accent-left" src="/design-assets/logobranch.png" alt="" />
      <div className="section-inner checkout-panel stack">
        <div className="section-eyebrow">Reservation request received</div>
        <h1 style={{ fontSize: 72 }}>Thank you.</h1>
        <p className="section-sub">
          Your Sunday supper request is in the kitchen office. Online payment is not turned on yet,
          so we will follow up directly to confirm the order.
        </p>
        <a className="btn-primary" href="/">
          Back to Macon Supper Club
        </a>
      </div>
    </main>
  );
}
