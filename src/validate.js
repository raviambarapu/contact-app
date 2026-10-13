// Returns an object like { name: "Name is required" }. Empty object = valid.
export function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required";
  }
  if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Enter a valid email address";
  }
  if (values.phone && !/^\d{7,15}$/.test(values.phone)) {
    errors.phone = "Phone must be digits only (7-15 digits)";
  }

  return errors;
}