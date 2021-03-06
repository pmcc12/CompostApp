import React from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import { ILocationUpdate, Icoordinates } from '../state/actions';
import { useHistory } from 'react-router-dom';
import { TileLayer, Marker, MapContainer, Popup } from 'react-leaflet';
import { Button } from 'react-bootstrap';

export const sellMarker = (location: ILocationUpdate) => (
  <Marker position={[location.latitude, location.longitude]}>
    <Popup>Your selling location</Popup>
  </Marker>
);

export const detailMarker = (
  location: ILocationUpdate,
  productTitle?: string,
  username?: string
) => (
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

export const buyMarker = (product: any, history: any) => {
  return (
    <Marker
      position={[
        product.seller.location.latitude,
        product.seller.location.longitude,
      ]}
    >
      <Popup>
        <h6>User: {product.seller.username}</h6>
        <Button
          onClick={() => history.push(`/details/${product.seller.userId}`)}
        >
          Check Offer
        </Button>
      </Popup>
    </Marker>
  );
};
