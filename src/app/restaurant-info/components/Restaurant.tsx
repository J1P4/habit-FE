import axios from 'axios';
import { useState, useEffect } from 'react';
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

const RestaurantComponent = ({ food }: RestaurantComponentProps) => {

  // RestaurantComponent 내부에서 상태값으로 선택된 마커의 인덱스를 추적할 수 있도록 useState 사용
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState<number | null>(null);

  const BASE_PATH = "/v1/search/local.json?";
  const DEFAULT_LATITUDE = 37.557;
  const DEFAULT_LONGITUDE = 126.99;
  const DEFAULT_ZOOM = 12;

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
              key: 'AIzaSyCwrWwOutdytyZU67z3z5a9KmrewnqoCcc'
            }
          });
          const address = response.data.results[0].formatted_address;

          // 사용자의 현재 주소에서 '동'이나 '로'와 같은 세부 정보를 추출하는 함수
          function extractSearchKeyword(address: string): string {
            const addressParts = address.split(' ');
            const keyword = addressParts.find(part => part.includes('로') || part.includes('구'));
            return keyword ? keyword : '';
          }
          const searchKeyword = extractSearchKeyword(address);

          // 네이버 검색 API를 사용하여 안심식당 검색
          const localResponse = await axios.get<IGetlocalListResult>(BASE_PATH, {
            params: {
              query: `${searchKeyword} ${food}맛집 안심식당`, // 검색 쿼리에 searchKeyword 추가
              display: 10,
            },
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "X-Naver-Client-Id": 'DS9Rk5eeFu3hi4cYgc6G',
              "X-Naver-Client-Secret": '0VNIsyrJNt',
            },
          });

         

          // 검색 결과에 대해 좌표로 변환하여 업데이트
          const updatedlocalList = await Promise.all(localResponse.data.items.map(async (item) => {
            try {
              const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
                params: {
                  address: item.roadAddress,
                  key: 'AIzaSyCwrWwOutdytyZU67z3z5a9KmrewnqoCcc'
                }
              });
              const location = response.data.results[0].geometry.location;

              function removeHTMLTags(string) {
                return string.replace(/<[^>]*>/g, '');
              }
              
              const cleanedTitle = removeHTMLTags(item.title); // HTML 태그 제거

              return { ...item, latitude: location.lat, longitude: location.lng, title: cleanedTitle };
            } catch (error) {
              console.error('Error converting address to coordinates:', error);
              return item;
            }
          }));

          setlocalList(updatedlocalList);
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
        <LoadScript googleMapsApiKey="AIzaSyCwrWwOutdytyZU67z3z5a9KmrewnqoCcc">
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '400px' }}
            center={{ lat: DEFAULT_LATITUDE, lng: DEFAULT_LONGITUDE }}
            zoom={DEFAULT_ZOOM}
          >
            {localList.map((local, index) => (
              <Marker
              key={index}
              position={{ lat: local.latitude || DEFAULT_LATITUDE, lng: local.longitude || DEFAULT_LONGITUDE }}
              title={local.title} // 마커에 식당 이름 설정
              onClick={() => setSelectedMarkerIndex(index)} // 마커를 클릭했을 때 선택된 마커의 인덱스 설정
            >
              {selectedMarkerIndex === index && (
                <InfoWindow
                  onCloseClick={() => setSelectedMarkerIndex(null)} // InfoWindow를 닫을 때 선택된 마커의 인덱스 초기화
                >
                  <div>
                    <h3>{local.title}</h3> {/* InfoWindow 내부에 식당 이름 표시 */}
                  </div>
                </InfoWindow>
              )}
            </Marker>
            ))}
          </GoogleMap>
        </LoadScript>
        <ul>
          {localList.map((local, index) => (
            <li key={index} className="p-5 m-5 bg-white rounded-lg">
              {local.total && <div>{local.total}</div>}
              <div>
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
