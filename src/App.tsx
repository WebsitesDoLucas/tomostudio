import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 🌟 IMPORTS ESTÁTICOS REAIS: Sem lazy, sem chunks dinâmicos, adeus timeouts no Safari
import { Home } from './components/Home';
import { Trabalhos } from './components/Trabalhos';
import { Poliempreende } from './components/Poliempreende';
import { Aveimedica } from './components/Aveimedica';
import { IDIPV } from './components/IDIPV';
import { Jazz } from './components/Jazz';
import { Processo } from './components/Processo';
import { TomoStudio } from './components/TomoStudio';

function App() {
  return (
    <Router>
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
        
        {/* Redirecionamentos de rotas antigas */}
        <Route path="/trabalhos/1" element={<Poliempreende />} />
        <Route path="/trabalhos/poliempreende" element={<Poliempreende />} />
        
        {/* Fallback Catch-all */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;