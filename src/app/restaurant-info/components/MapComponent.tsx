import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

interface ILocal {
  title: string;
  address: string; // Add address field to localList interface
}

interface MapComponentProps {
  localList: ILocal[];
}

const MapComponent: React.FC<MapComponentProps> = ({ localList }) => {
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<number | null>(null);
  const [currentPosition, setCurrentPosition] = useState<GeolocationPosition | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number }[]>([]); // Add coordinates state
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

  // Function to convert address to coordinates
  const convertAddressToCoordinates = async (address: string): Promise<{ latitude: number; longitude: number }> => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: address,
          key: 'AIzaSyCwrWwOutdytyZU67z3z5a9KmrewnqoCcc', // Replace with your Google Maps API key
        }
      });
      const location = response.data.results[0].geometry.location;
      return { latitude: location.lat, longitude: location.lng };
    } catch (error) {
      console.error('Error converting address to coordinates:', error);
      return { latitude: DEFAULT_LATITUDE, longitude: DEFAULT_LONGITUDE };
    }
  };

  // Fetch coordinates for each address in localList
  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const coordinates = await Promise.all(
          localList.map(async (local) => {
            const { address } = local;
            const { latitude, longitude } = await convertAddressToCoordinates(address);
            return { latitude, longitude };
          })
        );
        setCoordinates(coordinates);
        setLoading(false); // Set loading state to false after coordinates are fetched
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };
    fetchCoordinates();
  }, [localList]); // Add localList to the dependency array

  if (loading) return <p>Loading...</p>; // Show loading indicator

  return (
    <div className="map-container">
      {currentPosition && (
        <LoadScript googleMapsApiKey="AIzaSyCwrWwOutdytyZU67z3z5a9KmrewnqoCcc">
          <GoogleMap
            mapContainerStyle={{ width: '90%', height: '350px', margin: 'auto', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0.5, 0.2)' }}
            center={{ lat: currentPosition.coords.latitude, lng: currentPosition.coords.longitude }}
            zoom={DEFAULT_ZOOM}
          >
            {coordinates.map((coordinate, index) => (
              <Marker
                key={index}
                position={{ lat: coordinate.latitude || DEFAULT_LATITUDE, lng: coordinate.longitude || DEFAULT_LONGITUDE }}
                title={localList[index].title}
                onClick={() => setSelectedMarkerIndex(index)}
              >
                {selectedMarkerIndex === index && (
                  <InfoWindow
                    onCloseClick={() => setSelectedMarkerIndex(null)}
                  >
                    <div>
                      <h3>{localList[index].title}</h3>
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
