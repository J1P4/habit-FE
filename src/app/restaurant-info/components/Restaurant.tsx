import React, { useState, useMemo } from 'react';
import MapComponent from './MapComponent';
import RestaurantLinkIcon from '..//restaurant-link-icon';
import Link from 'next/link';
import useCurrentPosition from '@/app/main/api/queries/useCurrentPosition';
import useGoogleApiInfo from '@/app/main/api/queries/useGoogleApiInfo';
import extractSearchKeyword from '@/app/main/uitls/extractSearchKeyword';
import useSearchRestaurant from '@/app/main/api/queries/useSearchRestaurant';
import removeHtmlTags from '@/app/restaurant-info/utils/removeHtmlTags';
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false); // 모달 표시 여부를 관리하는 상태
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
        lng: 127,
        lat: 375,
      };
    });
  }, [localResponse]);

  return (
    <div className="mx-10">
      {localList && <MapComponent localList={localList} />}
      <div className="rounded-lg m-4 ">
        <ul className="py-1">
          {localResponse?.data.items.map((local, index) => (
            <li key={index} className="pl-4 p-3 m-3 bg-white rounded-lg flex items-center">
              {local.total && <div>{local.total}</div>}
              <div className="flex-1">
                <h3 className="leading-extra-loose text-base font-semibold">
                  {removeHtmlTags(local.title)}
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
            {' '}
            {/* flex-col 클래스 추가 */}
            <p className="text-lg font-semibold mb-4">{food} 관련 주변 식당이 없습니다 😭</p>{' '}
            {/* mb-4 클래스 추가 */}
            <div className="mt-4">
              {' '}
              {/* mt-4 클래스 추가 */}
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
