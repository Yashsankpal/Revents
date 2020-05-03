import React, { Fragment } from 'react'
import { Header, Card, Image, Button } from 'semantic-ui-react'

const UserPhotos = ({profile,photos,deletePhoto,setmain}) => {
    let filteredPhotos
    if (photos) {
        filteredPhotos = photos.filter(photo => {
            return photo.url !== profile.photoURL
            console.log(photo)
        })
    }
    return (
        <Fragment>
           <Header sub color='teal' content='All Photos'/>
           <Card.Group>
           <Card>
                <Image src={profile.photoURL}/>
                <Button positive>Main Photo</Button>
            </Card>
            {photos && filteredPhotos.map(photo => (
                <Card key={photo.id}>
                    <Image src={photo.url}/>
                    <div className='ui two buttons'>
                        <Button onClick={()=>setmain(photo)} basic color='green'>
                            Main
                        </Button>
                        <Button onClick={()=>deletePhoto(photo)} basic icon='trash' color='red' />
                    </div>
                </Card>
            ))}
            </Card.Group> 
        </Fragment>
    )
}

export default UserPhotos

