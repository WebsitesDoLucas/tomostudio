import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="relative bg-tomo-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-tomo-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-chillax font-bold text-xl">t</span>
              </div>
              <span className="font-chillax font-bold text-xl">
                tomo <span className="font-inter font-normal text-sm opacity-60">studio</span>
              </span>
            </div>
            <p className="text-white/60 font-inter text-sm leading-relaxed">
              Parceiros na construção da tua identidade visual.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-inter font-semibold mb-4 text-sm uppercase tracking-wider">Navegação</h4>
            <ul className="space-y-2">
              {['Trabalhos', 'Serviços', 'Sobre', 'Contacto'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-white/60 hover:text-tomo-blue transition-colors font-inter text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-inter font-semibold mb-4 text-sm uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-white/60 font-inter">Viseu, Portugal</li>
              <li className="text-white/60 font-inter">ola@tomostudio.pt</li>
              <li className="text-white/40 font-inter text-xs italic">(em breve)</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 font-inter text-sm flex items-center gap-2">
            Feito com <Heart size={14} className="text-tomo-pink" fill="currentColor" /> pela tomo studio
          </p>
          <p className="text-white/40 font-inter text-sm">
            © 2025 tomo studio. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
