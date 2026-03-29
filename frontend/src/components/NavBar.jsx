import styles from "../styles/NavBar.module.css";
import { getToken } from "../utils/reminderDates.js";
import { useState } from "react";

export function NavBar({ screen, go }) {
  const tabs = [
    { id: "landing", l: "Landing", e: "🏠" },
    { id: "verify", l: "Verify", e: "📱" },
    { id: "onboard", l: "Onboard", e: "🎂" },
    { id: "dashboard", l: "Dashboard", e: "📋" },
    { id: "upgrade", l: "Upgrade", e: "⭐" }
  ];
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState("");

  const sendReminders = async () => {
    setSending(true);
    setMsg("");
    try {
      const res = await fetch("/api/send-birthday-reminders-whatsapp", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${getToken()}`,
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      if (res.ok) setMsg(data.message || "Message sent!");
      else setMsg(data?.error || "Failed to send message");
    } catch (e) {
      setMsg("Failed to send message");
    }
    setSending(false);
  };

  return (
    <div className={styles.bar}>
      <div className={styles.hint}>PROTOTYPE — Click to navigate</div>
      {tabs.map(t => (
        <button key={t.id} type="button" onClick={() => go(t.id)} className={[styles.tab, screen === t.id && styles.tabActive].filter(Boolean).join(" ")}>
          <span className={styles.tabEmoji}>{t.e}</span>
          {t.l}
        </button>
      ))}
      <button
        type="button"
        className={styles.tab}
        onClick={sendReminders}
        disabled={sending}
        style={{ marginLeft: 16 }}
      >
        📤 Send Reminders
      </button>
    </div>
  );
}
