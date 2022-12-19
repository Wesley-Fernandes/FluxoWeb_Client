import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {MdDashboard} from 'react-icons/md';
import {HiOutlinePlusSm} from 'react-icons/hi';
import { useNavigate  } from "react-router-dom";
import "./style.css"
import { toast } from 'react-toastify';



export default function NavbarComponent() {
  const navigate = useNavigate();


  const exit = () =>{
    localStorage.removeItem('token');
    toast.success(`Até mais ${username}`)
    localStorage.removeItem('username');
    navigate('/')
    
  }

  const username = localStorage.getItem('username');
  return (
    <header className='Top-header bg-primary'>
      <div className='Title'>
        <span>FLUXO</span>
      </div>
      <div className='NavButtons'>
        <ul>
          <li onClick={()=>{navigate('/dashboard')}}>Tarefas</li>
          <li onClick={()=>{navigate('/create')}}>Criar</li>
        </ul>
      </div>
      <div className='UserInfo'>
        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="imagem do usuario"/>
        <span className='username exit' onClick={exit}>{username}</span>
      </div>
    </header>
  )
}
