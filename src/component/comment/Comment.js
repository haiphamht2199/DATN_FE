import CommentForm from "./CommentForm";
import AccountCircle from '@mui/icons-material/AccountCircle';
import React, { useContext, useEffect, useMemo, useState, useCallback } from "react"
import Comments from "./Comments";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
  handleGetComment as handleGetCommentApi
} from "../../api";
import axios from '../../helper/axios'
import { RestaurantMenu } from "@mui/icons-material";
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
  dataPost,
  setRootComments,
  setLoading,
  type
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
  const uerId = useSelector(state => state.user.userId)
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canDelete =
    uerId && uerId === comment.user_id


  const canReply = Boolean(currentUserId);
  const canEdit = uerId && uerId === comment.user_id && !timePassed;
  const replyId = parentId ? parentId : comment.comment_id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const [backendComments, setBackendComments] = useState(listComments);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [areChildrenHidden, setAreChildrenHidden] = useState(comment.count && comment.parent_id === 0 ? true : false);
  const [loadingCmt, setLoadingCmt] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams();
  let [childComments, setChildComments] = useState([]);
  const updateComment = (text, commentId, data, backendComments) => {
    updateCommentApi(text, commentId, data).then((data) => {
      let testData = backendComments;
      if (data) {
        for (let i = 0; i < testData.length; i++) {
          if (testData[i].comment_id === data.idComment) {
            testData[i].content = data.content;
            break;
          }
        }
      }
      setBackendComments(testData);
      setIsEditing(false);
    });
  };
  const addComment = (text, parentId, _comment, class_id) => {
    createCommentApi(text, parentId, _comment, class_id).then(async (comment) => {
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
      setIsReplying(false)
      setBackendComments([data, ...backendComments]);
    });
  };
  const handleGetCommentBtn = (data) => {
    setLoadingCmt(true)
    handleGetCommentApi(data).then((data) => {
      let testData = [];
      if (data && data.data && data.data.length) {
        data.data.forEach(item => {
          let newComment = item;
          newComment.class_id = parseInt(searchParams.get("class_id"));
          newComment.objectId = data.object_id;
          newComment.type = data.type;
          newComment.level = data.level;
          testData.push(newComment);
        });
      }
      setBackendComments(testData);
      setTimeout(() => {
        setAreChildrenHidden(false);
        setLoadingCmt(false)
      }, 500)
    })
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
  childComments = getReplies(comment.comment_id);
  const deleteComment = (data, backendComments) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi(data).then((id) => {
        if (id) {
          let testData = [];
          if (backendComments.length) {
            backendComments.forEach(item => {

              if (item.comment_id !== id) {
                let newComment = item;
                testData.push(newComment);
              }
            });
            setBackendComments(testData);
            setAreChildrenHidden(false);
          }
        }
      });
    }
  };
  return (
    <div key={comment.id} className="comment">
      <div className={`icon_student_comment ${comment.name_student ? '' : 'icon_teacher'}`}>
        {comment.name_student ? comment.name_student[0] : 'GV'}
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
            handleSubmit={(text) => updateComment(text, comment.comment_id, {
              commentId: comment.comment_id,
              objectId: dataPost.objectId,
              type: type,
              level: comment.level,
              classId: parseInt(searchParams.get("class_id"))
            }, backendComments)}
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
          {
            canEdit && <div
              className="comment-action"
              onClick={() =>
                setIsEditing(prev => !prev)
              }
            >
              Chỉnh sửa
            </div>
          }



          {
            canDelete && <div
              className="comment-action"
              onClick={() => deleteComment({
                commentId: comment.comment_id,
                objectId: dataPost.objectId,
                type: type,
                level: comment.level,
                classId: parseInt(searchParams.get("class_id"))
              }, backendComments)}
            >
              Xóa
            </div>
          }

        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId, comment, searchParams.get("class_id"))}
          />
        )}
        {(childComments?.length > 0 || comment.count > 0) && (
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
                {childComments?.length > 0 && <Comments comments={childComments} listComments={backendComments} dataPost={dataPost} />}
              </div>
            </div>
            <button
              className={`btn mt-1 ${!areChildrenHidden ? "hide" : ""}`}

              onClick={() => handleGetCommentBtn({
                commentId: comment.comment_id,
                objectId: dataPost.objectId,
                type: type,
                level: comment.level,
                classId: parseInt(searchParams.get("class_id"))
              })}
            >
              <i className={`fa fa-spinner fa-spin ${!loadingCmt ? "hide" : ""}`}></i>
              Xem thêm
            </button>
          </>
        )
        }
      </div>
    </div>
  );
};

export default Comment;
