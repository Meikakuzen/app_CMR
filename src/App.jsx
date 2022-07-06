import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './Layout/Layout'
import EditarCliente from './Paginas/EditarCliente'
import Inicio from './Paginas/Inicio'
import NuevoCliente from './Paginas/NuevoCliente'
import VerCliente from './Paginas/VerCliente'

function App() {
 

  return (
      <BrowserRouter>
        <Routes>
            
            <Route path="/clientes" element={<Layout />}>
                  <Route index element={<Inicio />} />
                  <Route path="/clientes/nuevo" element={<NuevoCliente />} />
                  <Route path="editar/:id" element={<EditarCliente />} />
                  <Route path=":id" element={<VerCliente/>} />
            </Route>

        </Routes>
      
      </BrowserRouter>
  )
}

export default App
