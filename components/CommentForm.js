import { useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import FeedBackButton from "./FeedBackButton";
import FormCharactersContainer from "./form/FormCharactersContainer";

export default function CommentForm({ buttonText, commentId }) {
  const user = useUser();
  const [feedbackCharacters, setFeedbackCharacters] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm();

  function handleClickSubmit(event) {
    handleSubmit(async (data) => {
      if (!user) {
        toast.error("You must be logged in to comment");
      } else {
        if (!user.id) return;

        data["userId"] = user.id;

        const response = await fetch("/api/comment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const { errors, message } = await response.json();

        if (errors) {
          Object.entries(errors).forEach(([field, messages]) => {
            setError(field, {
              type: "server",
              message: messages[0],
            });
          });
          return;
        }

        reset();
      }
    })();
  }

  const router = useRouter();
  // feedback ID - passed into hidden input fields
  const { id } = router.query;

  return (
    <form autoComplete="off">
      <label htmlFor="comment" className="hidden">
        Comment
      </label>
      <textarea
        onKeyUp={(e) => setFeedbackCharacters(e.target.value.length)}
        placeholder="Type your comment here"
        name="comment"
        id="comment"
        rows="4"
        maxLength="250"
        className={`bg-light-cream rounded-md w-full p-4 placeholder-form-text text-dark-grey ${errors.comment && "border-2 border-red-500"}`}
        {...register("comment", {
          required: "Comment is required",
          maxLength: {
            value: 250,
            message: "Must be less than 250 characters",
          },
        })}
      />
      {errors.comment && (
        <p className="text-red-500 mt-1" role="alert">
          {errors.comment?.message}
        </p>
      )}

      <input type="hidden" name="commentId" id="commentId" value={commentId} {...register("commentId")} />

      <input type="hidden" name="feedbackId" id="feedbackId" value={id} {...register("feedbackId")} />

      <div className="flex justify-between mt-4 items-center">
        <FormCharactersContainer count={feedbackCharacters} limit={250} />
        <FeedBackButton submit handleClick={(e) => handleClickSubmit(e)} name={"post"} bgColor={"bg-dark-purple"}>
          {buttonText}
        </FeedBackButton>
      </div>
    </form>
  );
}
