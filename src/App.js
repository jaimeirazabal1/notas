import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Nota } from './components/Nota';
import { CrearNota } from './components/CrearNota';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';

import { getLocalNotes } from './utils/getLocalNotes'; 
import { saveNotesOnMemory } from './utils/saveNotesOnMemory';
import Swal from 'sweetalert2'

import NotaModel from './models/Nota';
// eslint-disable-next-line
import { AES, enc } from 'crypto-js';


function App() {
 
  const [notas, setNotas] = useState(getLocalNotes());
  const [notasBusqueda, setNotasBuqueda] = useState([]);
  const [nota, setNota] = useState(NotaModel);
  const [textoBuscar, settextoBuscar] = useState('');

  const [show, setShow] = useState(false);
  const [crear,setCrear] = useState(false);
  const [favoritoState,setfavoritoState] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreate = (e) => {
    e.preventDefault();
    // console.log('handle',nota)
    const cipherText = AES.encrypt(nota.notadescripcion, nota.password);
    let newNota;
    if(nota.withpassword){
      newNota = {
        ...nota,
        notadescripcion:cipherText.toString(),
        id:uuidv4(),
        fecha:(new Date()),
      }


      // console.log('cipherText',cipherText)
    }else{

      newNota = {
        ...nota,
        id:uuidv4(),
        fecha:(new Date())
      }
      

    }
    
    setNota(newNota);
    setCrear(true);
    setNota(newNota);
  } 
  const handleFavorite = (nota) =>{
    let indice = notas.findIndex( busquedaNota =>  busquedaNota.id === nota.id )
    if(indice !== -1){
      notas[indice].favorita = !notas[indice].favorita;
      setNotas(notas);
      setfavoritoState(true);
      saveNotesOnMemory(notas);
    }
  }
  const handleDelete = (nota)=>{
    Swal.fire({
      title: 'Estas segur@ de borrar esta nota?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Nota Borrada!', '', 'success')
        let newnotaslist = notas.filter( busquedaNota =>  busquedaNota.id !== nota.id )
        setNotas(newnotaslist);
        setfavoritoState(true);
        saveNotesOnMemory(newnotaslist);
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
    return;
    
  }
  const handleShowNote = (nota) => {
    if(nota.withpassword){
      Swal.fire({
        title: 'Ingresa la contraseña',
        input: 'password',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        showLoaderOnConfirm: false,
      }).then((result) => {
        if (result.isConfirmed) {
        
          let bytes;
          bytes = AES.decrypt(nota.notadescripcion.replace('<p>','').replace('</p>',''), result.value);
          const decrypted = bytes.toString(enc.Utf8);
          Swal.fire({
            title: nota.titulo,
            html:`<div style="text-align:justify">${decrypted}</div>`,
            showCloseButton: true,
            focusConfirm: false,
          })
        }
      })
      
    }else{

      Swal.fire({
        title: nota.titulo,
        html:`<div style="text-align:justify">${nota.notadescripcion}</div>`,
        showCloseButton: true,
        focusConfirm: false,
      })
    }
  }
  
  useEffect(()=>{
  
    if(favoritoState){
      setfavoritoState(false);
    }
    if(crear){
      
      setNotas([nota,...notas])
      setCrear(false);
      setNota(NotaModel);
      
    }
    saveNotesOnMemory(notas);
    console.log('notas',notas)
  },[favoritoState,crear,notas]);

  return (
    <Container style={{marginTop:'1rem'}}>
      <Row className="text-center">
        <Col style={{fontSize:"10px"}}>Hecho por Jaime Irazabal - jaimeirazabal1@gmail.com - github:https://github.com/jaimeirazabal1/notas</Col>
      </Row>
      <Row>
        <Col>
          <div className="d-grid gap-2">
          <Button variant="secondary" size="lg" onClick={handleShow}>
          Crear Nota
          </Button>
          </div>
          <CrearNota show={show} handleClose={handleClose} setNota={setNota} nota={nota} handleCreate={handleCreate}/>
        </Col>
      </Row>
      <Row>
        <Col>
          {
            notas && notas.length ? 
            <input type="text" value={textoBuscar} onChange={(e)=>{settextoBuscar(e.target.value); setNotasBuqueda(notas.filter( nota => nota.titulo.toLowerCase().includes(textoBuscar)))}} className="form-control mt-2" placeholder="Buscar Nota..."/> : null
          }
        </Col>
      </Row>
      <Row>
        {
          notasBusqueda && notasBusqueda.length && textoBuscar? 
          notasBusqueda.sort( (a,b)=> b.favorita - a.favorita).map( nota => 
            <Col key={uuidv4()}  xs={12} md={6} lg={3}>
              <Nota note={nota} handleFavorite={handleFavorite} handleShowNote={handleShowNote} handleDelete={handleDelete}/>
            </Col>
            ) :
          notas && notas.length ? notas.sort( (a,b)=> b.favorita - a.favorita).map( nota => 
            <Col key={uuidv4()} xs={12} md={6} lg={3}>
              <Nota note={nota} handleFavorite={handleFavorite} handleShowNote={handleShowNote} handleDelete={handleDelete}/>
            </Col>
            ) : <div className="no_notes"><h1>No tienes notas, crea tu primera nota...</h1></div>
        }
      </Row>
    </Container>
  );
}

export default App;
