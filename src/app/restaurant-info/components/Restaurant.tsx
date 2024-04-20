import axios from 'axios';
import { useState, useEffect } from 'react';

interface Ilocal {
  title: string;
  link: string;
  roadAddress: string;
  description: string;
  total: number;
}

export interface IGetlocalListResult {
  items: Ilocal[];
}

interface RestaurantComponentProps {
  food: string;
}

const RestaurantComponent = ({ food }: RestaurantComponentProps) => {
  const BASE_PATH = "/v1/search/local.json?";
  const [localList, setlocalList] = useState<Ilocal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchlocalList = async () => {
      try {
        // 사용자의 현재 위치 가져오기
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          // 위치 정보를 주소로 변환
          const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
              latlng: `${latitude},${longitude}`,
              key: 'AIzaSyCFsJnEaYAZ0r-Ln8haZIzGcP3t2McU3dc'
            }
          });

          const address = response.data.results[0].formatted_address;

          const decodedAddress = decodeURIComponent(address);

          // 사용자의 현재 주소에서 '동'이나 '로'와 같은 세부 정보를 추출하는 함수
          function extractSearchKeyword(address: string): string {
            // 주소를 공백으로 분리하여 배열로 만듭니다.
            const addressParts = address.split(' ');

            // '동'이나 '로'와 같은 세부 정보를 찾습니다.
            const keyword = addressParts.find(part => part.includes('로') || part.includes('구'));

            // 찾은 세부 정보를 반환합니다. 없으면 빈 문자열을 반환합니다.
            return keyword ? keyword : '';
          }


          // '동'이나 '로'와 같은 세부 정보 추출
          const searchKeyword = extractSearchKeyword(address);
          
          console.log(searchKeyword);

          // 검색 키워드를 기반으로 식당 검색
          const localResponse = await axios.get<IGetlocalListResult>(BASE_PATH, {
            params: {
              query: `${searchKeyword} ${food} `,
              sort: "random",
              display: 10,
            },
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "X-Naver-Client-Id": 'DS9Rk5eeFu3hi4cYgc6G',
              "X-Naver-Client-Secret": '0VNIsyrJNt',
            },
          });

          const cleanedData = localResponse.data.items.map(item => ({
            ...item,
            title: item.title.replace(/(<([^>]+)>)/gi, ""),
            roadAddress: item.roadAddress.replace(/(<([^>]+)>)/gi, ""),
            description: item.description.replace(/(<([^>]+)>)/gi, "")
          }));

          setlocalList(cleanedData);
          setLoading(false);
        }, (error) => {
          console.error('Error getting current position:', error);
          setLoading(false);
          setError('Failed to get current position');
        });
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
    <div className="bg-gray-100 rounded-lg mx-10">
      <div className="mt-4 h-full">
        <ul >
          {localList.map((local, index) => (
            <li key={index} className="p-5 m-5 bg-white rounded-lg">
              {local.total && <div>{local.total}</div>}
              <div >
              <h3 className="leading-extra-loose text-base font-semibold">{local.title.replace(/&amp;/g, '&')}</h3>
                <p className="leading-extra-loose text-xs font-semibold text-gray-600">{local.roadAddress}</p>
                <p className="leading-extra-loose text-xs text-gray-600">{local.description}</p>
                <p className="leading-extra-loose text-xs text-gray-600"> <a href={local.link} target="_blank" rel="noopener noreferrer"> 식당 링크</a>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantComponent;
