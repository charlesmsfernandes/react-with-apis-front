import { Routes, Route } from 'react-router-dom';
import Pagina404 from './paginas/404/Pagina404';
import Home from './paginas/Home';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes/AdministracaoRestaurantes'
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import FormularioRestaurante from './paginas/Administracao/Restaurantes/FormularioRestaurante';
import PaginaBaseAdmin from './paginas/Administracao/PaginaBaseAdmin';

function App() {

  return (
    <Routes>
      <Route path='/admin' element={<PaginaBaseAdmin />}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />        
      </Route>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="*" element={<Pagina404 />} />
    </Routes>
  );
}

export default App;
