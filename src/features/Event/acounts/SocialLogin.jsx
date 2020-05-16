import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

export const SocialLogin = ({socialLogin,name,socialSignup}) => {
    return (
            <div>
              <Button onClick={name === 'login' ? ()=>socialLogin('facebook') : ()=>socialSignup('facebook')} style={{ marginBottom: '10px' }} fluid color="facebook">
                <Icon name="facebook" /> {name} with Facebook
              </Button>
        
              <Button  onClick={name === 'login' ? ()=>socialLogin('google') : ()=>socialSignup('google')} type="button" fluid color="google plus">
                <Icon name="google plus" />
                {name} with Google
              </Button>
            </div>
    )
}
