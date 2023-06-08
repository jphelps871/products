import { createPathsObject, getFeedbackById } from '../../lib/localData'
import Head from 'next/head'
import Link from 'next/link'
import Card from '@/components/Card'
import CardFeedback from '@/components/CardFeedback'
import FeedBackButton from "@/components/FeedBackButton"

export async function getStaticPaths() {
    const pathObject = await createPathsObject()
    return {
        paths: pathObject,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const feedback = await getFeedbackById(params.id)
    return {props: { feedback }}
}

export default function CommentPage({feedback}) {
    const comments = feedback.comments

    return (
        <>
            <Head>
                <title>Feedback Board | Comments</title>
            </Head>
            <div className='max-w-screen-md mx-auto pt-5 px-5 sm:pt-10'>
                <div className='flex items-center justify-between'>
                    <div>
                        <Link href={'/'} className='flex items-center'>
                            <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.33447 9L2.33447 5L6.33447 1" stroke="#4661E6" stroke-width="2"/>
                            </svg>
                            <p className='text-light-slate font-bold ml-2 hover:underline'>Go Back</p>
                        </Link>
                    </div>
                    <div>
                        <FeedBackButton bgColor={'dark-blue'}/>
                    </div>
                </div>
                <div className='flex flex-col gap-5 mt-5'>
                    <CardFeedback category={feedback.category} upvoteNumber={feedback.numberOfUpvotes} heading={feedback.heading} body={feedback.body} commentsNumber={feedback.numberOfComments} />
                    <Card>
                        <p className='font-bold'>4 Comments</p>

                        {comments.map(comment => (
                            <div className='flex gap-3 mt-5 mb-8 border-b-2 border-gray-100'>
                                <div>
                                    <div>
                                        FACE
                                    </div>
                                </div>
                                <div className='grow mb-4'>
                                    <div className='flex justify-between'>
                                        <p className='font-bold'>
                                            {comment.user}
                                        </p>
                                        <div className='text-sm text-dark-blue'>
                                            Reply
                                        </div>
                                    </div>
                                    <p>
                                        {comment.comment}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Card>
                </div>
            </div>
        </>

    )
}