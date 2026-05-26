import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform,
  useInView, 
  useMotionValue 
} from 'framer-motion';
import { 
  Search, 
  Target, 
  PenTool, 
  FileCheck, 
  CheckCircle2, 
  ArrowUpRight,
  FolderOpen
} from 'lucide-react';
import { useRef, useLayoutEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';

// ============================================
// TYPES
// ============================================
interface ProcessStepType {
  title: string;
  icon: React.ElementType;
  color: 'blue' | 'pink';
  description: string;
  items: string[];
}

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
      className="inline-block"
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
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-tomo-blue via-tomo-pink to-tomo-blue origin-left z-50"
      style={{ scaleX }}
    />
  );
};

// ============================================
// TRANSITION REVEAL
// ============================================
const TransitionReveal = ({ children, direction = 'up', delay = 0 }: { children: ReactNode, direction?: 'up'|'left'|'right', delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const variants = {
    up: { opacity: 0, y: 40 },
    left: { opacity: 0, x: -40 },
    right: { opacity: 0, x: 40 }
  };

  return (
    <motion.div
      ref={ref}
      initial={variants[direction]}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : variants[direction]}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.45, 0.27, 0.9] }}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// THE PROCESS DATA
// ============================================
const processSteps: ProcessStepType[] = [
  {
    title: "Diagnóstico e Estratégia",
    icon: Search,
    color: "blue",
    description: "Não desenhamos com base em 'achismos'. Começamos por auditar o teu negócio, analisar a tua concorrência e definir o teu posicionamento. Queremos perceber exatamente com quem estás a falar para garantir que a nova marca atrai os clientes certos (e afasta os errados).",
    items: ["Questionário de Branding", "Análise de Concorrência", "Definição de Público-Alvo", "Tom de Voz da Marca"]
  },
  {
    title: "Conceito e Design",
    icon: PenTool,
    color: "pink",
    description: "Com a estratégia aprovada, traduzimos a tua essência para o visual. Não te enviamos dezenas de opções confusas, apresentamos a solução visual mais forte e fundamentada.",
    items: ["Logotipo Principal e Variantes", "Paleta de Cores", "Seleção Tipográfica", "Apresentação Fundamentada"]
  },
  {
    title: "Ecossistema Visual",
    icon: Target,
    color: "blue",
    description: "Um logótipo isolado não constrói autoridade. Desenvolvemos todos os elementos de apoio que garantem que a tua marca tem um aspeto profissional e consistente em qualquer plataforma, seja no Instagram, num outdoor ou num cartão de visita.",
    items: ["Padrões e Texturas (Patterns)", "Iconografia Personalizada", "Direção Fotográfica", "Elementos Gráficos Exclusivos"]
  },
  {
    title: "Entrega e Independência",
    icon: FileCheck,
    color: "pink",
    description: "O nosso objetivo é que sejas 100% independente. Entregamos todos os ficheiros organizados e um Manual de Identidade Visual claro, que servirá de 'livro de regras' para ti, para a tua equipa e para futuros fornecedores.",
    items: ["Manual de Identidade Visual", "Ficheiros Vetoriais (AI, EPS)", "Ficheiros Web (PNG, JPG)", "Exportação Organizada"]
  }
];

