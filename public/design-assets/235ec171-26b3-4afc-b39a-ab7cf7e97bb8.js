/* Macon Supper Club — reservation checkout modal */

const { useState: useStateC, useEffect: useEffectC, useRef: useRefC } = React;

const PORTIONS = [
  { id: "one", name: "Individual Supper", desc: "Plated for one", price: 40 },
  { id: "two", name: "Dinner for Two", desc: "Most reserved — perfect for a Sunday in", price: 75 },
  { id: "four", name: "Family Supper for Four", desc: "A full table — pairs beautifully with leftovers", price: 140 },
];

const ALLERGENS = ["Gluten", "Dairy", "Nuts", "Shellfish", "Egg", "Pork"];

function CheckoutModal({ open, onClose, weeklyMenu, sundayLabel, initialPortion = "two" }) {
  const [step, setStep] = useStateC(1);
  const [portion, setPortion] = useStateC(initialPortion);
  const [qty, setQty] = useStateC(1);
  const [contact, setContact] = useStateC({ name: "", email: "", phone: "", notes: "" });
  const [allergens, setAllergens] = useStateC([]);
  const [card, setCard] = useStateC({ number: "", exp: "", cvc: "", zip: "" });
  const [tipMode, setTipMode] = useStateC("none"); // none | preset | custom
  const [tipAmount, setTipAmount] = useStateC(0);
  const [tipCustom, setTipCustom] = useStateC("");
  const [errors, setErrors] = useStateC({});
  const [processing, setProcessing] = useStateC(false);
  const [confirmId, setConfirmId] = useStateC("");

  useEffectC(() => {
    if (open) {
      setStep(1);
      setPortion(initialPortion);
      setQty(1);
      setContact({ name: "", email: "", phone: "", notes: "" });
      setAllergens([]);
      setCard({ number: "", exp: "", cvc: "", zip: "" });
      setTipMode("none");
      setTipAmount(0);
      setTipCustom("");
      setErrors({});
      setProcessing(false);
      setConfirmId("");
    }
  }, [open, initialPortion]);

  useEffectC(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const selected = PORTIONS.find((p) => p.id === portion);
  const subtotal = selected.price * qty;
  const tip = tipMode === "custom"
    ? Math.max(0, +parseFloat(tipCustom || "0")) || 0
    : tipAmount;
  const preFee = subtotal + tip;
  const ccFee = +(preFee * 0.035).toFixed(2);
  const total = +(preFee + ccFee).toFixed(2);

  const toggleAllergen = (a) => {
    setAllergens((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);
  };

  const validateContact = () => {
    const e = {};
    if (!contact.name.trim()) e.name = "Required";
    if (!contact.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) e.email = "Doesn't look right";
    if (!contact.phone.trim()) e.phone = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e = {};
    const num = card.number.replace(/\s/g, "");
    if (num.length < 13) e.number = "Card number incomplete";
    if (!/^\d{2}\s*\/\s*\d{2}$/.test(card.exp)) e.exp = "MM / YY";
    if (card.cvc.length < 3) e.cvc = "3+ digits";
    if (!card.zip.trim()) e.zip = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 1) setStep(2);
    else if (step === 2) { if (validateContact()) setStep(3); }
    else if (step === 3) {
      if (validatePayment()) {
        setProcessing(true);
        // Simulate Stripe PaymentIntent confirmation
        setTimeout(() => {
          setProcessing(false);
          setConfirmId("MSC-" + Math.random().toString(36).slice(2, 7).toUpperCase());
          setStep(4);
        }, 1600);
      }
    }
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
  };

  const formatCard = (v) => v.replace(/\D/g, "").slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ");
  const formatExp = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    if (d.length <= 2) return d;
    return d.slice(0, 2) + " / " + d.slice(2);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>

        {step !== 4 && (
          <div className="modal-summary">
            <div className="ms-brand">MACON SUPPER CLUB</div>
            <div className="ms-sub">CHEF DAVID BARTLETT</div>
            <div className="ms-sunday">Sunday Supper</div>
            <div className="ms-date">{sundayLabel}</div>

            <div className="ms-menu">
              {weeklyMenu.map((m, i) => (
                <div key={i}>
                  <div className="item-name">✻ {m.name}</div>
                  <div className="item-desc">{m.desc}</div>
                </div>
              ))}
            </div>

            <div className="ms-total-wrap">
              <div className="ms-line"><span className="lbl">Portion</span><span>{selected.name}</span></div>
              <div className="ms-line"><span className="lbl">Quantity</span><span>{qty}</span></div>
              <div className="ms-line"><span className="lbl">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              {tip > 0 && (
                <div className="ms-line"><span className="lbl">Tip for the chef</span><span>${tip.toFixed(2)}</span></div>
              )}
              <div className="ms-line ms-line-fee"><span className="lbl">Card processing (3.5%)</span><span>${ccFee.toFixed(2)}</span></div>
              <div className="ms-line total"><span>Total due</span><span>${total.toFixed(2)}</span></div>
            </div>
          </div>
        )}

        {step !== 4 && (
          <div className="modal-form">
            <div className="steps-strip">
              <StepDot n={1} label="Supper" step={step} />
              <div className="step-divider"></div>
              <StepDot n={2} label="Details" step={step} />
              <div className="step-divider"></div>
              <StepDot n={3} label="Payment" step={step} />
            </div>

            {step === 1 && (
              <>
                <h3>Choose your supper</h3>
                <p className="sub">Pickup Sunday, {sundayLabel.split("•")[0].trim() || sundayLabel}, 5–6pm at Grey Goose Players Club.</p>
                <div className="portion-grid">
                  {PORTIONS.map((p) => (
                    <div
                      key={p.id}
                      className={`portion ${portion === p.id ? "selected" : ""}`}
                      onClick={() => setPortion(p.id)}
                    >
                      <div className="radio-mark"></div>
                      <div>
                        <div className="portion-name">{p.name}</div>
                        <div className="portion-desc">{p.desc}</div>
                      </div>
                      <div className="portion-price">${p.price}</div>
                    </div>
                  ))}
                </div>
                <div className="qty-row">
                  <label>Quantity</label>
                  <div className="qty-ctrl">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1}>−</button>
                    <div className="val">{qty}</div>
                    <button onClick={() => setQty(Math.min(10, qty + 1))} disabled={qty >= 10}>+</button>
                  </div>
                </div>
                <div className="actions">
                  <button className="btn-next" onClick={next}>Continue →</button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3>Your details</h3>
                <p className="sub">We'll text you when your supper is ready for pickup.</p>
                <div className="field-group">
                  <div className={`field ${errors.name ? "invalid" : ""}`}>
                    <label>Full name</label>
                    <input value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} placeholder="Patrick Bartlett" />
                    {errors.name && <div className="field-error">{errors.name}</div>}
                  </div>
                  <div className="field-row">
                    <div className={`field ${errors.email ? "invalid" : ""}`}>
                      <label>Email</label>
                      <input value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} placeholder="you@example.com" />
                      {errors.email && <div className="field-error">{errors.email}</div>}
                    </div>
                    <div className={`field ${errors.phone ? "invalid" : ""}`}>
                      <label>Phone</label>
                      <input value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} placeholder="(478) 555-0123" />
                      {errors.phone && <div className="field-error">{errors.phone}</div>}
                    </div>
                  </div>
                  <div className="field">
                    <label>Allergies & dietary notes</label>
                    <div className="allergen-grid">
                      {ALLERGENS.map((a) => (
                        <div key={a} className={`allergen-chip ${allergens.includes(a) ? "on" : ""}`} onClick={() => toggleAllergen(a)}>
                          {a}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="field">
                    <label>Anything else the chef should know?</label>
                    <textarea value={contact.notes} onChange={(e) => setContact({ ...contact, notes: e.target.value })} placeholder="Vegetarian, no onions, picking up late — etc." />
                  </div>
                </div>
                <div className="actions">
                  <button className="btn-back" onClick={back}>← Back</button>
                  <button className="btn-next" onClick={next}>Continue →</button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h3>Payment</h3>
                <p className="sub">Full prepayment confirms your Sunday seat. Card processing adds 3.5% — we pass through what Stripe charges, no markup. Full refund up to Saturday 4 pm.</p>

                <div className="tip-block">
                  <div className="tip-head">
                    <div className="tip-title">A little something for the chef?</div>
                    <div className="tip-optional">Optional</div>
                  </div>
                  <div className="tip-sub">
                    Tips go directly to Chef David — no obligation either way. The supper price already covers everything.
                  </div>
                  <div className="tip-options">
                    <TipChip on={tipMode === "preset" && tipAmount === 0 || tipMode === "none"} onClick={() => { setTipMode("none"); setTipAmount(0); setTipCustom(""); }} skip>
                      Skip
                    </TipChip>
                    <TipChip on={tipMode === "preset" && tipAmount === 5} onClick={() => { setTipMode("preset"); setTipAmount(5); setTipCustom(""); }}>
                      $5<span className="label">Thanks</span>
                    </TipChip>
                    <TipChip on={tipMode === "preset" && tipAmount === 10} onClick={() => { setTipMode("preset"); setTipAmount(10); setTipCustom(""); }}>
                      $10<span className="label">Kind</span>
                    </TipChip>
                    <TipChip on={tipMode === "preset" && tipAmount === 15} onClick={() => { setTipMode("preset"); setTipAmount(15); setTipCustom(""); }}>
                      $15<span className="label">Generous</span>
                    </TipChip>
                    <TipChip on={tipMode === "custom"} onClick={() => { setTipMode("custom"); setTipAmount(0); }}>
                      Other<span className="label">Custom</span>
                    </TipChip>
                  </div>
                  {tipMode === "custom" && (
                    <div className="tip-custom-row">
                      <span className="dollar">$</span>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={tipCustom}
                        onChange={(e) => setTipCustom(e.target.value.replace(/[^0-9.]/g, "").slice(0, 6))}
                        placeholder="Enter amount"
                        autoFocus
                      />
                    </div>
                  )}
                </div>

                <div className="card-brand-strip">
                  <span className="brand-chip">VISA</span>
                  <span className="brand-chip">MC</span>
                  <span className="brand-chip">AMEX</span>
                  <span className="brand-chip">DISCOVER</span>
                </div>
                <div className="field-group">
                  <div className={`field ${errors.number ? "invalid" : ""}`}>
                    <label>Card number</label>
                    <input
                      value={card.number}
                      onChange={(e) => setCard({ ...card, number: formatCard(e.target.value) })}
                      placeholder="1234 1234 1234 1234"
                      inputMode="numeric"
                    />
                    {errors.number && <div className="field-error">{errors.number}</div>}
                  </div>
                  <div className="card-row">
                    <div className={`field ${errors.exp ? "invalid" : ""}`}>
                      <label>Expiry</label>
                      <input
                        value={card.exp}
                        onChange={(e) => setCard({ ...card, exp: formatExp(e.target.value) })}
                        placeholder="MM / YY"
                        inputMode="numeric"
                      />
                      {errors.exp && <div className="field-error">{errors.exp}</div>}
                    </div>
                    <div className={`field ${errors.cvc ? "invalid" : ""}`}>
                      <label>CVC</label>
                      <input
                        value={card.cvc}
                        onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                        placeholder="123"
                        inputMode="numeric"
                      />
                      {errors.cvc && <div className="field-error">{errors.cvc}</div>}
                    </div>
                    <div className={`field ${errors.zip ? "invalid" : ""}`}>
                      <label>ZIP</label>
                      <input
                        value={card.zip}
                        onChange={(e) => setCard({ ...card, zip: e.target.value.slice(0, 10) })}
                        placeholder="31201"
                      />
                      {errors.zip && <div className="field-error">{errors.zip}</div>}
                    </div>
                  </div>
                </div>
                <div className="actions">
                  <button className="btn-back" onClick={back} disabled={processing}>← Back</button>
                  <button className="btn-next" onClick={next} disabled={processing}>
                    {processing ? (
                      <>Processing…</>
                    ) : (
                      <><span className="lock">🔒</span>Pay ${total.toFixed(2)}</>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="success">
            <div className="success-mark">✓</div>
            <div className="script-flourish">You're in</div>
            <h3>Reservation confirmed</h3>
            <p>
              A confirmation is on its way to <strong>{contact.email}</strong>. We'll text {contact.phone} when your supper is plated and ready.
            </p>
            <div className="success-card">
              <div>
                <div className="k">Confirmation</div>
                <div className="v">{confirmId}</div>
              </div>
              <div>
                <div className="k">Charged</div>
                <div className="v">${total.toFixed(2)}</div>
              </div>
              <div>
                <div className="k">Order</div>
                <div className="v">{selected.name} × {qty}</div>
              </div>
              <div>
                <div className="k">Pickup</div>
                <div className="v">Sun · 5–6 pm</div>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <div className="k">Where</div>
                <div className="v">Grey Goose Players Club<br />4524 Forsyth Rd, Suite 310 · Macon, GA 31210</div>
              </div>
            </div>
            <div className="actions" style={{ marginTop: 32 }}>
              <button className="btn-next" style={{ flex: "none", padding: "16px 32px" }} onClick={onClose}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepDot({ n, label, step }) {
  const cls = step === n ? "active" : step > n ? "done" : "";
  return (
    <div className={`step-dot ${cls}`}>
      <div className="num">{step > n ? "✓" : n}</div>
      <span>{label}</span>
    </div>
  );
}

function TipChip({ on, onClick, skip, children }) {
  return (
    <div className={`tip-chip ${on ? "on" : ""} ${skip ? "skip" : ""}`} onClick={onClick}>
      {children}
    </div>
  );
}

window.CheckoutModal = CheckoutModal;
