import React from 'react'

const Alerta = ({children}) => {
  return (
    <div className="bg-red-800 text-white font-bold w-full">{children}</div>
  )
}

export default Alerta