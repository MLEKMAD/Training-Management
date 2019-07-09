import React, { Component } from 'react'
import * as yup from 'yup'
import { Formik } from 'formik';
import { Container, InputGroup, Button, Form } from 'react-bootstrap';
import ApiService from '../../../utils/Api';

const schema = yup.object({
    email: yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .required()
        .min(6, 'Seems a bit short'),
    First_Name:yup
        .string()
        .required(),
    Last_Name:yup
        .string()
        .required(),
    type:yup
        .string()
        .required()
    
    

})

const styles = {
    padding:20,
    margin : 20
}


export class SignUp extends Component {
      
    async register(payload) {
        const myApi = new ApiService();
        const user = await myApi.post('/users/sign-up', payload);
        if(user.error){
            alert('Email already used');
        }
        else{
            this.props.auth(user);
        }
    }

    render() {
        return (
            <Formik
                validationSchema={schema}
                onSubmit={this.register}
                props = {this.props}
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors
                }) => (
                        <Container style={styles}>
                            <h1>Sign Up</h1>
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group controlId="validationFormikEmail">
                                    <Form.Label>email</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="text"
                                            placeholder="user@company.com"
                                            aria-describedby="inputGroupPrepend"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="validationFormikPassword">
                                <Form.Group controlId="validationFormikEmail">
                                    <Form.Label>First Name</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="First Name"
                                            aria-describedby="inputGroupPrepend"
                                            name="First_Name"
                                            value={values.First_Name}
                                            onChange={handleChange}
                                            isInvalid={!!errors.First_Name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.First_Name}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="Last Name"
                                            aria-describedby="inputGroupPrepend"
                                            name="Last_Name"
                                            value={values.Last_Name}
                                            onChange={handleChange}
                                            isInvalid={!!errors.Last_Name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.Last_Name}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="password"
                                            aria-describedby="inputGroupPrepend"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            isInvalid={!!errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                      <Form.Label>Type</Form.Label>
                                             <Form.Control as="select"
                                             type="text"
                                             aria-describedby="inputGroupPrepend"
                                             name="Type"
                                             value={values.type}
                                             onChange={handleChange}
                                             isInvalid={!!errors.type}>
                                                 <option>Normal User</option>
                                                 <option>Administrator</option>
                                                 <option>Collaborator</option>
                                             </Form.Control>
  </Form.Group>
                            <br/>

                                <Button type="submit">Sign Up</Button>
                            </Form>
                        </Container>
                    )}


            </Formik>
        )
    }
}

export default SignUp;
