import React from "react";
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Outlet } from "react-router";
import { auth } from "../../firebase/config";


const Layout = () => {

    return <>
        <Navbar expand="lg" className="bg-body-secondary" data-bs-theme="dark">
            <Navbar.Brand className="px-3">Sunday Service</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/">
                    Home
                </Nav.Link>
                <Nav.Link href="/event">
                    Event Setup
                </Nav.Link>
                <Nav.Link href="/logout">
                    Logout
                </Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className="mx-3">
                    { auth.currentUser?.email }
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
        <Container className="mt-1">
           <Outlet />
        </Container> 
    </>
}
export default Layout;