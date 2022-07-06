import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom' 

const VerCliente = () => {
  
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

        

    <div className="p-3 py-5 m-5">
         
        <h1 className="text-blue-800 text-4xl font-bold mb-5">Ver cliente: <span>{cliente.nombre}</span></h1>
        <p className="mb-5 text-gray-700 text-xl">Información del cliente</p>
        <p className="text-2xl"> <span className="text-gray-700 font-bold uppercase mt-4 ">Cliente: </span> {cliente.nombre}</p>
        <p className="text-2xl"> <span className="text-gray-700 font-bold uppercase mt-4 ">Empresa </span> {cliente.empresa}</p>
        <p className="text-2xl"> <span className="text-gray-700 font-bold uppercase mt-4 ">Email: </span> {cliente.email}</p>
        {cliente.telefono && 
        <p className="text-2xl"> <span className="text-gray-700 font-bold uppercase mt-4 ">Teléfono: </span> {cliente.telefono}</p>}
        {cliente.notas && 
        <p className="text-2xl"> <span className="text-gray-700 font-bold uppercase mt-4 ">Notas: </span> {cliente.notas}</p>}
    </div> 
  
  )
}

export default VerCliente