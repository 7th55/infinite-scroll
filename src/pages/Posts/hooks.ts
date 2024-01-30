// Hooks
import { useCallback, useEffect, useRef } from 'react';
import { Posts, useGetPostsByPageMutation } from '../api/postsApi';
// Consts
import { POSTS_PAGES } from '../api/consts';

type PostsHandler = (page?: number, limit?: number) => void;

type UsePostsType = () => [
  PostsHandler,
  {
    posts: Posts | undefined;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }
];

export const usePosts: UsePostsType = () => {
  const ref = useRef({
    page: 1,
  });

  const setPageValueRef = (refObj: typeof ref, page: number) =>
    (refObj.current.page = page);

  const [update, { data, isSuccess, isError, isLoading }] =
    useGetPostsByPageMutation();

  const getPosts: PostsHandler = useCallback(
    (page) => update({ page }),
    [update]
  );

  const nextPage: PostsHandler = () =>
    ref.current.page < POSTS_PAGES &&
    getPosts(setPageValueRef(ref, ref.current.page + 1));

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return [nextPage, { posts: data, isLoading, isError, isSuccess }];
};
