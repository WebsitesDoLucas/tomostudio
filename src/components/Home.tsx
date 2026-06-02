import { 
  motion, 
  useSpring, 
  useMotionValue,
  useTransform
} from 'framer-motion';

import { ArrowRight, Heart } from 'lucide-react';
import { useRef, useEffect } from 'react';

// 🌟 REMOVEMOS O IMPORT DA NAVIGATION E DO CURSOR PARA VER SE É DAÍ O BLOQUEIO

export const Home = () => {
  const containerRef = useRef<HTMLElement>(null);
  const tomoNavy = "#020224";
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const xLogo = useTransform(mouseXSpring, [-0.5, 0.5], ["-30px", "30px"]);
  const yLogo = useTransform(mouseYSpring, [-0.5, 0.5], ["-30px", "30px"]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white w-full min-h-screen flex flex-col justify-between text-black">
      {/* 🌟 SEM MENU NENHUM AQUI PARA ISOLAR O ERRO */}
      
      <section 
        ref={containerRef} 
        id="intro"
        className="relative h-screen min-h-[600px] w-full bg-white flex flex-col items-center justify-center px-6 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full blur-[100px] opacity-20 bg-[#0099FF]" />
          <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full blur-[100px] opacity-10 bg-[#020224]" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center transform-gpu">
          <div className="mb-4 md:mb-6">
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase opacity-40" style={{ color: tomoNavy }}>
              Estúdio de Design & Estratégia
            </span>
          </div>

          <div className="flex flex-col items-center leading-[0.85]">
            <div className="overflow-hidden p-2">
              <h1 className="text-[14vw] lg:text-[11vw] font-black tracking-tighter" style={{ color: tomoNavy }}>
                CRIAMOS
              </h1>
            </div>

            <div className="overflow-hidden flex items-center justify-center gap-2 md:gap-6 mt-[-2vw] lg:mt-[-1.5vw] p-2 pr-6">
              <h1 className="text-[14vw] lg:text-[11vw] font-black tracking-tighter" style={{ color: tomoNavy }}>
                CONTIGO
              </h1>

              <motion.div 
                style={{ x: xLogo, y: yLogo }} 
                className="relative w-[14vw] h-[14vw] md:w-[10vw] md:h-[10vw] lg:w-[9vw] lg:h-[9vw] mb-[2vw] border-4 rounded-2xl bg-[#020224] flex items-center justify-center shadow-2xl animate-pulse"
              >
                <span className="text-[2.5vw] lg:text-[1.5vw] font-black text-white tracking-tighter">TOMO</span>
              </motion.div>
            </div>
          </div>

          <div className="mt-4 animate-fade-in">
            <p className="text-lg md:text-xl font-medium italic opacity-60" style={{ color: tomoNavy }}>
              não apenas para ti
            </p>
          </div>

          <div className="mt-8">
            <a 
              href="#contacto"
              className="group flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-sm shadow-xl bg-[#020224]"
            >
              Iniciar Projeto
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      <footer className="py-6 bg-black text-white text-center text-xs text-white/40">
        © tomo studio. Teste de Isolamento do Menu.
      </footer>
    </div>
  );
};