import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {
 getComments as getCommentsApi,
 createComment as createCommentApi,
 updateComment as updateCommentApi,
 deleteComment as deleteCommentApi,
} from "../../api";
import CommentForm from './CommentForm';
import Comments from './Comments';
import axios from '../../helper/axios'
function Post({ listComments, setListComments, dataPost }) {
 const [backendComments, setBackendComments] = useState([]);
 const [activeComment, setActiveComment] = useState(null);
 const [loading, setLoading] = useState(true);
 const [rootComments, setRootComments] = useState([])

 console.log("dataPost:", dataPost)
 const addComment = useCallback((text, parentId, comment) => {
  createCommentApi(text, parentId, comment).then(async (comment) => {
   let datarReq = {
    commentId: null,
    objectId: dataPost.objectId,
    type: 2,
    level: 0
   }
   console.log("dataPost:", dataPost);
   let dataComment = [];
   try {
    let listCommentsRes = await axios.post('/comments/get_comments', datarReq);
    let traceRes = await axios.post('/student/traces', {
     id_trace_student: null,
     object_id: dataPost.objectId,
     type: 3,
     content: text,
     class_id: parseInt(dataPost.class_id)
    });
    console.log("traceRes:", traceRes)
    if (listCommentsRes.data.code === 200) {
     let dataRes = listCommentsRes.data.data;
     console.log("listCommentsRes:", dataRes);

     if (dataRes) {
      dataRes.data.length && dataRes.data.forEach(item => {
       item.level = dataRes.level;
       item.class_id = parseInt(dataRes.class_id);
       item.objectId = datarReq.objectId;
       item.type = 2;
       item.count = dataRes.count;
       dataComment.push(item);
      });
     }
    }
    setBackendComments(dataComment)
   } catch (error) {
    console.log("e:", error)
   }
  });
 }, [backendComments, setBackendComments, loading, rootComments]);
 useEffect(() => {
  const fetchData = async (dataPost) => {
   let datarReq = {
    commentId: null,
    objectId: dataPost.objectId,
    type: 2,
    level: 0
   }
   console.log("dataRes:", datarReq);
   let dataComment = [];
   try {
    let listCommentsRes = await axios.post('/comments/get_comments', datarReq);
    if (listCommentsRes.data.code === 200) {
     let dataRes = listCommentsRes.data.data;
     console.log("listCommentsRes:", dataRes);

     if (dataRes) {
      dataRes.data && dataRes.data.length && dataRes.data.forEach(item => {
       item.level = dataRes.level;
       item.class_id = parseInt(dataRes.class_id);
       item.objectId = datarReq.objectId;
       item.type = 2;
       item.count = dataRes.count;
       dataComment.push(item);
      });
     }
    }
    setBackendComments(dataComment)
   } catch (error) {
    console.log("e:", error)
   }
  }
  fetchData(dataPost);

 }, []);
 useEffect(() => {
  let rootCommentsData = backendComments.length > 0 && backendComments.filter(
   (backendComment) => backendComment.parent_id === 0
  );
  setRootComments(rootCommentsData)
 }, [backendComments])
 return (
  <div className="comments">
   <CommentForm submitLabel="Bình luận" handleSubmit={(text) => addComment(text, null, dataPost)} dataPost={dataPost} />
   <div className="comments-container">
    {rootComments != null && rootComments.length > 0 && loading && (
     <div className="mt-4">
      <Comments comments={rootComments} setListComments={setListComments} listComments={backendComments} dataPost={dataPost} />
     </div>
    )}
   </div>
  </div>
 )
}

export default Post