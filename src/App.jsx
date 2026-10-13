import useContacts from "./hooks/useContacts.js";
import ContactForm from "./components/ContactForm.jsx";
import ContactList from "./components/ContactList.jsx";

export default function App() {
  const { contacts, status, reload } = useContacts();

  return (
    <main className="page">
      <h1>Contacts</h1>
      <div className="layout">
        <ContactForm onSuccess={reload} />
        <ContactList contacts={contacts} status={status} onRetry={reload} />
      </div>
    </main>
  );
}
