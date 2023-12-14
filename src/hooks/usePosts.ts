import React, { useState, useEffect } from 'react';
import  { Post,getAllPosts } from '../services/services'
import { useUsers } from './useUsers';




function usePosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let postsData = await getAllPosts() as Post[];
                setPosts(postsData);
            } catch (error) {
                setError(error as string)
            }
            finally {
                setLoading(false)
            }
        };
        fetchPosts();
    }, []);

    return {posts, loading, error}
}
function usePostsByUserId(userId: number){
    const  {posts, loading: loadingFilteredPosts, error: filteredPostsError} = usePosts()

    const filteredPosts = posts?.filter((post) => post.userId === userId)

    return {loadingFilteredPosts, filteredPostsError, filteredPosts}
}
function usePostsByUserName(userName: string){
   
    const  {users, loading: loadingFilteredPosts, error: filteredPostsError} = useUsers()
    const user = users?.find(({name}) => name === userName)
    const userId = user?.id
    const  {filteredPosts} = usePostsByUserId(Number(userId))

    

    return {loadingFilteredPosts, filteredPostsError, filteredPosts}
}
function useGetPostByPostId(postId: number){
   
    const  {posts, loading: loadingPostsByPostId, error: errorLoadingPostsByPostId} = usePosts()
    const post = posts?.find(({id}) => id === postId)

    return {post, loadingPostsByPostId, errorLoadingPostsByPostId}
}

export  {usePosts, usePostsByUserId, usePostsByUserName,useGetPostByPostId};
