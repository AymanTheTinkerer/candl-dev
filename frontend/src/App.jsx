import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   CANDL — High-Fidelity Clickable Prototype
   Screens: Landing → Verify → Onboard → Dashboard → Upgrade
   Brand: Warm & Premium (Headspace × Stripe)
   ═══════════════════════════════════════════ */

const B = {
  bg: "#FFF8F0", bgDeep: "#FEF3E8", dark: "#1A1410",
  accent: "#E8652D", accentHover: "#D4551E", accentSoft: "#FFF0E8", accentGlow: "rgba(232,101,45,0.12)",
  gold: "#D4A853", goldSoft: "#FFF8E8", goldGlow: "rgba(212,168,83,0.15)",
  text: "#1A1410", muted: "#6B6058", hint: "#A89E94",
  border: "#E8DFD4", borderLight: "#F0EBE4",
  card: "#FFFFFF", success: "#2D8A5E", successSoft: "#E8F5EE",
  warn: "#C4881D", warnSoft: "#FFF4E0",
};
const serif = `'Playfair Display', Georgia, 'Times New Roman', serif`;
const sans = `'DM Sans', 'Helvetica Neue', Helvetica, sans-serif`;

const Icon = ({ d, size = 20, color = B.accent, stroke = 2, fill = "none" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">{typeof d === "string" ? <path d={d} /> : d}</svg>
);
const I = {
  cake: (s=20,c=B.accent) => <Icon size={s} color={c} d={<><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/></>}/>,
  bell: (s=20,c=B.accent) => <Icon size={s} color={c} d={<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>}/>,
  msg: (s=20,c=B.accent) => <Icon size={s} color={c} d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
  cal: (s=20,c=B.accent) => <Icon size={s} color={c} d={<><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></>}/>,
  check: (s=18,c=B.success) => <Icon size={s} color={c} stroke={2.5} d="M20 6L9 17l-5-5"/>,
  plus: (s=18,c="#fff") => <Icon size={s} color={c} stroke={2.5} d={<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>}/>,
  upload: (s=20,c=B.hint) => <Icon size={s} color={c} d={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>}/>,
  chevR: (s=16,c=B.hint) => <Icon size={s} color={c} d="M9 18l6-6-6-6"/>,
  star: (s=14,c=B.gold) => <svg width={s} height={s} viewBox="0 0 24 24" fill={c} stroke={c} strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  settings: (s=18,c=B.hint) => <Icon size={s} color={c} d={<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>}/>,
  lock: (s=14,c=B.hint) => <Icon size={s} color={c} d={<><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>}/>,
  crown: (s=18,c=B.gold) => <Icon size={s} color={c} fill={B.goldSoft} d={<><path d="M2 4l3 12h14l3-12-5 4-5-4-5 4z"/><path d="M5 16h14v2H5z"/></>}/>,
  x: (s=16,c=B.hint) => <Icon size={s} color={c} d={<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>}/>,
  edit: (s=16,c=B.hint) => <Icon size={s} color={c} d={<><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>}/>,
  trash: (s=16,c="#C0564A") => <Icon size={s} color={c} d={<><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></>}/>,
  zap: (s=18,c=B.gold) => <Icon size={s} color={c} fill={B.goldSoft} d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>,
};

// ─── Shared UI ───
const Btn = ({children,onClick,v="primary",sz="md",full,style,disabled}) => {
  const base = {fontFamily:sans,fontWeight:600,borderRadius:12,border:"none",cursor:disabled?"not-allowed":"pointer",display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,transition:"all 0.2s ease",opacity:disabled?0.45:1,width:full?"100%":"auto",letterSpacing:"-0.01em"};
  const vars = {
    primary:{background:B.accent,color:"#fff",padding:sz==="lg"?"16px 32px":"12px 24px",fontSize:sz==="lg"?16:14},
    secondary:{background:"transparent",color:B.text,border:`1.5px solid ${B.border}`,padding:sz==="lg"?"14px 30px":"10px 22px",fontSize:sz==="lg"?16:14},
    ghost:{background:"transparent",color:B.muted,padding:"8px 16px",fontSize:14},
    gold:{background:`linear-gradient(135deg,${B.gold},#C49A3F)`,color:"#fff",padding:sz==="lg"?"16px 32px":"12px 24px",fontSize:sz==="lg"?16:14,boxShadow:`0 4px 20px ${B.goldGlow}`},
  };
  return <button onClick={disabled?undefined:onClick} style={{...base,...vars[v],...style}}>{children}</button>;
};
const Inp = ({label,placeholder,value,onChange,type="text",prefix,style}) => (
  <div style={{marginBottom:16,...style}}>
    {label && <label style={{display:"block",fontSize:12,fontWeight:600,color:B.muted,marginBottom:6,letterSpacing:"0.06em",textTransform:"uppercase",fontFamily:sans}}>{label}</label>}
    <div style={{display:"flex",alignItems:"center",background:"#fff",border:`1.5px solid ${B.border}`,borderRadius:12,padding:"12px 16px"}}>
      {prefix && <span style={{color:B.hint,marginRight:10,fontSize:15}}>{prefix}</span>}
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} style={{border:"none",outline:"none",background:"transparent",fontSize:15,fontFamily:sans,color:B.text,flex:1,width:"100%"}}/>
    </div>
  </div>
);
const Badge = ({children,color=B.accent,bg=B.accentSoft,style}) => (
  <span style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:20,fontSize:12,fontWeight:600,color,background:bg,fontFamily:sans,...style}}>{children}</span>
);
const Card = ({children,style,onClick}) => (
  <div onClick={onClick} style={{background:B.card,borderRadius:16,border:`1px solid ${B.border}`,padding:24,transition:"all 0.25s ease",cursor:onClick?"pointer":"default",...style}}>{children}</div>
);
const Logo = ({size="md"}) => (
  <div style={{display:"flex",alignItems:"center",gap:size==="sm"?8:10}}>
    <div style={{width:size==="sm"?30:36,height:size==="sm"?30:36,borderRadius:size==="sm"?8:10,background:B.accent,display:"flex",alignItems:"center",justifyContent:"center"}}>{I.cake(size==="sm"?16:18,"#fff")}</div>
    <span style={{fontFamily:serif,fontSize:size==="sm"?18:22,fontWeight:700,color:B.text,letterSpacing:"-0.02em"}}>candl</span>
  </div>
);
const countries = [
  {code:"+1",flag:"🇺🇸",name:"US"},{code:"+1",flag:"🇨🇦",name:"CA"},{code:"+44",flag:"🇬🇧",name:"UK"},{code:"+91",flag:"🇮🇳",name:"IN"},
  {code:"+61",flag:"🇦🇺",name:"AU"},{code:"+49",flag:"🇩🇪",name:"DE"},{code:"+33",flag:"🇫🇷",name:"FR"},{code:"+81",flag:"🇯🇵",name:"JP"},
  {code:"+86",flag:"🇨🇳",name:"CN"},{code:"+55",flag:"🇧🇷",name:"BR"},{code:"+234",flag:"🇳🇬",name:"NG"},{code:"+27",flag:"🇿🇦",name:"ZA"},
  {code:"+971",flag:"🇦🇪",name:"AE"},{code:"+65",flag:"🇸🇬",name:"SG"},{code:"+52",flag:"🇲🇽",name:"MX"},{code:"+62",flag:"🇮🇩",name:"ID"},
  {code:"+82",flag:"🇰🇷",name:"KR"},{code:"+39",flag:"🇮🇹",name:"IT"},{code:"+34",flag:"🇪🇸",name:"ES"},{code:"+7",flag:"🇷🇺",name:"RU"},
];
const PhoneInput = ({value,onChange,country,onCountryChange,style}) => (
  <div style={{marginBottom:16,...style}}>
    <label style={{display:"block",fontSize:12,fontWeight:600,color:B.muted,marginBottom:6,letterSpacing:"0.06em",textTransform:"uppercase",fontFamily:sans}}>Phone number</label>
    <div style={{display:"flex",gap:8}}>
      <div style={{position:"relative"}}>
        <select value={country} onChange={e=>onCountryChange(e.target.value)} style={{appearance:"none",background:"#fff",border:`1.5px solid ${B.border}`,borderRadius:12,padding:"12px 32px 12px 14px",fontSize:15,fontFamily:sans,color:B.text,cursor:"pointer",outline:"none",minWidth:100}}>
          {countries.map((c,i)=><option key={i} value={c.code}>{c.flag} {c.code}</option>)}
        </select>
        <div style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50)",pointerEvents:"none",fontSize:10,color:B.hint}}>▼</div>
      </div>
      <div style={{flex:1,display:"flex",alignItems:"center",background:"#fff",border:`1.5px solid ${B.border}`,borderRadius:12,padding:"12px 16px"}}>
        <input type="tel" placeholder="Phone number" value={value} onChange={onChange} style={{border:"none",outline:"none",background:"transparent",fontSize:15,fontFamily:sans,color:B.text,width:"100%"}}/>
      </div>
    </div>
  </div>
);
const Anim = ({children,delay=0,type="fadeUp",style}) => {
  const [show,setShow] = useState(false);
  useEffect(()=>{const t=setTimeout(()=>setShow(true),delay);return()=>clearTimeout(t);},[delay]);
  const tf = {fadeUp:"translateY(20px)",fadeIn:"none",slideR:"translateX(30px)",scaleIn:"scale(0.95)"};
  return <div style={{opacity:show?1:0,transform:show?"none":tf[type],transition:`all 0.6s cubic-bezier(0.16,1,0.3,1)`,...style}}>{children}</div>;
};

