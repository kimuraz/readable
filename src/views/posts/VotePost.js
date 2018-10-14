import React from 'react';
import { connect } from 'react-redux';
import { postsApi } from '../../utils/api';
import { editPost } from '../../actions';

import { IconButton, Typography } from '@material-ui/core';
import UpVoteIcon from '@material-ui/icons/ThumbUp';
import DownVoteIcon from '@material-ui/icons/ThumbDown';

import '../styles/PostListitem.css';

class VotePost extends React.Component {
  vote(type) {
    const { post, dispatch } = this.props;
    postsApi.vote(post.id, type).then(p => {
      dispatch(editPost(p));
    });
  }

  render() {
    const { post } = this.props;
    return (
      <div className="VotePost">
        <IconButton onClick={() => this.vote('upVote')}>
          <UpVoteIcon />
        </IconButton>
        <IconButton onClick={() => this.vote('downVote')}>
          <DownVoteIcon />
        </IconButton>
        <Typography>({post.voteScore})</Typography>
      </div>
    );
  }
}

export default connect()(VotePost);
