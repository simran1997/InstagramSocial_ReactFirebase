import React, { useState, useEffect } from "react";
import "./Post.css";
import { Button, Avatar } from "@material-ui/core";
import { db } from "./Firebase";
import firebase from "firebase";

function Post(props) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (props.postId) {
      unsubscribe = db
        .collection("posts")
        .doc(props.postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [props.postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(props.postId).collection("comments").add({
      text: comment,
      username: props.user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt="Username" src="/static.png" />
        <h3>{props.username}</h3>
      </div>

      <img className="post__img" src={props.imageURL} alt="post_image" />
      <h4 className="post__text">
        <strong>{props.username}</strong> {props.caption}
      </h4>

      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>

      {props.user && (
        <form className="post__commentBox">
          <input
            className="post__input"
            placeholder="Add a comment..."
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            onClick={postComment}
            disabled={!comment}
            className="post__button"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
