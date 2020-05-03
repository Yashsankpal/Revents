import React, {Component, useState, Fragment} from 'react';
import {Image, Segment, Header, Divider, Grid, Button, Card} from 'semantic-ui-react';
import DropzonePage from './DropzonePage';
import { useEffect } from 'react';
import CropperPage from './CropperComponent';
import {updateProfileImage , deletePhoto,setMainPhoto}  from '../../userActions'
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import UserPhotos from './UserPhotos';



const query = ({auth}) =>{
    return [
        {
            collection: 'users',
            doc: auth.uid,
            subcollections: [{collection:'photos'}],
            storeAs:'photos' 
        }
    ]
}

const mapState =(state)=>( {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    photos: state.firestore.ordered.photos,
    loading:state.async.loading
})
const actions = {
    updateProfileImage,
    deletePhoto,
    setMainPhoto,
}
const PhotosPage = ({updateProfileImage,profile,photos,deletePhoto,setMainPhoto}) => {
    const [ files , setfiles ] = useState([])
    const [ image , setImage ] = useState(null)
    useEffect(()=>{
        return ()=>{
            files.forEach(file => URL.revokeObjectURL(file.preview))
        }
    },[files])

    const handleUploadImage = async() => {
        try {
            await updateProfileImage(image,files[0].name)
            handleCancelCrop()
            toastr.success("Success","Hurray u made it")
        } catch (error) {
            console.log(error)
            toastr.error("OHH NO","OOPS Error")
            handleCancelCrop()
        }
    }

    const handleCancelCrop = () => {
            setfiles([])
            setImage(null)    
    }

    const handledelete = async(photo) => {
        try {
            await deletePhoto(photo)
        } catch (error) {
            toastr.error("Oops",error.message)
        }
    }

    const handleSetMainPhoto= async(photo) => {
        try{
            await setMainPhoto(photo)
        }
        catch(error){
            toastr.error('Oops',error.message)
        }
    }
        return (
            <Segment>
                <Header dividing size='large' content='Your Photos' />
                <Grid>
                    <Grid.Row />
                    <Grid.Column width={4}>
                        <Header color='teal' sub content='Step 1 - Add Photo'/>
                        <DropzonePage setfiles={setfiles}/>
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='Step 2 - Resize image' />
                        {files.length > 0 &&
                        <CropperPage imagePreview={files[0].preview} setImage={setImage}/>
                        }   
                    </Grid.Column>
                    <Grid.Column width={1} />
                    <Grid.Column width={4}>
                        <Header sub color='teal' content='Step 3 - Preview and Upload' />
                        {files.length > 0 &&
                        <Fragment>
                            <div className='img-preview' style={{minHeight: '200px',minWidth:'200px',overflow:'hidden'}}/>
                            <Button.Group>
                                <Button onClick={handleUploadImage} style={{width:'100px'}} positive icon='check'/>
                                <Button onClick={handleCancelCrop} style={{width:'100px'}} negative icon='close'/>
                            </Button.Group>
                        </Fragment>
                    }

                    </Grid.Column>
                </Grid>
                <Divider/>
               <UserPhotos profile={profile} photos={photos} deletePhoto={handledelete} setmain={handleSetMainPhoto}/>
            </Segment>
        );
    }


export default compose(
    connect(mapState,actions),
    firestoreConnect(auth => query(auth))
    )(PhotosPage);