// Components
import { InfiniteScrollList } from 'features/InfiniteScrollList/InfiniteScrollList';
import { List } from 'shared/List/List';
import { PostCard } from 'entities/PostCard/PostCard';
import { LoadingComponent } from 'shared/LoadingComponent/LoadingComponent';
import { ErrorComponent } from 'shared/ErrorComponent/ErrorComponent';
// Consts
import { GET_NEXT_HTMLElement_HEIGHT, LIST_HEIGHT } from './consts';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Posts = Array<Post> | undefined;

type Props = {
  posts: Posts;
  nextPage: () => void;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};

export const PostsList = (props: Props) => {
  const { posts, nextPage, isLoading, isError, isSuccess } = props;
  return (
    <InfiniteScrollList
      mode="fetch"
      data={posts}
      next={nextPage}
      fetchStatus={{ isLoading, isError, isSuccess }}
      listComponent={(postsList) => (
        <List
          data={postsList}
          listElement={(post) => (
            <PostCard variants="short" key={post.id} post={post} />
          )}
        />
      )}
      importantStylesConsts={{
        listHTMLElementHeight: LIST_HEIGHT,
        getNextHTMLElementHeight: GET_NEXT_HTMLElement_HEIGHT,
      }}
      statusComponents={{
        loading: <LoadingComponent />,
        error: <ErrorComponent />,
      }}
    />
  );
};
