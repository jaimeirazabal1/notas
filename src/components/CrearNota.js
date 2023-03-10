import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import hljs from 'highlight.js';

hljs.configure({
  // optionally configure hljs
  languages: ["javascript", "python", "c", "c++", "java", "HTML", "css", "matlab"],
});

export const CrearNota = ({show,handleClose,handleCreate,setNota,nota}) => {
  const [checked, setChecked] = useState(false); 
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
  
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    [{ indent: "-1" }, { indent: "+1" }],
  
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
  
    [{ align: [] }],
  ];
  const modules = {
    // syntax: {
    //   highlight: function (text) {
    //     return hljs.highlightAuto(text).value;
    //   },
    // },
    toolbar: toolbarOptions,
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
    const formats = [
      "header",
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "code-block",
      "list",
      "bullet",
      "indent",
      "link",
      "align",
    ];
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
                    <Form.Label>T??tulo</Form.Label>
                    <Form.Control type="text" name="titulo" value={nota.titulo} onChange={handleChange} placeholder="T??tulo" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Descripci??n</Form.Label>
                    <Form.Control type="text" name="descripcion" value={nota.descripcion} onChange={handleChange} placeholder="Descripci??n" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Nota</Form.Label>
                    <ReactQuill theme="snow" modules={modules} formats={formats} preserveWhitespace={true} name="notadescripcion" value={nota.notadescripcion} placeholder="Nota..."  onChange={(e)=>{console.log(e);setNota({...nota,notadescripcion:e}) }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" name="withpassword" checked={checked}  value={checked} onChange={handleCheck} label="Usar contrase??a" />
                    {
                      checked && <input type="password" name="password" value={nota.password} onChange={handleChange} className="form-control" placeholder="Introduce la contrase??a"/>
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
