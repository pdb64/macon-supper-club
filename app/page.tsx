import { getGalleryImages, getPublishedMenu } from "@/lib/site";
import { displayCutoff, displayDate, getOrderingState, PORTIONS } from "@/lib/ordering";
import { formatMoney } from "@/lib/money";
import { getInstagramPosts } from "@/lib/instagram";
import { submitCateringInquiry } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const menu = await getPublishedMenu();
  const gallery = await getGalleryImages();
  const instagram = await getInstagramPosts();
  const ordering = getOrderingState(menu);
  const sundayLabel = menu ? displayDate(menu.sundayDate) : "Next Sunday";
  const cutoffLabel = menu ? displayCutoff(menu.cutoffAt) : "Saturday at 4:00 PM ET";

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
              <div className="saturday-banner">
                <span className="sb-dot" />
                <span>
                  Reservations for <strong>{sundayLabel}</strong> close <strong>{cutoffLabel}</strong>,
                  or whenever we sell out.
                </span>
              </div>
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
                    <input id="cateringName" name="customerName" placeholder="Patrick Bartlett" required />
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
                    <input id="eventTime" name="eventTime" placeholder="6 PM cocktails, 7 PM dinner" />
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
                    <input id="budget" name="budget" placeholder="$75/person or $2,500 total" />
                  </div>
                  <div className="field full">
                    <label htmlFor="location">Event address or venue</label>
                    <input id="location" name="location" placeholder="Home address, venue name, or still deciding" />
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
                Full prepayment confirms your Sunday supper. Card checkout is handled securely by
                Stripe.
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
                  <input id="customerName" name="customerName" placeholder="Patrick Bartlett" required disabled={!ordering.open} />
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
                Continue to secure checkout
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
              <div className="landmark">
                <span className="landmark-shape theater" />
                <strong>Douglass Theatre</strong>
              </div>
              <div className="landmark">
                <span className="landmark-shape mercer" />
                <strong>Mercer University</strong>
              </div>
              <div className="landmark">
                <span className="landmark-shape big-house" />
                <strong>The Big House</strong>
              </div>
              <div className="landmark">
                <span className="landmark-shape capricorn" />
                <strong>Capricorn Records</strong>
              </div>
              <div className="landmark">
                <span className="landmark-shape church" />
                <strong>St. Joseph's</strong>
              </div>
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
                  <a className="ig-card" href={post.permalink} key={post.id}>
                    {post.media_url && <img src={post.media_url} alt={post.caption ?? "Instagram post"} />}
                  </a>
                ))}
              </div>
            ) : (
              <p className="section-sub" style={{ textAlign: "center" }}>
                Add an Instagram access token when you are ready; until then this section can be
                managed with uploaded gallery images.
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
