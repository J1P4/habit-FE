import { useQuery } from '@tanstack/react-query';

interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
}

const getCurrentPosition = (): Promise<Position> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const useCurrentPosition = () => {
  return useQuery({
    queryKey: ['currentPosition'],
    queryFn: getCurrentPosition,
  });
};

export default useCurrentPosition;
