import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  useMotionTemplate 
} from 'framer-motion';
import { ArrowUpRight, Check, Play } from 'lucide-react';
import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';

// ============================================
// IMPORTAÇÃO DE ASSETS (PASTA JAZZ)
// ============================================
import billboardImg from '../assets/jazz/billboard.webp';
import billboard2Img from '../assets/jazz/billboard2.webp';
import blhcImg from '../assets/jazz/BLHC0954.webp'; // Usado como Logo/Elemento Gráfico
import keychainImg from '../assets/jazz/Keychain.webp';
import lanyardImg from '../assets/jazz/Lanyard.webp';
import postersImg from '../assets/jazz/Posters.webp';
import tshirtImg from '../assets/jazz/T-Shirt_MockupTRÁS.webp';
import wayfindingImg from '../assets/jazz/Wayfinding.webp';

// Vídeo
import video1 from '../assets/jazz/JAZZCONCERTOfim.mp4';

// Cores Oficiais Jazz Concert 
const GROOVY_PINK = "#E85D96";
const RETRO_ORANGE = "#E7883B";
const OLIVE_GREEN = "#79883E";
const LILAC_VIBE = "#D1A0D6";

// ============================================
// UTILS: MAGNETIC COMPONENT
// ============================================
const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    position.x.set(middleX * 0.1); 
    position.y.set(middleY * 0.1);
  };

  const reset = () => {
    position.x.set(0);
    position.y.set(0);
  };

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x, y }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
};

// ============================================
// SCROLL PROGRESS
// ============================================
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E85D96] via-[#E7883B] to-[#79883E] origin-left z-50 pointer-events-none"
      style={{ scaleX }}
    />
  );
};

