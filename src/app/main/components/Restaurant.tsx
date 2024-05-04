//Restaurant.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
  const BASE_PATH = `/v1/search/local.json?`;

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
                display: 5,
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
                  function removeHTMLTags(string) {
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // 캐러셀에서 한 번에 표시할 항목 수
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="mx-5 h-full border border-solid border-[#EBEBEB] rounded-lg">
      <Slider {...settings}>
        {localList.map((local, index) => (
          <div key={index} className="pl-4 p-3 m-3  flex items-center">
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
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RestaurantComponent;
