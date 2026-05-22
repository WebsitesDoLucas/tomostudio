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
      className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-tomo-blue via-tomo-pink to-tomo-blue origin-left z-50"
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
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

// ============================================
// THE PROCESS DATA
// ============================================
const processSteps = [
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
    description: "Com a estratégia aprovada, traduzimos a tua essência para o visual. Não te enviamos dezenas de opções confusas; apresentamos a solução visual mais forte e fundamentada, apoiada na psicologia das cores e tipografia estratégica.",
    items: ["Logotipo Principal e Variantes", "Paleta de Cores Estratégica", "Seleção Tipográfica", "Apresentação Fundamentada"]
  },
  {
    title: "Ecossistema Visual",
    icon: Target,
    color: "blue",
    description: "Um logótipo isolado não constrói autoridade. Desenvolvemos todos os elementos de apoio que garantem que a tua marca tem um aspeto premium e consistente em qualquer plataforma, seja no Instagram, num outdoor ou num cartão de visita.",
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
// SINGLE PROCESS STEP (Com Animação de Scroll/Parallax)
// ============================================
const ProcessStep = ({ step, index }: { step: any, index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax: O ícone move-se numa direção, o texto noutra, consoante o scroll
  const yIcon = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  const isEven = index % 2 === 0;

  return (
    <article ref={ref} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      
      {/* ÍCONE (Agora mais pequeno, compacto e a flutuar com o scroll) */}
      <div className={`flex justify-center ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <motion.div style={{ y: yIcon }} className="relative">
          <TransitionReveal direction={isEven ? 'right' : 'left'}>
            <div className={`w-56 h-56 lg:w-72 lg:h-72 rounded-[2.5rem] flex items-center justify-center border border-black/5 shadow-xl bg-white transition-shadow duration-500 hover:shadow-2xl`}>
              <div className={`w-24 h-24 rounded-2xl flex items-center justify-center ${
                step.color === 'blue' ? 'bg-tomo-blue/10' : 'bg-tomo-pink/10'
              }`}>
                <step.icon size={40} strokeWidth={1.5} className={step.color === 'blue' ? 'text-tomo-blue' : 'text-tomo-pink'} />
              </div>
            </div>
          </TransitionReveal>
        </motion.div>
      </div>

      {/* CONTEÚDO (A flutuar subtilmente com o scroll) */}
      <motion.div style={{ y: yText }} className={isEven ? 'lg:order-2' : 'lg:order-1'}>
        <TransitionReveal direction={isEven ? 'left' : 'right'}>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs tracking-[0.2em] text-black/40 uppercase font-bold">
              Fase 0{index + 1}
            </span>
            <span className={`w-1.5 h-1.5 rounded-full ${step.color === 'blue' ? 'bg-tomo-blue' : 'bg-tomo-pink'}`} />
          </div>

          <h3 className="text-4xl lg:text-5xl font-bold text-black mb-6 tracking-tight">
            {step.title}
          </h3>
          <p className="text-lg text-black/60 leading-relaxed mb-8">
            {step.description}
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {step.items.map((item: string, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 size={18} className={step.color === 'blue' ? 'text-tomo-blue' : 'text-tomo-pink'} />
                <span className="text-sm font-medium text-black/70">{item}</span>
              </div>
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
export const Progresso = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // O texto do Hero vai desvanecendo e subindo à medida que fazes scroll para baixo
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], [0, 100]);

  return (
    <div className="bg-white overflow-x-hidden w-full">
      <Navigation />
      <ScrollProgress />

      {/* HERO SECTION (Com Parallax de Scroll) */}
      <section ref={heroRef} className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 bg-white flex items-center justify-center min-h-[60vh]">
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center"
        >
          <TransitionReveal>
            <motion.div className="inline-block px-6 py-2 border border-black/10 rounded-full mb-6">
              <span className="text-xs tracking-[0.3em] text-black/40 uppercase font-medium">
                Metodologia
              </span>
            </motion.div>
            <h1 className="text-5xl lg:text-7xl font-bold text-black mb-6 tracking-tight">
              O design não é arte.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tomo-blue to-tomo-pink">
                É estratégia visual.
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-black/60 max-w-2xl mx-auto">
              Como construímos marcas que não são apenas bonitas, mas desenhadas para gerar confiança e aumentar as tuas vendas.
            </p>
          </TransitionReveal>
        </motion.div>
      </section>

      {/* PROCESS STEPS */}
      <section className="py-20 lg:py-28 bg-gray-50 border-t border-black/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 space-y-32 lg:space-y-40">
          {processSteps.map((step, index) => (
            <ProcessStep key={index} step={step} index={index} />
          ))}
        </div>
      </section>

      {/* ENTREGÁVEIS FINAIS */}
      <section className="py-20 lg:py-28 bg-white border-t border-black/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <TransitionReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4 tracking-tight">
                O que recebes no final?
              </h2>
              <p className="text-lg text-black/60 max-w-2xl mx-auto">
                Não há custos escondidos nem ficheiros em falta. Entregamos um arsenal completo para a tua marca arrancar com tudo.
              </p>
            </div>
          </TransitionReveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {[
              { title: "Manual de Identidade (Brandbook)", desc: "O livro de regras da tua marca. Explica como aplicar cores, espaçamentos e tipografias corretamente para manteres a coerência sempre." },
              { title: "Ficheiros Vetoriais de Impressão", desc: "Formatos AI, EPS e PDF. Podes imprimir a tua marca num cartão de visita ou num outdoor gigante sem nunca perder qualidade." },
              { title: "Ficheiros Digitais Transparentes", desc: "Formatos PNG e SVG. Prontos para aplicares no teu website, em assinaturas de email ou sobreposições de fotos." },
              { title: "Kit de Redes Sociais", desc: "Ficheiros já otimizados à medida certa para as tuas fotos de perfil e capas de Facebook, Instagram e LinkedIn." }
            ].map((item, i) => (
              <TransitionReveal key={i} delay={i * 0.1}>
                <div className="p-8 bg-gray-50 border border-black/5 rounded-3xl h-full hover:shadow-xl transition-shadow duration-300">
                  <FolderOpen className="text-tomo-blue mb-6" size={32} />
                  <h4 className="text-xl font-bold text-black mb-3">{item.title}</h4>
                  <p className="text-black/60 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </TransitionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* OUTRO SECTION CTA */}
      <section className="relative py-32 bg-gray-50 border-t border-black/5">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 w-full text-center">
          <TransitionReveal>
            <p className="text-sm text-black/40 uppercase tracking-[0.3em] mb-8 font-bold">
              Chegou a tua vez
            </p>

            <Link to="/#contacto">
              <Magnetic>
                  <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="group max-w-4xl mx-auto cursor-pointer"
                  >
                  <h3 className="text-5xl lg:text-7xl font-bold text-black mb-6 group-hover:text-tomo-blue transition-colors tracking-tight">
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