// ============================================
// HERO SECTION
// ============================================
const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 80]); 

  return (
    <section 
      ref={containerRef} 
      className="relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 via-white to-white pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-48 lg:pb-32"
    >
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      <motion.div 
        style={{ opacity }}
        className="relative z-10 w-full px-4 sm:px-6 lg:px-12"
      >
        <div className="text-center max-w-[1600px] mx-auto">
          
          <motion.div style={{ y: yText }} className="will-change-transform">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E85D96]/10 text-[#E85D96] text-xs sm:text-sm font-bold uppercase tracking-wider mb-6 sm:mb-8"
              >
                Case Study · 2024
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black max-w-5xl mx-auto leading-tight mb-8 sm:mb-12 tracking-tight break-words"
              >
                Um festival de cor e ritmo: Identidade visual para o Jazz Concert
              </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="inline-flex flex-col sm:flex-row justify-center gap-x-12 gap-y-6 text-sm bg-white/80 backdrop-blur-sm border border-black/5 rounded-2xl sm:rounded-3xl px-6 py-6 sm:px-12 sm:py-8 shadow-sm w-full sm:w-auto text-center"
          >
            <div>
              <div className="text-xs text-black/40 uppercase tracking-wider mb-1 font-bold">Cliente</div>
              <div className="text-black font-bold text-base sm:text-lg">Jazz Concert London</div>
            </div>
            <div className="hidden sm:block w-px bg-black/10 self-stretch" />
            <div>
              <div className="text-xs text-black/40 uppercase tracking-wider mb-1 font-bold">Serviços</div>
              <div className="text-black font-bold text-base sm:text-lg">Event Branding & Wayfinding</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-12 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-[10px] text-black/30 uppercase tracking-[0.3em]">Scroll</span>
            <div className="w-px h-16 bg-gradient-to-b from-[#E85D96]/40 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ============================================
// CONTEXT SECTION
// ============================================
const ContextSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center py-16 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <motion.div 
          style={{ opacity }}
          className="grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-20 items-center w-full"
        >
          <motion.div
            style={{ y }}
            className="relative aspect-square w-full max-w-[450px] mx-auto lg:max-w-none flex items-center justify-center will-change-transform"
          >
            <Magnetic>
                <div className="relative w-full h-full flex items-center justify-center rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-black/5 z-10 mix-blend-multiply" />
                    <img 
                      src={billboardImg} 
                      alt="Jazz Concert Preview"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                    />
                </div>
            </Magnetic>
          </motion.div>

          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-black leading-tight mb-6 sm:mb-8 tracking-tight">
                Música, Comida e Arte.
              </h2>
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-black/70 leading-relaxed">
                <p>
                  O Jazz Concert, sediado em Oxford Street, Londres, não é apenas sobre música. 
                  É uma celebração cultural vibrante que une a improvisação sonora à expressão artística 
                  e à gastronomia.
                </p>
                <p>
                  O desafio era afastar-nos dos clichés visuais do Jazz (silhuetas de saxofones ou tons noturnos) 
                  e criar um universo gráfico explosivo e jovem, inspirado na estética dos anos 70, 
                  mas desenhado com uma abordagem moderna e arrojada.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// CHALLENGE SECTION
// ============================================
const ChallengeSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center py-16 sm:py-24 lg:py-32 bg-gray-50">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-12 text-center w-full">
        <motion.div style={{ scale, opacity }} className="will-change-transform w-full">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl lg:text-7xl font-bold text-black leading-tight mb-8 sm:mb-12 tracking-tight"
          >
            Como desenhar o{' '}
            <span className="relative inline-block">
              <span className="relative z-10">ritmo</span>
              <motion.span
                className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-4 bg-[#E85D96]/20 -z-10 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </span>
            ?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-20 text-left w-full"
          >
            {[
              'Captar a energia da improvisação do Jazz',
              'Criar sinalética clara mas divertida e imersiva',
              'Desenvolver um sistema flexível para merch e posters'
            ].map((challenge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative p-6 rounded-2xl transition-colors duration-300 w-full"
                style={{ 
                    backgroundColor: hoveredIndex === i ? 'rgba(255,255,255,0.8)' : 'transparent' 
                }}
              >
                <motion.div 
                    className="text-3xl sm:text-4xl font-bold text-[#E85D96]/20 mb-3"
                    animate={{ scale: hoveredIndex === i ? 1.05 : 1, color: hoveredIndex === i ? '#E85D96' : 'rgba(232, 93, 150, 0.2)' }}
                >
                  0{i + 1}
                </motion.div>
                <p className="text-base sm:text-lg text-black/70 leading-relaxed">
                  {challenge}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// LOGO REVEAL SECTION
// ============================================
const LogoRevealSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Spotlight logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section ref={ref} className="relative min-h-[60vh] sm:min-h-screen flex items-center bg-white py-16 sm:py-32">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <motion.div 
          style={{ scale, opacity }}
          className="text-center will-change-transform"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm text-black/40 tracking-[0.3em] uppercase mb-8 sm:mb-12 font-bold"
          >
            A Solução Gráfica
          </motion.p>

          <div className="relative mb-10 sm:mb-20 group flex justify-center w-full" onMouseMove={handleMouseMove}>
            <motion.div
              className="relative aspect-[21/9] w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl shadow-[#E85D96]/5 overflow-hidden border border-black/5"
              whileInView={{ 
                boxShadow: [
                  "0 0 0 0px rgba(232, 93, 150, 0)",
                  "0 0 0 20px rgba(232, 93, 150, 0.1)",
                  "0 0 0 0px rgba(232, 93, 150, 0)"
                ]
              }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5 }}
            >
               <motion.div
                  className="pointer-events-none absolute -inset-px rounded-2xl sm:rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 hidden sm:block"
                  style={{
                    background: useMotionTemplate`
                      radial-gradient(
                        650px circle at ${mouseX}px ${mouseY}px,
                        rgba(232, 93, 150, 0.1),
                        transparent 80%
                      )
                    `,
                  }}
                />
              
              <div className="w-[70%] sm:w-[60%] md:w-[40%] relative z-10">
                <img 
                  src={blhcImg} 
                  alt="Grafismo Jazz Concert" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
            </motion.div>
          </div>

          <p className="text-base sm:text-xl md:text-2xl text-black/70 max-w-3xl mx-auto leading-relaxed px-2">
            Uma tipografia "bubbly" e expandida que ocupa o espaço de forma arrojada. 
            As formas complementares (nuvens e estrelas de 4 pontas) servem como janelas ou texturas, 
            dando à marca uma capacidade camaleónica.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// COLOR SYSTEM 
// ============================================
const ColorSystemSection = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const colors = [
    { name: 'Hot Pink', hex: '#E85D96', bg: 'bg-[#E85D96]' },
    { name: 'Retro Orange', hex: '#E7883B', bg: 'bg-[#E7883B]' },
    { name: 'Olive Green', hex: '#79883E', bg: 'bg-[#79883E]' },
    { name: 'Lilac Vibe', hex: '#D1A0D6', bg: 'bg-[#D1A0D6]' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  const handleCopy = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 tracking-tight">
            Paleta de Festival
          </h2>
          <p className="text-base sm:text-xl text-black/60 max-w-2xl mx-auto">
            Cores de alto contraste que comunicam energia, festa e o espírito da cultura urbana.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {colors.map((color, i) => (
            <motion.div key={color.name} variants={itemVariants} className="will-change-transform">
              <div 
                 className="group cursor-pointer relative"
                 onClick={() => handleCopy(color.hex, i)}
              >
                <div className={`${color.bg} aspect-square rounded-2xl sm:rounded-3xl mb-4 shadow-md border border-black/5 relative overflow-hidden`}>
                    {copiedIndex === i && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-sm">
                            <div className="bg-white p-2 rounded-full shadow-sm">
                                <Check className="text-green-500" size={14} />
                            </div>
                        </div>
                    )}
                </div>
                <h4 className="font-bold text-black text-sm sm:text-lg mb-0.5">{color.name}</h4>
                <div className="flex items-center gap-2">
                    <p className="text-[11px] sm:text-sm text-black/40 font-mono bg-gray-50 px-1.5 py-0.5 rounded border border-black/[0.03]">{color.hex}</p>
                    {copiedIndex === i && <span className="text-[10px] sm:text-xs text-green-500 font-bold">Copiado!</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// APPLICATIONS SECTION 
// ============================================
const ApplicationsSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yFast = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -15]);

  const [isMobile, setIsMobile] = useState(false);
  useLayoutEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const applications = [
    { name: 'Sinalética (Wayfinding)', img: wayfindingImg, colSpan: 'col-span-1' },
    { name: 'Posters de Rua', img: postersImg, colSpan: 'col-span-1' },
    { name: 'Lanyard & ID Badge', img: lanyardImg, colSpan: 'col-span-1' },
    { name: 'T-Shirt (Staff)', img: tshirtImg, colSpan: 'col-span-1' },
    { name: 'Merchandise', img: keychainImg, colSpan: 'col-span-1' },
    { name: 'Outdoors', img: billboard2Img, colSpan: 'col-span-1' },
  ];

  return (
    <section ref={ref} className="relative py-16 sm:py-24 lg:py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 tracking-tight">
            A Experiência Física
          </h2>
          <p className="text-base sm:text-xl text-black/60 max-w-2xl mx-auto">
            A identidade visual transportada para o recinto através de aplicações imersivas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-[250px] sm:auto-rows-[300px] w-full">
          {applications.map((app, i) => (
            <motion.div
              key={app.name}
              style={{ y: isMobile ? 0 : (i % 2 === 0 ? ySlow : yFast) }}
              className={`${app.colSpan} will-change-transform`}
            >
              <motion.div
                className="relative h-full rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-black/5"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              >
                <img 
                  src={app.img} 
                  alt={app.name} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5 sm:bg-black/0 group-hover:bg-black/10 transition-colors" />
                
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all transform translate-y-0 sm:translate-y-2 group-hover:translate-y-0 shadow-sm">
                   <span className="text-[10px] sm:text-xs font-bold text-black uppercase tracking-wide">{app.name}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// VIDEO NARRATIVE SECTION
// ============================================
const VideoSection = () => {
  const ref = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const cursor = cursorRef.current;
    if (!container || !cursor) return;

    const moveCursor = (e: MouseEvent) => {
      if (!isHovering) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - 40; 
      const y = e.clientY - rect.top - 40;
      cursor.style.transform = `translate(${x}px, ${y}px)`;
    };

    container.addEventListener('mousemove', moveCursor);
    return () => container.removeEventListener('mousemove', moveCursor);
  }, [isHovering]);

  return (
    <section ref={ref} className="relative py-16 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 tracking-tight">
            O ritmo em movimento
          </h2>
          <p className="text-base sm:text-xl text-black/60 max-w-2xl mx-auto">
            A energia vibrante do festival materializada num espetáculo visual.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative w-full" ref={containerRef} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          
          <div 
            ref={cursorRef}
            className={`fixed top-0 left-0 w-20 h-20 bg-[#E85D96] rounded-full sm:flex items-center justify-center pointer-events-none z-50 mix-blend-normal transition-opacity duration-200 shadow-xl hidden ${isHovering ? 'opacity-100' : 'opacity-0'}`}
            style={{ willChange: 'transform', position: 'absolute' }} 
          >
            <Play size={24} className="text-white fill-white ml-1" />
          </div>

          {[video1].map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative group sm:cursor-none w-full will-change-transform"
            >
              <div className="relative aspect-video bg-black rounded-2xl sm:rounded-3xl overflow-hidden border border-black/5 shadow-2xl">
                <video 
                  src={src} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  preload="metadata"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// OUTRO SECTION
// ============================================
const OutroSection = () => {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[80vh] flex items-center bg-white border-t border-black/5 py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="will-change-transform"
        >
          <p className="text-xs sm:text-sm text-black/40 uppercase tracking-[0.3em] mb-6 sm:mb-8 font-bold">
            Próximo projeto
          </p>

          <Link to="/trabalhos" className="block w-full">
            <Magnetic>
                <div className="group max-w-4xl mx-auto cursor-pointer px-2">
                  <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-4 group-hover:text-[#E85D96] transition-colors tracking-tight break-words leading-tight">
                      Ver todos os projetos
                  </h3>
                  <div className="inline-flex items-center gap-2 text-[#E85D96] font-bold uppercase tracking-wider text-xs sm:text-sm mt-2 sm:mt-4 border-b-2 border-[#E85D96] pb-1">
                      Explorar portfólio
                      <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={14} />
                  </div>
                </div>
            </Magnetic>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// MAIN COMPONENT EXPORT
// ============================================
export const Jazz = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="bg-white overflow-x-hidden w-full selection:bg-[#E85D96] selection:text-white">
      <Navigation />
      <ScrollProgress />
      <HeroSection />
      <ContextSection />
      <ChallengeSection />
      <LogoRevealSection />
      <ColorSystemSection />
      <ApplicationsSection />
      <VideoSection />
      <OutroSection />
    </div>
  );
};