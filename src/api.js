const API = "/api";

export async function getContacts() {
  const res = await fetch(`${API}/contacts`);
  if (!res.ok) throw new Error("Failed to load contacts");
  return res.json();
}

export async function addContact(values) {
  const res = await fetch(`${API}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.message || "Could not save contact");
  return body;
}