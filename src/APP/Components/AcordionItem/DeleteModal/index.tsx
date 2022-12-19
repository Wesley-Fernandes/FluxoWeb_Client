import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

type ModalType ={
    show: boolean,
    setShow: any,
    _id: string,
    changer: any
}
export default function DeleteModal({show, setShow, _id, changer}:ModalType) {
 
    const token = localStorage.getItem('token')
    function Close(){
        setShow(false)
    }

    async function RemoveItem(){
        await axios.delete(`http://localhost:3020/item/${_id}`,{
            headers:{
                'Authorization': `Basic ${token}`
            }}).then((res)=>{
            toast.success('Tarefa deletado com sucesso!')
            changer()
            Close()
        })
    }

  return (
    <Modal show={show} onHide={Close}>
        <Modal.Header closeButton>
        <Modal.Title>Deletar tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você têm certeza que quer deletar a terefa?</Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={Close}>
            Cancelar
        </Button>
        <Button variant="danger" onClick={RemoveItem}>
            Deletar
        </Button>
        </Modal.Footer>
    </Modal>
  )
}
