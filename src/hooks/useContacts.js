import { useState, useEffect, useCallback } from "react";
import { getContacts } from "../api.js";

// status is "loading", "error" or "success"
export default function useContacts() {
  const [contacts, setContacts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false; // stops updates after the component unmounts
    setStatus("loading");

    getContacts()
      .then((data) => {
        if (!cancelled) {
          setContacts(data);
          setStatus("success");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  // Used by the "Try Again" button and after adding a contact
  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  return { contacts, status, reload };
}