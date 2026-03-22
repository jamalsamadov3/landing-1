import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Activity, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --------------------------------------------------------
// NAVBAR: Suzuvchi Orol
// --------------------------------------------------------
const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: {
          className: 'bg-background/80 backdrop-blur-xl border-muted border',
          targets: navRef.current
        }
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav ref={navRef} className="px-6 py-3 rounded-[2rem] border border-transparent transition-all duration-300 flex items-center gap-8">
        <div className="font-bold text-xl tracking-tight text-foreground">Aql-Zakov</div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-foreground/80">
          <a href="#features" className="link-hover hover:text-accent">Afzalliklar</a>
          <a href="#philosophy" className="link-hover hover:text-accent">Falsafa</a>
          <a href="#protocol" className="link-hover hover:text-accent">Protokol</a>
        </div>
        <a href="#cta" className="btn-magnetic px-5 py-2 rounded-full bg-accent text-background font-semibold text-sm">
          <span className="relative z-10">Boshlash</span>
          <div className="btn-hover-layer"></div>
        </a>
      </nav>
    </div>
  );
};

// --------------------------------------------------------
// HERO SECTION: Ochilish Kadri
// --------------------------------------------------------
const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full flex flex-col justify-end pb-24 px-6 md:px-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
          alt="Dark Architecture" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-4xl">
        <h1 className="flex flex-col gap-2">
          <span className="hero-text font-sans font-bold text-3xl md:text-5xl lg:text-6xl text-foreground tracking-tight">
            Sun'iy intellekt va
          </span>
          <span className="hero-text dramatic-italic text-6xl md:text-8xl lg:text-9xl leading-[0.9] pb-4">
            mutlaq daromad.
          </span>
        </h1>
        <p className="hero-text text-foreground/70 font-mono text-sm md:text-base mt-6 max-w-lg mb-8">
          Sodda tildagi darslar, real amaliyotlar kafolati va vizual yaratuvchanlik orqali qisqa muddatda natijaga erishish arxitekturasi.
        </p>
        <div className="hero-text flex gap-4">
          <a href="https://t.me/managerjanob" target="_blank" rel="noreferrer" className="btn-magnetic bg-accent text-background px-8 py-4 rounded-full font-semibold flex items-center gap-2 group">
            <span className="relative z-10">@managerjanob ga yozish</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="btn-hover-layer"></div>
          </a>
        </div>
      </div>
    </section>
  );
};

// --------------------------------------------------------
// FEATURES: Interaktiv Artefaktlar
// --------------------------------------------------------

// Card 1: Diagnostik Aralashtirgich
const CardMixer = () => {
  const [labels, setLabels] = useState(["Murakkab terminlar yo'q", "Faqat insoniy til", "Sodda o'zlashtirish"]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLabels(prev => {
        const arr = [...prev];
        const last = arr.pop();
        arr.unshift(last);
        return arr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background border border-muted rounded-[2rem] p-8 shadow-xl flex flex-col justify-between h-[320px] overflow-hidden relative group">
      <div>
        <h3 className="text-xl font-bold font-sans mb-2">Tushunish</h3>
        <p className="text-sm font-mono text-foreground/60">Sodda tilda AI ni o'rgatish</p>
      </div>
      <div className="relative h-[120px] w-full mt-8 flex flex-col justify-center">
        {labels.map((lbl, i) => (
          <div 
            key={i} 
            className="absolute left-0 w-full text-center transition-all duration-700 font-mono text-sm border border-muted bg-background/50 py-3 rounded-xl backdrop-blur-sm"
            style={{
              transform: `translateY(${(i - 1) * 45}px) scale(${1 - Math.abs(i - 1) * 0.1})`,
              opacity: 1 - Math.abs(i - 1) * 0.5,
              zIndex: 10 - Math.abs(i - 1),
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {lbl}
          </div>
        ))}
      </div>
    </div>
  );
};

// Card 2: Telemetriya Yozuv Mashinkasi
const CardTypewriter = () => {
  const message = "Tizim faol: 2 oy ichida +$1000 daromadga chiqish strategiyasi yuklanmoqda...";
  const [text, setText] = useState("");
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i <= message.length) {
        setText(message.slice(0, i));
        i++;
      } else {
        setTimeout(() => { i = 0; }, 3000); // restart after pause
      }
    }, 80);
    const cursorBlink = setInterval(() => setCursor(c => !c), 500);
    return () => { clearInterval(typing); clearInterval(cursorBlink); };
  }, [message]);

  return (
    <div className="bg-background border border-muted rounded-[2rem] p-8 shadow-xl flex flex-col h-[320px] relative">
      <div className="absolute top-6 right-8 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
        <span className="text-[10px] uppercase font-mono tracking-widest text-accent">Jonli efir</span>
      </div>
      <h3 className="text-xl font-bold font-sans mb-2">Daromad</h3>
      <p className="text-sm font-mono text-foreground/60 mb-8">Moliyaviy strategiya mantiqi</p>
      
      <div className="flex-1 border border-muted/50 rounded-xl p-4 bg-muted/20 font-mono text-sm text-accent/80 leading-relaxed relative">
        {text}
        <span className="inline-block w-1.5 h-4 ml-1 bg-accent translate-y-0.5" style={{ opacity: cursor ? 1 : 0 }}></span>
      </div>
    </div>
  );
};

