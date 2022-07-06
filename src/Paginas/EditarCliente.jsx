import Formulario from "../components/Formulario"
import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom' 

const EditarCliente = () => {

    
  const {id} = useParams()
  const [cliente, setCliente] =useState({})
  
  
  useEffect(()=>{
  
    const obtenerClienteAPI = async() =>{
        try {
        const url = `http://localhost:4000/clientes/${id}`
        const resp = await fetch(url)
        const result= await resp.json()
        setCliente(result)
        
          } catch (error) {
            
        }
        
    }
    obtenerClienteAPI()

  }, [])
  return (
    <>
    <h1 className="font-black text-4xl text-blue-800 p-10 text-center">Editar Cliente</h1>
    <h3 className= "text-center font-bold text-gray-700">Utiliza este formulario para editar datos de un cliente</h3>
    
    {cliente?.nombre ? //si el id existe muestra el formulario si no cliente id no válido
    <Formulario cliente={cliente}/> : <p>Cliente ID no válido</p> } 
    
    </>
  )
}

export default EditarCliente