import { B } from "../theme.js";
import { I } from "../icons.jsx";
import { Btn, Card, Logo, Anim } from "../components/ui.jsx";
import styles from "../styles/Upgrade.module.css";

export function Upgrade({ go }) {
  return (
    <div className={styles.page}>
      <Anim delay={0} type="fadeIn"><header className={styles.header}><Logo size="sm" /><Btn v="ghost" onClick={() => go("dashboard")}>← Back to dashboard</Btn></header></Anim>

      <main className={styles.main}>
        <Anim delay={100}>
          <div className={styles.emoji}>🕯️</div>
          <h1 className={styles.h1}>Unlock <span className={styles.h1Accent}>unlimited</span></h1>
          <p className={styles.lead}>Never miss a birthday, anniversary, or important date — no matter how many people matter to you.</p>
        </Anim>

        <Anim delay={200}><div className={styles.grid}>
          <Card className={styles.plan}>
            <div className={styles.planMuted}>Free</div>
            <div className={styles.price}>$0</div>
            <div className={styles.hint}>forever</div>
            {["Up to 10 events", "Day-of reminders", "SMS, WhatsApp, or Telegram", "Manual entry"].map((f, i) => <div key={i} className={styles.featureRow}>{I.check(14, B.success)}<span>{f}</span></div>)}
            <div className={styles.featureList}><Btn v="secondary" full disabled>Current plan</Btn></div>
          </Card>
          <Card className={`${styles.plan} ${styles.proCard}`}>
            <div className={styles.ribbon}>BEST VALUE</div>
            <div className={`${styles.planMuted} ${styles.planGold}`}>{I.crown(14, B.gold)} Pro</div>
            <div className={styles.price}>$8<span className={styles.priceUnit}>/yr</span></div>
            <div className={styles.hint}>less than a birthday card</div>
            {["Unlimited events", "Advance + day-of reminders", "Monthly digest", "Facebook & CSV import", "Priority support"].map((f, i) => <div key={i} className={styles.featureRow}>{I.check(14, B.gold)}<span>{f}</span></div>)}
            <div className={styles.featureList}><Btn v="gold" full sz="lg">{I.zap(15, "#fff")} Upgrade to Pro</Btn></div>
          </Card>
        </div></Anim>

        <Anim delay={400}><div className={styles.trustRow}>
          {[{ icon: "🔒", label: "Secure via Stripe" }, { icon: "↩️", label: "Cancel anytime" }, { icon: "💬", label: "Email support" }].map((s, i) => <div key={i} className={styles.trustItem}><span>{s.icon}</span><span>{s.label}</span></div>)}
        </div></Anim>

        <Anim delay={500}><div className={styles.faq}>
          <h3 className={styles.faqTitle}>Common questions</h3>
          {[{ q: "What happens to my paused events?", a: "They're saved — upgrade and reminders activate instantly." }, { q: "Can I cancel anytime?", a: "Yes. You keep Pro until the end of your billing year." }, { q: "Is my data safe?", a: "We store your phone number and event dates. Nothing else. No ads, ever." }].map((faq, i) => (
            <Card key={i} className={styles.faqCard}><div className={styles.faqQ}>{faq.q}</div><div className={styles.faqA}>{faq.a}</div></Card>
          ))}
        </div></Anim>
      </main>
    </div>
  );
}
