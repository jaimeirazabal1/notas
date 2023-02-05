import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faStar } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';

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
       
            <span style={{fontSize:"10px"}}>{id}</span>
            <Card className='p-2' style={{maxHeight:"60px",textOverflow: 'ellipsis',overflow:'ellipsis'}} dangerouslySetInnerHTML={{__html: nota}}></Card>
      
        <Card.Link style={{fontSize:"8px"}}>{moment(fecha).fromNow()}</Card.Link>
        <Card.Link className="favorite" title="Marcar como favorita" onClick={()=>handleFavorite(note)}> <FontAwesomeIcon style={{color:favorita ? "yellow" : ""}} icon={faStar} /></Card.Link>
        </Card.Body>
    </Card>
  )
}
