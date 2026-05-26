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
import logoImg from "../assets/thumbs/tomostudio.webp";

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
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#41B6E6] to-[#E06287] origin-left z-50 pointer-events-none"
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
      className="relative flex flex-col items-center justify-center overflow-hidden bg-gray-50 pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-48 lg:pb-32"
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#41B6E6]/10 text-[#41B6E6] text-xs sm:text-sm font-bold uppercase tracking-wider mb-6 sm:mb-8"
              >
                Identidade & Brandbook · 2024
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#071D49] max-w-5xl mx-auto leading-tight mb-8 sm:mb-12 tracking-tight break-words"
              >
                A nossa própria história: dar forma à visão de quem cria.
              </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="inline-flex flex-col sm:flex-row justify-center gap-x-12 gap-y-6 text-sm bg-white/80 backdrop-blur-sm border border-black/5 rounded-2xl sm:rounded-3xl px-6 py-6 sm:px-12 sm:py-8 shadow-sm w-full sm:w-auto text-center will-change-transform"
          >
            <div>
              <div className="text-xs text-black/40 uppercase tracking-wider mb-1 font-bold">Estúdio</div>
              <div className="text-black font-bold text-base sm:text-lg">tomo studio</div>
            </div>
            <div className="hidden sm:block w-px bg-black/10 self-stretch" />
            <div>
              <div className="text-xs text-black/40 uppercase tracking-wider mb-1 font-bold">Serviços</div>
              <div className="text-black font-bold text-base sm:text-lg">Branding, UI/UX & Web Design</div>
            </div>
          </motion.div>
        </div>
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
    <section ref={ref} className="relative py-16 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <motion.div 
          style={{ opacity }}
          className="max-w-4xl mx-auto text-center w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="will-change-transform"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#071D49] leading-tight mb-6 sm:mb-8 tracking-tight">
              Conceito & Essência
            </h2>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-xl text-black/70 leading-relaxed text-justify md:text-center px-2">
              <p>
                O nome tomo nasce da ideia de ligação, companheirismo e criação em conjunto. Inspirado no kanji 友 (tomo), associado a amizade e proximidade, o nome reflete a relação entre os dois fundadores do estúdio, não apenas enquanto parceiros criativos, mas também enquanto amigos e casal.
              </p>
              <p>
                A construção tipográfica incorpora um detalhe subtil no conjunto "to", criando uma composição visual que pode ser interpretada como uma expressão facial em forma de piscadela. Este elemento introduz leveza, proximidade e humanidade à identidade visual.
              </p>
              <p>
                De forma mais discreta, a própria forma da piscadela sugere também um coração escondido — um detalhe simbólico que representa ligação, cuidado e a componente emocional presente na origem do estúdio. O resultado é um ecossistema que equilibra profissionalismo, criatividade e expressão humana.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// LOGO SECTION
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
    <section ref={ref} className="relative py-12 sm:py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <motion.div 
          style={{ scale, opacity }}
          className="text-center will-change-transform flex flex-col items-center justify-center w-full"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071D49] mb-8 sm:mb-12 tracking-tight">
            A Nossa Assinatura
          </h2>

          <div className="relative flex justify-center w-full">
            <motion.div
              className="relative aspect-[21/9] w-full max-w-4xl bg-gray-50 rounded-2xl sm:rounded-[2rem] border border-black/5 flex items-center justify-center p-6 sm:p-8 md:p-16 shadow-lg shadow-black/5 transition-all duration-500 hover:shadow-xl hover:-translate-y-1.5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-[70%] sm:w-[60%] md:w-[45%] h-full flex justify-center items-center">
                <img 
                  src={logoImg} 
                  alt="Logo tomo studio" 
                  loading="lazy"
                  decoding="async"
                  className="max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-sm"
                />
              </div>
            </motion.div>
          </div>
          
          <p className="text-sm text-black/40 italic mt-6 max-w-lg mx-auto px-4">
            "Variante Principal: Combina formas suaves e tipografia minimalista, estabelecendo a assinatura primária do estúdio."
          </p>
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
    <section ref={ref} className="relative py-16 sm:py-24 lg:py-32 bg-gray-50 overflow-hidden border-y border-black/5">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071D49] mb-4 tracking-tight">
            O Manual de Identidade
          </h2>
          <p className="text-base sm:text-xl text-black/60 max-w-2xl mx-auto">
            Explora o nosso brandbook interativo e descobre as regras, as cores, 
            a tipografia e o sistema visual que sustentam a tomo studio.
          </p>
        </div>

        <motion.div 
          style={{ scale, opacity }}
          className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-black/10 bg-white will-change-transform"
        >
          <iframe 
            allowFullScreen={true} 
            scrolling="no" 
            className="w-full h-[350px] sm:h-[500px] md:h-[700px] lg:h-[850px]" 
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
    { name: 'Azul Celeste', pantone: '298 C', hex: '#41B6E6', desc: 'Cor primária institucional que reflete rigor e solidez técnica.', bg: 'bg-[#41B6E6]' },
    { name: 'Azul Escuro', pantone: '2768 C', hex: '#071D49', desc: 'Cor principal complementar para assinatura e contraste.', bg: 'bg-[#071D49]' },
    { name: 'Rosa', pantone: '7423 C', hex: '#E06287', desc: 'Tom secundário ideal para quebrar a monotonia e chamar atenção.', bg: 'bg-[#E06287]' },
    { name: 'Verde Lima', pantone: '372 C', hex: '#D4EB8E', desc: 'Cor de nicho reservada para pequenos apontamentos minimalistas.', bg: 'bg-[#D4EB8E]' },
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#071D49] mb-4 tracking-tight">
            A Nossa Paleta
          </h2>
          <p className="text-base sm:text-xl text-black/60 max-w-2xl mx-auto">
            Sólida, vibrante e intencional. Equivalências exatas homologadas no manual para ecrã (HEX) e suportes físicos (Pantone).
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
                 className="group cursor-pointer relative flex flex-col h-full bg-gray-50 border border-black/5 p-4 sm:p-5 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300"
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
                <h4 className="font-bold text-black text-xs sm:text-base mb-0.5 leading-tight">{color.name}</h4>
                <div className="flex items-center gap-2 mb-2">
                    <p className="text-[11px] sm:text-sm text-black/40 font-mono bg-gray-50 px-1.5 py-0.5 rounded border border-black/[0.03]">{color.hex}</p>
                    {copiedIndex === i && <span className="text-[10px] sm:text-xs text-green-500 font-bold">Copiado!</span>}
                </div>
                <p className="text-[11px] text-black/50 leading-relaxed hidden sm:block mt-auto">
                  {color.desc}
                </p>
              </div>
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
    <section className="relative min-h-[60vh] sm:min-h-[80vh] flex items-center bg-gray-50 border-t border-black/5 py-16">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="will-change-transform"
        >
          <p className="text-xs sm:text-sm text-black/40 uppercase tracking-[0.3em] mb-6 sm:mb-8 font-bold">
            <Square size={10} className="inline mr-2 text-[#41B6E6] fill-[#41B6E6]" />
            Próximo projeto
          </p>

          <div className="text-xs text-[#E06287] font-mono tracking-widest uppercase mb-4 block">
            "criamos contigo, não apenas para ti."
          </div>

          <Link to="/trabalhos" className="block w-full">
            <Magnetic>
                <div className="group max-w-4xl mx-auto cursor-pointer px-2">
                  <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-4 group-hover:text-[#41B6E6] transition-colors tracking-tight break-words leading-tight">
                      Ver todos os projetos
                  </h3>
                  <div className="inline-flex items-center gap-2 text-[#41B6E6] font-bold uppercase tracking-wider text-xs sm:text-sm mt-2 sm:mt-4 border-b-2 border-[#41B6E6] pb-1">
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
export const TomoStudio = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="bg-white overflow-x-hidden w-full selection:bg-[#41B6E6] selection:text-white">
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