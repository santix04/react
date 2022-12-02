import React, {useState} from 'react'
import './Formulario.css'
import {Formulario, ContenedorBoton, Boton, MensajeError } from './Formulario-styled'
import Input from '../Input/Input';
import {FaExclamationTriangle} from "react-icons/fa";
import { useCartContext } from '../Context/CartContext'
import { collection, getFirestore, addDoc } from 'firebase/firestore'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';





const FormularioCliente = () => {
  const [nombre, setNombre] = useState({campo: '', valido: null})
  const [apellido, setApellido] = useState({campo: '', valido: null})
  const [domicilio, setDomicilio] = useState({campo: '', valido: null})
  const [correo, setCorreo] = useState({campo: '', valido: null})
  const [correo2, setCorreo2] = useState({campo: '', valido: null})
  const [telefono, setTelefono] = useState({campo: '', valido: null})
  const [formularioValido, setFormularioValido] = useState(null)

  const expresiones = {
		nombre: /^[a-zA-ZÀ-ÿ\s]{4,20}$/,
    domicilio: /^[a-zA-ZÀ-ÿ0-9\s]{4,40}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		telefono: /^\d{7,14}$/
	}

  const { cart, totalPrice, clearCart } = useCartContext();
  const navigate = useNavigate();

  const validarCorreo = () => {
    if(correo.campo.length > 0){
      if(correo.campo !== correo2.campo){
        setCorreo2((prevState) => {
            return {...prevState, valido: 'false'}
        });
      }else {
        setCorreo2((prevState) => {
            return {...prevState, valido: 'true'}
      });
    }
  }
}

    const onSubmit = (e) => {
      e.preventDefault();

      if(
        nombre.valido === 'true' &&
        apellido.valido === 'true' &&
        correo.valido === 'true' &&
        correo2.valido === 'true' &&
        telefono.valido === 'true'
      ){
        const db = getFirestore();
        const orderColletion = collection(db, 'orders');
        addDoc(orderColletion, {
          Buyer: {
            lastName: (apellido.campo),
            email: (correo.campo),
            name: (nombre.campo),
            phone: (telefono.campo),
            address: (domicilio.campo)
          },
          items: cart.map(product => ({id: product.id, title: product.title, price: product.price, cantidad: product.cantidad })),
          total: totalPrice(),
        })
        .then( ({ id })  => {
          const swalText = nombre.campo + ' Tu orden fue realizada, tu numero de orden es: ' + id + '       Muchas gracias por tu compra';
          Swal.fire(swalText)
            .then(() => {
              navigate('/');
            })
        });
        setFormularioValido(true);
        setNombre({campo: '', valido: null});
        setApellido({campo: '', valido: null});
        setCorreo({campo: '', valido: null});
        setCorreo2({campo: '', valido: null});
        setTelefono({campo: '', valido: null});
        setDomicilio({campo: '', valido: null});
        clearCart()
      } else {
        setFormularioValido(false);
  }
}

  return (
    <main>
        <Formulario action='' onSubmit={onSubmit}>
          <Input
            estado={nombre}
            cambiarEstado={setNombre}
            tipo="text"
            label="Nombre"
            placeholder="Roberto"
            name="nombre"
            leyendaError="El nombre solo puede contener letras y espacios y un minimo de 4 y maximo de 20 caracteres."
            expresionRegular={expresiones.nombre}
          />
          <Input
            estado={apellido}
            cambiarEstado={setApellido}
            tipo="text"
            label="Apellido"
            placeholder="Perez"
            name="apellido"
            leyendaError="El apellido solo puede contener letras y espacios y un minimo de 4 y maximo de 20 caracteres."
            expresionRegular={expresiones.nombre}
          />
          <Input
            estado={correo}
            cambiarEstado={setCorreo}
            tipo="email"
            label="Correo"
            placeholder="correo@correo.com"
            name="correo"
            leyendaError="El correo solo puede contener letras, numeros, puntos, guiones y guion bajo."
            expresionRegular={expresiones.correo}
          />
          <Input
            estado={correo2}
            cambiarEstado={setCorreo2}
            tipo="email"
            label="Verificar Correo"
            placeholder="correo@correo.com"
            name="correo2"
            leyendaError="Ambos correos deben ser iguales."
            funcion={validarCorreo}
          />
          <Input
            estado={telefono}
            cambiarEstado={setTelefono}
            tipo="text"
            label="Telefono"
            placeholder="1165892355"
            name="telefono"
            leyendaError="El telefono solo puede contener numeros y el maximo son 14 dígitos."
            expresionRegular={expresiones.telefono}
          />
          <Input
            estado={domicilio}
            cambiarEstado={setDomicilio}
            tipo="text"
            label="Domicilio"
            placeholder="Calle falsa 123"
            name="domicilio"
            leyendaError="El domicilio solo puede contener letras, numeros y espacios y un minimo de 4 y maximo de 20 caracteres."
            expresionRegular={expresiones.domicilio}
          />
          {formularioValido === false && <MensajeError>
            <p>
              <FaExclamationTriangle />
              <b> Error:</b> Por favor rellena el formulario correctamente.
            </p>
          </MensajeError> }
          <ContenedorBoton>
                <Boton type='submit'>Enviar</Boton>
          </ContenedorBoton>
        </Formulario>
    </main>
  )
}

export default FormularioCliente
