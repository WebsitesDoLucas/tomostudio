import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// IMPORTS ESTÁTICOS (Páginas principais carregam instantaneamente sem esperar pela rede)
import { Home } from './components/Home';
import { Trabalhos } from './components/Trabalhos';

// IMPORTS LAZY (Apenas os projetos pesados secundários ficam em lazy)
const Poliempreende = lazy(() => import('./components/Poliempreende').then(module => ({ default: module.Poliempreende })));
const Aveimedica = lazy(() => import('./components/Aveimedica').then(module => ({ default: module.Aveimedica })));
const IDIPV = lazy(() => import('./components/IDIPV').then(module => ({ default: module.IDIPV })));
const Jazz = lazy(() => import('./components/Jazz').then(module => ({ default: module.Jazz })));
const Processo = lazy(() => import('./components/Processo').then(module => ({ default: module.Processo })));
const TomoStudio = lazy(() => import('./components/TomoStudio').then(module => ({ default: module.TomoStudio })));

const PageLoader = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-white">
    <div className="w-8 h-8 border-2 border-black/10 border-t-black rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Home e Trabalhos agora abrem sem delay de rede */}
          <Route path="/" element={<Home />} />
          <Route path="/trabalhos" element={<Trabalhos />} />
          
          {/* Projetos continuam protegidos e leves */}
          <Route path="/poliempreende" element={<Poliempreende />} />
          <Route path="/aveimedica" element={<Aveimedica />} />
          <Route path="/idipv" element={<IDIPV />} /> 
          <Route path="/jazz" element={<Jazz />} />
          <Route path="/tomostudio" element={<TomoStudio />} />
          <Route path="/Processo" element={<Processo />} /> 
          <Route path="/trabalhos/1" element={<Poliempreende />} />
          <Route path="/trabalhos/poliempreende" element={<Poliempreende />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;