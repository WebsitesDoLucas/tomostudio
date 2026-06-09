import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue,
  useInView,
  AnimatePresence,
  Variants
} from 'framer-motion';
import { ArrowUpRight, Check, Download, X } from 'lucide-react';
import { useRef, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';

// ============================================
// IMPORTAÇÃO DE ASSETS (PASTA IDIPV)
// ============================================
import logoImg from '../assets/idipv/logo.webp';
import outdoorImg from '../assets/idipv/OUTDOOR.webp';
import estacionarioImg from '../assets/idipv/Cartão de visita e papel timbrado.webp';
import mupiImg from '../assets/idipv/MUPI.webp';
import placaVidroImg from '../assets/idipv/placa.webp';
import posterImg from '../assets/idipv/poster.webp';
import instagramImg from '../assets/idipv/Publicações de instagram.webp';
import rollupsImg from '../assets/idipv/rollups.webp';

// Importação do PDF
import manualPdf from '../assets/idipv/ManualdeIdentidadeIDIPV.pdf';

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
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1E007F] via-[#0055FF] to-[#1E007F] origin-left z-50 pointer-events-none"
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
    "Onde o conhecimento",
    "encontra o futuro",
    "através do design."
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
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_1px]" />
        
        <div className="absolute top-0 right-0 w-full lg:w-[60%] h-[600px] flex items-center justify-center lg:justify-end lg:pr-[10%]">
          <motion.div 
            animate={{ 
              scale: [1, 1.15, 1],
              x: ["-2rem", "1rem", "-2rem"],
              y: ["-2rem", "1rem", "-2rem"],
              rotate: [0, 45, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#0055FF]/15 rounded-full blur-[100px] lg:blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: ["2rem", "-1rem", "2rem"],
              y: ["2rem", "-2rem", "2rem"],
              rotate: [0, -45, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] bg-[#1E007F]/10 rounded-full blur-[100px] lg:blur-[120px]" 
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
            { title: "Tipologia", content: <p className="text-base font-medium text-black">Identidade Visual</p> },
            { title: "Serviços", content: <ul className="text-base font-medium text-black space-y-1"><li>Estratégia de Marca</li><li>Identidade Visual</li><li>Estacionário & Digital</li></ul> },
            { title: "Ano", content: <p className="text-base font-medium text-black border-b border-black/20 pb-0.5">2026</p> }
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
              animate={{ color: isActive ? (isLightBlue ? '#0055FF' : '#1E007F') : 'rgba(0,0,0,0.2)' }}
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
// CONCEPT SECTION (Ativadas Animações de Scroll)
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
      title: 'A Inovação e Identidade',
      color: 'dark',
      description: 'O monograma "id" afirma o conceito de Identidade e o destaque individual de cada projeto, ao mesmo tempo que remete diretamente para as siglas de Inovação e Desenvolvimento (I&D).',
      features: ['Afirmação de Identidade', 'Destaque individual', 'Inovação e I&D']
    },
    {
      number: '02',
      title: 'O Desenvolvimento Regional',
      color: 'light',
      description: 'Espelhado no alargamento e na curvatura da letra "d" (Desenvolvimento). Evoca movimento e progressão contínua, posicionando o gabinete como um motor ativo de aceleração para o tecido empresarial.',
      features: ['Ciência aplicada', 'Evolução constante', 'Aceleração de mercado']
    },
    {
      number: '03',
      title: 'O Pixel Tecnológico',
      color: 'dark',
      description: 'O ponto da letra "i" foi rigorosamente desenhado sob a forma geométrica de um pixel — a unidade mínima de qualquer sistema digital. Afirma o ADN tecnológico, o rigor científico e a precisão do gabinete.',
      features: ['Grelha modular', 'ADN Digital', 'Precisão técnica']
    }
  ];

  return (
    <section ref={containerRef} className="relative py-24 lg:py-36 bg-gray-50 border-t border-black/5 overflow-hidden flex flex-col items-center">
      
      <div className="max-w-[1000px] mx-auto px-6 w-full text-center flex flex-col items-center mb-24 lg:mb-32">
        <FadeIn yOffset={30}>
          <span className="text-[10px] tracking-[0.3em] font-bold text-[#0055FF] uppercase block mb-6">
            // GABINETE DE TRANSFERÊNCIA DE TECNOLOGIA DO IPV
          </span>
        </FadeIn>
        <FadeIn delay={0.1} yOffset={30}>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-black tracking-tighter leading-[1.05] max-w-4xl mb-6 sm:mb-10">
            Aproximar o saber científico do tecido empresarial.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2} yOffset={30}>
          <p className="text-lg sm:text-xl text-black/50 max-w-2xl mx-auto font-medium mb-12 sm:mb-16">
            A identidade visual do IDIPV assenta no princípio fundamental do rigor técnico, unindo o conceito de Inovação e Desenvolvimento (I&D) com a afirmação de uma Identidade forte e de destaque global.
          </p>
        </FadeIn>

        <motion.div style={{ y: yImage }} className="w-full max-w-[500px] aspect-[16/10] flex items-center justify-center my-6 relative z-10 will-change-transform">
          <Magnetic>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
              className="w-full h-full bg-white rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.05)] border border-black/5 overflow-hidden flex items-center justify-center will-change-transform"
            >
              <img 
                src={placaVidroImg} 
                alt="IDIPV Símbolo em Placa" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </Magnetic>
        </motion.div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full bg-white pt-16 lg:pt-24 pb-12 lg:pb-16 rounded-[3rem] border border-black/[0.03] shadow-sm relative z-20">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <FadeIn>
            <span className="text-xs font-mono font-bold text-black/40 block mb-3">Conceito Visual e Estratégia</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-xl sm:text-2xl text-black/50 font-medium tracking-tight">
              A união milimétrica entre a solidez das formas institucionais e a afirmação de uma identidade conectada.
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
// LOGO REVEAL SECTION (Ativadas Animações de Scroll)
// ============================================
const LogoRevealSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative min-h-[60vh] sm:min-h-[80vh] flex items-center bg-white py-16 sm:py-32 border-b border-black/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <motion.div 
          style={{ scale, opacity }}
          className="text-center will-change-transform"
        >
          <FadeIn yOffset={30}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-10 sm:mb-16 tracking-tight">
              A Variante Principal
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} yOffset={30}>
            <div className="relative mb-10 sm:mb-20 flex justify-center">
              <div className="relative aspect-[21/9] w-full max-w-5xl bg-gray-50 rounded-2xl sm:rounded-[2rem] border border-black/5 flex items-center justify-center p-4 sm:p-8 md:p-16 shadow-inner">
                <div className="w-[70%] sm:w-[60%] md:w-[45%] relative z-10">
                  <img 
                    src={logoImg} 
                    alt="Assinatura Padrão IDIPV" 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain drop-shadow-xl mix-blend-multiply"
                  />
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} yOffset={30}>
            <p className="text-base sm:text-xl md:text-2xl text-black/70 max-w-3xl mx-auto leading-relaxed px-2 font-medium">
              Composta pelo símbolo monogramático seguido da sigla IPV em alinhamento horizontal. O símbolo assume destaque cromático em gradiente vibrante, contrastando com o preto tipográfico para garantir o equilíbrio e a legibilidade institucional.
            </p>
          </FadeIn>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// COLOR SYSTEM (Ativadas Animações de Scroll)
