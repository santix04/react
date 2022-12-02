import React from 'react'
import {Label, GrupoInput, Input, LeyendaError, IconoValidacion } from '../Formulario/Formulario-styled'


const ComponenteInput = ({estado, cambiarEstado, tipo, name, leyendaError,expresionRegular, label, placeholder, funcion }) => {
  const onChange = (e) => {
    cambiarEstado({...estado, campo: e.target.value});
  }

  const validacion = () => {
    if(expresionRegular){
      if(expresionRegular.test(estado.campo)){
        cambiarEstado({...estado, valido: 'true'})
      }else{
        cambiarEstado({...estado, valido: 'false'})
      }
    }
    if(funcion){
      funcion()
    }
  }

  return (
      <div>
        <Label htmlFor={name} valido={estado.valido}>{label}</Label>
        <GrupoInput>
          <Input
          type={tipo}
          placeholder={placeholder}
          id={name}
          value={estado.campo}
          onChange={onChange}
          onKeyUp={validacion}
          onBlur={validacion}
          valido={estado.valido}
          />
          <IconoValidacion valido={estado.valido} />
        </GrupoInput>
        <LeyendaError valido={estado.valido}>{leyendaError}</LeyendaError>
      </div>
  )
}

export default ComponenteInput