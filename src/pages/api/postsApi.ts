import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// Consts
import { BASE_URL, POSTS_LIMIT } from './consts';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Posts = Array<Post>;

type GetPostsByPage = {
  page: number | void;
  limit: number | void | typeof POSTS_LIMIT;
};

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getPostsByPage: builder.mutation<Posts, Partial<GetPostsByPage>>({
      query: ({ page = 1, limit = POSTS_LIMIT }) =>
        `?&_page=${page}&_limit=${limit}`,
    }),
    getPostById: builder.query<Post, number>({
      query: (id: number) => `/${id}`,
    }),
  }),
});

// Hooks
export const { useGetPostsByPageMutation, useGetPostByIdQuery } = postsApi;
