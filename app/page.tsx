import { OrderingBanner } from "@/app/OrderingBanner";
import { getGalleryImages, getOrderingOverride, getPublishedMenu } from "@/lib/site";
import { displayCutoff, displayDate, getOrderingState, PORTIONS } from "@/lib/ordering";
import { formatMoney } from "@/lib/money";
import { getInstagramPosts } from "@/lib/instagram";
import { submitCateringInquiry } from "@/app/actions";

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

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <nav className="topbar-left">
            <a href="#menu">This Week</a>
            <a href="#how">How It Works</a>
            <a href="#catering">Catering</a>
            <a href="#chef">The Chef</a>
          </nav>
          <a href="#" aria-label="Macon Supper Club">
            <img src="/design-assets/logomark.png" alt="Macon Supper Club" />
          </a>
          <nav className="topbar-right">
            <a href="#pickup">Pickup</a>
            <a href="#gallery">Past Suppers</a>
            <a href="#catering">Inquire</a>
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
              <h1>
                <span className="script">A</span> Sunday
                <br />
                well set.
              </h1>
              <p className="hero-lede">
                A weekly private-chef supper, plated by hand, served the way Macon used to serve
                dinner: slowly, generously, around a table that belongs to you.
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
                  Reserve This Sunday
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
                <div className="sunday">{menu?.title ?? "Sunday Supper"}</div>
                <div className="date">{sundayLabel}</div>
              </div>
              <div className="menu-rule" />
              {(menu?.items ?? []).slice(0, 5).map((item) => (
                <div className="menu-item" key={item.id}>
                  <div className="menu-item-name">{item.name}</div>
                  <div className="menu-item-desc">{item.description}</div>
                </div>
              ))}
              <div className="menu-rule" />
              <div className="date">To reserve · maconsupper.com</div>
            </aside>
          </div>
        </section>

        <section className="section paper blossom-section" id="menu">
          <img className="branch-accent branch-accent-right branch-accent-soft" src="/design-assets/logobranch.png" alt="" />
          <div className="section-inner">
            <div className="section-header">
              <div className="section-eyebrow">This week · {sundayLabel}</div>
              <h2 className="section-title">
                <span className="script">On the</span> table
              </h2>
              <p className="section-sub">
                Five courses, packed for your kitchen but plated to feel like ours.
              </p>
            </div>

            <div className="menu-rows">
              {(menu?.items ?? []).map((item, index) => (
                <div className="menu-row" key={item.id}>
                  <div className="menu-row-num">{String(index + 1).padStart(2, "0")}</div>
                  {item.imageUrl ? (
                    <img className="menu-row-img" src={item.imageUrl} alt={item.name} />
                  ) : (
                    <div className="menu-row-img" aria-hidden="true" />
                  )}
                  <div>
                    <div className="menu-row-title">{item.name}</div>
                    <div className="menu-row-desc">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="philosophy" id="chef">
          <div className="section-inner">
            <h2>
              I spent fifteen years cooking for rooms full of strangers.{" "}
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
                <p>A new menu drops every Monday. Ordering closes automatically at 4:00 PM ET.</p>
              </div>
              <div className="info-card">
                <h3>Cook, plate, pack</h3>
                <p>Chef David shops, preps, and plates each supper by hand on Sunday.</p>
              </div>
              <div className="info-card">
                <h3>Pickup and sit down</h3>
                <p id="pickup">{menu?.pickupNotes ?? "Pickup Sunday, 5-6pm ET."}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section paper blossom-section" id="catering">
          <img className="branch-accent branch-accent-right" src="/design-assets/logobranch.png" alt="" />
          <div className="section-inner">
            <div className="catering-wrap">
              <div>
                <div className="section-eyebrow">Private events</div>
                <h2 className="section-title">
                  Catering by <span className="script">Chef David</span>
                </h2>
                <p className="section-sub">
                  Supper club sensibility for birthdays, rehearsal dinners, office gatherings, and
                  special tables across Macon. Send the basics and we will shape the menu around the
                  room, the season, and your budget.
                </p>
                <div className="catering-notes">
                  <div>
                    <span>01</span>
                    Menus can be plated, family-style, or pickup-ready.
                  </div>
                  <div>
                    <span>02</span>
                    We quote around guest count, service style, and ingredient needs.
                  </div>
                  <div>
                    <span>03</span>
                    Earlier inquiries give us the best shot at holding the date.
                  </div>
                </div>
              </div>

              <form className="checkout-panel stack catering-form" action={submitCateringInquiry}>
                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="cateringName">Full name</label>
                    <input id="cateringName" name="customerName" placeholder="Full name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="cateringEmail">Email</label>
                    <input id="cateringEmail" name="email" type="email" placeholder="you@example.com" required />
                  </div>
                  <div className="field">
                    <label htmlFor="cateringPhone">Phone</label>
                    <input id="cateringPhone" name="phone" placeholder="(478) 555-0123" required />
                  </div>
                  <div className="field">
                    <label htmlFor="eventDate">Event date</label>
                    <input id="eventDate" name="eventDate" type="date" />
                  </div>
                  <div className="field">
                    <label htmlFor="eventTime">Event time</label>
                    <input id="eventTime" name="eventTime" placeholder="6 PM" />
                  </div>
                  <div className="field">
                    <label htmlFor="guestCount">Number of people</label>
                    <input id="guestCount" name="guestCount" type="number" min="1" placeholder="24" />
                  </div>
                  <div className="field">
                    <label htmlFor="eventType">Event type</label>
                    <select id="eventType" name="eventType" defaultValue="">
                      <option value="" disabled>
                        Select one
                      </option>
                      <option>Private dinner</option>
                      <option>Birthday</option>
                      <option>Rehearsal dinner</option>
                      <option>Corporate meal</option>
                      <option>Pickup catering</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="budget">Budget</label>
                    <input id="budget" name="budget" placeholder="$75 pp / $2,500" />
                  </div>
                  <div className="field full">
                    <label htmlFor="location">Event address or venue</label>
                    <input id="location" name="location" placeholder="Venue, address, or TBD" />
                  </div>
                  <div className="field full">
                    <label htmlFor="cateringNotes">Tell us about the table</label>
                    <textarea
                      id="cateringNotes"
                      name="notes"
                      placeholder="Occasion, style of service, allergies, menu ideas, kitchen access, timing, and anything else we should know."
                    />
                  </div>
                </div>
                <button className="btn-primary" type="submit">
                  Send catering inquiry
                </button>
              </form>
            </div>
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
