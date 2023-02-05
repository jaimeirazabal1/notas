import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



export const CrearNota = ({show,handleClose,handleCreate,setNota,nota}) => {
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState(false); 


    const handleChange = (e) => {
        
        setNota({
            ...nota,
            [e.target.name] : e.target.value
        })
    }

    const handleCheck = () => {
      setChecked(!checked);
      setNota({
        ...nota,
        withpassword : !checked
      })
    }
    
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Form onSubmit={
                    handleCreate
                }>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Título</Form.Label>
                    <Form.Control type="text" name="titulo" value={nota.titulo} onChange={handleChange} placeholder="Título" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" name="descripcion" value={nota.descripcion} onChange={handleChange} placeholder="Descripción" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Nota</Form.Label>
                    <ReactQuill theme="snow" preserveWhitespace={true} name="nota" value={nota.nota} placeholder="Nota..."  onChange={(e)=>setNota({...nota,nota:e}) } />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" name="withpassword" checked={checked}  value={checked} onChange={handleCheck} label="Usar contraseña" />
                    {
                      checked && <input type="password" name="password" value={nota.password} onChange={handleChange} className="form-control" placeholder="Introduce la contraseña"/>
                    }
                    </Form.Group>
                    <Button variant="primary" type="submit">
                    Crear
                    </Button>
                </Form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

  )
}
