import React from 'react';
import { connect } from 'react-redux';
import CommentCard from './CommentCard';

class CommentList extends React.Component {
  render() {
    const { allComments, postId } = this.props;
    return (
      !!allComments && (
        <div>
          {allComments.filter(c => c.parentId === postId).map(c => (
            <CommentCard key={c.id} comment={c}/>
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
