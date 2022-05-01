import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useLayoutEffect(() => {
    axios
      .get('http://localhost:8000/api/v2/restaurantes/')
      .then(res => setRestaurantes(res.data))

  }, []);

  const excluir = (restauranteAhSerExcluido: IRestaurante) => {
    axios
      .delete(`http://localhost:8000/api/v2/restaurantes/${restauranteAhSerExcluido.id}/`)
      .then(() => {
        const listaRestaurantes = restaurantes.filter(restaurante => restaurante.id !== restauranteAhSerExcluido.id);
        setRestaurantes([...listaRestaurantes])
      })
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Editar
            </TableCell> 
            <TableCell>
              Excluir
            </TableCell>                        
          </TableRow>
        </TableHead>
        <TableBody>
          {
            restaurantes.map(restaurante => (
              <TableRow key={restaurante.id}>
                <TableCell>
                  {restaurante.nome}
                </TableCell>
                <TableCell>
                  [ <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link> ]
                </TableCell>
                <TableCell>
                  <Button
                    variant='outlined'
                    color='error'
                    onClick={() => excluir(restaurante)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>  
            ))
          }        
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdministracaoRestaurantes