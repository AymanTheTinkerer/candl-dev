import { useState, useEffect, useMemo } from "react";
import { I } from "../icons.jsx";
import { Btn, Inp, Badge, Card, Logo, Anim } from "../components/ui.jsx";
import styles from "../styles/Dashboard.module.css";
import { daysUntilNextBirthday, formatBirthdayShort, turningAge, getToken } from "../utils/reminderDates.js";

function mapReminder(row) {
  const birthday = row.birthday;
  const days = daysUntilNextBirthday(birthday);
  const name = row.name?.trim() || "Someone";
  return {
    id: row.id,
    phone: row.phone,
    name,
    date: formatBirthdayShort(birthday),
    days,
    type: "birthday",
    age: turningAge(birthday),
  };
}

export function Dashboard({ go }) {
  const [tab, setTab] = useState("upcoming");
  const [showAdd, setShowAdd] = useState(false);
  const [nn, setNn] = useState("");
  const [nd, setNd] = useState("");
  const [reminders, setReminders] = useState([]);
  const [loadState, setLoadState] = useState({ status: "loading", error: null });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/reminders", {
          headers: {
            "Authorization": `Bearer ${getToken()}`
          }
        });
        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error(data?.error || res.statusText || "Failed to load reminders");
        if (cancelled) return;
        const rows = Array.isArray(data) ? data : [];
        setReminders(rows);
        setLoadState({ status: "ok", error: null });
      } catch (e) {
        if (!cancelled) setLoadState({ status: "error", error: e instanceof Error ? e.message : "Unknown error" });
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const evts = useMemo(() => {
    return reminders.map(mapReminder).sort((a, b) => a.days - b.days);
  }, [reminders]);

  const paused = [];

  return (
    <div className={styles.page}>
      <Anim delay={0} type="fadeIn">
        <header className={styles.header}>
          <Logo size="sm" />
          <div className={styles.headerActions}>
            <Badge variant="muted" compact>Free · {reminders.length}/10 events</Badge>
            <Btn v="gold" onClick={() => go("upgrade")} className={styles.btnCompact}>{I.zap(14, "#fff")} Upgrade</Btn>
            <div className={styles.settingsBtn}>{I.settings()}</div>
          </div>
        </header>
      </Anim>

      <main className={styles.main}>
        <Anim delay={100}><div className={styles.titleRow}>
          <div>
            <h1 className={styles.h1}>Your events</h1>
            <p className={styles.sub}>
              {loadState.status === "error" ? (
                loadState.error
              ) : evts[0] ? (
                <>Next up: <strong className={styles.subStrong}>{evts[0].name === "Someone" ? "A birthday" : `${evts[0].name}'s birthday`}</strong>{" "}in {evts[0].days} day{evts[0].days === 1 ? "" : "s"}</>
              ) : (
                loadState.status === "loading" ? "Loading…" : "Add a reminder to see what’s next."
              )}
            </p>
          </div>
          <Btn onClick={() => setShowAdd(!showAdd)}>{I.plus(15)} Add event</Btn>
        </div></Anim>

        {showAdd && (<Anim delay={0} type="scaleIn"><Card className={styles.addPanel}>
          <div className={styles.addRow}>
            <div className={styles.addCol}><Inp label="Name" placeholder="Who?" value={nn} onChange={e => setNn(e.target.value)} className={styles.inpFlush} /></div>
            <div className={styles.addCol}><Inp label="Date" placeholder="When?" value={nd} onChange={e => setNd(e.target.value)} className={styles.inpFlush} /></div>
            <Btn disabled={!nn || !nd} className={styles.addBtn}>Add</Btn>
            <button type="button" onClick={() => setShowAdd(false)} className={styles.iconBtn}>{I.x()}</button>
          </div>
        </Card></Anim>)}

        <Anim delay={200}><div className={styles.tabs}>
          {[{ id: "upcoming", l: "Upcoming" }, { id: "all", l: "All events" }, { id: "paused", l: "Paused" }].map(t => (
            <button key={t.id} type="button" onClick={() => setTab(t.id)} className={[styles.tab, tab === t.id && styles.tabActive].filter(Boolean).join(" ")}>
              {t.l}{t.id === "paused" && paused.length > 0 && <span className={styles.tabBadge}>{paused.length}</span>}
            </button>
          ))}
        </div></Anim>

        {(tab === "upcoming" || tab === "all") && (
          <div className={styles.list}>
            {loadState.status === "loading" && <p className={styles.sub}>Loading reminders…</p>}
            {loadState.status === "error" && <p className={styles.sub} role="alert">{loadState.error}</p>}
            {loadState.status === "ok" && evts.length === 0 && <p className={styles.sub}>No reminders yet.</p>}
            {loadState.status === "ok" && evts.map((ev, i) => (
              <Anim key={ev.id} delay={250 + i * 60}><Card className={styles.eventCard}>
                <div className={[styles.eventIcon, ev.days <= 7 ? styles.eventIconSoon : styles.eventIconCalm].join(" ")}>🎂</div>
                <div className={styles.eventMain}>
                  <div className={styles.eventTitleRow}><span className={styles.eventName}>{ev.name}</span>{ev.days <= 7 && <Badge variant="accent" compact>Soon!</Badge>}</div>
                  <div className={styles.eventMeta}>{ev.date} · Turning {ev.age} · <span className={ev.days <= 7 ? styles.daysSoon : styles.daysCalm}>{ev.days}d away</span></div>
                </div>
                <div className={styles.eventActions}>
                  <button type="button" className={`${styles.iconBtn} ${styles.iconBtnSm}`}>{I.edit()}</button>
                  <button type="button" className={`${styles.iconBtn} ${styles.iconBtnSm}`}>{I.trash()}</button>
                </div>
              </Card></Anim>
            ))}
          </div>
        )}

        {tab === "paused" && <div>
          {paused.length > 0 && (<>
            <Anim delay={200}><Card className={styles.warnCard}>
              <div className={styles.warnRow}>{I.lock(16, "var(--c-warn)")}<span className={styles.warnTitle}>{paused.length} event{paused.length === 1 ? "" : "s"} paused</span></div>
              <p className={styles.warnText}>You've hit the free limit. Upgrade to activate all reminders.</p>
              <Btn v="gold" onClick={() => go("upgrade")} className={styles.btnCompact}>{I.zap(14, "#fff")} Unlock unlimited — $8/yr</Btn>
            </Card></Anim>
            {paused.map((ev, i) => (
              <Anim key={i} delay={300 + i * 60}><Card className={styles.pausedCard}>
                <div className={styles.pausedIcon}>🎂</div>
                <div className={styles.pausedMain}><span className={styles.pausedName}>{ev.name}</span><div className={styles.pausedDate}>{ev.date}</div></div>
                {I.lock(14, "var(--c-hint)")}
              </Card></Anim>
            ))}
          </>)}
          {paused.length === 0 && <p className={styles.sub}>No paused reminders.</p>}
        </div>}

        <Anim delay={500}><div className={styles.settingsBlock}>
          <h3 className={styles.settingsTitle}>{I.settings(16, "var(--c-muted)")} Reminder settings</h3>
          <div className={styles.settingsGrid}>
            {[{ label: "Day-of reminder", value: "8:00 AM", on: true }, { label: "Advance reminder", value: "3 days before", on: true }, { label: "Monthly digest", value: "1st of month", on: true }, { label: "Channel", value: "Telegram ✈️", on: true }].map((s, i) => (
              <div key={i} className={styles.settingRow}>
                <div><div className={styles.settingLabel}>{s.label}</div><div className={styles.settingValue}>{s.value}</div></div>
                <div className={[styles.toggle, s.on ? styles.toggleOn : styles.toggleOff].join(" ")}><div className={[styles.toggleKnob, s.on ? styles.toggleKnobOn : styles.toggleKnobOff].join(" ")} /></div>
              </div>
            ))}
          </div>
        </div></Anim>
      </main>
    </div>
  );
}
