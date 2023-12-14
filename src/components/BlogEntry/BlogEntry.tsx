import React from 'react';
import {  Grid,} from '@material-ui/core';
import { useGetUserNameById } from '../../hooks/useUsers';
import { useNavigate } from "react-router-dom";
import ImageButtonContainer from '../ImageButtonContainer/ImageButtonContainer';
import { usePhotosByPostId } from '../../hooks/usePhotos';




interface BlogEntryI {
    title: string,
    id: number,
    userId: number
}
const BlogEntry = ({ title, id, userId }: BlogEntryI) => {
  const {userName} = useGetUserNameById(userId)
  const {photo} = usePhotosByPostId(id - 1)
  const navigate = useNavigate();


  function handleBlogEntryNavigation(e: React.MouseEvent<HTMLElement>){
    e.stopPropagation()
    navigate(`/posts/${id}`)
  }
  
  const randomImg = photo?.download_url as string

const image = {
    url: randomImg,
    title: title,
    user: userName}

  return (
    <Grid item  xs={12} sm={6} md={4}  spacing={0} onClick={handleBlogEntryNavigation}>
      <ImageButtonContainer image={image}/>
    </Grid>
  );
};
export default BlogEntry;

