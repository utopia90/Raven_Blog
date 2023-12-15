import React, { useState, useEffect } from 'react';
import  { getCommentsByPostId, Comment } from '../services/services'


function useComments(postId: string) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');


    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentsData = await getCommentsByPostId(postId) as Comment[];
                setComments(commentsData);

            } catch (error) {
                setError(error as string)
            }
            finally {
                setLoading(false)
            }
        };
        fetchComments();
    }, []);

    return {comments, loading, error}
}

export {useComments}