// ============================================
// SINGLE PROCESS STEP
// ============================================
const ProcessStep = ({ step, index }: { step: ProcessStepType, index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Parallax forte para o número gigante
  const yNumber = useTransform(smoothProgress, [0, 1], ["20%", "-20%"]);
  const yText = useTransform(smoothProgress, [0, 1], ["5%", "-5%"]);

  const isEven = index % 2 === 0;
  const stepNumber = String(index + 1).padStart(2, '0');

  // Cor do outline menos transparente (15% de opacidade) para maior contraste visual
  const strokeColor = step.color === 'blue' ? 'rgba(0, 102, 255, 0.15)' : 'rgba(255, 51, 153, 0.15)';

  return (
    <article ref={ref} className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center relative">
      
      {/* VISUAL INDICATOR (NÚMERO GIGANTE OUTLINE) */}
      <div className={`flex items-center justify-center pointer-events-none ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <motion.div style={{ y: yNumber }} className="relative flex items-center justify-center w-full">
          <TransitionReveal direction={isEven ? 'right' : 'left'}>
            <span 
              className="text-[14rem] md:text-[20rem] lg:text-[24rem] font-black leading-none tracking-tighter select-none"
              style={{
                WebkitTextStroke: `4px ${strokeColor}`, // Traço mais grosso e visível
                color: 'transparent',
              }}
            >
              {stepNumber}
            </span>
          </TransitionReveal>
        </motion.div>
      </div>

      {/* CONTEÚDO (ALTO CONTRASTE) */}
      <motion.div style={{ y: yText }} className={isEven ? 'lg:order-2' : 'lg:order-1'}>
        <TransitionReveal direction={isEven ? 'left' : 'right'} delay={0.1}>
          
          {/* Cabeçalho da Fase com Ícone Sólido (Aprovado!) */}
          <div className="flex items-center gap-5 mb-8">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${
              step.color === 'blue' ? 'bg-tomo-blue shadow-tomo-blue/20' : 'bg-tomo-pink shadow-tomo-pink/20'
            }`}>
              <step.icon size={26} strokeWidth={2} />
            </div>
            <div>
              <span className="block text-sm tracking-[0.2em] uppercase font-bold text-black/40 mb-1">
                Fase {stepNumber}
              </span>
              <h3 className="text-3xl lg:text-4xl font-bold text-black tracking-tight leading-tight">
                {step.title}
              </h3>
            </div>
          </div>

          <p className="text-lg text-black/80 leading-relaxed mb-10 max-w-xl font-medium">
            {step.description}
          </p>

          {/* Lista de Entregáveis */}
          <div className="space-y-4 max-w-xl border-t border-black/10 pt-8">
            {step.items.map((item, i) => (
              <motion.div 
                key={i} 
                className="flex items-start gap-4 group"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <CheckCircle2 size={20} className={`mt-0.5 ${step.color === 'blue' ? 'text-tomo-blue' : 'text-tomo-pink'}`} />
                <span className="text-base font-semibold text-black/70 group-hover:text-black transition-colors">{item}</span>
              </motion.div>
            ))}
          </div>
        </TransitionReveal>
      </motion.div>

    </article>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
export const Processo = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], [0, 100]);

  return (
    <div className="bg-white overflow-x-hidden w-full">
      <Navigation />
      <ScrollProgress />

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 bg-white flex items-center justify-center min-h-[60vh]">
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center"
        >
          <TransitionReveal>
            <motion.div className="inline-block px-6 py-2 border-2 border-black/10 rounded-full mb-8 bg-white shadow-sm">
              <span className="text-xs tracking-[0.3em] text-black/60 uppercase font-bold">
                O nosso processo
              </span>
            </motion.div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-black mb-6 tracking-tight leading-tight">
              Menos decoração.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tomo-blue to-tomo-pink">
                Mais estratégia.
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-black/80 font-medium max-w-2xl mx-auto leading-relaxed">
              Desconstruímos a complexidade do teu negócio e simplificamos, numa identidade visual que cria ligações de confiança e validam o teu valor no mercado.
            </p>
          </TransitionReveal>
        </motion.div>
      </section>

      {/* PROCESS STEPS (FUNDO LIMPO E CLARO) */}
      <section className="py-20 lg:py-32 bg-gray-50 border-t border-black/5 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 space-y-32 lg:space-y-48 relative z-10">
          {processSteps.map((step, index) => (
            <ProcessStep key={index} step={step} index={index} />
          ))}
        </div>
      </section>

      {/* ENTREGÁVEIS FINAIS (LIGHT MODE REFINADO) */}
      <section className="py-20 lg:py-32 bg-white border-t border-black/5 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <TransitionReveal>
            <div className="text-center mb-16 lg:mb-24">
              <h2 className="text-4xl lg:text-5xl font-black text-black mb-4 tracking-tight">
                O que recebes no final?
              </h2>
              <p className="text-lg text-black/80 font-medium max-w-2xl mx-auto leading-relaxed">
                Não há custos escondidos nem ficheiros em falta. Entregamos um arsenal completo para a tua marca arrancar com tudo.
              </p>
            </div>
          </TransitionReveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {[
              { title: "Manual de Identidade", desc: "O livro de regras da tua marca. Explica como aplicar cores, espaçamentos e tipografias corretamente para manteres a coerência sempre." },
              { title: "Ficheiros Vetoriais", desc: "Formatos AI, EPS e PDF. Podes imprimir a tua marca num cartão de visita ou num outdoor gigante sem nunca perder qualidade." },
              { title: "Formatos Digitais", desc: "Formatos PNG e SVG transparentes. Prontos para aplicares no teu website, em assinaturas de email ou sobreposições de fotos." },
              { title: "Kit de Redes Sociais", desc: "Ficheiros já otimizados à medida certa para as tuas fotos de perfil e capas de Facebook, Instagram e LinkedIn." }
            ].map((item, i) => (
              <TransitionReveal key={i} delay={i * 0.1}>
                <div className="group p-8 lg:p-10 bg-gray-50 border border-black/5 rounded-3xl h-full hover:border-black/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-black/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                    <FolderOpen className="text-tomo-blue" size={26} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-2xl font-bold text-black mb-4 tracking-tight">{item.title}</h4>
                  <p className="text-black/70 leading-relaxed text-base font-medium">{item.desc}</p>
                </div>
              </TransitionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* OUTRO SECTION CTA (LIGHT MODE CLARO) */}
      <section className="relative py-32 bg-gray-50 border-t border-black/5 overflow-hidden text-black">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl flex justify-between pointer-events-none">
            <div className="w-96 h-96 bg-tomo-blue/5 rounded-full blur-[120px] -translate-x-1/2" />
            <div className="w-96 h-96 bg-tomo-pink/5 rounded-full blur-[120px] translate-x-1/2" />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 w-full text-center relative z-10">
          <TransitionReveal>
            <p className="text-sm text-black/40 uppercase tracking-[0.3em] mb-10 font-bold">
              Chegou a tua vez
            </p>

            <Link to="/#contacto" aria-label="Ir para formulário de contacto">
              <Magnetic>
                  <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="group max-w-4xl mx-auto cursor-pointer"
                  >
                  <h3 className="text-5xl md:text-6xl lg:text-7xl font-black text-black mb-8 group-hover:text-tomo-blue transition-colors tracking-tight leading-tight">
                      Iniciar o teu projeto
                  </h3>
                  <div className="inline-flex items-center gap-2 text-tomo-blue font-bold uppercase tracking-wider text-sm mt-4 border-b-2 border-tomo-blue pb-1">
                      Preencher Formulário
                      <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} />
                  </div>
                  </motion.div>
              </Magnetic>
            </Link>
          </TransitionReveal>
        </div>
      </section>
    </div>
  );
};