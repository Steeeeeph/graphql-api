import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';
import { AuthContext } from '../context/auth';
export default function Login(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const initialState = {
        username: '',
        password: '',
    }

    const { onChange, onSubmit, values } = useForm(loginUserCallback, initialState)

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        // updating the status after adding user
        // DESTRUCTURING {data: {login: userData}} equals 'result' as 'result.data.login' equals 'userData'
        update(_, {data: {login: userData}}){
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
    // to recognize the loginUser from deconstructed variable in the function above, this must be declared in another function
    function loginUserCallback(){
        loginUser();
    }

    return (
        <div>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
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
                    label="Password"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                    />
                <Button type="submit" primary>
                    Login
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

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    )
    {
        login(
            username: $username
            password: $password
        ) {
        id
        email
        username
        createdAt
        token
        }
    }
`;

