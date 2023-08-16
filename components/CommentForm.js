import { useState } from "react"
import FeedBackButton from "./FeedBackButton"
import FormCharactersContainer from "./form/FormCharactersContainer";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

async function send(data, userId) {
    if (!userId) return 

    data["userId"] = userId

    try {

        await fetch('/api/comment', {
            method: 'POST',
            header: {'Accept': 'application/json'},
            body: JSON.stringify(data)
        })
        
    } catch (error) {
        console.error(error)
    }
}

export default function CommentForm({buttonText, commentId}) {
    const user = useUser()
    const [feedbackCharacters, setFeedbackCharacters] = useState(0);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        send(data, user?.id || "");
        reset()
    }

    const router = useRouter()
    // feedback ID - passed into hidden input fields
    const {id} = router.query

    return (
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="comment" className='hidden'>Comment</label>
            <textarea 
                onKeyUp={(e) => setFeedbackCharacters(e.target.value.length)} 
                placeholder="Type your comment here"
                name="comment" 
                id="comment" 
                rows="4" 
                maxLength="250"
                className={`bg-light-cream rounded-md w-full p-4 placeholder-form-text text-dark-grey ${errors.comment && 'border-2 border-red-500'}`}
                {...register("comment", 
                    { 
                        required: "Comment is required", 
                        maxLength: {
                            value: 250, 
                            message: "Must be less than 250 characters"
                        } 
                    }
                )}
            />
            {errors.comment && 
                <p className="text-red-500 mt-1" role="alert">
                    {errors.comment?.message}
                </p>
            }

            <input 
                type="hidden" 
                name="commentId" 
                id="commentId" 
                value={commentId} 
                {...register("commentId")}
                />

            <input 
                type="hidden" 
                name="feedbackId" 
                id="feedbackId" 
                value={id} 
                {...register("feedbackId")}
                />

            <div className='flex justify-between mt-4 items-center'>
                <FormCharactersContainer count={feedbackCharacters} limit={250}  />
                <FeedBackButton submit bgColor={'bg-dark-purple'}>{buttonText}</FeedBackButton>
            </div>
        </form>
    )
}