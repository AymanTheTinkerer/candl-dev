import { useState, useRef } from "react";
import { I } from "../icons.jsx";
import { Btn, Card, Logo, PhoneInput, Anim, StepProgress } from "../components/ui.jsx";
import styles from "./Verify.module.css";

export function Verify({ go }) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [cc, setCc] = useState("+1");
  const [channel, setChannel] = useState(null);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const refs = useRef([]);
  const handleOtp = (i, v) => { if (v.length > 1) return; const n = [...otp]; n[i] = v; setOtp(n); if (v && i < 5) refs.current[i + 1]?.focus(); };

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Anim delay={0}><Logo /><div className={styles.spacer40} /></Anim>
        <Anim delay={100}><StepProgress s={step} /></Anim>

        {step === 1 && (<Anim delay={150}>
          <h2 className={styles.h2}>What's your number?</h2>
          <p className={styles.lead}>Your phone number is your identity — no passwords to forget.</p>
          <PhoneInput value={phone} onChange={e => setPhone(e.target.value)} country={cc} onCountryChange={setCc} />
          <Btn full sz="lg" onClick={() => setStep(2)} className={styles.btnContinue}>Continue</Btn>
          <p className={styles.footerNote}>Already have an account? <span className={styles.link}>Log in</span></p>
        </Anim>)}

        {step === 2 && (<Anim delay={0} type="slideR">
          <h2 className={styles.h2}>Where should we reach you?</h2>
          <p className={styles.lead}>Pick how you'd like to receive reminders.</p>
          <div className={styles.channelList}>
            {[{ id: "telegram", emoji: "✈️", name: "Telegram", desc: "Rich messages & inline commands" }, { id: "whatsapp", emoji: "💬", name: "WhatsApp", desc: "Reminders via the app you already use" }, { id: "sms", emoji: "📱", name: "SMS", desc: "Simple text messages — works on any phone" }].map(ch => (
              <Card key={ch.id} onClick={() => setChannel(ch.id)} className={[styles.channelCard, channel === ch.id && styles.channelCardSelected].filter(Boolean).join(" ")}>
                <div className={styles.channelEmoji}>{ch.emoji}</div>
                <div className={styles.channelBody}><div className={styles.channelName}>{ch.name}</div><div className={styles.channelDesc}>{ch.desc}</div></div>
                {channel === ch.id && I.check()}
              </Card>
            ))}
          </div>
          <div className={styles.row}>
            <Btn v="secondary" onClick={() => setStep(1)} className={styles.flex1}>Back</Btn>
            <Btn onClick={() => setStep(3)} disabled={!channel} className={styles.flex2}>Send verification code</Btn>
          </div>
        </Anim>)}

        {step === 3 && (<Anim delay={0} type="slideR">
          <h2 className={styles.h2}>Enter the code</h2>
          <p className={styles.lead}>We sent a 6-digit code to your {channel === "telegram" ? "Telegram" : channel === "whatsapp" ? "WhatsApp" : "phone via SMS"}.</p>
          <div className={styles.otpRow}>
            {otp.map((d, i) => (
              <input
                key={i}
                ref={el => { refs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={e => handleOtp(i, e.target.value)}
                className={[styles.otpCell, d && styles.otpCellFilled].filter(Boolean).join(" ")}
              />
            ))}
          </div>
          <Btn full sz="lg" onClick={() => go("onboard")}>Verify & continue</Btn>
          <p className={styles.footerResend}>Didn't get it? <span className={styles.link}>Resend code</span></p>
        </Anim>)}
      </div>
    </div>
  );
}
