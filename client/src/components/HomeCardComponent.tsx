import React from 'react'
import { Card, Button } from 'react-bootstrap'

export default function HomeCardComponent() {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top"> <i style={{fontSize: "30px", margin:"10px", backgroundColor:"#ccccec"}} className="bi bi-chat"></i></Card.Img>
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}
