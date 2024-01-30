type Props = {
  onClickHandler: () => void;
  children: string;
};

export const Button = (props: Props) => {
  const { onClickHandler, children } = props;

  return <button onClick={() => onClickHandler()}>{children}</button>;
};
