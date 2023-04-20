import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import UploadFiles from './components/upload-files.component';
import Transcription from './components/TranscriptionsList';
import Login from './components/Login';
import Profile from './components/Profile';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function App() {
  return (
    // <div className="App">
    // <h1>Welcome to React Router!</h1>
    //   <Navbar bg="light" expand="lg" />
    //   <Container>
    //     <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="mr-auto">
    //         <Nav.Link href="#home">Home</Nav.Link>
    //         <Nav.Link href="#link">Link</Nav.Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="about" element={<About />} />
    //   </Routes>
    // </div>
    <Container>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="about">Link</Nav.Link>
            <Nav.Link href="login">Login</Nav.Link>
            <Nav.Link href="profile">Profile</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Mark Otto</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<UploadFiles />} />
        <Route path="about" element={<Transcription />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </Container>
  );
}

function Home() {
  return (
    // <div className="container-fluid">
    //   <div style={{ margin: 'auto' }}>
    //     <h4>Svensk röst till text mackapär</h4>
    //   </div>
    //   <UploadFiles />
    // </div>
    <Container>
      <Row>
        <Col>Svensk röst till text mackapär</Col>
      </Row>
      <Row>
        <Col>
          <UploadFiles />
        </Col>
        <Col>
          <Transcription />
        </Col>
      </Row>
    </Container>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>That feels like an existential question, don't you think?</p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

export default App;
