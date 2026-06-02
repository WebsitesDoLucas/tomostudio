import { 
  motion, 
  useScroll, 
  useTransform, 
  useInView 
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

// ============================================
// GLOBAL HOOK: DETETOR MOBILE/TOUCH
// ============================================
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024 || navigator.maxTouchPoints > 0);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

// ============================================
// TRANSITION REVEAL (Otimizado para iOS)
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
  
  // Margem agressiva de 400px no mobile para forçar o Safari a pintar antes do utilizador lá chegar
  const isInView = useInView(ref, { 
    once: true, 
    margin: isMobile ? "400px 0px 400px 0px" : "-50px" 
  });

  const variants = {
    up: { opacity: 0, y: isMobile ? 10 : 40 },
    left: { opacity: 0, x: isMobile ? -10 : -40 },
    right: { opacity: 0, x: isMobile ? 10 : 40 }
  };

  return (
    <motion.div
      ref={ref}
      initial={variants[direction]}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : variants[direction]}
      transition={{ 
        duration: isMobile ? 0.3 : 0.8,
        delay: isMobile ? 0 : delay,
        ease: [0.21, 0.45, 0.27, 0.9] 
      }}
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
  const tomoNavy = "#020224";

  return (
    <section id="intro" className="relative h-screen min-h-[650px] w-full bg-white flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full blur-[100px] opacity-20 bg-[#0099FF]" />
        <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full blur-[100px] opacity-10 bg-[#020224]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center transform-gpu">
        <TransitionReveal>
          <div className="mb-4 md:mb-6">
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase opacity-40" style={{ color: tomoNavy }}>
              Estúdio de Design & Estratégia
            </span>
          </div>

          <div className="flex flex-col items-center leading-[0.85] text-black">
            <h1 className="text-[14vw] lg:text-[11vw] font-black tracking-tighter" style={{ color: tomoNavy }}>
              CRIAMOS
            </h1>
            <div className="flex items-center justify-center gap-4 mt-[-1vw]">
              <h1 className="text-[14vw] lg:text-[11vw] font-black tracking-tighter" style={{ color: tomoNavy }}>
                CONTIGO
              </h1>
              <div className="w-[10vw] h-[10vw] max-w-[80px] max-h-[80px] border-4 rounded-2xl flex items-center justify-center" style={{ borderColor: tomoNavy }}>
                <span className="text-xs font-black">TM</span>
              </div>
            </div>
          </div>

          <p className="mt-6 text-lg md:text-xl font-medium italic opacity-60" style={{ color: tomoNavy }}>
            não apenas para ti
          </p>

          <div className="mt-8">
            <a href="#contacto" className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-sm shadow-xl bg-[#020224]">
              Iniciar Projeto
              <ArrowRight size={18} />
            </a>
          </div>
        </TransitionReveal>
      </div>
    </section>
  );
};

// ============================================
// SERVICES SECTION
// ============================================
const ServicesSection = () => {
  const services = [
    { number: '01', title: 'Branding & Identidade', description: 'Sistemas completos de identidade: logo, cores, tipografia, elementos gráficos.', features: ['Logotipo & Sistema', 'Paleta cromática', 'Tipografia', 'Manual de identidade'], color: 'blue' },
    { number: '02', title: 'UI/UX Design', description: 'Interfaces digitais focadas em experiência do utilizador e conversão.', features: ['Websites responsivos', 'Prototipagem', 'Design de interfaces', 'Estrutura UX'], color: 'pink' },
    { number: '03', title: 'Design para Redes Sociais', description: 'Conteúdo visual estratégico mantendo a consistência da marca.', features: ['Templates', 'Feed design', 'Stories & Reels', 'Estratégia visual'], color: 'blue' }
  ] as const;

  return (
    <section id="servicos" className="relative py-20 bg-gray-50 border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <TransitionReveal>
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 border border-black/10 rounded-full mb-4 bg-white shadow-sm">
              <span className="text-xs tracking-[0.3em] text-black/40 uppercase font-medium">Capítulo II</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-black tracking-tight">Serviços que geram impacto</h2>
          </div>
        </TransitionReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <TransitionReveal key={service.number} delay={index * 0.1}>
              <div className="h-full flex flex-col p-8 bg-white border border-black/5 rounded-3xl shadow-sm hover:shadow-md transition-all">
                <div className="text-xs font-mono text-black/40 mb-6">{service.number}</div>
                <h3 className="text-2xl font-bold text-black mb-4 tracking-tight">{service.title}</h3>
                <p className="text-base text-black/60 leading-relaxed mb-6 flex-grow">{service.description}</p>
                <ul className="space-y-2 mt-auto border-t border-black/5 pt-4">
                  {service.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-black/60">
                      <span className={`w-1.5 h-1.5 rounded-full ${service.color === 'blue' ? 'bg-tomo-blue' : 'bg-tomo-pink'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </TransitionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// WORKS SECTION
// ============================================
const WorksSection = () => {
  const projects = [
    { id: 1, title: 'PoliEmpreende', category: 'Branding & Identidade', description: 'Identidade visual completa desenvolvida para o prestigiado concurso nacional de empreendedorismo.', year: '2024', color: 'blue', path: '/poliempreende' },
    { id: 2, title: 'Aveimédica', category: 'Rebrand Corporativo', description: 'Renovação estratégica total da identidade, tom de voz e posicionamento de marca no mercado da saúde.', year: '2024', color: 'pink', path: '/aveimedica' },
  ];

  return (
    <section id="trabalhos" className="relative py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <TransitionReveal>
            <div className="inline-block px-6 py-2 border border-black/10 rounded-full mb-4">
              <span className="text-xs tracking-[0.3em] text-black/40 uppercase font-medium">Capítulo III</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-black tracking-tight">Projetos selecionados</h2>
          </TransitionReveal>
        </div>

        <div className="space-y-16">
          {projects.map((project) => (
            <div key={project.id} className="border-b border-black/10 pb-12">
              <TransitionReveal>
                <div className="grid lg:grid-cols-3 gap-6 items-start">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-black/40">{project.category}</span>
                    <h3 className="text-3xl font-black text-black mt-1">{project.title}</h3>
                  </div>
                  <p className="text-lg text-black/70 leading-relaxed font-medium">{project.description}</p>
                  <div className="lg:text-right">
                    <Link to={project.path} className="inline-flex items-center gap-2 text-black font-bold uppercase text-sm border-b-2 border-black pb-1 hover:text-tomo-blue hover:border-tomo-blue transition-colors">
                      Ver caso completo <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </TransitionReveal>
            </div>
          ))}
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
    <section id="processo" className="relative py-20 bg-gray-50 border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center">
        <TransitionReveal>
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 border border-black/10 rounded-full mb-4 bg-white shadow-sm">
              <span className="text-xs tracking-[0.3em] text-black/40 uppercase font-medium">Capítulo IV</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-black tracking-tight">O nosso processo</h2>
          </div>
        </TransitionReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {steps.map((step, index) => (
            <TransitionReveal key={step.title} delay={index * 0.05}>
              <div className="relative p-8 bg-white border border-black/5 rounded-3xl shadow-sm">
                <div className={`w-12 h-12 rounded-xl ${step.color === 'blue' ? 'bg-tomo-blue/10 text-tomo-blue' : 'bg-tomo-pink/10 text-tomo-pink'} flex items-center justify-center mb-6`}>
                  <step.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">{step.title}</h3>
                <p className="text-sm text-black/60 leading-relaxed">{step.description}</p>
                <div className="absolute top-4 right-4 text-xs font-mono text-black/20">{String(index + 1).padStart(2, '0')}</div>
              </div>
            </TransitionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// ABOUT SECTION
// ============================================
const AboutSection = () => {
  return (
    <section id="sobre" className="relative py-20 bg-white border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <TransitionReveal>
          <div className="mb-12">
            <div className="inline-block px-6 py-2 border border-black/10 rounded-full mb-4">
              <span className="text-xs tracking-[0.3em] text-black/40 uppercase font-medium">Capítulo V</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-black tracking-tight">A história da tomo</h2>
          </div>
        </TransitionReveal>

        <div className="max-w-3xl space-y-6 text-lg text-black/70 leading-relaxed font-medium">
          <TransitionReveal>
            <p>Somos a <strong className="text-black font-bold">Marta</strong> e o <strong className="text-black font-bold">Lucas</strong>, um casal que se conheceu na mesma turma de Tecnologia e Design Multimédia.</p>
            <p>Desde o início que partilhamos a mesma obsessão: perceber como a identidade visual pode fazer um negócio ser levado mais a sério e chegar mais longe.</p>
            <p>Trabalhámos com marcas locais e nacionais, mas reparámos numa coisa: em Viseu e em muito de Portugal, há negócios incríveis com identidades desatualizadas. E isso custa-lhes clientes e credibilidade.</p>
            <p className="text-xl text-black font-semibold pt-4">A tomo nasceu para mudar isso. Queremos ser o parceiro criativo que te ajuda a ter uma marca que te representa de verdade.</p>
          </TransitionReveal>
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
      setTimeout(() => setFormStatus('idle'), 4000);
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  return (
    <section id="contacto" className="relative py-20 bg-gray-50 border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <TransitionReveal>
          <div className="text-center mb-12">
            <div className="inline-block px-6 py-2 border border-black/10 rounded-full mb-4 bg-white shadow-sm">
              <span className="text-xs tracking-[0.3em] text-black/40 uppercase font-medium">Capítulo Final</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-black tracking-tight">Vamos criar algo juntos?</h2>
          </div>
        </TransitionReveal>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
          <TransitionReveal direction="left">
            <div className="space-y-8">
              <p className="text-base text-black/60">Quer seja uma marca nova ou um rebrand, estamos aqui para ajudar. Respondemos em menos de 24 horas.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-black/70 font-semibold">
                  <div className="w-10 h-10 rounded-xl bg-tomo-blue/10 text-tomo-blue flex items-center justify-center"><MapPin size={18} /></div>
                  <span>Viseu, Portugal (Presencial + Remoto)</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-black/70 font-semibold">
                  <div className="w-10 h-10 rounded-xl bg-tomo-pink/10 text-tomo-pink flex items-center justify-center"><Mail size={18} /></div>
                  <a href="mailto:tomostudiocontacto@gmail.com" className="hover:text-tomo-blue">tomostudiocontacto@gmail.com</a>
                </div>
              </div>
            </div>
          </TransitionReveal>

          <TransitionReveal direction="right">
            <form name="contacto" method="POST" data-netlify="true" onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="form-name" value="contacto" />
              <input type="text" name="name" required placeholder="Nome *" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-black focus:outline-none focus:border-tomo-blue text-sm transition-all" />
              <input type="email" name="email" required placeholder="Email *" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-black focus:outline-none focus:border-tomo-blue text-sm transition-all" />
              <textarea name="message" required rows={4} placeholder="Conta-nos sobre o teu negócio... *" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl text-black focus:outline-none focus:border-tomo-blue text-sm transition-all resize-none" />
              <button type="submit" disabled={formStatus === 'loading'} className="w-full py-4 text-white font-bold text-sm rounded-xl transition-all bg-gradient-to-r from-tomo-blue to-tomo-pink">
                {formStatus === 'idle' && 'Enviar mensagem'}
                {formStatus === 'loading' && 'A enviar...'}
                {formStatus === 'success' && 'Mensagem enviada com sucesso!'}
                {formStatus === 'error' && 'Erro ao enviar.'}
              </button>
            </form>
          </TransitionReveal>
        </div>
      </div>
    </section>
  );
};

// ============================================
// MAIN EXPORTED COMPONENT
// ============================================
export const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white w-full min-h-screen">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <WorksSection />
      <ProcessJourney />
      <AboutSection />
      <ContactSection />
    </div>
  );
};