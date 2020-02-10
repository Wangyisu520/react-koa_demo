import React from 'react'
import CommentItem from './CommnetItem';
import { PropTypes } from 'prop-types';
const CommentFeed = (props) => {

  const { comments, postId } = props;
  return comments.map(comment => <CommentItem key={comment._id} comment={comment} postId={postId} />)

}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
}

export default CommentFeed;