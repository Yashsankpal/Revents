import React from 'react'
import { Segment, Comment, Header} from 'semantic-ui-react'
import EventCommentForm from './EventCommentForm'
import { Link } from 'react-router-dom'
import { formatDistance } from 'date-fns'
import { Fragment } from 'react'
import { Component } from 'react'


class EventComments extends Component {
    state = {
        showReplyForm: false,
        selectedCommentId:null
    }
    handleOpenReplyForm = (id) => () => {
        this.setState({
            showReplyForm:true,
            selectedCommentId:id
        })
    }
    handleCloseReplyForm = () => {
        this.setState({
            showReplyForm:false,
            selectedCommentId:null
        })
    }
    render() {
        const { getEventcomment , eventChat , eventId } = this.props
        const { showReplyForm , selectedCommentId } = this.state
        return (
            <Fragment>
            <Segment
                        textAlign='center'
                        attached='top'
                        inverted
                        color='teal'
                        style={{ border: 'none' }}
                    >
                    <Header as='h3' dividing>
                    Comments
                    </Header>
            </Segment>
            <Segment attached>
                <Comment.Group>
                    {eventChat && 
                        eventChat.map((comment)=>(
                            <Comment key={comment.id}>
                                <Comment.Avatar src={comment.photoURL || 'null'} />
                                <Comment.Content>
                                    <Comment.Author as={Link} to={`/profile/${comment.uid}`}>{comment.displayName}</Comment.Author>
                                    <Comment.Metadata>
                                    <div> ago</div>
                                    </Comment.Metadata>
                                    <Comment.Text>{comment.text}</Comment.Text>
                                    <Comment.Actions>
                                        <Comment.Action onClick={this.handleOpenReplyForm(comment.id)} >Reply</Comment.Action>
                                        { showReplyForm && selectedCommentId === comment.id && (
                                            <EventCommentForm
                                            getEventcomment={getEventcomment}
                                            eventId={eventId}
                                            form={`reply_${comment.id}`}
                                            parentId={comment.id}
                                            closeForm={this.handleCloseReplyForm}/>
                                        )
                                        }
                                    </Comment.Actions>
                                </Comment.Content>
                                {comment.childNodes &&
                                comment.childNodes.map(child => (
                                <Comment.Group key={child.id}>
                                    <Comment>
                                    <Comment.Avatar
                                        src={child.photoURL || '/assets/user.png'}
                                    />
                                    <Comment.Content>
                                        <Comment.Author
                                        as={Link}
                                        to={`/profile/${child.uid}`}
                                        >
                                        {child.displayName}
                                        </Comment.Author>
                                        <Comment.Metadata>
                                        <div>
                                       ago
                                        </div>
                                        </Comment.Metadata>
                                        <Comment.Text>{child.text}</Comment.Text>
                                        <Comment.Actions>
                                        <Comment.Action
                                            onClick={this.handleOpenReplyForm(child.id)}
                                        >
                                            Reply
                                        </Comment.Action>
                                        {showReplyForm &&
                                            selectedCommentId === child.id && (
                                            <EventCommentForm
                                                getEventcomment={getEventcomment}
                                                eventId={eventId}
                                                form={`reply_${child.id}`}
                                                closeForm={this.handleCloseReplyForm}
                                                parentId={child.parentId}
                                            />
                                            )}
                                        </Comment.Actions>
                                    </Comment.Content>
                                    </Comment>
                                </Comment.Group>
                                ))}
                            </Comment>
                    ))}
                </Comment.Group>
                <EventCommentForm 
                getEventcomment={getEventcomment} 
                eventId={eventId} 
                form={'newComment'}
                parentId={0}
                />
            </Segment>
        </Fragment>
        )
    }
}


export default EventComments

