import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';
import { AuthContext } from '../context/auth';

export default function Register(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const initialState = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const { onChange, onSubmit, values } = useForm(registerUser, initialState)

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        // updating the status after adding user
        update(_, {data: {register: userData}}){
            console.log(userData);
            // change context after logging in
            context.login(userData);
            // after registering successfully redirect to homepage
            props.history.push("/");
        },
        onError(error){
            console.log(error.graphQLErrors[0].extensions.exception.errors);
            setErrors(error.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    });
    // to recognize the addUser from deconstructed variable in the function above, this must be declared in another function
    function registerUser(){
        addUser();
    }

    return (
        <div>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                    />
                <Form.Input
                    label="E-mail"
                    type="email"
                    placeholder="E-mail"
                    name="email"
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={onChange}
                    />
                <Form.Input
                    label="Password"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                    />
                <Form.Input
                    label="Confirm password"
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                    />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {/* showing errors depending on whether the errors have key values */}
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                            ))
                        }
                    </ul>
                </div>
            )}
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    )
    {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
        id
        email
        username
        createdAt
        token
        }
    }
`;
