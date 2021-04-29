import React from 'react';
import { Button, Icon, Label, Card } from 'semantic-ui-react';
import moment from 'moment';
import DeleteButton from '../components/DeleteButton';
import EditButton from '../components/EditButton';
export default function PostCard({post: { body, createdAt, id, username, likeCount, commentCount, likes, comments }}) {

    function likePost(){
        console.log('liked');
    }
    function makeComment(){
        console.log('comment');

    }
    return (

        <Card fluid>
            <Card.Content >
                <Card.Meta textAlign='right'>{ moment(createdAt).fromNow(true) }</Card.Meta>
                <Card.Description textAlign='left'>
                    {body}
                </Card.Description>
                <Button.Group floated='right'>
                    <EditButton/>
                    <DeleteButton/>
                </Button.Group>
            </Card.Content>
            <Card.Content extra textAlign='left'>
                <Button as='div' labelPosition='right' onClick={likePost}>
                    <Button icon>
                        <Icon name='heart' />
                        Like
                    </Button>
                    <Label as='a' basic pointing='left'>
                        {likeCount}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right' onClick={makeComment}>
                    <Button icon>
                        <Icon name='comments' />
                        Comment
                    </Button>
                    <Label as='a' basic pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
            </Card.Content>
        </Card>
    )
}
