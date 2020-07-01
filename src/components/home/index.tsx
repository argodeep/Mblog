import React, { Fragment, useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as API from '../../services/axios';
import { User } from '../../services/models/user';
import Form from '../form';
import './style.css';

function Home(props: any) {
  document.title = "mBlogging.site | Home";
  const route = useHistory();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState<any[]>([]);
  const [currentUser, setUser] = useState<User | null>(null);
  const [comments, setComment] = useState<any>([]);
  const [commentForm, setCommentForm] = useState<any>({});
  const user: User = useSelector((state: any) => state.user);
  const users: User[] = useSelector((state: any) => state.users);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  async function fetchPosts() {
    const response = await API.fetchPosts();
    setPosts(response);
  }

  async function fetchComemnts() {
    const response = await API.fetchComments();
    setComment(response);
  }

  function createPost(value: string) {
    const post: any = {
      text: value,
      userId: currentUser?.id,
      createdAt: new Date().toString(),
      updatedAt: null
    }
    const response: any = API.addPost(post);
    const postsBackup = [...posts];
    post.id = response.id;
    postsBackup.unshift(post);
    setPosts(postsBackup);
    setCommentForm(null);
  }

  function createComment(value: string) {
    const comment: any = {
      text: value,
      postId: commentForm.id,
      userId: currentUser?.id,
      createdAt: new Date().toString(),
      updatedAt: null
    }
    const response: any = API.addComment(comment);
    const commentBackup = [...comments];
    comment.id = response.id;
    commentBackup.unshift(comment);
    setComment(commentBackup);
  }

  function getPostComment(id: string) {
    return [...comments].filter((comment: any) => comment.postId === id)
  }


  function logout() {
    window.open('/login', '_top')
  }

  function getName(id: string) {
    return users.find(e => e.id === id)?.username
  }

  function formatDate(date: any) {
    var d = new Date(date),
      month: any = '' + (d.getMonth()),
      day = '' + d.getDate(),
      hour = d.getHours(),
      min = d.getMinutes();

    // if (month.length < 2)
    //   month = '0' + month;
    // if (day.length < 2)
    //   day = '0' + day;

    return `${day} ${monthNames[month]}, ${hour}:${min}`;
  }

  useEffect(() => {
    fetchPosts();
    fetchComemnts();
    setUser(user);
    return () => {
      console.log('unmounted')
    };
  }, [])


  return (
    <Fragment>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: 24, marginTop: 16, marginBottom: 16, width: '100%', height: 52 }}>
        <h4>{currentUser?.username}</h4>
        <button onClick={() => logout()}>
          Logout
          </button>
      </div>
      <div>
        <Form onChange={(event: any) => createPost(event.text)} buttonLabel={'Post'} />
      </div>
      <div>
        {
          posts.reverse().map((post: any, index: number) =>
            <div key={index} className="post-list">
              <div className="post">
                <span>{getName(post.userId)}{'>'}</span>
                <span>{post.text}</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="comment-List" style={{flexDirection: 'column'}}>
                {
                  (commentForm?.id !== post.id || !commentForm) && <button onClick={() => setCommentForm(post)}>Comment</button>
                }
                {
                  commentForm && commentForm?.id === post.id &&
                  <>
                    <div>
                      <Form onChange={(event: any) => createComment(event.text)} buttonLabel={'Submit'} />
                    </div>
                    <div>
                      {
                        getPostComment(post.id).map((comment: any, i: number) =>
                          <div key={i} className="post-list" style={{width: 400}}>
                            <div className="post">
                              <span>{getName(comment.userId)}{'>'}</span>
                              <span>{comment.text}</span>
                              <span>{formatDate(comment.createdAt)}</span>
                            </div>
                          </div>
                        )
                      }
                    </div>
                  </>
                }
              </div>
            </div>
          )
        }
      </div>
    </Fragment>
  );
}


export default Home;
