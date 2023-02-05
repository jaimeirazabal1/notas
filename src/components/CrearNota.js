import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export const CrearNota = ({show,handleClose,handleCreate,setNota,nota}) => {

    const handleChange = (e) => {
        setNota({
            ...nota,
            [e.target.name] : e.target.value
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
                    <Form.Control as="textarea" name="nota" value={nota.nota} onChange={handleChange} placeholder="Nota..." />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" name="withpassword" checked={nota.withpassword} onChange={handleChange} label="Usar contraseña" />
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
