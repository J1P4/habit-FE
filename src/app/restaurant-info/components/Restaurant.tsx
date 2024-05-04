//Restaurant.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';
import RestaurantLinkIcon from '..//restaurant-link-icon';
import { GoogleMap, Marker, LoadScript, InfoWindow } from '@react-google-maps/api';

interface Ilocal {
  title: string;
  link: string;
  roadAddress: string;
  description: string;
  total: number;
}

interface IGetlocalListResult {
  items: Ilocal[];
}

interface RestaurantComponentProps {
  food: string;
}

const RestaurantComponent: React.FC<RestaurantComponentProps> = ({ food }) => {
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<number | null>(null);
  const [localList, setlocalList] = useState<Ilocal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const BASE_PATH = '/v1/search/local.json?';

  useEffect(() => {
    const fetchlocalList = async () => {
      try {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
              params: {
                latlng: `${latitude},${longitude}`,
                key: 'AIzaSyCwrWwOutdytyZU67z3z5a9KmrewnqoCcc',
              },
            });
            const address = response.data.results[0].formatted_address;
            function extractSearchKeyword(address: string): string {
              const addressParts = address.split(' ');
              const keyword = addressParts.find(
                (part) => part.includes('로') || part.includes('구'),
              );
              return keyword ? keyword : '';
            }
            const searchKeyword = extractSearchKeyword(address);
            const localResponse = await axios.get<IGetlocalListResult>(BASE_PATH, {
              params: {
                query: `${searchKeyword} ${food}맛집 안심식당`,
                display: 10,
              },
              headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-Naver-Client-Id': 'DS9Rk5eeFu3hi4cYgc6G',
                'X-Naver-Client-Secret': '0VNIsyrJNt',
              },
            });
            const updatedlocalList = await Promise.all(
              localResponse.data.items.map(async (item) => {
                try {
                  const response = await axios.get(
                    `https://maps.googleapis.com/maps/api/geocode/json`,
                    {
                      params: {
                        address: item.roadAddress,
                        key: 'AIzaSyCwrWwOutdytyZU67z3z5a9KmrewnqoCcc',
                      },
                    },
                  );
                  const location = response.data.results[0].geometry.location;
                  function removeHTMLTags(string: string) {
                    return string.replace(/<[^>]*>/g, '');
                  }
                  const cleanedTitle = removeHTMLTags(item.title);
                  return {
                    ...item,
                    latitude: location.lat,
                    longitude: location.lng,
                    title: cleanedTitle,
                  };
                } catch (error) {
                  console.error('Error converting address to coordinates:', error);
                  return item;
                }
              }),
            );
            setlocalList(updatedlocalList);
            setLoading(false);
          },
          (error) => {
            console.error('Error getting current position:', error);
            setLoading(false);
            setError('Failed to get current position');
          },
        );
      } catch (error) {
        console.error('Error fetching local:', error);
        setError('Failed to fetch local');
        setLoading(false);
      }
    };
    fetchlocalList();
  }, [food]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-10 h-screen">
      <MapComponent localList={localList} />
      <div className="bg-gray-100 rounded-lg m-4 overflow-y-scroll" style={{ maxHeight: '400px' }}>
        <ul className="py-1">
          {localList.map((local, index) => (
            <li key={index} className="pl-4 p-3 m-3 bg-white rounded-lg flex items-center">
              {local.total && <div>{local.total}</div>}
              <div className="flex-1">
                <h3 className="leading-extra-loose text-base font-semibold">
                  {local.title.replace(/&amp;/g, '&')}
                </h3>
                <p className="leading-extra-loose text-xs font-semibold text-gray-600">
                  {local.roadAddress}
                </p>
                <p className="leading-extra-loose text-xs text-gray-600">{local.description}</p>
              </div>
              {local.link && (
                <p className="leading-extra-loose text-xs text-gray-600 mr-1.5">
                  <a href={local.link} target="_blank" rel="noopener noreferrer">
                    <RestaurantLinkIcon></RestaurantLinkIcon>
                  </a>
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantComponent;
