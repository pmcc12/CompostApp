import React, {useState,useEffect, useRef} from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import { ILocationUpdate, Icoordinates } from '../state/actions';
// import {Map, TileLayer, Marker, Popup, Circle, Pane} from 'react-leaflet'
import {TileLayer,Marker, MapContainer, Popup, Pane} from 'react-leaflet'

//locationUpdater will only be sent in Register Screen
type Props = {
    location: ILocationUpdate,
    locationUpdater?: (val: Icoordinates) => void
    inRegister:boolean,
    inDetailsOrSell: boolean,
    inBuy: boolean
}

//PROPS From father component:
/*
Register: -> latitude, longitude from user
          -> callback function to handle position change from user drag
Buy:
          -> callback function to add more markers
*/
const MyMap: React.FC<Props> = ({location, locationUpdater, inRegister, inDetailsOrSell, inBuy}) => {

    //37.0245632 ; -7.9265792

    console.log(process.env.REACT_APP_MAPBOX_USERID+' '+process.env.REACT_APP_MAPBOX_STYLESID+' '+process.env.REACT_APP_MAPBOX_APIKEY)

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
                    Hi! You are in Register!
                </Popup>
            </Marker>
            )
            : 
            (inDetailsOrSell ? 
                (
                    <Marker position={[location.latitude, location.longitude]}> 
                        <Popup>
                            Hi! You are in Sell or Detail!
                        </Popup>
                    </Marker>
                ) 
                :
                (
                    <Marker position={[location.latitude, location.longitude]} draggable eventHandlers={{
                        dragend: (event) => registerLocationChange(event as any)
                    }}> 
                        <Popup>
                            Hi! You are in Buy!
                        </Popup>
                    </Marker>
                )
            )
        }
        
        </MapContainer>
    )
}

export default MyMap;

/*     "react-leaflet": "^2.7.0",
 */