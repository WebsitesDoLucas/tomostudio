import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.webp';
import { Link } from 'react-router-dom';

const navItems = [
  { name: 'Trabalhos', href: '/trabalhos' }, 
  { name: 'Serviços', href: '/#servicos' },
  { name: 'Processo', href: '/Processo' }, 
  { name: 'Sobre', href: '/#sobre' }
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    // Permitir animações apenas após o primeiro render
    setCanAnimate(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // O atributo passive: true avisa o iOS que este scroll não vai bloquear a página
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        // style nativo garante o suporte total ao efeito vítreo no Safari móvel
        style={{
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 will-change-transform transform-gpu ${
          isScrolled ? 'bg-white/80 border-b border-black/5' : 'bg-transparent'
        }`}
        initial={false}
        animate={canAnimate ? { y: 0 } : undefined}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link to="/">
              <motion.div
                className="flex items-center"
                whileTap={{ scale: 0.98 }}
              >
                <img src={logo} alt="tomo studio" className="h-8" />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-black/60 hover:text-black transition-colors relative"
                  initial={false}
                  animate={canAnimate ? { opacity: 1, y: 0 } : undefined}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  {item.name}
                </motion.a>
              ))}
              
              {/* Botão de Call to Action Principal */}
              <motion.a
                href="/#contacto"
                className="px-6 py-2.5 bg-black text-white text-sm font-medium hover:bg-tomo-dark transition-colors rounded-full"
                whileTap={{ scale: 0.98 }}
              >
                Vamos falar
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-black hover:text-tomo-dark transition-colors z-50 relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white md:hidden transform-gpu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
          >
            <div className="flex flex-col items-start justify-center h-full px-12 space-y-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-4xl font-bold text-black hover:text-tomo-dark transition-colors tracking-tight"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.a
                href="/#contacto"
                className="px-8 py-4 bg-black text-white text-lg font-medium hover:bg-tomo-dark transition-colors rounded-full"
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.06 }}
                whileTap={{ scale: 0.95 }}
              >
                Vamos falar
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};