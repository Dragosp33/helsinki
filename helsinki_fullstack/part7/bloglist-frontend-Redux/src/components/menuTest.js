import {
  Nav,
  Navbar,
  Button,
  Offcanvas,
  Container,
  NavDropdown,
  Dropdown,
  NavItem,
  Form,
} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { BrowserRouter, Link } from 'react-router-dom'

const MenuTest = ({}) => {
  return (
    <div>
      {/* first variant for menu.js
       <Nav.Item>
        <Button variant="dark" onClick={switchDark}>
          {mode}
        </Button>
      </Nav.Item>
      <Nav.Item>
        <Form>
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label={
              mode === 'dark' ? (
                <BsMoonStarsFill color="white" />
              ) : (
                <BsFillSunFill color="black" />
              )
            }
          />
        </Form>
      </Nav.Item> */}

      <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Brand href="#home">Your Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            {/* Add more Nav.Link items as needed */}
            <Dropdown as={Nav.Item}>
              <button>Log out</button>
              <Dropdown.Toggle as={Nav.Link}>Menu</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#home">Home</Dropdown.Item>
                <Dropdown.Item href="#about">About</Dropdown.Item>
                {/* Add more Dropdown.Item items as needed */}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default MenuTest
