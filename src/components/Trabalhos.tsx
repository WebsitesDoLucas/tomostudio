import { 
  motion, 
  useScroll, 
  useSpring, 
  AnimatePresence,
  useMotionValue
} from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Sparkles, Filter } from 'lucide-react';
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation'; 

// ============================================
// IMPORTAÇÃO DE ASSETS
// ============================================
import imgAvellon from '../assets/thumbs/avellon.webp';
import imgForma from '../assets/thumbs/forma.webp';
import imgBloomly from '../assets/thumbs/bloomly.webp';
import imgNorthfox from '../assets/thumbs/northfox.webp';
import imgOrbital from '../assets/thumbs/orbitalspace.webp';
import imgKaya from '../assets/thumbs/kaya.webp';
import imgStacked from '../assets/thumbs/stacked.webp';
import imgArco from '../assets/thumbs/arco.webp';

import imgPoliempreende from '../assets/thumbs/poliempreende.webp';
import imgAveimedica from '../assets/thumbs/aveimedica.webp';
import imgIdipv from '../assets/thumbs/idipv.webp';
import imgSobfoco from '../assets/thumbs/sobfoco.webp';
import imgJazz from '../assets/thumbs/jazz.webp';
import imgTomostudio from '../assets/thumbs/tomostudio.webp';
import imgPuppyyoga from '../assets/thumbs/puppyyoga.webp';

// ============================================
// TYPES & INTERFACES
// ============================================
interface Project {
  id: number;
  title: string;
  client: string;
  year: string;
  category: string;
  tags: string[];
  color: 'blue' | 'pink';
  description: string;
  featured?: boolean;
  image?: string;
  path: string;
}

interface FilterBarProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

// ============================================
// MOCK DATA
// ============================================
const projects: Project[] = [
  {
    id: 1,
    title: 'PoliEmpreende',
    client: 'Instituto Politécnico de Viseu',
    year: '2024',
    category: 'Rebrand',
    tags: ['Rebrand', 'Social Media'],
    color: 'blue',
    description: 'Identidade visual completa para o concurso nacional de empreendedorismo.',
    featured: true,
    image: imgPoliempreende,
    path: '/poliempreende' 
  },
  {
    id: 2,
    title: 'Aveimédica',
    client: 'Centro Médico',
    year: '2024',
    category: 'Rebrand',
    tags: ['Rebrand', 'Social Media'],
    color: 'pink',
    description: 'Renovação estratégica da identidade para centro médico.',
    featured: true,
    image: imgAveimedica,
    path: '/aveimedica' 
  },
  {
    id: 3,
    title: 'IDIPV',
    client: 'IDIPV',
    year: '2024',
    category: 'Social Media',
    tags: ['Branding', 'Social Media'],
    color: 'blue',
    description: 'Sistema visual completo para instituto.',
    image: imgIdipv,
    path: '/idipv' 
  },
  {
    id: 4,
    title: 'Sobfoco',
    client: 'Sobfoco',
    year: '2024',
    category: 'Website',
    tags: ['Website', 'UI/UX'],
    color: 'blue',
    description: 'Design e desenvolvimento de website corporativo.',
    image: imgSobfoco, 
    path: 'https://sobfoco.com' 
  },
  {
    id: 5,
    title: 'Concerto Jazz',
    client: 'Concerto Jazz',
    year: '2023',
    category: 'Branding',
    tags: ['Branding', 'Identidade Visual'],
    color: 'pink',
    description: 'Um festival de cor e ritmo em Oxford Street.',
    image: imgJazz,
    path: '/jazz'
  },
  {
    id: 6,
    title: 'TomoStudio',
    client: 'tomostudio',
    year: '2024',
    category: 'Branding',
    tags: ['Branding', 'Identidade Visual'],
    color: 'blue',
    description: 'O nosso próprio branding e brandbook completo, demonstrando o sistema de marca e diretrizes.',
    image: imgTomostudio,
    path: '/tomostudio' 
  },
  {
    id: 7,
    title: 'Puppy Yoga',
    client: 'Puppy Yoga',
    year: '2026',
    category: 'Website',
    tags: ['Website', 'UI/UX'],
    color: 'pink',
    description: 'Design e desenvolvimento de plataforma digital intuitiva e envolvente para sessões de Puppy Yoga.',
    image: imgPuppyyoga, 
    path: 'https://puppyyoga.netlify.app/' 
  },
];

const logofolio = [
  { id: 1, client: 'Avellon', img: imgAvellon },
  { id: 2, client: 'forma', img: imgForma },
  { id: 3, client: 'bloomly', img: imgBloomly },
  { id: 4, client: 'Northfox', img: imgNorthfox },
  { id: 5, client: 'Orbital Space', img: imgOrbital },
  { id: 6, client: 'kaya', img: imgKaya },
  { id: 7, client: 'Stacked Sandwich Club', img: imgStacked },
  { id: 8, client: 'arco', img: imgArco },
];

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

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: position.x, y: position.y }}
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
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-tomo-blue via-tomo-pink to-tomo-blue origin-left z-50 pointer-events-none transform-gpu"
      style={{ scaleX }}
    />
  );
};

// ============================================
// FLOATING IMAGE PREVIEW
// ============================================
const FloatingImagePreview = ({ project, mousePosition }: { project: Project | null; mousePosition: { x: number; y: number } }) => {
  if (!project) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-50 hidden lg:block transform-gpu"
      style={{
        left: mousePosition.x + 40,
        top: mousePosition.y - 200,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 30,
        mass: 0.8
      }}
    >
      <div className="relative w-[420px] rounded-3xl">
        <motion.div 
          className={`relative bg-gradient-to-br ${
            project.color === 'blue' 
              ? 'from-tomo-blue/5 via-white to-tomo-blue/10' 
              : 'from-tomo-pink/5 via-white to-tomo-pink/10'
          } p-8 rounded-3xl shadow-2xl border border-black/5`}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: 'spring',
            stiffness: 300,
            damping: 25,
            delay: 0.05
          }}
        >
          <motion.div 
            className="relative aspect-[4/3] bg-white rounded-2xl mb-6 p-8 flex items-center justify-center shadow-sm overflow-hidden"
          >
            <motion.img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-contain"
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
                delay: 0.1
              }}
            />
            <div className={`absolute inset-0 rounded-2xl ${
              project.color === 'blue'
                ? 'shadow-inner shadow-tomo-blue/10'
                : 'shadow-inner shadow-tomo-pink/10'
            }`} />
          </motion.div>

          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-bold text-black tracking-tight">
                {project.title}
              </h4>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                project.color === 'blue' 
                  ? 'bg-tomo-blue/10 text-tomo-blue' 
                  : 'bg-tomo-pink/10 text-tomo-pink'
              }`}>
                {project.year}
              </span>
            </div>
            
            <p className="text-sm text-black/60 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.slice(0, 3).map((tag, i) => (
                <motion.span 
                  key={tag}
                  className="text-xs px-3 py-1 bg-white/60 backdrop-blur-sm border border-black/10 text-black/60 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + (i * 0.05) }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl ${
              project.color === 'blue' ? 'bg-tomo-blue/20' : 'bg-tomo-pink/20'
            }`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

