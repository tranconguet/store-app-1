import React from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import classes from './nav-bar.module.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = props => {
    return (
        <div className={classes.NavBar}>
            <Navbar fill="true" bg="white" expand="lg" className="bg-light justify-content-between">
                <Navbar.Brand href="/sale" ><h1 className={classes.homeStyle}>SALE</h1></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className={classes.navbarCollapse}>
                    <Nav className="mr-auto">
                        <Nav.Link className={classes.navLink} href="/check-out" >CHECK OUT</Nav.Link>
                        <Nav.Link className={classes.navLink} href="/about-us" >ABOUT US</Nav.Link>
                        {props.isAuth ? (
                        <React.Fragment>
                            <Nav.Link className={classes.navLink} href="/profile" >PROFILE</Nav.Link>
                            <Nav.Link className={classes.navLink} href="/logout" >LOG OUT</Nav.Link>
                        </React.Fragment>
                        ) :(<Nav.Link className={classes.navLink} href="/login" >LOGIN</Nav.Link>)}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavBar;