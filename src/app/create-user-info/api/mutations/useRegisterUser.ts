import { fetcher } from '@/commons/apis/fetcher';
import { CreateUserInfoValues } from '@/app/create-user-info/context/create-user-info-context';
import { useMutation } from '@tanstack/react-query';

// Type CreateUserInfoValues 위로 빼내기
const registerUser = (body: CreateUserInfoValues) => {
  return fetcher.post<CreateUserInfoValues>(`/v1/auth/register`, {
    json: body,
  });
};

const useRegisterUser = () => {
  return useMutation({
    mutationFn: (body: CreateUserInfoValues) => registerUser(body),
  });
};

export default useRegisterUser;
