import imagem from "./assets/img/help_workers.svg"
import "./404.css"

const Pagina404 = () => {
  return (
    <main className='container flex flex--centro flex--coluna'>
      <img className='imagem' src={imagem} alt="Ilustração de solicitação de ajuda" />
      <p className='naoencontrado-texto'>Ops, Essa página não existe!</p>
    </main>
  )
}

export default Pagina404