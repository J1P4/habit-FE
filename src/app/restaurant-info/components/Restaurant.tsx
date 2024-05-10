import React, { useState, useEffect, useMemo } from 'react';
import MapComponent from './MapComponent';
import RestaurantLinkIcon from '..//restaurant-link-icon';
import Link from 'next/link';
import useCurrentPosition from '@/app/main/api/queries/useCurrentPosition';
import useGoogleApiInfo from '@/app/main/api/queries/useGoogleApiInfo';
import extractSearchKeyword from '@/app/main/uitls/extractSearchKeyword';
import useSearchRestaurant from '@/app/main/api/queries/useSearchRestaurant';

interface Ilocal {
  title: string;
  link: string;
  roadAddress: string;
  description: string;
  total: number;
  mapx: number;
  mapy: number;
}

interface IGetlocalListResult {
  items: Ilocal[];
}

interface RestaurantComponentProps {
  food: string;
}

const RestaurantComponent: React.FC<RestaurantComponentProps> = ({ food }) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const { data: currentPosition, isLoading: isCurrentPositionLoading } = useCurrentPosition();
  const latitude = currentPosition?.coords?.latitude as number;
  const longitude = currentPosition?.coords?.longitude as number;

  const { data: googleApiInfo, isLoading: isGoogleApiLoading } = useGoogleApiInfo(
    latitude,
    longitude,
  );

  const address = googleApiInfo?.data.results[0].formatted_address;

  const searchKeyword = extractSearchKeyword(address);
  const { data: localResponse, isLoading: isSearchRestaurantLoading } = useSearchRestaurant(
    searchKeyword,
    food,
  );

  const localList = useMemo(() => {
    return localResponse?.data.items.map((local) => {
      return {
        title: local.title,
        address: local.roadAddress, // Change to address field
      };
    });
  }, [localResponse]);

  // Show popup when no items are returned
  useEffect(() => {
    if (localResponse?.data.items.length === 0) {
      setShowPopup(true);
    }
  }, [localResponse]);

  return (
    <div className="mx-10">
      {localList && localList.length > 0 && <MapComponent localList={localList} />}
      <div className="rounded-lg m-4 ">
        <ul className="py-1">
          {localResponse?.data.items.map((local, index) => (
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
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md relative flex flex-col items-center">
            <p className="text-lg font-semibold mb-4">{food} 관련 주변 식당이 없습니다 😭</p>
            <div className="mt-4">
              <Link href="/recommend-food-info">
                <div className="w-20 text-center bg-[#FF9385] hover:bg-gray-400 text-white font-semibold py-1.5 px-3 rounded">
                  닫기
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantComponent;