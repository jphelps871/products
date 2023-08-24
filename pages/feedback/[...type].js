import { useRouter } from 'next/router';
import FormContainer from "@/components/form/FormContainer";
import FeedBackButton from "@/components/FeedBackButton";
import FormCharactersContainer from "@/components/form/FormCharactersContainer";
import Link from "next/link";
import { getFeedback, feedback as sendFeedback } from '@/services/feedback';
import { getCategory } from '@/services/category';
import { useUser } from "@supabase/auth-helpers-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function feedback() {
    const [feedbackCharacters, setFeedbackCharacters] = useState(0);
    const [detailCharacters, setDetailCharacters] = useState(0);
    const [categories, setCategories] = useState([])
    const { setValue, register, handleSubmit, formState: { errors }, reset } = useForm();

    const user = useUser()
    const router = useRouter();
    const [type, feedbackId] = router?.query?.type || ["", ""]

    useEffect(() => {
        getCategory()
            .then(response => setCategories(response.data))
            .catch(error => console.error(error))
    }, [])

    useEffect(() => {
        if (type === 'edit') {
            getFeedback(feedbackId)
                .then((data) => {
                    const {feedback} = data

                    setValue('title', feedback.title)
                    setValue('category', feedback.category.id)
                    setValue('detail', feedback.detail)

                    setFeedbackCharacters(feedback.title.length)
                    setDetailCharacters( feedback.detail.length)
                })
                .catch((error) => console.error(error))
        }
    }, [feedbackId])

    function handleClickSubmit(event) {
        event.preventDefault()
        const method = event.target.name

        handleSubmit(data => {
            sendFeedback(method, data, feedbackId)
                .then(response => console.log(response))
                .catch(error => console.error(error))
        })()

    }

    return (
        <FormContainer heading={`${type === 'create' ? 'Create New Feedback' : 'Edit Feedback'}`} iconPath={'/images/plus-icon.svg'} IconAlt={'Plus icon'}>
            <form autoComplete="off">

                {/* Title */}
                <div className="mb-5">
                    <label htmlFor="title" className="text-dark-grey font-bold">
                        Feedback Title
                        <span className="text-dark-grey font-normal block text-sm">Add a short, descriptive headline</span>
                    </label>

                    <input 
                        onKeyUp={(e) => setFeedbackCharacters(e.target.value.length)} 
                        id="title" 
                        type="text"
                        maxLength="60"
                        className={`bg-light-cream mt-3 p-3 w-full rounded-lg ${errors.title && 'border-2 border-red-500'}`} 
                        {...register("title", 
                            { 
                                required: "Title is required", 
                                maxLength: {
                                    value: 60, 
                                    message: "Must be less than 60 characters"
                                } 
                            }
                        )} 
                    />
                    <FormCharactersContainer count={feedbackCharacters} limit={60}  />
                    {errors.title && 
                        <p className="text-red-500 mt-1" role="alert">
                            {errors.title?.message}
                        </p>}
                </div>

                {/* Category */}
                <div className="mb-5">
                    <label htmlFor="category" className="text-dark-grey font-bold">
                        Category
                        <span className="text-dark-grey font-normal block text-sm">Choose a category for your feedback</span>
                    </label>

                    <select 
                        className="mt-3 cursor-pointer rounded-lg p-4 text-md bg-light-cream w-full text-dark-grey" 
                        name="category"
                        id="category"
                        {...register("category", { required: true})} 
                        >
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                {/* Status */}
                {type === 'edit' && (
                <div className="mb-5">
                    <label htmlFor="status" className="text-dark-grey font-bold">
                        Update Status
                        <span className="text-dark-grey font-normal block text-sm">Choose feature state</span>
                    </label>

                    <select 
                        className="mt-3 cursor-pointer rounded-lg p-4 text-md bg-light-cream w-full text-dark-grey" 
                        name="status" 
                        id="status"
                        {...register("status", { required: true})} 
                        >
                        {["Planned", "In-Progress", "Live"].map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                )}

                {/* Details */}
                <div className="mb-5">
                    <label htmlFor="title" className="text-dark-grey font-bold">
                        Feedback Detail
                        <span className="text-dark-grey font-normal block text-sm">Include any specific comments on what should be improved, added, etc.</span>
                    </label>

                    <textarea 
                        onKeyUp={(e) => setDetailCharacters(e.target.value.length)} 
                        id="detail" 
                        type="text"
                        rows="4"
                        maxLength="100"
                        className={`bg-light-cream mt-3 p-3 w-full rounded-lg ${errors.detail && 'border-2 border-red-500'}`} 
                        {...register("detail", 
                            { 
                                required: "Detail on feedback is required", 
                                maxLength: {
                                    value: 100, 
                                    message: "Must be less than 100 characters"
                                } 
                            }
                        )} 
                    />
                    <FormCharactersContainer count={detailCharacters} limit={100}  />
                    {errors.detail && 
                        <p className="text-red-500 mt-1" role="alert">
                            {errors.detail?.message}
                        </p>}
                </div>

                {/* Submit / Cancel */}
                <div className="flex justify-end">
                    {type === 'edit' && (
                        <div className='mr-auto'>
                            <FeedBackButton submit handleClick={(e) => handleClickSubmit(e)} name={'delete'} bgColor={'bg-danger-red'}>
                                Delete
                            </FeedBackButton>
                        </div>
                    )}

                    <div className="mr-2">
                        <Link href={'/'}>
                            <FeedBackButton bgColor={'bg-dark-grey'}>Cancel</FeedBackButton>
                        </Link>
                    </div>
                    <div>
                        <FeedBackButton submit handleClick={(e) => handleClickSubmit(e)} name={type === 'create' ? 'post' : 'update'} bgColor={'bg-dark-purple'}>
                            {type === 'create' ? 'Add Feedback' : 'Edit Feedback'}
                        </FeedBackButton>
                    </div>
                </div>
            </form>
        </FormContainer>
    )
}