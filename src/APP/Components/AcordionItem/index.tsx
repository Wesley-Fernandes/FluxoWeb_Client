import axios from 'axios';
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { toast } from 'react-toastify';
import DeleteModal from './DeleteModal';
import "./style.css"
import UpdateModal from './UpdateModal';

type itemType = {
    name: string,
    description: string,
    image: string,
    unit: string,
    condominum: string,
    operator: string,
    _id: string,
    changer: ()=>void,
    created: string,
    until: string|undefined,
    status: string
  }

export default function AccordionItem({name, description, image, unit, condominum, operator, _id, changer, created, until, status}: itemType) {
    const token = localStorage.getItem('token');
    const [upd, setUpd] = useState(false)
    
    const [del, setDel] = useState(false)

    async function makeComplete() {
      await axios.patch(`http://localhost:3020/item/${_id}`, {status:true},{
        headers:{
            'Authorization': `Basic ${token}`
        }}).then((res)=>{
          toast.success(`A tarefa '${name}' foi completada!`)
        changer()
      })
    }

    function cutData(dats:string|undefined){
      if(dats==undefined ||dats==null||dats==""){
        return
      }
      const cuts = dats.split('-')
      const day = cuts[2].padStart(2, '0')
      const mouth = cuts[1].padStart(2, '0')
      const year = cuts[0]
      
      return `${day}/${mouth}/${year}`
    }

    async function makeUncomplete(action:string) {
      await axios.patch(`http://localhost:3020/item/${_id}`, {status:action},{
        headers:{
            'Authorization': `Basic ${token}`
        }}).then((res)=>{
          if(action==='incompleto'){
            toast.success(`A tarefa '${name}' marcada como imcopleta!`)
            changer()
          }else{
            toast.success(`A tarefa '${name}' marcada como completada!`)
            changer()
          }
      }).catch((error)=>{
        console.log(error);
        
      })
    }

  return (
    <Accordion defaultActiveKey="0" className="w-100">
      <DeleteModal setShow={setDel} show={del} _id={_id} changer={changer}/>
      <UpdateModal _id={_id} setShow={setUpd} show={upd} changer={changer}/>
      


      <Accordion.Item eventKey={_id}>
        <Accordion.Header>
          <div className="info-tags">
            {status=="completo"?(
              <span className="status border bg-success text-wrap"></span>
            ):(
              <span className="status border bg-danger text-wrap"></span>
            )}
            <span className="tag bg-primary text-white text-wrap">
              {condominum}
            </span>
            <span className="tag bg-primary text-white text-wrap">{unit}</span>
          </div>
          {name}
        </Accordion.Header>
        <Accordion.Body>
          <strong>{operator}: </strong>
          {description}
          <hr />
          <div className="detail-item d-flex">
            <div className="info w-50 d-flex wrap justify-content-start flex-column">
              <span className="opacity-50 text-black ms-4">
                Criado em {cutData(created)}.
              </span>
              {until!="NoData" &&(
                <span className="opacity-50 text-black ms-4">
                  Até o dia {cutData(until)}.
                </span>
              )}
            </div>
            <div className="actions w-50 d-flex justify-content-end">
              {status==="incompleto" ?(
                <Button className="m-1" variant="secondary" onClick={()=>makeUncomplete("completo")}>
                  Completar
                </Button>
              ):(
                <Button className="m-1" variant="secondary" onClick={()=>makeUncomplete("incompleto")}>
                  Descompletar
                </Button>
              )}

              <Button
                className="m-1"
                variant="secondary"
                onClick={() => {
                  setUpd(true);
                }}
              >
                Atualizar
              </Button>
              <Button
                className="m-1"
                variant="secondary"
                onClick={() => {
                  setDel(true);
                }}
              >
                Deletar
              </Button>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
