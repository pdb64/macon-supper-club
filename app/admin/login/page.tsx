import { loginAction } from "@/app/admin/actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return (
    <main className="section">
      <form className="checkout-panel stack" action={loginAction}>
        <img src="/design-assets/logomark.png" alt="Macon Supper Club" style={{ width: 180 }} />
        <div>
          <div className="admin-kicker">Kitchen office</div>
          <h1 style={{ fontSize: 64 }}>Admin sign in</h1>
        </div>
        {params.error && <p className="error">That password did not match.</p>}
        <div className="field">
          <label htmlFor="password">Admin password</label>
          <input id="password" name="password" type="password" required autoFocus />
        </div>
        <button className="btn-primary" type="submit">
          Open dashboard
        </button>
      </form>
    </main>
  );
}

