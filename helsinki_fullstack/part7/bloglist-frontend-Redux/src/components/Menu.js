import {
  Nav,
  Navbar,
  Button,
  Offcanvas,
  Container,
  NavDropdown,
  Form,
  Card,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Link } from 'react-router-dom'
import { setMode } from '../reducers/darkmodeReducer'
import { useEffect, useState } from 'react'
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs'

const Menu = ({ handleLogout, username }) => {
  const padding = {
    paddingRight: 5,
  }

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const mode = useSelector((state) => state.mode)

  useEffect(() => {
    //changing color of body with darkmode in useEffect

    const element = document.body
    element.dataset.bsTheme = mode
    console.log('useffect -> ', mode)
    setNavClass(`bg-${mode} navbar-${mode}`)
  }, [mode])

  const [navClass, setNavClass] = useState(`bg-${mode} navbar-${mode}`)
  const [showOffcanvas, setShowOffcanvas] = useState(false)

  const handleOffcanvasClose = () => setShowOffcanvas(false)
  const handleOffcanvasShow = () => setShowOffcanvas(true)

  const switchDark = () => {
    dispatch(setMode())
    console.log('called switchddark')
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className={navClass} fixed="top">
        <Container fluid classname="p-5">
          <Navbar.Brand href="/"> Blogs app </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <div className="order-lg-3">
            <Button variant="dark" onClick={handleOffcanvasShow}>
              <i class="bi bi-person-gear"></i>
            </Button>
          </div>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav
              className="justify-content-end flex-grow-1 pe-3"
              variant="underline"
              defaultActiveKey="/"
            >
              <Nav.Item>
                <Nav.Link eventKey="/" as={Link} to="/">
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="/users" as={Link} to="/users">
                  users
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas
        show={showOffcanvas}
        onHide={handleOffcanvasClose}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Item>
              <div className="container-fluid">
                <input
                  type="checkbox"
                  className="checkbox"
                  id="checkbox"
                  // onChange prop to fire our internal function for changing the dark mode value
                  onChange={switchDark}
                  // checking checked prop with dark mode state
                  checked={mode === 'dark'}
                  label="Dark mode"
                />
                <label htmlFor="checkbox" className="label">
                  <BsMoonStarsFill color="white" />
                  <BsFillSunFill color="yellow" />
                  <div className="ball"></div>
                </label>
              </div>
            </Nav.Item>
            <Nav.Item>
              <Card className="px-1" border={mode}>
                <Card.Body>
                  {' '}
                  <i class="bi bi-person-circle"></i>{' '}
                </Card.Body>
                <Card.Title> User logged in {user.username}</Card.Title>
              </Card>
            </Nav.Item>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Menu
