export default function ContactList({ contacts, status, onRetry }) {
  let content;

  if (status === "loading") {
    content = (
      <div aria-busy="true">
        <div className="skeleton" />
        <div className="skeleton" />
        <div className="skeleton" />
      </div>
    );
  } else if (status === "error") {
    content = (
      <div className="error-box" role="alert">
        <p>Couldn't load your contacts.</p>
        <button className="btn btn-danger" onClick={onRetry}>
          Try Again
        </button>
      </div>
    );
  } else if (contacts.length === 0) {
    content = (
      <p className="card empty">No contacts yet. Add your first one.</p>
    );
  } else {
    content = (
      <ul className="list">
        {contacts.map((c) => (
          <li key={c.id} className="card contact">
            <p className="contact-name">{c.name}</p>
            <p className="contact-detail">{c.email}</p>
            {c.phone && <p className="contact-detail contact-phone">{c.phone}</p>}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="panel list-panel">
      <h2>Your Contacts</h2>
      {content}
    </section>
  );
}