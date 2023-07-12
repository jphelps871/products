import { useState } from "react"
import FeedBackButton from "./FeedBackButton"

export default function CommentForm() {
    const [characters, setCharacters] = useState(250)

    function characterCount(e) {
        const textArea = e.target
        const charactersUsed = textArea.value.length
        setCharacters(250 - charactersUsed)
    }

    async function handleCommentSubmit(event) {
        event.preventDefault();

        const data = {
            comment: event.target.comment.value
        }

        const JSONdata = JSON.stringify(data);

        const endpoint = '/api/comment';

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }

        const response = await fetch(endpoint, options);
        const result = await response.json();

        if (response.status == 200) {
            event.target.childNodes[1].value = "";
        }
    }

    return (
        <form onSubmit={handleCommentSubmit} method="post">
            <label htmlFor="comment" className='hidden'>Comment</label>
            <textarea 
                placeholder="Type your comment here"
                name="comment" 
                id="comment" 
                rows="4" 
                maxLength="250"
                onKeyUp={(e) => characterCount(e)}
                className='bg-light-cream rounded-md w-full p-4 text-form-text' />

            <div className='flex justify-between mt-4'>
                <p className='text-form-text'>{characters} Characters left</p>
                <FeedBackButton bgColor={'dark-purple'}>Post Comment</FeedBackButton>
            </div>
        </form>
    )
}