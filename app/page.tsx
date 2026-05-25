import { OrderingBanner } from "@/app/OrderingBanner";
import { getGalleryImages, getOrderingOverride, getPublishedMenu } from "@/lib/site";
import { displayCutoff, displayDate, getOrderingState, PORTIONS } from "@/lib/ordering";
import { formatMoney } from "@/lib/money";
import { getInstagramPosts } from "@/lib/instagram";
import { subscribeToMenuEmails } from "@/app/actions";

export const dynamic = "force-dynamic";

const INSTAGRAM_URL = "https://www.instagram.com/maconsupperclub/";

export default async function HomePage() {
  const menu = await getPublishedMenu();
  const gallery = await getGalleryImages();
  const instagram = await getInstagramPosts();
  const orderingOverride = await getOrderingOverride();
  const ordering = getOrderingState(menu);
  const sundayLabel = menu ? displayDate(menu.sundayDate) : "Next Sunday";
  const cutoffLabel = menu ? displayCutoff(menu.cutoffAt) : "Saturday at 4:00 PM ET";
  const paymentsReady = Boolean(process.env.STRIPE_SECRET_KEY);
  const menuItems = menu?.items ?? [];

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <nav className="topbar-left">
            <a href="#menu">This Week</a>
            <a href="#how">How It Works</a>
            <a href="/catering">Catering</a>
            <a href="#chef">The Chef</a>
            <a href="/about">About</a>
          </nav>
          <a href="#" aria-label="Macon Supper Club">
            <img src="/design-assets/logomark.png" alt="Macon Supper Club" />
          </a>
          <nav className="topbar-right">
            <a href="#pickup">Pickup</a>
            <a href="#gallery">Past Suppers</a>
            <a href="/catering">Inquire</a>
            <a className="reserve-pill" href="#reserve">
              Reserve
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero blossom-section">
          <img className="branch-accent branch-accent-left" src="/design-assets/logobranch.png" alt="" />
          <img className="branch-accent branch-accent-right" src="/design-assets/logobranch.png" alt="" />
          <div className="hero-inner">
            <div>
              <div className="eyebrow">Chef David Bartlett · Macon, Georgia</div>
              <h1 className="hero-title">
                Chef-driven dining
                <br />
                experiences, made for <span className="script">gathering.</span>
              </h1>
              <p className="hero-lede">
                Weekly suppers, private dining, and catered events rooted in Southern hospitality
                and restaurant-quality cooking.
              </p>
              <OrderingBanner
                sundayLabel={sundayLabel}
                cutoffLabel={cutoffLabel}
                cutoffIso={menu?.cutoffAt.toISOString()}
                open={ordering.open && !orderingOverride.closed}
                reason={ordering.reason}
                overrideClosed={orderingOverride.closed}
                overrideMessage={orderingOverride.message}
              />
              <div className="hero-cta-row">
                <a className="btn-primary" href="#reserve">
                  Reserve This Supper
                </a>
                <a className="btn-ghost" href="#menu">
                  See the menu
                </a>
              </div>
              <div className="hero-meta">
                <div className="meta-cell">
                  <div className="meta-label">Closes</div>
                  <div className="meta-value">Saturday 4:00 PM ET</div>
                </div>
                <div className="meta-cell">
                  <div className="meta-label">Pickup</div>
                  <div className="meta-value">Sunday 5-6 PM</div>
                </div>
                <div className="meta-cell">
                  <div className="meta-label">Where</div>
                  <div className="meta-value">Grey Goose Players Club</div>
                </div>
              </div>
            </div>

            <aside className="menu-card">
              <div className="menu-card-head">
                <img src="/design-assets/logomark.png" alt="Macon Supper Club" />
                <div className="sunday">{menu?.title ?? "New menu coming"}</div>
                <div className="date">{menu ? sundayLabel : "Tuesday morning"}</div>
              </div>
              <div className="menu-rule" />
              {menuItems.length > 0 ? (
                menuItems.slice(0, 5).map((item) => (
                  <div className="menu-item" key={item.id}>
                    <div className="menu-item-name">{item.name}</div>
                    <div className="menu-item-desc">{item.description}</div>
                  </div>
                ))
              ) : (
                <div className="menu-item">
                  <div className="menu-item-name">Menus drop Tuesday mornings</div>
                  <div className="menu-item-desc">
                    Join the list below and we will send the next supper straight to your inbox.
                  </div>
                </div>
              )}
              <div className="menu-rule" />
              <div className="date">To reserve · maconsupper.com</div>
            </aside>
          </div>
        </section>

        <section className="section paper blossom-section" id="menu">
          <img className="branch-accent branch-accent-right branch-accent-soft" src="/design-assets/logobranch.png" alt="" />
          <div className="section-inner">
            <div className="section-header">
              <div className="section-eyebrow">{menu ? `This week · ${sundayLabel}` : "New menu coming Tuesday"}</div>
              <h2 className="section-title">
                <span className="script">On the</span> table
              </h2>
              <p className="section-sub">
                {menu
                  ? "Five courses, packed for your kitchen but plated to feel like ours."
                  : "Last week's menu comes down Sunday morning. The next supper drops Tuesday morning."}
              </p>
            </div>

            {menuItems.length > 0 ? (
              <div className="menu-rows">
                {menuItems.map((item, index) => (
                  <div className={`menu-row ${item.imageUrl ? "" : "without-image"}`} key={item.id}>
                    <div className="menu-row-num">{String(index + 1).padStart(2, "0")}</div>
                    {item.imageUrl && <img className="menu-row-img" src={item.imageUrl} alt={item.name} />}
                    <div>
                      <div className="menu-row-title">{item.name}</div>
                      <div className="menu-row-desc">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="notice centered-notice">
                New supper menu coming Tuesday morning. Join the email list to get it first.
              </div>
            )}
          </div>
        </section>

        <section className="section paper" id="reserve">
          <div className="section-inner">
            <div className="section-header">
              <div className="section-eyebrow">Reserve a seat</div>
              <h2 className="section-title">
                Pick your <span className="script">portion</span>
              </h2>
              <p className="section-sub">
                {paymentsReady
                  ? "Full prepayment confirms your Sunday supper. Card checkout is handled securely by Stripe."
                  : "Send a reservation request for now. Online card payment will be turned on once Stripe is connected."}
              </p>
            </div>

            {!ordering.open && <div className="notice">{ordering.reason}</div>}

            <form className="checkout-panel stack" action="/api/checkout" method="post">
              <input type="hidden" name="menuId" value={menu?.id ?? ""} />
              <div className="portion-grid">
                {PORTIONS.map((portion, index) => (
                  <label className={`portion-card ${index === 1 ? "featured" : ""}`} key={portion.id}>
                    <input
                      type="radio"
                      name="portionId"
                      value={portion.id}
                      defaultChecked={index === 1}
                      disabled={!ordering.open}
                    />
                    <h3>{portion.name}</h3>
                    <p>{portion.description}</p>
                    <div className="price">{formatMoney(portion.priceCents)}</div>
                  </label>
                ))}
              </div>

              <div className="form-grid">
                <div className="field">
                  <label htmlFor="quantity">Quantity</label>
                  <input id="quantity" name="quantity" type="number" min="1" max="10" defaultValue="1" disabled={!ordering.open} />
                </div>
                <div className="field">
                  <label htmlFor="tip">Optional chef tip</label>
                  <div className="money-field">
                    <span>$</span>
                    <input id="tip" name="tipDollars" type="number" min="0" step="1" placeholder="0" disabled={!ordering.open} />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="customerName">Full name</label>
                  <input id="customerName" name="customerName" placeholder="Full name" required disabled={!ordering.open} />
                </div>
                <div className="field">
                  <label htmlFor="customerEmail">Email</label>
                  <input id="customerEmail" name="customerEmail" type="email" placeholder="you@example.com" required disabled={!ordering.open} />
                </div>
                <div className="field">
                  <label htmlFor="customerPhone">Phone</label>
                  <input id="customerPhone" name="customerPhone" placeholder="(478) 555-0123" required disabled={!ordering.open} />
                </div>
                <div className="field">
                  <label htmlFor="allergens">Allergies</label>
                  <input id="allergens" name="allergens" placeholder="Dairy, nuts, shellfish..." disabled={!ordering.open} />
                </div>
                <div className="field full">
                  <label htmlFor="notes">Anything else the chef should know?</label>
                  <textarea id="notes" name="notes" disabled={!ordering.open} />
                </div>
              </div>
              <button className="btn-primary" type="submit" disabled={!ordering.open}>
                {paymentsReady ? "Continue to secure checkout" : "Send reservation request"}
              </button>
            </form>
          </div>
        </section>

        <section className="philosophy" id="chef">
          <div className="section-inner">
            <h2>
              I spent twenty years cooking for rooms full of strangers.{" "}
              <span className="script">Now</span> I cook one Sunday supper a week for your table.
            </h2>
            <p className="section-sub" style={{ color: "rgba(255,250,240,.78)" }}>
              Chef David Bartlett · Founder, Macon Supper Club
            </p>
          </div>
        </section>

        <section className="section blossom-section" id="how">
          <img className="branch-accent branch-accent-left branch-accent-soft" src="/design-assets/logobranch.png" alt="" />
          <div className="section-inner">
            <div className="section-header">
              <div className="section-eyebrow">How it works</div>
              <h2 className="section-title">
                Three quiet <span className="script">steps</span>
              </h2>
            </div>
            <div className="cards-grid">
              <div className="info-card">
                <h3>Reserve by Saturday</h3>
                <p>A new menu drops every Tuesday morning. Ordering closes automatically Saturday at 4:00 PM ET.</p>
              </div>
              <div className="info-card">
                <h3>Cook, plate, pack</h3>
                <p>Chef David shops, preps, and plates each supper by hand on Sunday.</p>
              </div>
              <div className="info-card">
                <h3>Pickup and sit down</h3>
                <p id="pickup">{menu?.pickupNotes ?? "Pickup Sunday, 5-6 PM ET."}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section signup-section paper blossom-section" id="signup">
          <img className="branch-accent branch-accent-right branch-accent-soft" src="/design-assets/logobranch.png" alt="" />
          <div className="section-inner signup-inner">
            <div>
              <div className="section-eyebrow">Tuesday mornings</div>
              <h2 className="section-title">
                Get the <span className="script">menu</span> first.
              </h2>
              <p className="section-sub">
                Weekly supper menus, special offers, private dining notes, and upcoming events sent
                straight to your inbox.
              </p>
            </div>
            <form className="signup-form" action={subscribeToMenuEmails}>
              <div className="field">
                <label htmlFor="signupFirstName">First name</label>
                <input id="signupFirstName" name="firstName" placeholder="First name" />
              </div>
              <div className="field">
                <label htmlFor="signupEmail">Email</label>
                <input id="signupEmail" name="email" type="email" placeholder="you@example.com" required />
              </div>
              <button className="btn-primary" type="submit">
                Send the weekly menu
              </button>
            </form>
          </div>
        </section>

        <section className="landmarks-band" aria-label="Macon landmarks">
          <div className="landmarks-inner">
            <div className="landmarks-copy">
              <div className="section-eyebrow">Made in Macon</div>
              <h2>
                A table with a little <span className="script">city</span> in it.
              </h2>
            </div>
            <div className="landmarks-lineup">
              <MaconLandmarkRibbon />
            </div>
          </div>
        </section>

        <section className="section catering-cta-section">
          <div className="section-inner split-cta">
            <div>
              <div className="section-eyebrow">Private dining and catering</div>
              <h2 className="section-title">
                Bring the supper club to <span className="script">your</span> table.
              </h2>
            </div>
            <div className="split-cta-copy">
              <p className="section-sub">
                Birthdays, rehearsal suppers, office gatherings, pickup catering, and private
                tables across Middle Georgia.
              </p>
              <a className="btn-secondary" href="/catering">
                Plan a private event
              </a>
            </div>
          </div>
        </section>

        <section className="section blossom-section" id="gallery">
          <img className="branch-accent branch-accent-left branch-accent-soft" src="/design-assets/logobranch.png" alt="" />
          <div className="section-inner">
            <div className="section-header">
              <div className="section-eyebrow">Past suppers</div>
              <h2 className="section-title">
                From the <span className="script">kitchen</span>
              </h2>
            </div>
            <div className="gallery-slider" style={{ "--slide-count": gallery.length || 1 } as React.CSSProperties}>
              {gallery.map((image, index) => (
                <figure
                  className="gallery-slide"
                  key={image.id}
                  style={{ "--slide-index": index } as React.CSSProperties}
                >
                  <img src={image.url} alt={image.alt ?? image.label} />
                  <figcaption>{image.label}</figcaption>
                </figure>
              ))}
              <div className="slider-dots" aria-hidden="true">
                {gallery.map((image) => (
                  <span key={image.id} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section paper">
          <div className="section-inner">
            <div className="section-header">
              <div className="section-eyebrow">Instagram</div>
              <h2 className="section-title">@maconsupperclub</h2>
            </div>
            {instagram.length > 0 ? (
              <div className="ig-grid">
                {instagram.map((post) => (
                  <a className="ig-card" href={post.permalink} key={post.id} target="_blank" rel="noreferrer">
                    {post.media_url && <img src={post.media_url} alt={post.caption ?? "Instagram post"} />}
                  </a>
                ))}
              </div>
            ) : (
              <div className="instagram-link-panel">
                <p className="section-sub">
                  Follow along for weekly menus, pickup notes, catering tables, and the little
                  behind-the-scenes moments from the kitchen.
                </p>
                <a className="btn-secondary" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                  Follow @maconsupperclub
                </a>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

function MaconLandmarkRibbon() {
  return (
    <svg className="landmark-ribbon" viewBox="0 0 980 250" role="img" aria-label="Macon landmark line art">
      <g className="ribbon-lines">
        <path d="M20 205 H960" />
        <path d="M20 214 H960" />
      </g>

      <g className="landmark-drawing" transform="translate(42 58)">
        <text x="82" y="148">DOUGLASS</text>
        <text x="82" y="164">THEATRE</text>
        <path d="M18 124 H146 V70 H18 Z" />
        <path d="M26 70 V50 H138 V70" />
        <path d="M36 50 V34 H128 V50" />
        <path d="M50 34 V18 H114 V34" />
        <path d="M38 124 V88 H58 V124 M72 124 V88 H92 V124 M106 124 V88 H126 V124" />
        <path d="M42 62 H122" />
      </g>

      <g className="landmark-drawing" transform="translate(232 40)">
        <text x="74" y="166">MERCER</text>
        <text x="74" y="182">UNIVERSITY</text>
        <path d="M30 142 H118 V54 H30 Z" />
        <path d="M20 142 H128" />
        <path d="M52 54 L74 18 L96 54" />
        <path d="M74 18 V0" />
        <circle cx="74" cy="74" r="13" />
        <path d="M48 142 V104 H100 V142" />
        <path d="M56 104 V142 M74 104 V142 M92 104 V142" />
      </g>

      <g className="landmark-drawing" transform="translate(410 76)">
        <text x="94" y="130">THE BIG HOUSE</text>
        <path d="M22 106 H166 V52 H22 Z" />
        <path d="M10 106 H178" />
        <path d="M22 52 L94 18 L166 52" />
        <path d="M50 106 V70 H76 V106 M112 106 V70 H138 V106" />
        <path d="M82 106 V66 H106 V106" />
        <path d="M48 48 V34 H64 V42 M124 48 V34 H140 V42" />
      </g>

      <g className="landmark-drawing" transform="translate(630 78)">
        <text x="76" y="128">CAPRICORN</text>
        <text x="76" y="144">RECORDS</text>
        <path d="M18 104 H134 V38 H18 Z" />
        <path d="M28 38 V22 H124 V38" />
        <path d="M34 104 V58 H58 V104 M94 104 V58 H118 V104" />
        <path d="M66 104 V70 H86 V104" />
        <path d="M30 50 H122" />
        <circle cx="76" cy="50" r="8" />
      </g>

      <g className="landmark-drawing" transform="translate(810 26)">
        <text x="72" y="180">ST. JOSEPH'S</text>
        <path d="M16 156 H128 V72 H16 Z" />
        <path d="M34 72 L48 32 L62 72 M82 72 L96 32 L110 72" />
        <path d="M48 32 V4 M96 32 V4" />
        <path d="M40 4 H56 M48 -4 V12 M88 4 H104 M96 -4 V12" />
        <circle cx="72" cy="100" r="15" />
        <path d="M72 85 V115 M57 100 H87" />
        <path d="M54 156 V124 Q72 106 90 124 V156" />
      </g>
    </svg>
  );
}
