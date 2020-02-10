import React from 'react'
import PostItem from './PostItem'
import PropTypes from 'prop-types';

const PostFeed = (props) => {

    const { posts, icon_flag } = props;

    return posts.map(post => <PostItem key={post._id} post={post} icon_flag={icon_flag} />)

}
PostFeed.propTypes = {
    posts: PropTypes.array.isRequired
}
export default PostFeed