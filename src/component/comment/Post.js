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
function Post({ listComments, setListComments, dataPost, backendComments, setBackendComments, activeComment, setActiveComment, type }) {
 const [loading, setLoading] = useState(true);
 const [rootComments, setRootComments] = useState([]);


 const addComment = useCallback((text, parentId, comment) => {
  createCommentApi(text, parentId, comment, type).then(async (comment) => {
   let datarReq = {
    commentId: null,
    objectId: dataPost.objectId,
    type: type,
    level: 0
   }
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
    if (listCommentsRes.data.code === 200) {
     let dataRes = listCommentsRes.data.data;
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
    setBackendComments(dataComment);
   } catch (error) {
    console.log("e:", error)
   }
  });
 }, [backendComments, setBackendComments, loading, rootComments, listComments, setListComments]);
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
      <Comments comments={rootComments} setListComments={setListComments} listComments={backendComments} dataPost={dataPost} setRootComments={setRootComments} setLoading={setLoading} type={type} />
     </div>
    )}
   </div>
  </div>
 )
}

export default Post