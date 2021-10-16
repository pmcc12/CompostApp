// @ts-nocheck
import React from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import { ILocationUpdate, Icoordinates } from '../state/actions';

import { TileLayer, Marker, MapContainer, Popup } from 'react-leaflet';

export const registerMarker = (location) => (
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

export const sellMarker = (location) => (
  <Marker position={[location.latitude, location.longitude]}>
    <Popup>Your selling location</Popup>
  </Marker>
);

export const detailMarker = (location) => (
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

export const buyMarker = (product) => (
  <Marker
    position={[
      product.seller.location.latitude,
      product.seller.location.longitude,
    ]}
  >
    <Popup>Hi there we are in buy!</Popup>
  </Marker>
);
