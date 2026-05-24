/* Macon Supper Club — main app */

const { useState: useStateApp, useEffect: useEffectApp } = React;

/* This week's menu — pulled from David's 5/17 email */
const WEEKLY_MENU = [
  { name: "Chicken Schnitzel", desc: "Pounded thin chicken cutlet, herb-breaded and fried crisp, finished with classic mushroom chasseur sauce & fresh lemon wedges." },
  { name: "Baked Cheddar–Swiss Spaetzle Gratin", desc: "German spaetzle baked with sharp yellow cheddar, Swiss, Dijon & buttered breadcrumbs." },
  { name: "Petite Mixed Greens", desc: "Cherry tomatoes, clementines, cucumber, breakfast radish, shallots, shaved parmesan, brown butter almonds & citrus vinaigrette." },
  { name: "Olive Focaccia", desc: "Warm olive focaccia from our friends at Bakery2Go with whipped fennel butter." },
  { name: "Black Forest Bread Pudding", desc: "Dark chocolate & tart cherry bread pudding with vanilla chantilly and warm cherry wine sauce." },
];

const SUNDAY_LABEL = "Sunday, May 17";
const SUNDAY_LONG = "May 17 • Reservations close Saturday 4 pm";

const PROVENANCE = [
  { name: "The Ritz-Carlton", years: "2010 – 2017", role: "Chef de Cuisine", loc: "Atlanta" },
  { name: "InterContinental", years: "2017 – 2019", role: "Executive Sous Chef", loc: "Buckhead, ATL" },
  { name: "The Post Oak Hotel", years: "2019 – 2020", role: "Executive Sous Chef", loc: "Houston" },
  { name: "Corso", years: "2021 – 2025", role: "Executive Chef / Culinary Director", loc: "Atlanta" },
];

