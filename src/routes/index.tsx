import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import heroImg from "@/assets/hero-cafe.jpg";
import milkshakeImg from "@/assets/milkshake.jpg";
import mojitoImg from "@/assets/mojito.jpg";
import grapeImg from "@/assets/grape-slush.jpg";
import espressoImg from "@/assets/menu-espresso.jpg";
import turkishImg from "@/assets/menu-turkish.jpg";
import latteImg from "@/assets/menu-latte.jpg";
import cappImg from "@/assets/menu-cappuccino.jpg";
import hotchocImg from "@/assets/menu-hotchoc.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

type MenuItem = { name: string; ar: string; price: string; img: string; desc: string; descAr: string };
const MENU_ITEMS: MenuItem[] = [
  { name: "Espresso", ar: "إسبريسو", price: "٦٥", img: espressoImg,
    desc: "A single, intense shot of dark-roasted Arabica — velvet crema, deep cocoa notes.",
    descAr: "جرعة مركّزة من حبوب عربية داكنة التحميص — كريما مخملية بنكهة الكاكاو العميقة." },
  { name: "Turkish Coffee", ar: "قهوة تركي", price: "٥٥", img: turkishImg,
    desc: "Slow-brewed in copper on hot sand, served with cardamom and Turkish delight.",
    descAr: "تُخمّر ببطء على النار الهادئة مع الهيل، تُقدَّم مع الملبن التركي الفاخر." },
  { name: "Iced Latte", ar: "آيس لاتيه", price: "٨٥", img: latteImg,
    desc: "Chilled espresso layered over silk milk and hand-cut ice.",
    descAr: "إسبريسو مثلج مع طبقات من الحليب الحريري ومكعبات ثلج نقيّة." },
  { name: "Oreo Shake", ar: "أوريو شيك", price: "١٢٠", img: milkshakeImg,
    desc: "Crushed Oreo folded into vanilla-bean cream, topped with whipped clouds.",
    descAr: "قطع أوريو مع كريمة الفانيليا الطبيعية، مُتوّجة بغيوم من الكريمة المخفوقة." },
  { name: "Mojito", ar: "موهيتو", price: "٩٥", img: mojitoImg,
    desc: "Fresh mint muddled with lime and sparkling water — served in an artisan jar.",
    descAr: "نعناع طازج مع الليمون والماء الفوّار — يُقدَّم في مرطبان حرفي." },
  { name: "Grape Slush", ar: "جريب سلاش", price: "١١٠", img: grapeImg,
    desc: "Iced violet-grape granita crowned with fresh mint bouquet.",
    descAr: "جرانيتا العنب البنفسجي المثلج مع باقة من النعناع الطازج." },
  { name: "Cappuccino", ar: "كابتشينو", price: "٧٥", img: cappImg,
    desc: "Espresso, steamed milk, and a delicate foam heart — perfectly balanced.",
    descAr: "إسبريسو مع حليب مبخّر ورغوة ناعمة على شكل قلب — توازن مثالي." },
  { name: "Hot Chocolate", ar: "شوكولاتة ساخنة", price: "٩٠", img: hotchocImg,
    desc: "Belgian dark chocolate melted into cream, shaved chocolate on top.",
    descAr: "شوكولاتة بلجيكية داكنة ذائبة في الكريمة مع رقائق الشوكولاتة." },
];

