import React, { useEffect, useState } from 'react'
import { usePosts, usePostsByUserName } from '../../hooks/usePosts'
import BlogLayout from '../../components/BlogLayout/BlogLayout';
import BasicSelect from '../../components/Select/Select';
import { useUsers } from '../../hooks/useUsers';
import { Container, Box, Button, Typography } from '@material-ui/core';
import { ReactComponent as ArrowRight } from '../../assets/icons/ArrowRight.svg'
import { ReactComponent as ArrowLeft } from '../../assets/icons/ArrowLeft.svg'

import './HomePage.styles.css'
import { Post } from '../../services/services';



export default function HomePage() {

  const [minPosts, setMinPosts] = useState(1)
  const [maxPosts, setMaxPosts] = useState(9)


  const { error, loading, posts } = usePosts()
  const { users } = useUsers()
  const [pagePosts, setPagePosts] = useState<Post[]>([])
  const [userName, setUserName] = useState('')
  const { filteredPosts } = usePostsByUserName(userName)
  const postsToDisplay = filteredPosts?.length > 0 ? filteredPosts : pagePosts
  const [maxPostsReached, setMaxPostsReached] = useState(false)




  useEffect(() => {
    if (posts.length > 0) {
      const initialPosts = getPagePosts(minPosts, maxPosts)
      setPagePosts(initialPosts)

      const maxPostsLimit = maxPosts > posts?.length
      if (maxPostsLimit) {
        handleMaxPostsReached()
      }
    }

  }, [posts, maxPosts])

  function handleMaxPostsReached() {
    setMaxPostsReached(true)
    alert('Max post limit reached! Redirecting to first page')
    setMinPosts(1)
    setMaxPosts(9)

    const initialPosts = getPagePosts(minPosts, maxPosts)
    setPagePosts(initialPosts)
    setMaxPostsReached(false)


  }

  function getPagePosts(min: number, max: number): Post[] {

    let filteredPosts: Post[] = posts?.filter((post) => post?.id >= min && post?.id <= max)

    return filteredPosts
  }



  function handleUserInput(e: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) {
    e.stopPropagation()
    const userName = e.target.value as string
    if (userName?.length > 0) {
      setUserName(userName)
    }

  }
  function resetFilters(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    setUserName('')
  }
  enum TypeMovement {
    RIGHT,
    LEFT
  }
  function handleGalleryArrowClick(e: React.MouseEvent<HTMLElement>, movement: TypeMovement) {
    e.stopPropagation()


    if (movement === TypeMovement.LEFT) {
      setMinPosts(prevState => prevState - 9)
      setMaxPosts(prevState => prevState - 9)
    } else {
      setMinPosts(prevState => prevState + 9)
      setMaxPosts(prevState => prevState + 9)
    }


    const updatedPosts = getPagePosts(minPosts, maxPosts)

    setPagePosts(updatedPosts)
  }
  const shoudShowGalleryArrows = !maxPostsReached && filteredPosts.length === 0
  const isFirstPage = minPosts === 1
  return (
    <Container maxWidth="xl" className="main-container">
      <Box className="top-title-container"> <Typography variant="h5">The Raven <span className="blog-enphasis">Blog</span></Typography></Box>
      {shoudShowGalleryArrows && <Box className="gallery-arrow">{!isFirstPage && <Box onClick={e => handleGalleryArrowClick(e, TypeMovement.LEFT)} className="arrow-left-container"><ArrowLeft /></Box>}  <Box onClick={e => handleGalleryArrowClick(e, TypeMovement.RIGHT)} ><ArrowRight className="arrow-right-container" /></Box> </Box>}
      <Container maxWidth="lg" >
        {error && 'There was some error loading posts...'}
        {loading ? 'loading posts...' :
          <>
            <Box className='homePageTopboxContainer'>
              <BasicSelect handleChange={handleUserInput} value={userName} menuItemsValues={users} inputLabel={'Filter Posts By User'} />
              <Button onClick={resetFilters} variant="contained" color="primary">Reset Filters</Button>
            </Box>
            <BlogLayout blogEntries={postsToDisplay} />
          </>}
      </Container>
    </Container>
  )
}
