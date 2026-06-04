import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const CITIES = ["Москва", "Санкт-Петербург", "Краснодар", "Екатеринбург", "Новосибирск", "Казань"];

const TOP_LINKS = [
  { label: "О нас", href: "#about" },
  { label: "Наша команда", href: "#team" },
  { label: "Аккредитации", href: "#accreditation" },
  { label: "Партнёрам", href: "#partners" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Статьи", href: "#articles" },
  { label: "Новости", href: "#news" },
];

const MEGA_MENU: Record<string, {
  categories: { title: string; items: string[] }[];
  promo?: { tag: string; title: string; desc: string }[];
}> = {
  "СРО": {
    categories: [
      {
        title: "Услуги",
        items: ["СРО строителей", "СРО проектировщиков", "СРО изыскателей", "Калькулятор СРО", "Специалисты для СРО"],
      },
      {
        title: "Информация",
        items: ["Что такое СРО", "Документы для вступления в СРО", "Компенсационный фонд СРО", "Уровни ответственности СРО", "Часто задаваемые вопросы о СРО", "Аккредитации СРО"],
      },
    ],
    promo: [
      { tag: "Акция", title: "Вступление в СРО за 8 часов", desc: "Без доплат. Полное сопровождение. Допуск в тот же день." },
      { tag: "Популярное", title: "СРО без взносов", desc: "Рассрочка на особых условиях. Только Москва." },
    ],
  },
  "НОК": {
    categories: [
      {
        title: "Услуги",
        items: ["Независимая оценка квалификации", "Подготовка к НОК", "НОК для специалистов", "Реестр НОК"],
      },
      {
        title: "Информация",
        items: ["Что такое НОК", "Порядок проведения", "Часто задаваемые вопросы", "Нормативная база"],
      },
    ],
    promo: [
      { tag: "Быстро", title: "НОК за 3 дня", desc: "Подготовка и сдача экзамена под ключ." },
    ],
  },
  "НРС": {
    categories: [
      {
        title: "Услуги",
        items: ["Внесение в НРС", "Обновление сведений в НРС", "НРС под ключ", "Срочное внесение в НРС"],
      },
      {
        title: "Информация",
        items: ["Что такое НРС", "Требования к специалистам", "Документы для НРС", "Проверка НРС"],
      },
    ],
  },
  "СЕРТИФИКАЦИЯ": {
    categories: [
      {
        title: "Виды",
        items: ["Сертификация ISO 9001", "Сертификация ISO 14001", "Сертификация ГОСТ Р", "Добровольная сертификация"],
      },
      {
        title: "Информация",
        items: ["Зачем нужна сертификация", "Сроки и стоимость", "Документы для сертификации", "FAQ"],
      },
    ],
  },
  "ЛИЦЕНЗИРОВАНИЕ": {
    categories: [
      {
        title: "Виды лицензий",
        items: ["Лицензия МЧС", "Лицензия ФСБ", "Лицензия Минкультуры", "Лицензия на медицинскую деятельность"],
      },
      {
        title: "Информация",
        items: ["Требования к лицензиатам", "Сроки оформления", "Переоформление лицензии", "FAQ"],
      },
    ],
  },
};

const NAV_ITEMS = [
  { label: "МЕНЮ", isMenu: true },
  { label: "СРО", hasDropdown: true },
  { label: "НОК", hasDropdown: true, highlighted: true },
  { label: "НРС", hasDropdown: true },
  { label: "СЕРТИФИКАЦИЯ", hasDropdown: true },
  { label: "ЛИЦЕНЗИРОВАНИЕ", hasDropdown: true },
  { label: "ЦЕНЫ", href: "#prices" },
  { label: "КОНТАКТЫ", href: "#contacts" },
];

const MENU_ALL_ITEMS = ["СРО", "Членам СРО", "НОК", "НРС", "Сертификация", "Лицензирование"];

export default function Header() {
  const [city, setCity] = useState("Выбрать город");
  const [cityOpen, setCityOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
        setMenuOpen(false);
        setCityOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNavEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (MEGA_MENU[label]) setActiveDropdown(label);
  };

  const handleNavLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleDropdownEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <header className="w-full font-manrope" style={{ fontFamily: "'Manrope', sans-serif" }}>
      {/* Top bar */}
      <div style={{ backgroundColor: "var(--navy-950)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between h-9">
          {/* Left: city + rating */}
          <div className="flex items-center gap-4">
            {/* City selector */}
            <div className="relative">
              <button
                className="flex items-center gap-1 text-xs transition-colors"
                style={{ color: "var(--white-80)" }}
                onClick={() => setCityOpen(!cityOpen)}
              >
                <Icon name="MapPin" size={12} />
                <span>{city}</span>
                <Icon name="ChevronDown" size={12} className={`transition-transform ${cityOpen ? "rotate-180" : ""}`} />
              </button>
              {cityOpen && (
                <div
                  className="absolute top-full left-0 mt-1 z-50 rounded-md py-1 min-w-[160px] shadow-xl"
                  style={{ backgroundColor: "var(--navy-800)", border: "1px solid var(--border-subtle)" }}
                >
                  {CITIES.map((c) => (
                    <button
                      key={c}
                      className="w-full text-left px-3 py-1.5 text-xs transition-colors hover:text-white"
                      style={{ color: "var(--white-60)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--navy-700)")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      onClick={() => { setCity(c); setCityOpen(false); }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Yandex rating */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs" style={{ color: "var(--white-60)" }}>
              <span>Яндекс Рейтинг</span>
              <span style={{ color: "var(--gold)" }} className="font-semibold">4.8</span>
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <span key={i} style={{ color: i <= 4 ? "var(--gold)" : "var(--gold)" }} className="text-xs">★</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: email + links */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:info@techsro.ru"
              className="hidden md:flex items-center gap-1.5 text-xs transition-colors"
              style={{ color: "var(--white-60)" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--white)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--white-60)"}
            >
              <Icon name="Mail" size={12} />
              info@techsro.ru
            </a>
            <nav className="hidden lg:flex items-center gap-3">
              {TOP_LINKS.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs transition-colors"
                  style={{ color: "var(--white-60)" }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--white)"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--white-60)"}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div style={{ backgroundColor: "var(--navy-900)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="relative">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-center text-xs font-bold leading-tight"
                style={{
                  background: "linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-light))",
                  color: "var(--navy-950)",
                  boxShadow: "0 0 20px rgba(245,166,35,0.3)",
                }}
              >
                <div>
                  <div className="text-[8px] font-black">НАМ</div>
                  <div className="text-lg font-black leading-none">10</div>
                  <div className="text-[7px]">ЛЕТ</div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-[10px] tracking-widest font-medium" style={{ color: "var(--white-60)" }}>КЛЮЧ К УСПЕХУ</div>
              <div className="text-xl font-extrabold tracking-wide leading-tight" style={{ color: "var(--white)" }}>ТЕХНОЛОГИИ</div>
              <div className="text-xl font-extrabold tracking-wide leading-tight" style={{ color: "var(--gold)" }}>СРО</div>
            </div>
          </a>

          {/* Right: contacts + CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Social */}
            <div className="flex items-center gap-2">
              <a
                href="https://t.me/"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                style={{ backgroundColor: "#27a7e5" }}
              >
                <Icon name="Send" size={16} style={{ color: "#fff" }} />
              </a>
              <a
                href="https://wa.me/"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                style={{ backgroundColor: "#25d366" }}
              >
                <Icon name="MessageCircle" size={16} style={{ color: "#fff" }} />
              </a>
            </div>

            {/* Phone */}
            <a
              href="tel:+79312788888"
              className="flex items-center gap-2 font-bold text-lg transition-colors"
              style={{ color: "var(--white)" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--white)"}
            >
              <Icon name="Phone" size={18} />
              +7 (931) 278-88-88
            </a>

            {/* CTA */}
            <button
              className="px-4 py-2 rounded font-bold text-sm transition-all hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                color: "var(--navy-950)",
                boxShadow: "0 4px 16px rgba(245,166,35,0.35)",
              }}
            >
              Заказать звонок
            </button>
          </div>

          {/* Mobile: phone + burger */}
          <div className="flex md:hidden items-center gap-3">
            <div className="flex gap-2">
              <a href="https://t.me/" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: "#27a7e5" }}>
                <Icon name="Send" size={15} style={{ color: "#fff" }} />
              </a>
              <a href="https://wa.me/" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: "#25d366" }}>
                <Icon name="MessageCircle" size={15} style={{ color: "#fff" }} />
              </a>
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors"
              style={{ border: "1.5px solid var(--border-subtle)", color: "var(--white)" }}
            >
              <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <div
        className="hidden md:block relative"
        style={{ backgroundColor: "var(--navy-800)", borderBottom: "1px solid var(--border-subtle)" }}
        ref={dropdownRef}
      >
        <div className="max-w-[1400px] mx-auto px-4">
          <nav className="flex items-stretch h-12">
            {NAV_ITEMS.map((item) => {
              const isActive = activeDropdown === item.label;
              const isMenuActive = menuOpen && item.isMenu;

              if (item.isMenu) {
                return (
                  <button
                    key="menu"
                    className="flex items-center gap-2 px-4 text-sm font-bold tracking-wider transition-colors h-full border-r"
                    style={{
                      color: isMenuActive ? "var(--gold)" : "var(--white)",
                      borderColor: "var(--border-subtle)",
                    }}
                    onClick={() => { setMenuOpen(!menuOpen); setActiveDropdown(null); }}
                  >
                    <Icon name={menuOpen ? "X" : "Menu"} size={16} />
                    МЕНЮ
                  </button>
                );
              }

              if (item.hasDropdown) {
                return (
                  <button
                    key={item.label}
                    className="flex items-center gap-1 px-4 text-sm font-semibold tracking-wider transition-colors h-full relative"
                    style={{
                      color: isActive
                        ? "var(--gold)"
                        : item.highlighted
                        ? "var(--gold)"
                        : "var(--white-80)",
                      borderBottom: isActive ? "2px solid var(--gold)" : "2px solid transparent",
                    }}
                    onMouseEnter={() => handleNavEnter(item.label)}
                    onMouseLeave={handleNavLeave}
                    onClick={() => setActiveDropdown(isActive ? null : item.label)}
                  >
                    {item.label}
                    <Icon name="ChevronDown" size={13} className={`transition-transform ${isActive ? "rotate-180" : ""}`} />
                  </button>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center px-4 text-sm font-semibold tracking-wider transition-colors h-full"
                  style={{ color: "var(--white-80)" }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--white)"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--white-80)"}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>

        {/* All-in-one МЕНЮ dropdown */}
        {menuOpen && (
          <div
            className="absolute top-full left-0 right-0 z-50 mega-menu-enter shadow-2xl"
            style={{ backgroundColor: "var(--navy-800)", borderTop: "1px solid var(--border-subtle)" }}
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <div className="max-w-[1400px] mx-auto px-4 py-6 flex gap-8">
              {/* Left: all sections */}
              <div className="w-52 flex-shrink-0 border-r" style={{ borderColor: "var(--border-subtle)" }}>
                {MENU_ALL_ITEMS.map(item => (
                  <button
                    key={item}
                    className="w-full text-left px-4 py-3 text-sm font-medium rounded transition-colors"
                    style={{ color: "var(--white-80)" }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = "var(--gold)";
                      e.currentTarget.style.backgroundColor = "var(--navy-700)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = "var(--white-80)";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
              {/* Right: quick links */}
              <div className="flex-1 grid grid-cols-3 gap-4">
                {Object.entries(MEGA_MENU).slice(0, 3).map(([key, val]) => (
                  <div key={key}>
                    <div className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: "var(--gold)" }}>{key}</div>
                    {val.categories[0].items.slice(0, 4).map(item => (
                      <a
                        key={item}
                        href="#"
                        className="flex items-center gap-1.5 py-1 text-sm transition-colors"
                        style={{ color: "var(--white-60)" }}
                        onMouseEnter={e => e.currentTarget.style.color = "var(--white)"}
                        onMouseLeave={e => e.currentTarget.style.color = "var(--white-60)"}
                      >
                        <span style={{ color: "var(--gold)", fontSize: "8px" }}>●</span>
                        {item}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Per-section mega dropdown */}
        {activeDropdown && MEGA_MENU[activeDropdown] && (
          <div
            className="absolute top-full left-0 right-0 z-50 mega-menu-enter shadow-2xl"
            style={{ backgroundColor: "var(--navy-800)", borderTop: "1px solid var(--border-subtle)" }}
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <div className="max-w-[1400px] mx-auto px-4 py-8 flex gap-8">
              {/* Left nav: sections */}
              <div className="w-52 flex-shrink-0 border-r" style={{ borderColor: "var(--border-subtle)" }}>
                {Object.keys(MEGA_MENU).map(key => (
                  <button
                    key={key}
                    className="w-full text-left px-4 py-3 text-sm font-medium rounded transition-all"
                    style={{
                      color: activeDropdown === key ? "var(--gold)" : "var(--white-60)",
                      backgroundColor: activeDropdown === key ? "var(--navy-700)" : "transparent",
                      borderLeft: activeDropdown === key ? "3px solid var(--gold)" : "3px solid transparent",
                    }}
                    onMouseEnter={() => setActiveDropdown(key)}
                  >
                    {key}
                  </button>
                ))}
              </div>

              {/* Categories */}
              <div className="flex-1 flex gap-12">
                {MEGA_MENU[activeDropdown].categories.map(cat => (
                  <div key={cat.title}>
                    <div
                      className="text-xs font-bold tracking-widest mb-4 uppercase pb-2"
                      style={{ color: "var(--white-60)", borderBottom: "1px solid var(--border-subtle)" }}
                    >
                      {cat.title}
                    </div>
                    <ul className="space-y-2">
                      {cat.items.map(item => (
                        <li key={item}>
                          <a
                            href="#"
                            className="flex items-center gap-2 text-sm transition-all"
                            style={{ color: "var(--white-60)" }}
                            onMouseEnter={e => { e.currentTarget.style.color = "var(--white)"; e.currentTarget.style.paddingLeft = "4px"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "var(--white-60)"; e.currentTarget.style.paddingLeft = "0"; }}
                          >
                            <span style={{ color: "var(--gold)", fontSize: "8px" }}>●</span>
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Promo cards */}
              {MEGA_MENU[activeDropdown].promo && (
                <div className="w-64 flex-shrink-0">
                  <div className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: "var(--white-60)" }}>
                    Специальные предложения
                  </div>
                  <div className="space-y-3">
                    {MEGA_MENU[activeDropdown].promo!.map(p => (
                      <div
                        key={p.title}
                        className="rounded-lg p-4 cursor-pointer transition-transform hover:scale-[1.02]"
                        style={{ backgroundColor: "var(--navy-700)", border: "1px solid var(--border-subtle)" }}
                      >
                        <span
                          className="inline-block text-[10px] font-bold px-2 py-0.5 rounded mb-2"
                          style={{ backgroundColor: "var(--gold)", color: "var(--navy-950)" }}
                        >
                          {p.tag}
                        </span>
                        <div className="text-sm font-bold text-white mb-1">{p.title}</div>
                        <div className="text-xs" style={{ color: "var(--white-60)" }}>{p.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{ backgroundColor: "var(--navy-800)", borderTop: "1px solid var(--border-subtle)" }}
        >
          {/* Phone in mobile */}
          <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
            <a href="tel:+79312788888" className="flex items-center gap-2 font-bold text-base" style={{ color: "var(--white)" }}>
              <Icon name="Phone" size={16} />
              +7 (931) 278-88-88
            </a>
            <button
              className="px-3 py-1.5 rounded text-xs font-bold"
              style={{ background: "linear-gradient(135deg, var(--gold-dark), var(--gold))", color: "var(--navy-950)" }}
            >
              Заказать звонок
            </button>
          </div>

          {/* Nav items */}
          <nav className="px-2 py-2">
            {NAV_ITEMS.filter(i => !i.isMenu).map(item => (
              <div key={item.label}>
                <button
                  className="w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-semibold transition-colors"
                  style={{ color: item.highlighted ? "var(--gold)" : "var(--white-80)" }}
                  onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <Icon
                      name="ChevronDown"
                      size={14}
                      className={`transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                {/* Mobile submenu */}
                {item.hasDropdown && mobileExpanded === item.label && MEGA_MENU[item.label] && (
                  <div className="pl-4 pb-2">
                    {MEGA_MENU[item.label].categories.map(cat => (
                      <div key={cat.title} className="mb-3">
                        <div className="text-[10px] font-bold uppercase tracking-widest px-2 mb-1.5" style={{ color: "var(--gold)" }}>
                          {cat.title}
                        </div>
                        {cat.items.map(i => (
                          <a
                            key={i}
                            href="#"
                            className="flex items-center gap-2 px-2 py-1.5 text-sm rounded"
                            style={{ color: "var(--white-60)" }}
                          >
                            <span style={{ color: "var(--gold)", fontSize: "7px" }}>●</span>
                            {i}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Top links in mobile */}
          <div className="px-4 py-3 flex flex-wrap gap-3" style={{ borderTop: "1px solid var(--border-subtle)" }}>
            {TOP_LINKS.map(link => (
              <a key={link.label} href={link.href} className="text-xs" style={{ color: "var(--white-60)" }}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
