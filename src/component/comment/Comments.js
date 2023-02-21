import { useState, useEffect } from "react";
import Comment from "./Comment";


const Comments = ({ commentsUrl, currentUserId, comments, setListComments, listComments, dataPost, setRootComments, setLoading, type }) => {
  const [backendComments, setBackendComments] = useState(listComments);
  return (
    <div className="comments">
      <div className="comments-container">
        {comments.map((comment) => (
          <Comment comment={comment} dataComment={backendComments} setListComments={setListComments} listComments={listComments} dataPost={dataPost} setRootComments={setRootComments} setLoading={setLoading} type={type} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
