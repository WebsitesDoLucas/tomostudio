import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useInView, 
  useMotionValue
} from 'framer-motion';

import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  Lightbulb,
  MapPin,
  Mail,
  Instagram,
  Target,
  Layers,
  Zap,
  Send
} from 'lucide-react';

import { useRef, useState, useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';

// Importações de Imagens
import fotocasal from '../assets/fotocasal.webp';
import LogoCompleto from '../assets/LogoCompleto.webp';
import logowebp from '../assets/logo.webp';
import poliempreendeImg from '../assets/poliempreende/Billboard.webp';
import AveimédicaImg from '../assets/aveimedica/FACHADA1.webp';

// Hook auxiliar para detetar mobile sem quebrar o layout e aliviar o processador da Apple
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

// ============================================
// UTILS: MAGNETIC COMPONENT
// ============================================
const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouse = (e: React.MouseEvent) => {
    if (isMobile || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.15);
    y.set(middleY * 0.15);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (isMobile) return <div className="inline-block">{children}</div>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="inline-block transform-gpu" 
    >
      {children}
    </motion.div>
  );
};

// ============================================
// AWWWARDS-STYLE CURSOR (Otimizado contra loops no iOS)
// ============================================
const CustomCursor = () => {
  const isMobile = useIsMobile();
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover'>('default');
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(0, { damping: 25, stiffness: 400 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 400 });
  const dotX = useSpring(0, { damping: 30, stiffness: 200 });
  const dotY = useSpring(0, { damping: 30, stiffness: 200 });

  useEffect(() => {
    if (isMobile) return; // 🌟 SOLUÇÃO ANTI-LAG MÓVEL: Cancela escutas de rato no telemóvel

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      cursorX.set(clientX);
      cursorY.set(clientY);
      dotX.set(clientX);
      dotY.set(clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('a, button, input, textarea, select')) {
        setCursorVariant('hover');
      } else {
        setCursorVariant('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile, cursorX, cursorY, dotX, dotY]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference rounded-full hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          width: cursorVariant === 'hover' ? 60 : 12,
          height: cursorVariant === 'hover' ? 60 : 12,
          backgroundColor:
            cursorVariant === 'hover'
              ? 'rgba(255, 255, 255, 0.15)'
              : 'rgba(255, 255, 255, 0.9)',
          borderWidth: cursorVariant === 'hover' ? 2 : 0,
          borderColor: 'rgba(255, 255, 255, 0.5)'
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28
        }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-1 h-1 bg-white/60 rounded-full mix-blend-difference hidden lg:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      />
    </>
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
      className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-tomo-blue via-tomo-pink to-tomo-blue origin-left z-50 transform-gpu"
      style={{ scaleX }}
    />
  );
};

// ============================================
// CHAPTER INDICATOR
// ============================================
const ChapterIndicator = () => {
  const isMobile = useIsMobile();
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    { label: 'Intro', id: 'intro' },
    { label: 'Serviços', id: 'servicos' },
    { label: 'Trabalhos', id: 'trabalhos' },
    { label: 'Processo', id: 'processo' },
    { label: 'Sobre', id: 'sobre' },
    { label: 'Contacto', id: 'contacto' }
  ];

  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportCenter) {
            setActiveChapter(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block mix-blend-difference pointer-events-none">
      <div className="space-y-6 pointer-events-auto">
        {chapters.map((chapter, index) => (
          <motion.a
            key={chapter.id}
            href={`#${chapter.id}`}
            className="group flex items-center gap-3"
            whileHover={{ x: 8 }}
          >
            <motion.div
              className={`w-2 h-2 rounded-full transition-all ${
                activeChapter === index ? 'bg-white w-8' : 'bg-white/30'
              }`}
              animate={{
                scale: activeChapter === index ? [1, 1.2, 1] : 1
              }}
              transition={{ duration: 1, repeat: activeChapter === index ? Infinity : 0 }}
            />
            <span
              className={`text-xs opacity-0 group-hover:opacity-100 transition-opacity ${
                activeChapter === index ? 'text-white font-medium' : 'text-white/50'
              }`}
            >
              {chapter.label}
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

// ============================================
// TRANSITION REVEAL (Otimizado para iOS/Safari)
// ============================================
const TransitionReveal = ({
  children,
  direction = 'up',
  delay = 0
}: {
  children: ReactNode;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
}) => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  
  // No mobile, abrimos a margem para evitar que o Safari esconda elementos visíveis
  const isInView = useInView(ref, { once: true, margin: isMobile ? "200px" : "-80px" });

  const variants: Record<'up' | 'left' | 'right', any> = {
    up: { opacity: 0, y: 30 },
    left: { opacity: 0, x: -30 },
    right: { opacity: 0, x: 30 }
  };

  return (
    <motion.div
      ref={ref}
      initial={variants[direction]}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : variants[direction]}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="transform-gpu"
    >
      {children}
    </motion.div>
  );
};

// ============================================
// HERO SECTION
// ============================================
const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const tomoNavy = "#020224";
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const xLogo = useTransform(mouseXSpring, [-0.5, 0.5], ["-30px", "30px"]);
  const yLogo = useTransform(mouseYSpring, [-0.5, 0.5], ["-30px", "30px"]);
  const xBack = useTransform(mouseXSpring, [-0.5, 0.5], ["50px", "-50px"]);
  const yBack = useTransform(mouseYSpring, [-0.5, 0.5], ["50px", "-50px"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { width, height } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX / width - 0.5);
    mouseY.set(e.clientY / height - 0.5);
  };

  return (
    <section 
      ref={containerRef} 
      id="intro"
      onMouseMove={handleMouseMove} 
      className="relative h-screen min-h-[600px] w-full bg-white flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ x: isMobile ? 0 : xBack, y: isMobile ? 0 : yBack }}
      >
        <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full blur-[100px] opacity-20 bg-[#0099FF]" />
        <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full blur-[100px] opacity-10 bg-[#020224]" />
      </motion.div>
      
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.webp')]" />

      <div className="relative z-10 flex flex-col items-center text-center transform-gpu">
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          className="mb-4 md:mb-6"
        >
          <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase opacity-40" style={{ color: tomoNavy }}>
            Estúdio de Design & Estratégia
          </span>
        </motion.div>

        <div className="flex flex-col items-center leading-[0.85]">
          <div className="overflow-hidden p-2">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[14vw] lg:text-[11vw] font-black tracking-tighter"
              style={{ color: tomoNavy }}
            >
              CRIAMOS
            </motion.h1>
          </div>

          <div className="overflow-hidden flex items-center justify-center gap-2 md:gap-6 mt-[-2vw] lg:mt-[-1.5vw] p-2 pr-6">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-[14vw] lg:text-[11vw] font-black tracking-tighter"
              style={{ color: tomoNavy }}
            >
              CONTIGO
            </motion.h1>

            <motion.div 
              style={{ x: isMobile ? 0 : xLogo, y: isMobile ? 0 : yLogo }} 
              className="relative w-[14vw] h-[14vw] md:w-[10vw] md:h-[10vw] lg:w-[9vw] lg:h-[9vw] p-2 mb-[2vw] flex items-center justify-center"
            >
              <img 
                src={logowebp} 
                alt="Tomo Logo" 
                decoding="async"
                className="w-full h-full object-contain" 
              />
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p className="mt-4 text-lg md:text-xl font-medium italic opacity-60" style={{ color: tomoNavy }}>
            não apenas para ti
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3, duration: 0.5 }} 
          className="mt-8"
        >
          <a 
            href="#contacto"
            className="group flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-sm shadow-xl bg-[#020224]"
          >
            Iniciar Projeto
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// SERVICES SECTION
// ============================================
const ServicesSection = () => {
  const services = [
    {
      number: '01',
      title: 'Branding & Identidade',
      description: 'Sistemas completos de identidade: logo, cores, tipografia, elements gráficos.',
      features: ['Logotipo & Sistema', 'Paleta cromática', 'Tipografia', 'Manual de identidade'],
      color: 'blue'
    },
    {
      number: '02',
      title: 'UI/UX Design',
      description: 'Interfaces digitais focadas em experiência do utilizador e conversão.',
      features: ['Websites responsivos', 'Prototipagem', 'Design de interfaces', 'Estrutura UX'],
      color: 'pink'
    },
    {
      number: '03',
      title: 'Design para Redes Sociais',
      description: 'Conteúdo visual estratégico mantendo a consistência da marca.',
      features: ['Templates', 'Feed design', 'Stories & Reels', 'Estratégia visual'],
      color: 'blue'
    }
  ] as const;

  return (
    <section id="servicos" className="relative py-16 lg:py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <TransitionReveal>
          <div className="text-center mb-10 lg:mb-16">
            <div className="inline-block px-6 py-2 border border-black/10 rounded-full mb-6">
              <span className="text-xs tracking-[0.3em] text-black/40 uppercase font-medium">
                Capítulo II
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-black mb-4 tracking-tight">
              Serviços que geram impacto
            </h2>
            <p className="text-lg lg:text-xl text-black/60 max-w-2xl mx-auto">
              Transformamos marcas com propósito
            </p>
          </div>
        </TransitionReveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {services.map((service, index) => {
            const isBlue = service.color === 'blue';
            return (
              <TransitionReveal key={service.number} delay={index * 0.05}>
                <div className="h-full flex flex-col w-full p-8 bg-white border-2 border-black/5 rounded-3xl transition-all shadow-sm">
                  <div className="text-xs font-mono text-black/40 mb-6">{service.number}</div>
                  <h3 className="text-2xl font-bold text-black mb-4 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-base text-black/60 leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mt-auto">
                    {service.features.map(feature => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-black/60">
                        <span className={`w-1.5 h-1.5 rounded-full ${isBlue ? 'bg-tomo-blue' : 'bg-tomo-pink'}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </TransitionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============================================
// WORKS SECTION (Zero Lag Parallax)
// ============================================
const WorksSection = () => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY1 = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const imageY2 = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const projects = [
    {
      id: 1,
      title: 'PoliEmpreende',
      category: 'Branding & Identidade',
      description: 'Identidade visual completa para o concurso nacional de empreendedorismo.',
      year: '2024',
      tags: ['Identidade Visual', 'Sistema de Marca'],
      color: 'blue',
      image: poliempreendeImg,
      path: '/poliempreende',
      parallax: imageY1
    },
    {
      id: 2,
      title: 'Aveimédica', 
      category: 'Rebrand Corporativo',
      description: 'Renovação estratégica da identidade e posicionamento de marca.',
      year: '2024',
      tags: ['Rebrand', 'Strategy'],
      color: 'pink',
      image: AveimédicaImg, 
      path: '/aveimedica',
      parallax: imageY2
    },
  ];

  return (
    <section id="trabalhos" ref={containerRef} className="relative py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 transform-gpu">
        <div className="mb-16 lg:mb-24">
            <TransitionReveal>
              <div className="inline-block px-6 py-2 border border-black/10 rounded-full mb-6">
                <span className="text-xs tracking-[0.3em] text-black/40 uppercase font-medium">
                  Capítulo III
                </span>
              </div>
              <h2 className="text-5xl lg:text-7xl font-bold text-black leading-tight tracking-tight mb-6">
                Projetos que contam histórias
              </h2>
              <p className="text-lg lg:text-2xl text-black/60 max-w-3xl">
                Cada projeto é um capítulo único. Trabalhamos em profundidade para criar identidades autênticas.
              </p>
            </TransitionReveal>
        </div>

        <div className="space-y-24 lg:space-y-32">
          {projects.map((project, index) => (
            <article key={project.id} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className={index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}>
                <TransitionReveal direction={index % 2 === 0 ? 'right' : 'left'}>
                  <div className="relative">
                    <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl bg-gray-50 transform-gpu">
                      <motion.img 
                        style={{ y: isMobile ? 0 : project.parallax, scale: isMobile ? 1 : 1.15 }} 
                        src={project.image} 
                        alt={project.title} 
                        decoding="async" 
                        loading="eager" // Força o Safari a pintar sem ecrã branco
                        className="w-full h-full object-cover will-change-transform" 
                      />
                    </div>
                  </div>
                </TransitionReveal>
              </div>

              <div className={index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}>
                <TransitionReveal direction={index % 2 === 0 ? 'left' : 'right'} delay={0.05}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-xs tracking-[0.2em] text-black/40 uppercase font-bold">
                      {project.category}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full ${project.color === 'blue' ? 'bg-tomo-blue' : 'bg-tomo-pink'}`} />
                    <span className="text-xs font-medium text-black/40">{project.year}</span>
                  </div>

                  <h3 className="text-4xl lg:text-6xl font-bold text-black mb-6 leading-tight tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-lg lg:text-xl text-black/60 leading-relaxed mb-8">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-10">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-4 py-2 text-sm border border-black/10 text-black/60 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link to={project.path}>
                    <div className="inline-flex items-center gap-3 text-base font-bold text-black group">
                      Ver caso completo
                      <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </TransitionReveal>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-24 lg:mt-32 flex justify-center">
          <Link to="/trabalhos">
            <Magnetic>
              <button className="group relative flex items-center gap-4 px-10 py-5 bg-white border-2 border-black/10 text-black font-bold text-base rounded-full overflow-hidden transition-all shadow-sm transform-gpu">
                Ver todos os projetos
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </Magnetic>
          </Link>
        </div>
      </div>
    </section>
  );
};

// ============================================
// PROCESS JOURNEY
// ============================================
const ProcessJourney = () => {
  const steps = [
    { icon: Target, title: 'Descoberta', description: 'Mergulhamos na essência da tua marca', color: 'blue' },
    { icon: Lightbulb, title: 'Conceito', description: 'Transformamos ideias em direções visuais', color: 'pink' },
    { icon: Layers, title: 'Execução', description: 'Materializamos cada detalhe com precisão', color: 'blue' },
    { icon: Zap, title: 'Lançamento', description: 'Elevamos a tua marca ao mundo', color: 'pink' }
  ] as const;

  return (
    <section id="processo" className="relative py-16 lg:py-20 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative flex flex-col items-center">
        <TransitionReveal>
          <div className="text-center mb-10 lg:mb-16">
            <div className="inline-block px-6 py-2 border border-black/10 rounded-full mb-6">
              <span className="text-xs tracking-[0.3em] text-black/40 uppercase font-medium">
                Capítulo IV
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-black mb-4 tracking-tight">
              O nosso processo
            </h2>
            <p className="text-lg lg:text-xl text-black/60 max-w-2xl mx-auto">
              Cada projeto é uma jornada única de descoberta e criação
            </p>
          </div>
        </TransitionReveal>

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8 w-full">
          {steps.map((step, index) => {
            const hoverClasses = step.color === 'blue' ? 'hover:border-tomo-blue' : 'hover:border-tomo-pink';
            return (
              <TransitionReveal key={step.title} direction={index % 2 === 0 ? 'left' : 'right'} delay={index * 0.05}>
                <div className="relative">
                  <div className={`relative p-8 bg-white border-2 border-black/5 rounded-3xl transition-all ${hoverClasses}`}>
                    <div className={`w-16 h-16 rounded-2xl ${step.color === 'blue' ? 'bg-tomo-blue/10' : 'bg-tomo-pink/10'} flex items-center justify-center mb-6`}>
                      <step.icon className={step.color === 'blue' ? 'text-tomo-blue' : 'text-tomo-pink'} size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-3">{step.title}</h3>
                    <p className="text-base text-black/60 leading-relaxed">{step.description}</p>
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full border border-black/5 flex items-center justify-center text-xs font-mono text-black/20">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              </TransitionReveal>
            );
          })}
        </div>

        <TransitionReveal>
          <Link to="/Processo">
            <button className="mt-16 text-sm font-bold border-b-2 border-tomo-blue pb-1 text-black flex items-center gap-2">
              Ver processo detalhado <ArrowRight size={16} />
            </button>
          </Link>
        </TransitionReveal>
      </div>
    </section>
  );
};

// ============================================
// ABOUT SECTION
// ============================================
const AboutSection = () => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const imageY = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["-10%", "10%"]);

  return (
    <section id="sobre" ref={containerRef} className="relative py-20 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <TransitionReveal>
          <div className="mb-16 lg:mb-20">
            <div className="inline-block px-6 py-2 border border-black/10 rounded-full mb-6">
              <span className="text-xs tracking-[0.3em] text-black/40 uppercase font-medium">Capítulo V</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-black mb-6 tracking-tight">A história da tomo</h2>
            <p className="text-lg lg:text-xl text-black/60 max-w-3xl">
              De colegas de turma a parceiros criativos numa missão: transformar a forma como os negócios portugueses comunicam através do design.
            </p>
          </div>
        </TransitionReveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <TransitionReveal direction="left">
            <div className="space-y-6 text-base lg:text-lg text-black/60 leading-relaxed">
              <p>
                Somos a <strong className="text-black font-bold">Marta</strong> e o{' '}
                <strong className="text-black font-bold">Lucas</strong>, um casal que se conheceu na mesma turma de Tecnologia e Design Multimédia.
              </p>
              <p>
                Desde o início que partilhamos a mesma obsessão: perceber como a identidade visual pode fazer um negócio ser levado mais a sério e chegar mais longe.
              </p>
              <p>
                Trabalhámos com marcas locais e nacionais, mas reparámos numa coisa: em Viseu e em muito de Portugal, há negócios incríveis com identidades desatualizadas. E isso custa-lhes clientes e credibilidade.
              </p>
              <p className="text-lg lg:text-xl text-black font-medium pt-4">
                A tomo nasceu para mudar isso. Queremos ser o parceiro criativo que te ajuda a ter uma marca que te representa de verdade.
              </p>
            </div>
          </TransitionReveal>

          <div className="relative h-full flex items-center justify-center">
            <TransitionReveal direction="right">
              <div className="aspect-[4/3] w-full rounded-[2rem] overflow-hidden border border-black/5 shadow-xl relative z-10 bg-gray-100">
                <motion.img
                  style={{ y: isMobile ? 0 : imageY }}
                  src={fotocasal} 
                  alt="Marta e Lucas - tomo studio"
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </TransitionReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// CONTACT SECTION
// ============================================
const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', projectType: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as any).toString(),
      });
      setFormStatus('success');
      setFormData({ name: '', email: '', projectType: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <section id="contacto" className="relative py-16 lg:py-20 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
        <TransitionReveal>
          <div className="text-center mb-10 lg:mb-16">
            <div className="inline-block px-6 py-2 border border-black/10 rounded-full mb-6">
              <span className="text-xs tracking-[0.3em] text-black/40 uppercase font-medium">
                Capítulo Final
              </span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-bold text-black mb-4 leading-tight tracking-tight">
              Vamos criar algo juntos?
            </h2>
            <p className="text-lg lg:text-xl text-black/60 max-w-2xl mx-auto">
              Conta-nos em que capítulo está a tua marca. Respondemos em menos de 24 horas.
            </p>
          </div>
        </TransitionReveal>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 max-w-5xl mx-auto">
          <TransitionReveal direction="left">
            <div className="space-y-10">
              <div>
                <h3 className="text-2xl font-bold text-black mb-4 tracking-tight">Fala connosco</h3>
                <p className="text-base text-black/60 leading-relaxed">
                  Quer seja uma marca nova ou um rebrand, estamos aqui para ajudar.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: MapPin, title: 'Localização', info: 'Viseu, Portugal', sub: 'Presencial + Remoto', color: 'blue' },
                  { icon: Mail, title: 'Email', info: 'tomostudiocontacto@gmail.com', color: 'pink' },
                  { icon: Instagram, title: 'Instagram', info: '@tomostudio.pt', color: 'blue', href: 'https://www.instagram.com/tomostudio.pt' }
                ].map(item => (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.href?.startsWith('http') ? "_blank" : undefined}
                    rel={item.href?.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-4 cursor-pointer"
                  >
                    <div className={`w-12 h-12 rounded-2xl ${item.color === 'blue' ? 'bg-tomo-blue/10' : 'bg-tomo-pink/10'} flex items-center justify-center flex-shrink-0`}>
                      <item.icon className={item.color === 'blue' ? 'text-tomo-blue' : 'text-tomo-pink'} size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-black mb-1">{item.title}</h4>
                      <p className="text-sm text-black/60 hover:text-tomo-blue transition-colors">{item.info}</p>
                      <p className="text-xs text-black/40 italic">{item.sub}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </TransitionReveal>

          <TransitionReveal direction="right">
            <form name="contacto" method="POST" data-netlify="true" onSubmit={handleSubmit} className="space-y-5">
              <input type="hidden" name="form-name" value="contacto" />
              {[
                { id: 'name', label: 'Nome *', type: 'text', placeholder: 'O teu nome' },
                { id: 'email', label: 'Email *', type: 'email', placeholder: 'email@exemplo.com' }
              ].map(field => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-sm font-medium text-black mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    required
                    value={formData[field.id as keyof typeof formData]}
                    onChange={e => setFormData({ ...formData, [field.id]: e.target.value })}
                    className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-2xl text-black placeholder:text-black/30 focus:outline-none focus:border-tomo-blue transition-all"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="projectType" className="block text-sm font-medium text-black mb-2">Tipo de projeto</label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-2xl text-black focus:outline-none focus:border-tomo-blue transition-all"
                >
                  <option value="">Seleciona uma opção</option>
                  <option value="branding">Branding & Identidade</option>
                  <option value="uiux">UI/UX Design</option>
                  <option value="social">Design para Redes Sociais</option>
                  <option value="completo">Projeto completo</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-black mb-2">Mensagem *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white border-2 border-black/10 rounded-2xl text-black placeholder:text-black/30 focus:outline-none focus:border-tomo-blue transition-all resize-none"
                  placeholder="Conta-nos sobre o teu negócio..."
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'loading'}
                className={`w-full px-8 py-4 text-white font-medium text-sm rounded-full transition-all ${
                  formStatus === 'success' ? 'bg-green-500' : 
                  formStatus === 'error' ? 'bg-red-500' :
                  'bg-gradient-to-r from-tomo-blue to-tomo-pink'
                }`}
              >
                <span className="flex items-center justify-center gap-3">
                  {formStatus === 'idle' && <>Enviar mensagem <Send size={16} /></>}
                  {formStatus === 'loading' && 'A enviar...'}
                  {formStatus === 'success' && 'Mensagem enviada com sucesso!'}
                  {formStatus === 'error' && 'Erro ao enviar. Tenta de novo.'}
                </span>
              </button>
            </form>
          </TransitionReveal>
        </div>
      </div>
    </section>
  );
};

// ============================================
// FOOTER
// ============================================
export const Footer = () => {
  const navLinks = [
    { label: 'Trabalhos', id: 'trabalhos' },
    { label: 'Serviços', id: 'servicos' },
    { label: 'Sobre', id: 'sobre' },
    { label: 'Contacto', id: 'contacto' }
  ];

  return (
    <footer className="relative py-12 bg-black text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-10">
          <div className="lg:col-span-2">
            <img 
              src={LogoCompleto} 
              alt="Tomo Studio" 
              loading="lazy"
              decoding="async"
              className="h-8 w-auto mb-4 object-contain brightness-0 invert opacity-90" 
            />
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] mb-4 text-white/40">Navegação</h4>
            <ul className="space-y-3">
              {navLinks.map(item => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-sm text-white/60 hover:text-white transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] mb-4 text-white/40">Contacto</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>Viseu, Portugal</li>
              <li><a href="mailto:tomostudiocontacto@gmail.com" className="hover:text-white transition-colors">tomostudiocontacto@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} tomo studio. Todos os direitos reservados.</p>
          <p className="text-xs text-white/40 flex items-center gap-2">Feito com <Heart size={10} fill="currentColor" /> em Viseu</p>
        </div>
      </div>
    </footer>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
export const Home = () => {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="bg-white w-full">
      <style>{`
        body { overflow-x: hidden; }
        @media (min-width: 1024px) {
          * { cursor: none !important; }
        }
      `}</style>
      <CustomCursor />
      <Navigation />
      <ChapterIndicator />
      
      <HeroSection />
      <ServicesSection />
      <WorksSection />
      <ProcessJourney />
      <AboutSection />
      <ContactSection />
      
      <Footer />
    </div>
  );
};