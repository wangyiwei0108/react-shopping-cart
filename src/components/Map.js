import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import * as storesData from "../data-stores.json";
import mapStyles from "./Mapstyle";

function Map() {

    const [selectedStore, setSelectedStore] = useState(null);

    return (
        <GoogleMap 
            defaultZoom={13}
            defaultCenter={{lat: 35.661093, lng: 139.7337629}}
            defaultOptions={{ styles: mapStyles }}
        >
            {storesData.stores.map((store) => (
                <Marker 
                    key={store._id} 
                    position={{
                        lat: store.geometry[0], 
                        lng: store.geometry[1]
                    }} 
                    onClick={() => {
                        setSelectedStore(store);
                    }}
                    icon={{
                        url: '/images/SVG/location-pin.svg',
                        scaledSize: new window.google.maps.Size(35, 35),
                        strokeColor: ""
                    }}
                />
            ))}

            {selectedStore && (
                <InfoWindow
                    position={{
                        lat: selectedStore.geometry[0], 
                        lng: selectedStore.geometry[1]
                    }}
                    onCloseClick={() => {
                        setSelectedStore(null);
                    }}
                >
                    <div>
                        <h4>{selectedStore.name}</h4>
                        <p>{selectedStore.description}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
        <div className="googlemap__size">
        <MapWrapped
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAVh7QgnkyCp-ZsOYXepGPk_EUvPzQwLck`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
        </div>
  );
}