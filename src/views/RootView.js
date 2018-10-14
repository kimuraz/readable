import React from 'react';
import { withRouter, Link } from 'react-router-dom';
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
import PostListitem from './posts/PostListitem';
import SelectSorting from './SelectSorting';

class RootView extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedCategory: 'ALL',
    }
  }

  componentDidMount() {
    const { categories, posts, dispatch, match: { params: { category } } } = this.props;
    if (category) {
      this.setState({ selectedCategory: category });
    }
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

  render() {
    const { categories, posts, match: { params: { category }} } = this.props;
    const filteredPosts = posts.filter(p => !category ? true : p.category === category);
    return (
      <Grid container>
        <Grid item xs={12} className="RootHeader">
          <Typography variant="title">Category:</Typography>
          <Typography variant="title" color="primary" className="RootCategory">
            {category || 'All'}
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
              categories.map(c => (
                <ListItem
                  key={c.name}
                  button
                  className={
                    c.name === category
                      ? 'SelectedCategory'
                      : ''
                  }
                >
                  <ListItemText className="CategoryName">
                    <Link to={`/${c.name}`}>
                      {c.name}
                    </Link>
                  </ListItemText>
                </ListItem>
              ))}
              <ListItem>
                <Link to="/">All</Link>
              </ListItem>
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

export default withRouter(connect(mapStateToProps)(RootView));
