import React from 'react'
import { useLocation } from 'react-router';
import { Container, Row } from 'react-bootstrap';

const RightSidebar = (props) => {

    // const location = useLocation();

    return(
        <Container fluid>{props.children} </Container>
    )
}

export default RightSidebar;