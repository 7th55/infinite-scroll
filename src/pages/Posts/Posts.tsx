// Hooks
import { usePosts } from './hooks';
// Components
import { PostsList } from 'widgets/PostsList/PostsList';

export const Posts = () => {
  const [fetchNextPage, { posts, isLoading, isError, isSuccess }] = usePosts();

  const postsListProps = {
    posts,
    isLoading,
    isError,
    isSuccess,
    nextPage: () => fetchNextPage(),
  };

  return <PostsList {...postsListProps} />;
};
