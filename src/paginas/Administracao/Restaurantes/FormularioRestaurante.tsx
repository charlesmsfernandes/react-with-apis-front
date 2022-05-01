import { Button, TextField } from '@mui/material'
import axios from 'axios';
import React, {useState} from 'react'

const FormularioRestaurante = () => {

  const [nomeRestaurante, setNomeRestaurante] = useState('');

  const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .post('http://localhost:8000/api/v2/restaurantes/', {
        nome: nomeRestaurante
      })
      .then(() => (
        alert('cadastrado')
      ))

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