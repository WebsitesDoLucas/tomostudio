import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue,
  useInView
} from 'framer-motion';
import { ArrowUpRight, Check, Download } from 'lucide-react';
import { useRef, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';

// ============================================
// IMPORTAÇÃO DE ASSETS
// ============================================
import logotipoImg from "../assets/LogoCompleto.webp";
import logoImg from "../assets/logo.webp";
import manualPdf from '../assets/ManualdeidentidadeTOMO.pdf';

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
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-tomo-blue via-tomo-pink to-tomo-blue origin-left z-50 pointer-events-none"
      style={{ scaleX }}
    />
  );
};

// ============================================
// ANIMATION WRAPPER
// ============================================
const FadeIn = ({ children, delay = 0, yOffset = 30 }: { children: React.ReactNode, delay?: number, yOffset?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: yOffset }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] as const }}
  >
    {children}
  </motion.div>
);

// ============================================
// HERO SECTION
// ============================================
const HeroSection = () => {
  const titleLines = [
    "Muito prazer,",
    "somos a tomo,",
    "o teu parceiro criativo."
  ];

  return (
    <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-white overflow-hidden flex flex-col items-center">
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
            className="absolute w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-tomo-blue/20 rounded-full blur-[100px] lg:blur-[120px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: ["2rem", "-1rem", "2rem"],
              y: ["2rem", "-2rem", "2rem"],
              rotate: [0, -45, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] bg-tomo-pink/20 rounded-full blur-[100px] lg:blur-[120px]" 
          />
        </div>
      </div>
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="max-w-5xl flex flex-col gap-1 md:gap-3 mb-6 md:mb-8">
          {titleLines.map((line, index) => (
            <div key={index} className="overflow-hidden pb-2">
              <motion.h1
                initial={{ y: "110%", rotate: 2, opacity: 0 }}
                animate={{ y: "0%", rotate: 0, opacity: 1 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.1 + (index * 0.15), 
                  ease: [0.16, 1, 0.3, 1] as const 
                }}
                className="text-5xl sm:text-6xl md:text-8xl font-bold text-black tracking-tight leading-[1] drop-shadow-sm"
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
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
            { title: "Estúdio", content: <p className="text-base font-medium text-black">Tomo Studio</p> },
            { title: "Localização", content: <p className="text-base font-medium text-black">Viseu, Portugal</p> },
            { title: "Serviços", content: <ul className="text-base font-medium text-black space-y-1"><li>Branding & Identidade</li><li>Websites & Digital</li><li>Direção Criativa</li></ul> },
            { title: "Website", content: <a href="#" className="inline-flex items-center gap-1 text-base font-medium text-black border-b border-black/20 hover:border-black transition-colors">tomostudio.pt <ArrowUpRight size={14} /></a> }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 + (i * 0.1), ease: [0.16, 1, 0.3, 1] as const }}
            >
              <h4 className="text-xs font-bold text-black/40 uppercase tracking-widest mb-2">{item.title}</h4>
              {item.content}
            </motion.div>
          ))}
        </motion.div>
      </div>
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
  const isBlue = item.color === 'blue';

  const easeGolden = [0.76, 0, 0.24, 1] as const;

  return (
    <motion.div 
      ref={rowRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, delay: index * 0.1, ease: easeGolden }}
      className="border-b border-black/10 first:border-t group relative overflow-hidden cursor-pointer"
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
              animate={{ color: isActive ? (isBlue ? '#41B6E6' : '#E06287') : 'rgba(0,0,0,0.2)' }}
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
// MAIN INTEGRATED CONCEPT SECTION
// ============================================
const ConceptSection = () => {
  const conceptData = [
    {
      number: '01',
      title: 'A Origem: O Amigo',
      color: 'blue',
      description: 'A palavra "tomo" tem origem no kanji japonês 友, que significa amigo ou parceiro. É exatamente assim que vemos a nossa relação com cada cliente: uma parceria próxima onde a criação acontece em conjunto.',
      features: ['Companheirismo', 'Proximidade', 'Criação partilhada']
    },
    {
      number: '02',
      title: 'A Piscadela Humana',
      color: 'pink',
      description: 'Se reparares bem nas letras "to" da nossa assinatura, vais notar uma pequena piscadela de olho. É um detalhe intencional que reflete o nosso espírito jovem, acessível e sempre pronto a ajudar.',
      features: ['Empatia visual', 'Espírito jovem', 'Tom conversacional']
    },
    {
      number: '03',
      title: 'O Coração Escondido',
      color: 'blue',
      description: 'O nosso símbolo esconde a silhueta de um coração na sua curva principal. Porque, no fundo, o nosso trabalho é dar vida e forma a marcas que nascem da verdadeira paixão de quem as cria.',
      features: ['Cuidado e detalhe', 'Apoio aos negócios', 'Visão 360º']
    }
  ];

  return (
    <section className="relative py-24 lg:py-36 bg-gray-50 border-t border-black/5 overflow-hidden flex flex-col items-center">
      
      {/* Manifesto Tipográfico */}
      <div className="max-w-[1000px] mx-auto px-6 w-full text-center flex flex-col items-center mb-16 lg:mb-24">
        <FadeIn yOffset={40}>
          <span className="text-[10px] tracking-[0.3em] font-bold text-tomo-blue uppercase block mb-6">
            // O Significado
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-black tracking-tighter leading-[1.05] max-w-4xl mb-12 sm:mb-16">
            Cada detalhe conta a nossa história.
          </h2>
        </FadeIn>

        <div className="w-full max-w-[380px] aspect-square flex items-center justify-center my-6 relative z-10">
          <Magnetic>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
              className="w-full h-full bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-black/5 p-12 flex items-center justify-center will-change-transform"
            >
              <img 
                src={logoImg} 
                alt="Tomo Monograma" 
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </motion.div>
          </Magnetic>
        </div>
      </div>

      {/* Desconstrução do Sistema (Rows) */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full bg-white pt-16 lg:pt-24 pb-12 lg:pb-16 rounded-[3rem] border border-black/[0.03] shadow-sm relative z-20 -mt-10 lg:-mt-20">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <FadeIn>
            <span className="text-xs font-mono font-bold text-black/40 block mb-3">O nosso ADN</span>
            <p className="text-xl sm:text-2xl text-black/50 font-medium tracking-tight">
              A nossa marca foi desenhada para transmitir exatamente aquilo que somos: um estúdio próximo, profissional e focado nos detalhes que fazem a diferença.
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
    <section ref={ref} className="relative min-h-[60vh] sm:min-h-[80vh] flex items-center bg-gray-50 py-16 sm:py-32 border-y border-black/5">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full relative z-10">
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
            A Nossa Assinatura
          </motion.h2>

          <div className="relative mb-10 sm:mb-20 flex justify-center">
            <motion.div
              className="relative aspect-[21/9] w-full max-w-5xl bg-white rounded-2xl sm:rounded-[3rem] border border-black/5 flex items-center justify-center p-4 sm:p-8 md:p-16 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-[70%] sm:w-[60%] md:w-[45%] relative z-10">
                <img 
                  src={logotipoImg} 
                  alt="Logo Tomo Studio" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain drop-shadow-sm mix-blend-multiply"
                />
              </div>
            </motion.div>
          </div>

          <p className="text-base sm:text-xl md:text-2xl text-black/60 max-w-3xl mx-auto leading-relaxed px-2 font-medium">
            A nossa assinatura principal é limpa, direta e amigável. Escolhemos formas arredondadas e uma tipografia simples para que a marca respire profissionalismo, sem nunca perder o lado humano.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// COLOR SYSTEM (Valores Técnicos 100% Corretos)
// ============================================
const ColorSystemSection = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // 🌟 CORRIGIDO: Valores exatos de PANTONE, CMYK e HEX extraídos das tuas imagens
  const colors = [
    { name: 'Azul Escuro', hex: '#050838', cmyk: 'C:98% M:93% Y:42% K:58%', pantone: 'PANTONE 2768 C', bg: 'bg-[#050838]' },
    { name: 'Azul Celeste', hex: '#49B6FF', cmyk: 'C:57% M:16% Y:0% K:0%', pantone: 'PANTONE 298 C', bg: 'bg-[#49B6FF]' },
    { name: 'Rosa', hex: '#E56399', cmyk: 'C:5% M:76% Y:9% K:0%', pantone: 'PANTONE 7423 C', bg: 'bg-[#E56399]' },
    { name: 'Verde Lima', hex: '#D2F898', cmyk: 'C:20% M:0% Y:52% K:0%', pantone: 'PANTONE 372 C', bg: 'bg-[#D2F898]' },
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
            As Nossas Cores
          </h2>
          <p className="text-base sm:text-xl text-black/50 max-w-2xl mx-auto font-medium">
            Fugimos ao tradicional formato escuro e fechado de agência. Escolhemos tons vibrantes e cheios de personalidade para mostrar a nossa energia e vontade de inovar.
          </p>
        </motion.div>

        {/* Grelha de 4 colunas com a ficha de especificações completa */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full items-start">
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
                
                <div className="flex flex-col gap-1 mt-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[11px] sm:text-sm text-black/40 font-mono bg-gray-50 px-1.5 py-0.5 rounded border border-black/[0.03]">{color.hex}</p>
                    {copiedIndex === i && <span className="text-[10px] sm:text-xs text-green-500 font-bold">Copiado!</span>}
                  </div>
                  <span className="text-[10px] sm:text-xs text-black/40 font-bold tracking-wider uppercase mt-1">{color.pantone}</span>
                  <span className="text-[10px] sm:text-xs text-black/30 font-mono leading-tight">{color.cmyk}</span>
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
// MANUAL SECTION
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
          <p className="text-base sm:text-lg text-black/50 max-w-2xl mx-auto mb-8 sm:mb-16 font-medium">
            Gostamos de ser transparentes e partilhar como trabalhamos. Podes folhear o nosso manual de marca e ver todas as regras que guiam o visual da tomo.
          </p>
          
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3] rounded-2xl sm:rounded-[3rem] overflow-hidden shadow-2xl border border-black/10 bg-white mb-8 sm:mb-12">
            <iframe 
              allowFullScreen={true} 
              scrolling="no" 
              className="w-full h-full border-none" 
              src="https://heyzine.com/flip-book/389f3bad32.html"
              title="Manual de Identidade Tomo Studio"
            ></iframe>
          </div>

          <p className="text-xs sm:text-sm text-black/30 mb-4 sm:mb-6 font-bold uppercase tracking-widest">
            Preferes ler o ficheiro local?
          </p>

          <Magnetic>
            <motion.a
              href={manualPdf}
              download="Manual_Identidade_TomoStudio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-bold rounded-full shadow-lg shadow-black/10 transition-all hover:bg-black/80 text-sm sm:text-base"
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
// OUTRO SECTION (Slogan em Destaque)
// ============================================
const OutroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center bg-white border-t border-black/5 py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="will-change-transform"
        >
          <p className="text-xs sm:text-sm font-bold text-tomo-pink uppercase tracking-[0.3em] mb-8">
            Criamos contigo, não só para ti.
          </p>

          <Link to="/contactos" className="block w-full">
            <Magnetic>
                <div className="group max-w-4xl mx-auto cursor-pointer px-2">
                  <h3 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-black mb-8 group-hover:text-black/50 transition-colors tracking-tighter leading-tight">
                      Vamos trabalhar juntos?
                  </h3>
                  <div className="inline-flex items-center gap-2 text-black font-bold uppercase tracking-wider text-xs sm:text-sm mt-2 border-b-2 border-black pb-1">
                      Fala connosco
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
export const TomoStudio = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="bg-white overflow-x-hidden w-full selection:bg-tomo-blue selection:text-white">
      <Navigation />
      <ScrollProgress />
      <HeroSection />
      <ConceptSection />
      <LogoRevealSection />
      <ColorSystemSection />
      <ManualSection />
      <OutroSection />
    </div>
  );
};