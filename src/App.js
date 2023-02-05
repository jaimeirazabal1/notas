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
import NotaModel from './models/Nota';

function App() {
 
  const [notas, setNotas] = useState(getLocalNotes());
  const [nota, setNota] = useState(NotaModel);

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
          <Button variant="primary" size="lg" onClick={handleShow}>
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
            <input type="text" className="form-control mt-2" placeholder="Buscar Nota..."/> : null
          }
        </Col>
      </Row>
      <Row>
        {
          notas && notas.length ? notas.sort( (a,b)=> b.favorita - a.favorita).map( nota => 
            <Col key={nota.id}  md={3} lg={3}>
              <Nota note={nota} handleFavorite={handleFavorite}/>
            </Col>
            ) : <div className="no_notes"><h1>No tienes notas, crea tu primera nota...</h1></div>
        }
      </Row>
    </Container>
  );
}

export default App;
