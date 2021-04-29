import React from 'react';
import { useMutation, gql } from '@apollo/react-hooks';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from '../util/hooks';

export default function PostForm() {
    const initialState = {
        body: '',
    }
    const { onChange, onSubmit, values } = useForm(createPostCallback, initialState)

    const [createPost, { errors }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(_, result){
            console.log(result);
            values.body='';
        }
    });

    function createPostCallback(){
        createPost();
    }

    return (
        <Form onSubmit={onSubmit}>
            <h2>Create a post:</h2>
            <Form.Input
                    type="text"
                    placeholder="Add some magic"
                    name="body"
                    value={values.body}
                    error={errors.body ? true : false}
                    onChange={onChange}
            />
            <Button type="submit" primary>
                Add post
            </Button>
        </Form>
    )
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;