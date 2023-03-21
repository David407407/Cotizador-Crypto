import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import Error from './Error'
import { monedas } from '../data/monedas'

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    display: block;
    font-family: 'Lato', sans-serif;
    color: #fff;
    font-weight: 700;
    width: 100%;
    padding: 10px;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    cursor: pointer;

    &:hover {
        background-color: #7a7dfe;
    }
`

const Formulario = ({setMonedas}) => {

  const [criptos, setCriptos] = useState([])
  const [error, setError] = useState(false)
  const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas)
  const [ criptomoneda, SelectCriptomonedas ] = useSelectMonedas('Elige tu Criptomoneda', criptos)

  useEffect( () => {
    const consultarAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      const arrayCripto = resultado.Data.map( cripto => {
        const objeto = {
          nombre : cripto.CoinInfo.FullName,
          id : cripto.CoinInfo.Name
        }
        return objeto
      })
      setCriptos(arrayCripto);
    }
    consultarAPI()

  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    
    if([moneda, criptomoneda].includes('')) {
      setError(true)
      return;
    }
    setError(false)
    setMonedas({moneda, criptomoneda})
  }

  return (

    <>
      {error === true && <Error><p>Todos los Campos son Obligatorios</p></Error>}
      <form
        onSubmit={e => handleSubmit(e)}
      >
          <SelectMonedas/>
          <SelectCriptomonedas/>
          <InputSubmit 
              type="submit" 
              value={'Cotizar'} 
          />
      </form>
    </>
  )
}

export default Formulario