export default function SuccessPage() {
  return (
    <main className="section">
      <div className="section-inner checkout-panel">
        <div className="section-eyebrow">Reservation received</div>
        <h1 style={{ fontSize: 72 }}>Thank you.</h1>
        <p className="section-sub">
          Your Sunday supper is confirmed. A receipt is on its way from Stripe, and the kitchen has
          your order details.
        </p>
        <a className="btn-primary" href="/">
          Back to the supper club
        </a>
      </div>
    </main>
  );
}

