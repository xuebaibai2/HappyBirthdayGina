import { Outlet, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

const Layout = () => {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>生日快乐</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <LinkContainer to="/tolove">
              <Nav.Link>谢谢你</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/myhappiness">
              <Nav.Link>幸福角落</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Layout;
