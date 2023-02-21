import axios from './helper/axios';
export const getComments = async () => {
 return [

 ];
};

export const createComment = async (text, parentId = null, comment, type) => {
 if (parentId) {
  let data = {
   commentId: parentId,
   objectId: comment.objectId,
   type: parseInt(type),
   content: text,
   level: comment.level ? comment.level : 0 + 1,
   classId: comment.class_id
  }
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
   type: type,
   content: text,
   level: 0,
   classId: parseInt(comment.class_id)
  }

  if (data2) {
   let addCommentRes = await axios.post('/comments', data2);


   if (addCommentRes.data.code === 200) {
    return addCommentRes.data.data
   }

  }
 }

};

export const updateComment = async (text, commentId, data) => {
 try {
  let dataUpdate = {
   commentId: commentId,
   content: text
  }
  let updateCommentRes = await axios.post('/comments/update', dataUpdate);
  if (updateCommentRes.data.code === 200) {
   return updateCommentRes.data.data
  }
 } catch (error) {
  return {}
 }
};

export const deleteComment = async (data) => {
 try {
  let deleteCommentRes = await axios.delete(`/comments?idComment=${data.commentId}`);
  if (deleteCommentRes.data.code === 200) {
   return data.commentId
  }
 } catch (error) {
  return {}
 }
};
export const handleGetComment = async (data) => {
 try {
  let addCommentRes = await axios.post('/comments/get_comments', data);
  if (addCommentRes.data.code === 200) {
   if (addCommentRes.data.data.data) {
    return { data: addCommentRes.data.data.data, object_id: addCommentRes.data.data.object_id, level: addCommentRes.data.data.level }
   } else {
    return {}
   }
  }
 } catch (error) {
  return {}
 }


};