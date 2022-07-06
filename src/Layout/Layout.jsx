import {Outlet, Link, useLocation} from 'react-router-dom'

const Layout = () => {

    const location = useLocation()

    const urlActual= location.pathname
    console.log(urlActual)

  return (
    <div className="md:flex  md:min-h-screen">

        <div className="md:w-1/4 bg-blue-900 px-5 py-10 text-center">
            <h2 className=" text-white font-bold text-4xl">CRM-CLIENTES</h2>
            <nav className="mt-10">
                <Link to="/clientes" className={`${urlActual === '/clientes'? 'text-blue-300': 'text-white'} text-white text-2xl block mt-2`}>Clientes</Link>
                <Link to="/clientes/nuevo"  className="text-white text-2xl block mt-2">Nuevo Cliente</Link>
            </nav>
        </div>

        <div className="md:w-3/4">
            <Outlet />
            
        </div>
        

    </div>
  )
}

export default Layout