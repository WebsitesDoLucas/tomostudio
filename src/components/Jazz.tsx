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
import billboardImg from '../assets/jazz/billboard.png';
import billboard2Img from '../assets/jazz/billboard2.png';
import blhcImg from '../assets/jazz/BLHC0954.JPG'; // Usado como Logo/Elemento Gráfico
import keychainImg from '../assets/jazz/Keychain Mockup.png';
import lanyardImg from '../assets/jazz/Lanyard ID badge mockup.png';
import postersImg from '../assets/jazz/Posters.png';
import tshirtImg from '../assets/jazz/T-Shirt_MockupTRÁS.png';
import wayfindingImg from '../assets/jazz/Wayfinding Sign Mockup.png';

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
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E85D96] via-[#E7883B] to-[#79883E] origin-left z-50"
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
      className="relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 via-white to-white pt-36 pb-20 lg:pt-48 lg:pb-32"
    >
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      <motion.div 
        style={{ opacity }}
        className="relative z-10 w-full px-6 lg:px-12"
      >
        <div className="text-center max-w-[1600px] mx-auto">
          
          <motion.div style={{ y: yText }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E85D96]/10 text-[#E85D96] text-sm font-bold uppercase tracking-wider mb-8"
              >
                Case Study · 2024
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl lg:text-6xl font-bold text-black max-w-5xl mx-auto leading-tight mb-12"
              >
                Um festival de cor e ritmo: Identidade visual para o Jazz Concert
              </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="inline-flex flex-wrap justify-center gap-x-12 gap-y-8 text-sm bg-white/80 backdrop-blur-sm border border-black/5 rounded-3xl px-12 py-8 shadow-sm"
          >
            <div className="text-center">
              <div className="text-xs text-black/40 uppercase tracking-wider mb-2 font-bold">Cliente</div>
              <div className="text-black font-bold text-lg">Jazz Concert London</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-black/40 uppercase tracking-wider mb-2 font-bold">Serviços</div>
              <div className="text-black font-bold text-lg">Event Branding & Wayfinding</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-12"
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

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div 
          style={{ opacity }}
          className="grid lg:grid-cols-2 gap-20 items-center"
        >
          <motion.div
            style={{ y }}
            className="relative aspect-square flex items-center justify-center"
          >
            <Magnetic>
                <div className="relative w-full h-full flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-black/5 z-10 mix-blend-multiply" />
                    <img 
                      src={billboardImg} 
                      alt="Jazz Concert Preview"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                    />
                </div>
            </Magnetic>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl lg:text-6xl font-bold text-black leading-tight mb-8">
                Música, Comida e Arte.
              </h2>
              <div className="space-y-6 text-lg text-black/70 leading-relaxed">
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

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center py-32 bg-gray-50">
      <div className="max-w-[900px] mx-auto px-6 lg:px-12 text-center">
        <motion.div style={{ scale, opacity }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl lg:text-7xl font-bold text-black leading-tight mb-12"
          >
            Como desenhar o{' '}
            <span className="relative inline-block">
              <span className="relative z-10">ritmo</span>
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-4 bg-[#E85D96]/20 -z-10 rounded-full"
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
            className="grid md:grid-cols-3 gap-8 mt-20"
          >
            {[
              'Captar a energia da improvisação do Jazz',
              'Criar sinalética clara mas divertida e imersiva',
              'Desenvolver um sistema flexível para merch e posters'
            ].map((challenge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative p-6 rounded-2xl transition-colors duration-300"
                style={{ 
                    backgroundColor: hoveredIndex === i ? 'rgba(255,255,255,0.8)' : 'transparent' 
                }}
              >
                <motion.div 
                    className="text-4xl font-bold text-[#E85D96]/20 mb-4"
                    animate={{ scale: hoveredIndex === i ? 1.1 : 1, color: hoveredIndex === i ? '#E85D96' : 'rgba(232, 93, 150, 0.2)' }}
                >
                  0{i + 1}
                </motion.div>
                <p className="text-lg text-black/70 leading-relaxed">
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

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
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
    <section ref={ref} className="relative min-h-screen flex items-center bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
        <motion.div 
          style={{ scale, opacity }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-black/40 tracking-[0.3em] uppercase mb-12 font-bold"
          >
            A Solução Gráfica
          </motion.p>

          <div className="relative mb-20 group flex justify-center" onMouseMove={handleMouseMove}>
            <motion.div
              className="relative aspect-[21/9] w-full max-w-5xl bg-white rounded-3xl flex items-center justify-center shadow-2xl shadow-[#E85D96]/5 overflow-hidden border border-black/5"
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
                  className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
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
              
              <div className="w-[60%] md:w-[40%] relative z-10">
                <img 
                  src={blhcImg} 
                  alt="Grafismo Jazz Concert" 
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
            </motion.div>
          </div>

          <p className="text-xl md:text-2xl text-black/70 max-w-3xl mx-auto leading-relaxed">
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
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  const handleCopy = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="relative py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            Paleta de Festival
          </h2>
          <p className="text-xl text-black/60 max-w-2xl mx-auto">
            Cores de alto contraste que comunicam energia, festa e o espírito da cultura urbana.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {colors.map((color, i) => (
            <motion.div key={color.name} variants={itemVariants}>
              <motion.div 
                 className="group cursor-pointer relative"
                 whileHover={{ y: -10 }}
                 onClick={() => handleCopy(color.hex, i)}
              >
                <div className={`${color.bg} aspect-square rounded-3xl mb-6 shadow-lg border border-black/5 relative overflow-hidden`}>
                    {copiedIndex === i && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-sm">
                            <div className="bg-white p-2 rounded-full">
                                <Check className="text-green-500" />
                            </div>
                        </div>
                    )}
                </div>
                <h4 className="font-bold text-black text-lg mb-1">{color.name}</h4>
                <div className="flex items-center gap-2">
                    <p className="text-sm text-black/40 font-mono">{color.hex}</p>
                    {copiedIndex === i && <span className="text-xs text-green-500 font-bold">Copiado!</span>}
                </div>
              </motion.div>
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

  const yFast = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const applications = [
    { name: 'Sinalética (Wayfinding)', img: wayfindingImg, colSpan: 'md:col-span-1' },
    { name: 'Posters de Rua', img: postersImg, colSpan: 'md:col-span-1' },
    { name: 'Lanyard & ID Badge', img: lanyardImg, colSpan: 'md:col-span-1' },
    { name: 'T-Shirt (Staff)', img: tshirtImg, colSpan: 'md:col-span-1' },
    { name: 'Merchandise', img: keychainImg, colSpan: 'md:col-span-1' },
    { name: 'Outdoors', img: billboard2Img, colSpan: 'md:col-span-1' },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            A Experiência Física
          </h2>
          <p className="text-xl text-black/60 max-w-2xl mx-auto">
            A identidade visual transportada para o recinto através de aplicações imersivas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {applications.map((app, i) => (
            <motion.div
              key={app.name}
              style={{ y: i % 2 === 0 ? ySlow : yFast }}
              className={`${app.colSpan}`}
            >
              <motion.div
                className="relative h-full rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <img 
                  src={app.img} 
                  alt={app.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                   <span className="text-sm font-bold text-black uppercase tracking-wide">{app.name}</span>
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
    <section ref={ref} className="relative py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            O ritmo em movimento
          </h2>
          <p className="text-xl text-black/60 max-w-2xl mx-auto">
            A energia vibrante do festival materializada num espetáculo visual.
          </p>
        </div>

        {/* Alterado para um layout 16:9 centrado e imersivo (em vez de quadrado pequeno) */}
        <div className="max-w-4xl mx-auto relative" ref={containerRef} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          
          <div 
            ref={cursorRef}
            className={`fixed top-0 left-0 w-20 h-20 bg-[#E85D96] rounded-full flex items-center justify-center pointer-events-none z-50 mix-blend-normal transition-opacity duration-200 shadow-xl ${isHovering ? 'opacity-100' : 'opacity-0'}`}
            style={{ willChange: 'transform', position: 'absolute' }} 
          >
            <Play size={24} className="text-white fill-white ml-1" />
          </div>

          {[video1].map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative group cursor-none"
            >
              {/* aspect-video cria o look cinematográfico 16:9 */}
              <div className="relative aspect-video bg-black rounded-3xl overflow-hidden border border-black/5 shadow-2xl">
                <video 
                  src={src} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
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
    <section className="relative min-h-screen flex items-center bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-black/40 uppercase tracking-[0.3em] mb-8">
            Próximo projeto
          </p>

          <Link to="/trabalhos">
            <Magnetic>
                <motion.div
                whileHover={{ scale: 1.02, y: -10 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="group max-w-4xl mx-auto cursor-pointer"
                >
                <h3 className="text-6xl lg:text-7xl font-bold text-black mb-4 group-hover:text-[#E85D96] transition-colors">
                    Ver todos os projetos
                </h3>
                <div className="inline-flex items-center gap-2 text-[#E85D96] font-medium">
                    Explorar portfólio
                    <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
                </motion.div>
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