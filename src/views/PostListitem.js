import React from 'react';
import * as moment from 'moment';

import {
  Card,
  ListItem,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  CardActions,
  IconButton
} from '../../node_modules/@material-ui/core';
import { connect } from 'react-redux';
import { postsApi } from '../utils/api';
import { editPost } from '../actions';
import UpVoteIcon from '@material-ui/icons/ThumbUp';
import DownVoteIcon from '@material-ui/icons/ThumbDown';

import './styles/PostListitem.css';

/**
 * id - UUID should be fine, but any unique id will work
 *      timestamp - timestamp in whatever format you like, you can use Date.now() if you like
 *      title - String
 *      body - String
 *      author - String
 *      category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.
 */
class PostListitem extends React.Component {

  vote(type) {
    const { post, dispatch } = this.props;
    postsApi.vote(post.id, type).then((p) => {
      dispatch(editPost(p));
    });
  }

  render() {
    const { post } = this.props;
    return (
      <ListItem className="PostListitem">
        <Card className="CardPost">
          <CardHeader
            avatar={<Avatar>{post.title.charAt(0)}</Avatar>}
            title={post.title}
            subheader={`By: ${post.author} on ${moment(post.timestamp).format(
              'LLL'
            )}`}
          />
          <CardContent>
            <Typography>
              {post.body > 150
                ? `${post.body.substr(0, 147)}...`
                : post.body}
            </Typography>
          </CardContent>
          <CardActions disableActionSpacing>
            <IconButton onClick={() => this.vote('upVote')}>
              <UpVoteIcon />
            </IconButton>
            <IconButton onClick={() => this.vote('downVote')}>
              <DownVoteIcon />
            </IconButton>
            <Typography>({post.voteScore})</Typography>
          </CardActions>
        </Card>
      </ListItem>
    );
  }
}

export default connect()(PostListitem);
