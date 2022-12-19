import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import InputText from '../../Components/InputText'
import NavbarComponent from '../../Components/Navbar'
import { toast } from "react-toastify";
import "./style.css"
export default function Create({setPage}:any) {
  const [ title, setTitle] = useState()
  const [ end, setEnd] = useState()
  const [ description, setDescription] = useState<string>("")
  const [ unit, setUnit] = useState<string>("")
  const [ Conds, setConds] = useState<any>()
  const [ selectedCond, setSelectedCond ] = useState<any>()
  const token = localStorage.getItem('token')

  type itemType = {
    name: string,
    description: string,
    condominum: string,
    unit: string,
    created: string,
    until: any,
    operator: string,
    status: string

  }
  useEffect(()=>{
    axios.get('http://localhost:3020/condominum').then((res)=>{
      setConds(res.data)
    })
  }, [])

  async function handler(){
    async function makeTimeDate(){
      const newDate = new Date();
      const day = newDate.getDate()
      const mouth = newDate.getMonth();
      const year = newDate.getFullYear();
      return `${year}-${mouth}-${day}`;
  
    }


    const full_time_data = await makeTimeDate();
    
    if(!title || !description || !selectedCond){
      console.log("Preencha todos os campos!");
      return
    }

    const item: itemType =({
      name: title,
      description: description,
      unit: unit||"condominio",
      created: full_time_data,
      until: end||"NoData",
      condominum: selectedCond,
      operator: "Wesley Fernandes",
      status: "incompleto"
    })

    await axios.post('http://localhost:3020/item', item, {
      headers:{ 'Authorization': `Bearer ${token}`}
    }).then((res)=>{
      toast.success('Tarefa criada com sucesso!')
    }).catch((res)=>{
      toast.success('Houve um erro: '.concat(res))
    })

    

  }

  return (
    <div className='CreatePage'>
        <NavbarComponent/>
            <main>
              <form onSubmit={(e)=>{
                e.preventDefault()
              }} className='Form--Create'>
                <h1 className='m-2'>Criar uma tarefa</h1>
                <p className='m-2'>Clique para editar um campo!</p>


                <hr className='m-2'></hr>
                <InputText changer={setTitle} place="Nome da tarefa" type='text' />

                <Form.Select
                  className='m-2'
                  placeholder='Selecione o condominio'
                  aria-label="Default select example"
                  style={{"width": "98%", "alignSelf": "center", "height": "60px"}}
                  onChange={((e)=>{setSelectedCond(e.target.value)})}
                  >
                    <option selected>Selecione um condominio</option>
                    {Conds?.map((cond:string)=>{
                      return <option key={cond} value={cond}>{cond}</option>
                    })}
                </Form.Select>

                
                <InputText changer={setEnd} type='date' place='Definir data para termino'/>

                <InputText changer={setUnit} place="Unidade no condominio" type='textarea'/>

                <InputText changer={setDescription} place="Descrição da tarefa" type='textarea'/>


                <Button onClick={handler} className='m-2'>Criar novo item</Button>
              </form>
            </main>
    </div>
  )
}
