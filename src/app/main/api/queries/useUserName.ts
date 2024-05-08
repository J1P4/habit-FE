import { fetcher } from '@/commons/apis/fetcher';
import { useQuery } from '@tanstack/react-query';

interface ResponseUserName {
  data: {
    nickname: string;
  };
  error: any;
}
const getUserName = () => {
  return fetcher.get<ResponseUserName>('api/v1/user/nickname');
};

const useUserName = () => {
  return useQuery({
    queryKey: ['userName'],
    queryFn: getUserName,
    select: (data) => data.data.nickname,
  });
};
export default useUserName;
