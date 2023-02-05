import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faStar } from '@fortawesome/free-solid-svg-icons'

import React from 'react'
import Card from 'react-bootstrap/Card';

export const Nota = ({note,handleFavorite}) => {
    // console.log('note->',note)
    const {
        id,
        titulo,
        descripcion,
        nota,
        withpassword,
        password,
        fecha,
        favorita
    } = note;

  return (
    
    <Card style={{ width: '18rem', marginTop:'10px' }}>
        <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{descripcion}</Card.Subtitle>
        <Card.Text>
            <p style={{fontSize:"10px"}}>{id}</p>
            <Card className='p-2'>
                <code>{nota}</code>
            </Card>
        </Card.Text>
        <Card.Link style={{fontSize:"8px"}}>{fecha.toString()}</Card.Link>
        <Card.Link onClick={()=>handleFavorite(note)}> <FontAwesomeIcon style={{color:favorita ? "yellow" : ""}} icon={faStar} /></Card.Link>
        </Card.Body>
    </Card>
  )
}
