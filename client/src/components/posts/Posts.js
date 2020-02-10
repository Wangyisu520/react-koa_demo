import React, { Component } from 'react'
import PostForm from './PostForm'
import { connect } from 'react-redux';
import  PropTypes  from 'prop-types';
import { getPosts } from '../../actions/postActions'
import Spinner from '../../common/Spinner'
import PostFeed from './PostFeed'

class Posts extends Component {

    componentDidMount() {
        this.props.getPosts()
    }
    render() {
        const { posts, loading ,icon_flag } = this.props.post;
        let postContent;
        if (posts === null || loading) {
            postContent = <Spinner />

        } else {
            postContent = <PostFeed posts={posts} icon_flag={icon_flag}/>
        }

        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {/* 展示评论表单 */}
                            <PostForm />
                            {/* 展示点赞内容 */}
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  }
  
  const mapStateToProps = state => ({
    post: state.post
  })
export default connect(mapStateToProps,{getPosts})(Posts)