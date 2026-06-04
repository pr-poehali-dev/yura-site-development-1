import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const STEPS = [
  {
    num: "01",
    tag: "ПРОВЕРКА",
    icon: "Shield",
    title: "Аудит документов",
    desc: "Проверяем портфолио, стаж и соответствие требованиям НОСТРОЙ / НОПРИЗ",
    active: false,
  },
  {
    num: "02",
    tag: "ЭКЗАМЕН",
    icon: "CheckCircle",
    title: "Сдача НОК",
    desc: "Готовим к экзамену, сопровождаем в ЦОК. Гарантируем результат с первого раза",
    active: true,
  },
  {
    num: "03",
    tag: "СВИДЕТЕЛЬСТВО",
    icon: "Award",
    title: "Реестр НАРК",
    desc: "Вносим данные в федеральный реестр квалификаций — статус действителен 3 года",
    active: false,
  },
];

const BADGES = ["до 15 дней", "100% сдача", "12 лет опыта"];

const CHECKS = [
  "Гарантия сдачи экзамена с первого раза",
  "Сдача в ЦОК в вашем регионе или дистанционно",
  "Внесение в реестр НАРК в день получения результата",
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function HeroNok() {
  const left = useInView(0.1);
  const right = useInView(0.1);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, var(--navy-950) 0%, var(--navy-900) 45%, var(--navy-800) 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Background gear / decorative */}
      <div
        className="absolute right-0 bottom-0 pointer-events-none select-none"
        style={{
          width: 520,
          height: 520,
          backgroundImage: `url(https://cdn.poehali.dev/projects/02b04b19-4d11-4114-9981-6d5142efe04f/bucket/78ff17f4-2d26-4b04-9d16-10a90dda4134.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
          opacity: 0.08,
          filter: "blur(1px)",
        }}
      />

      {/* Corner brackets */}
      <div className="absolute top-5 left-5 pointer-events-none" style={{ color: "var(--white-20)", width: 20, height: 20, borderTop: "2px solid", borderLeft: "2px solid" }} />
      <div className="absolute bottom-5 left-5 pointer-events-none" style={{ color: "var(--white-20)", width: 20, height: 20, borderBottom: "2px solid", borderLeft: "2px solid" }} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12 py-20 lg:py-0 lg:min-h-screen">

        {/* LEFT */}
        <div
          ref={left.ref}
          className="flex-1 max-w-xl"
          style={{
            opacity: left.visible ? 1 : 0,
            transform: left.visible ? "translateX(0)" : "translateX(-40px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {/* Accredited badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-5"
            style={{
              border: "1px solid var(--border-subtle)",
              backgroundColor: "var(--white-10)",
              color: "var(--white-60)",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--gold)", display: "inline-block" }} />
            НАРК · АККРЕДИТОВАННЫЙ ПАРТНЁР
          </div>

          {/* Eyebrow */}
          <div
            className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-4"
            style={{ color: "var(--gold)" }}
          >
            <span style={{ display: "inline-block", width: 28, height: 1.5, backgroundColor: "var(--gold)" }} />
            НЕЗАВИСИМАЯ ОЦЕНКА КВАЛИФИКАЦИИ
          </div>

          {/* Heading */}
          <h1
            className="font-extrabold leading-tight mb-6"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              color: "var(--white)",
              letterSpacing: "-0.01em",
            }}
          >
            Подготовка к НОК<br />
            НОСТРОЙ для строителей
          </h1>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {BADGES.map((b, i) => (
              <span
                key={b}
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  border: `1px solid ${i === 1 ? "var(--gold)" : "var(--border-subtle)"}`,
                  color: i === 1 ? "var(--gold)" : "var(--white-60)",
                  backgroundColor: "var(--white-10)",
                  transitionDelay: `${i * 80}ms`,
                  opacity: left.visible ? 1 : 0,
                  transform: left.visible ? "translateY(0)" : "translateY(10px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
              >
                {b}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-base mb-6" style={{ color: "var(--white-60)", lineHeight: 1.75, maxWidth: 520 }}>
            Гарантируем сдачу профессионального экзамена с первого
            раза. Полное сопровождение от подготовки документов до
            получения свидетельства о квалификации.
          </p>

          {/* Checklist */}
          <ul className="space-y-2.5 mb-8">
            {CHECKS.map((c, i) => (
              <li
                key={c}
                className="flex items-start gap-2.5 text-sm"
                style={{
                  color: "var(--white-80)",
                  opacity: left.visible ? 1 : 0,
                  transform: left.visible ? "translateX(0)" : "translateX(-16px)",
                  transition: `opacity 0.5s ease ${0.3 + i * 0.1}s, transform 0.5s ease ${0.3 + i * 0.1}s`,
                }}
              >
                <Icon name="Check" size={16} style={{ color: "var(--gold)", marginTop: 2, flexShrink: 0 }} />
                {c}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-5">
            <button
              className="px-7 py-3.5 font-bold text-sm tracking-wider uppercase transition-all hover:scale-105 active:scale-95"
              style={{
                background: "#2196f3",
                color: "#fff",
                borderRadius: 0,
                letterSpacing: "0.08em",
                boxShadow: "0 6px 24px rgba(33,150,243,0.4)",
              }}
            >
              ЗАПИСАТЬСЯ НА НОК
            </button>
            <a
              href="tel:+79312788888"
              className="flex items-center gap-2 font-bold text-base transition-colors"
              style={{ color: "var(--white-60)" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--white)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--white-60)"}
            >
              <Icon name="Phone" size={16} />
              +7 (931) 278-88-88
            </a>
          </div>
        </div>

        {/* RIGHT: Step cards */}
        <div
          ref={right.ref}
          className="flex-shrink-0 flex flex-col gap-4 w-full lg:w-[320px]"
          style={{
            opacity: right.visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.2s",
          }}
        >
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="rounded-xl p-5 transition-all"
              style={{
                backgroundColor: step.active ? "var(--navy-700)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${step.active ? "var(--gold)" : "var(--border-subtle)"}`,
                boxShadow: step.active ? "0 8px 32px rgba(245,166,35,0.15)" : "none",
                opacity: right.visible ? 1 : 0,
                transform: right.visible ? "translateX(0)" : "translateX(40px)",
                transition: `opacity 0.6s ease ${0.15 + i * 0.15}s, transform 0.6s ease ${0.15 + i * 0.15}s`,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div
                  className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase"
                  style={{ color: step.active ? "var(--gold)" : "var(--white-60)" }}
                >
                  <span>{step.num} /</span>
                  <span>{step.tag}</span>
                </div>
                <Icon
                  name={step.icon as "Shield"}
                  size={16}
                  style={{ color: step.active ? "var(--gold)" : "var(--white-20)" }}
                />
              </div>

              {/* Divider */}
              <div
                style={{
                  height: 1,
                  backgroundColor: step.active ? "var(--gold)" : "var(--border-subtle)",
                  marginBottom: 12,
                  width: step.active ? "100%" : "60%",
                  transition: "width 0.3s ease",
                }}
              />

              <div className="text-base font-bold mb-1.5" style={{ color: "var(--white)" }}>
                {step.title}
              </div>
              <div className="text-sm leading-relaxed" style={{ color: "var(--white-60)" }}>
                {step.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(10,15,30,0.6), transparent)",
        }}
      />
    </section>
  );
}
