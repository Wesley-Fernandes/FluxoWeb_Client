import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import InputText from '../../InputText';

type ModalType ={
    _id: string,
    show: boolean,
    setShow: any,
    changer: any
}
export default function UpdateModal({show, setShow, _id, changer}:ModalType) {
    const [ newName, setNewName] = useState<string>()
    const [ unit, setUnit] = useState<string>()
    const [ condominum, setCondominum] = useState<any>()
    const [ about, setAbout] = useState<string>()
    const [ all_condominums, setAll_condominums] = useState<[]|null>([])
    const token = localStorage.getItem('token')

    useEffect(()=>{
        axios.get('http://localhost:3020/condominum').then((res)=>{
            setAll_condominums(res.data)

        }).catch((error)=>{
            console.log(error);
            
        })
    }, [])

    function Close(){
        setShow(false)
    }

    async function Update(){
        if(!newName && !unit && !condominum && !about ){
            toast.error('"Você precisa especificar ao menos um campo para ser atualizado."')
            return
        }else{
            await axios.patch(`http://localhost:3020/item/${_id}`, {
                "name": newName,
                "description": about,
                "unit": unit,
                "condominum": condominum
            },{
                headers:{
                    'Authorization': `Basic ${token}`
                }
            }
                ).then(()=>{
                toast.success('Tarefa atualizada com sucesso!')
                changer()
                Close();
            }).catch((error)=>{
                toast.error('Houve um erro' + error)
            })
        }
    }


    
  return (
    <Modal show={show} onHide={Close}>
        <Modal.Header closeButton>
        <Modal.Title>Atualizar tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="input-group d-flex flex-wrap mb-1">
            <input type="text" className="form-control m-1 w-100
            rounded" placeholder="name" aria-label="Username" aria-describedby="basic-addon1" onChange={(e)=>{
                setNewName(e.target.value)
            }}/>

            <input type="text" className="form-control m-1 w-100
            rounded" placeholder="Unidade" aria-label="Username" aria-describedby="basic-addon1"
            onChange={(e)=>{
                setUnit(e.target.value)
            }}
            />

            
            <select className="form-select w-100 m-1 rounded" aria-label="Default select example" onChange={(e)=>{
                setCondominum(e.target.value)
            }} >
                {
                    all_condominums?.map((cond)=>{
                        return <option key={cond} value={cond}>{cond}</option>
                    })
                }
            </select>
            <textarea className="form-control m-1 rounded w-100" id="exampleFormControlTextarea1" placeholder="Escreva uma nova descrição pra tarefa aqui." rows={5} onChange={(e)=>{
                setAbout(e.target.value)
            }}></textarea>

        </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={Close}>
            Fechar
        </Button>
        <Button variant="primary" onClick={Update}>
            Atualizar tarefas
        </Button>
        </Modal.Footer>
    </Modal>
  )
}
