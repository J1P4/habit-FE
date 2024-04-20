import { fetcher } from '@/commons/apis/fetcher';
import { CreateUserInfoValues } from '@/app/create-user-info/context/create-user-info-context';
import { useMutation } from '@tanstack/react-query';

// Type CreateUserInfoValues 위로 빼내기
interface registerUserResponse {
  data: {
    accessToken: string;
  };
  error: any;
}
const registerUser = (body: CreateUserInfoValues) => {
  console.log('aa', fetcher.post);
  return fetcher.post<registerUserResponse>(`api/v1/auth/register`, {
    json: body,
  });
};

const useRegisterUser = () =>
  useMutation({
    mutationFn: (body: CreateUserInfoValues) => registerUser(body),
  });

export default useRegisterUser;
