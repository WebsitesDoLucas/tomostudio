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
import { ArrowUpRight, Check, Download } from 'lucide-react';
import { useRef, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';

// ============================================
// IMPORTAÇÃO DE ASSETS (PASTA AVEIMEDICA)
// ============================================
import logoImg from '../assets/aveimedica/logo.webp'; 
import antesImg from '../assets/aveimedica/AntesAveimedica.webp'; 

// Imagens
import agendaImg from '../assets/aveimedica/AGENDA1.webp';
import billboardImg from '../assets/aveimedica/BILLBOARD.webp';
import canetasImg from '../assets/aveimedica/CANETAS.webp';
import fachadaImg from '../assets/aveimedica/FACHADA1.webp';
import mupiImg from '../assets/aveimedica/mupi.webp';
import posterImg from '../assets/aveimedica/POSTER.webp';
import standImg from '../assets/aveimedica/STAND1.webp';

// Vídeos
import video1 from '../assets/aveimedica/produto-especifico.mp4';
import video2 from '../assets/aveimedica/produtos-diversos.mp4';

// PDF (Manual de Identidade)
import manualPdf from '../assets/aveimedica/manual-aveimedica.pdf';

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
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4BC2F0] via-[#3A9DC5] to-[#4BC2F0] origin-left z-50 pointer-events-none"
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
    "Movimenta-te com",
    "confiança e uma",
    "nova visão."
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
        
        {/* Breathing Gradient Aveimédica */}
        <div className="absolute top-0 right-0 w-full lg:w-[60%] h-[600px] flex items-center justify-center lg:justify-end lg:pr-[10%]">
          <motion.div 
            animate={{ 
              scale: [1, 1.15, 1],
              x: ["-2rem", "1rem", "-2rem"],
              y: ["-2rem", "1rem", "-2rem"],
              rotate: [0, 45, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#4BC2F0]/20 rounded-full blur-[100px] lg:blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: ["2rem", "-1rem", "2rem"],
              y: ["2rem", "-2rem", "2rem"],
              rotate: [0, -45, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] bg-[#3A9DC5]/15 rounded-full blur-[100px] lg:blur-[120px]" 
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
            { title: "Cliente", content: <p className="text-base font-medium text-black">Aveimédica</p> },
            { title: "Setor", content: <p className="text-base font-medium text-black">Produtos Ortopédicos</p> },
            { title: "Serviços", content: <ul className="text-base font-medium text-black space-y-1"><li>Branding</li><li>Identidade Visual</li><li>Design Editorial</li></ul> },
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
              animate={{ color: isActive ? (isLightBlue ? '#4BC2F0' : '#3A9DC5') : 'rgba(0,0,0,0.2)' }}
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
      title: 'O Trevo',
      color: 'light',
      description: 'Símbolo de sorte e prosperidade, profundamente interligado com a natureza e com o conceito de crescimento e renovação contínua.',
      features: ['Sorte & Renovação', 'Gratidão pela vida', 'Valorização do corpo']
    },
    {
      number: '02',
      title: 'O Coração',
      color: 'dark',
      description: 'O espelho universal da saúde. Consolida visualmente o compromisso irrevogável com o bem-estar físico e emocional de todos os clientes.',
      features: ['Vida & Saúde', 'Compromisso humano', 'Cuidado constante']
    },
    {
      number: '03',
      title: 'O Infinito',
      color: 'light',
      description: 'Simboliza a manutenção perene de hábitos benéficos e a rotina equilibrada que é essencial para sustentar uma jornada ativa ao longo da vida.',
      features: ['Manutenção ativa', 'Continuidade', 'Rotina funcional']
    }
  ];

  return (
    <section ref={containerRef} className="relative py-24 lg:py-36 bg-gray-50 border-t border-black/5 overflow-hidden flex flex-col items-center">
      
      {/* Aumentámos a margem inferior (mb-24 lg:mb-32) para dar bastante espaço ao parallax do logótipo */}
      <div className="max-w-[1000px] mx-auto px-6 w-full text-center flex flex-col items-center mb-24 lg:mb-32">
        <FadeIn yOffset={50}>
          <span className="text-[10px] tracking-[0.3em] font-bold text-[#3A9DC5] uppercase block mb-6">
            // Essência de Marca
          </span>
        </FadeIn>
        <FadeIn delay={0.1} yOffset={50}>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-black tracking-tighter leading-[1.05] max-w-4xl mb-6 sm:mb-10">
            Promover uma vida saudável e funcional.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-lg sm:text-xl text-black/50 max-w-2xl mx-auto font-medium mb-12 sm:mb-16">
            O desafio: desconstruir a estética fria do setor ortopédico e criar uma identidade que reflita confiança, continuidade de hábitos e gratidão pela vida.
          </p>
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
                alt="Aveimédica Símbolo" 
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </motion.div>
          </Magnetic>
        </motion.div>
      </div>

      {/* Removido o "-mt-10 lg:-mt-20" que estava a causar o choque com o cartão de cima */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full bg-white pt-16 lg:pt-24 pb-12 lg:pb-16 rounded-[3rem] border border-black/[0.03] shadow-sm relative z-20">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <FadeIn>
            <span className="text-xs font-mono font-bold text-black/40 block mb-3">Conceito Visual</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-xl sm:text-2xl text-black/50 font-medium tracking-tight">
              A desconstrução conceptual do símbolo baseada na união entre cuidado, movimento e harmonia humana.
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
              A diferença entre uma marca antiga e uma identidade com propósito, proximidade e visão de futuro.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.2} yOffset={20}>
          <div className="flex justify-center mb-10 lg:mb-16">
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
                className={`relative z-10 px-8 py-3 text-sm font-bold transition-colors rounded-full ${showAfter ? 'text-[#3A9DC5]' : 'text-black/40 hover:text-black/60'}`}
              >
                Depois
              </button>
            </div>
          </div>
        </FadeIn>

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
                  alt="Marca Antiga Aveimédica" 
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
                  alt="Nova Marca Aveimédica" 
                  className="w-full h-full object-contain scale-[1.1] sm:scale-[1.4] mix-blend-multiply drop-shadow-xl" 
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
    { name: 'Azul Claro (298 C)', hex: '#4BC2F0', bg: 'bg-[#4BC2F0]' },
    { name: 'Azul Escuro (801 C)', hex: '#3A9DC5', bg: 'bg-[#3A9DC5]' },
    { name: 'Cinzento (425 C)', hex: '#616161', bg: 'bg-[#616161]' },
    { name: 'Preto Neutral', hex: '#1C1C1C', bg: 'bg-[#1C1C1C]' },
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
              A Cor do Cuidado
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-base sm:text-xl text-black/50 max-w-2xl mx-auto font-medium">
              Uma paleta estruturada para transmitir confiança, frescura, e inovação, assegurando contraste e legibilidade ideais.
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
// APPLICATIONS SECTION (Performance Optimized Stagger)
// ============================================
const ApplicationsSection = () => {
  const applications = [
    { name: 'Sinalética Exterior (MUPI)', img: mupiImg },
    { name: 'Fachadas Corporativas', img: fachadaImg },
    { name: 'Bancas de Exposição', img: standImg },
    { name: 'Comunicação (Posters)', img: posterImg },
    { name: 'Estacionário (Agendas)', img: agendaImg },
    { name: 'Brindes Institucionais', img: canetasImg },
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
              A marca em todo o lado.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg sm:text-xl text-black/50 max-w-2xl mx-auto font-medium">
              Garantindo coesão em todos os suportes, desde a fachada corporativa até ao estacionário e brindes promocionais.
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
// VIDEO NARRATIVE SECTION
// ============================================
const VideoSection = () => {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-gray-50 border-y border-black/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="text-center mb-16 lg:mb-20">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-tight">
              A comunicação em movimento
            </h2>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto w-full">
          {[video1, video2].map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <div className="relative aspect-[9/16] md:aspect-square rounded-[2rem] sm:rounded-[2.5rem] bg-white border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.04)] overflow-hidden">
                <video 
                  src={src} 
                  controls 
                  playsInline 
                  preload="metadata"
                  className="w-full h-full object-cover"
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
// BRANDBOOK FLIPBOOK & DOWNLOAD SECTION
// ============================================
const ManualSection = () => {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-white border-t border-black/5">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-12 text-center w-full">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6 tracking-tight">
            Manual de Identidade
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-base sm:text-lg text-black/50 max-w-2xl mx-auto mb-8 sm:mb-16 font-medium">
            Explora em detalhe a construção estratégica, as regras de aplicação e o sistema visual completo desenvolvido para a Aveimédica.
          </p>
        </FadeIn>
        
        <FadeIn delay={0.2} yOffset={50}>
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.06)] border border-black/5 bg-gray-50 mb-8 sm:mb-12">
            <iframe 
              allowFullScreen={true} 
              scrolling="no" 
              className="w-full h-full border-none" 
              src="https://heyzine.com/flip-book/d9405b4cdc.html"
              title="Manual de Identidade Aveimédica"
            ></iframe>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-xs sm:text-sm text-black/30 mb-4 sm:mb-6 font-bold uppercase tracking-widest">
            Preferes o ficheiro local?
          </p>

          <Magnetic>
            <motion.a
              href={manualPdf}
              download="Manual_Identidade_Aveimedica.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 bg-[#4BC2F0] text-white font-bold rounded-full shadow-lg shadow-[#4BC2F0]/20 transition-all hover:bg-[#3A9DC5] text-sm sm:text-base"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download size={18} />
              Descarregar em PDF
            </motion.a>
          </Magnetic>
        </FadeIn>
      </div>
    </section>
  );
};

// ============================================
// OUTRO SECTION
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
// MAIN COMPONENT EXPORT
// ============================================
export const Aveimedica = () => {
  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []);

  return (
    <div className="bg-white overflow-x-hidden w-full selection:bg-[#4BC2F0] selection:text-white">
      <Navigation />
      <ScrollProgress />
      <HeroSection />
      <ConceptSection />
      <BeforeAfterSection />
      <ColorSystemSection />
      <ApplicationsSection />
      <VideoSection />
      <ManualSection />
      <OutroSection />
    </div>
  );
};