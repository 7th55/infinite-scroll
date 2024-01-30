// Hooks
import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../api/postsApi';
// Components
import { PostCard } from 'entities/PostCard/PostCard';
import { ErrorComponent } from 'shared/ErrorComponent/ErrorComponent';
import { LoadingComponent } from 'shared/LoadingComponent/LoadingComponent';

export const Post = () => {
  const { postId } = useParams();
  const { data, isLoading, isError, isSuccess } = useGetPostByIdQuery(
    Number(postId)
  );

  if (isLoading) {
    return <LoadingComponent />;
  } else if (isError) {
    return <ErrorComponent />;
  } else {
    return isSuccess && <PostCard variants="long" post={data} />;
  }
};
