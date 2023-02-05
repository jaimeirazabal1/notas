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



function App() {
  const [notas, setNotas] = useState([]);
  const [nota, setNota] = useState({
    id:"",
    titulo:"",
    descripcion:"",
    nota:"",
    withpassword:false,
    password:"",
    fecha:null,
    favorita:false
  });

  const [show, setShow] = useState(false);
  const [crear,setCrear] = useState(false);
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
    let encontro = notas.filter( busquedaNota =>  busquedaNota.id === nota.id )
    console.log('encontro',encontro)
  }

  useEffect(()=>{
    // console.log('nota',nota)
    if(crear){
      setNotas([...notas,nota])
      setNota({
        id:"",
        titulo:"",
        descripcion:"",
        nota:"",
        withpassword:false,
        password:"",
        fecha:null,
        favorita:false
      });
      setCrear(false);
    }
  },[nota]);

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
          notas && notas.length ? notas.map( nota => 
            <Col key={nota.id}>
              <Nota note={nota} handleFavorite={handleFavorite}/>
            </Col>
            ) : null
        }
      </Row>
    </Container>
  );
}

export default App;