function Nav() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="fixed top-0 inset-x-0 z-50 px-6 md:px-14 py-6 flex items-center justify-between backdrop-blur-md bg-ink/40 border-b border-[var(--gold)]/20"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border border-[var(--gold)] flex items-center justify-center gold-text font-display text-sm">2M</div>
        <span className="font-display text-gold text-sm tracking-[0.3em] hidden sm:inline">2 MILLION</span>
      </div>
      <div className="hidden md:flex gap-10 font-display text-xs tracking-[0.25em] text-foreground/80">
        {["MENU", "STORY", "SIGNATURE", "VISIT"].map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-gold transition-colors">{l}</a>
        ))}
      </div>
      <a href="#visit" className="text-xs font-display tracking-[0.2em] px-5 py-2 border border-[var(--gold)] text-gold hover:bg-[var(--gold)] hover:text-primary-foreground transition-all">
        RESERVE
      </a>
    </motion.nav>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-ink">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <div className="absolute inset-0 animate-ken-burns">
          <img src={heroImg} alt="2 Million Cafe interior" className="w-full h-full object-cover" width={1920} height={1088} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-ink/60" />
      </motion.div>

      {/* Steam particles */}
      {[...Array(12)].map((_, i) => (
        <span key={i} className="steam" style={{
          left: `${10 + i * 7}%`,
          bottom: `${Math.random() * 20}%`,
          animationDelay: `${i * 0.7}s`,
          animationDuration: `${6 + Math.random() * 6}s`,
        }} />
      ))}

      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 2, delay: 0.5 }}
          className="font-display text-xs md:text-sm text-gold uppercase mb-6"
        >
          Est. 2024 · Luxury Coffee House
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="font-serif-lux text-6xl md:text-9xl leading-[0.9] gold-text"
        >
          2 Million
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="h-px w-40 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent my-6 origin-center"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.8 }}
          className="font-display text-lg md:text-2xl tracking-[0.4em] text-foreground/90"
        >
          C A F E
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="mt-10 max-w-xl text-foreground/70 text-base md:text-lg font-serif-lux italic"
          dir="rtl"
        >
          حيث تلتقي الفخامة بالنكهة — تجربة قهوة استثنائية من الطراز العالمي.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gold"
      >
        <span className="font-display text-[10px] tracking-[0.4em]">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-[var(--gold)] to-transparent"
        />
      </motion.div>
    </section>
  );
}