// ============================================
const ColorSystemSection = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const colors = [
    { name: 'Neon Blue (2728 C)', hex: '#0055FF', bg: 'bg-[#0055FF]' },
    { name: 'Deep Blue (2748 C)', hex: '#1E007F', bg: 'bg-[#1E007F]' },
    { name: 'Tech White', hex: '#FFFFFF', bg: 'bg-white' },
    { name: 'Night Black', hex: '#000000', bg: 'bg-black' },
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
              A Paleta Cromática Oficial
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-base sm:text-xl text-black/50 max-w-2xl mx-auto font-medium">
              O <span className="font-bold text-[#1E007F]">Deep Blue</span> estabelece a base de autoridade institucional, enquanto o <span className="font-bold text-[#0055FF]">Neon Blue</span> funciona como ponto de luz e dinamismo para a comunicação digital.
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
// APPLICATIONS SECTION (🌟 Lightbox Funcional Integrado)
// ============================================
const ApplicationsSection = () => {
  const [activeImage, setActiveImage] = useState<{ src: string; name: string } | null>(null);

  const applications = [
    { name: 'Billboard Outdoor', img: outdoorImg, aspect: 'aspect-video md:aspect-[21/9]', colSpan: 'sm:col-span-2 lg:col-span-3' },
    { name: 'Sinalética Exterior (MUPI)', img: mupiImg, aspect: 'aspect-[4/5]', colSpan: 'col-span-1' },
    { name: 'Sinalética em Vidro', img: placaVidroImg, aspect: 'aspect-[4/5]', colSpan: 'col-span-1' },
    { name: 'Cartazes e Posters', img: posterImg, aspect: 'aspect-[4/5]', colSpan: 'col-span-1' },
    { name: 'Estacionário Institucional', img: estacionarioImg, aspect: 'aspect-[4/5]', colSpan: 'col-span-1' },
    { name: 'Roll-ups / Eventos', img: rollupsImg, aspect: 'aspect-[4/5]', colSpan: 'col-span-1' },
    { name: 'Redes Sociais (Feed/Stories)', img: instagramImg, aspect: 'aspect-[4/5]', colSpan: 'col-span-1' },
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
              A marca em todo o lado.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg sm:text-xl text-black/50 max-w-2xl mx-auto font-medium">
              Garantindo coesão em todos os suportes, desde a sinalética exterior e placas de vidro até ao estacionário oficial e plataformas digitais. Clica nas imagens para as expandir.
            </p>
          </FadeIn>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {applications.map((app, index) => (
            <motion.div
              key={`${app.name}-${index}`}
              variants={itemVariants}
              className={`will-change-transform w-full ${app.colSpan || ''}`}
              onClick={() => setActiveImage({ src: app.img, name: app.name })}
            >
              <div className={`relative ${app.aspect} rounded-3xl overflow-hidden group cursor-pointer border border-black/[0.03] shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-shadow duration-700 w-full`}>
                <img 
                  src={app.img} 
                  alt={app.name} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-[1.03] will-change-transform"
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

      {/* Lightbox para visualização da imagem expandida */}
      <AnimatePresence>
        {activeImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-30"
              onClick={() => setActiveImage(null)}
            >
              <X size={24} />
            </button>

            <motion.div 
              initial={{ scale: 0.97, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative max-w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={activeImage.src} 
                alt={activeImage.name}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-xl"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/40 text-white text-xs font-medium tracking-wide rounded-full backdrop-blur-sm pointer-events-none">
                {activeImage.name}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// ============================================
// BRANDBOOK SECTION (Ativadas Animações de Scroll)
// ============================================
const ManualSection = () => {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-gray-50 border-t border-black/5">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-12 text-center w-full">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6 tracking-tight">
            Manual de Identidade
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-base sm:text-lg text-black/50 max-w-2xl mx-auto mb-8 sm:mb-16 font-medium">
            Explora em detalhe a construção, as regras de aplicação e o sistema visual completo desenvolvido para o IDIPV.
          </p>
        </FadeIn>
        
        <FadeIn delay={0.2} yOffset={30}>
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.06)] border border-black/5 bg-white mb-8 sm:mb-12">
            <iframe 
              allowFullScreen={true} 
              scrolling="no" 
              className="w-full h-full border-none" 
              src="https://heyzine.com/flip-book/43176c2206.html"
              title="Manual de Identidade IDIPV"
            ></iframe>
          </div>
        </FadeIn>

        <FadeIn delay={0.3} yOffset={20}>
          <p className="text-xs sm:text-sm text-black/30 mb-4 sm:mb-6 font-bold uppercase tracking-widest">
            Preferes o ficheiro local?
          </p>

          <Magnetic>
            <motion.a
              href={manualPdf}
              download="Manual_Identidade_IDIPV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 bg-[#0055FF] text-white font-bold rounded-full shadow-lg shadow-[#0055FF]/20 transition-all hover:bg-[#0044CC] text-sm sm:text-base"
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
    <section className="relative min-h-[60vh] sm:min-h-[80vh] flex items-center bg-white border-t border-black/5 py-16">
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
                  <h3 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-black mb-4 group-hover:text-[#0055FF] transition-colors tracking-tighter leading-tight">
                      Ver todos os projetos
                  </h3>
                  <div className="inline-flex items-center gap-2 text-[#0055FF] font-bold uppercase tracking-wider text-xs sm:text-sm mt-2 sm:mt-4 border-b-2 border-[#0055FF] pb-1">
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
export const IDIPV = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="bg-white overflow-x-hidden w-full selection:bg-[#0055FF] selection:text-white">
      <Navigation />
      <ScrollProgress />
      <HeroSection />
      <ConceptSection />
      <LogoRevealSection />
      <ColorSystemSection />
      <ApplicationsSection />
      <ManualSection />
      <OutroSection />
    </div>
  );
};