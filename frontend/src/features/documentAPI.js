import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config/index';

export const documentApi = createApi({
  reducerPath: 'documentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
         getState().files.id;
        //  const id =
        // if (token) {
        //   headers.set('authorization', `Token ${token}`);
        // }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append('document', file);
        return {
          url: '/api/files/',
          method: 'POST',
          body: formData,
        };
      },
    }),
    fetchLatestFile: builder.query({
      query: (fileId) => `/api/files/${fileId}/`,
    }),
  }),
});

export const { useUploadFileMutation, useFetchLatestFileQuery } = documentApi;
