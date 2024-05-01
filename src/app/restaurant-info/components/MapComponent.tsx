import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

interface Ilocal {
  title: string;
  latitude?: number;
  longitude?: number;
}

interface MapComponentProps {
  localList: Ilocal[];
}

const MapComponent: React.FC<MapComponentProps> = ({ localList }) => {
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<number | null>(null);
  const [currentPosition, setCurrentPosition] = useState<GeolocationPosition | null>(null);
  const DEFAULT_LATITUDE = 37.5665;
  const DEFAULT_LONGITUDE = 126.9780;
  const DEFAULT_ZOOM = 13;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition(position);
      },
      (error) => {
        console.error('Error getting current position:', error);
      }
    );
  }, []);

  return (
    <div className="map-container">
      {currentPosition && ( // 현재 위치가 있을 때만 지도를 렌더링
        <LoadScript googleMapsApiKey="AIzaSyCwrWwOutdytyZU67z3z5a9KmrewnqoCcc">
          <GoogleMap
            mapContainerStyle={{ width: '90%', height: '350px', margin: 'auto', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0.5, 0.2)' }}
            center={{ lat: currentPosition.coords.latitude, lng: currentPosition.coords.longitude }} // 현재 위치를 기준으로 지도 중심 설정
            zoom={DEFAULT_ZOOM}
          >
            {localList.map((local, index) => (
              <Marker
                key={index}
                position={{ lat: local.latitude || DEFAULT_LATITUDE, lng: local.longitude || DEFAULT_LONGITUDE }}
                title={local.title}
                onClick={() => setSelectedMarkerIndex(index)}
              >
                {selectedMarkerIndex === index && (
                  <InfoWindow
                    onCloseClick={() => setSelectedMarkerIndex(null)}
                  >
                    <div>
                      <h3>{local.title}</h3>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))}
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

export default MapComponent;
