import { useState } from "react";
import Input from "./Input.jsx";
import { validate } from "../validate.js";
import { addContact } from "../api.js";

const EMPTY = { name: "", email: "", phone: "" };

export default function ContactForm({ onSuccess }) {
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Check all fields, but only SHOW errors for fields the user has touched
  const allErrors = validate(values);
  const errors = {};
  for (const field in allErrors) {
    if (touched[field]) errors[field] = allErrors[field];
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");

    // Mark every field as touched so all errors become visible
    setTouched({ name: true, email: true, phone: true });

    // Stop here if the form is invalid
    if (Object.keys(allErrors).length > 0) return;

    setSubmitting(true);
    try {
      await addContact(values);
      setValues(EMPTY);
      setTouched({});
      onSuccess(); // tells the page to reload the list
    } catch (err) {
      // Keep what the user typed so nothing is lost
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="panel form-panel">
      <h2>Add Contact</h2>
      <form onSubmit={handleSubmit} noValidate className="card form">
        <Input
          id="name"
          name="name"
          label="Name"
          value={values.name}
          error={errors.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Input
          id="phone"
          name="phone"
          label="Phone (optional)"
          value={values.phone}
          error={errors.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {submitError && (
          <p className="error-text" role="alert">
            {submitError}
          </p>
        )}

        <button type="submit" className="btn" disabled={submitting}>
          {submitting ? "Saving..." : "Add Contact"}
        </button>
      </form>
    </section>
  );
}