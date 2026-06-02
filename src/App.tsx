import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// IMPORTS ESTÁTICOS (Todas as páginas carregam no bundle inicial)
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
        <Route path="/" element={<Home />} />
        <Route path="/trabalhos" element={<Trabalhos />} />
        
        {/* Projetos agora abrem instantaneamente sem o "PageLoader" */}
        <Route path="/poliempreende" element={<Poliempreende />} />
        <Route path="/aveimedica" element={<Aveimedica />} />
        <Route path="/idipv" element={<IDIPV />} /> 
        <Route path="/jazz" element={<Jazz />} />
        <Route path="/tomostudio" element={<TomoStudio />} />
        <Route path="/Processo" element={<Processo />} /> 
        <Route path="/trabalhos/1" element={<Poliempreende />} />
        <Route path="/trabalhos/poliempreende" element={<Poliempreende />} />
        
        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;