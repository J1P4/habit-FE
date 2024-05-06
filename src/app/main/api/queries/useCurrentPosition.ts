import { useQuery } from '@tanstack/react-query';

const getCurrentPosition = () => {
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
