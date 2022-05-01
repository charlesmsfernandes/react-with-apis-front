import axios, { AxiosRequestConfig } from 'axios';
import { useLayoutEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

// esses são os possíveis parâmetros que podemos enviar para a API
interface IParametrosBusca {
  ordering?: string
  search?: string
}

const ListaRestaurantes = () => {

  /*
    Funcionamento da páginação: A Api já manda os dados com o tamanho certo
    e manda a url para pegar a próxima listagem de dados caso ela exista e 
    salva isso no estado de proximaPagina, exemplo:
    {
      next: "http://localhost:8000/api/v1/restaurantes/?page=2"
      previous: null      
    }
    existe a próxima página e não existe a anterior
    então eu salvo a url do next no estado proximaPagina e o estado de anterior
    recebe null

    Depois que estou na página 2 é feita uma nova chamada a api e com isso 
    os estados mudam, exemplo:
    {
      next: null
      previous: "http://localhost:8000/api/v1/restaurantes/"      
    }
    Com isso não temos uma 3 página e o estado de proximaPagina muda para null
    e o estado de paginaAnterior passa a ser http://localhost:8000/api/v1/restaurantes/
  */

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');
  const [paginaAnterior, setPaginaAnterior] = useState('');
  const [busca, setBusca] = useState('');
  const [ordenacao, setOrdenacao] = useState('')

  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    axios.get<IPaginacao<IRestaurante>>(url, opcoes)
      .then(resposta => {
        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
        setPaginaAnterior(resposta.data.previous)
      })
      .catch(erro => {
        console.log(erro)
      })
  }

  // a cada busca, montamos um objeto de opções
  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const opcoes = {
      params: {

      } as IParametrosBusca
    }
    if (busca) {
      opcoes.params.search = busca
    }
    if (ordenacao) {
      opcoes.params.ordering = ordenacao
    }    
    carregarDados('http://localhost:8000/api/v1/restaurantes/', opcoes)
  }  

  useLayoutEffect(() => {
    // obter restaurantes
    carregarDados('http://localhost:8000/api/v1/restaurantes/')
  }, []);

  //Mudamos a páginação
  // const verMais = () => {
  //   axios.get<IPaginacao<IRestaurante>>(proximaPagina)
  //     .then(res => {
  //       console.log('res restaurante paginação =', res)
  //       setRestaurantes([...restaurantes, ...res.data.results])
  //       setProximaPagina(res.data.next)
  //     })
  //     .catch(err => {
  //       console.log('err =', err)
  //     })    
  // }

  return (
    <section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    <form onSubmit={buscar}>
      <div>
        <input type="text" value={busca} onChange={evento => setBusca(evento.target.value)} />
      </div>
      <div>
        <label htmlFor="select-ordenacao">Ordenação</label>
        <select
          name="select-ordenacao"
          id="select-ordenacao"
          value={ordenacao}
          onChange={evento => setOrdenacao(evento.target.value)}
        >
          <option value="">Padrão</option>
          <option value="id">Por ID</option>
          <option value="nome">Por Nome</option>
        </select>
      </div>      
      <div>
        <button type='submit'>buscar</button>
      </div>
    </form>    
    {
      restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)
    }
    {/* 
      Mudamos a pṕaginação
      {
        proximaPagina && <button onClick={verMais}>ver mais</button>
    } */}
    {
      <button
        onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>
        Página Anterior
      </button>}
    {
      <button
        onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>
        Próxima página
      </button>}    
  </section>)
}

export default ListaRestaurantes