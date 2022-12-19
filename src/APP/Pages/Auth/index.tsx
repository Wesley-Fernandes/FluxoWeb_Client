import axios from 'axios';
import React, { Children, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Auth({children}:any) {
    const navigate = useNavigate()
    const [ loading, setLoading] = useState<boolean>(true)
    const [ autentication, setAutentication ] = useState<boolean>(false)
    const token = localStorage.getItem("token");

    useEffect(()=>{

        async function Verify(){
            await axios.post('http://localhost:3020/auth',{},{
                headers: { 'Authorization': `Basic ${token}`}
                }).then(async (res)=>{
                    setAutentication(res.data.token)
                    setLoading(false)
                }).catch((error)=>{
                    setAutentication(false)
                    setLoading(false)
                    
             })
        }

        Verify()
    }, [])

    if(loading){
        return (<div></div>)
    }

    if(!autentication){
        navigate('/')
    }

    return (children)
    

            
}
        


