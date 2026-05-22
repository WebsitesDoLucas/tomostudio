import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  useMotionTemplate,
  AnimatePresence
} from 'framer-motion';
import { ArrowUpRight, Play, Check } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';

// ============================================
// IMPORTAÇÃO DE ASSETS
// ============================================
import logoImg from '../assets/poliempreende/poliempreende.png';
import antesImg from '../assets/poliempreende/AntesPoliempreende.png';
import billboardImg from '../assets/poliempreende/Billboard.jpg';
import posterImg from '../assets/poliempreende/Poster.jpg';
import socialImg from '../assets/poliempreende/Post e stories.jpg';
import tshirtImg from '../assets/poliempreende/tshirt branca frente.jpg';
import toteImg from '../assets/poliempreende/tote bag mockup.jpg';
import standImg from '../assets/poliempreende/Stand Mockup.jpg';
import websiteImg from '../assets/poliempreende/Website Mockup.jpg';
import video1 from '../assets/poliempreende/VideoPromocialComSom.mp4';
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
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-tomo-blue via-tomo-pink to-tomo-blue origin-left z-50"
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tomo-blue/10 text-tomo-blue text-sm font-bold uppercase tracking-wider mb-8"
              >
                Case Study · 2024
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl lg:text-6xl font-bold text-black max-w-5xl mx-auto leading-tight mb-12"
              >
                Uma identidade visual que inspira a próxima geração de empreendedores
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
              <div className="text-black font-bold text-lg">Instituto Politécnico de Viseu</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-black/40 uppercase tracking-wider mb-2 font-bold">Serviços</div>
              <div className="text-black font-bold text-lg">Identidade Visual & Branding</div>
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
                      alt="Poliempreende Billboard"
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
                O maior concurso de empreendedorismo estudantil
              </h2>
              <div className="space-y-6 text-lg text-black/70 leading-relaxed">
                <p>
                  O PoliEmpreende é a plataforma onde estudantes transformam ideias 
                  em negócios reais. Ano após ano, une mentes brilhantes, mentores 
                  experientes e o espírito inovador do Instituto Politécnico de Viseu.
                </p>
                <p>
                  O desafio: criar uma identidade que representasse simultaneamente 
                  a seriedade institucional e a energia jovem e disruptiva dos 
                  participantes.
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
    <section ref={ref} className="relative min-h-[80vh] flex items-center py-32 bg-gray-50">
      <div className="max-w-[900px] mx-auto px-6 lg:px-12 text-center">
        <motion.div style={{ scale, opacity }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl lg:text-7xl font-bold text-black leading-tight mb-12"
          >
            Como criar uma marca que inspire{' '}
            <span className="relative inline-block">
              <span className="relative z-10">ação</span>
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-4 bg-tomo-blue/20 -z-10 rounded-full"
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
              'Atrair estudantes empreendedores',
              'Transmitir credibilidade institucional',
              'Funcionar em todos os meios'
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
                    className="text-4xl font-bold text-tomo-blue/20 mb-4"
                    animate={{ scale: hoveredIndex === i ? 1.1 : 1, color: hoveredIndex === i ? '#0099FF' : 'rgba(0, 153, 255, 0.2)' }}
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
// BEFORE & AFTER SECTION (Tamanhos equilibrados)
// ============================================
const BeforeAfterSection = () => {
  const [showAfter, setShowAfter] = useState(true);

  return (
    <section className="relative py-32 bg-white overflow-hidden border-b border-black/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            A Evolução da Marca
          </h2>
          <p className="text-xl text-black/60 max-w-2xl mx-auto">
            A diferença entre uma marca antiga e uma identidade com propósito.
          </p>
        </motion.div>

        {/* TOGGLE SWITCH */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-gray-100 p-1.5 rounded-full inline-flex relative shadow-inner">
            <motion.div
              className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-sm"
              initial={false}
              animate={{ 
                x: showAfter ? '100%' : '0%' 
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            
            <button 
              onClick={() => setShowAfter(false)} 
              className={`relative z-10 px-8 py-3 text-sm font-bold transition-colors rounded-full ${!showAfter ? 'text-black' : 'text-black/40 hover:text-black/60'}`}
            >
              Antes
            </button>
            <button 
              onClick={() => setShowAfter(true)} 
              className={`relative z-10 px-8 py-3 text-sm font-bold transition-colors rounded-full ${showAfter ? 'text-tomo-blue' : 'text-black/40 hover:text-black/60'}`}
            >
              Depois
            </button>
          </div>
        </motion.div>

        {/* IMAGE CONTAINER COM CROSSFADE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-4xl mx-auto aspect-[4/3] md:aspect-[16/9] rounded-[2rem] border border-black/5 shadow-2xl overflow-hidden bg-gray-50 flex items-center justify-center p-8 md:p-16"
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
                  alt="Marca Antiga Poliempreende" 
                  // Diminuí um pouco a antiga (w-[85%]) para não parecer tão massiva
                  className="w-[85%] h-[85%] object-contain mix-blend-multiply opacity-80" 
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
                  alt="Nova Marca Poliempreende" 
                  // Adicionei scale-[1.5] para ignorar as margens do ficheiro e dar zoom
                  // Adicionei mix-blend-multiply para esconder o quadrado branco
                  className="w-full h-full object-contain scale-[1.5] md:scale-[1.8] mix-blend-multiply" 
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
    { name: 'Primary Blue', hex: '#048BFF', bg: 'bg-tomo-blue' },
    { name: 'Deep Navy', hex: '#1A1F2E', bg: 'bg-tomo-dark' },
    { name: 'Accent Pink', hex: '#E56399', bg: 'bg-tomo-pink' },
    { name: 'Pure White', hex: '#FFFFFF', bg: 'bg-white' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 100 }
    }
  };

  const handleCopy = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section ref={ref} className="relative py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            Paleta que comunica
          </h2>
          <p className="text-xl text-black/60 max-w-2xl mx-auto">
            Cada cor escolhida com propósito: confiança, energia e inovação
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
            <motion.div
              key={color.name}
              variants={itemVariants}
            >
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
    { name: 'Website', img: websiteImg, colSpan: 'md:col-span-1' },
    { name: 'Stand', img: standImg, colSpan: 'md:col-span-1' },
    { name: 'Posters', img: posterImg, colSpan: 'md:col-span-1' },
    { name: 'Social Media', img: socialImg, colSpan: 'md:col-span-1' },
    { name: 'T-Shirt', img: tshirtImg, colSpan: 'md:col-span-1' },
    { name: 'Tote Bag', img: toteImg, colSpan: 'md:col-span-1' },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            Identidade em ação
          </h2>
          <p className="text-xl text-black/60 max-w-2xl mx-auto">
            Do físico ao digital, uma experiência coesa
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
// VIDEO NARRATIVE SECTION (Simples, sem filtros e clicável)
// ============================================
const VideoSection = () => {
  return (
    <section className="relative py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-black mb-6">
            Marca em movimento
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[video1, video2].map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative group"
            >
              {/* Caixa com padding de 1px e fundo gradiente (azul para rosa) para criar o outline suave */}
              <div className="relative aspect-square rounded-3xl p-[1px] bg-gradient-to-br from-tomo-blue/40 via-transparent to-tomo-pink/40 shadow-2xl transition-shadow duration-500 group-hover:shadow-tomo-blue/20">
                
                {/* Contentor do vídeo */}
                <div className="w-full h-full bg-gray-100 rounded-[calc(1.5rem-1px)] overflow-hidden">
                  <video 
                    src={src} 
                    controls // Permite ao utilizador interagir nativamente (play/pause, fullscreen, volume)
                    playsInline 
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
// OUTRO SECTION
// ============================================
const OutroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-gray-50 border-t border-black/5">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-black/40 uppercase tracking-[0.3em] mb-8 font-bold">
            Próximo projeto
          </p>

          <Link to="/trabalhos">
            <Magnetic>
                <motion.div
                whileHover={{ scale: 1.02, y: -10 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="group max-w-4xl mx-auto cursor-pointer"
                >
                <h3 className="text-6xl lg:text-7xl font-bold text-black mb-4 group-hover:text-tomo-blue transition-colors">
                    Ver todos os projetos
                </h3>
                <div className="inline-flex items-center gap-2 text-tomo-blue font-bold uppercase tracking-wider text-sm mt-4 border-b-2 border-tomo-blue pb-1">
                    Explorar portfólio
                    <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16}/>
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
// MAIN COMPONENT
// ============================================
export const Poliempreende = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white overflow-x-hidden w-full">
      <Navigation />
      <ScrollProgress />
      <HeroSection />
      <ContextSection />
      <ChallengeSection />
      <BeforeAfterSection />
      <ColorSystemSection />
      <ApplicationsSection />
      <VideoSection />
      <OutroSection />
    </div>
  );
};