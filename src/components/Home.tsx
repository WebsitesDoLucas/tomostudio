import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue
} from 'framer-motion';

import { ArrowRight, Heart } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { Navigation } from './Navigation';

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
    <div className="bg-white w-full min-h-screen flex flex-col justify-between">
      <Navigation />
      
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
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
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

              {/* ⚡ LOGO SUBSTITUÍDO POR VETOR CSS ULTRA-LEVE PARA TESTE */}
              <motion.div 
                style={{ x: xLogo, y: yLogo }} 
                className="relative w-[14vw] h-[14vw] md:w-[10vw] md:h-[10vw] lg:w-[9vw] lg:h-[9vw] mb-[2vw] border-4 rounded-2xl bg-[#020224] flex items-center justify-center shadow-2xl"
                initial={{ scale: 0, rotate: -90, opacity: 0 }}
                animate={{ scale: 0.9, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", duration: 1.2, delay: 0.1 }}
              >
                <span className="text-[2.5vw] lg:text-[1.5vw] font-black text-white tracking-tighter">TOMO</span>
              </motion.div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <p className="mt-4 text-lg md:text-xl font-medium italic opacity-60" style={{ color: tomoNavy }}>
              não apenas para ti
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4, duration: 0.6 }} 
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

      <footer className="py-6 bg-black text-white text-center text-xs text-white/40">
        © {new Date().getFullYear()} tomo studio. Feito com <Heart size={10} className="inline text-white" fill="currentColor" /> em Viseu.
      </footer>
    </div>
  );
};