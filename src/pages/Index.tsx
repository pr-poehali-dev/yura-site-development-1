import Header from "@/components/Header";

const Index = () => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--navy-900)", fontFamily: "'Manrope', sans-serif" }}>
      <Header />

      {/* Hero section placeholder */}
      <main>
        <div
          className="flex items-center justify-center"
          style={{
            minHeight: "calc(100vh - 120px)",
            background: "linear-gradient(160deg, var(--navy-900) 0%, var(--navy-800) 50%, var(--navy-950) 100%)",
          }}
        >
          <div className="text-center px-4 max-w-3xl mx-auto">
            <div
              className="text-xs font-bold tracking-widest uppercase mb-5 inline-flex items-center gap-2"
              style={{ color: "var(--gold)" }}
            >
              <span style={{ display: "inline-block", width: 32, height: 1, backgroundColor: "var(--gold)" }} />
              Профессиональная помощь бизнесу
              <span style={{ display: "inline-block", width: 32, height: 1, backgroundColor: "var(--gold)" }} />
            </div>
            <h1
              className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
              style={{ color: "var(--white)" }}
            >
              Технологии{" "}
              <span style={{ color: "var(--gold)" }}>СРО</span>
            </h1>
            <p
              className="text-lg md:text-xl mb-10"
              style={{ color: "var(--white-60)", lineHeight: 1.7 }}
            >
              Профессиональная помощь в оформлении СРО, НОК, НРС,
              лицензировании и сертификации для строительных компаний.
              Работаем по всей России.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                className="px-8 py-4 rounded-lg font-bold text-base transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                  color: "var(--navy-950)",
                  boxShadow: "0 6px 24px rgba(245,166,35,0.4)",
                }}
              >
                Получить консультацию
              </button>
              <button
                className="px-8 py-4 rounded-lg font-bold text-base transition-all hover:scale-105"
                style={{
                  border: "1.5px solid var(--border-subtle)",
                  color: "var(--white-80)",
                  backgroundColor: "var(--white-10)",
                }}
              >
                Узнать подробнее
              </button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { num: "10+", label: "лет на рынке" },
                { num: "4.8★", label: "Яндекс рейтинг" },
                { num: "5 000+", label: "клиентов" },
                { num: "8 ч", label: "вступление в СРО" },
              ].map(s => (
                <div
                  key={s.num}
                  className="rounded-xl px-4 py-5"
                  style={{
                    backgroundColor: "var(--white-10)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div className="text-2xl font-extrabold mb-1" style={{ color: "var(--gold)" }}>{s.num}</div>
                  <div className="text-xs" style={{ color: "var(--white-60)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
