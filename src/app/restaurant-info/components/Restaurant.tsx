import axios from 'axios';
import { useState, useEffect } from 'react';

interface Ilocal {
  title: string;
  link: string;
  roadAddress: string;
  description: string;
}

export interface IGetlocalListResult {
  items: Ilocal[];
}

const RestaurantComponent = ({ restaurantInfo }) => {
  // restaurantInfo로부터 정보를 추출합니다.
  const { title, roadAddress, imageURL, description } = restaurantInfo;

  const BASE_PATH = "/v1/search/local.json?";

  const [localList, setlocalList] = useState<Ilocal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchlocalList = async () => {
      try {
        const response = await axios.get<IGetlocalListResult>(BASE_PATH, {
          params: {
            query: "갈비 맛집",
            sort: "random",
            display: 10,
          },
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "X-Naver-Client-Id": 'DS9Rk5eeFu3hi4cYgc6G',
            "X-Naver-Client-Secret": '0VNIsyrJNt',
          },
        });

        const cleanedData = response.data.items.map(item => ({
          ...item,
          title: item.title.replace(/(<([^>]+)>)/gi, ""),
          roadAddress: item.roadAddress.replace(/(<([^>]+)>)/gi, ""),
          description: item.description.replace(/(<([^>]+)>)/gi, "")
        }));

        setlocalList(cleanedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching local:', error);
        setError('Failed to fetch local');
        setLoading(false);
      }
    };

    fetchlocalList();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-gray-100 rounded-lg mx-10">
      <div className="mt-4 h-full">
        <ul >
          {localList.map((local, index) => (
            <li key={index} className="p-5 m-5 bg-white rounded-lg">
              <img></img>
              <div >
                <h3 className="leading-extra-loose text-base font-semibold">{local.title}</h3>
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
