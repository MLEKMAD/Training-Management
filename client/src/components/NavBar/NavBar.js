import React, { Component } from 'react'
import logo from '../../assets/logo.png';

import { Navbar, Button } from 'react-bootstrap';




export class NavBar extends Component {
    render() {
        return (
            <>
                <Navbar bg="light" variant="light" >
                    <Navbar.Brand href="/">
                        <img
                            alt="Shop logo"
                            src={logo}
                            width="110"
                            height="70"
                            className="d-inline-block align-top"
                        />
                        
                    </Navbar.Brand>
                    {this.props.authenticated &&
                    <>  Welcome {this.props.user.email} 
                        <Button onClick={this.props.toggelShowAll} >All Trainings</Button>
                        <Button onClick = {this.props.toggelShowFav} >Favourite</Button>
                        <Button onClick = {this.props.logout} variant="danger">LOGOUT </Button>
                    </>
                    }
                </Navbar>
            </>
        )
    }
}

export default NavBar
