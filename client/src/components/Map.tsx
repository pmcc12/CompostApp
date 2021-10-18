// @ts-nocheck
import React, {useState,useEffect, useRef} from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import { ILocationUpdate, Icoordinates } from '../state/actions';
// import {Map, TileLayer, Marker, Popup, Circle, Pane} from 'react-leaflet'
import {TileLayer,Marker, MapContainer, Popup, Pane} from 'react-leaflet'
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

//locationUpdater will only be sent in Register Screen
type Props = {
    location: ILocationUpdate,
    locationUpdater?: (val: Icoordinates) => void
    inRegister:boolean,
    inDetailsOrSell: boolean,
    inBuy: boolean,
    username?: string,
    productTitle?: string
    inDetail: boolean,
    myProductsArray?: any
}

//PROPS From father component:
/*
Register: -> latitude, longitude from user
          -> callback function to handle position change from user drag
Buy:
          -> callback function to add more markers
*/
const MyMap: React.FC<Props> = ({location, locationUpdater, inRegister, inDetailsOrSell, inBuy, inDetail, username, productTitle, myProductsArray}) => {

    //37.0245632 ; -7.9265792
    

    console.log('on map');
    console.log(myProductsArray);
    console.log('in register?', inRegister);
    console.log('in detailsorsell?',inDetailsOrSell);
    const history = useHistory();

    const registerLocationChange = (event: any) => {
        console.log(event.target.getLatLng());
        if(locationUpdater){
            locationUpdater({
                latitude: event.target.getLatLng().lat,
                longitude: event.target.getLatLng().lng
            })
        }
    }

    return (
        <MapContainer center={[location.latitude, location.longitude]} zoom={12}    style={{ height: '55vh', width: '50wh' }}>
            <TileLayer 
            url={`https://api.mapbox.com/styles/v1/${process.env.REACT_APP_MAPBOX_USERID}/${process.env.REACT_APP_MAPBOX_STYLESID}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_APIKEY}`}
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMaps</a>"
            />
        {/* current user marker draggable.. this marker should only be shown */}
        {inRegister ? 
            (
            <Marker position={[location.latitude, location.longitude]} draggable eventHandlers={{
                dragend: (event) => registerLocationChange(event as any)
            }}> 
                <Popup>
                    You will be registered here!
                    latitude:{location.latitude}
                    longitude:{location.longitude}
                </Popup>
            </Marker>
            )
            : 
            (inDetailsOrSell ? 
                (
                    <Marker position={[location.latitude, location.longitude]}> 
                        {inDetail? 
                        (
                            <Popup>
                                <h5><b>Product Offer:</b> {productTitle}</h5>
                                <h6><b>Owner:</b> {username}</h6>
                            </Popup>
                        )
                        : 
                        (
                            <Popup>
                                Your selling location
                            </Popup>
                        )}
                    </Marker>
                ) 
                :
                (
                    myProductsArray.map(product =>(
                        <Marker position={[product.seller.location.latitude, product.seller.location.longitude]}> 
                            <Popup>
                                <h6>User: {product.seller.username}</h6>
                                <Button variant="primary" onClick={(event) =>
                                    history.push(`/details/${product.seller.userId}`)}>
                                Select supplier
                                </Button>
                            </Popup>  
                        </Marker>
                    ))
    
            )
            )
        }
        
        </MapContainer>
    )
}

export default MyMap;

/*     "react-leaflet": "^2.7.0",
 */