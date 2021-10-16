// @ts-nocheck
import React from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import { ILocationUpdate, Icoordinates } from '../state/actions';

import { TileLayer, Marker, MapContainer, Popup } from 'react-leaflet';
import {
  registerMarker,
  detailMarker,
  sellMarker,
  buyMarker,
} from '../handlers/mapMarkers';

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
  //37.0245632 ; -7.9265792

  const registerLocationChange = (event: any) => {
    console.log(event.target.getLatLng());
    if (locationUpdater) {
      locationUpdater({
        latitude: event.target.getLatLng().lat,
        longitude: event.target.getLatLng().lng,
      });
    }
  };

  // const registerMarker = (
  //   <Marker
  //     position={[location.latitude, location.longitude]}
  //     draggable
  //     eventHandlers={{
  //       dragend: (event) => registerLocationChange(event as any),
  //     }}
  //   >
  //     <Popup>
  //       You will be registered here! latitude:{location.latitude}
  //       longitude:{location.longitude}
  //     </Popup>
  //   </Marker>
  // );

  // const sellMarker = (
  //   <Marker position={[location.latitude, location.longitude]}>
  //     <Popup>Your selling location</Popup>
  //   </Marker>
  // );

  const detailMarker = (
    <Marker position={[location.latitude, location.longitude]}>
      (
      <Popup>
        <h5>
          <b>Product Offer:</b> {productTitle}
        </h5>
        <h6>
          <b>Owner:</b> {username}
        </h6>
      </Popup>
      )
    </Marker>
  );

  // const buyMarker = (product) => (
  //   <Marker
  //     position={[
  //       product.seller.location.latitude,
  //       product.seller.location.longitude,
  //     ]}
  //   >
  //     <Popup>Hi there we are in buy!</Popup>
  //   </Marker>
  // );

  let finalMarkerRender;

  if (inRegister) {
    finalMarkerRender = registerMarker(location);
  }

  if (inDetail) {
    finalMarkerRender = detailMarker;
  }

  if (inSell) {
    finalMarkerRender = sellMarker(location);
  }

  if (inBuy) {
    finalMarkerRender = myProductsArray.map((product) => buyMarker(product));
  }

  return (
    <MapContainer
      center={[location.latitude, location.longitude]}
      zoom={12}
      style={{ height: '55vh', width: '50wh' }}
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
