import { useState } from "react";
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
const CommentForm = ({
 handleSubmit,
 submitLabel,
 hasCancelButton = false,
 handleCancel,
 initialText = "",
 dataPost
}) => {
 const [text, setText] = useState(initialText);
 const isTextareaDisabled = text.length === 0;
 const onSubmit = (event) => {
  event.preventDefault();
  handleSubmit(text);
  setText("");
 };
 return (
  <form onSubmit={onSubmit}>
   <div className="form_comment_container">
    <div className="form_comment_author">
     <AccountCircle className="user_icon_comment" />
     <FormControl fullWidth sx={{ m: 1 }} variant="standard" className="text_comment">
      <Input
       id="standard-adornment-amount"
       value={text}
       placeholder="bình luận tại đây"
       onChange={(e) => setText(e.target.value)}
      />
     </FormControl>
    </div>
    <div className={hasCancelButton ? "form_action_edit" : "form_action_add"}>
     <button className="comment-form-button" disabled={isTextareaDisabled}>
      {submitLabel}
     </button>
     {hasCancelButton && (
      <button
       type="button"
       className="comment-form-button comment-form-cancel-button"
       onClick={handleCancel}
      >
       Hủy bỏ
      </button>
     )}
    </div>
   </div>

  </form>
 );
};

export default CommentForm;
