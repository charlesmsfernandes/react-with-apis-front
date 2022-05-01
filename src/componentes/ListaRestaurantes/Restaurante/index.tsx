import { useEffect, useState } from 'react';
import axios from 'axios';
import IRestaurante from '../../../interfaces/IRestaurante';
import Prato from '../Prato';
import IPrato from '../../../interfaces/IPrato';
import estilos from './Restaurante.module.scss';

interface RestauranteProps {
  restaurante: IRestaurante
}

const Restaurante = ({ restaurante }: RestauranteProps) => {
  console.log('restaurante id', restaurante.id)
  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    axios.get<IPrato[]>(`http://localhost:8000/api/v1/restaurantes/${restaurante.id}/pratos/`)
      .then(res => {
        console.log('res pratos =', res)
        setPratos(res.data)
      })
      .catch(err => {
        console.log('err =', err)
      })    
  }, [restaurante.id]);

  return (<section className={estilos.Restaurante}>
    <div className={estilos.Titulo}>
      <h2>{restaurante.nome}</h2>
    </div>
    <div>
      {pratos?.map(item => <Prato prato={item} key={item.id} />)}
    </div>
  </section>)
}

export default Restaurante