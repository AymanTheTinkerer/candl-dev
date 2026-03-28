import styles from "../styles/NavBar.module.css";
import { getToken } from "../utils/reminderDates.js";

export function NavBar({ screen, go }) {
  const tabs = [{ id: "landing", l: "Landing", e: "🏠" }, { id: "verify", l: "Verify", e: "📱" }, { id: "onboard", l: "Onboard", e: "🎂" }, { id: "dashboard", l: "Dashboard", e: "📋" }, { id: "upgrade", l: "Upgrade", e: "⭐" }];
  return (
    <div className={styles.bar}>
      <div className={styles.hint}>PROTOTYPE — Click to navigate</div>
      {tabs.map(t => (
        <button key={t.id} type="button" onClick={() => go(t.id)} className={[styles.tab, screen === t.id && styles.tabActive].filter(Boolean).join(" ")}>
          <span className={styles.tabEmoji}>{t.e}</span>
          {t.l}
        </button>
      ))}
      <button type="button" onClick={() => console.log(getToken())} className={styles.tab} style={{ marginLeft: 8 }}>
        🧪 Test
      </button>
    </div>
  );
}
