import {useEffect, useState} from 'react'
import Cliente from '../components/Cliente'

const Inicio = () => {
  
  const [clientes, setClientes] = useState([])
  
  useEffect(()=>{
    
    const obtenerClientesAPI = async()=>{
      try {
        const url = "http://localhost:4000/clientes"

      const resp = await fetch(url)
      const resultado = await resp.json()
      
      setClientes(resultado)
        
      } catch (error) {
        console.log(error)
      }

    }
    obtenerClientesAPI()
  }, [])

  const handleEliminar =async id =>{
    const confirmar = confirm("Deseas eliminar este cliente?")
    if(confirmar){
        try {
          const url = `http://localhost:4000/clientes/${id}`
          const resp = await fetch(url, {
            method: 'DELETE',
          
          })
          await resp.json()
          
          const arrayClientes = clientes.filter(cliente => cliente.id !== cliente.id)
          setClientes(arrayClientes)
          
        } catch (error) {
          console.log(error)
        }
    }
  }
  
  return (
    <>
      <h1 className="font-black text-blue-800 text-4xl text-center">Clientes</h1>
      <h2 className="mt-3 font-bold text-gray-800 text-center text-2xl">Administra tus clientes</h2>

      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Nombre</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Empresa</th>
              <th className="p-2">Acciones</th>
            </tr>
        </thead>

        <tbody>
          {clientes.map(cliente =>(
            <Cliente 
              key={cliente.id}
              cliente={cliente}
              handleEliminar={handleEliminar}
            />
          ))}

        </tbody>

      </table>




    </>

  )
}

export default Inicio