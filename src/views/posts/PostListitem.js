import React from 'react';
import * as moment from 'moment';
import { withRouter, Link } from 'react-router-dom';

import {
  Card,
  ListItem,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  CardActions,
} from '@material-ui/core';
import { connect } from 'react-redux';
import VotePost from './VotePost';

import '../styles/PostListitem.css';

/**
 * id - UUID should be fine, but any unique id will work
 *      timestamp - timestamp in whatever format you like, you can use Date.now() if you like
 *      title - String
 *      body - String
 *      author - String
 *      category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.
 */
class PostListitem extends React.Component {

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
              {post.body > 150 ? `${post.body.substr(0, 147)}...` : post.body}
            </Typography>
          </CardContent>
          <CardActions disableActionSpacing>
              <VotePost post={post}/>
          </CardActions>
          <CardActions>
              <Link to={`/${post.category}/${post.id}`}>Read More</Link>
          </CardActions>
        </Card>
      </ListItem>
    );
  }
}

export default withRouter(connect()(PostListitem));
