import React from 'react';
import { connect } from 'react-redux';
import api from '../utils/api';

import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  Button
} from '@material-ui/core';
import CategoryIcon from '@material-ui/icons/Category';
import AddIcon from '@material-ui/icons/Add';

import { addCategory, addPost } from '../actions';

import './styles/Root.css';
import PostListitem from './PostListitem';
import SelectSorting from './SelectSorting';

class RootView extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedCategory: 'ALL'
    };
  }

  componentDidMount() {
    const { categories, posts, dispatch } = this.props;
    if (!categories || !categories.length) {
      api.categoryApi.getAll().then(res => {
        res.categories.forEach(c => {
          dispatch(addCategory(c));
        });
      });
    }

    if (!posts || !posts.length) {
      api.postsApi.getAll().then(res => {
        res.forEach(p => {
          dispatch(addPost(p));
        });
      });
    }
  }

  selectCategory(name) {
    if (this.state.selectedCategory === name) {
      this.setState({ ...this.state, selectedCategory: 'ALL' });
    } else {
      this.setState({ ...this.state, selectedCategory: name });
    }
  }

  render() {
    const { categories, posts } = this.props;
    const { selectedCategory } = this.state;
    const filteredPosts = posts.filter(p => selectedCategory === 'ALL' ? true : p.category === selectedCategory);
    return (
      <Grid container>
        <Grid item xs={12} className="RootHeader">
          <Typography variant="title">Category:</Typography>
          <Typography variant="title" color="primary" className="RootCategory">
            {selectedCategory}
          </Typography>
        </Grid>
        <Grid item xs={9} className="PostContainer">
          <Button
            variant="fab"
            color="primary"
            aria-label="Add"
            className="AddButton"
          >
            <AddIcon />
          </Button>
          <SelectSorting/>
          {(!filteredPosts || !filteredPosts.length) && (
            <Card className="PostCard">No posts so far :(</Card>
          )}
          {filteredPosts &&
            !!filteredPosts.length && (
              <List>
                {filteredPosts.map(p => (
                  <PostListitem post={p} key={p.id} />
                ))}
              </List>
            )}
        </Grid>

        <Grid item xs={3} className="Categories">
          <List>
            <ListItem>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <Typography variant="title">Categories</Typography>
            </ListItem>
            {categories &&
              categories.map(category => (
                <ListItem
                  key={category.name}
                  button
                  onClick={() => this.selectCategory(category.name)}
                  className={
                    category.name === this.state.selectedCategory
                      ? 'SelectedCategory'
                      : ''
                  }
                >
                  <ListItemText className="CategoryName">
                    {category.name}
                  </ListItemText>
                </ListItem>
              ))}
          </List>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ categoryReducer, postsReducer }) => ({
  categories: categoryReducer,
  posts: postsReducer.posts,
  sorting: postsReducer.sorting
});

export default connect(mapStateToProps)(RootView);
