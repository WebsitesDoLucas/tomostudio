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

// 🌟 HOOK UTILITÁRIO DECLARADO NO TOPO: Agora o TransitionReveal já o consegue ver!
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
// TRANSITION REVEAL (Otimizado para Carregamento Instantâneo no iOS)
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