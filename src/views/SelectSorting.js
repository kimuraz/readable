import React from 'react';
import { connect } from 'react-redux';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

import { sortPostsBy } from '../actions';

class SelectSorting extends React.Component {
  constructor() {
    super();

    this.state = {
      options: [
        {
          label: 'Date',
          value: 'timestamp'
        },
        {
          label: 'Votes',
          value: 'voteScore'
        }
      ]
    };
  }

  render() {
    const { options } = this.state;
    const { dispatch, sorting } = this.props;
    return (
      <FormControl>
        <InputLabel htmlFor="sorting">Sort by</InputLabel>
        <Select
          inputProps={{ name: 'sorting', id: 'sorting' }}
          onChange={evt => dispatch(sortPostsBy(evt.target.value))}
          value={sorting}
        >
          {options.map(o =>
            <MenuItem key={o.value} value={o.value}>
              {o.label}
            </MenuItem>
          )}
        </Select>
      </FormControl>
    );
  }
}

const mapStateToProps = ({ postsReducer }) => ({
  sorting: postsReducer.sorting
});

export default connect(mapStateToProps)(SelectSorting);
