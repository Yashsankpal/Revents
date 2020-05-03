import React, { Fragment } from 'react'
import { Image, Segment, Button, Item, Header } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import LazyLoad from 'react-lazyload'

const EventHeading = ({event,isGoing,isHost,goingToEvent,cancelgoingToEvent}) =>{
    return (
<Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image src="/assets/categoryImages/drinks.jpg" fluid />

        <Segment basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.event}
                  style={{ color: 'white' }}
                />
                <p>Event Date : Working on it</p>
                <p>
                  Hosted by <strong>{event.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom" clearing>
        <LazyLoad>
          {!isHost && 
          <Fragment>
              {isGoing ?
              <Button onClick={()=>cancelgoingToEvent(event)}>Cancel My Place</Button>
              :
              <Button onClick={()=>goingToEvent(event)} content='JOIN THIS EVENT' color='teal' size='large'/>
              }
            
          </Fragment>
          }
        {isHost && 
        <Button content='Update Event' color='teal' size='large' floated='right'  as={NavLink} to={`/manage/${event.id}`}/>
      }
      </LazyLoad>
      </Segment>
    </Segment.Group>
    )
}

export default EventHeading
