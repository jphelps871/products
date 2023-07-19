import FormContainer from "@/components/form/FormContainer";
import FeedBackButton from "@/components/FeedBackButton";
import DropDown from "@/components/Dropdown";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function feedback() {
    const [characters, setCharacters] = useState(60);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    function characterCount(e) {
        const textArea = e.target
        const charactersUsed = textArea.value.length
        setCharacters(60 - charactersUsed)
    }

    return (
        <FormContainer heading={'Create New Feedback'} iconPath={'/images/plus-icon.svg'} IconAlt={'Plus icon'}>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="mb-4">
                    <label htmlFor="title" className="text-dark-grey font-bold">
                        Feedback Title
                        <span className="text-dark-grey font-normal block">Add a short, descriptive headline</span>
                    </label>

                    <input 
                        onKeyUp={(e) => characterCount(e)} 
                        id="title" 
                        type="text" 
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
                    <p className='text-form-text text-sm'>{characters} Characters left</p>
                    {errors.title && <p className="text-red-500 mt-1" role="alert">
                        {errors.title?.message}
                        </p>}
                </div>

                <div className="mb-4">
                </div>

                {/* Buttons */}
                <div className="flex justify-end">
                    <div className="mr-2">
                        <Link href="/">
                            <FeedBackButton bgColor={'dark-grey'}>Cancel</FeedBackButton>
                        </Link>
                    </div>
                    <div>
                        <FeedBackButton submit bgColor={'dark-purple'}>Add Feedback</FeedBackButton>
                    </div>
                </div>
            </form>
        </FormContainer>
    )
}