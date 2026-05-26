import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Trabalhos } from './components/Trabalhos';
import { Poliempreende } from './components/Poliempreende';
import { Aveimedica } from './components/Aveimedica';
import { IDIPV } from './components/IDIPV';
import { Jazz } from './components/Jazz';
import { Processo } from './components/Processo';
// 1. O novo import do TomoStudio:
import { TomoStudio } from './components/TomoStudio';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />
        
        {/* Trabalhos List Page */}
        <Route path="/trabalhos" element={<Trabalhos />} />
        
        {/* Individual Project Pages */}
        <Route path="/poliempreende" element={<Poliempreende />} />
        <Route path="/aveimedica" element={<Aveimedica />} />
        <Route path="/idipv" element={<IDIPV />} /> 
        <Route path="/jazz" element={<Jazz />} />
        
        {/* 2. A Nova Rota do Tomo Studio! */}
        <Route path="/tomostudio" element={<TomoStudio />} />

        {/* Página do Processo Detalhado */}
        <Route path="/Processo" element={<Processo />} /> 
        
        {/* Mantive as tuas rotas antigas caso ainda as estejas a usar noutros links */}
        <Route path="/trabalhos/1" element={<Poliempreende />} />
        <Route path="/trabalhos/poliempreende" element={<Poliempreende />} />
        
        {/* Catch all - redireciona para a home se a página não existir */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;