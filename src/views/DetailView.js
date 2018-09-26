import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { postsApi } from '../utils/api';
import {
  Typography,
} from '@material-ui/core';
import { addPost, addComment } from '../actions';

import './styles/Detail.css';
import CommentList from './CommentList';
import NewComment from './NewComment';

class DetailView extends React.Component {
  componentDidMount() {
    const {
      posts,
      match: {
        params: { id }
      },
      dispatch
    } = this.props;
    if (!posts || !posts.length) {
      postsApi.getById(id).then(p => {
        dispatch(addPost(p));
      });
    }

    postsApi.getComments(id).then(comments => {
      comments.forEach(c => {
        dispatch(addComment(c));
      });
    });
  }

  render() {
    const {
      posts,
      comments,
      match: {
        params: { id }
      }
    } = this.props;
    const post = posts.find(p => p.id === id);

    return (
      <div className="Container">
        <header>
          {post && (
            <div>
              <h1> {post.title}</h1>
            </div>
          )}
        </header>

        <main>{post && post.body && <Typography>{post.body}</Typography>}</main>
        
        <hr></hr>
        <Typography variant="headline">Comments</Typography>
        {!!post && <NewComment parentId={post.id} />}
        {!!post && <CommentList postId={post.id}/>}
      </div>
    );
  }
}

const mapStateToProps = ({ postsReducer, commentsReducer }) => ({
  posts: postsReducer.posts
});

export default withRouter(connect(mapStateToProps)(DetailView));
