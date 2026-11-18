import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { productContext } from '../contextAPI/Context';

function NavbarLog() {
  const { setToken } = useContext(productContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/login');
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/home">ShoeStop</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/fav">♥ Favourites</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
          </Nav>

          <Nav className="mx-5">
            <Button variant="light" onClick={logoutHandler}>
              Log out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarLog;