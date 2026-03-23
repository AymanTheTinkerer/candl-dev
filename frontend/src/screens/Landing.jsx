import { useState } from "react";
import { B } from "../theme.js";
import { I } from "../icons.jsx";
import { Btn, Badge, Card, Logo, Anim, countries } from "../components/ui.jsx";
import styles from "./Landing.module.css";

export function Landing({ go }) {
  const [ph, setPh] = useState("");
  const [cc, setCc] = useState("+1");
  return (
    <div className={styles.page}>
      <div className={styles.glowTop} />
      <div className={styles.glowBottom} />

      <Anim delay={0} type="fadeIn">
        <header className={styles.header}>
          <Logo />
          <div className={styles.headerActions}><Btn v="ghost" onClick={() => go("verify")}>Log in</Btn><Btn onClick={() => go("verify")}>Get started free</Btn></div>
        </header>
      </Anim>

      <section className={styles.hero}>
        <div>
          <Anim delay={100}><Badge>Free for your first 10 events</Badge></Anim>
          <Anim delay={200}><h1 className={styles.heroTitle}>Never forget<br />an important date<br /><span className={styles.heroAccent}>ever again.</span></h1></Anim>
          <Anim delay={300}><p className={styles.lead}>Candl sends you reminders via SMS, WhatsApp, or Telegram — you pick one — for birthdays, anniversaries, and any date that matters. No app to download.</p></Anim>
          <Anim delay={400}>
            <div className={styles.ctaRow}>
              <select className={styles.selectCountry} value={cc} onChange={e => setCc(e.target.value)}>
                {countries.map((c, i) => <option key={i} value={c.code}>{c.flag} {c.code}</option>)}
              </select>
              <div className={styles.telWrap}>
                <input className={styles.telInput} type="tel" placeholder="Phone number" value={ph} onChange={e => setPh(e.target.value)} />
              </div>
              <Btn sz="lg" onClick={() => go("verify")} className={styles.btnStart}>Start free →</Btn>
            </div>
            <p className={styles.ctaHint}>No credit card · Works worldwide · 30-second setup</p>
          </Anim>
        </div>

        <Anim delay={300} type="fadeUp" className={styles.mockWrap}>
          <div className={styles.mockInner}>
            <div className={styles.mockFrame}>
              <div className={styles.mockInnerScreen}>
                <div className={styles.mockStatus}><span>9:41</span><span>●●● 🔋</span></div>
                <div className={styles.mockHeader}>
                  <div className={styles.mockAvatar}>{I.cake(14, "#fff")}</div>
                  <div><div className={styles.mockBrand}>Candl</div><div className={styles.mockOnline}>online</div></div>
                </div>
                <div className={styles.mockBody}>
                  <Anim delay={600}><div className={styles.bubbleIn}>🎂 <strong>Tomorrow:</strong> Mom turns 58!</div><div className={styles.bubbleTime}>8:00 AM</div></Anim>
                  <Anim delay={900}><div className={styles.bubbleIn}>💡 She loved that scarf last year — maybe a matching bag?</div></Anim>
                  <Anim delay={1200} className={styles.bubbleOutWrap}><div className={styles.bubbleOut}>Thanks Candl! 🙏</div><div className={`${styles.bubbleTime} ${styles.bubbleTimeRight}`}>8:01 AM ✓✓</div></Anim>
                  <Anim delay={1500}><div className={styles.bubbleIn}>📅 <strong>Monthly digest:</strong> 3 events in April</div></Anim>
                </div>
              </div>
            </div>
            <Anim delay={800} className={`${styles.flyout} ${styles.flyoutTop}`}><div>{I.bell(15, B.accent)}</div><span className={styles.flyoutLabel}>Smart timing</span></Anim>
            <Anim delay={1000} className={`${styles.flyout} ${styles.flyoutBottom}`}><div>{I.msg(15, B.success)}</div><span className={`${styles.flyoutLabel} ${styles.flyoutSuccess}`}>Delivered ✓</span></Anim>
          </div>
        </Anim>
      </section>

      <section className={styles.section}>
        <Anim delay={200}><div className={styles.sectionHeading}><p className={styles.kicker}>How it works</p><h2 className={styles.h2}>Three steps. Thirty seconds.</h2></div></Anim>
        <div className={styles.stepsGrid}>
          {[{ n: "01", e: "📱", t: "Verify your number", d: "Enter your phone. Pick SMS, WhatsApp, or Telegram. That's your login — no password needed." }, { n: "02", e: "🎂", t: "Add your people", d: "Type names + dates, import from Facebook, or upload a spreadsheet." }, { n: "03", e: "🔔", t: "Get reminded", d: "We message you the day-of and in advance. Plus a monthly digest on the 1st." }].map((item, i) => (
            <Anim key={i} delay={300 + i * 120}><Card className={styles.cardCenter}><div className={styles.stepEmoji}>{item.e}</div><div className={styles.stepLabel}>STEP {item.n}</div><h3 className={styles.stepTitle}>{item.t}</h3><p className={styles.stepDesc}>{item.d}</p></Card></Anim>
          ))}
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.featuresGrid}>
          {[{ icon: I.msg(24, B.accent), t: "SMS, WhatsApp, or Telegram", d: "Choose your channel. Reminders land where you already are." }, { icon: I.cal(24, B.accent), t: "Facebook & CSV import", d: "Bring all your birthdays & events over in 30 seconds." }, { icon: I.bell(24, B.accent), t: "Smart timing", d: "Day-of + advance reminders. Monthly digest." }].map((f, i) => (
            <Anim key={i} delay={200 + i * 100}><div className={styles.featureRow}><div className={styles.featureIcon}>{f.icon}</div><div><h4 className={styles.featureTitle}>{f.t}</h4><p className={styles.featureText}>{f.d}</p></div></div></Anim>
          ))}
        </div>
      </section>

      <section className={styles.testimonials}>
        <div className={styles.testGrid}>
          {[{ name: "Priya K.", txt: "I stopped using Facebook but kept forgetting birthdays. Candl fixed that in 2 minutes.", av: "🧑‍💻" }, { name: "Amit R.", txt: "The Telegram bot is genius. I just type the name and date and it's done.", av: "👨‍🎨" }].map((t, i) => (
            <Anim key={i} delay={200 + i * 150}><Card><div className={styles.stars}>{[...Array(5)].map((_, j) => <span key={j}>{I.star()}</span>)}</div><p className={styles.quote}>"{t.txt}"</p><div className={styles.authorRow}><div className={styles.authorAvatar}>{t.av}</div><span className={styles.authorName}>{t.name}</span></div></Card></Anim>
          ))}
        </div>
      </section>

      <Anim delay={200}><section className={styles.pricingWrap}><Card className={styles.pricingCard}><Badge variant="gold">✨ Simple pricing</Badge><h3 className={styles.pricingTitle}>Free forever for 10 events</h3><p className={styles.pricingText}>Need more? Unlimited events for just <strong className={styles.pricingStrong}>$8/year</strong>. Less than a birthday card.</p><Btn sz="lg" onClick={() => go("verify")}>Get started free →</Btn></Card></section></Anim>

      <footer className={styles.footer}>
        <div className={styles.footerCopy}>{I.cake(14, B.hint)}<span className={styles.footerYear}>Candl © 2026</span></div>
        <div className={styles.footerLinks}>{["Privacy", "Terms", "Support"].map(x => <span key={x} className={styles.footerLink}>{x}</span>)}</div>
      </footer>
    </div>
  );
}
