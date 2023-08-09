import { useRouter } from 'next/router';
import FormContainer from "@/components/form/FormContainer";
import FeedBackButton from "@/components/FeedBackButton";
import FormCharactersContainer from "@/components/form/FormCharactersContainer";
import Link from "next/link";
import prisma from '../api/prisma/prisma';
import { useUser } from "@supabase/auth-helpers-react";
import { useForm } from "react-hook-form";
import { useState } from "react";


export async function getStaticPaths() {
    return {
      paths: [
        { params: { type: 'create' } },
        { params: { type: 'edit' } },
      ],
      fallback: false,
    };
}

export async function getStaticProps() {
    const categories = await prisma.category.findMany()
    return {
      props: {categories},
    };
}

async function send(data, userId) {
    const feedback = data
    feedback['userId'] = userId

    try {
        await fetch('/api/feedback', {
            method: 'POST',
            headers: {'Accept': 'application/json'},
            body: JSON.stringify(feedback)
        })
    } catch (error) {
        console.error(error)
    }


}

export default function feedback({categories}) {
    const user = useUser()
    const router = useRouter();
    const { type } = router.query;

    const [feedbackCharacters, setFeedbackCharacters] = useState(0);
    const [detailCharacters, setDetailCharacters] = useState(0);
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        setLoading(true)
        send(data, user?.id || "");
        setLoading(false)
        reset()
    }

    return (
        <FormContainer heading={'Create New Feedback'} iconPath={'/images/plus-icon.svg'} IconAlt={'Plus icon'}>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

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
                    <div className="mr-2">
                        <Link href={'/'}>
                            <FeedBackButton bgColor={'bg-dark-grey'}>Cancel</FeedBackButton>
                        </Link>
                    </div>
                    <div>
                        <FeedBackButton submit bgColor={'bg-dark-purple'}>
                            {!loading ? 'Add Feedback' : 'Loading...'}
                        </FeedBackButton>
                    </div>
                </div>
            </form>
        </FormContainer>
    )
}