// ============================================
// PROJECT ROW (Animação Original com Performance Pró)
// ============================================
const ProjectRow = ({ project, index, onHover }: { 
  project: Project; 
  index: number; 
  onHover: (project: Project | null) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(project);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover(null);
  };

  const isExternalLink = project.path.startsWith('http');

  const content = (
    <motion.div
      className="group relative border-t border-black/5 py-8 cursor-pointer block will-change-transform transform-gpu"
      // Mantemos a animação original de entrada por scroll com as tuas curvas de agência cúbicas
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.04,
        ease: [0.21, 0.45, 0.27, 0.9]
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* O efeito original de revelação de fundo pelo centro (scaleX) mantido intacto */}
      <motion.div
        className={`absolute inset-0 -mx-6 lg:-mx-12 ${
          project.color === 'blue' ? 'bg-tomo-blue/5' : 'bg-tomo-pink/5'
        }`}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scaleX: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        style={{ originX: 0 }}
      />

      <div className="relative grid grid-cols-12 gap-4 lg:gap-8 items-center z-10">
        <motion.div 
          className="col-span-1 text-right"
          animate={{ x: isHovered ? 8 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className={`text-sm font-bold transition-colors ${
            isHovered 
              ? project.color === 'blue' ? 'text-tomo-blue' : 'text-tomo-pink'
              : 'text-black/20'
          }`}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </motion.div>

        <motion.div 
          className="col-span-11 lg:col-span-4"
          animate={{ x: isHovered ? 8 : 0 }}
          transition={{ duration: 0.4, delay: 0.02 }}
        >
          <div className="flex items-center gap-3">
            <h3 className="text-2xl lg:text-3xl font-bold text-black tracking-tight group-hover:text-tomo-dark transition-colors">
              {project.title}
            </h3>
            {project.featured && (
              <motion.span
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <Sparkles className={project.color === 'blue' ? 'text-tomo-blue' : 'text-tomo-pink'} size={16} />
              </motion.span>
            )}
          </div>
          <p className="text-sm text-black/50 mt-1">{project.client}</p>
        </motion.div>

        <motion.div 
          className="hidden lg:block lg:col-span-3"
          animate={{ x: isHovered ? 8 : 0 }}
          transition={{ duration: 0.4, delay: 0.04 }}
        >
          <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full transition-all ${
            isHovered
              ? project.color === 'blue' 
                ? 'bg-tomo-blue/10 text-tomo-blue' 
                : 'bg-tomo-pink/10 text-tomo-pink'
              : 'bg-black/5 text-black/60'
          }`}>
            {project.category}
          </span>
        </motion.div>

        <motion.div 
          className="hidden lg:flex lg:col-span-3 gap-2"
          animate={{
            x: isHovered ? 8 : 0,
            opacity: isHovered ? 1 : 0.6,
          }}
          transition={{ duration: 0.4, delay: 0.06 }}
        >
          {project.tags.slice(0, 2).map((tag) => (
            <span 
              key={tag}
              className="text-xs text-black/40 border border-black/10 px-2 py-1 rounded-full bg-white/50"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 2 && (
            <span className="text-xs text-black/40">+{project.tags.length - 2}</span>
          )}
        </motion.div>

        <motion.div 
          className="hidden lg:flex lg:col-span-1 justify-end"
          animate={{
            x: isHovered ? 12 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.4, delay: 0.08 }}
        >
          <ArrowUpRight 
            className={project.color === 'blue' ? 'text-tomo-blue' : 'text-tomo-pink'} 
            size={20} 
          />
        </motion.div>
      </div>

      <motion.div 
        className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2"
        animate={{
          x: isHovered ? 4 : 0,
          opacity: isHovered ? 1 : 0.3,
        }}
        transition={{ duration: 0.4 }}
      >
        <ArrowUpRight 
          className={project.color === 'blue' ? 'text-tomo-blue' : 'text-tomo-pink'} 
          size={20} 
        />
      </motion.div>
    </motion.div>
  );

  if (isExternalLink) {
    return (
      <a href={project.path} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return (
    <Link to={project.path} className="block">
      {content}
    </Link>
  );
};

// ============================================
// FILTER BAR
// ============================================
const FilterBar = ({ activeFilter, setActiveFilter }: FilterBarProps) => {
  const filters = ['Todos', 'Branding', 'Rebrand', 'Website', 'Social Media'];

  return (
    <motion.div
      className="flex items-center md:justify-center gap-3 mb-16 overflow-x-auto py-4 px-1 scrollbar-hide will-change-transform transform-gpu"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="hidden md:flex items-center gap-2 text-sm text-black/40 whitespace-nowrap mr-2">
        <Filter size={14}/> Filtrar:
      </div>
      {filters.map((filter) => (
        <motion.button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-5 py-2.5 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-300 ${
            activeFilter === filter
              ? 'bg-gradient-to-r from-tomo-blue to-tomo-pink text-white shadow-lg shadow-tomo-blue/20'
              : 'bg-white border border-black/10 text-black/60 hover:border-tomo-blue hover:text-tomo-blue shadow-sm'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {filter}
        </motion.button>
      ))}
    </motion.div>
  );
};

// ============================================
// HERO SECTION
// ============================================
const HeroSection = () => {
  return (
    <section className="relative pt-40 pb-20 flex flex-col items-center text-center overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
        }}
      >
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-70">
          <div className="absolute w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] bg-tomo-blue/15 rounded-full blur-[120px] -translate-x-1/4 -translate-y-12" />
          <div className="absolute w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-tomo-pink/15 rounded-full blur-[120px] translate-x-1/4 -translate-y-12" />
        </div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center z-10 w-full transform-gpu">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-black/50 hover:text-black transition-all px-5 py-2.5 rounded-full border border-black/5 bg-white/60 backdrop-blur-md shadow-sm">
            <ArrowLeft size={16} />
            Voltar à home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="w-full flex flex-col items-center"
        >
          {/* text-5xl fixo para mobile impede cortes laterais do texto em ecrãs pequenos */}
          <h1 className="text-5xl sm:text-7xl lg:text-[6rem] font-black text-black leading-tight tracking-tight mb-6 drop-shadow-sm">
            O nosso trabalho<span className="text-tomo-blue">.</span>
          </h1>
          <p className="text-lg md:text-xl text-black/60 leading-relaxed max-w-2xl mx-auto font-medium">
            Onde as ideias ganham vida.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// LOGOFOLIO SECTION
// ============================================
const LogofolioSection = () => {
  return (
    <motion.div 
      className="mt-32 mb-16 pt-20 border-t border-black/5 will-change-transform transform-gpu"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="text-center mb-12">
        <h3 className="text-3xl lg:text-4xl font-black text-black mb-4 tracking-tight">
          Galeria de identidades
        </h3>
        <p className="text-black/40 max-w-xl mx-auto text-sm sm:text-base font-medium">
          Uma amostra de outros sistemas visuais criados por nós para dar vida a novas ideias.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {logofolio.map((logo, i) => (
          <motion.div
            key={logo.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="aspect-[4/3] bg-gray-50/70 rounded-2xl flex items-center justify-center p-6 sm:p-8 border border-black/5 cursor-pointer transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-black/5 active:scale-98 transform-gpu"
            title={logo.client}
          >
            <img 
              src={logo.img} 
              alt={logo.client} 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain mix-blend-multiply opacity-80 hover:opacity-100 transition-opacity duration-300" 
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};



// ============================================
// MAIN COMPONENT
// ============================================
export const Trabalhos = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFilter, setActiveFilter] = useState('Todos');

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'Todos') return true;
    const searchTerm = activeFilter.toLowerCase();
    return project.category.toLowerCase().includes(searchTerm) || 
           project.tags.some(tag => tag.toLowerCase().includes(searchTerm));
  });

  return (
    <div className="bg-white min-h-screen overflow-x-hidden w-full selection:bg-tomo-blue selection:text-white">
      <Navigation />
      <ScrollProgress />
      <HeroSection />
      
      <section className="relative pb-20 z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          
          <div className="relative min-h-[500px] will-change-transform transform-gpu">
            {/* Removemos o layout das linhas para o Safari não recalcular geometrias no clique */}
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <ProjectRow 
                    project={project} 
                    index={index}
                    onHover={setHoveredProject}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <div className="py-12 text-center text-black/40 text-sm">
                Nenhum projeto encontrado nesta categoria.
              </div>
            )}
          </div>

          <AnimatePresence>
            {hoveredProject && (
              <FloatingImagePreview 
                project={hoveredProject} 
                mousePosition={mousePosition}
              />
            )}
          </AnimatePresence>

          <LogofolioSection />


          <div className="border-t border-black/5 mt-8" />

          <div className="mt-24 sm:mt-32 text-center px-4 will-change-transform transform-gpu">
            <h3 className="text-3xl sm:text-5xl font-black text-black mb-6 tracking-tight">
              Pronto para o teu capítulo?
            </h3>
            <p className="text-lg text-black/60 mb-8 max-w-2xl mx-auto font-medium">
              Cada projeto começa com uma conversa. Conta-nos a história da tua marca.
            </p>
            
            <a href="/#contacto">
              <button className="px-8 py-4 bg-gradient-to-r from-tomo-blue to-tomo-pink text-white font-bold text-sm rounded-full shadow-lg active:scale-95 transition-transform duration-200">
                Começar o teu projeto
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};