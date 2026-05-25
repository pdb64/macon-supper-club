export default function AboutPage() {
  return (
    <main>
      <section className="section blossom-section">
        <img className="branch-accent branch-accent-left" src="/design-assets/logobranch.png" alt="" />
        <div className="section-inner about-page">
          <div className="section-eyebrow">About Macon Supper Club</div>
          <h1 className="page-title">
            Chef-driven dining experiences, made for <span className="script">gathering.</span>
          </h1>
          <p className="section-sub">
            Macon Supper Club is a culinary experience by Chef David Bartlett offering curated
            weekly suppers, private dining, and catered events throughout Middle Georgia. Rooted in
            Southern hospitality and restaurant-quality cooking, every menu is thoughtfully prepared
            and designed to bring people back around the table.
          </p>
        </div>
      </section>

      <section className="philosophy">
        <div className="section-inner">
          <h2>
            Twenty years in professional kitchens, now focused on one table, one supper, and one
            gathering at a time.
          </h2>
        </div>
      </section>

      <section className="section paper">
        <div className="section-inner cards-grid">
          <div className="info-card">
            <h3>Weekly suppers</h3>
            <p>Curated menus prepared for pickup and built around the rhythm of a Sunday table.</p>
          </div>
          <div className="info-card">
            <h3>Private dining</h3>
            <p>Restaurant-quality cooking shaped around your home, venue, guest count, and occasion.</p>
          </div>
          <div className="info-card">
            <h3>Catered events</h3>
            <p>Southern hospitality, seasonal menus, and thoughtful service for gatherings across Middle Georgia.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