// Card 3: Kursor Protokoli Rejalashtirgichi
const CardPlanner = () => {
  const days = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"];
  const [active, setActive] = useState(2);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      // move to middle
      tl.to(cursorRef.current, { x: 120, y: 60, duration: 1, ease: 'power2.inOut' })
        // click
        .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
        .call(() => setActive(3))
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        // move to save
        .to(cursorRef.current, { x: 220, y: 140, duration: 1, ease: 'power2.inOut', delay: 0.5 })
        // click save
        .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
        .to(cursorRef.current, { scale: 1, duration: 0.1 })
        // disappear and reset
        .to(cursorRef.current, { opacity: 0, duration: 0.5 })
        .call(() => setActive(2))
        .set(cursorRef.current, { x: 0, y: 0, opacity: 1 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-background border border-muted rounded-[2rem] p-8 shadow-xl flex flex-col h-[320px] relative" ref={containerRef}>
      <h3 className="text-xl font-bold font-sans mb-2">Amaliyot</h3>
      <p className="text-sm font-mono text-foreground/60 mb-6">Faqat real amaliyotlar ko'rsatish</p>
      
      <div className="grid grid-cols-7 gap-1 md:gap-2 mb-6">
        {days.map((d, i) => (
          <div key={d} className={`text-center py-2 rounded-lg font-mono text-xs transition-colors duration-300 ${active === i ? 'bg-accent text-background' : 'bg-muted/30 text-foreground/50'}`}>
            {d}
          </div>
        ))}
      </div>
      
      <div className="mt-auto flex justify-end">
        <button className="text-xs font-mono px-4 py-2 border border-muted rounded-lg text-foreground/60">Saqlash</button>
      </div>

      <div ref={cursorRef} className="absolute top-20 left-10 w-6 h-6 z-10 pointer-events-none drop-shadow-md">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
          <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
};

const Features = () => {
  const ref = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 70%'
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out'
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={ref} className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="feature-card"><CardMixer /></div>
        <div className="feature-card"><CardTypewriter /></div>
        <div className="feature-card"><CardPlanner /></div>
      </div>
    </section>
  );
};

// --------------------------------------------------------
// PHILOSOPHY: Manifest
// --------------------------------------------------------
const Philosophy = () => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.phil-line', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={sectionRef} className="relative py-40 px-6 md:px-16 flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" 
          alt="Dark Texture" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-12">
        <p className="phil-line text-lg md:text-xl font-mono text-foreground/50 max-w-2xl mx-auto">
          Ko'pchilik AI o'qituvchilari quyidagilarga e'tibor qaratadi: zerikarli nazariya va ishlamaydigan qiyin terminlar.
        </p>
        <p className="phil-line text-4xl md:text-6xl lg:text-7xl font-sans font-bold leading-tight tracking-tight">
          Bizning asosiy e'tiborimiz: <br />
          <span className="dramatic-italic text-5xl md:text-7xl lg:text-8xl">yengil tushunish va tezkor daromad.</span>
        </p>
      </div>
    </section>
  );
};

