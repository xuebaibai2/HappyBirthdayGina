import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import ReactAudioPlayer from 'react-audio-player';
import xxlg from './static/xxlg.mp3';
import { useState } from 'react';
import IntroPage from './IntroPage';

const Layout = () => {
  const [play, setPlay] = useState(false);
  return (
    <>
      {!play && <IntroPage handleButtonClick={() => setPlay(true)}></IntroPage>}
      {play && <ReactAudioPlayer src={xxlg} autoPlay={true} loop={true} volume={0.05} controls={true} />}
      {play && <><Navbar bg="light" variant="light">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>生日快乐</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <LinkContainer to="/tolove">
              <Nav.Link>谢谢你</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/myhappiness">
              <Nav.Link>我的幸福角落</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/todo">
              <Nav.Link>Todos</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
      <Outlet /></>}
    </>
  );
};

export default Layout;