function CircularMenu() {
  const ref = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const dragOffset = useMotionValue(0);
  const rotate = useTransform<number, number>(
    [scrollRotate, dragOffset],
    ([s, d]) => s + d,
  );
  const counterRotate = useTransform(rotate, (r) => -r);
  const radius = 240;

  const [selected, setSelected] = useState<MenuItem | null>(null);
  const dragState = useRef({ dragging: false, lastAngle: 0, moved: 0 });

  const angleFromCenter = (clientX: number, clientY: number) => {
    const el = wheelRef.current;
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    return (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    dragState.current.dragging = true;
    dragState.current.moved = 0;
    dragState.current.lastAngle = angleFromCenter(e.clientX, e.clientY);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    const a = angleFromCenter(e.clientX, e.clientY);
    let delta = a - dragState.current.lastAngle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    dragState.current.lastAngle = a;
    dragState.current.moved += Math.abs(delta);
    dragOffset.set(dragOffset.get() + delta);
  };
  const onPointerUp = () => {
    dragState.current.dragging = false;
  };

  return (
    <section id="menu" ref={ref} className="relative py-32 md:py-48 overflow-hidden bg-ink">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 50% 50%, var(--gold) 0%, transparent 60%)",
      }} />

      <div className="text-center mb-16 px-6">
        <p className="font-display text-xs tracking-[0.4em] text-gold mb-4">— THE MENU —</p>
        <h2 className="font-serif-lux text-5xl md:text-7xl gold-text">Selections</h2>
        <p className="mt-4 text-foreground/60 font-serif-lux italic" dir="rtl">اختيارات دقيقة من ماسترز القهوة</p>
      </div>

      <div className="relative h-[600px] md:h-[700px] flex items-center justify-center touch-none select-none">
        <motion.div
          ref={wheelRef}
          style={{ rotate }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="relative w-[500px] h-[500px] md:w-[640px] md:h-[640px] cursor-grab active:cursor-grabbing"
        >
          {/* Outer decorative rings */}
          <div className="absolute inset-0 rounded-full border border-[var(--gold)]/30" />
          <div className="absolute inset-8 rounded-full border border-[var(--gold)]/20" />
          <div className="absolute inset-16 rounded-full border border-[var(--gold)]/10" />

          {/* Menu items around the circle */}
          {MENU_ITEMS.map((item, i) => {
            const angle = (i / MENU_ITEMS.length) * 2 * Math.PI - Math.PI / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <motion.div
                key={item.name}
                style={{
                  left: `50%`,
                  top: `50%`,
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
                className="absolute"
              >
                <motion.div
                  style={{ rotate: counterRotate }}
                  onClick={(e) => {
                    if (dragState.current.moved > 8) { e.preventDefault(); return; }
                    setSelected(item);
                  }}
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border border-[var(--gold)]/40 backdrop-blur-sm flex flex-col items-center justify-center text-center hover:scale-110 hover:border-[var(--gold)] transition-all shadow-[0_0_30px_rgba(200,160,80,0.2)] cursor-pointer relative group"
                >
                  <img src={item.img} alt={item.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
                  <div className="relative z-10 px-2">
                    <p className="font-display text-[10px] tracking-widest text-gold">{item.name}</p>
                    <p className="font-serif-lux text-sm md:text-base text-foreground mt-1" dir="rtl">{item.ar}</p>
                    <p className="font-display text-xs text-gold mt-1">{item.price} EGP</p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Center logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-ink border border-[var(--gold)]/60 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(200,160,80,0.3)]">
            <p className="font-serif-lux text-4xl md:text-5xl gold-text leading-none">2M</p>
            <p className="font-display text-[9px] tracking-[0.3em] text-gold mt-2">CAFE</p>
          </div>
        </div>
      </div>

      <p className="text-center mt-12 font-display text-xs tracking-[0.3em] text-foreground/50">
        ↻ DRAG THE WHEEL · TAP AN ITEM
      </p>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-3xl bg-ink border border-[var(--gold)]/40 text-foreground p-0 overflow-hidden">
          {selected && (
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-square md:aspect-auto">
                <img src={selected.img} alt={selected.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent md:bg-gradient-to-r" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <p className="font-display text-[10px] tracking-[0.4em] text-gold mb-3">— SIGNATURE —</p>
                <h3 className="font-serif-lux text-4xl gold-text">{selected.name}</h3>
                <p className="font-serif-lux text-2xl text-foreground/80 mt-1" dir="rtl">{selected.ar}</p>
                <div className="h-px w-16 bg-[var(--gold)]/60 my-6" />
                <p className="text-foreground/70 text-sm leading-relaxed">{selected.desc}</p>
                <p className="text-foreground/70 text-sm leading-loose mt-3 font-serif-lux italic" dir="rtl">{selected.descAr}</p>
                <p className="mt-8 font-display text-xs tracking-[0.3em] text-gold">PRICE · {selected.price} EGP</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function Signature() {
  const drinks = [
    { img: milkshakeImg, name: "Oreo Dream", ar: "أوريو دريم", desc: "Whipped clouds over cookie-crushed milkshake." },
    { img: grapeImg, name: "Violet Frost", ar: "فايوليت فروست", desc: "Iced grape granita with fresh mint bouquet." },
    { img: mojitoImg, name: "Citrus Jar", ar: "سيتروس جار", desc: "Crisp lemon-lime spritz served in artisan jars." },
  ];
  return (
    <section id="signature" className="relative py-32 md:py-40 bg-ink border-y border-[var(--gold)]/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <p className="font-display text-xs tracking-[0.4em] text-gold mb-3">— SIGNATURE —</p>
            <h2 className="font-serif-lux text-5xl md:text-7xl gold-text">The Masterpieces</h2>
          </div>
          <p className="max-w-sm text-foreground/60 font-serif-lux italic text-lg" dir="rtl">
            توقيعنا في كل كوب — مشروبات صُنعت بشغف الحرفيين.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {drinks.map((d, i) => (
            <motion.article
              key={d.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: i * 0.15 }}
              className="group relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <motion.img
                  src={d.img}
                  alt={d.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 1.2 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                <div className="absolute inset-0 border border-[var(--gold)]/0 group-hover:border-[var(--gold)]/60 transition-all duration-500" />
                <div className="absolute top-4 left-4 font-display text-xs tracking-[0.3em] text-gold">0{i + 1}</div>
              </div>
              <div className="pt-6">
                <h3 className="font-serif-lux text-3xl text-foreground">{d.name}</h3>
                <p className="font-display text-xs tracking-[0.3em] text-gold mt-1" dir="rtl">{d.ar}</p>
                <p className="mt-3 text-foreground/60 text-sm">{d.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="relative py-32 md:py-48 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display text-xs tracking-[0.4em] text-gold mb-6"
        >
          — THE STORY —
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif-lux text-4xl md:text-6xl leading-tight text-foreground"
        >
          Where every cup tells<br />a <span className="gold-text italic">million</span> stories.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-10 text-foreground/70 text-lg md:text-xl font-serif-lux italic leading-loose"
          dir="rtl"
        >
          في ٢ مليون كافيه، لا نُقدم مجرد قهوة — بل نصنع لحظات لا تُنسى.
          كل حبة بن مُختارة بعناية، وكل مشروب يحمل بصمة الفخامة.
          مكان يجمع بين هدوء الشرق ورقي الغرب.
        </motion.p>

        <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          {[
            { n: "2M+", l: "Cups Served" },
            { n: "24", l: "Signature Drinks" },
            { n: "★★★★★", l: "Guest Rating" },
          ].map((s) => (
            <div key={s.l} className="border-t border-[var(--gold)]/30 pt-4">
              <p className="font-serif-lux text-2xl md:text-4xl gold-text">{s.n}</p>
              <p className="font-display text-[10px] tracking-[0.25em] text-foreground/50 mt-2">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visit" className="relative py-32 md:py-40 bg-ink border-t border-[var(--gold)]/20">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="font-display text-xs tracking-[0.4em] text-gold mb-4">— VISIT US —</p>
          <h2 className="font-serif-lux text-5xl md:text-6xl gold-text mb-8">An Evening Awaits</h2>
          <div className="space-y-6 text-foreground/80">
            <div>
              <p className="font-display text-xs tracking-[0.3em] text-gold mb-1">HOURS</p>
              <p className="font-serif-lux text-xl">Daily · 9:00 AM — 2:00 AM</p>
            </div>
            <div>
              <p className="font-display text-xs tracking-[0.3em] text-gold mb-1">LOCATION</p>
              <p className="font-serif-lux text-xl" dir="rtl">شارع النيل الكبير، القاهرة</p>
            </div>
            <div>
              <p className="font-display text-xs tracking-[0.3em] text-gold mb-1">RESERVATIONS</p>
              <p className="font-serif-lux text-xl">+20 100 000 0000</p>
            </div>
          </div>
          <a href="tel:+201000000000" className="inline-block mt-10 px-10 py-4 border border-[var(--gold)] text-gold font-display text-xs tracking-[0.35em] hover:bg-[var(--gold)] hover:text-primary-foreground transition-all">
            BOOK A TABLE
          </a>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative aspect-square"
        >
          <div className="absolute inset-0 rounded-full border border-[var(--gold)]/30 animate-spin-slow" />
          <div className="absolute inset-6 rounded-full border border-[var(--gold)]/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="font-serif-lux text-8xl gold-text leading-none">2M</p>
              <p className="font-display text-xs tracking-[0.4em] text-gold mt-4">SINCE 2024</p>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}

function Location() {
  return (
    <section id="location" className="relative bg-ink border-t border-[var(--gold)]/20 py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 text-center mb-12">
        <p className="font-display text-xs tracking-[0.4em] text-gold mb-4">— FIND US —</p>
        <h2 className="font-serif-lux text-5xl md:text-6xl gold-text">On The Map</h2>
        <p className="mt-4 text-foreground/60 font-serif-lux italic" dir="rtl">تعال زُرنا — نحن في انتظارك</p>
      </div>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative rounded-sm overflow-hidden border border-[var(--gold)]/40 shadow-[0_0_60px_rgba(200,160,80,0.15)]"
        >
          <iframe
            title="2 Million Cafe location"
            src="https://www.google.com/maps?q=Cairo,Egypt&output=embed"
            width="100%"
            height="480"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full block grayscale contrast-125"
            style={{ border: 0 }}
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[var(--gold)]/20" />
        </motion.div>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-serif-lux text-lg text-foreground/80" dir="rtl">شارع النيل الكبير، القاهرة، مصر</p>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Cairo,Egypt"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-[var(--gold)] text-gold font-display text-xs tracking-[0.35em] hover:bg-[var(--gold)] hover:text-primary-foreground transition-all"
          >
            GET DIRECTIONS →
          </a>
        </div>
      </div>

      <footer className="mt-24 pt-8 border-t border-[var(--gold)]/10 text-center">
        <p className="font-display text-[10px] tracking-[0.4em] text-foreground/40">
          © 2 MILLION CAFE · CRAFTED WITH PASSION
        </p>
      </footer>
    </section>
  );
}

function Index() {
  return (
    <main className="bg-ink text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <CircularMenu />
      <Signature />
      <Story />
      <Visit />
      <Location />
    </main>
  );
}
