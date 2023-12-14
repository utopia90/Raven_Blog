import axios from "axios";



const API_BASE_URL = 'https://jsonplaceholder.typicode.com/'
const API_IMG_URL = 'https://picsum.photos/v2/list'

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  };
  export interface User {
    id:       number;
    name:     string;
    username: string;
    email:    string;
    address:  Address;
    phone:    string;
    website:  string;
    company:  Company;
}

export interface Address {
    street:  string;
    suite:   string;
    city:    string;
    zipcode: string;
    geo:     Geo;
}

export interface Geo {
    lat: string;
    lng: string;
}

export interface Company {
    name:        string;
    catchPhrase: string;
    bs:          string;
}
export interface Photo {
  id:string,
  author: string,
  width:number,
  height:number,
  url:string,
  download_url:string,
}

  
 const getAllPosts = async (): Promise<unknown> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts`);
      let data: Post[] = await response.data
     
      return data
    } catch (error) {
        if (error instanceof Error) return `There was an error: ${error.message}`
    }
}
const getAllUsers = async (): Promise<unknown> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    const data: User[] = await response.data
    return data
  } catch (error) {
      if (error instanceof Error) return `There was an error: ${error.message}`
  }
}
const getAllPhotos = async (): Promise<unknown> => {
  try {
    const response = await axios.get(`${API_IMG_URL}?page=2&limit=100`);
    const data: Photo[] = await response.data
    return data
  } catch (error) {
      if (error instanceof Error) return `There was an error: ${error.message}`
  }
}
  
export  {getAllPosts, getAllUsers, getAllPhotos};