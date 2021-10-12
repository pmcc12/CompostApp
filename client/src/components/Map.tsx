import React, {useState,useEffect, useRef} from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import { ILocationUpdate } from '../state/actions';
// import {Map, TileLayer, Marker, Popup, Circle, Pane} from 'react-leaflet'
import {TileLayer,Marker, MapContainer, Popup, Pane} from 'react-leaflet'

// {latitude,longitude,error,availability}: ILocationUpdate

const MyMap = ({latitude,longitude,error,availability}: ILocationUpdate) => {

    //37.0245632 ; -7.9265792

    return (
        <MapContainer center={[37.0245632, -7.9265792]} zoom={12} scrollWheelZoom={false}>
            <TileLayer 
            url={`https://api.mapbox.com/styles/v1/${process.env.REACT_APP_MAPBOX_USERID}/${process.env.REACT_APP_MAPBOX_STYLESID}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_APIKEY}`}
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMaps</a>"
            />
        </MapContainer>
    )
}

export default MyMap;