import { logoutAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";
import { formatMoney } from "@/lib/money";
import { displayCutoff, displayDate } from "@/lib/ordering";
import { prisma } from "@/lib/prisma";
import { getOrderingOverride } from "@/lib/site";
import { MenuEditor } from "./ui";

export default async function AdminPage() {
  await requireAdmin();
  const menu = await prisma.menu.findFirst({
    include: { items: { orderBy: { sortOrder: "asc" } } },
    orderBy: { sundayDate: "asc" },
  });
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  const images = await prisma.siteImage.findMany({
    orderBy: { createdAt: "desc" },
    take: 40,
  });
  const orderingOverride = await getOrderingOverride();
  const inquiries = await prisma.cateringInquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const paidTotal = orders
    .filter((order) => order.status === "PAID")
    .reduce((sum, order) => sum + order.totalCents, 0);

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div className="row">
          <img src="/design-assets/logoword.png" alt="Macon Supper Club" style={{ width: 190 }} />
          <div>
            <div className="admin-kicker">Kitchen office</div>
            <h1 style={{ fontSize: 44 }}>Weekly operations</h1>
          </div>
        </div>
        <form action={logoutAction}>
          <button className="btn-secondary" type="submit">
            Sign out
          </button>
        </form>
      </header>

      <main className="admin-main stack">
        <div className="admin-grid">
          <div className="admin-card">
            <div className="admin-kicker">Current menu</div>
            <h2>{menu?.title ?? "No menu yet"}</h2>
            <p className="muted">{menu ? displayDate(menu.sundayDate) : "Create a menu in the database."}</p>
          </div>
          <div className="admin-card">
            <div className="admin-kicker">Ordering closes</div>
            <h2>{menu ? displayCutoff(menu.cutoffAt) : "Not set"}</h2>
            <p className="muted">The public checkout closes automatically after this time.</p>
          </div>
          <div className="admin-card">
            <div className="admin-kicker">Paid revenue</div>
            <h2>{formatMoney(paidTotal)}</h2>
            <p className="muted">{orders.filter((order) => order.status === "PAID").length} paid orders</p>
          </div>
          <div className="admin-card">
            <div className="admin-kicker">Catering</div>
            <h2>{inquiries.length}</h2>
            <p className="muted">Recent private event inquiries</p>
          </div>
        </div>

        {menu && <MenuEditor menu={menu} images={images} orderingOverride={orderingOverride} />}

        <section className="admin-card stack">
          <div>
            <div className="admin-kicker">Catering</div>
            <h2>Private event inquiries</h2>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Guest</th>
                <th>Event</th>
                <th>Budget</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id}>
                  <td>
                    <span className="status">{inquiry.status}</span>
                  </td>
                  <td>
                    <strong>{inquiry.customerName}</strong>
                    <br />
                    <span className="muted">{inquiry.email}</span>
                    <br />
                    <span className="muted">{inquiry.phone}</span>
                  </td>
                  <td>
                    {inquiry.eventType || <span className="muted">Event type TBD</span>}
                    <br />
                    <span className="muted">
                      {inquiry.eventDate ? displayDate(inquiry.eventDate) : "Date TBD"}
                      {inquiry.eventTime ? ` · ${inquiry.eventTime}` : ""}
                    </span>
                    <br />
                    <span className="muted">
                      {inquiry.guestCount ? `${inquiry.guestCount} guests` : "Guest count TBD"}
                      {inquiry.location ? ` · ${inquiry.location}` : ""}
                    </span>
                  </td>
                  <td>{inquiry.budget || <span className="muted">TBD</span>}</td>
                  <td>{inquiry.notes || <span className="muted">None</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="admin-card stack">
          <div>
            <div className="admin-kicker">Orders</div>
            <h2>Recent reservations</h2>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Guest</th>
                <th>Supper</th>
                <th>Total</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <span className="status">{order.status}</span>
                  </td>
                  <td>
                    <strong>{order.customerName}</strong>
                    <br />
                    <span className="muted">{order.customerEmail}</span>
                    <br />
                    <span className="muted">{order.customerPhone}</span>
                  </td>
                  <td>
                    {order.quantity} x {order.portionName}
                    {order.allergens && (
                      <>
                        <br />
                        <span className="muted">Allergies: {order.allergens}</span>
                      </>
                    )}
                  </td>
                  <td>{formatMoney(order.totalCents)}</td>
                  <td>{order.notes || <span className="muted">None</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
