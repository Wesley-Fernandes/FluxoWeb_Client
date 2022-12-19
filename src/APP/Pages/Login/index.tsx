import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./style.css"
export default function Login() {
  const [password, setPassword] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const Navigate = useNavigate()

  function Logar(){
    axios.post('http://localhost:3020/auth/login', {
      email: email,
      password: password
    }).then((res)=>{
      console.log(res);
      
      localStorage.setItem('token', res.data.userData.token);
      localStorage.setItem('username', res.data.userData.name);
      const token = localStorage.getItem("token");
      toast.success('Bem vindo de volta '.concat(res.data.userData.name))
      Navigate('/dashboard');
      
      
    }).catch((error)=>{
      alert(error)
    })
  }


  
  return (
    <div className='LoginPage'>


      <div className='Left d-flex align-items-center justify-content-center'>
        <h1 className='animate__animated animate__fadeInLeft fluxo-logo'>Fluxo</h1>
        <p>Nós organizamos seu fluxo de trabalho.</p>
      </div>




        <div className='Right'>
          <h2 className="text-white mb-5">Fazer login</h2>
          <Form onSubmit={(e)=>{e.preventDefault()}}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className='text-white'>Meu email:</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{
              setEmail(e.target.value)
            }}/>
            <Form.Text className="text-muted text-white">
              Nunca iremos compartilhar seu e-mail com alguém!
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className='text-white'>Minha senha:</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e)=>{
              setPassword(e.target.value)
            }} />
          </Form.Group>


          <Form.Group className="mb-3 text-white" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Mantenha-me conectado." />
          </Form.Group>
          <Button variant="primary" type="submit" className='w-100' onClick={Logar}>
            Fazer login
          </Button>
          <hr className='text-white' />
          <Button variant="primary" type="submit" className='w-100 mt-4' onClick={()=>{
            Navigate('/register')
          }}>
            Criar uma nova conta
          </Button>
        </Form>
        </div>
    </div>
  )
}
