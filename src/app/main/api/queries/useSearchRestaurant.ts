import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

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

const getSearchRestaurant = async (searchKeyword: string, food: any) =>
  axios.get<IGetlocalListResult>('/v1/search/local.json', {
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

// const updatedlocalList = await Promise.all(
//     localResponse.data.items.map(async (item) => {
//       try {
//         const response = await axios.get(
//             `https://maps.googleapis.com/maps/api/geocode/json`,
//             {
//               params: {
//                 address: item.roadAddress,
//                 key: 'AIzaSyCwrWwOutdytyZU67z3z5a9KmrewnqoCcc',
//               },
//             },
//         );
//         const location = response.data.results[0].geometry.location;
//         function removeHTMLTags(string) {
//           return string.replace(/<[^>]*>/g, '');
//         }
//         const cleanedTitle = removeHTMLTags(item.title);
//         return {
//           ...item,
//           latitude: location.lat,
//           longitude: location.lng,
//           title: cleanedTitle,
//         };
//       } catch (error) {
//         console.error('Error converting address to coordinates:', error);
//         return item;
//       }
//     }),
// );

const useSearchRestaurant = (searchKeyword: string, food: string) => {
  return useQuery({
    queryKey: ['searchRestaurant', searchKeyword, food],
    queryFn: () => getSearchRestaurant(searchKeyword, food),
    enabled: !!searchKeyword && !!food,
  });
};

export default useSearchRestaurant;
