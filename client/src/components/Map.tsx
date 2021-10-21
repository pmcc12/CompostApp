// @ts-nocheck
import React from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import { ILocationUpdate, Icoordinates } from '../state/actions';

import { TileLayer, Marker, MapContainer, Popup } from 'react-leaflet';
import { detailMarker, sellMarker, buyMarker } from '../handlers/mapMarkers';
import {useHistory} from 'react-router-dom'

//locationUpdater will only be sent in Register Screen
type Props = {
  location: ILocationUpdate;
  locationUpdater?: (val: Icoordinates) => void;
  inRegister: boolean;
  inDetailsOrSell: boolean;
  inDetail: boolean;
  inSell: boolean;
  inBuy: boolean;
  username?: string;
  productTitle?: string;
  inDetail: boolean;
  myProductsArray?: any;
};

//PROPS From father component:
/*
Register: -> latitude, longitude from user
          -> callback function to handle position change from user drag
Buy:
          -> callback function to add more markers
*/
const MyMap: React.FC<Props> = ({
  location,
  locationUpdater,
  inRegister,
  inDetailsOrSell,
  inSell,
  inBuy,
  inDetail,
  username,
  productTitle,
  myProductsArray,
}) => {

  let history = useHistory();
  console.log('my location:', location)

  const registerLocationChange = (event: any) => {
    console.log(event.target.getLatLng());
    if (locationUpdater) {
      locationUpdater({
        latitude: event.target.getLatLng().lat,
        longitude: event.target.getLatLng().lng,
      });
    }
  };

  const registerMarker = (location) => (
    <Marker
      position={[location.latitude, location.longitude]}
      draggable
      eventHandlers={{
        dragend: (event) => registerLocationChange(event as any),
      }}
    >
      <Popup>
        You will be registered here! latitude:{location.latitude}
        longitude:{location.longitude}
      </Popup>
    </Marker>
  );

  let finalMarkerRender;

  if (inRegister) {
    finalMarkerRender = registerMarker(location);
  }

  if (inDetail) {
    finalMarkerRender = detailMarker(location, productTitle, username);
  }

  if (inSell) {
    finalMarkerRender = sellMarker(location);
  }

  if (inBuy) {
    finalMarkerRender = myProductsArray.map((product) => buyMarker(product, history));
  }

  return (
    <MapContainer
      center={[location.latitude, location.longitude]}
      zoom={12}
      style={{ height: '55vh', width: '50vw' }}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/${process.env.REACT_APP_MAPBOX_USERID}/${process.env.REACT_APP_MAPBOX_STYLESID}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_APIKEY}`}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMaps</a>'
      />
      {finalMarkerRender}
    </MapContainer>
  );
};

export default MyMap;

/*     "react-leaflet": "^2.7.0",
 */
