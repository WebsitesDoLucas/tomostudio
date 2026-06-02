import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./components/Home').then(m => ({ default: m.Home })));
const Trabalhos = lazy(() => import('./components/Trabalhos').then(m => ({ default: m.Trabalhos })));
const Poliempreende = lazy(() => import('./components/Poliempreende').then(m => ({ default: m.Poliempreende })));
const Aveimedica = lazy(() => import('./components/Aveimedica').then(m => ({ default: m.Aveimedica })));
const IDIPV = lazy(() => import('./components/IDIPV').then(m => ({ default: m.IDIPV })));
const Jazz = lazy(() => import('./components/Jazz').then(m => ({ default: m.Jazz })));
const Processo = lazy(() => import('./components/Processo').then(m => ({ default: m.Processo })));
const TomoStudio = lazy(() => import('./components/TomoStudio').then(m => ({ default: m.TomoStudio })));

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
          <Route path="/" element={<Home />} />
          <Route path="/trabalhos" element={<Trabalhos />} />
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