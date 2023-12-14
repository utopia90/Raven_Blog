import React from 'react';
import { Post } from '../../services/services'
import { Grid} from '@material-ui/core';
import BlogEntry  from '../BlogEntry/BlogEntry';




interface BlogEntriesI {
    blogEntries: Post[]
}
const BlogLayout = ({ blogEntries}: BlogEntriesI) => {

    return (

      <Grid container spacing={4} >
          {blogEntries?.map(({id, title, userId}) => (
          <BlogEntry key={id} title={title} id={id} userId={userId}/>
        ))}
      </Grid>

    );
  };
  
  export default BlogLayout;