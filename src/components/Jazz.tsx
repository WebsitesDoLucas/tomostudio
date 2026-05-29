import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  useMotionTemplate,
  useInView,
  Variants
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
      className="will-change-transform inline-block"
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
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E85D96] via-[#E7883B] to-[#79883E] origin-left z-50 pointer-events-none"
      style={{ scaleX }}
    />
  );
};

// ============================================
// ANIMATION WRAPPER
// ============================================
const FadeIn = ({ children, delay = 0, yOffset = 40 }: { children: React.ReactNode, delay?: number, yOffset?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: yOffset }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] as const }}
    className="will-change-transform"
  >
    {children}
  </motion.div>
);

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
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const titleLines = [
    "Um festival imersivo",
    "guiado pela cor",
    "e pelo ritmo."
  ];

  return (
    <section ref={containerRef} className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-white overflow-hidden flex flex-col items-center min-h-[90vh]">
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
        }}
      >
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="absolute top-0 right-0 w-full lg:w-[60%] h-[600px] flex items-center justify-center lg:justify-end lg:pr-[10%]">
          <motion.div 
            animate={{ 
              scale: [1, 1.15, 1],
              x: ["-2rem", "1rem", "-2rem"],
              y: ["-2rem", "1rem", "-2rem"],
              rotate: [0, 45, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#E85D96]/20 rounded-full blur-[100px] lg:blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: ["2rem", "-1rem", "2rem"],
              y: ["2rem", "-2rem", "2rem"],
              rotate: [0, -45, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] bg-[#E7883B]/20 rounded-full blur-[100px] lg:blur-[120px]" 
          />
        </div>
      </div>
      
      <motion.div 
        style={{ opacity, y: yText }}
        className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full will-change-transform"
      >
        <div className="max-w-5xl flex flex-col gap-1 md:gap-3 mb-6 md:mb-8">
          {titleLines.map((line, index) => (
            <div key={index} className="overflow-hidden pb-2">
              <motion.h1
                initial={{ y: "110%", rotate: 2, opacity: 0 }}
                animate={{ y: "0%", rotate: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.1 + (index * 0.15), ease: [0.16, 1, 0.3, 1] as const }}
                className="text-5xl sm:text-6xl md:text-8xl font-bold text-black tracking-tight leading-[1] drop-shadow-sm"
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-16 md:mt-24 pt-8 border-t border-black/10 relative"
        >
          <motion.div 
            className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-black/30 to-transparent"
            initial={{ x: "-100%", width: "50%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
          />

          {[
            { title: "Cliente", content: <p className="text-base font-medium text-black">Jazz Concert London</p> },
            { title: "Tipologia", content: <p className="text-base font-medium text-black">Event Branding</p> },
            { title: "Serviços", content: <ul className="text-base font-medium text-black space-y-1"><li>Direção de Arte</li><li>Identidade Visual</li><li>Sinalética</li></ul> },
            { title: "Ano", content: <p className="text-base font-medium text-black border-b border-black/20 pb-0.5">2024</p> }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 + (i * 0.1), ease: [0.16, 1, 0.3, 1] as const }}
            >
              <h4 className="text-xs font-bold text-black/40 uppercase tracking-widest mb-2">{item.title}</h4>
              {item.content}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-12 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[10px] text-black/30 uppercase tracking-[0.3em] font-bold">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-black/20 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

// ============================================
// SYSTEM SUB-COMPONENT: AWWWARDS FLUID ROW
// ============================================
const ConceptRow = ({ item, index }: { item: any, index: number }) => {
  const rowRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const isScrolledView = useInView(rowRef, { margin: "-30% 0px -30% 0px" });
  const isActive = isHovered || isScrolledView;
  const isLightBlue = item.color === 'light';

  const easeGolden = [0.76, 0, 0.24, 1] as const;

  return (
    <motion.div 
      ref={rowRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, delay: index * 0.1, ease: easeGolden }}
      className="border-b border-black/10 first:border-t group relative overflow-hidden cursor-pointer will-change-transform"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="absolute inset-0 bg-gray-50 origin-bottom z-0"
        initial={false}
        animate={{ scaleY: isActive ? 1 : 0 }}
        transition={{ duration: 0.6, ease: easeGolden }}
      />

      <div className="relative z-10 px-6 lg:px-12 py-10 lg:py-14 w-full flex flex-col">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-6 lg:gap-16">
            <motion.span 
              animate={{ color: isActive ? (isLightBlue ? '#E85D96' : '#E7883B') : 'rgba(0,0,0,0.2)' }}
              transition={{ duration: 0.4 }}
              className="font-mono text-sm font-bold"
            >
              ( {item.number} )
            </motion.span>
            
            <motion.h3 
              animate={{ x: isActive ? 24 : 0 }}
              transition={{ duration: 0.6, ease: easeGolden }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-black"
            >
              {item.title}
            </motion.h3>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
          transition={{ 
            height: { duration: 0.6, ease: easeGolden },
            opacity: { duration: 0.4, ease: "linear", delay: isActive ? 0.1 : 0 }
          }}
          className="overflow-hidden"
        >
          <div className="pt-8 lg:pt-12 pl-14 lg:pl-[120px] grid lg:grid-cols-12 gap-8 pb-2">
            <div className="lg:col-span-7">
              <p className="text-lg lg:text-xl text-black/60 font-medium leading-relaxed">
                {item.description}
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-wrap content-start gap-3">
              {item.features.map((feature: string, i: number) => (
                <motion.span 
                  key={feature} 
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                  transition={{ duration: 0.4, delay: isActive ? 0.2 + (i * 0.05) : 0, ease: easeGolden }}
                  className="px-4 py-2 rounded-full text-xs font-bold border border-black/10 text-black/50 bg-white/50"
                >
                  {feature}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ============================================
// CONCEPT SECTION
// ============================================
const ConceptSection = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const yImage = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const conceptData = [
    {
      number: '01',
      title: 'A Improvisação',
      color: 'dark',
      description: 'O objetivo passava por capturar a natureza imprevisível e enérgica do Jazz, fugindo aos clichés noturnos tradicionais e apostando num estilo "groovy".',
      features: ['Formas orgânicas', 'Estética anos 70', 'Fuga ao cliché']
    },
    {
      number: '02',
      title: 'A Atmosfera',
      color: 'light',
      description: 'Mais do que música, o festival une gastronomia e expressão artística na icónica Oxford Street. A marca precisava de transparecer uma sensação festiva e acolhedora.',
      features: ['Música & Comida', 'Cultura urbana', 'Comunidade']
    },
    {
      number: '03',
      title: 'O Sistema Camaleónico',
      color: 'dark',
      description: 'As formas modulares e a tipografia expansiva funcionam como texturas ou janelas, permitindo aplicar o visual system em qualquer suporte de forma imersiva.',
      features: ['Flexibilidade gráfica', 'Sinalética clara', 'Aplicações dinâmicas']
    }
  ];

  return (
    <section ref={containerRef} className="relative py-24 lg:py-36 bg-gray-50 border-t border-black/5 overflow-hidden flex flex-col items-center">
      
      <div className="max-w-[1000px] mx-auto px-6 w-full text-center flex flex-col items-center mb-24 lg:mb-32">
        <FadeIn yOffset={50}>
          <span className="text-[10px] tracking-[0.3em] font-bold text-[#E85D96] uppercase block mb-6">
            // Experiência Musical
          </span>
        </FadeIn>
        <FadeIn delay={0.1} yOffset={50}>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-black tracking-tighter leading-[1.05] max-w-4xl mb-6 sm:mb-10">
            Desconstruir os clichés visuais do Jazz.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-lg sm:text-xl text-black/50 max-w-2xl mx-auto font-medium mb-12 sm:mb-16">
            Sediado em Oxford Street, o evento pedia um universo gráfico explosivo, jovem e inspirado na estética colorida dos anos 70, desenhado de forma moderna.
          </p>
        </FadeIn>

        <motion.div style={{ y: yImage }} className="w-full max-w-[480px] aspect-square flex items-center justify-center my-6 relative z-10 will-change-transform">
          <Magnetic>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
              className="w-full h-full bg-white rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.06)] border border-black/5 p-8 flex items-center justify-center will-change-transform"
            >
              <img 
                src={billboardImg} 
                alt="Jazz Concert Ambiente" 
                className="w-full h-full object-cover rounded-[1.5rem]"
              />
            </motion.div>
          </Magnetic>
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full bg-white pt-16 lg:pt-24 pb-12 lg:pb-16 rounded-[3rem] border border-black/[0.03] shadow-sm relative z-20">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <FadeIn>
            <span className="text-xs font-mono font-bold text-black/40 block mb-3">O Desafio Gráfico</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-xl sm:text-2xl text-black/50 font-medium tracking-tight">
              A resposta estética para representar o som e o espaço urbano ao mesmo tempo.
            </p>
          </FadeIn>
        </div>

        <div className="flex flex-col relative">
          {conceptData.map((item, index) => (
            <ConceptRow key={item.number} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// LOGO / GRAFISMO REVEAL SECTION
// ============================================
const LogoRevealSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section ref={ref} className="relative min-h-[60vh] sm:min-h-screen flex items-center bg-white py-16 sm:py-32 border-b border-black/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <motion.div 
          style={{ scale, opacity }}
          className="text-center will-change-transform"
        >
          <FadeIn yOffset={30}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-10 sm:mb-16 tracking-tight">
              A Solução Gráfica
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} yOffset={30}>
            <div className="relative mb-10 sm:mb-20 group flex justify-center w-full" onMouseMove={handleMouseMove}>
              <motion.div
                className="relative aspect-[21/9] w-full max-w-5xl bg-gray-50 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-inner overflow-hidden border border-black/5"
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
                          rgba(232, 93, 150, 0.08),
                          transparent 80%
                        )
                      `,
                    }}
                  />
                
                <div className="w-[70%] sm:w-[60%] md:w-[45%] relative z-10">
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
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-base sm:text-xl md:text-2xl text-black/70 max-w-3xl mx-auto leading-relaxed px-2 font-medium">
              Uma tipografia expandida que ocupa o espaço de forma arrojada. As formas complementares servem como janelas gráficas, dando à marca uma capacidade camaleónica e adaptável.
            </p>
          </FadeIn>
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

  const handleCopy = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-gray-50 border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="text-center mb-12 sm:mb-20">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 tracking-tight">
              Paleta de Festival
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-base sm:text-xl text-black/50 max-w-2xl mx-auto font-medium">
              Cores de alto contraste que comunicam a energia, a festa e o espírito vibrante da cultura urbana dos anos 70.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 w-full">
          {colors.map((color, i) => (
            <motion.div 
              key={color.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <div 
                 className="group cursor-pointer relative"
                 onClick={() => handleCopy(color.hex, i)}
              >
                <div className={`${color.bg} aspect-square rounded-2xl sm:rounded-[2rem] mb-4 shadow-md border border-black/5 relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-1.5`}>
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
                    <p className="text-[11px] sm:text-sm text-black/40 font-mono bg-white px-1.5 py-0.5 rounded border border-black/[0.03]">{color.hex}</p>
                    {copiedIndex === i && <span className="text-[10px] sm:text-xs text-green-500 font-bold">Copiado!</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// APPLICATIONS SECTION (Zero Lag Optimizado)
// ============================================
const ApplicationsSection = () => {
  const applications = [
    { name: 'Sinalética (Wayfinding)', img: wayfindingImg, aspect: 'aspect-[4/5]', colSpan: 'col-span-1' },
    { name: 'Posters de Rua', img: postersImg, aspect: 'aspect-[4/5]', colSpan: 'col-span-1' },
    { name: 'T-Shirt (Staff)', img: tshirtImg, aspect: 'aspect-[4/5]', colSpan: 'col-span-1' },
    { name: 'Merchandise Promocional', img: keychainImg, aspect: 'aspect-[4/5]', colSpan: 'col-span-1' },
    { name: 'Lanyard & Credencial', img: lanyardImg, aspect: 'aspect-[4/5]', colSpan: 'col-span-1' },
    { name: 'Billboard Outdoor', img: billboard2Img, aspect: 'aspect-[4/5]', colSpan: 'col-span-1' },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="text-center mb-16 sm:mb-24">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 tracking-tighter">
              A Experiência Física.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg sm:text-xl text-black/50 max-w-2xl mx-auto font-medium">
              A identidade gráfica imersiva aplicada no recinto através de sinalética arrojada e merchandise.
            </p>
          </FadeIn>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          /* TRUQUE DE PERFORMANCE: Dispara 800px ANTES de aparecer no ecrã */
          viewport={{ once: true, margin: "800px" }}
        >
          {applications.map((app) => (
            <motion.div
              key={app.name}
              variants={itemVariants}
              className={`will-change-transform transform-gpu w-full ${app.colSpan}`}
            >
              <div className={`relative ${app.aspect} rounded-3xl overflow-hidden group cursor-pointer border border-black/[0.03] shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-shadow duration-700 w-full`}>
                {/* REMOVIDO o loading="lazy" para não engasgar o scroll, MANTIDO o decoding="async" */}
                <img 
                  src={app.img} 
                  alt={app.name} 
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-[1.05] will-change-transform transform-gpu"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-[0.16,1,0.3,1]">
                   <span className="text-xs font-bold text-white bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 uppercase tracking-widest">{app.name}</span>
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
// VIDEO NARRATIVE SECTION (C/ Cursor Magnético Mantido)
// ============================================
const VideoSection = () => {
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
    <section className="relative py-16 sm:py-24 lg:py-32 bg-gray-50 border-y border-black/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="text-center mb-16 lg:mb-20">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight">
              O Ritmo em Movimento
            </h2>
          </FadeIn>
        </div>

        <div className="max-w-5xl mx-auto w-full relative" ref={containerRef} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          
          <div 
            ref={cursorRef}
            className={`fixed top-0 left-0 w-20 h-20 bg-[#E85D96] rounded-full sm:flex items-center justify-center pointer-events-none z-50 mix-blend-normal transition-opacity duration-200 shadow-xl hidden ${isHovering ? 'opacity-100' : 'opacity-0'}`}
            style={{ willChange: 'transform', position: 'absolute' }} 
          >
            <Play size={24} className="text-white fill-white ml-1" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative group sm:cursor-none w-full will-change-transform"
          >
            <div className="relative aspect-video rounded-[2rem] sm:rounded-[2.5rem] bg-black border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.04)] overflow-hidden">
              <video 
                src={video1} 
                autoPlay 
                loop 
                muted 
                playsInline 
                preload="metadata"
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          </motion.div>
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
    <section className="relative min-h-[60vh] sm:min-h-[80vh] flex items-center bg-white py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <p className="text-xs sm:text-sm text-black/40 uppercase tracking-[0.3em] mb-6 sm:mb-8 font-bold">
            Próximo projeto
          </p>

          <Link to="/trabalhos" className="block w-full">
            <Magnetic>
                <div className="group max-w-4xl mx-auto cursor-pointer px-2">
                  <h3 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-black mb-4 group-hover:text-[#E85D96] transition-colors tracking-tighter leading-tight">
                      Ver todos os projetos
                  </h3>
                  <div className="inline-flex items-center gap-2 text-[#E85D96] font-bold uppercase tracking-wider text-xs sm:text-sm mt-2 sm:mt-4 border-b-2 border-[#E85D96] pb-1">
                      Explorar portfólio
                      <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} />
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
      <ConceptSection />
      <LogoRevealSection />
      <ColorSystemSection />
      <ApplicationsSection />
      <VideoSection />
      <OutroSection />
    </div>
  );
};