function App() {
  const [modalOpen, setModalOpen] = useStateApp(false);
  const [initialPortion, setInitialPortion] = useStateApp("two");

  const openReserve = (portion = "two") => {
    setInitialPortion(portion);
    setModalOpen(true);
  };

  return (
    <>
      {/* ============== TOPBAR ============== */}
      <header className="topbar">
        <div className="topbar-inner">
          <nav className="topbar-left">
            <a href="#menu">This Week</a>
            <a href="#how">How It Works</a>
            <a href="#chef">The Chef</a>
            <a href="#sunday-list">The List</a>
          </nav>
          <TopbarLogo />
          <nav className="topbar-right">
            <a href="#pickup">Pickup</a>
            <a href="#gallery">Past Suppers</a>
            <button className="reserve-pill" onClick={() => openReserve("two")}>Reserve</button>
          </nav>
        </div>
      </header>

      {/* ============== HERO ============== */}
      <section className="hero">
        <CherryBranch width={260} style={{ position: "absolute", top: 30, left: -40, opacity: 0.55, transform: "rotate(-12deg)" }} />
        <CherryBranch width={220} flip style={{ position: "absolute", bottom: -50, right: "6%", opacity: 0.3, transform: "scaleX(-1) rotate(160deg)" }} />
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-eyebrow">CHEF DAVID BARTLETT · MACON, GEORGIA</div>
            <h1>
              <span className="script">A</span>Sunday<br />
              well&nbsp;set.
            </h1>
            <p className="hero-lede">
              A weekly <em>private-chef supper</em>, plated by hand, served the way Macon used to serve dinner — slowly, generously, around a table that belongs to you.
            </p>
            <div className="saturday-banner">
              <span className="sb-dot"></span>
              <span className="sb-text">
                Reservations for <strong>Sunday, May 17</strong> close <strong>Saturday at 4:00 pm sharp</strong> — or whenever we sell out.
              </span>
            </div>
            <div className="hero-cta-row">
              <button className="btn-primary" onClick={() => openReserve("two")}>Reserve This Sunday</button>
              <a href="#menu" className="btn-ghost" style={{ textDecoration: "none", display: "inline-block" }}>See the menu</a>
            </div>
            <div className="hero-meta">
              <div className="meta-cell">
                <div className="meta-label">Closes</div>
                <div className="meta-value">Saturday<br />4:00 pm</div>
              </div>
              <div className="meta-cell">
                <div className="meta-label">Pickup</div>
                <div className="meta-value">Sunday<br />5–6 pm</div>
              </div>
              <div className="meta-cell">
                <div className="meta-label">Where</div>
                <div className="meta-value">Grey Goose<br />Players Club</div>
              </div>
            </div>
          </div>

          <div className="menu-card-wrap">
            <div className="menu-card">
              <CherryBranch width={150} style={{ position: "absolute", top: -34, right: -28 }} />
              <CherryBranch width={120} flip style={{ position: "absolute", bottom: -38, left: -32, transform: "scaleX(-1) rotate(15deg)" }} />
              <div className="menu-card-head">
                <img src={window.__resources.logoMark} alt="Macon Supper Club" style={{ width: 220, height: "auto", display: "block", margin: "0 auto 4px" }} />
                <div className="sunday">Sunday Supper</div>
                <div className="date">SUNDAY · MAY 17</div>
              </div>
              <div className="menu-rule"></div>
              {WEEKLY_MENU.slice(0, 4).map((m, i) => (
                <div key={i} className="menu-item">
                  <div className="menu-item-name">{m.name}</div>
                  <div className="menu-item-desc">{m.desc}</div>
                </div>
              ))}
              <div className="menu-rule"></div>
              <div style={{
                fontFamily: "var(--font-display)",
                textAlign: "center",
                fontSize: 10,
                letterSpacing: "0.32em",
                color: "var(--moss)",
                marginTop: 8,
              }}>
                TO RESERVE · MACONSUPPER.COM
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== PROVENANCE STRIP ============== */}
      <section className="provenance">
        <div className="provenance-inner">
          <div className="provenance-label">
            <span className="script">Formerly of</span>
            FIFTEEN YEARS<br />IN LUXURY KITCHENS
          </div>
          <div className="provenance-list">
            {PROVENANCE.map((p, i) => (
              <div key={i} className="prov-card">
                <div className="prov-meta">{p.years}</div>
                <div className="prov-name">{p.name}</div>
                <div className="prov-role">{p.role} · {p.loc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== BRANDED MOMENTS CAROUSEL ============== */}
      <section className="section paper" id="moments" style={{ paddingTop: 90, paddingBottom: 90 }}>
        <div className="section-inner">
          <div className="section-header" style={{ marginBottom: 24 }}>
            <div className="section-eyebrow">A FEW MOMENTS</div>
            <h2 className="section-title">Macon, <span className="script">in&nbsp;passing</span></h2>
            <p className="section-sub">
              The city, the table, and the Saturdays that bring us here.
            </p>
          </div>
        </div>
        <BrandedCarousel />
      </section>

      {/* ============== THIS WEEK'S MENU (FULL) ============== */}
      <section className="section paper" id="menu">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-eyebrow">THIS WEEK · {SUNDAY_LABEL}</div>
            <h2 className="section-title"><span className="script">On the</span> table</h2>
            <p className="section-sub">
              Five courses, packed for your kitchen but plated to feel like ours. Reheats in fifteen minutes; tastes like it took us five.
            </p>
          </div>

          <div className="menu-rows">
            {WEEKLY_MENU.map((m, i) => (
              <div key={i} className="menu-row">
                <div className="menu-row-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="menu-row-img">
                  <image-slot
                    id={`menu-${i}`}
                    shape="rect"
                    placeholder={`Drop a photo of\n${m.name}`}
                  ></image-slot>
                </div>
                <div className="menu-row-text">
                  <div className="menu-row-title">{m.name}</div>
                  <div className="menu-row-desc">{m.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 64 }}>
            <div className="deadline-row">
              <div className="deadline-stamp">
                <div className="ds-label">CLOSES THIS SATURDAY</div>
                <div className="ds-time">4 : 00 <span className="ds-pm">PM</span></div>
                <div className="ds-note">Or sooner, if we sell out</div>
              </div>
              <button className="btn-primary" onClick={() => openReserve("two")}>Reserve this menu</button>
            </div>
          </div>
        </div>
      </section>

      {/* ============== PHILOSOPHY ============== */}
      <section className="philosophy">
        <div className="philosophy-inner">
          <div className="philosophy-quote-mark">"</div>
          <div className="philosophy-pull">
            I spent fifteen years cooking for <em>rooms full of strangers</em>. <span className="script">Now</span> I cook one Sunday supper a week — for <em>your</em> table.
          </div>
          <div className="philosophy-attribution">
            <div className="name">CHEF DAVID BARTLETT</div>
            <div className="title">FOUNDER · MACON SUPPER CLUB</div>
          </div>
        </div>
      </section>

      {/* ============== HOW IT WORKS ============== */}
      <section className="section" id="how">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-eyebrow">HOW IT WORKS</div>
            <h2 className="section-title">Three quiet <span className="script">steps</span></h2>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-numeral">I.</div>
              <div className="step-title"><span className="script">Reserve</span> by Saturday</div>
              <p className="step-body">A new menu drops every Monday. Reservations close Saturday at 4 pm or whenever we sell out — usually whichever comes first.</p>
            </div>
            <div className="step">
              <div className="step-numeral">II.</div>
              <div className="step-title"><span className="script">Cook</span>, plate, pack</div>
              <p className="step-body">Sunday morning Chef David shops, preps and plates each supper by hand. Everything is portioned for your table and packed warm.</p>
            </div>
            <div className="step">
              <div className="step-numeral">III.</div>
              <div className="step-title"><span className="script">Pickup</span> & sit down</div>
              <p className="step-body">Swing by Grey Goose Players Club between 5 and 6 pm. We text you when it's ready. Fifteen minutes in your oven and you're at the table.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============== PRICING ============== */}
      <section className="section paper" id="pricing">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-eyebrow">RESERVE A SEAT</div>
            <h2 className="section-title">Pick your <span className="script">portion</span></h2>
            <p className="section-sub">
              Same five courses, sized for you. Reservations are confirmed at checkout; full refund through Saturday 4 pm.
            </p>
          </div>
          <div className="pricing">
            <PriceCard
              name="The Solo"
              script="for one"
              fig={40}
              feats={[
                "Full five-course supper",
                "Plated single portion",
                "Reheats in ~15 minutes",
                "Pickup Sunday 5–6 pm",
              ]}
              onReserve={() => openReserve("one")}
            />
            <PriceCard
              featured
              name="Dinner for Two"
              script="for two"
              fig={75}
              feats={[
                "Five courses for two",
                "Most reserved option",
                "Pairs with one wine bottle",
                "Pickup Sunday 5–6 pm",
                "Save $5 vs two Solos",
              ]}
              onReserve={() => openReserve("two")}
            />
            <PriceCard
              name="Family Supper"
              script="for four"
              fig={140}
              feats={[
                "Five courses for four",
                "Family-style platters",
                "Leftovers for Monday lunch",
                "Pickup Sunday 5–6 pm",
              ]}
              onReserve={() => openReserve("four")}
            />
          </div>
        </div>
      </section>

      {/* ============== CHEF ============== */}
      <section className="section dark" id="chef">
        <div className="section-inner">
          <div className="chef-grid">
            <div className="chef-portrait">
              <img src={window.__resources.chefDavid} alt="Chef David Bartlett, photographed in the InterContinental Buckhead kitchen" />
              <div className="chef-portrait-caption">
                CHEF · MACON, GA
                <span className="name">David Bartlett</span>
              </div>
            </div>
            <div className="chef-body">
              <div className="section-eyebrow" style={{ justifyContent: "flex-start", marginBottom: 12 }}>THE CHEF</div>
              <h2>Fifteen years in <span className="script">someone else's</span> dining rooms.</h2>
              <div className="jw-badge">
                <div className="jw-seal">J&amp;W</div>
                <div className="jw-text">
                  Johnson &amp; Wales University · Class of 2010
                  <span className="sub">The nation's foremost culinary college</span>
                </div>
              </div>
              <p>
                I trained at Johnson &amp; Wales — long considered the premier culinary school in the country — and spent the next decade and a half in some of the most demanding kitchens in the South. The Ritz-Carlton. InterContinental Buckhead. The Post Oak in Houston. Corso in Atlanta, where I ran the kitchen for four years.
              </p>
              <p>
                Macon Supper Club is the inverse of all that. Same hands, same standards, but for one Sunday table at a time — yours. I cook the menu I'd cook for my own family that night, then I bring it to you warm.
              </p>
              <div className="chef-creds">
                <div className="cred"><div className="cred-num">15+</div><div className="cred-label">Years in fine dining</div></div>
                <div className="cred"><div className="cred-num">4</div><div className="cred-label">Luxury kitchens</div></div>
                <div className="cred"><div className="cred-num">1</div><div className="cred-label">Supper a week</div></div>
              </div>

              <div className="experience">
                <div className="experience-head">
                  <div className="lbl">A short résumé</div>
                  <div className="yrs">2010 — Present</div>
                </div>
                <div className="experience-row">
                  <div className="exp-years">2020 — Present</div>
                  <div className="exp-place">Macon Supper Club</div>
                  <div className="exp-role">Owner &amp; Chef</div>
                  <div className="exp-loc">Macon, GA</div>
                </div>
                <div className="experience-row">
                  <div className="exp-years">2021 — 2025</div>
                  <div className="exp-place">Corso</div>
                  <div className="exp-role">Executive Chef · Culinary Director</div>
                  <div className="exp-loc">Atlanta, GA</div>
                </div>
                <div className="experience-row">
                  <div className="exp-years">2019 — 2020</div>
                  <div className="exp-place">The Post Oak Hotel</div>
                  <div className="exp-role">Executive Sous Chef</div>
                  <div className="exp-loc">Houston, TX</div>
                </div>
                <div className="experience-row">
                  <div className="exp-years">2017 — 2019</div>
                  <div className="exp-place">InterContinental Buckhead</div>
                  <div className="exp-role">Executive Sous Chef</div>
                  <div className="exp-loc">Atlanta, GA</div>
                </div>
                <div className="experience-row">
                  <div className="exp-years">2010 — 2017</div>
                  <div className="exp-place">The Ritz-Carlton</div>
                  <div className="exp-role">Chef de Cuisine</div>
                  <div className="exp-loc">7+ years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== INSTAGRAM FEED ============== */}
      <section className="section paper" id="gallery">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-eyebrow">FROM RECENT SUPPERS</div>
            <h2 className="section-title">A <span className="script">small</span> archive</h2>
            <p className="section-sub">
              Every Sunday's table, every menu, every plate. Follow along — we post the week's menu Monday morning.
            </p>
          </div>

          <div className="ig-header">
            <div className="ig-handle">
              <div className="ig-avatar">M</div>
              <div className="ig-handle-text">
                <div className="h">@maconsupperclub</div>
                <div className="s">Instagram · Chef David Bartlett</div>
              </div>
            </div>
            <a className="ig-follow" href="https://www.instagram.com/maconsupperclub/" target="_blank" rel="noopener">Follow on Instagram</a>
          </div>

          <div className="ig-grid">
            <InstaPost href="https://www.instagram.com/maconsupperclub/" caption="Chicken Schnitzel · Cherry Bread Pudding" date="May 17, 2026" glyph="✻" />
            <InstaPost href="https://www.instagram.com/maconsupperclub/" caption="Spring Lamb · Mint Gremolata" date="Apr 14, 2026" glyph="❀" />
            <InstaPost href="https://www.instagram.com/maconsupperclub/" caption="Sunday morning prep" date="Apr 7, 2026" glyph="✦" />
            <InstaPost href="https://www.instagram.com/maconsupperclub/" caption="Three-Cheese Lasagna" date="Mar 26, 2026" glyph="✻" />
            <InstaPost href="https://www.instagram.com/maconsupperclub/" caption="Plating Sunday supper" date="Mar 19, 2026" glyph="❋" />
            <InstaPost href="https://www.instagram.com/maconsupperclub/" caption="Olive focaccia · Bakery2Go" date="Mar 12, 2026" glyph="✿" />
            <InstaPost href="https://www.instagram.com/maconsupperclub/" caption="Black Forest Bread Pudding" date="Mar 5, 2026" glyph="✻" />
            <InstaPost href="https://www.instagram.com/maconsupperclub/" caption="Boxes go out · 5pm sharp" date="Feb 26, 2026" glyph="❀" />
            <InstaPost href="https://www.instagram.com/maconsupperclub/" caption="The kitchen at the Goose" date="Feb 19, 2026" glyph="✦" />
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <a className="btn-ghost" href="https://www.instagram.com/maconsupperclub/" target="_blank" rel="noopener" style={{ textDecoration: "none", display: "inline-block" }}>
              View all on Instagram →
            </a>
          </div>
        </div>
      </section>

      {/* ============== PICKUP ============== */}
      <section className="section" id="pickup">
        <div className="section-inner">
          <div className="pickup-grid">
            <div className="pickup-info">
              <div className="section-eyebrow" style={{ justifyContent: "flex-start" }}>PICKUP</div>
              <h3>Sunday evenings at <span className="script">Grey Goose</span></h3>
              <p style={{ color: "var(--ink-soft)", fontSize: 18, lineHeight: 1.5 }}>
                Roll in any time between five and six. Come to the side entrance — we'll be there.
              </p>
              <ul className="pickup-detail-list">
                <li>
                  <div className="pickup-label">Address</div>
                  <div className="pickup-value">Grey Goose Players Club<br />4524 Forsyth Rd, Suite 310<br />Macon, GA 31210</div>
                </li>
                <li>
                  <div className="pickup-label">Window</div>
                  <div className="pickup-value">Sunday · 5:00 – 6:00 pm</div>
                </li>
                <li>
                  <div className="pickup-label">Running late?</div>
                  <div className="pickup-value">Text us at (478) 808-8487</div>
                </li>
                <li>
                  <div className="pickup-label">Look for</div>
                  <div className="pickup-value">The side entrance — we'll be there with your supper warm.</div>
                </li>
              </ul>
            </div>
            <div className="pickup-map">
              <PickupMap />
            </div>
          </div>
        </div>
      </section>

      {/* ============== MADE IN MACON ============== */}
      <section className="section macon" id="city">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-eyebrow">MADE IN MACON</div>
            <h2 className="section-title">Cooked here. <span className="script">Carried</span> here. Sat down here.</h2>
            <p className="section-sub">
              350,000 cherry trees, a downtown that built itself in 1840 and never let it go, and a Sunday-supper tradition older than any of us. We're glad to be a small part of it.
            </p>
          </div>
        </div>
        <div className="skyline-wrap">
          <MaconSkyline height={260} />
        </div>
        <div className="section-inner">
          <div className="macon-quotes">
            <div className="macon-quote">
              <div className="mq-num">350K</div>
              <div className="mq-label">Yoshino cherry trees in bloom every March</div>
            </div>
            <div className="macon-quote">
              <div className="mq-num">1823</div>
              <div className="mq-label">Founded on the Ocmulgee River bluffs</div>
            </div>
            <div className="macon-quote">
              <div className="mq-num">1859</div>
              <div className="mq-label">Hay House — the "Palace of the South"</div>
            </div>
            <div className="macon-quote">
              <div className="mq-num">1</div>
              <div className="mq-label">Cherry Blossom Festival capital of the world</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== SUNDAY LIST ============== */}
      <section className="section dark" id="sunday-list">
        <div className="section-inner">
          <div className="members">
            <div className="section-eyebrow">STAY CLOSE TO THE TABLE</div>
            <h2 className="section-title" style={{ color: "var(--cream)" }}>
              The <span className="script" style={{ color: "var(--gold-soft)" }}>Sunday</span> List
            </h2>
            <p style={{ color: "rgba(246,241,230,0.85)", fontSize: 20, lineHeight: 1.5 }}>
              Every Monday morning we send the week's menu by email — a single, quiet note so you'll never miss a Saturday 4 pm cutoff. No fees, no exclusivity. Anyone can order; this just makes sure you know what's on.
            </p>
            <form className="member-form" onSubmit={(e) => { e.preventDefault(); alert("You're on the list — see you Monday."); }}>
              <input type="email" placeholder="Your email" required />
              <button type="submit">Get the Monday Menu</button>
            </form>
            <div className="member-perks">
              <div className="perk">
                <div className="perk-num">I.</div>
                <div className="perk-title">Monday menu</div>
                <div className="perk-body">The full week's menu hits your inbox the moment David finishes plating it on paper.</div>
              </div>
              <div className="perk">
                <div className="perk-num">II.</div>
                <div className="perk-title">Saturday reminder</div>
                <div className="perk-body">A friendly nudge Friday afternoon so the 4 pm cutoff never sneaks up on you.</div>
              </div>
              <div className="perk">
                <div className="perk-num">III.</div>
                <div className="perk-title">Sell-out alerts</div>
                <div className="perk-body">We text the list first when a Sunday is filling up — most weeks, it does.</div>
              </div>
              <div className="perk">
                <div className="perk-num">IV.</div>
                <div className="perk-title">Private dinners</div>
                <div className="perk-body">Occasional invitations to small, off-Sunday dinners around town. No obligation.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== FOOTER ============== */}
      <footer>
        <div className="footer-inner">
          <div className="footer-brand">
            <img src={window.__resources.logoMarkCream} alt="Macon Supper Club" style={{ width: 200, height: "auto", display: "block", marginBottom: 8 }} />
            <p>A weekly private-chef supper, plated by hand and served the way Macon used to serve dinner. Chef David Bartlett · Johnson &amp; Wales '10 · formerly Ritz-Carlton, Corso.</p>
          </div>
          <div className="footer-col">
            <h4>Sunday Supper</h4>
            <ul>
              <li><a href="#menu">This Week's Menu</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#how">How It Works</a></li>
              <li><a href="#pickup">Pickup</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Beyond Sunday</h4>
            <ul>
              <li><a href="#sunday-list">The Sunday List</a></li>
              <li><a href="#">Private Events</a></li>
              <li><a href="#">Catering</a></li>
              <li><a href="#">Gift Cards</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <ul>
              <li><a href="#">@maconsupperclub</a></li>
              <li><a href="#">@chefdavidbartlett</a></li>
              <li><a href="mailto:hello@maconsupper.com">hello@maconsupper.com</a></li>
              <li><a href="tel:+14788088487">(478) 808-8487</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 MACON SUPPER CLUB · MACON, GA</div>
          <div>MACONSUPPER.COM</div>
        </div>
      </footer>

      <CheckoutModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        weeklyMenu={WEEKLY_MENU}
        sundayLabel={SUNDAY_LONG}
        initialPortion={initialPortion}
      />
    </>
  );
}

