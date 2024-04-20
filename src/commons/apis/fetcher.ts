import ky, { Options, ResponsePromise } from 'ky';

const BASE_API_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const instance = ky.create({
  prefixUrl: BASE_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (!response.ok) {
          const body = await response.json();
          if (body) {
            throw new Error(body.message);
          }
        }
      },
    ],
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
  get: <T>(pathname: string, options?: Options) => parseJson<T>(instance.get(pathname, options)),
  post: <T>(pathname: string, options?: Options) => parseJson<T>(instance.post(pathname, options)),
  put: <T>(pathname: string, options?: Options) => parseJson<T>(instance.put(pathname, options)),
  patch: <T>(pathname: string, options?: Options) =>
    parseJson<T>(instance.patch(pathname, options)),
  delete: <T>(pathname: string, options?: Options) =>
    parseJson<T>(instance.delete(pathname, options)),
};
