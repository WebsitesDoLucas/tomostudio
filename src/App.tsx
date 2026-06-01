import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// IMPORTS LAZY (Todas as páginas passam a chunks independentes para aliviar o arranque no Safari)
const Home = lazy(() => import('./components/Home').then(module => ({ default: module.Home })));
const Trabalhos = lazy(() => import('./components/Trabalhos').then(module => ({ default: module.Trabalhos })));
const Poliempreende = lazy(() => import('./components/Poliempreende').then(module => ({ default: module.Poliempreende })));
const Aveimedica = lazy(() => import('./components/Aveimedica').then(module => ({ default: module.Aveimedica })));
const IDIPV = lazy(() => import('./components/IDIPV').then(module => ({ default: module.IDIPV })));
const Jazz = lazy(() => import('./components/Jazz').then(module => ({ default: module.Jazz })));
const Processo = lazy(() => import('./components/Processo').then(module => ({ default: module.Processo })));
const TomoStudio = lazy(() => import('./components/TomoStudio').then(module => ({ default: module.TomoStudio })));

// Loader elegante, leve e acelerado por hardware para transições fluidas no iOS
const PageLoader = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-white will-change-contents">
    <div className="w-8 h-8 border-2 border-black/10 border-t-black rounded-full animate-spin transform-gpu"></div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Rotas Principais */}
          <Route path="/" element={<Home />} />
          <Route path="/trabalhos" element={<Trabalhos />} />
          <Route path="/Processo" element={<Processo />} /> 
          
          {/* Projetos Individuais */}
          <Route path="/poliempreende" element={<Poliempreende />} />
          <Route path="/aveimedica" element={<Aveimedica />} />
          <Route path="/idipv" element={<IDIPV />} /> 
          <Route path="/jazz" element={<Jazz />} />
          <Route path="/tomostudio" element={<TomoStudio />} />
          
          {/* Fallbacks e Redirecionamentos de rotas antigas */}
          <Route path="/trabalhos/1" element={<Poliempreende />} />
          <Route path="/trabalhos/poliempreende" element={<Poliempreende />} />
          
          {/* 404 / Catch-all */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;