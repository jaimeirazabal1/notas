import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Nota } from './components/Nota';
import { CrearNota } from './components/CrearNota';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';

import { getLocalNotes } from './utils/getLocalNotes'; 
import { saveNotesOnMemory } from './utils/saveNotesOnMemory';
import Swal from 'sweetalert2'

import NotaModel from './models/Nota';

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
    setNota({
      ...nota,
      id:uuidv4(),
      fecha:(new Date())
    })
    setCrear(true);
  } 
  const handleFavorite = (nota) =>{
    let indice = notas.findIndex( busquedaNota =>  busquedaNota.id === nota.id )
    if(indice != -1){
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
    Swal.fire({
      title: nota.titulo,
      html:`<div style="text-align:justify">${nota.nota}</div>`,
      showCloseButton: true,
      focusConfirm: false,
    })
  }

  useEffect(()=>{
    // console.log('notas',notas)
    if(favoritoState){
      setfavoritoState(false);
    }
    if(crear){
      setNotas([nota,...notas])
      setNota(NotaModel);
      setCrear(false);
      // console.log('notas')
    }
    saveNotesOnMemory(notas);
  },[nota,favoritoState,crear,notas.length]);

  return (
    <Container style={{marginTop:'1rem'}}>
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
            <Col key={nota.id}  xs={12} md={6} lg={3}>
              <Nota note={nota} handleFavorite={handleFavorite} handleShowNote={handleShowNote} handleDelete={handleDelete}/>
            </Col>
            ) :
          notas && notas.length ? notas.sort( (a,b)=> b.favorita - a.favorita).map( nota => 
            <Col key={nota.id} xs={12} md={6} lg={3}>
              <Nota note={nota} handleFavorite={handleFavorite} handleShowNote={handleShowNote} handleDelete={handleDelete}/>
            </Col>
            ) : <div className="no_notes"><h1>No tienes notas, crea tu primera nota...</h1></div>
        }
      </Row>
    </Container>
  );
}

export default App;
