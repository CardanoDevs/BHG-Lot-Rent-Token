import React, {Component} from 'react';
import {Container, Navbar, Nav} from 'react-bootstrap';

class TopNav extends Component {
    render () {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">CTO RENT</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/ethertoerc20">CTO token rent</Nav.Link>
                            <Nav.Link href="/erc20toerc20"></Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/help">Help</Nav.Link>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default TopNav;