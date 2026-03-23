import { useState } from "react";
import { I } from "../icons.jsx";
import { Btn, Inp, Badge, Card, Logo, Anim } from "../components/ui.jsx";
import styles from "./Dashboard.module.css";

export function Dashboard({ go }) {
  const [tab, setTab] = useState("upcoming");
  const [showAdd, setShowAdd] = useState(false);
  const [nn, setNn] = useState("");
  const [nd, setNd] = useState("");

  const evts = [
    { name: "Mom", date: "Mar 22", days: 3, type: "birthday", age: 58 },
    { name: "Ravi", date: "Apr 1", days: 13, type: "birthday", age: 30 },
    { name: "Sarah & Tom", date: "Apr 14", days: 26, type: "anniversary", age: null },
    { name: "Dad", date: "May 8", days: 50, type: "birthday", age: 62 },
    { name: "Priya", date: "Jun 3", days: 76, type: "birthday", age: 28 },
  ];
  const paused = [{ name: "Jake", date: "Jul 12", type: "birthday" }, { name: "Office party", date: "Dec 20", type: "custom" }];

  return (
    <div className={styles.page}>
      <Anim delay={0} type="fadeIn">
        <header className={styles.header}>
          <Logo size="sm" />
          <div className={styles.headerActions}>
            <Badge variant="muted" compact>Free · 10/10 events</Badge>
            <Btn v="gold" onClick={() => go("upgrade")} className={styles.btnCompact}>{I.zap(14, "#fff")} Upgrade</Btn>
            <div className={styles.settingsBtn}>{I.settings()}</div>
          </div>
        </header>
      </Anim>

      <main className={styles.main}>
        <Anim delay={100}><div className={styles.titleRow}>
          <div><h1 className={styles.h1}>Your events</h1><p className={styles.sub}>Next up: <strong className={styles.subStrong}>Mom's birthday</strong> in 3 days</p></div>
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
              {t.l}{t.id === "paused" && <span className={styles.tabBadge}>2</span>}
            </button>
          ))}
        </div></Anim>

        {(tab === "upcoming" || tab === "all") && <div className={styles.list}>
          {evts.map((ev, i) => (
            <Anim key={i} delay={250 + i * 60}><Card className={styles.eventCard}>
              <div className={[styles.eventIcon, ev.days <= 7 ? styles.eventIconSoon : styles.eventIconCalm].join(" ")}>{ev.type === "birthday" ? "🎂" : ev.type === "anniversary" ? "💍" : "📌"}</div>
              <div className={styles.eventMain}>
                <div className={styles.eventTitleRow}><span className={styles.eventName}>{ev.name}</span>{ev.days <= 7 && <Badge variant="accent" compact>Soon!</Badge>}</div>
                <div className={styles.eventMeta}>{ev.date}{ev.age ? ` · Turning ${ev.age}` : ""} · <span className={ev.days <= 7 ? styles.daysSoon : styles.daysCalm}>{ev.days}d away</span></div>
              </div>
              <div className={styles.eventActions}>
                <button type="button" className={`${styles.iconBtn} ${styles.iconBtnSm}`}>{I.edit()}</button>
                <button type="button" className={`${styles.iconBtn} ${styles.iconBtnSm}`}>{I.trash()}</button>
              </div>
            </Card></Anim>
          ))}
        </div>}

        {tab === "paused" && <div>
          <Anim delay={200}><Card className={styles.warnCard}>
            <div className={styles.warnRow}>{I.lock(16, "var(--c-warn)")}<span className={styles.warnTitle}>2 events paused</span></div>
            <p className={styles.warnText}>You've hit the free limit. Upgrade to activate all reminders.</p>
            <Btn v="gold" onClick={() => go("upgrade")} className={styles.btnCompact}>{I.zap(14, "#fff")} Unlock unlimited — $8/yr</Btn>
          </Card></Anim>
          {paused.map((ev, i) => (
            <Anim key={i} delay={300 + i * 60}><Card className={styles.pausedCard}>
              <div className={styles.pausedIcon}>{ev.type === "birthday" ? "🎂" : "📌"}</div>
              <div className={styles.pausedMain}><span className={styles.pausedName}>{ev.name}</span><div className={styles.pausedDate}>{ev.date}</div></div>
              {I.lock(14, "var(--c-hint)")}
            </Card></Anim>
          ))}
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
