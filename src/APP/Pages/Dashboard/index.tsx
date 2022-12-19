import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NavbarComponent from '../../Components/Navbar'
import ItemBox from "../../Components/ItemBox"
import Accordion from 'react-bootstrap/Accordion';
import "./style.css"
import AccordionItem from '../../Components/AcordionItem'


type itemType = {
    name: string,
    created: string,
    until: string,
    description: string,
    image: string,
    unit: string,
    condominum: string,
    operator: string,
    _id: string,
    status: string,
}
export default function Dashboard({setPage}:any) {
    const [items, setItems] = useState<[]>([])
    const [nRender, setNRender] = useState<number>(0)
    function changer (){
        setNRender(prev=> prev+1)
    }



    useEffect(() => {
        const token = localStorage.getItem('token')
        async function getData(){
            await axios.get('http://localhost:3020/item',{
                headers: { 'Authorization': `Bearer ${token}`}
            }).then((res)=>{
                setItems(res.data)
            })
        }

        getData()

    }, [nRender])
 
  return (
    <div className='DashboardPage bg-light'>
        <NavbarComponent/>
        <main className='accordion' id="accordionExample">
        <Accordion defaultActiveKey="0" className='w-100'>
            {items?.map((item:itemType) =>  {
                return (<AccordionItem
                    description={item.description}
                    image={item.image}
                    name={item.name}
                    unit={item.unit}
                    condominum={item.condominum}
                    key={item._id}
                    created={item.created}
                    until={item.until}
                    operator={item.operator}
                    _id={item._id}
                    changer={changer}
                    status={item.status}
                
                />)
            })}
        </Accordion>
        </main>
    </div>
  )
}
