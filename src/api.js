import axios from './helper/axios';
export const getComments = async () => {
 return [

 ];
};

export const createComment = async (text, parentId = null, comment) => {
 console.log({ text, parentId, comment });
 if (parentId) {
  let data = {
   commentId: parentId,
   objectId: comment.objectId,
   type: comment.type,
   content: text,
   level: comment.level + 1,
   classId: comment.class_id
  }
  console.log("data:", data);
  if (data) {
   let addCommentRes = await axios.post('/comments', data);
   if (addCommentRes.data.code === 200) {
    return addCommentRes.data.data
   }

  }
 } else {
  let data2 = {
   commentId: null,
   objectId: comment.objectId,
   type: 2,
   content: text,
   level: 0,
   classId: parseInt(comment.class_id)
  }

  if (data2) {
   let addCommentRes = await axios.post('/comments', data2);
   console.log("addCommentResefse:", addCommentRes);
   if (addCommentRes.data.code === 200) {
    return addCommentRes.data.data
   }

  }
 }

};

export const updateComment = async (text) => {
 return { text };
};

export const deleteComment = async (commentId) => {
 let deleteCommentRes = await axios.delete(`/comments?idComment=${commentId}`);
 if (deleteCommentRes.data.code = 200) {
  return {};
 }

};
