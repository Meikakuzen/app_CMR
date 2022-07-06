import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import Alerta from './Alerta'
import {useNavigate} from 'react-router-dom'



const Formulario = ({cliente}) => {

  const navigate = useNavigate()

const nuevoClienteSchema= Yup.object().shape({
  nombre: Yup.string()
              .min(3, "El nombre es muy corto")
              .max(20, "El nombre es muy largo")
              .required('El nombre es obligatorio'),
  empresa: Yup.string()
              .required("El campo es obligatorio"),
  email: Yup.string()
              .required("El email es obligatorio")
              .email("Debe de ser un email válido"),
  telefono: Yup.number()
                .integer()
                .positive()
                .typeError("El número no es válido")
  


})


const handleSubmit = async (valores) =>{
  try {
    let respuesta //la declaro aqui para que no me de undefined ya que hay dos en un scope diferente 
     
    if(cliente.id){ //para editar uso el método PUT
      const url = `http://localhost:4000/clientes/${cliente.id}`

       respuesta = await fetch(url,{
                      method: 'PUT',
                      body: JSON.stringify(valores),
                      headers: {
                        "Content-Type": "application/json"
                      }
      })
      
     }else {
      const url = 'http://localhost:4000/clientes'

       respuesta = await fetch(url,{
                      method: 'POST',
                      body: JSON.stringify(valores),
                      headers: {
                        "Content-Type": "application/json"
                      }
      })
      
     }
     const resultado = await respuesta.json()
     navigate('/clientes')
    
    } catch (error) {
    console.log(error)
  }
}

  return (
    <div className="md:w-3/4 mx-auto">
   
      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "", //si el valor de la izquierda existe lo asigna y si no el de la derecha
          empresa:cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas:cliente?.notas ?? ""

        }}
        enableReinitialize={true} //esto hace que  pinte cliente en el formulario cuando lo voy a editar
        onSubmit={async(values, {resetForm})=>{ 
            await handleSubmit(values)
            resetForm()
        }}
        validationSchema ={nuevoClienteSchema}
      >
        {({errors, touched})=>{
        
            return(
          
          <Form>
          <div className="mb-4">
              <label className="text-gray-800" htmlFor='nombre'>Nombre</label>
              <Field 
                type="text"
                className="mt-2 block w-full p-3 shadow"
                id="nombre"
                placeholder="Escribe tu nombre"
                name= "nombre"
                 />
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ): null}

          </div>
          <div className="mb-4">
              <label className="text-gray-800" htmlFor='empresa'>Empresa</label>
              <Field 
                type="text"
                className="mt-2 block w-full p-3 shadow"
                id="empresa"
                placeholder="Escribe la empresa del cliente"
                name="empresa"/>
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ): null}


          </div>
          <div className="mb-4">
              <label className="text-gray-800" htmlFor='email'>Email</label>
              <Field 
                type="email"
                className="mt-2 block w-full p-3 shadow"
                id="email"
                placeholder="Escribe el mail"
                name="email"/>

                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ): null}


          </div>
          <div className="mb-4">
              <label className="text-gray-800" htmlFor='telefono'>Teléfono</label>
              <Field 
                type="tel"
                className="mt-2 block w-full p-3 shadow"
                id="telefono"
                placeholder="Escribe el teléfono"
                name="telefono"/>

          </div>
          <div className="mb-4">
              <label className="text-gray-800" htmlFor='notas'>Notas</label>
              <Field 
                as="textarea"
                type="text"
                className="mt-2 block w-full p-3 shadow"
                id="telefono"
                placeholder="Escribe las notas"
                name="notas"/>

          </div>
          <input  
          type="submit" value={cliente?.nombre ? "Editar Cliente": "Agregar Cliente"} className="bg-blue-700 text-white w-full uppercase font-bold text-xl"/> 
        </Form>  //mostrar texto de forma condicional cuando edito o cuando agrego cliente
        )}}

        


      </Formik> 
   
    </div>
  )
}

Formulario.defaultProps ={
  cliente : {} //importante para que siga funcionando
}
export default Formulario