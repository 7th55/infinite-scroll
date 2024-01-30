// Hooks
import { useDeferredValue, useEffect, useState } from 'react';
// Types
import { ReactNode, SyntheticEvent } from 'react';
// Styles
import './styles.css';

export type InfiniteScrollListProps<T> = {
  mode: 'fetch';
  fetchStatus: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  importantStylesConsts: {
    listHTMLElementHeight: number;
    getNextHTMLElementHeight: number;
  };
  data: Array<T> | undefined;
  next: () => void;
  listComponent: (data: Array<T>) => ReactNode;
  statusComponents?: {
    loading?: ReactNode;
    error?: ReactNode;
  };
  className?: string | 'infinite-scroll-list';
};

export const InfiniteScrollList = <T,>(props: InfiniteScrollListProps<T>) => {
  const {
    fetchStatus: { isLoading, isError, isSuccess },
    data,
    next,
    listComponent,
    importantStylesConsts: {
      listHTMLElementHeight = 300,
      getNextHTMLElementHeight = 50,
    },
    statusComponents,
    className = 'infinite-scroll-list',
  } = props;

  const [list, setList] = useState<Array<T>>([]);

  const deferredList = useDeferredValue(list);

  const loading = isLoading && statusComponents && statusComponents.loading;
  const gotError = isError && statusComponents && statusComponents.error;
  const listStatus = loading || gotError || isSuccess;

  const readyToSetList = isLoading === false && isSuccess && data;

  useEffect(() => {
    readyToSetList && setList((p) => [...p, ...data]);
  }, [readyToSetList, data]);

  const onScrollListHandler = (e: SyntheticEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;

    const scrollableArea =
      element.scrollHeight - element.offsetHeight - getNextHTMLElementHeight;
    const needToGetNextElements = element.scrollTop > scrollableArea;

    if (needToGetNextElements) {
      readyToSetList && next();
    }
  };

  return (
    <div
      onScroll={onScrollListHandler}
      style={{ height: `${listHTMLElementHeight}px` }}
      className={className}
    >
      {listComponent(deferredList)}
      <div
        style={{
          height: `${getNextHTMLElementHeight}px`,
        }}
      >
        {listStatus}
      </div>
    </div>
  );
};
