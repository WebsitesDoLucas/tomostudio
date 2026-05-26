import { motion } from 'framer-motion';
import { Heart, Instagram } from 'lucide-react';
import LogoCompleto from '../assets/LogoCompleto.webp';

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
          {/* Brand com Logo */}
          <div className="lg:col-span-2">
            <img src={LogoCompleto} alt="Tomo Studio" className="h-10 mb-4 brightness-0 invert" />
            <p className="text-white/60 leading-relaxed text-sm max-w-md mb-6">
              Estúdio de design em Viseu dedicado a criar identidades visuais que elevam marcas.
            </p>
            <motion.a
              href="https://www.instagram.com/tomostudio.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 inline-flex items-center justify-center hover:bg-[#0055FF] transition-colors"
              whileHover={{ y: -2 }}
            >
              <Instagram size={18} />
            </motion.a>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] mb-4 text-white/40">
              Navegação
            </h4>
            <ul className="space-y-3">
              {navLinks.map(item => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] mb-4 text-white/40">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>Viseu, Portugal</li>
              <li>tomostudiocontacto@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} tomo studio
          </p>
          <p className="text-xs text-white/40 flex items-center gap-2">
            Feito com <Heart size={10} className="inline" fill="currentColor" /> em Viseu
          </p>
        </div>
      </div>
    </footer>
  );
};