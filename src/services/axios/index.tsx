import axios from "axios";

const API = {
  backend: "http://localhost:8000",
};

export const login = async () => {
  
  let res = await axios.get(API.backend + '/user');
  try {
    return res.data
  }
  catch(err) {
    console.log("Error", err);
    return null
  }
  finally {
    console.log('Request Successfull');
  }
}

export const fetchPosts = async () => {
  let res = await axios.get(API.backend + '/posts');
  try {
    return res.data
  }
  catch(err) {
    console.log("Error", err);
    return []
  }
  finally {
    console.log('Request Successfull');
  }
}

export const addPost = async (body: any) => {
  let res = await axios.post(API.backend + '/posts', body);
  try {
    return res.data
  }
  catch(err) {
    console.log("Error", err);
    return null
  }
  finally {
    console.log('Request Successfull');
  }
}

export const addComment = async (body: any) => {
  let res = await axios.post(API.backend + '/comments', body);
  try {
    return res.data
  }
  catch(err) {
    console.log("Error", err);
    return null
  }
  finally {
    console.log('Request Successfull');
  }
}

export const fetchComments = async () => {
  let res = await axios.get(API.backend + '/comments');
  try {
    return res.data
  }
  catch(err) {
    console.log("Error", err);
    return null
  }
  finally {
    console.log('Request Successfull');
  }
}