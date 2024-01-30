// Types
import { ReactNode } from 'react';

type Props<T> = {
  data: Array<T>;
  listElement: (data: T) => ReactNode;
};

export const List = <T,>({ data, listElement }: Props<T>) =>
  data.map((data) => listElement(data));
