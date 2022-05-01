import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import http from '../../../http';
import IRestaurante from '../../../interfaces/IRestaurante';

const FormularioRestaurante = () => {

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      http
        .get<IRestaurante>(`restaurantes/${params.id}/`)
        .then(res => setNomeRestaurante(res.data.nome))
    }
  }, [params])

  const [nomeRestaurante, setNomeRestaurante] = useState('');

  const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(params.id) {
      http
      .put(`restaurantes/${params.id}/`, {
        nome: nomeRestaurante
      })
      .then(() => (
        alert('Atualizado')
      ))      
    } else {
      http
        .post('restaurantes/', {
          nome: nomeRestaurante
        })
        .then(() => (
          alert('cadastrado')
        ))      
    }

  }

  return (
    <Box sx={{
      display:'flex',
      flexDirection:"column",
      alignItems:"center"
    }}>
      <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
      <Box component="form" onSubmit={aoSubmeterForm}>
        <TextField 
          label="Nome do Restaurante"
          variant="standard"
          fullWidth
          required
          value={nomeRestaurante}
          onChange={event => setNomeRestaurante(event?.target.value)}
        />
        <Button
          fullWidth
          sx={{ marginTop: 1 }}
          type='submit'
          variant="outlined"
        >
          Salvar
        </Button>
      </Box>      
    </Box>
  )
}

export default FormularioRestaurante