import ky, { Options, ResponsePromise } from 'ky';

const BASE_API_URL = '';

export const instance = ky.create({
  prefixUrl: BASE_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  hooks: {
    // TODO 인증 전 헤더 처리 로직 추가
    beforeRequest: [],
  },
});

export const parseJson = async <T>(res: ResponsePromise) => {
  try {
    return await res.json<T>();
  } catch (e) {
    // 에러 정의
    console.error('[fetcher.ts] parseJson에서 Json 파싱을 하는 도중 에러 발생');
    throw e;
  }
};
export const fetcher = {
  get: <T>(pathname: string, options?: Options) => parseJson<T>(ky.get(pathname, options)),
  post: <T>(pathname: string, options?: Options) => parseJson<T>(ky.post(pathname, options)),
  put: <T>(pathname: string, options?: Options) => parseJson<T>(ky.put(pathname, options)),
  patch: <T>(pathname: string, options?: Options) => parseJson<T>(ky.patch(pathname, options)),
  delete: <T>(pathname: string, options?: Options) => parseJson<T>(ky.delete(pathname, options)),
};
