import React, { useEffect } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

type InputType ={
    type: string,
    place: string,
    changer: any
}



export default function InputText({type, place, changer}:InputType) {
  return (
        <FloatingLabel className='m-2' controlId="floatingPassword" label={place}>
            <Form.Control type={type} placeholder={place} onChange={(e)=>{changer(e.target.value)}}/>
        </FloatingLabel>
  )
}
