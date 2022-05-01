import { Routes, Route } from 'react-router-dom';
import Pagina404 from './paginas/404/Pagina404';
import Home from './paginas/Home';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes/AdministracaoRestaurantes'
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import FormularioRestaurante from './paginas/Administracao/Restaurantes/FormularioRestaurante';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<AdministracaoRestaurantes />} />
      <Route path="/admin/restaurantes/novo" element={<FormularioRestaurante />} />
      <Route path="/admin/restaurantes/:id" element={<FormularioRestaurante />} />
      <Route path="*" element={<Pagina404 />} />
    </Routes>
  );
}

export default App;
