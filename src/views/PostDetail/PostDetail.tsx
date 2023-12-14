import { useParams } from "react-router-dom";
import { useGetPostByPostId } from '../../hooks/usePosts';
import { useGetUserNameById } from '../../hooks/useUsers';
import { Box, Paper, Typography, Container, Button } from '@material-ui/core';
import './PostDetail.styles.css'
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackIcon } from '../../assets/icons/BackIcon.svg'
import { usePhotosByPostId } from "../../hooks/usePhotos";


const PostDetail = () => {
  const params = useParams();
  const postId = Number(params.id)

  const { post, loadingPostsByPostId } = useGetPostByPostId(postId)
  const { userName, loadingUserName } = useGetUserNameById(Number(post?.userId))
  const { photo } = usePhotosByPostId(postId - 1)



  const navigate = useNavigate();

  const paperStyles = {
    backgroundColor: "white",
    fontSize: 50,
    padding: 20,
    width: '90%',
    margin: '0 auto'

  }


  const RANDOM_IMG_URL = photo?.download_url
  const userNameLoaded = !loadingUserName


  return (
    <>
      <BackIcon className="back-icon" onClick={() => {
        navigate(-1)
      }}>
      </BackIcon>
      <Container maxWidth="lg" >
        {loadingPostsByPostId ? 'Loading Post Entry...' :
          <Box className="boxContainerStyles">
            <Paper style={paperStyles} elevation={10}  >
              <Typography variant="h4">{post?.title}</Typography>
              {userNameLoaded && <Typography variant="h6">{userName}</Typography>}
              <img alt="blog-entry-img" style={{ width: '100%', height: '25rem' }} src={RANDOM_IMG_URL} />
              <Typography variant="body1">{post?.body}</Typography>
            </Paper>
          </Box>}
      </Container>
    </>
  )
}

export default PostDetail