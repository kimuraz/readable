import React from 'react';
import * as moment from 'moment';

import {
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardContent
} from '@material-ui/core';


class CommentCard extends React.Component {
  render() {
    const { comment } = this.props;
    return (
      <Card key={comment.id} className="CommentCard">
        <CardHeader
          avatar={<Avatar>{comment.author.charAt(0)}</Avatar>}
          title={comment.author}
          subheader={`On ${moment(comment.timestamp).format('LLL')}`}
        />
        <CardContent>
          <Typography>{comment.body}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default CommentCard;
