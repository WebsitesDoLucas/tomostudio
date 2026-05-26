import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue 
} from 'framer-motion';
import { ArrowUpRight, Check, Download } from 'lucide-react';
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
import rollupsImg from '../assets/idipv/Rollups.webp';
import zoomImg from '../assets/idipv/zoom (2).webp';

// Importação do PDF para o Vite o processar corretamente
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
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1E007F] via-[#0055FF] to-[#1E007F] origin-left z-50 pointer-events-none"
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
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_1px]" />

      <motion.div 
        style={{ opacity }}
        className="relative z-10 w-full px-4 sm:px-6 lg:px-12"
      >
        <div className="text-center max-w-[1600px] mx-auto">
          <motion.div style={{ y: yText }} className="will-change-transform">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0055FF]/10 text-[#0055FF] text-xs sm:text-sm font-bold uppercase tracking-wider mb-6 sm:mb-8"
              >
                Case Study · 2024
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#020224] max-w-5xl mx-auto leading-tight mb-8 sm:mb-12 tracking-tight break-words"
              >
                Onde o conhecimento encontra o futuro: Uma assinatura de vanguarda
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
              <div className="text-black font-bold text-base sm:text-lg">Instituto Politécnico de Viseu</div>
            </div>
            <div className="hidden sm:block w-px bg-black/10 self-stretch" />
            <div>
              <div className="text-xs text-black/40 uppercase tracking-wider mb-1 font-bold">Serviços</div>
              <div className="text-black font-bold text-base sm:text-lg">Naming, Branding & Digital</div>
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
                      src={outdoorImg} 
                      alt="IDIPV Outdoor Preview"
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
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-black leading-tight mb-6 sm:mb-8 tracking-tight">
                O motor da transferência tecnológica
              </h2>
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-black/70 leading-relaxed">
                <p>
                  O IDIPV atua como a ponte essencial aproximando o conhecimento científico e tecnológico desenvolvido no Politécnico de Viseu do tecido empresarial regional.
                </p>
                <p>
                  O nosso desafio passou por estruturar um ecossistema gráfico moderno e flexível capaz de traduzir a ciência aplicada com o máximo rigor técnico e autoridade visual.
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
// CHALLENGE SECTION (Cards Minimalistas Oficiais)
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
      title: 'Investigação',
      description: 'Representado pela letra "i", reflete o pilar académico fundamental do saber científico, da descoberta e da inovação constante.',
      features: ['Saber académico', 'Inovação focada', 'Rigor científico'],
      color: 'blue'
    },
    {
      number: '02',
      title: 'Desenvolvimento',
      description: 'Materializado na anatomia da letra "d", projeta a transição fluida do conhecimento do laboratório diretamente para o tecido empresarial.',
      features: ['Ciência aplicada', 'Evolução ativa', 'Soluções de mercado'],
      color: 'pink'
    },
    {
      number: '03',
      title: 'O Pixel',
      description: 'O ponto do "i" desenhado como um pixel perfeito afirma a precisão técnica e define o ADN puramente digital da instituição.',
      features: ['Precisão modular', 'ADN Digital', 'Módulo geométrico'],
      color: 'blue'
    }
  ] as const;

  return (
    <section ref={ref} className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-black/[0.02] to-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <motion.div style={{ scale, opacity }} className="w-full flex flex-col items-center will-change-transform">
          
          <div className="text-center mb-8 sm:mb-16">
            <div className="inline-block px-5 py-1.5 border border-black/10 rounded-full mb-4 sm:mb-6">
              <span className="text-[10px] sm:text-xs tracking-[0.3em] text-black/40 uppercase font-medium">
                Conceito Visual
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-black mb-4 tracking-tight">
              Como fundir o <span className="text-[#0055FF]">conhecimento</span> e a prática?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-black/60 max-w-2xl mx-auto">
              A desconstrução geométrica do símbolo baseada nos conceitos de conectividade e evolução.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full text-left">
            {conceptData.map((service) => {
              const isBlue = service.color === 'blue';
              const hoverBorder = isBlue ? 'hover:border-[#0055FF]/50' : 'hover:border-tomo-pink/50';
              const hoverShadow = isBlue ? 'hover:shadow-[#0055FF]/10' : 'hover:shadow-tomo-pink/10';

              return (
                <motion.div
                  key={service.number}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="h-full flex"
                >
                  <div
                    className={`flex flex-col w-full p-6 sm:p-8 bg-white border-2 border-black/5 rounded-2xl sm:rounded-3xl transition-all duration-300 shadow-sm hover:shadow-xl ${hoverBorder} ${hoverShadow}`}
                  >
                    <div className="text-xs font-mono text-black/40 mb-4 sm:mb-6">{service.number}</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-black mb-3 tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-black/60 leading-relaxed mb-6 flex-grow">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mt-auto">
                      {service.features.map(feature => (
                        <li
                          key={feature}
                          className="flex items-center gap-3 text-xs sm:text-sm text-black/60"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              isBlue ? 'bg-[#0055FF]' : 'bg-tomo-pink'
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
// LOGO REVEAL SECTION
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
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-10 sm:mb-16 tracking-tight"
          >
            A Solução Visual
          </motion.h2>

          <div className="relative mb-10 sm:mb-20 flex justify-center">
            <motion.div
              className="relative aspect-[21/9] w-full max-w-5xl bg-gray-50 rounded-2xl sm:rounded-[2rem] border border-black/5 flex items-center justify-center p-4 sm:p-8 md:p-16 shadow-xs"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-[70%] sm:w-[60%] md:w-[45%] relative z-10">
                <img 
                  src={logoImg} 
                  alt="Logo IDIPV" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain drop-shadow-xl mix-blend-multiply"
                />
              </div>
            </motion.div>
          </div>

          <p className="text-base sm:text-xl md:text-2xl text-black/70 max-w-3xl mx-auto leading-relaxed px-2">
            O monograma baseia-se na interseção fluida entre o "i" e o "d". O ponto da letra "i" assume a forma de um pixel perfeito, afirmando a sua precisão e ADN puramente tecnológico.
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 tracking-tight">
            A Cor da Evolução
          </h2>
          <p className="text-base sm:text-xl text-black/60 max-w-2xl mx-auto">
            O <span className="font-bold text-[#1E007F]">Deep Blue</span> assegura a base autoritária e institucional, enquanto o <span className="font-bold text-[#0055FF]">Neon Blue</span> funciona como ponto de luz e inovação.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 w-full">
          {colors.map((color, i) => (
            <motion.div 
              key={color.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="will-change-transform"
            >
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
        </div>
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
    { name: 'Estacionário Institucional', img: estacionarioImg, colSpan: 'col-span-1' },
    { name: 'Sinalética em Vidro', img: placaVidroImg, colSpan: 'col-span-1' },
    { name: 'Roll-ups / Eventos', img: rollupsImg, colSpan: 'col-span-1' },
    { name: 'Sinalética Exterior (MUPI)', img: mupiImg, colSpan: 'col-span-1' },
    { name: 'Redes Sociais', img: instagramImg, colSpan: 'col-span-1' },
    { name: 'Fundos de Videoconferência', img: zoomImg, colSpan: 'col-span-1' },
  ];

  return (
    <section ref={ref} className="relative py-16 sm:py-24 lg:py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 tracking-tight">
            O Sistema Visual
          </h2>
          <p className="text-base sm:text-xl text-black/60 max-w-2xl mx-auto">
            Uma estrutura de marca que garante a máxima funcionalidade e aplicabilidade em suportes físicos e digitais.
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
            Explora em detalhe a construção estratégica, as regras de aplicação e o sistema visual completo desenvolvido para o IDIPV.
          </p>
          
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-black/10 bg-white mb-8 sm:mb-12">
            <iframe 
              allowFullScreen={true} 
              scrolling="no" 
              className="w-full h-full border-none" 
              src="https://heyzine.com/flip-book/43176c2206.html"
              title="Manual de Identidade IDIPV"
            ></iframe>
          </div>

          <p className="text-xs sm:text-sm text-black/40 mb-4 sm:mb-6 font-medium uppercase tracking-widest">
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
                  <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-4 group-hover:text-[#0055FF] transition-colors tracking-tight break-words leading-tight">
                      Ver todos os projetos
                  </h3>
                  <div className="inline-flex items-center gap-2 text-[#0055FF] font-bold uppercase tracking-wider text-xs sm:text-sm mt-2 sm:mt-4 border-b-2 border-[#0055FF] pb-1">
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
      <ManualSection />
      <OutroSection />
    </div>
  );
};