import { submitCateringInquiry } from "@/app/actions";

export default function CateringPage() {
  return (
    <main>
      <section className="section paper blossom-section">
        <img className="branch-accent branch-accent-right" src="/design-assets/logobranch.png" alt="" />
        <div className="section-inner">
          <div className="catering-wrap">
            <div>
              <div className="section-eyebrow">Private events</div>
              <h1 className="page-title">
                Catering by <span className="script">Chef David</span>
              </h1>
              <p className="section-sub">
                Supper club sensibility for birthdays, rehearsal suppers, office gatherings, and
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
                    <option>Private supper</option>
                    <option>Birthday</option>
                    <option>Rehearsal supper</option>
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
    </main>
  );
}
