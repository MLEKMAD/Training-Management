import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Training from '../Trainings';

export class TrainingList extends Component {

    calculateDistance(shopA) {
        let myCoordinates = this.myPosition();
        return Math.sqrt(
            Math.pow(shopA.location.coordinates[0] - myCoordinates[0], 2) +
            Math.pow(shopA.location.coordinates[1] - myCoordinates[1], 2)
        )
    }

    myPosition() {
        //this is going to utilize the GPS or something 
        return [0, 0]
    }

    render() {
        let { list } = this.props;
        //Probably should be smarter than this, This is going to be so slow 
        list = list.sort((a, b) => this.calculateDistance(a) < this.calculateDistance(b));
        return (
            <>
                <Container>
                    <Row>
                        {list.length===0 ?
                         'WoW Such Empty'
                         :list.map(item =>
                            <Col md={4} xs={6}>
                                <Training city={item.Collaborator}
                                    name={item.name}
                                    T_date={item.T_date}
                                    id={item._id}
                                    like={this.props.like}
                                    dislike={this.props.dislike}

                                />
                            </Col>
                        )}
                    </Row>
                </Container>
            </>
        )
    }
}

export default TrainingList
