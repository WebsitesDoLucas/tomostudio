import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';

export const Home = () => {
  return (
    <div className="bg-white min-h-screen w-full flex flex-col justify-between text-black">
      <Navigation />
      
      <main className="max-w-[1400px] mx-auto px-6 py-40 text-center flex-grow flex flex-col items-center justify-center">
        <div className="inline-block px-6 py-2 border-2 border-black/10 rounded-full mb-8 bg-white shadow-sm">
          <span className="text-xs tracking-[0.3em] uppercase font-bold text-black/60">
            Teste de Isolamento Sem Imagens
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
          A Home está limpa.
        </h1>
        <p className="text-lg lg:text-xl text-black/80 font-medium max-w-2xl mx-auto leading-relaxed mb-8">
          Se este ecrã abrir instantaneamente no teu iPhone, as animações e o React Router estão inocentes, e o problema reside a 100% no peso ou carregamento das imagens originais.
        </p>
        <Link 
          to="/trabalhos"
          className="px-8 py-4 rounded-full text-white font-bold text-sm shadow-xl bg-[#020224]"
        >
          Ir para Trabalhos
        </Link>
      </main>

      <footer className="py-8 bg-black text-white text-center text-xs text-white/40">
        © tomo studio. Teste de Diagnóstico.
      </footer>
    </div>
  );
};