// --------------------------------------------------------
// PROTOCOL: Yopishqoq Yig'iluvchi Arxiv
// --------------------------------------------------------
const Protocol = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.prot-card');
      
      cards.forEach((card, index) => {
        if(index < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            endTrigger: '.prot-container',
            end: 'bottom bottom',
            pin: true,
            pinSpacing: false,
          });
          
          gsap.to(card, {
            scale: 0.9 - (index * 0.02),
            opacity: 0.3,
            filter: 'blur(20px)',
            scrollTrigger: {
              trigger: cards[index + 1],
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            }
          });
        } else {
          ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            endTrigger: '.prot-container',
            end: 'bottom bottom',
            pin: true,
            pinSpacing: true,
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    { num: '01', title: 'Tushunish', desc: "AI vositalarini mutlaq nol darajadan boshlab tushunish. Neyrotarmoq mantiqini o'zlashtirish.", AnimComp: () => <div className="w-full h-full flex items-center justify-center"><div className="w-32 h-32 border border-accent rounded-full border-t-transparent animate-spin duration-[3000ms]"></div></div> },
    { num: '02', title: 'Amaliyot', desc: "O'rganilgan vositalarni real loyihalarda qo'llash va natija ko'rish. Mustahkam portfolioning shakllanishi.", AnimComp: () => <div className="w-full h-full relative overflow-hidden flex items-center"><div className="w-full h-0.5 bg-accent absolute top-1/2 shadow-[0_0_15px_#C9A84C] animate-[ping_2s_infinite]"></div></div> },
    { num: '03', title: 'Daromad', desc: "Olingan bilimlarni monetizatsiya qilishning sirlangan tizimi. +1000$ daromadga yo'l.", AnimComp: () => <div className="w-full h-full flex items-center justify-center"><Activity className="w-32 h-32 text-accent animate-pulse" /></div> }
  ];

  return (
    <section id="protocol" className="prot-container relative w-full pt-12" ref={containerRef}>
      {steps.map((step, i) => (
        <div key={i} className="prot-card w-full h-[100vh] flex items-center justify-center p-6 bg-background">
          <div className="max-w-6xl w-full h-[80vh] border justify-between p-12 overflow-hidden border-muted rounded-[3rem] bg-gradient-to-br from-background to-muted/20 shadow-2xl flex flex-col md:flex-row gap-12 relative isolate">
            <div className="absolute inset-0 z-[-1] opacity-5 noise-bg"></div>
            
            <div className="flex-1 flex flex-col justify-center">
              <span className="font-mono text-accent text-2xl mb-6">/ {step.num}</span>
              <h2 className="font-sans font-bold text-5xl md:text-7xl mb-6 tracking-tight">{step.title}</h2>
              <p className="font-mono text-foreground/70 text-lg md:text-xl max-w-lg leading-relaxed">
                {step.desc}
              </p>
            </div>
            
            <div className="flex-1 bg-background/50 rounded-3xl border border-muted/50 overflow-hidden relative">
               <step.AnimComp />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

// --------------------------------------------------------
// CTA & FOOTER: Tizim faoliyatini yakunlash
// --------------------------------------------------------
const CTABlock = () => {
  return (
    <section id="cta" className="py-40 px-6 md:px-16 max-w-5xl mx-auto text-center">
      <h2 className="text-4xl md:text-6xl font-bold mb-8">
        Harakat qilish <br /><span className="dramatic-italic">vaqti keldi.</span>
      </h2>
      <p className="font-mono text-foreground/60 mb-12 max-w-xl mx-auto">
        Keling, o'zgarishlarni bugundan boshlaymiz. Savollaringizga menejer batafsil javob beradi.
      </p>
      <a href="https://t.me/managerjanob" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-10 py-5 bg-accent text-background rounded-full font-semibold text-lg hover:scale-[1.03] transition-transform duration-300 shadow-[0_0_30px_rgba(201,168,76,0.2)]">
        @managerjanob orqali yozish <Zap className="w-5 h-5" />
      </a>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0F] pt-24 pb-12 px-6 md:px-16 rounded-t-[4rem] border-t border-muted">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-16">
        <div>
          <h3 className="font-sans font-bold text-3xl mb-4">Aql-Zakov</h3>
          <p className="font-mono text-sm text-foreground/50 max-w-xs">
            Sun'iy intellekt orqali moliya va ko'nikmalar darajasini oshirish tizimi.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 font-mono text-sm">
          <div className="flex flex-col gap-4">
            <span className="text-accent mb-2">Navigatsiya</span>
            <a href="#features" className="text-foreground/60 hover:text-foreground transition-colors">Afzalliklar</a>
            <a href="#philosophy" className="text-foreground/60 hover:text-foreground transition-colors">Falsafa</a>
            <a href="#protocol" className="text-foreground/60 hover:text-foreground transition-colors">Protokol</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-accent mb-2">Yuridik</span>
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">Maxfiylik Siyosati</a>
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">Foydalanish Shartlari</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-muted/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 bg-muted/20 px-4 py-2 rounded-full border border-muted/30">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
          <span className="font-mono text-xs uppercase tracking-wider text-foreground/70">Tizim Faol</span>
        </div>
        <div className="font-mono text-xs text-foreground/40">
          © {new Date().getFullYear()} AI Master. Barcha huquqlar himoyalangan.
        </div>
      </div>
    </footer>
  );
};

// --------------------------------------------------------
// MAIN COMPONENT EXPORT
// --------------------------------------------------------
export default function App() {
  return (
    <div className="bg-background min-h-screen text-foreground relative selection:bg-accent/30 selection:text-foreground">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <Protocol />
      <CTABlock />
      <Footer />
    </div>
  );
}
