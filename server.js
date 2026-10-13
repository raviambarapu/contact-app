import http from "node:http";

let nextId = 3;
const contacts = [
  { id: 1, name: "Asha Rao", email: "asha@example.com", phone: "9876543210" },
  { id: 2, name: "Vikram Singh", email: "vikram@example.com", phone: "" },
];

// The server checks the data again. Never trust the browser alone.
function validate(v) {
  const errors = {};
  if (!v.name || !String(v.name).trim()) errors.name = "Name is required";
  if (!/^\S+@\S+\.\S+$/.test(v.email || "")) errors.email = "Enter a valid email";
  if (v.phone && !/^\d{7,15}$/.test(v.phone)) errors.phone = "Digits only";
  return errors;
}

function send(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

http
  .createServer((req, res) => {
    if (req.url === "/api/contacts" && req.method === "GET") {
      return setTimeout(() => send(res, 200, contacts), 600);
    }

    if (req.url === "/api/contacts" && req.method === "POST") {
      let raw = "";
      req.on("data", (chunk) => (raw += chunk));
      req.on("end", () => {
        let body;
        try {
          body = JSON.parse(raw);
        } catch {
          return send(res, 400, { message: "Bad data sent" });
        }

        const errors = validate(body);
        if (Object.keys(errors).length > 0) {
          return send(res, 422, { message: "Please fix the form errors" });
        }

        const contact = {
          id: nextId++,
          name: body.name.trim(),
          email: body.email,
          phone: body.phone || "",
        };
        contacts.push(contact);
        setTimeout(() => send(res, 201, contact), 400);
      });
      return;
    }

    send(res, 404, { message: "Not found" });
  })
  .listen(4000, () => console.log("Mock API running on http://localhost:4000"));