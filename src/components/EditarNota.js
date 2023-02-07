import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import hljs from 'highlight.js';
import { AES, enc } from 'crypto-js';
import Swal from 'sweetalert2';

hljs.configure({
  // optionally configure hljs
  languages: ["javascript", "python", "c", "c++", "java", "HTML", "css", "matlab"],
});

export const EditarNota = ({show,handleClose,handleUpdate,setNota,nota}) => {
  
    const [checked, setChecked] = useState(nota.withpassword ?? false);
    const [passwordSetted, setPasswordSetted] = useState(false);
    const [password, setPassword] = useState(false);
  
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
    const handleDesbloquear = () => {
        try {
            
            let bytes;
            // console.log('nota.notadescripcion',nota.notadescripcion,'password',password)
            bytes = AES.decrypt(nota.notadescripcion, password);
            const decrypted = bytes.toString(enc.Utf8);
            if(decrypted){
    
                setPasswordSetted(true)
                // console.log('decrypted',decrypted)
                setNota({
                    ...nota,
                    notadescripcion:decrypted
                })
            }else{
                Swal.fire({
                    title: "Error",
                    text:`Clave inválida`
                })
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text:`Clave inválida`
            })
        }
    }
    useEffect(()=>{
        // console.log('checked',checked)
        
        if(show === false){
            setPasswordSetted(false);
        }
    },[checked,show])
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Nota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Form onSubmit={handleUpdate}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Título</Form.Label>
                    <Form.Control type="text" name="titulo" value={nota.titulo} onChange={handleChange} placeholder="Título" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" name="descripcion" value={nota.descripcion} onChange={handleChange} placeholder="Descripción" />
                    </Form.Group>
                    {

                        nota.withpassword && passwordSetted ?
                        <>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Nota</Form.Label>
                        <ReactQuill theme="snow" modules={modules} formats={formats} preserveWhitespace={true} name="notadescripcion" value={nota.notadescripcion} placeholder="Nota..."  onChange={(e)=>{setNota({...nota,notadescripcion:e}) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" name="withpassword" checked={nota.withpassword}  value={nota.withpassword} onChange={handleCheck} label="Usar contraseña" />
                        {
                        nota.withpassword && <input type="password" name="password" value={nota.password} onChange={handleChange} className="form-control" placeholder="Introduce la contraseña"/>
                        }
                        </Form.Group>
                        </> : nota.withpassword &&
                        <InputGroup className="mb-3">
                        <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control mb-2" placeholder="Introduce la contraseña"/>
                        <Button size='lg' onClick={() => handleDesbloquear()} style={{height:'38px',fontSize:"12px"}}>Desbloquear</Button>
                        </InputGroup>
                    }
                    {
                        !nota.withpassword ? 
                        <>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Nota</Form.Label>
                        <ReactQuill theme="snow" modules={modules} formats={formats} preserveWhitespace={true} name="notadescripcion" value={nota.notadescripcion} placeholder="Nota..."  onChange={(e)=>{setNota({...nota,notadescripcion:e}) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" name="withpassword" checked={nota.withpassword}  value={nota.withpassword} onChange={handleCheck} label="Usar contraseña" />
                        {
                        nota.withpassword && <input type="password" name="password" value={nota.password} onChange={handleChange} className="form-control" placeholder="Introduce la contraseña"/>
                        }
                        </Form.Group>
                        </> :null
                    }
                    <Button variant="primary" type="submit">
                    Actualizar
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