function PriceCard({ name, script, fig, feats, onReserve, featured }) {
  return (
    <div className={`price-card ${featured ? "featured" : ""}`}>
      <div className="price-name">{name}</div>
      <div className="price-script">{script}</div>
      <div className="price-figure"><sup>$</sup>{fig}</div>
      <div className="price-suffix">All inclusive</div>
      <ul className="price-feats">
        {feats.map((f, i) => <li key={i}>{f}</li>)}
      </ul>
      <button className="price-cta" onClick={onReserve}>Reserve</button>
    </div>
  );
}

function InstaPost({ href, caption, date, glyph, img }) {
  return (
    <a className="ig-post" href={href} target="_blank" rel="noopener">
      {img ? <img src={img} alt={caption} /> : (
        <div className="ig-fallback">
          <div className="glyph">{glyph}</div>
          <div className="caption">{caption}</div>
          <div className="date">{date}</div>
        </div>
      )}
      <div className="ig-icon">↗</div>
      <div className="overlay">
        <div className="overlay-text">
          <span className="meta">{date}</span>
          {caption}
        </div>
      </div>
    </a>
  );
}

function Tile({ cls, label }) {
  return (
    <div className={`tile ${cls}`}>
      <span>photo placeholder</span>
      <div className="tile-caption">{label}</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
