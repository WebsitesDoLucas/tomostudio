import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue 
} from 'framer-motion';
import { ArrowUpRight, Check, Square } from 'lucide-react';
import { useRef, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';

// ============================================
// IMPORTAÇÃO DO LOGO
// ============================================
import logoImg from '../assets/thumbs/tomostudio.png'; 

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
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4BC2F0] to-[#FF4B91] origin-left z-50"
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
      className="relative flex flex-col items-center justify-center overflow-hidden bg-gray-50 pt-36 pb-20 lg:pt-48 lg:pb-32"
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4BC2F0]/10 text-[#4BC2F0] text-sm font-bold uppercase tracking-wider mb-8"
              >
                Identidade & Brandbook · 2024
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl lg:text-6xl font-bold text-black max-w-5xl mx-auto leading-tight mb-12"
              >
                A nossa própria história: dar forma à visão de quem cria.
              </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="inline-flex flex-wrap justify-center gap-x-12 gap-y-8 text-sm bg-white/80 backdrop-blur-sm border border-black/5 rounded-3xl px-12 py-8 shadow-sm"
          >
            <div className="text-center">
              <div className="text-xs text-black/40 uppercase tracking-wider mb-2 font-bold">Estúdio</div>
              <div className="text-black font-bold text-lg">tomo studio</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-black/40 uppercase tracking-wider mb-2 font-bold">Serviços</div>
              <div className="text-black font-bold text-lg">Branding, UI/UX & Web Design</div>
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

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div 
          style={{ opacity }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-black leading-tight mb-8">
              Conceito & Essência
            </h2>
            <div className="space-y-6 text-xl text-black/70 leading-relaxed text-justify md:text-center">
              <p>
                O nome <strong className="text-black">tomo</strong> nasce da ideia de ligação, companheirismo e criação em conjunto. Inspirado no kanji 友 (tomo), associado a amizade e proximidade, o nome reflete a relação entre nós — Marta e Lucas — não apenas enquanto parceiros criativos, mas também enquanto amigos e casal.
              </p>
              <p>
                A construção tipográfica incorpora um detalhe subtil no conjunto "to", criando uma composição visual que pode ser interpretada como uma expressão facial em forma de piscadela. Este elemento introduz leveza, proximidade e humanidade à identidade visual.
              </p>
              <p>
                De forma mais discreta, a própria forma da piscadela sugere também um <strong className="text-black">coração escondido</strong> — um detalhe simbólico que representa cuidado e a componente emocional presente na nossa origem.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// LOGO SECTION (NOVA)
// ============================================
const LogoSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
        <motion.div 
          style={{ scale, opacity }}
          className="text-center"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-12">
            A Nossa Assinatura
          </h2>

          <div className="relative flex justify-center">
            <motion.div
              className="relative aspect-[21/9] w-full max-w-4xl bg-gray-50 rounded-[2rem] flex items-center justify-center border border-black/5 p-8 md:p-16 shadow-lg shadow-black/5 transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Apresentação limpa da imagem do logo */}
              <div className="w-[60%] md:w-[40%] relative z-10 flex justify-center items-center">
                <img 
                  src={logoImg} 
                  alt="Logo tomo studio" 
                  className="w-full h-auto object-contain mix-blend-multiply"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// BRANDBOOK EMBED SECTION
// ============================================
const BrandbookSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={ref} className="relative py-32 bg-gray-50 border-y border-black/5">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            O Manual de Identidade
          </h2>
          <p className="text-xl text-black/60 max-w-2xl mx-auto">
            Explora o nosso brandbook interativo e descobre as regras, as cores, 
            a tipografia e o sistema visual que sustentam a tomo studio.
          </p>
        </div>

        <motion.div 
          style={{ scale, opacity }}
          className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-black/10 bg-white"
        >
          {/* Iframe do Heyzine Flipbook */}
          <iframe 
            allowFullScreen={true} 
            scrolling="no" 
            className="w-full h-[500px] md:h-[700px] lg:h-[850px]" 
            src="https://heyzine.com/flip-book/389f3bad32.html" 
            style={{ border: 'none' }}
            title="Tomo Studio Brandbook"
          />
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
    { name: 'Tomo Blue', hex: '#4BC2F0', bg: 'bg-[#4BC2F0]' },
    { name: 'Tomo Pink', hex: '#FF4B91', bg: 'bg-[#FF4B91]' },
    { name: 'Deep Navy', hex: '#0F172A', bg: 'bg-[#0F172A]' },
    { name: 'Pure White', hex: '#FFFFFF', bg: 'bg-white' },
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
            A Nossa Paleta
          </h2>
          <p className="text-xl text-black/60 max-w-2xl mx-auto">
            Sólida, vibrante e intencional. O contraste entre a sobriedade do Navy e a energia 
            dos nossos tons de assinatura.
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
// OUTRO SECTION
// ============================================
const OutroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center bg-gray-50 border-t border-black/5">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-black/40 uppercase tracking-[0.3em] mb-8 font-bold">
            <Square size={10} className="inline mr-2 text-[#4BC2F0] fill-[#4BC2F0]" />
            Próximo projeto
          </p>

          <Link to="/trabalhos">
            <Magnetic>
                <motion.div
                whileHover={{ scale: 1.02, y: -10 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="group max-w-4xl mx-auto cursor-pointer"
                >
                <h3 className="text-6xl lg:text-7xl font-bold text-black mb-4 group-hover:text-[#4BC2F0] transition-colors">
                    Ver todos os projetos
                </h3>
                <div className="inline-flex items-center gap-2 text-[#4BC2F0] font-bold uppercase tracking-wider text-sm mt-4 border-b-2 border-[#4BC2F0] pb-1">
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
export const TomoStudio = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="bg-white overflow-x-hidden w-full selection:bg-[#4BC2F0] selection:text-white">
      <Navigation />
      <ScrollProgress />
      <HeroSection />
      <ContextSection />
      <LogoSection />
      <BrandbookSection />
      <ColorSystemSection />
      <OutroSection />
    </div>
  );
};