import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  AnimatePresence,
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
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4BC2F0] via-[#3A9DC5] to-[#4BC2F0] origin-left z-50 pointer-events-none"
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4BC2F0]/10 text-[#3A9DC5] text-xs sm:text-sm font-bold uppercase tracking-wider mb-6 sm:mb-8"
              >
                Case Study · 2024
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C1C1C] max-w-5xl mx-auto leading-tight mb-8 sm:mb-12 tracking-tight break-words"
              >
                Movimenta-te com confiança: Uma nova visão para produtos ortopédicos
              </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex flex-col sm:flex-row justify-center gap-x-12 gap-y-6 text-sm bg-white/80 backdrop-blur-sm border border-black/5 rounded-2xl sm:rounded-3xl px-6 py-6 sm:px-12 sm:py-8 shadow-sm w-full sm:w-auto text-center will-change-transform"
          >
            <div>
              <div className="text-xs text-black/40 uppercase tracking-wider mb-1 font-bold">Cliente</div>
              <div className="text-[#1C1C1C] font-bold text-base sm:text-lg">Aveimédica</div>
            </div>
            <div className="hidden sm:block w-px bg-black/10 self-stretch" />
            <div>
              <div className="text-xs text-black/40 uppercase tracking-wider mb-1 font-bold">Serviços</div>
              <div className="text-[#1C1C1C] font-bold text-base sm:text-lg">Branding & Rebrand Corporativo</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full pt-12 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-[10px] text-black/30 uppercase tracking-[0.3em]">Scroll</span>
            <div className="w-px h-16 bg-gradient-to-b from-black/20 to-transparent" />
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
                      alt="Aveimédica Outdoors"
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
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#1C1C1C] leading-tight mb-6 sm:mb-8 tracking-tight">
                Promover uma vida saudável e funcional
              </h2>
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-black/70 leading-relaxed">
                <p>
                  A Aveimédica é uma marca dedicada a oferecer produtos ortopédicos de qualidade.
                  No entanto, precisava de uma image que comunicasse mais do que apenas artigos médicos; 
                  precisava de transmitir o seu compromisso profundo com o bem-estar físico e emocional.
                </p>
                <p>
                  O desafio: desconstruir a estética fria habitual do setor e criar uma identidade 
                  que refletisse valores como a confiança, a continuidade de hábitos saudáveis e a 
                  gratidão pela vida, sempre focada no movimento.
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
// CHALLENGE SECTION (CARDS DOS SERVIÇOS/PROCESSO)
// ============================================
const ChallengeSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const conceptData = [
    {
      number: '01',
      title: 'Trevo',
      description: 'Símbolo de sorte e prosperidade, profundamente interligado com a natureza e com o conceito de crescimento e renovação contínua.',
      features: ['Sorte & Renovação', 'Gratidão pela vida', 'Valorização do corpo'],
      color: 'blue'
    },
    {
      number: '02',
      title: 'Coração',
      description: 'O espelho universal da saúde. Consolida visualmente o compromisso com o bem-estar físico e emocional de todos os clientes.',
      features: ['Vida & Saúde', 'Compromisso humano', 'Cuidado constante'],
      color: 'pink'
    },
    {
      number: '03',
      title: 'Infinito',
      description: 'Simboliza a manutenção perene de hábitos benéficos e a rotina equilibrada essencial para sustentar uma jornada ativa.',
      features: ['Manutenção ativa', 'Continuidade', 'Rotina funcional'],
      color: 'blue'
    }
  ] as const;

  return (
    <section ref={ref} className="relative py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-white via-black/[0.02] to-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <motion.div style={{ scale, opacity }} className="w-full flex flex-col items-center will-change-transform">
          
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-black mb-4 tracking-tight">
              Como unir cuidado e{' '}
              <span className="relative inline-block text-[#3A9DC5]">movimento</span>
              ?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-black/60 max-w-2xl mx-auto">
              A desconstrução conceptual do símbolo baseada nas diretrizes do manual
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full text-left">
            {conceptData.map((concept) => {
              const isBlue = concept.color === 'blue';
              const hoverBorder = isBlue ? 'hover:border-[#3A9DC5]/50' : 'hover:border-tomo-pink/50';
              const hoverShadow = isBlue ? 'hover:shadow-[#3A9DC5]/10' : 'hover:shadow-tomo-pink/10';

              return (
                <motion.div
                  key={concept.number}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="h-full flex"
                >
                  <div
                    className={`flex flex-col w-full p-6 sm:p-8 bg-white border-2 border-black/5 rounded-2xl sm:rounded-3xl transition-all duration-300 shadow-sm hover:shadow-xl ${hoverBorder} ${hoverShadow}`}
                  >
                    <div className="text-xs font-mono text-black/40 mb-4 sm:mb-6">{concept.number}</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-black mb-3 tracking-tight">
                      {concept.title}
                    </h3>
                    <p className="text-sm sm:text-base text-black/60 leading-relaxed mb-6 flex-grow">
                      {concept.description}
                    </p>

                    <ul className="space-y-2 mt-auto">
                      {concept.features.map(feature => (
                        <li
                          key={feature}
                          className="flex items-center gap-3 text-xs sm:text-sm text-black/60"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              isBlue ? 'bg-[#3A9DC5]' : 'bg-tomo-pink'
                            }`}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </motion.div>
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
    <section className="relative py-16 sm:py-24 lg:py-32 bg-white overflow-hidden border-b border-black/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1C1C] mb-4 sm:mb-6 tracking-tight">
            A Evolução da Marca
          </h2>
          <p className="text-base sm:text-xl text-black/60 max-w-2xl mx-auto">
            A diferença entre uma marca antiga e uma identidade com propósito.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8 sm:mb-12"
        >
          <div className="bg-gray-100 p-1.5 rounded-full inline-flex relative shadow-inner">
            <motion.div
              className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-sm will-change-transform"
              initial={false}
              animate={{ 
                x: showAfter ? '100%' : '0%' 
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            
            <button 
              onClick={() => setShowAfter(false)} 
              className={`relative z-10 px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-bold transition-colors rounded-full ${!showAfter ? 'text-black' : 'text-black/40 hover:text-black/60'}`}
            >
              Antes
            </button>
            <button 
              onClick={() => setShowAfter(true)} 
              className={`relative z-10 px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-bold transition-colors rounded-full ${showAfter ? 'text-[#4BC2F0]' : 'text-black/40 hover:text-black/60'}`}
            >
              Depois
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto aspect-[4/3] md:aspect-[16/9] rounded-2xl sm:rounded-[2rem] border border-black/5 shadow-2xl overflow-hidden bg-gray-50 flex items-center justify-center p-4 sm:p-8 md:p-16 will-change-transform"
        >
          <AnimatePresence mode="wait">
            {!showAfter ? (
              <motion.div
                key="antes"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full flex items-center justify-center"
              >
                <img 
                  src={antesImg} 
                  alt="Marca Antiga Aveimédica" 
                  loading="lazy"
                  decoding="async"
                  className="w-[90%] h-[90%] sm:w-[85%] sm:h-[85%] object-contain mix-blend-multiply opacity-80" 
                />
              </motion.div>
            ) : (
              <motion.div
                key="depois"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full flex items-center justify-center"
              >
                <img 
                  src={logoImg} 
                  alt="Nova Marca Aveimédica" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain scale-[1.1] sm:scale-[1.3] md:scale-[1.5] drop-shadow-xl mix-blend-multiply" 
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
  const ref = useRef(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const colors = [
    { name: 'Azul Claro (298 C)', hex: '#4BC2F0', bg: 'bg-[#4BC2F0]' },
    { name: 'Azul Escuro (801 C)', hex: '#3A9DC5', bg: 'bg-[#3A9DC5]' },
    { name: 'Cinzento (425 C)', hex: '#616161', bg: 'bg-[#616161]' },
    { name: 'Preto Neutral', hex: '#1C1C1C', bg: 'bg-[#1C1C1C]' },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring" as const, 
        stiffness: 100 
      } 
    }
  };

  const handleCopy = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section ref={ref} className="relative py-16 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 tracking-tight">
            A Cor do Cuidado
          </h2>
          <p className="text-base sm:text-xl text-black/60 max-w-2xl mx-auto">
            Uma paleta estruturada para transmitir confiança, frescura, e inovação,
            assegurando contraste e legibilidade ideais.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {colors.map((color, i) => (
            <motion.div key={color.name} variants={itemVariants} className="will-change-transform">
              <div 
                 className="group cursor-pointer relative"
                 onClick={() => handleCopy(color.hex, i)}
              >
                <div className={`${color.bg} aspect-square rounded-2xl sm:rounded-3xl mb-4 shadow-md border border-black/5 relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-1.5`}>
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
    { name: 'Sinalética Exterior (MUPI)', img: mupiImg, colSpan: 'col-span-1' },
    { name: 'Fachadas Corporativas', img: fachadaImg, colSpan: 'col-span-1' },
    { name: 'Bancas de Exposição', img: standImg, colSpan: 'col-span-1' },
    { name: 'Comunicação (Posters)', img: posterImg, colSpan: 'col-span-1' },
    { name: 'Estacionário (Agendas)', img: agendaImg, colSpan: 'col-span-1' },
    { name: 'Brindes Institucionais', img: canetasImg, colSpan: 'col-span-1' },
  ];

  return (
    <section ref={ref} className="relative py-16 sm:py-24 lg:py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 tracking-tight">
            A marca em todo o lado
          </h2>
          <p className="text-base sm:text-xl text-black/60 max-w-2xl mx-auto">
            Garantindo coesão desde a fachada corporativa até ao estacionário e brindes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-[250px] sm:auto-rows-[300px] w-full">
          {applications.map((app, i) => (
            <motion.div
              key={app.name}
              style={{ y: isMobile ? 0 : (i % 2 === 0 ? ySlow : yFast) }}
              className={`${app.colSpan} will-change-transform`}
            >
              <div
                className="relative h-full rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-black/5"
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
              </div>
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
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-black mb-4 tracking-tight">
            A comunicação em movimento
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto w-full">
          {[video1, video2].map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group will-change-transform"
            >
              <div className="relative aspect-square rounded-2xl sm:rounded-3xl p-[1px] bg-gradient-to-br from-[#4BC2F0]/30 via-transparent to-[#4BC2F0]/30 shadow-xl sm:shadow-2xl">
                <div className="w-full h-full bg-gray-100 rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-1px)] overflow-hidden">
                  <video 
                    src={src} 
                    controls 
                    playsInline 
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
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
// BRANDBOOK FLIPBOOK & DOWNLOAD SECTION
// ============================================
const ManualSection = () => {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-gray-50 border-t border-black/5">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-12 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="will-change-transform"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6 tracking-tight">
            Manual de Identidade
          </h2>
          <p className="text-base sm:text-lg text-black/60 max-w-2xl mx-auto mb-8 sm:mb-16">
            Explora em detalhe a construção estratégica, as regras de aplicação e o sistema visual completo desenvolvido para a Aveimédica.
          </p>
          
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-black/10 bg-white mb-8 sm:mb-12">
            <iframe 
              allowFullScreen={true} 
              scrolling="no" 
              className="w-full h-full border-none" 
              src="https://heyzine.com/flip-book/d9405b4cdc.html"
              title="Manual de Identidade Aveimédica"
            ></iframe>
          </div>

          <p className="text-xs sm:text-sm text-black/40 mb-4 sm:mb-6 font-medium uppercase tracking-widest">
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
        </motion.div>
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
                  <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-4 group-hover:text-[#4BC2F0] transition-colors tracking-tight break-words leading-tight">
                      Ver todos os projetos
                  </h3>
                  <div className="inline-flex items-center gap-2 text-[#4BC2F0] font-bold uppercase tracking-wider text-xs sm:text-sm mt-2 sm:mt-4 border-b-2 border-[#4BC2F0] pb-1">
                      Explorar portfólio
                      <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16}/>
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
      <ContextSection />
      <ChallengeSection />
      <BeforeAfterSection />
      <ColorSystemSection />
      <ApplicationsSection />
      <VideoSection />
      <ManualSection />
      <OutroSection />
    </div>
  );
};