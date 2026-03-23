import { useState } from "react";
import { B } from "../theme.js";
import { I } from "../icons.jsx";
import { Btn, Inp, Badge, Card, Logo, Anim, StepProgress } from "../components/ui.jsx";
import styles from "./Onboard.module.css";

export function Onboard({ go }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [etype, setEtype] = useState("birthday");
  const [events, setEvents] = useState([]);
  const [showFb, setShowFb] = useState(false);
  const addEvent = () => { if (name && date) { setEvents([...events, { name, date, type: etype }]); setName(""); setDate(""); } };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Anim delay={0}><div className={styles.headRow}><Logo /><div className={styles.headBadge}><Badge variant="success">✓ Verified</Badge></div></div></Anim>
        <Anim delay={100}><StepProgress s={step} /></Anim>

        {step === 1 && (<Anim delay={150}>
          <h2 className={styles.h2}>Add your first events</h2>
          <p className={styles.lead}>Start with the birthdays you know by heart.</p>
          <Card className={styles.formCard}>
            <Inp label="Name" placeholder="e.g. Mom, Ravi, Sarah" value={name} onChange={e => setName(e.target.value)} className={styles.inpTight} />
            <Inp label="Date" placeholder="e.g. March 15 or 03/15/1968" value={date} onChange={e => setDate(e.target.value)} className={styles.inpTight} />
            <div className={styles.typeBlock}>
              <label className={styles.typeLabel}>Type</label>
              <div className={styles.typeRow}>
                {[{ id: "birthday", l: "🎂 Birthday" }, { id: "anniversary", l: "💍 Anniversary" }, { id: "custom", l: "📌 Custom" }].map(t => (
                  <button key={t.id} type="button" onClick={() => setEtype(t.id)} className={[styles.typeBtn, etype === t.id && styles.typeBtnActive].filter(Boolean).join(" ")}>{t.l}</button>
                ))}
              </div>
            </div>
            <Btn full onClick={addEvent} disabled={!name || !date}>{I.plus(15)} Add event</Btn>
          </Card>
          {events.length > 0 && <div className={styles.eventList}>{events.map((ev, i) => <Anim key={i} delay={0} type="scaleIn"><div className={styles.eventRow}>{I.check(15)}<span className={styles.eventName}>{ev.name}</span><span className={styles.eventDate}>{ev.date}</span></div></Anim>)}</div>}
          <div className={styles.actions}>
            <Btn v="secondary" full onClick={() => setStep(2)}>Skip for now</Btn>
            {events.length > 0 && <Btn full onClick={() => setStep(2)}>Continue ({events.length})</Btn>}
          </div>
        </Anim>)}

        {step === 2 && (<Anim delay={0} type="slideR">
          <h2 className={styles.h2}>Import your birthdays</h2>
          <p className={styles.lead}>Got birthdays saved somewhere? Bring them all in.</p>
          <Card onClick={() => setShowFb(!showFb)} className={styles.fbCard}>
            <div className={styles.fbRow}>
              <div className={styles.fbIcon}>f</div>
              <div className={styles.fbBody}><div className={styles.fbTitle}>Import from Facebook</div><div className={styles.fbDesc}>We'll walk you through it</div></div>
              <div className={[styles.chev, showFb && styles.chevOpen].filter(Boolean).join(" ")}>{I.chevR()}</div>
            </div>
            {showFb && (<Anim delay={0} type="fadeUp"><div className={styles.walkthrough} onClick={e => e.stopPropagation()}>
              <div className={styles.walkTitle}>Quick walkthrough</div>
              {["Go to Facebook → Settings → Download Your Information", "Select 'Friends' data only, JSON format", "Download the file and upload it here"].map((s, i) => <div key={i} className={styles.walkLine}><span className={styles.walkNum}>{i + 1}</span><span>{s}</span></div>)}
              <div className={styles.dropZone}>{I.upload(22, B.hint)}<div className={styles.dropHint}>Drop your Facebook export here</div></div>
            </div></Anim>)}
          </Card>
          <Card className={styles.csvCard}>
            <div className={styles.fbRow}>
              <div className={styles.csvIcon}>{I.upload(20, B.accent)}</div>
              <div className={styles.fbBody}><div className={styles.fbTitle}>Upload a CSV / spreadsheet</div><div className={styles.fbDesc}>Columns: Name, Date (any format)</div></div>
              {I.chevR()}
            </div>
          </Card>
          <div className={styles.row}><Btn v="secondary" onClick={() => setStep(1)} className={styles.flex1}>Back</Btn><Btn onClick={() => setStep(3)} className={styles.flex2}>Continue</Btn></div>
        </Anim>)}

        {step === 3 && (<Anim delay={0} type="scaleIn"><div className={styles.done}>
          <div className={styles.emojiBig}>🎉</div>
          <h2 className={`${styles.h2} ${styles.h2Done}`}>You're all set!</h2>
          <p className={`${styles.lead} ${styles.leadSm}`}>Candl will message you when it's time.</p>
          <p className={`${styles.lead} ${styles.leadXs}`}>You can also add events anytime via the bot.</p>
          {events.length > 0 && <div className={styles.savedBanner}>{I.check(16)}<span className={styles.savedText}>{events.length} event{events.length > 1 ? "s" : ""} saved</span></div>}
          <div><Btn sz="lg" onClick={() => go("dashboard")}>Go to dashboard →</Btn></div>
        </div></Anim>)}
      </div>
    </div>
  );
}
