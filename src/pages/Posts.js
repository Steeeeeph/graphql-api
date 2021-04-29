import React, { useContext } from 'react'
import { gql, useQuery } from '@apollo/client';
import {  Grid, Loader, Dimmer } from 'semantic-ui-react';
import { AuthContext } from '../context/auth'
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

 function Posts() {
    const { user } = useContext(AuthContext);

    const { loading, data:{ getPosts: posts } } = useQuery(GET_POSTS_QUERY);
    console.log(posts);
    return (
        <Grid centered divided="vertically">
            <Grid.Row>
                <h1>Grimoire</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                <PostForm />)}
            </Grid.Row>
                {loading ? (
                    <Dimmer active inverted>
                        <Loader inverted content='Loading'/>
                    </Dimmer>
                    ) : (
                    posts && posts.map((post)=> (
                            <PostCard key={post.id} post={post}/>
                    ))
                )}
        </Grid>
    )
}

// graphql

const GET_POSTS_QUERY = gql `
{
    getPosts{
        id
        body
        createdAt
        username
        likeCount
        likes{
            username
        }
        commentCount
        comments{
            id
            username
            createdAt
            body
        }
    }
}
`
export default Posts;