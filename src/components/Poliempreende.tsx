import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue,
  AnimatePresence,
  useInView,
  Variants
} from 'framer-motion';
import { ArrowUpRight, Check, Download, Play, X } from 'lucide-react';
import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';

// ============================================
// IMPORTAÇÃO DE ASSETS
// ============================================
import logoImg from '../assets/poliempreende/poliempreende.webp';
import antesImg from '../assets/poliempreende/AntesPoliempreende.webp';
import billboardImg from '../assets/poliempreende/Billboard.webp';
import posterImg from '../assets/poliempreende/Poster.webp';
import socialImg from '../assets/poliempreende/Post.webp';
import tshirtImg from '../assets/poliempreende/tshirt.webp';
import toteImg from '../assets/poliempreende/tote.webp';
import standImg from '../assets/poliempreende/Stand.webp';
import websiteImg from '../assets/poliempreende/Website.webp';
import video2 from '../assets/poliempreende/VideoPromocional1.mp4';

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
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2c9ed6] via-[#3f75ed] to-[#2c9ed6] origin-left z-50 pointer-events-none"
      style={{ scaleX }}
    />
  );
};

// ============================================
// ANIMATION WRAPPER (Reforçado para Scroll)
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
    "Concurso Nacional",
    "Poliempreende Rebrand",
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
            className="absolute w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#2c9ed6]/20 rounded-full blur-[100px] lg:blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: ["2rem", "-1rem", "2rem"],
              y: ["2rem", "-2rem", "2rem"],
              rotate: [0, -45, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] bg-[#3f75ed]/15 rounded-full blur-[100px] lg:blur-[120px]" 
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
            { title: "Cliente", content: <p className="text-base font-medium text-black">Inst. Politécnico Viseu</p> },
            { title: "Tipologia", content: <p className="text-base font-medium text-black">Concurso / Pitch</p> },
            { title: "Serviços", content: <ul className="text-base font-medium text-black space-y-1"><li>Rebranding</li><li>Identidade Visual</li><li>Aplicações Gráficas</li></ul> },
            { title: "Rede", content: <p className="text-base font-medium text-black border-b border-black/20 pb-0.5">poliempreende.com</p> }
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
  const isDarkBlue = item.color === 'dark';

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
              animate={{ color: isActive ? (isDarkBlue ? '#3F75ED' : '#2C9ED6') : 'rgba(0,0,0,0.2)' }}
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
      title: 'A Engrenagem',
      color: 'dark',
      description: 'O núcleo do símbolo parte de uma engrenagem geométrica de seis pontas, representando a engrenagem mecânica do avanço, a interligação das diferentes escolas e o trabalho metódico.',
      features: ['Rede cooperativa', 'Sincronização', 'Rigor institucional']
    },
    {
      number: '02',
      title: 'A Rede Humana',
      color: 'light',
      description: 'Os círculos dispostos nas extremidades funcionam como uma abstração de seis figuras humanas interligadas, traduzindo o lado de partilha e comunidade viva do programa Poliempreende.',
      features: ['Comunidade estudantil', 'Colaboração aberta', 'Trabalho de equipa']
    },
    {
      number: '03',
      title: 'O Movimento',
      color: 'dark',
      description: 'A disposição e a curvatura circular não têm um ponto final rígido. Transmitem a sensação de evolução constante, progresso sustentável e flexibilidade na adaptação ao mercado.',
      features: ['Fluidez de ideias', 'Ação sustentável', 'Progressão contínua']
    }
  ];

  return (
    <section ref={containerRef} className="relative py-24 lg:py-36 bg-gray-50 border-t border-black/5 overflow-hidden flex flex-col items-center">
      <div className="max-w-[1000px] mx-auto px-6 w-full text-center flex flex-col items-center mb-16 lg:mb-24">
        <FadeIn yOffset={50}>
          <span className="text-[10px] tracking-[0.3em] font-bold text-[#2c9ed6] uppercase block mb-6">
            // Maior rede de empreendedorismo
          </span>
        </FadeIn>
        <FadeIn delay={0.1} yOffset={50}>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-black tracking-tighter leading-[1.05] max-w-4xl mb-12 sm:mb-16">
            Uma marca focada na ação de transformar ideias em impacto.
          </h2>
        </FadeIn>

        <motion.div style={{ y: yImage }} className="w-full max-w-[380px] aspect-square flex items-center justify-center my-6 relative z-10 will-change-transform">
          <Magnetic>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
              className="w-full h-full bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.04)] border border-black/5 p-12 flex items-center justify-center will-change-transform"
            >
              <img 
                src={logoImg} 
                alt="Poliempreende Símbolo" 
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </motion.div>
          </Magnetic>
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full bg-white pt-16 lg:pt-24 pb-12 lg:pb-16 rounded-[3rem] border border-black/[0.03] shadow-sm relative z-20 -mt-10 lg:-mt-20">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <FadeIn>
            <span className="text-xs font-mono font-bold text-black/40 block mb-3">Anatomia do Símbolo</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-xl sm:text-2xl text-black/50 font-medium tracking-tight">
              A desconstrução geométrica do símbolo assente nos valores de colaboração, estrutura e modernidade digital.
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
// BEFORE & AFTER SECTION
// ============================================
const BeforeAfterSection = () => {
  const [showAfter, setShowAfter] = useState(true);

  return (
    <section className="relative py-24 sm:py-32 bg-white overflow-hidden border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-10 sm:mb-16">
          <FadeIn yOffset={30}>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-black mb-6 tracking-tight">
              A Evolução
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} yOffset={30}>
            <p className="text-base sm:text-xl text-black/50 max-w-2xl mx-auto font-medium">
              Da desatualização corporativa para uma identidade enérgica, otimizada para o meio digital e para o público jovem.
            </p>
          </FadeIn>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-10 lg:mb-16"
        >
          <div className="bg-gray-50 p-1.5 rounded-full inline-flex relative shadow-inner border border-black/5">
            <motion.div
              className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-sm will-change-transform border border-black/[0.03]"
              initial={false}
              animate={{ x: showAfter ? '100%' : '0%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
            
            <button 
              onClick={() => setShowAfter(false)} 
              className={`relative z-10 px-8 py-3 text-sm font-bold transition-colors rounded-full ${!showAfter ? 'text-black' : 'text-black/40 hover:text-black/60'}`}
            >
              Antes
            </button>
            <button 
              onClick={() => setShowAfter(true)} 
              className={`relative z-10 px-8 py-3 text-sm font-bold transition-colors rounded-full ${showAfter ? 'text-[#3f75ed]' : 'text-black/40 hover:text-black/60'}`}
            >
              Depois
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative max-w-5xl mx-auto aspect-[4/3] md:aspect-[16/9] rounded-[2rem] sm:rounded-[3rem] border border-black/5 shadow-[0_30px_100px_rgba(0,0,0,0.06)] overflow-hidden bg-white flex items-center justify-center p-8 sm:p-16 will-change-transform"
        >
          <AnimatePresence mode="wait">
            {!showAfter ? (
              <motion.div
                key="antes"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex items-center justify-center bg-gray-50/50 rounded-2xl"
              >
                <img 
                  src={antesImg} 
                  alt="Marca Antiga" 
                  decoding="async"
                  className="w-[85%] h-[85%] object-contain mix-blend-multiply opacity-70" 
                />
              </motion.div>
            ) : (
              <motion.div
                key="depois"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                className="w-full h-full flex items-center justify-center"
              >
                <img 
                  src={logoImg} 
                  alt="Nova Marca" 
                  decoding="async"
                  className="w-full h-full object-contain scale-[1.2] sm:scale-[1.6] mix-blend-multiply" 
                />
              </motion.div>
            )}
          </AnimatePresence>
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
    { name: 'Electric Sky', hex: '#3F75ED', bg: 'bg-[#3f75ed]' },
    { name: 'Fresh Lake', hex: '#2C9ED6', bg: 'bg-[#2c9ed6]' },
    { name: 'Golden Pop', hex: '#F1AD1E', bg: 'bg-[#f1ad1e]' },
    { name: 'Graphite Ink', hex: '#1C1C1C', bg: 'bg-[#1c1c1c]' },
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
              A Nossa Paleta
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-base sm:text-xl text-black/50 max-w-2xl mx-auto font-medium">
              Tons digitais tecnológicos vibrantes combinados com a energia dos neutros quentes para comunicação impactante.
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
// APPLICATIONS SECTION (Performance Optimized)
// ============================================
const ApplicationsSection = () => {
  const applications = [
    { name: 'Billboard Outdoor', img: billboardImg },
    { name: 'Plataforma Website', img: websiteImg },
    { name: 'Stand Promocional', img: standImg },
    { name: 'Cartazes e Posters', img: posterImg },
    { name: 'Social Media Grid', img: socialImg },
    { name: 'Merchandise Textil', img: tshirtImg }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
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
              Identidade em ação.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg sm:text-xl text-black/50 max-w-2xl mx-auto font-medium">
              Garantindo uma experiência unificada, escalável e imersiva através de todos os pontos de contacto da marca.
            </p>
          </FadeIn>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {applications.map((app) => (
            <motion.div
              key={app.name}
              variants={itemVariants}
              className="will-change-transform"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden group cursor-pointer border border-black/[0.03] shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-shadow duration-700">
                <img 
                  src={app.img} 
                  alt={app.name} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-[1.05] will-change-transform"
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
// VIDEO NARRATIVE SECTION (Ambos Quadrados + Lightbox)
// ============================================
const VideoSection = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = true;
        video.play().catch((err) => console.log("Autoplay defendido pelo iOS:", err));
      }
    });
  }, []);

 const videos = [
  { src: "/videos/VideoPromocialComSom.mp4", aspect: "aspect-square", label: "Vídeo Promocional Com Som" }, // 🌟 ATUALIZADO
  { src: video2, aspect: "aspect-square", label: "Vídeo Promocional 1" } // Se o 2 for leve, pode ficar por agora
];

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-gray-50 border-y border-black/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="text-center mb-16 lg:mb-20">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight">
              Marca em movimento
            </h2>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto w-full items-center">
          {videos.map((video, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="will-change-transform transform-gpu cursor-pointer group relative"
              onClick={() => setActiveVideo(video.src)}
            >
              <div className={`relative ${video.aspect} rounded-[2rem] sm:rounded-[2.5rem] bg-black border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.04)] overflow-hidden`}>
                <video 
                  ref={(el) => { videoRefs.current[i] = el; }}
                  src={video.src} 
                  autoPlay
                  loop
                  playsInline 
                  controls={false}
                  preload="metadata"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-black shadow-lg opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity duration-300"
                  >
                    <Play size={20} fill="black" className="ml-0.5" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveVideo(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-30"
              onClick={() => setActiveVideo(null)}
            >
              <X size={24} />
            </button>

            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative max-w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video 
                src={activeVideo} 
                controls 
                autoPlay
                playsInline
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// ============================================
// OUTRO SECTION (A tua secção original restaurada!)
// ============================================
const OutroSection = () => {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[80vh] flex items-center bg-gray-50 border-t border-black/5 py-16">
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
                <h3 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-black mb-4 group-hover:text-[#4BC2F0] transition-colors tracking-tighter leading-tight">
                  Ver todos os projetos
                </h3>
                <div className="inline-flex items-center gap-2 text-[#4BC2F0] font-bold uppercase tracking-wider text-xs sm:text-sm mt-2 sm:mt-4 border-b-2 border-[#4BC2F0] pb-1">
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
// MAIN COMPONENT
// ============================================
export const Poliempreende = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="bg-white overflow-x-hidden w-full selection:bg-[#2c9ed6] selection:text-white">
      <Navigation />
      <ScrollProgress />
      <HeroSection />
      <ConceptSection />
      <BeforeAfterSection />
      <ColorSystemSection />
      <ApplicationsSection />
      <VideoSection />
      <OutroSection />
    </div>
  );
};