import React from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';

import {
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardContent
} from '@material-ui/core';

class CommentList extends React.Component {
  render() {
    const { allComments, postId } = this.props;
    return (
      !!allComments && (
        <div>
          {allComments.filter(c => c.parentId === postId).map(c => (
            <Card key={c.id} className="CommentCard">
              <CardHeader
                avatar={<Avatar>{c.author.charAt(0)}</Avatar>}
                title={c.author}
                subheader={`On ${moment(c.timestamp).format('LLL')}`}
              />
              <CardContent>
                <Typography>{c.body}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )
    );
  }
}

const mapStateToProps = ({ commentsReducer }) => ({
  allComments: commentsReducer
});

export default connect(mapStateToProps)(CommentList);
