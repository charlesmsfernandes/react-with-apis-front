import { Routes, Route } from 'react-router-dom';
import Pagina404 from './paginas/404/Pagina404';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="*" element={<Pagina404 />} />
    </Routes>
  );
}

export default App;
