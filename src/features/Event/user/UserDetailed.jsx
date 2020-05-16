import React, {Component, Fragment} from 'react';
import {Button, Card, Grid, Header, Icon, Image, Item, List, Menu, Segment, Tab} from "semantic-ui-react";
import { connect } from 'react-redux';
import {getUserEvent} from './userActions'
import { firestoreConnect } from 'react-redux-firebase';
import { usr_events_query } from './userQueries';


const actions = {
    getUserEvent
}

const mapState = (state,ownProps) => (
    {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    photos: state.firestore.ordered.photos,
    userid:ownProps.match.params.id,
    events:state.event
})

const panes = [
    { menuItem: 'All events', pane: { key: 'allEvents' } },
    { menuItem: 'Past events', pane: { key: 'pastEvents' } },
    { menuItem: 'Future events', pane: { key: 'futureEvents' } },
]

class UserDetailedPage extends Component {
    componentDidMount=()=>{
        this.props.getUserEvent(this.props.userid)
    }
    changeTab = (e,data)=>{
        console.log(this.props.userid)
        console.log(data.activeIndex)
        this.props.getUserEvent(this.props.userid,data.activeIndex)
    }
    render() {
        const {events,auth,profile,photos,userid}=this.props
        return (
            <Grid>
                <Grid.Column width={16}>
                    <Segment>
                        <Item.Group>
                            <Item>
                                <Item.Image avatar size='small' src={profile.photoURL||null}/>
                                <Item.Content verticalAlign='bottom'>
                                    <Header as='h1'>{profile.displayName}</Header>
                                    <br/>
                                    <Header as='h3'>{profile.occupation}</Header>
                                    <br/>
                                    <Header as='h3'>{profile.dateofBirth}</Header>
                                </Item.Content>
                            </Item>
                        </Item.Group>

                    </Segment>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Segment>
                        <Grid columns={2}>
                            <Grid.Column width={10}>
                                <Header icon='smile' content='About Display Name'/>
                                <p>I am a: <strong>{profile.occupation}</strong></p>
                                <p>Originally from <strong>United Kingdom</strong></p>
                                <p>Member Since: <strong></strong></p>
                                <p>Description of user</p>
                                <p>{profile.about}</p>

                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Header icon='heart outline' content='Interests'/>
                                <List>
                                    {profile.interests && profile.interests.length > 0  ?  
                                        profile.interests.map((item,index) => (
                                            <Fragment>
                                            <Item key={index}>
                                                <Icon name='heart'/>
                                            <   Item.Content>{item}</Item.Content>
                                            </Item>
                                            </Fragment>
                                        )
                                        ):(<p>No interests</p>)}
                                </List>
                            </Grid.Column>
                        </Grid>

                    </Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Segment>
                        <Button color='teal' fluid basic content='Edit Profile'/>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Segment attached>
                        <Header icon='image' content='Photos'/>
                        { photos ?
                            <Fragment>
                            <Image.Group size='small'>
                               {
                                    photos.map((item,index)=>(
                                        <Image key={index} src={item.url}/>
                                        ))
                               }
                            </Image.Group>
                            </Fragment>
                        :(<p>No Photos</p>)}    
                    </Segment>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Segment attached>
                        <Header icon='calendar' content='Events'/>
                        <Menu secondary pointing>
                            <Tab 
                            onTabChange={(e,data) => this.changeTab(e,data)}
                            panes={panes}
                            menu={{ secondary: true, pointing: true }}
                            />
                        </Menu>

                        <Card.Group itemsPerRow={5}>
                            {events ?
                                   events.map((item,index)=>(
                                        <Card key={index}>
                                            <Image src={item.Profile_image}/>
                                            <Card.Content>
                                                <Card.Header textAlign='center'>
                                                    {item.event}
                                                </Card.Header>
                                                <Card.Meta textAlign='center'>
                                                    {item.date} at {item.time}
                                                </Card.Meta>
                                            </Card.Content>
                                        </Card>
                            )):<p>Sorry no events</p>}
                       </Card.Group>
                    </Segment>
                </Grid.Column>
            </Grid>

        );
    }
}

export default connect(mapState,actions)(firestoreConnect([{collection:'events'}])(UserDetailedPage));