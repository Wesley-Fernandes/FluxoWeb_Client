import React from 'react'
import "./style.css"

type itemType = {
  name: string,
  created: string,
  description: string,
  image: string,
  unit: string,
  condominum: string,
  operator: string,
  _id: string,
}
export default function ItemBox({name, created, description, image, unit, condominum, operator}: itemType) {
  return (                
    <div className='Item rounded border shadow'>
      <div className='Item--header bg-dark'>
        <span className='block bg-secondary'>{condominum}</span>
        <span className='block bg-secondary'>{unit}</span>
        <span className='fullblock title'>{name}</span>
        <span className='block'>Status</span>
      </div>
      <div className='Item--body'>
        <p className='bg-light text-black'>
          {description}
        </p>
      </div>
      <div className='Item--footer bg-dark'>
        <span className='block bg-secondary'>Desde: {created}</span>
        <span className='block bg-secondary'>Criador: {operator}</span>
      </div>
    </div>
  )
}
