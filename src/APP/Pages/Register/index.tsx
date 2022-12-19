import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import './style.css'

export default function index() {
  const [image_url, setImage_url] = useState("")
  const Navigate = useNavigate()
  const image_error = 'https://www.kibrispdr.org/data/862/user-profile-png-22.png'
  return (
      <div className='LoginPage'>


      <div className='Left d-flex align-items-center justify-content-center'>
        <h1 className='fluxo-logo'>Fluxo</h1>
        <p>Nós organizamos seu fluxo de trabalho.</p>
      </div>





      <div className='Right'>
        <h1 className="text-white mb-5">Registrar</h1>
        <Form onSubmit={(e)=>{e.preventDefault()}}>
          <div className='w-100 d-flex justify-content-center'>
            <div  className='user-icon mb-3'>
              <img src={image_url||image_error} alt="Imagem do perfil" />
            </div>
          </div>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className='text-white'>URL DA IMAGEM:</Form.Label>
            <Form.Control type="text" placeholder="Url da imagem."
            onChange={(e)=>{setImage_url(e.target.value)}}/>
          </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className='text-white'>Meu email:</Form.Label>
          <Form.Control type="email" placeholder="Enter email" 
          />
          <Form.Text className="text-muted text-white">
            Nunca iremos compartilhar seu e-mail com alguém!
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className='text-white'>Minha senha:</Form.Label>
          <Form.Control type="password" placeholder="Password"/>
        </Form.Group>

        <Form.Group className="mb-5" controlId="formBasicPassword">
          <Form.Label className='text-white'>Redigite sua senha:</Form.Label>
          <Form.Control type="password" placeholder="Password"/>
        </Form.Group>



        <Button variant="primary" type="submit" className='w-100'>
          Criar a conta
        </Button>
        <hr className='text-white' />
        <Button variant="primary" type="submit" className='w-100 mt-4' onClick={()=>{Navigate('/')}}>
          Já tenho uma conta
        </Button>
      </Form>
      </div>
    </div>
  )
}
