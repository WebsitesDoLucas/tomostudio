import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue 
} from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { useRef, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';

// ============================================
// IMPORTAÇÃO DE ASSETS (PASTA IDIPV)
// ============================================
import logoImg from '../assets/idipv/logo.jpg';
import outdoorImg from '../assets/idipv/OUTDOOR.jpg';
import estacionarioImg from '../assets/idipv/Cartão de visita e papel timbrado.jpg';
import mupiImg from '../assets/idipv/MUPI.jpg';
import placaVidroImg from '../assets/idipv/placa de vidro.jpg';
import posterImg from '../assets/idipv/poster.jpg';
import instagramImg from '../assets/idipv/Publicações de instagram.jpg';
import rollupsImg from '../assets/idipv/Rollups.jpg';
import zoomImg from '../assets/idipv/zoom (2).jpg';

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
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1E007F] via-[#0055FF] to-[#1E007F] origin-left z-50"
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
      {/* Padrão de pontos subtil igual aos outros */}
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0055FF]/10 text-[#0055FF] text-sm font-bold uppercase tracking-wider mb-8"
              >
                Case Study · 2024
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl lg:text-6xl font-bold text-black max-w-5xl mx-auto leading-tight mb-12"
              >
                Onde o conhecimento encontra o futuro: Uma assinatura de vanguarda
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
              <div className="text-black font-bold text-lg">Naming, Branding & Digital</div>
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
                      src={outdoorImg} 
                      alt="IDIPV Outdoor Preview"
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
                O motor da transferência tecnológica
              </h2>
              <div className="space-y-6 text-lg text-black/70 leading-relaxed">
                <p>
                  O IDIPV (Gabinete de Transferência de Tecnologia do Politécnico de Viseu) precisava 
                  de uma marca que identificasse a sua missão: atuar como a ponte essencial entre o 
                  conhecimento científico desenvolvido na academia e o tecido empresarial.
                </p>
                <p>
                  O desafio: conceber um Naming original que integrasse a sigla "IPV", 
                  aliado a uma identidade visual que refletisse o rigor científico, a inovação digital e 
                  o destaque individual, garantindo total flexibilidade para ambientes físicos e digitais.
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
            Como fundir o{' '}
            <span className="relative inline-block">
              <span className="relative z-10">conhecimento</span>
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-4 bg-[#0055FF]/20 -z-10 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </span>
            {' '}e a prática?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-3 gap-8 mt-20"
          >
            {[
              'Simbolizar a fluidez na transferência de saber',
              'Representar a precisão técnica através do Pixel',
              'Projetar modernidade e internacionalização'
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
                    className="text-4xl font-bold text-[#0055FF]/20 mb-4"
                    animate={{ scale: hoveredIndex === i ? 1.1 : 1, color: hoveredIndex === i ? '#0055FF' : 'rgba(0, 85, 255, 0.2)' }}
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
// LOGO REVEAL SECTION (Limpo e Elegante)
// ============================================
const LogoRevealSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative min-h-[80vh] flex items-center bg-white py-32 border-b border-black/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
        <motion.div 
          style={{ scale, opacity }}
          className="text-center"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-black mb-16"
          >
            A Solução Visual
          </motion.h2>

          <div className="relative mb-20 flex justify-center">
            <motion.div
              className="relative aspect-[21/9] w-full max-w-5xl bg-gray-50 rounded-[2rem] flex items-center justify-center border border-black/5 p-8 md:p-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-[60%] md:w-[45%] relative z-10">
                <img 
                  src={logoImg} 
                  alt="Logo IDIPV" 
                  className="w-full h-full object-contain drop-shadow-xl mix-blend-multiply"
                />
              </div>
            </motion.div>
          </div>

          <p className="text-xl md:text-2xl text-black/70 max-w-3xl mx-auto leading-relaxed">
            O monograma nasce da fusão fluida entre o "i" (Investigação) e o "d" (Desenvolvimento). 
            O ponto da letra "i" assume a forma de um <strong className="text-black">pixel perfeito</strong>, representando a precisão, o detalhe 
            e o ADN puramente tecnológico da instituição.
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
    { name: 'Neon Blue', hex: '#0055FF', bg: 'bg-[#0055FF]' },
    { name: 'Deep Blue', hex: '#1E007F', bg: 'bg-[#1E007F]' },
    { name: 'Tech White', hex: '#FFFFFF', bg: 'bg-white' },
    { name: 'Night Black', hex: '#000000', bg: 'bg-black' },
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
            A Cor da Evolução
          </h2>
          <p className="text-xl text-black/60 max-w-2xl mx-auto">
            O <span className="font-bold text-[#1E007F]">Deep Blue</span> assegura a solidez institucional, enquanto o <span className="font-bold text-[#0055FF]">Neon Blue</span> injeta 
            a energia da inovação e do futuro tecnológico no ecossistema da marca.
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
    { name: 'Estacionário Institucional', img: estacionarioImg, colSpan: 'md:col-span-1' },
    { name: 'Sinalética em Vidro', img: placaVidroImg, colSpan: 'md:col-span-1' },
    { name: 'Roll-ups / Eventos', img: rollupsImg, colSpan: 'md:col-span-1' },
    { name: 'Sinalética Exterior (MUPI)', img: mupiImg, colSpan: 'md:col-span-1' },
    { name: 'Redes Sociais', img: instagramImg, colSpan: 'md:col-span-1' },
    { name: 'Fundos de Videoconferência', img: zoomImg, colSpan: 'md:col-span-1' },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            O Sistema Visual
          </h2>
          <p className="text-xl text-black/60 max-w-2xl mx-auto">
            Uma hierarquia clara adaptável desde documentos físicos rígidos 
            até cenários imersivos de comunicação digital.
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
                className="relative h-full rounded-3xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 border border-black/5"
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
                
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
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
// OUTRO SECTION
// ============================================
const OutroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-white border-t border-black/5">
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
                <h3 className="text-6xl lg:text-7xl font-bold text-black mb-4 group-hover:text-[#0055FF] transition-colors">
                    Ver todos os projetos
                </h3>
                <div className="inline-flex items-center gap-2 text-[#0055FF] font-bold uppercase tracking-wider text-sm mt-4 border-b-2 border-[#0055FF] pb-1">
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
// MAIN COMPONENT EXPORT
// ============================================
export const IDIPV = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="bg-white overflow-x-hidden w-full selection:bg-[#0055FF] selection:text-white">
      <Navigation />
      <ScrollProgress />
      <HeroSection />
      <ContextSection />
      <ChallengeSection />
      <LogoRevealSection />
      <ColorSystemSection />
      <ApplicationsSection />
      <OutroSection />
    </div>
  );
};