/*jshint esversion: 6*/
/*jshint ignore:start*/
import React from 'react'
import { Segment, Icon } from 'semantic-ui-react'
import GoogleMapReact from 'google-map-react';

const Marker = () => <Icon name='Marker' color='red' size='big'/>;

const MapDetail = ({lat,lng}) => {
    const zoom = 14
    return (
        <Segment attached='bottom'>
            <div style={{ height: '100vh', width: '100%' }}/>
            <GoogleMapReact
                  bootstrapURLKeys={{ key:'AIzaSyBeGFf-IvUPyRs-QWxYBQDIhWOSplEh6BA'}}
                  defaultCenter={{lat,lng}}
                  defaultZoom={zoom}
            >
                <Marker
                    lat={lat}
                    lng={lng}
                />
            </GoogleMapReact>
        </Segment>
           );
          }
 

export default MapDetail
