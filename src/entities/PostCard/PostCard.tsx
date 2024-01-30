// Hooks
import { useNavigate } from 'react-router-dom';
// Components
import { Button } from 'shared/Button/Button';
// Styles
import './styles.css';

export type PostCard = {
  id: number;
  title: string;
  body: string;
};

type Props = {
  variants: 'short' | 'long';
  post: PostCard;
};

export const PostCard = (props: Props) => {
  const { variants, post } = props;

  switch (variants) {
    case 'short':
      return <ShortCard {...post} />;
    case 'long':
      return <LongCard {...post} />;
  }
};

const ShortCard = ({ id, title, body }: PostCard) => {
  const navigate = useNavigate();

  return (
    <section className="short-card">
      <span className="short-card__header">
        {id}. <h3 style={{ display: 'inline' }}>{title}</h3> {body}
      </span>
      <div className="short-card__button">
        <Button onClickHandler={() => navigate(`/${id}`)}>View Post</Button>
      </div>
    </section>
  );
};

const LongCard = ({ id, title, body }: PostCard) => {
  const navigate = useNavigate();

  return (
    <section className="long-card">
      <h3 className="long-card__header">
        {id}. {title}
      </h3>
      <p className="long-card__body">{body}</p>
      <div className="long-card__button">
        <Button onClickHandler={() => navigate(`/`)}>Back to Posts</Button>
      </div>
    </section>
  );
};
