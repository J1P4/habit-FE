import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';
import RestaurantLinkIcon from '..//restaurant-link-icon';
import Link from 'next/link';

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
  category: string;
}

const RestaurantComponent: React.FC<RestaurantComponentProps> = ({ food, category }) => {
  const [localList, setlocalList] = useState<Ilocal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false); // 모달 표시 여부를 관리하는 상태

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
              const relevantParts = addressParts.filter(part => part.includes('동') || part.includes('구'));
              let filteredKeyword = relevantParts.join(' ').replace('구', '');
              // '동로'가 있으면 '동'으로 바꿔줍니다.
              filteredKeyword = filteredKeyword.replace('동로', '동');
              return filteredKeyword.trim();
            }
            
            const extractFoodKeyword = (food: string): string => {
              // 괄호가 있는 경우 괄호 앞의 단어를 반환합니다.
              if (food.includes('(')) {
                return food.split('(')[0];
              }
              // 띄어쓰기가 있는 경우 첫 번째 단어를 반환합니다.
              if (food.includes(' ')) {
                return food.split(' ')[0];
              }
              // 그 외의 경우에는 그대로 반환합니다.
              return food;
            };

            if (category) {
              const removeRyu = (category: string): string => {
                const parts = category.split(' ');
                const filteredParts = parts.filter(part => !part.includes('류'));
                return filteredParts.join(' ');
              };

              const categoryWithoutRyu = removeRyu(category);
              // 이후 검색에 categoryWithoutRyu를 사용합니다.
            
            } else {
              // category가 없는 경우에 대한 처리를 수행합니다.
            }

            const searchKeyword = extractSearchKeyword(address);
            const foodKeyword = extractFoodKeyword(food);
            
            const localResponse = await axios.get<IGetlocalListResult>(BASE_PATH, {
              params: {
                query: `${searchKeyword} ${foodKeyword}`,
                display: 5,
              },
              headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-Naver-Client-Id': 'DS9Rk5eeFu3hi4cYgc6G',
                'X-Naver-Client-Secret': '0VNIsyrJNt',
              },
            });

            if (localResponse.data.items.length === 0) {
              // 검색 결과가 없는 경우 category로 검색합니다.
              const categoryResponse = await axios.get<IGetlocalListResult>(BASE_PATH, {
                params: {
                  query: `categoryWithoutRyu`,
                  display: 5,
                },
                headers: {
                  'X-Requested-With': 'XMLHttpRequest',
                  'X-Naver-Client-Id': 'DS9Rk5eeFu3hi4cYgc6G',
                  'X-Naver-Client-Secret': '0VNIsyrJNt',
                },
              });

              setlocalList(categoryResponse.data.items);
              setShowPopup(true); // 결과가 없는 경우 모달을 표시
            } else {
              // 검색 결과가 있는 경우에는 해당 결과를 설정합니다.
              setlocalList(localResponse.data.items);
            }
            
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
  }, [food, category]);

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
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md relative flex flex-col items-center"> {/* flex-col 클래스 추가 */}
          <p className="text-lg font-semibold mb-4">{food} 관련 주변 식당이 없습니다 😭</p> {/* mb-4 클래스 추가 */}
          <div className="mt-4"> {/* mt-4 클래스 추가 */}
            <Link href="/recommend-food-info">
              <div className="w-20 text-center bg-[#FF9385] hover:bg-gray-400 text-white font-semibold py-1.5 px-3 rounded">닫기</div>
            </Link>
          </div>
        </div>
      </div>
      
      )}
    </div>
  );
};

export default RestaurantComponent;
