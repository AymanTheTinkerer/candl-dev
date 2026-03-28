import { useState, useEffect } from "react";
import { I } from "../icons.jsx";
import styles from "../styles/ui.module.css";

const animHidden = {
  fadeUp: styles.animHiddenFadeUp,
  fadeIn: styles.animHiddenFadeIn,
  slideR: styles.animHiddenSlideR,
  scaleIn: styles.animHiddenScaleIn,
};

export const Btn = ({ children, onClick, v = "primary", sz = "md", full, className, disabled }) => {
  const variant = v === "primary" ? styles.btnPrimary : v === "secondary" ? styles.btnSecondary : v === "ghost" ? styles.btnGhost : styles.btnGold;
  const size = v === "ghost" ? null : sz === "lg" ? styles.btnLg : styles.btnMd;
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={[styles.btn, variant, size, full && styles.btnFull, className].filter(Boolean).join(" ")}
    >
      {children}
    </button>
  );
};

export const Inp = ({ label, placeholder, value, onChange, type = "text", prefix, className }) => (
  <div className={[styles.inpWrap, className].filter(Boolean).join(" ")}>
    {label && <label className={styles.inpLabel}>{label}</label>}
    <div className={styles.inpRow}>
      {prefix && <span className={styles.inpPrefix}>{prefix}</span>}
      <input className={styles.inpField} type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  </div>
);

const badgeVariant = {
  accent: styles.badgeAccent,
  gold: styles.badgeGold,
  success: styles.badgeSuccess,
  muted: styles.badgeMuted,
};

export const Badge = ({ children, variant = "accent", compact, className }) => (
  <span className={[styles.badge, badgeVariant[variant], compact && styles.badgeSmall, className].filter(Boolean).join(" ")}>{children}</span>
);

export const Card = ({ children, className, onClick }) => (
  <div onClick={onClick} className={[styles.card, onClick && styles.cardClickable, className].filter(Boolean).join(" ")}>{children}</div>
);

export const Logo = ({ size = "md" }) => (
  <div className={[styles.logo, size === "sm" ? styles.logoSm : styles.logoMd].join(" ")}>
    <div className={[styles.logoMark, size === "sm" && styles.logoMarkSm].filter(Boolean).join(" ")}>{I.cake(size === "sm" ? 16 : 18, "#fff")}</div>
    <span className={[styles.logoWord, size === "sm" && styles.logoWordSm].filter(Boolean).join(" ")}>candl</span>
  </div>
);

export const countries = [
  { code: "+1", flag: "🇺🇸", name: "US" }, { code: "+1", flag: "🇨🇦", name: "CA" }, { code: "+44", flag: "🇬🇧", name: "UK" }, { code: "+91", flag: "🇮🇳", name: "IN" },
  { code: "+61", flag: "🇦🇺", name: "AU" }, { code: "+49", flag: "🇩🇪", name: "DE" }, { code: "+33", flag: "🇫🇷", name: "FR" }, { code: "+81", flag: "🇯🇵", name: "JP" },
  { code: "+86", flag: "🇨🇳", name: "CN" }, { code: "+55", flag: "🇧🇷", name: "BR" }, { code: "+234", flag: "🇳🇬", name: "NG" }, { code: "+27", flag: "🇿🇦", name: "ZA" },
  { code: "+971", flag: "🇦🇪", name: "AE" }, { code: "+65", flag: "🇸🇬", name: "SG" }, { code: "+52", flag: "🇲🇽", name: "MX" }, { code: "+62", flag: "🇮🇩", name: "ID" },
  { code: "+82", flag: "🇰🇷", name: "KR" }, { code: "+39", flag: "🇮🇹", name: "IT" }, { code: "+34", flag: "🇪🇸", name: "ES" }, { code: "+7", flag: "🇷🇺", name: "RU" },
];

export const PhoneInput = ({ value, onChange, country, onCountryChange, className }) => (
  <div className={[styles.phoneWrap, className].filter(Boolean).join(" ")}>
    <label className={styles.phoneLabel}>Phone number</label>
    <div className={styles.phoneRow}>
      <div className={styles.phoneSelectWrap}>
        <select className={styles.phoneSelect} value={country} onChange={e => onCountryChange(e.target.value)}>
          {countries.map((c, i) => <option key={i} value={c.code}>{c.flag} {c.code}</option>)}
        </select>
        <div className={styles.phoneChevron}>▼</div>
      </div>
      <div className={styles.phoneInputWrap}>
        <input className={styles.phoneInput} type="tel" placeholder="Phone number" value={value} onChange={onChange} />
      </div>
    </div>
  </div>
);

export const Anim = ({ children, delay = 0, type = "fadeUp", className }) => {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div className={[styles.anim, show ? styles.animVisible : animHidden[type], className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
};

export const StepProgress = ({ s }) => (
  <div className={styles.stepProgress}>
    {[1, 2, 3].map(n => <div key={n} className={[styles.stepBar, n <= s && styles.stepBarOn].filter(Boolean).join(" ")} />)}
  </div>
);
