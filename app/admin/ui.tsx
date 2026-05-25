import {
  addMenuItemAction,
  deleteMenuItemAction,
  updateOrderingOverrideAction,
  updateMenuAction,
  updateMenuItemAction,
  uploadImageAction,
} from "@/app/admin/actions";
import type { Menu, MenuItem, SiteImage } from "@prisma/client";

function inputDateTime(date: Date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(date).map((part) => [part.type, part.value]),
  );
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
}

export function MenuEditor({
  menu,
  images,
  orderingOverride,
}: {
  menu: Menu & { items: MenuItem[] };
  images: SiteImage[];
  orderingOverride: { closed: boolean; message: string };
}) {
  return (
    <section className="admin-card stack">
      <div>
        <div className="admin-kicker">This week</div>
        <h2>Edit menu and ordering</h2>
      </div>

      <form className="form-grid" action={updateMenuAction}>
        <input type="hidden" name="menuId" value={menu.id} />
        <div className="field">
          <label>Menu title</label>
          <input name="title" defaultValue={menu.title} required />
        </div>
        <div className="field">
          <label>Status</label>
          <select name="status" defaultValue={menu.status}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
        <div className="field">
          <label>Sunday pickup date/time ET</label>
          <input name="sundayDate" type="datetime-local" defaultValue={inputDateTime(menu.sundayDate)} />
        </div>
        <div className="field">
          <label>Ordering cutoff ET</label>
          <input name="cutoffAt" type="datetime-local" defaultValue={inputDateTime(menu.cutoffAt)} />
        </div>
        <div className="field full">
          <label>Pickup notes</label>
          <input name="pickupNotes" defaultValue={menu.pickupNotes} />
        </div>
        <label className="row field full" style={{ display: "flex" }}>
          <input name="soldOut" type="checkbox" defaultChecked={menu.soldOut} style={{ width: "auto" }} />
          Mark this menu sold out
        </label>
        <div className="field full">
          <button className="btn-primary" type="submit">
            Save menu settings
          </button>
        </div>
      </form>

      <form className="form-grid admin-subpanel" action={updateOrderingOverrideAction}>
        <div className="field full">
          <label>Holiday or pause message</label>
          <input
            name="overrideMessage"
            defaultValue={orderingOverride.message}
            placeholder="Closed this week for a private event. New menu opens Monday."
          />
        </div>
        <label className="row field full" style={{ display: "flex" }}>
          <input
            name="overrideClosed"
            type="checkbox"
            defaultChecked={orderingOverride.closed}
            style={{ width: "auto" }}
          />
          Pause public ordering and show this message
        </label>
        <div className="field full">
          <button className="btn-secondary" type="submit">
            Save ordering override
          </button>
        </div>
      </form>

      <div className="stack">
        {menu.items.map((item) => (
          <form className="form-grid" action={updateMenuItemAction} key={item.id}>
            <input type="hidden" name="itemId" value={item.id} />
            <div className="field">
              <label>Order</label>
              <input name="sortOrder" type="number" defaultValue={item.sortOrder} />
            </div>
            <div className="field">
              <label>Course name</label>
              <input name="name" defaultValue={item.name} />
            </div>
            <div className="field full">
              <label>Description</label>
              <textarea name="description" defaultValue={item.description} />
            </div>
            <div className="field full">
              <label>Image</label>
              <select name="imageUrl" defaultValue={item.imageUrl ?? ""}>
                <option value="">No image - text only on the public menu</option>
                {images.map((image) => (
                  <option value={image.url} key={image.id}>
                    {image.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="row field full">
              <button className="btn-primary" type="submit">
                Save course
              </button>
              <button className="btn-secondary" formAction={deleteMenuItemAction}>
                Delete course
              </button>
            </div>
          </form>
        ))}
      </div>

      <form action={addMenuItemAction}>
        <input type="hidden" name="menuId" value={menu.id} />
        <button className="btn-secondary" type="submit">
          Add another course
        </button>
      </form>

      <form className="form-grid" action={uploadImageAction}>
        <div className="field full">
          <div className="admin-kicker">Images</div>
          <h3>Upload a reusable menu photo</h3>
          <p className="muted">
            After uploading, choose it from a course image dropdown above. Courses can also stay
            text-only and will format cleanly on the public menu.
          </p>
        </div>
        <div className="field">
          <label>Image label</label>
          <input name="label" placeholder="Schnitzel plating" />
        </div>
        <div className="field">
          <label>Alt text</label>
          <input name="alt" placeholder="Chicken schnitzel with lemon" />
        </div>
        <div className="field full">
          <label>Upload image</label>
          <input name="image" type="file" accept="image/*" />
        </div>
        <button className="btn-primary" type="submit">
          Upload image
        </button>
      </form>
    </section>
  );
}
