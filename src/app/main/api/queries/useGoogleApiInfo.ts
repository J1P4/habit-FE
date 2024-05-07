import { fetcher } from '@/commons/apis/fetcher';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchGoogleApiInfo = async (latitude: number, longitude: number) => {
  return await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCwrWwOutdytyZU67z3z5a9KmrewnqoCcc`,
  );
};

const useGoogleApiInfo = (latitude: number, longitude: number) => {
  return useQuery({
    queryKey: ['googleApiInfo', latitude, longitude],
    queryFn: () => fetchGoogleApiInfo(latitude, longitude),
    enabled: !!latitude && !!longitude,
  });
};

export default useGoogleApiInfo;
