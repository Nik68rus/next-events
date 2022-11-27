import { useState, useEffect } from 'react';

import CommentList from './CommentList';
import NewComment from './NewComment';
import classes from './Comments.module.scss';
import { IComment, ICommentBody } from '../../types';
import { toast } from 'react-toastify';

type Props = {
  eventId: string;
};

function Comments(props: Props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = (evId: string) => {
    setLoading(true);
    fetch(`/api/comments/${evId}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);

        if (data.ok) {
          setComments(data.comments);
        } else {
          throw new Error(data.message);
        }
      })
      .catch((err) => toast(err.message));
  };

  useEffect(() => {
    if (showComments) {
      fetchComments(eventId);
    }
  }, [eventId, showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: ICommentBody) {
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          fetchComments(eventId);
        } else {
          toast(data.message);
        }
      })
      .catch((err) =>
        toast(err.message || 'Something wrong! Try again later!')
      );
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && loading && <p>Loading...</p>}
      {showComments && !loading && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
