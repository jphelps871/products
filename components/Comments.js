import React, { useState } from "react";
import Avatar from "@/components/Avatar";
import CommentForm from "./CommentForm";
import OutsideClickHandler from "react-outside-click-handler";

function Comment({ comment, refetchComments }) {
  const [replyOpen, setReplyOpen] = useState(false);

  return (
    <div className="flex gap-3 mt-5 mb-8">
      <div>
        <Avatar imgUrl={comment.user.avatar} />
      </div>
      <div className="grow mb-4">
        <OutsideClickHandler onOutsideClick={() => setReplyOpen(false)}>
          <div className="flex justify-between">
            <div className="mb-5">
              <p className="font-bold text-dark-grey text-md">{comment.user.name}</p>
              <p className="text-light-slate text-sm">@{comment.user.username}</p>
            </div>
            <a onClick={() => setReplyOpen(!replyOpen)} className="text-sm font-bold text-dark-blue hover:underline cursor-pointer" id={comment.id}>
              Reply
            </a>
          </div>
          <p className="text-light-slate">
            <span className="text-dark-purple">{`${comment.parentUsername ? `@${comment.parentUsername} ` : ""}`}</span>
            {comment.comment}
          </p>
          <div className={`mt-4 ${replyOpen ? "block" : "hidden"}`}>
            <CommentForm buttonText={"Reply Comment"} commentId={comment.id} onSuccess={refetchComments} />
          </div>
        </OutsideClickHandler>
      </div>
    </div>
  );
}

function Comments({ comments, refetchComments }) {
  const renderComments = (comments, test) => {
    return (
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <Comment comment={comment} refetchComments={refetchComments} />
            <div className={`${test && "ml-8"}`}>{comment.children && renderComments(comment.children, false)}</div>
          </div>
        ))}
      </div>
    );
  };

  return <div className="test">{renderComments(comments, true)}</div>;
}

export default Comments;
