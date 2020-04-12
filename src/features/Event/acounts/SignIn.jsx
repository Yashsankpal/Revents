import React, { Fragment } from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'

//<Image avatar spaced="right" src={profile.photoURL || "/assets/user.png"} />

const SignIn = ({signout,currentUser}) => {
    return (
       <Dropdown text={currentUser}pointing="top left" >

        <Dropdown.Menu>
          <Dropdown.Item text="Create Event" icon="plus" />
          <Dropdown.Item text="My Events" icon="calendar" />
          <Dropdown.Item text="My Network" icon="users" />
          <Dropdown.Item  text="My Profile" icon="user" />
          <Dropdown.Item  to='/settings' text="Settings" icon="settings" />
          <Dropdown.Item onClick={signout} text="Sign Out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    )
}

export default SignIn
