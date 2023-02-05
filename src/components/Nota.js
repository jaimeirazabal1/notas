import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faStar, faTrash } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';

import React from 'react'
import Card from 'react-bootstrap/Card';

export const Nota = ({note,handleFavorite,handleDelete,handleShowNote}) => {
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
    
    <Card style={{ width: '100%', boxShadow:"1px 10px 5px", minHeight:"211px", maxHeight:"211px", marginTop:'10px',borderColor:favorita ? "10px solid #FEDE00" : "intherit" }}>
        <Card.Body>
        <div className="card-header bg-transparent border-bottom-0 text-right">
          <button data-dismiss="alert" data-target="#closeablecard" onClick={()=>handleDelete(note)} type="button" className="close btn delete_note" aria-label="Close">
            <FontAwesomeIcon icon={faTrash} style={{color:"#D10000"}} />
          </button>
          <Card.Link className="favorite favorite_note btn" title="Marcar como favorita" onClick={()=>handleFavorite(note)}> <FontAwesomeIcon style={{color:favorita ? "#FEDE00" : ""}} icon={faStar} /></Card.Link>
        </div>
        <Card.Title>{titulo}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{descripcion}</Card.Subtitle>
            <span style={{fontSize:"10px"}}>{id}</span>
            <Card onClick={()=>handleShowNote(note)} className='p-2 note_div' style={{maxHeight:"60px",textOverflow: 'ellipsis',overflow:'ellipsis'}} dangerouslySetInnerHTML={{__html: nota}}></Card>
        <Card.Link className="note_date" style={{fontSize:"8px"}}>{moment(fecha).fromNow()}</Card.Link>
        </Card.Body>
    </Card>
  )
}
