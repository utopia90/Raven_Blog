import React, { useState, useEffect } from 'react';
import  { getAllPhotos, Photo } from '../services/services'




function usePhotosByPostId(postId: number) {
    const [photo, setPhoto] = useState<Photo | null>(null);
    const [loadingImg, setLoadingImg] = useState<boolean>(true);
    const [errorImg, setErrorImg] = useState<string>('');


    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                let photosData = await getAllPhotos() as Photo[];

                const photo: Photo = photosData[postId]
                  
                setPhoto(photo);
            } catch (error) {
                setErrorImg(error as string)
            }
            finally {
                setLoadingImg(false)
            }
        };
        fetchPhoto();
    }, []);

    return {photo, loadingImg, errorImg}
}
export {usePhotosByPostId}