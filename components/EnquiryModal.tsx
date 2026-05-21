"use client";
import { useState, useEffect } from "react";
import { useLang } from "@/lib/LangContext";
import { T, t } from "@/lib/i18n";
import { PLANS, type Plan } from "@/lib/plans";
import { openWA } from "@/lib/whatsapp";

const STATES = [
  "Selangor","Kuala Lumpur","Putrajaya","Johor","Penang","Perak",
  "Negeri Sembilan","Melaka","Kedah","Pahang","Kelantan","Terengganu","Sabah","Sarawak",
];
const HOME_TYPES = ["Landed", "Condo / Apartment", "Office / Shop"];

interface Form {
  plan: string; state: string; addressType: string;
  name: string; phone: string; email: string; note: string;
}

interface Props {
  open: boolean;
  prefillPlan: Plan | null;
  onClose: () => void;
}

export default function EnquiryModal({ open, prefillPlan, onClose }: Props) {
  const { lang } = useLang();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<Form>({
    plan: prefillPlan?.id ?? "p500", state: "", addressType: "Landed",
    name: "", phone: "", email: "", note: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});

  useEffect(() => {
    if (prefillPlan?.id) setForm((f) => ({ ...f, plan: prefillPlan.id }));
  }, [prefillPlan]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const set = (k: keyof Form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate0 = () => {
    const e: typeof errors = {};
    if (!form.plan) e.plan = t({ ENG: "Pick a package", BM: "Pilih pakej", "中文": "请选择套餐" }, lang);
    if (!form.state) e.state = t({ ENG: "Select your state", BM: "Pilih negeri", "中文": "请选择州属" }, lang);
    return e;
  };
  const validate1 = () => {
    const e: typeof errors = {};
    if (form.name.trim().length < 2) e.name = t({ ENG: "Enter your full name", BM: "Masukkan nama penuh", "中文": "请输入全名" }, lang);
    if (!/^[0-9+\-\s]{8,}$/.test(form.phone)) e.phone = t({ ENG: "Enter a valid phone number", BM: "Masukkan nombor telefon yang sah", "中文": "请输入有效的电话号码" }, lang);
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t({ ENG: "Email looks off", BM: "E-mel tidak sah", "中文": "邮箱格式不正确" }, lang);
    return e;
  };

  const next = () => {
    const e = step === 0 ? validate0() : validate1();
    setErrors(e);
    if (!Object.keys(e).length) setStep((s) => s + 1);
  };
  const prev = () => { setErrors({}); setStep((s) => Math.max(0, s - 1)); };

  const reset = () => {
    setDone(false); setStep(0); setErrors({});
    setForm({ plan: prefillPlan?.id ?? "p500", state: "", addressType: "Landed", name: "", phone: "", email: "", note: "" });
  };

  const submit = () => {
    setDone(true);
    try {
      const log = JSON.parse(localStorage.getItem("enquiries") ?? "[]");
      log.unshift({ ...form, at: new Date().toISOString() });
      localStorage.setItem("enquiries", JSON.stringify(log.slice(0, 10)));
    } catch (_) {}
  };

  const handleClose = () => { onClose(); setTimeout(reset, 350); };
  const handleWA = () => {
    const plan = PLANS.find((p) => p.id === form.plan);
    const msg = `Hi, I'm ${form.name} (${form.phone}). I want to register for Unifi ${plan?.speed}${plan?.unit} plan in ${form.state}. ${form.note}`;
    openWA("new", msg);
    handleClose();
  };

  const titles = [t(T.modal.step1title, lang), t(T.modal.step2title, lang), t(T.modal.step3title, lang)];
  const subs   = [t(T.modal.step1sub, lang),   t(T.modal.step2sub, lang),   t(T.modal.step3sub, lang)];

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {done ? (
          <SuccessView onClose={handleClose} onWA={handleWA} form={form} lang={lang}/>
        ) : (
          <div style={{ padding: "26px 26px 24px" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--unifi-orange)" }}>
                Step {step + 1} of 3
              </div>
              <button onClick={handleClose} style={{
                width: 34, height: 34, borderRadius: 9, border: 0, cursor: "pointer",
                background: "rgba(15,23,42,0.05)", display: "inline-flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round"><line x1={18} y1={6} x2={6} y2={18}/><line x1={6} y1={6} x2={18} y2={18}/></svg>
              </button>
            </div>
            <h3 style={{ margin: "3px 0 5px", fontSize: 24, fontWeight: 800, letterSpacing: "-0.01em", color: "var(--ink-900)" }}>
              {titles[step]}
            </h3>
            <p style={{ margin: "0 0 20px", fontSize: 13.5, color: "var(--ink-700)" }}>{subs[step]}</p>

            {/* Progress */}
            <div style={{ display: "flex", gap: 5, marginBottom: 22 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{
                  flex: 1, height: 3.5, borderRadius: 4,
                  background: i <= step ? "linear-gradient(90deg,#FB923C,#F26F22)" : "rgba(15,23,42,0.08)",
                  transition: "background .3s",
                }}/>
              ))}
            </div>

            {step === 0 && <Step0 form={form} set={set} errors={errors} lang={lang}/>}
            {step === 1 && <Step1 form={form} set={set} errors={errors} lang={lang}/>}
            {step === 2 && <Step2 form={form} lang={lang}/>}

            <div style={{ display: "flex", gap: 10, marginTop: 22, justifyContent: "space-between" }}>
              {step > 0
                ? <button className="btn-ghost" onClick={prev} style={{ padding: "11px 22px", fontSize: 14 }}>{t(T.modal.back, lang)}</button>
                : <span/>}
              {step < 2
                ? <button className="btn-primary" onClick={next} style={{ padding: "11px 22px", fontSize: 14 }}>
                    {t(T.modal.continue, lang)}
                    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round"><line x1={5} y1={12} x2={19} y2={12}/><polyline points="12 5 19 12 12 19"/></svg>
                  </button>
                : <button className="btn-primary" onClick={submit} style={{ padding: "11px 22px", fontSize: 14 }}>
                    {t(T.modal.submit, lang)}
                    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </button>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Step0({ form, set, errors, lang }: { form: Form; set: (k: keyof Form, v: string) => void; errors: Partial<Record<keyof Form, string>>; lang: any }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className={`modal-field${errors.plan ? " error" : ""}`}>
        <label>{t(T.modal.fieldPlan, lang)}</label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 7 }}>
          {PLANS.map((p) => {
            const active = form.plan === p.id;
            return (
              <button key={p.id} type="button" onClick={() => set("plan", p.id)} style={{
                textAlign: "left", border: 0, cursor: "pointer",
                padding: "11px 13px", borderRadius: 13,
                background: active ? "rgba(249,115,22,0.08)" : "#fff",
                boxShadow: active ? "0 0 0 2px var(--unifi-orange) inset" : "0 0 0 1px var(--ink-200) inset",
                transition: "all .2s",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 800, fontSize: 14, color: "var(--ink-900)" }}>{p.speed}{p.unit}</span>
                  <span style={{ fontWeight: 800, fontSize: 12.5, color: "var(--unifi-blue-500)" }}>RM{p.now}<span style={{ fontWeight: 600, color: "var(--ink-700)" }}>/mth</span></span>
                </div>
                <div style={{ fontSize: 11, color: "var(--ink-500)", marginTop: 2 }}>{p.tagline}</div>
              </button>
            );
          })}
        </div>
        {errors.plan && <span className="err">{errors.plan}</span>}
      </div>

      <div className={`modal-field${errors.state ? " error" : ""}`}>
        <label>{t(T.modal.fieldState, lang)}</label>
        <select value={form.state} onChange={(e) => set("state", e.target.value)}>
          <option value="">Select your state…</option>
          {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.state && <span className="err">{errors.state}</span>}
      </div>

      <div className="modal-field">
        <label>{t(T.modal.fieldHome, lang)}</label>
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
          {HOME_TYPES.map((ht) => (
            <button key={ht} type="button" onClick={() => set("addressType", ht)} style={{
              flex: 1, minWidth: "fit-content", border: 0, cursor: "pointer",
              padding: "10px 12px", borderRadius: 999,
              background: form.addressType === ht ? "var(--unifi-orange)" : "rgba(15,23,42,0.04)",
              color: form.addressType === ht ? "#fff" : "var(--ink-900)",
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 12.5,
              transition: "all .2s",
            }}>{ht}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step1({ form, set, errors, lang }: { form: Form; set: (k: keyof Form, v: string) => void; errors: Partial<Record<keyof Form, string>>; lang: any }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div className={`modal-field${errors.name ? " error" : ""}`}>
        <label>{t(T.modal.fieldName, lang)}</label>
        <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="As per IC" autoFocus/>
        {errors.name && <span className="err">{errors.name}</span>}
      </div>
      <div className={`modal-field${errors.phone ? " error" : ""}`}>
        <label>{t(T.modal.fieldPhone, lang)}</label>
        <input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="012-345 6789" inputMode="tel"/>
        {errors.phone && <span className="err">{errors.phone}</span>}
      </div>
      <div className={`modal-field${errors.email ? " error" : ""}`}>
        <label>{t(T.modal.fieldEmail, lang)} <span style={{ color: "var(--ink-400)", fontWeight: 400 }}>(optional)</span></label>
        <input value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" inputMode="email"/>
        {errors.email && <span className="err">{errors.email}</span>}
      </div>
      <div className="modal-field">
        <label>{t(T.modal.fieldNote, lang)} <span style={{ color: "var(--ink-400)", fontWeight: 400 }}>(optional)</span></label>
        <textarea rows={3} value={form.note} onChange={(e) => set("note", e.target.value)}
          placeholder="e.g. high-rise on 18th floor, switching from Maxis…"
          style={{ resize: "vertical" }}/>
      </div>
      <div style={{
        background: "rgba(31,169,113,0.08)", border: "1px solid rgba(31,169,113,0.20)",
        borderRadius: 10, padding: "9px 12px",
        fontSize: 12, color: "#0F6E45", display: "flex", alignItems: "center", gap: 7,
      }}>
        <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Your details stay with our dealer team — never sold or shared.
      </div>
    </div>
  );
}

function Step2({ form, lang }: { form: Form; lang: any }) {
  const plan = PLANS.find((p) => p.id === form.plan);
  const rows = [
    ["Package",   plan ? `${plan.speed}${plan.unit} — RM${plan.now}/mth` : "—"],
    ["State",     form.state || "—"],
    ["Home type", form.addressType],
    ["Full name", form.name || "—"],
    ["Mobile",    form.phone || "—"],
    ["Email",     form.email || "—"],
    ["Note",      form.note || "—"],
  ];
  return (
    <div style={{ background: "rgba(15,23,42,0.025)", borderRadius: 14, padding: "16px", display: "flex", flexDirection: "column", gap: 10 }}>
      {rows.map(([k, v]) => (
        <div key={k} style={{
          display: "flex", justifyContent: "space-between", gap: 14,
          borderBottom: "1px dashed rgba(15,23,42,0.07)", paddingBottom: 7,
        }}>
          <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-500)" }}>{k}</span>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink-900)", textAlign: "right", maxWidth: "65%", wordBreak: "break-word" }}>{v}</span>
        </div>
      ))}
      <p style={{ margin: 0, fontSize: 11.5, color: "var(--ink-500)" }}>
        By submitting, you agree to be contacted by our dealer team about your enquiry.
      </p>
    </div>
  );
}

function SuccessView({ onClose, onWA, form, lang }: { onClose: () => void; onWA: () => void; form: Form; lang: any }) {
  return (
    <div style={{ padding: "34px 26px 26px", textAlign: "center" }}>
      <div style={{
        width: 80, height: 80, borderRadius: "50%", margin: "0 auto 16px",
        background: "linear-gradient(180deg, #FFEFE2 0%, #FFE2CC 100%)",
        border: "1px solid rgba(249,115,22,0.25)",
        display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
      }}>
        <div style={{ position: "absolute", inset: -6, borderRadius: "50%", background: "rgba(249,115,22,0.15)", animation: "ripple 1.8s ease-out infinite", zIndex: -1 }}/>
        <svg width={34} height={34} viewBox="0 0 24 24" fill="none" stroke="var(--unifi-orange)" strokeWidth={3} strokeLinecap="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <h3 style={{ margin: "0 0 8px", fontSize: 24, fontWeight: 800, color: "var(--ink-900)" }}>{t(T.modal.success, lang)}</h3>
      <p style={{ margin: "0 auto 22px", fontSize: 14.5, color: "var(--ink-700)", maxWidth: 360, lineHeight: 1.55 }}>
        Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}. {t(T.modal.successMsg, lang)}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        <button onClick={onWA} style={{
          border: 0, cursor: "pointer",
          background: "linear-gradient(180deg,#2ee36b,#1eb95a)",
          color: "#fff", padding: "14px 22px", borderRadius: 999,
          fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 14.5,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
          boxShadow: "0 12px 26px rgba(37,211,102,0.35)",
        }}>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          {t(T.modal.chatNow, lang)}
        </button>
        <button onClick={onClose} className="btn-ghost" style={{ fontSize: 14, padding: "11px 22px" }}>{t(T.modal.close, lang)}</button>
      </div>
    </div>
  );
}
