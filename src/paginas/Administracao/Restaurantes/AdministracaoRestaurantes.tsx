import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { useLayoutEffect, useState } from 'react'
import IRestaurante from '../../../interfaces/IRestaurante';

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useLayoutEffect(() => {
    axios
      .get('http://localhost:8000/api/v2/restaurantes/')
      .then(res => setRestaurantes(res.data))

  }, [])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
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
              </TableRow>  
            ))
          }        
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdministracaoRestaurantes