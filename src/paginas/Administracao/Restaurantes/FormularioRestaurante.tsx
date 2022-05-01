import { Button, TextField } from '@mui/material'
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import IRestaurante from '../../../interfaces/IRestaurante';

const FormularioRestaurante = () => {

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      axios
        .get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${params.id}/`)
        .then(res => setNomeRestaurante(res.data.nome))
    }
  }, [params])

  const [nomeRestaurante, setNomeRestaurante] = useState('');

  const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(params.id) {
      axios
      .put(`http://localhost:8000/api/v2/restaurantes/${params.id}/`, {
        nome: nomeRestaurante
      })
      .then(() => (
        alert('Atualizado')
      ))      
    } else {
      axios
        .post('http://localhost:8000/api/v2/restaurantes/', {
          nome: nomeRestaurante
        })
        .then(() => (
          alert('cadastrado')
        ))      
    }

  }

  return (
    <form onSubmit={aoSubmeterForm}>
      <TextField 
        label="Nome do Restaurante"
        variant="standard"
        value={nomeRestaurante}
        onChange={event => setNomeRestaurante(event?.target.value)}
      />
      <Button type='submit' variant="outlined">Salvar</Button>
    </form>
  )
}

export default FormularioRestaurante