// ─── Prototype Nav ───
const NavBar = ({screen,go}) => {
  const tabs = [{id:"landing",l:"Landing",e:"🏠"},{id:"verify",l:"Verify",e:"📱"},{id:"onboard",l:"Onboard",e:"🎂"},{id:"dashboard",l:"Dashboard",e:"📋"},{id:"upgrade",l:"Upgrade",e:"⭐"}];
  return (
    <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:9999,background:B.dark,display:"flex",justifyContent:"center",gap:2,padding:"6px 12px",borderTop:"1px solid rgba(255,255,255,0.06)"}}>
      <div style={{position:"absolute",top:-26,left:"50%",transform:"translateX(-50%)",background:"rgba(26,20,16,0.85)",backdropFilter:"blur(8px)",borderRadius:8,padding:"4px 12px",fontSize:10,color:"rgba(255,255,255,0.5)",fontFamily:sans,whiteSpace:"nowrap",letterSpacing:"0.04em"}}>PROTOTYPE — Click to navigate</div>
      {tabs.map(t=><button key={t.id} onClick={()=>go(t.id)} style={{fontFamily:sans,fontSize:11,fontWeight:screen===t.id?700:500,color:screen===t.id?B.accent:"rgba(255,255,255,0.45)",background:screen===t.id?"rgba(232,101,45,0.12)":"transparent",border:"none",borderRadius:8,padding:"8px 14px",cursor:"pointer",transition:"all 0.2s",display:"flex",alignItems:"center",gap:5}}><span style={{fontSize:12}}>{t.e}</span>{t.l}</button>)}
    </div>
  );
};

/* ═══════════════════════════════════════════
   SCREEN 1 — LANDING PAGE
   ═══════════════════════════════════════════ */
