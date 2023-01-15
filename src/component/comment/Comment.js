import CommentForm from "./CommentForm";
import AccountCircle from '@mui/icons-material/AccountCircle';
import React, { useContext, useEffect, useMemo, useState } from "react"
import Comments from "./Comments";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "../../api";
import axios from '../../helper/axios'
const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  parentId = null,
  currentUserId,
  dataComment,
  setListComments,
  listComments,
  dataPost
}) => {
  // const isEditing =
  //   activeComment &&
  //   activeComment.id === comment.id &&
  //   activeComment.type === "editing";
  // const isReplying =
  //   activeComment &&
  //   activeComment.id === comment.id &&
  //   activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  // const canDelete =
  //  currentUserId === comment.userId && replies.length === 0 && !timePassed;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const replyId = parentId ? parentId : comment.comment_id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const [backendComments, setBackendComments] = useState(listComments);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [areChildrenHidden, setAreChildrenHidden] = useState(comment.count > 0 ? true : false);
  console.log("areChildrenHidden:", areChildrenHidden)
  const [loading, setLoading] = useState(false)
  const updateComment = (text, commentId) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setIsEditing(false);
    });
  };
  const addComment = (text, parentId, _comment) => {
    createCommentApi(text, parentId, _comment).then(async (comment) => {
      let data = {
        comment_id: comment.idComment,
        content: comment.content,
        name_student: _comment.name_student,
        count: 0,
        modified_date: comment.modifiedDate,
        like: comment.like,
        dislike: comment.disLike,
        IS_STUDENT: comment.isStudent,
        user_id: comment.userId,
        parent_id: comment.parentId,
        level: comment.level,
        class_id: comment.classId,
        objectId: comment.objectId,
        type: comment.type
      }
      let traceRes = await axios.post('/student/traces', {
        id_trace_student: null,
        object_id: dataPost.objectId,
        type: 3,
        content: text,
        class_id: parseInt(dataPost.class_id)
      });
      console.log("traceRes:", traceRes)
      setIsReplying(false)
      setBackendComments([data, ...backendComments]);
    });
  };
  const commentsByParentId = useMemo(() => {
    const group = {};
    backendComments !== undefined && backendComments.length && backendComments.forEach(comment => {
      group[comment.parent_id] ||= []
      group[comment.parent_id].push(comment)
    });
    return group
  }, [backendComments]);
  function getReplies(parentId) {
    return commentsByParentId[parentId]
  }
  const childComments = getReplies(comment.comment_id);
  const deleteComment = (commentId) => {
    console.log("commentId:", commentId)
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi(commentId).then(async () => {
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
      });
    }
  };
  // useEffect(() => {
  //   getCommentsApi().then((data) => {
  //     setBackendComments(data);
  //   });
  // }, [loading]);
  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
        <AccountCircle className="user_icon_comment" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.name_student}</div>
          <div style={{ fontSize: "10px" }}>{comment.modified_date}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.content}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Cập nhật"
            hasCancelButton
            initialText={comment.content}
            handleSubmit={(text) => updateComment(text, comment.comment_id)}
            handleCancel={() => {
              setIsEditing(false);
            }}
          />
        )}
        <div className="comment-actions">

          <div
            className="comment-action"
            onClick={() =>
              setIsReplying(prev => !prev)
            }
          >
            Phản hồi
          </div>

          {/* {canEdit && ( */}
          <div
            className="comment-action"
            onClick={() =>
              setIsEditing(prev => !prev)
            }
          >
            Chỉnh sửa
          </div>
          {/* )} */}

          <div
            className="comment-action"
            onClick={() => deleteComment(comment.comment_id)}
          >
            Xóa
          </div>

        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId, comment)}
          />
        )}
        {childComments?.length > 0 && (
          <>
            <div
              className={`nested-comments-stack ${areChildrenHidden ? "hide" : ""
                }`}
            >
              <button
                className="collapse-line"
                aria-label="Hide Replies"
                onClick={() => setAreChildrenHidden(true)}
              />
              <div className="nested-comments">
                <Comments comments={childComments} listComments={backendComments} dataPost={dataPost} />
              </div>
            </div>
            <button
              className={`btn mt-1 ${!areChildrenHidden ? "hide" : ""}`}
              onClick={() => setAreChildrenHidden(false)}
            >
              Show Replies
            </button>
          </>
        )
        }
      </div>
    </div>
  );
};

export default Comment;
