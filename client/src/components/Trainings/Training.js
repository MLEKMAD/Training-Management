import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';

export class Training extends Component {

    like = () =>{
        this.props.like(this.props.id);
    }

    dislike = () =>{
        this.props.dislike(this.props.id);
    }

    render() {
        const {name, collaborator, T_date} = this.props;
        return (
            <Card >
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        <p>The collaborator doing this Training is: {collaborator}</p>
                        <p>Reminder:The training take time at:{T_date}</p>
                </Card.Text>
                    <Button variant="primary" onClick = {this.like}>like</Button>
                    <Button variant="danger" onClick = {this.dislike}>dislike</Button>
                </Card.Body>
            </Card>
        )
    }
}

export default Training