const Landing = ({go}) => {
  const [ph,setPh] = useState("");
  const [cc,setCc] = useState("+1");
  return (
    <div style={{minHeight:"100vh",background:B.bg,paddingBottom:90,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-180,right:-120,width:500,height:500,borderRadius:"50%",background:`radial-gradient(circle,${B.accentGlow} 0%,transparent 70%)`,pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:-100,left:-100,width:380,height:380,borderRadius:"50%",background:`radial-gradient(circle,${B.goldGlow} 0%,transparent 70%)`,pointerEvents:"none"}}/>

      <Anim delay={0} type="fadeIn">
        <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 48px",maxWidth:1200,margin:"0 auto"}}>
          <Logo/>
          <div style={{display:"flex",gap:8}}><Btn v="ghost" onClick={()=>go("verify")}>Log in</Btn><Btn onClick={()=>go("verify")}>Get started free</Btn></div>
        </header>
      </Anim>

      <section style={{maxWidth:1200,margin:"0 auto",padding:"72px 48px 56px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center"}}>
        <div>
          <Anim delay={100}><Badge>Free for your first 10 events</Badge></Anim>
          <Anim delay={200}><h1 style={{fontFamily:serif,fontSize:50,fontWeight:700,lineHeight:1.08,marginTop:20,marginBottom:20,color:B.text,letterSpacing:"-0.025em"}}>Never forget<br/>an important date<br/><span style={{color:B.accent,fontStyle:"italic"}}>ever again.</span></h1></Anim>
          <Anim delay={300}><p style={{fontSize:17,lineHeight:1.65,color:B.muted,marginBottom:36,maxWidth:420,fontFamily:sans}}>Candl sends you reminders via SMS, WhatsApp, or Telegram — you pick one — for birthdays, anniversaries, and any date that matters. No app to download.</p></Anim>
          <Anim delay={400}>
            <div style={{display:"flex",gap:8,maxWidth:460}}>
              <select value={cc} onChange={e=>setCc(e.target.value)} style={{appearance:"none",background:"#fff",border:`2px solid ${B.border}`,borderRadius:14,padding:"13px 30px 13px 14px",fontSize:15,fontFamily:sans,color:B.text,cursor:"pointer",outline:"none",minWidth:95}}>
                {countries.map((c,i)=><option key={i} value={c.code}>{c.flag} {c.code}</option>)}
              </select>
              <div style={{flex:1,display:"flex",alignItems:"center",background:"#fff",border:`2px solid ${B.border}`,borderRadius:14,padding:"13px 16px"}}>
                <input type="tel" placeholder="Phone number" value={ph} onChange={e=>setPh(e.target.value)} style={{border:"none",outline:"none",background:"transparent",fontSize:15,fontFamily:sans,color:B.text,width:"100%"}}/>
              </div>
              <Btn sz="lg" onClick={()=>go("verify")} style={{whiteSpace:"nowrap",borderRadius:14}}>Start free →</Btn>
            </div>
            <p style={{fontSize:12,color:B.hint,marginTop:12,fontFamily:sans}}>No credit card · Works worldwide · 30-second setup</p>
          </Anim>
        </div>

        <Anim delay={300} type="fadeUp" style={{display:"flex",justifyContent:"center"}}>
          <div style={{position:"relative"}}>
            <div style={{width:280,borderRadius:32,background:B.dark,padding:10,boxShadow:"0 32px 80px rgba(26,20,16,0.18)"}}>
              <div style={{borderRadius:24,background:"#FAF5EE",overflow:"hidden"}}>
                <div style={{padding:"10px 18px 6px",display:"flex",justifyContent:"space-between",fontSize:11,fontWeight:600,color:B.muted,fontFamily:sans}}><span>9:41</span><span>●●● 🔋</span></div>
                <div style={{padding:"8px 18px 10px",borderBottom:`1px solid ${B.borderLight}`,display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:30,height:30,borderRadius:15,background:B.accent,display:"flex",alignItems:"center",justifyContent:"center"}}>{I.cake(14,"#fff")}</div>
                  <div><div style={{fontSize:13,fontWeight:600,fontFamily:sans}}>Candl</div><div style={{fontSize:10,color:B.success,fontFamily:sans}}>online</div></div>
                </div>
                <div style={{padding:14,display:"flex",flexDirection:"column",gap:8,minHeight:260}}>
                  <Anim delay={600}><div style={{background:B.accentSoft,borderRadius:"14px 14px 14px 4px",padding:"10px 14px",maxWidth:"82%",fontSize:13,lineHeight:1.5,fontFamily:sans}}>🎂 <strong>Tomorrow:</strong> Mom turns 58!</div><div style={{fontSize:9,color:B.hint,marginTop:3,marginLeft:4,fontFamily:sans}}>8:00 AM</div></Anim>
                  <Anim delay={900}><div style={{background:B.accentSoft,borderRadius:"14px 14px 14px 4px",padding:"10px 14px",maxWidth:"82%",fontSize:13,lineHeight:1.5,fontFamily:sans}}>💡 She loved that scarf last year — maybe a matching bag?</div></Anim>
                  <Anim delay={1200} style={{alignSelf:"flex-end"}}><div style={{background:B.accent,borderRadius:"14px 14px 4px 14px",padding:"10px 14px",maxWidth:"82%",fontSize:13,lineHeight:1.5,color:"#fff",fontFamily:sans}}>Thanks Candl! 🙏</div><div style={{fontSize:9,color:B.hint,marginTop:3,textAlign:"right",fontFamily:sans}}>8:01 AM ✓✓</div></Anim>
                  <Anim delay={1500}><div style={{background:B.accentSoft,borderRadius:"14px 14px 14px 4px",padding:"10px 14px",maxWidth:"82%",fontSize:13,lineHeight:1.5,fontFamily:sans}}>📅 <strong>Monthly digest:</strong> 3 events in April</div></Anim>
                </div>
              </div>
            </div>
            <Anim delay={800} style={{position:"absolute",top:-12,right:-36}}><div style={{background:B.card,borderRadius:12,padding:"8px 14px",boxShadow:"0 8px 24px rgba(26,20,16,0.1)",display:"flex",alignItems:"center",gap:7,border:`1px solid ${B.borderLight}`}}>{I.bell(15,B.accent)}<span style={{fontSize:12,fontWeight:600,fontFamily:sans}}>Smart timing</span></div></Anim>
            <Anim delay={1000} style={{position:"absolute",bottom:40,left:-44}}><div style={{background:B.card,borderRadius:12,padding:"8px 14px",boxShadow:"0 8px 24px rgba(26,20,16,0.1)",display:"flex",alignItems:"center",gap:7,border:`1px solid ${B.borderLight}`}}>{I.msg(15,B.success)}<span style={{fontSize:12,fontWeight:600,fontFamily:sans,color:B.success}}>Delivered ✓</span></div></Anim>
          </div>
        </Anim>
      </section>

      <section style={{maxWidth:1200,margin:"0 auto",padding:"56px 48px"}}>
        <Anim delay={200}><div style={{textAlign:"center",marginBottom:44}}><p style={{fontSize:12,fontWeight:700,color:B.accent,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8,fontFamily:sans}}>How it works</p><h2 style={{fontFamily:serif,fontSize:34,fontWeight:600,letterSpacing:"-0.02em"}}>Three steps. Thirty seconds.</h2></div></Anim>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}}>
          {[{n:"01",e:"📱",t:"Verify your number",d:"Enter your phone. Pick SMS, WhatsApp, or Telegram. That's your login — no password needed."},{n:"02",e:"🎂",t:"Add your people",d:"Type names + dates, import from Facebook, or upload a spreadsheet."},{n:"03",e:"🔔",t:"Get reminded",d:"We message you the day-of and in advance. Plus a monthly digest on the 1st."}].map((item,i)=>(
            <Anim key={i} delay={300+i*120}><Card style={{textAlign:"center",padding:32}}><div style={{fontSize:36,marginBottom:14}}>{item.e}</div><div style={{fontSize:11,fontWeight:700,color:B.accent,marginBottom:8,letterSpacing:"0.12em",fontFamily:sans}}>STEP {item.n}</div><h3 style={{fontSize:17,fontWeight:700,marginBottom:8,fontFamily:sans}}>{item.t}</h3><p style={{fontSize:14,color:B.muted,lineHeight:1.6,fontFamily:sans}}>{item.d}</p></Card></Anim>
          ))}
        </div>
      </section>

      <section style={{maxWidth:1200,margin:"0 auto",padding:"0 48px 56px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
          {[{icon:I.msg(24,B.accent),t:"SMS, WhatsApp, or Telegram",d:"Choose your channel. Reminders land where you already are."},{icon:I.cal(24,B.accent),t:"Facebook & CSV import",d:"Bring all your birthdays & events over in 30 seconds."},{icon:I.bell(24,B.accent),t:"Smart timing",d:"Day-of + advance reminders. Monthly digest."}].map((f,i)=>(
            <Anim key={i} delay={200+i*100}><div style={{display:"flex",gap:14,padding:20,borderRadius:14,background:B.accentSoft}}><div style={{flexShrink:0,width:44,height:44,borderRadius:12,background:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>{f.icon}</div><div><h4 style={{fontSize:14,fontWeight:700,marginBottom:3,fontFamily:sans}}>{f.t}</h4><p style={{fontSize:13,color:B.muted,lineHeight:1.5,fontFamily:sans}}>{f.d}</p></div></div></Anim>
          ))}
        </div>
      </section>

      <section style={{maxWidth:800,margin:"0 auto",padding:"0 48px 56px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
          {[{name:"Priya K.",txt:"I stopped using Facebook but kept forgetting birthdays. Candl fixed that in 2 minutes.",av:"🧑‍💻"},{name:"Amit R.",txt:"The Telegram bot is genius. I just type the name and date and it's done.",av:"👨‍🎨"}].map((t,i)=>(
            <Anim key={i} delay={200+i*150}><Card><div style={{display:"flex",gap:3,marginBottom:10}}>{[...Array(5)].map((_,j)=><span key={j}>{I.star()}</span>)}</div><p style={{fontSize:14,lineHeight:1.65,marginBottom:14,fontStyle:"italic",fontFamily:sans}}>"{t.txt}"</p><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:28,height:28,borderRadius:14,background:B.accentSoft,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>{t.av}</div><span style={{fontSize:12,fontWeight:600,color:B.muted,fontFamily:sans}}>{t.name}</span></div></Card></Anim>
          ))}
        </div>
      </section>

      <Anim delay={200}><section style={{maxWidth:540,margin:"0 auto",padding:"0 48px 72px",textAlign:"center"}}><Card style={{padding:40,border:`2px solid ${B.gold}`}}><Badge color={B.gold} bg={B.goldSoft}>✨ Simple pricing</Badge><h3 style={{fontFamily:serif,fontSize:26,fontWeight:600,margin:"16px 0 8px",letterSpacing:"-0.02em"}}>Free forever for 10 events</h3><p style={{fontSize:15,color:B.muted,marginBottom:24,fontFamily:sans}}>Need more? Unlimited events for just <strong style={{color:B.text}}>$8/year</strong>. Less than a birthday card.</p><Btn sz="lg" onClick={()=>go("verify")}>Get started free →</Btn></Card></section></Anim>

      <footer style={{maxWidth:1200,margin:"0 auto",padding:"24px 48px",borderTop:`1px solid ${B.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}>{I.cake(14,B.hint)}<span style={{fontSize:12,color:B.hint,fontFamily:sans}}>Candl © 2026</span></div>
        <div style={{display:"flex",gap:20}}>{["Privacy","Terms","Support"].map(x=><span key={x} style={{fontSize:12,color:B.hint,cursor:"pointer",fontFamily:sans}}>{x}</span>)}</div>
      </footer>
    </div>
  );
};

/* ═══════════════════════════════════════════
   SCREEN 2 — VERIFICATION
   ═══════════════════════════════════════════ */
const Verify = ({go}) => {
  const [step,setStep]=useState(1);
  const [phone,setPhone]=useState("");
  const [cc,setCc]=useState("+1");
  const [channel,setChannel]=useState(null);
  const [otp,setOtp]=useState(["","","","","",""]);
  const refs=useRef([]);
  const handleOtp=(i,v)=>{if(v.length>1)return;const n=[...otp];n[i]=v;setOtp(n);if(v&&i<5)refs.current[i+1]?.focus();};
  const Prog=({s})=><div style={{display:"flex",gap:8,marginBottom:32}}>{[1,2,3].map(n=><div key={n} style={{flex:1,height:3,borderRadius:2,background:n<=s?B.accent:B.border,transition:"background 0.4s"}}/>)}</div>;

  return (
    <div style={{minHeight:"100vh",background:B.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 24px 90px"}}>
      <div style={{width:"100%",maxWidth:420}}>
        <Anim delay={0}><Logo/><div style={{height:40}}/></Anim>
        <Anim delay={100}><Prog s={step}/></Anim>

        {step===1&&(<Anim delay={150}>
          <h2 style={{fontFamily:serif,fontSize:28,fontWeight:600,marginBottom:8,letterSpacing:"-0.02em"}}>What's your number?</h2>
          <p style={{color:B.muted,marginBottom:28,lineHeight:1.6,fontFamily:sans,fontSize:15}}>Your phone number is your identity — no passwords to forget.</p>
          <PhoneInput value={phone} onChange={e=>setPhone(e.target.value)} country={cc} onCountryChange={setCc}/>
          <Btn full sz="lg" onClick={()=>setStep(2)} style={{marginTop:8}}>Continue</Btn>
          <p style={{textAlign:"center",marginTop:20,fontSize:13,color:B.hint,fontFamily:sans}}>Already have an account? <span style={{color:B.accent,fontWeight:600,cursor:"pointer"}}>Log in</span></p>
        </Anim>)}

        {step===2&&(<Anim delay={0} type="slideR">
          <h2 style={{fontFamily:serif,fontSize:28,fontWeight:600,marginBottom:8,letterSpacing:"-0.02em"}}>Where should we reach you?</h2>
          <p style={{color:B.muted,marginBottom:28,lineHeight:1.6,fontFamily:sans,fontSize:15}}>Pick how you'd like to receive reminders.</p>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {[{id:"telegram",emoji:"✈️",name:"Telegram",desc:"Rich messages & inline commands"},{id:"whatsapp",emoji:"💬",name:"WhatsApp",desc:"Reminders via the app you already use"},{id:"sms",emoji:"📱",name:"SMS",desc:"Simple text messages — works on any phone"}].map(ch=>(
              <Card key={ch.id} onClick={()=>setChannel(ch.id)} style={{padding:18,display:"flex",alignItems:"center",gap:14,border:channel===ch.id?`2px solid ${B.accent}`:`1.5px solid ${B.border}`,background:channel===ch.id?B.accentSoft:B.card,cursor:"pointer"}}>
                <div style={{fontSize:26}}>{ch.emoji}</div>
                <div style={{flex:1}}><div style={{fontWeight:600,fontSize:15,fontFamily:sans}}>{ch.name}</div><div style={{fontSize:13,color:B.muted,fontFamily:sans}}>{ch.desc}</div></div>
                {channel===ch.id&&I.check()}
              </Card>
            ))}
          </div>
          <div style={{display:"flex",gap:10,marginTop:24}}>
            <Btn v="secondary" onClick={()=>setStep(1)} style={{flex:1}}>Back</Btn>
            <Btn onClick={()=>setStep(3)} disabled={!channel} style={{flex:2}}>Send verification code</Btn>
          </div>
        </Anim>)}

        {step===3&&(<Anim delay={0} type="slideR">
          <h2 style={{fontFamily:serif,fontSize:28,fontWeight:600,marginBottom:8,letterSpacing:"-0.02em"}}>Enter the code</h2>
          <p style={{color:B.muted,marginBottom:28,lineHeight:1.6,fontFamily:sans,fontSize:15}}>We sent a 6-digit code to your {channel==="telegram"?"Telegram":channel==="whatsapp"?"WhatsApp":"phone via SMS"}.</p>
          <div style={{display:"flex",gap:8,marginBottom:28}}>
            {otp.map((d,i)=><input key={i} ref={el=>refs.current[i]=el} type="text" inputMode="numeric" maxLength={1} value={d} onChange={e=>handleOtp(i,e.target.value)} style={{width:52,height:58,textAlign:"center",fontSize:22,fontWeight:700,fontFamily:sans,border:`2px solid ${d?B.accent:B.border}`,borderRadius:12,outline:"none",background:d?B.accentSoft:"#fff",transition:"all 0.2s",color:B.text}}/>)}
          </div>
          <Btn full sz="lg" onClick={()=>go("onboard")}>Verify & continue</Btn>
          <p style={{textAlign:"center",marginTop:16,fontSize:13,color:B.hint,fontFamily:sans}}>Didn't get it? <span style={{color:B.accent,fontWeight:600,cursor:"pointer"}}>Resend code</span></p>
        </Anim>)}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   SCREEN 3 — ONBOARDING
   ═══════════════════════════════════════════ */
const Onboard = ({go}) => {
  const [step,setStep]=useState(1);
  const [name,setName]=useState("");
  const [date,setDate]=useState("");
  const [etype,setEtype]=useState("birthday");
  const [events,setEvents]=useState([]);
  const [showFb,setShowFb]=useState(false);
  const addEvent=()=>{if(name&&date){setEvents([...events,{name,date,type:etype}]);setName("");setDate("");}};
  const Prog=({s})=><div style={{display:"flex",gap:8,marginBottom:32}}>{[1,2,3].map(n=><div key={n} style={{flex:1,height:3,borderRadius:2,background:n<=s?B.accent:B.border,transition:"background 0.4s"}}/>)}</div>;

  return (
    <div style={{minHeight:"100vh",background:B.bg,display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 24px 90px"}}>
      <div style={{width:"100%",maxWidth:500}}>
        <Anim delay={0}><div style={{display:"flex",alignItems:"center",marginBottom:36}}><Logo/><div style={{marginLeft:"auto"}}><Badge color={B.success} bg={B.successSoft}>✓ Verified</Badge></div></div></Anim>
        <Anim delay={100}><Prog s={step}/></Anim>

        {step===1&&(<Anim delay={150}>
          <h2 style={{fontFamily:serif,fontSize:28,fontWeight:600,marginBottom:8,letterSpacing:"-0.02em"}}>Add your first events</h2>
          <p style={{color:B.muted,marginBottom:24,lineHeight:1.6,fontFamily:sans,fontSize:15}}>Start with the birthdays you know by heart.</p>
          <Card style={{marginBottom:16,padding:20}}>
            <Inp label="Name" placeholder="e.g. Mom, Ravi, Sarah" value={name} onChange={e=>setName(e.target.value)} style={{marginBottom:12}}/>
            <Inp label="Date" placeholder="e.g. March 15 or 03/15/1968" value={date} onChange={e=>setDate(e.target.value)} style={{marginBottom:12}}/>
            <div style={{marginBottom:16}}>
              <label style={{display:"block",fontSize:12,fontWeight:600,color:B.muted,marginBottom:6,letterSpacing:"0.06em",textTransform:"uppercase",fontFamily:sans}}>Type</label>
              <div style={{display:"flex",gap:6}}>
                {[{id:"birthday",l:"🎂 Birthday"},{id:"anniversary",l:"💍 Anniversary"},{id:"custom",l:"📌 Custom"}].map(t=>(
                  <button key={t.id} onClick={()=>setEtype(t.id)} style={{fontFamily:sans,fontSize:13,fontWeight:600,padding:"7px 14px",borderRadius:8,cursor:"pointer",border:"none",background:etype===t.id?B.accent:B.accentSoft,color:etype===t.id?"#fff":B.text,transition:"all 0.2s"}}>{t.l}</button>
                ))}
              </div>
            </div>
            <Btn full onClick={addEvent} disabled={!name||!date}>{I.plus(15)} Add event</Btn>
          </Card>
          {events.length>0&&<div style={{marginBottom:16}}>{events.map((ev,i)=><Anim key={i} delay={0} type="scaleIn"><div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:B.successSoft,borderRadius:10,marginBottom:6}}>{I.check(15)}<span style={{fontSize:14,fontWeight:500,fontFamily:sans}}>{ev.name}</span><span style={{fontSize:13,color:B.muted,marginLeft:"auto",fontFamily:sans}}>{ev.date}</span></div></Anim>)}</div>}
          <div style={{display:"flex",gap:10}}>
            <Btn v="secondary" full onClick={()=>setStep(2)}>Skip for now</Btn>
            {events.length>0&&<Btn full onClick={()=>setStep(2)}>Continue ({events.length})</Btn>}
          </div>
        </Anim>)}

        {step===2&&(<Anim delay={0} type="slideR">
          <h2 style={{fontFamily:serif,fontSize:28,fontWeight:600,marginBottom:8,letterSpacing:"-0.02em"}}>Import your birthdays</h2>
          <p style={{color:B.muted,marginBottom:24,lineHeight:1.6,fontFamily:sans,fontSize:15}}>Got birthdays saved somewhere? Bring them all in.</p>
          <Card onClick={()=>setShowFb(!showFb)} style={{marginBottom:12,padding:18,cursor:"pointer"}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:44,height:44,borderRadius:12,background:"#1877F2",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:20,fontWeight:700,fontFamily:sans}}>f</div>
              <div style={{flex:1}}><div style={{fontWeight:600,fontSize:15,fontFamily:sans}}>Import from Facebook</div><div style={{fontSize:13,color:B.muted,fontFamily:sans}}>We'll walk you through it</div></div>
              <div style={{transform:showFb?"rotate(90deg)":"none",transition:"transform 0.2s"}}>{I.chevR()}</div>
            </div>
            {showFb&&(<Anim delay={0} type="fadeUp"><div style={{marginTop:14,padding:16,background:B.bg,borderRadius:12,border:`1px dashed ${B.border}`}} onClick={e=>e.stopPropagation()}>
              <div style={{fontSize:11,fontWeight:700,color:B.accent,marginBottom:12,textTransform:"uppercase",letterSpacing:"0.06em",fontFamily:sans}}>Quick walkthrough</div>
              {["Go to Facebook → Settings → Download Your Information","Select 'Friends' data only, JSON format","Download the file and upload it here"].map((s,i)=><div key={i} style={{display:"flex",gap:10,marginBottom:8,fontSize:13,color:B.muted,fontFamily:sans,alignItems:"flex-start"}}><span style={{width:20,height:20,borderRadius:10,background:B.accent,color:"#fff",fontSize:10,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>{i+1}</span><span>{s}</span></div>)}
              <div style={{marginTop:12,padding:20,border:`2px dashed ${B.border}`,borderRadius:12,textAlign:"center",cursor:"pointer",background:"#fff"}}>{I.upload(22,B.hint)}<div style={{fontSize:13,color:B.hint,marginTop:6,fontFamily:sans}}>Drop your Facebook export here</div></div>
            </div></Anim>)}
          </Card>
          <Card style={{marginBottom:12,padding:18,cursor:"pointer"}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:44,height:44,borderRadius:12,background:B.accentSoft,display:"flex",alignItems:"center",justifyContent:"center"}}>{I.upload(20,B.accent)}</div>
              <div style={{flex:1}}><div style={{fontWeight:600,fontSize:15,fontFamily:sans}}>Upload a CSV / spreadsheet</div><div style={{fontSize:13,color:B.muted,fontFamily:sans}}>Columns: Name, Date (any format)</div></div>
              {I.chevR()}
            </div>
          </Card>
          <div style={{display:"flex",gap:10,marginTop:24}}><Btn v="secondary" onClick={()=>setStep(1)} style={{flex:1}}>Back</Btn><Btn onClick={()=>setStep(3)} style={{flex:2}}>Continue</Btn></div>
        </Anim>)}

        {step===3&&(<Anim delay={0} type="scaleIn"><div style={{textAlign:"center",padding:"32px 0"}}>
          <div style={{fontSize:56,marginBottom:20}}>🎉</div>
          <h2 style={{fontFamily:serif,fontSize:30,fontWeight:600,marginBottom:10,letterSpacing:"-0.02em"}}>You're all set!</h2>
          <p style={{fontSize:16,color:B.muted,marginBottom:8,lineHeight:1.6,fontFamily:sans}}>Candl will message you when it's time.</p>
          <p style={{fontSize:14,color:B.muted,marginBottom:28,fontFamily:sans}}>You can also add events anytime via the bot.</p>
          {events.length>0&&<div style={{background:B.successSoft,borderRadius:12,padding:"12px 20px",display:"inline-flex",alignItems:"center",gap:8,marginBottom:24}}>{I.check(16)}<span style={{fontSize:14,fontWeight:600,color:B.success,fontFamily:sans}}>{events.length} event{events.length>1?"s":""} saved</span></div>}
          <div><Btn sz="lg" onClick={()=>go("dashboard")}>Go to dashboard →</Btn></div>
        </div></Anim>)}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   SCREEN 4 — DASHBOARD
   ═══════════════════════════════════════════ */
const Dashboard = ({go}) => {
  const [tab,setTab]=useState("upcoming");
  const [showAdd,setShowAdd]=useState(false);
  const [nn,setNn]=useState("");
  const [nd,setNd]=useState("");

  const evts = [
    {name:"Mom",date:"Mar 22",days:3,type:"birthday",age:58},
    {name:"Ravi",date:"Apr 1",days:13,type:"birthday",age:30},
    {name:"Sarah & Tom",date:"Apr 14",days:26,type:"anniversary",age:null},
    {name:"Dad",date:"May 8",days:50,type:"birthday",age:62},
    {name:"Priya",date:"Jun 3",days:76,type:"birthday",age:28},
  ];
  const paused = [{name:"Jake",date:"Jul 12",type:"birthday"},{name:"Office party",date:"Dec 20",type:"custom"}];

  return (
    <div style={{minHeight:"100vh",background:B.bg,paddingBottom:90}}>
      <Anim delay={0} type="fadeIn">
        <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 32px",maxWidth:900,margin:"0 auto",borderBottom:`1px solid ${B.borderLight}`}}>
          <Logo size="sm"/>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <Badge color={B.muted} bg={B.bgDeep} style={{fontSize:11}}>Free · 10/10 events</Badge>
            <Btn v="gold" onClick={()=>go("upgrade")} style={{padding:"8px 16px",fontSize:13}}>{I.zap(14,"#fff")} Upgrade</Btn>
            <div style={{width:32,height:32,borderRadius:16,background:B.accentSoft,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>{I.settings()}</div>
          </div>
        </header>
      </Anim>

      <main style={{maxWidth:900,margin:"0 auto",padding:"32px 32px"}}>
        <Anim delay={100}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:28}}>
          <div><h1 style={{fontFamily:serif,fontSize:28,fontWeight:600,marginBottom:4,letterSpacing:"-0.02em"}}>Your events</h1><p style={{fontSize:14,color:B.muted,fontFamily:sans}}>Next up: <strong style={{color:B.text}}>Mom's birthday</strong> in 3 days</p></div>
          <Btn onClick={()=>setShowAdd(!showAdd)}>{I.plus(15)} Add event</Btn>
        </div></Anim>

        {showAdd&&(<Anim delay={0} type="scaleIn"><Card style={{marginBottom:20,padding:20,border:`2px solid ${B.accent}`}}>
          <div style={{display:"flex",gap:12,alignItems:"flex-end"}}>
            <div style={{flex:2}}><Inp label="Name" placeholder="Who?" value={nn} onChange={e=>setNn(e.target.value)} style={{marginBottom:0}}/></div>
            <div style={{flex:2}}><Inp label="Date" placeholder="When?" value={nd} onChange={e=>setNd(e.target.value)} style={{marginBottom:0}}/></div>
            <Btn disabled={!nn||!nd} style={{height:46}}>Add</Btn>
            <button onClick={()=>setShowAdd(false)} style={{background:"none",border:"none",cursor:"pointer",padding:8}}>{I.x()}</button>
          </div>
        </Card></Anim>)}

        <Anim delay={200}><div style={{display:"flex",gap:4,marginBottom:20,background:B.bgDeep,borderRadius:10,padding:3,width:"fit-content"}}>
          {[{id:"upcoming",l:"Upcoming"},{id:"all",l:"All events"},{id:"paused",l:"Paused"}].map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{fontFamily:sans,fontSize:13,fontWeight:tab===t.id?600:500,color:tab===t.id?B.text:B.muted,background:tab===t.id?B.card:"transparent",border:"none",borderRadius:8,padding:"8px 16px",cursor:"pointer",transition:"all 0.2s",boxShadow:tab===t.id?"0 1px 4px rgba(0,0,0,0.06)":"none"}}>{t.l}{t.id==="paused"&&<span style={{marginLeft:5,fontSize:11,color:B.warn,fontWeight:700}}>2</span>}</button>
          ))}
        </div></Anim>

        {(tab==="upcoming"||tab==="all")&&<div style={{display:"flex",flexDirection:"column",gap:8}}>
          {evts.map((ev,i)=>(
            <Anim key={i} delay={250+i*60}><Card style={{padding:"16px 20px",display:"flex",alignItems:"center",gap:16}}>
              <div style={{width:44,height:44,borderRadius:14,background:ev.days<=7?B.accentSoft:B.bgDeep,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{ev.type==="birthday"?"🎂":ev.type==="anniversary"?"💍":"📌"}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:15,fontWeight:600,fontFamily:sans}}>{ev.name}</span>{ev.days<=7&&<Badge color={B.accent} bg={B.accentSoft} style={{fontSize:11,padding:"2px 8px"}}>Soon!</Badge>}</div>
                <div style={{fontSize:13,color:B.muted,fontFamily:sans,marginTop:2}}>{ev.date}{ev.age?` · Turning ${ev.age}`:""} · <span style={{color:ev.days<=7?B.accent:B.muted,fontWeight:ev.days<=7?600:400}}>{ev.days}d away</span></div>
              </div>
              <div style={{display:"flex",gap:6}}>
                <button style={{background:"none",border:"none",cursor:"pointer",padding:6,borderRadius:8}}>{I.edit()}</button>
                <button style={{background:"none",border:"none",cursor:"pointer",padding:6,borderRadius:8}}>{I.trash()}</button>
              </div>
            </Card></Anim>
          ))}
        </div>}

        {tab==="paused"&&<div>
          <Anim delay={200}><Card style={{padding:20,marginBottom:12,background:B.warnSoft,border:`1px solid ${B.warn}22`}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>{I.lock(16,B.warn)}<span style={{fontSize:14,fontWeight:600,fontFamily:sans,color:B.warn}}>2 events paused</span></div>
            <p style={{fontSize:13,color:B.muted,fontFamily:sans,marginBottom:12}}>You've hit the free limit. Upgrade to activate all reminders.</p>
            <Btn v="gold" onClick={()=>go("upgrade")} style={{padding:"8px 16px",fontSize:13}}>{I.zap(14,"#fff")} Unlock unlimited — $8/yr</Btn>
          </Card></Anim>
          {paused.map((ev,i)=>(
            <Anim key={i} delay={300+i*60}><Card style={{padding:"14px 20px",display:"flex",alignItems:"center",gap:14,opacity:0.6,marginBottom:8}}>
              <div style={{width:40,height:40,borderRadius:12,background:B.bgDeep,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{ev.type==="birthday"?"🎂":"📌"}</div>
              <div style={{flex:1}}><span style={{fontSize:14,fontWeight:600,fontFamily:sans}}>{ev.name}</span><div style={{fontSize:12,color:B.hint,fontFamily:sans}}>{ev.date}</div></div>
              {I.lock(14,B.hint)}
            </Card></Anim>
          ))}
        </div>}

        <Anim delay={500}><div style={{marginTop:32,padding:24,background:B.bgDeep,borderRadius:16,border:`1px solid ${B.borderLight}`}}>
          <h3 style={{fontSize:15,fontWeight:700,marginBottom:16,fontFamily:sans,display:"flex",alignItems:"center",gap:8}}>{I.settings(16,B.muted)} Reminder settings</h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {[{label:"Day-of reminder",value:"8:00 AM",on:true},{label:"Advance reminder",value:"3 days before",on:true},{label:"Monthly digest",value:"1st of month",on:true},{label:"Channel",value:"Telegram ✈️",on:true}].map((s,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:B.card,borderRadius:10,border:`1px solid ${B.borderLight}`}}>
                <div><div style={{fontSize:13,fontWeight:600,fontFamily:sans}}>{s.label}</div><div style={{fontSize:12,color:B.muted,fontFamily:sans}}>{s.value}</div></div>
                <div style={{width:36,height:20,borderRadius:10,background:s.on?B.success:B.border,position:"relative",cursor:"pointer"}}><div style={{width:16,height:16,borderRadius:8,background:"#fff",position:"absolute",top:2,left:s.on?18:2,transition:"left 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.15)"}}/></div>
              </div>
            ))}
          </div>
        </div></Anim>
      </main>
    </div>
  );
};

/* ═══════════════════════════════════════════
   SCREEN 5 — UPGRADE / PAYWALL
   ═══════════════════════════════════════════ */
const Upgrade = ({go}) => (
  <div style={{minHeight:"100vh",background:B.bg,paddingBottom:90}}>
    <Anim delay={0} type="fadeIn"><header style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 32px",maxWidth:900,margin:"0 auto"}}><Logo size="sm"/><Btn v="ghost" onClick={()=>go("dashboard")}>← Back to dashboard</Btn></header></Anim>

    <main style={{maxWidth:600,margin:"0 auto",padding:"40px 32px",textAlign:"center"}}>
      <Anim delay={100}>
        <div style={{fontSize:48,marginBottom:16}}>🕯️</div>
        <h1 style={{fontFamily:serif,fontSize:36,fontWeight:700,marginBottom:10,letterSpacing:"-0.025em"}}>Unlock <span style={{color:B.gold,fontStyle:"italic"}}>unlimited</span></h1>
        <p style={{fontSize:16,color:B.muted,marginBottom:40,fontFamily:sans,maxWidth:400,margin:"0 auto 40px"}}>Never miss a birthday, anniversary, or important date — no matter how many people matter to you.</p>
      </Anim>

      <Anim delay={200}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:40}}>
        <Card style={{padding:28,textAlign:"left"}}>
          <div style={{fontSize:13,fontWeight:700,color:B.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:12,fontFamily:sans}}>Free</div>
          <div style={{fontFamily:serif,fontSize:28,fontWeight:700,marginBottom:4}}>$0</div>
          <div style={{fontSize:13,color:B.hint,marginBottom:20,fontFamily:sans}}>forever</div>
          {["Up to 10 events","Day-of reminders","SMS, WhatsApp, or Telegram","Manual entry"].map((f,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,fontSize:14,fontFamily:sans}}>{I.check(14,B.success)}<span>{f}</span></div>)}
          <div style={{marginTop:16}}><Btn v="secondary" full disabled>Current plan</Btn></div>
        </Card>
        <Card style={{padding:28,textAlign:"left",border:`2px solid ${B.gold}`,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:14,right:-28,background:B.gold,color:"#fff",fontSize:10,fontWeight:700,padding:"3px 32px",transform:"rotate(45deg)",fontFamily:sans,letterSpacing:"0.04em"}}>BEST VALUE</div>
          <div style={{fontSize:13,fontWeight:700,color:B.gold,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:12,fontFamily:sans,display:"flex",alignItems:"center",gap:6}}>{I.crown(14,B.gold)} Pro</div>
          <div style={{fontFamily:serif,fontSize:28,fontWeight:700,marginBottom:4}}>$8<span style={{fontSize:16,fontWeight:500,color:B.muted}}>/yr</span></div>
          <div style={{fontSize:13,color:B.hint,marginBottom:20,fontFamily:sans}}>less than a birthday card</div>
          {["Unlimited events","Advance + day-of reminders","Monthly digest","Facebook & CSV import","Priority support"].map((f,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,fontSize:14,fontFamily:sans}}>{I.check(14,B.gold)}<span>{f}</span></div>)}
          <div style={{marginTop:16}}><Btn v="gold" full sz="lg">{I.zap(15,"#fff")} Upgrade to Pro</Btn></div>
        </Card>
      </div></Anim>

      <Anim delay={400}><div style={{display:"flex",justifyContent:"center",gap:32,marginBottom:32}}>
        {[{icon:"🔒",label:"Secure via Stripe"},{icon:"↩️",label:"Cancel anytime"},{icon:"💬",label:"Email support"}].map((s,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:6,fontSize:13,color:B.muted,fontFamily:sans}}><span>{s.icon}</span><span>{s.label}</span></div>)}
      </div></Anim>

      <Anim delay={500}><div style={{textAlign:"left",maxWidth:480,margin:"0 auto"}}>
        <h3 style={{fontSize:16,fontWeight:700,marginBottom:16,fontFamily:sans}}>Common questions</h3>
        {[{q:"What happens to my paused events?",a:"They're saved — upgrade and reminders activate instantly."},{q:"Can I cancel anytime?",a:"Yes. You keep Pro until the end of your billing year."},{q:"Is my data safe?",a:"We store your phone number and event dates. Nothing else. No ads, ever."}].map((faq,i)=>(
          <Card key={i} style={{padding:16,marginBottom:8}}><div style={{fontSize:14,fontWeight:600,marginBottom:4,fontFamily:sans}}>{faq.q}</div><div style={{fontSize:13,color:B.muted,lineHeight:1.6,fontFamily:sans}}>{faq.a}</div></Card>
        ))}
      </div></Anim>
    </main>
  </div>
);

/* ═══════════════════════════════════════════
   APP SHELL
   ═══════════════════════════════════════════ */
export default function App() {
  const [screen,setScreen] = useState("landing");
  const go = (s) => { setScreen(s); window.scrollTo({top:0,behavior:"smooth"}); };

  return (<>
    <style>{`
      *{margin:0;padding:0;box-sizing:border-box;}
      body{background:${B.bg};font-family:'DM Sans','Helvetica Neue',Helvetica,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}
      ::selection{background:${B.accentSoft};color:${B.accent};}
      input::placeholder{color:${B.hint};}
      button:active{transform:scale(0.98)!important;}
      html{scroll-behavior:smooth;}
    `}</style>
    {screen==="landing"&&<Landing go={go}/>}
    {screen==="verify"&&<Verify go={go}/>}
    {screen==="onboard"&&<Onboard go={go}/>}
    {screen==="dashboard"&&<Dashboard go={go}/>}
    {screen==="upgrade"&&<Upgrade go={go}/>}
    <NavBar screen={screen} go={go}/>
  </>);
}
