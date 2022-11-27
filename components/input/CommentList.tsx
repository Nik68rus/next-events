import { IComment } from '../../types';
import classes from './CommentList.module.scss';

type Props = {
  items: IComment[];
};

function CommentList({ items }: Props) {
  if (!items.length) {
    return <p>No comments yet</p>;
  }
  return (
    <ul className={classes.comments}>
      {items.map((comment) => (
        <li key={comment._id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
