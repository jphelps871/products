import { createPathsObject, getFeedbackById } from '../../lib/localData'
import Head from 'next/head'
import CommentForm from '@/components/CommentForm'
import Link from 'next/link'
import Card from '@/components/Card'
import CardFeedback from '@/components/CardFeedback'
import FeedBackButton from "@/components/FeedBackButton"
import Comment from '@/components/Comment'
import BackLink from '@/components/BackLink'

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
    const numberOfComments = comments.length

    return (
        <>
            <Head>
                <title>Feedback Board | Comments</title>
            </Head>
            <div className='max-w-screen-md mx-auto pt-5 px-5 sm:pt-10'>
                <div className='flex items-center justify-between'>
                    <div>
                        <BackLink />
                    </div>
                    <div>
                        <FeedBackButton bgColor={'dark-blue'}>Edit Feedback</FeedBackButton>
                    </div>
                </div>
                <div className='flex flex-col gap-5 mt-5'>
                    <CardFeedback 
                        category={feedback.category} 
                        upvoteNumber={feedback.numberOfUpvotes} 
                        heading={feedback.heading} 
                        body={feedback.body} 
                        commentsNumber={feedback.numberOfComments} />

                    <Card>
                        <p className='font-bold text-dark-grey text-xl'>{numberOfComments} Comments</p>

                        {comments.map(comment => (
                            <Comment key={comment.id} comment={comment} />
                        ))}
                    </Card>
                </div>

                <div className='mt-10 mb-20'>
                    <Card>
                        <p className='font-bold text-dark-grey text-xl mb-8'>Add Comment</p>
                        <CommentForm />
                    </Card>
                </div>
            </div>
        </>
    )
}