import React from 'react';
import { connect } from 'react-redux';
import { addComment } from '../actions';
import { TextField, FormControl, Button } from '@material-ui/core';
import { commentsApi } from '../utils/api';
import idGenerator from '../utils/idGenerator';

import './styles/NewComment.css';

class NewComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: '',
      author: '',
      parentId: null,
      timestamp: null,
      id: null
    };

    this._handleChange = this._handleChange.bind(this);
    this._saveAndReset = this._saveAndReset.bind(this);
  }

  componentDidMount() {
    this.setState({ ...this.state, parentId: this.props.parentId });
  }

  _handleChange(val, field) {
    this.setState({ ...this.state, [field]: val });
  }

  _saveAndReset() {
    const { body, author } = this.state;
    if (!body || !author) {
      alert('Feel all fields!');
      return;
    }
    this.setState(
      { ...this.state, timestamp: new Date().getTime(), id: idGenerator() },
      () => {
        commentsApi.add(this.state).then(res => {
          this.props.dispatch(addComment(res));
          this.setState({
            body: '',
            author: '',
            parentId: null,
            timestamp: null,
            id: null
          });
        });
      }
    );
  }

  render() {
    return (
      <FormControl className="CommentForm">
        <TextField
          label="Name"
          value={this.state.author}
          onChange={evt => this._handleChange(evt.target.value, 'author')}
        />
        <TextField
          multiline
          label="Comment"
          value={this.state.body}
          onChange={evt => this._handleChange(evt.target.value, 'body')}
        />
        <Button onClick={() => this._saveAndReset()} color="primary">
          Comment!
        </Button>
      </FormControl>
    );
  }
}

export default connect()(NewComment);
