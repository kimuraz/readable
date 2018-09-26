import React from 'react';
import * as moment from 'moment';
import { withRouter, Redirect } from 'react-router';

import {
  Card,
  ListItem,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Button
} from '@material-ui/core';
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
  constructor() {
    super();

    this.state = {
      redirect: false
    };
    this.goToDetail = this.goToDetail.bind(this);
  }

  goToDetail() {
    this.setState({ ...this.state, redirect: true });
  }

  vote(type) {
    const { post, dispatch } = this.props;
    postsApi.vote(post.id, type).then(p => {
      dispatch(editPost(p));
    });
  }

  render() {
    const { post, location } = this.props;
    if (this.state.redirect) {
      return <Redirect push to={`/posts/${post.id}`} />
    }
    return (
       (
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
                {post.body > 150 ? `${post.body.substr(0, 147)}...` : post.body}
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
            <CardActions>
              <Button
                color="secondary"
                fullWidth
                onClick={() => this.goToDetail()}
              >
                Read More
              </Button>
            </CardActions>
          </Card>
        </ListItem>
      )
    );
  }
}

export default withRouter(connect()(PostListitem));
