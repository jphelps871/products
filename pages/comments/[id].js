// import { createPathsObject, getFeedbackById } from '../../lib/localData'
import Head from 'next/head'
import prisma from '../api/prisma/prisma'
import CommentForm from '@/components/CommentForm'
import Card from '@/components/Card'
import CardFeedback from '@/components/CardFeedback'
import FeedBackButton from "@/components/FeedBackButton"
import Comment from '@/components/Comment'
import BackLink from '@/components/BackLink'

export async function getStaticPaths() {
    const feedback = await prisma.feedback.findMany({
        select: {
            id: true
        }
    })
    const paths = feedback.map((feedback) => ({
        params: { id: feedback.id.toString() },
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const feedback = await prisma.feedback.findUnique({
        where: {
            id: parseInt(params.id),
        },
        select: {
            id: true,
            upvotes: true,
            title: true,
            detail: true,
            comments: true,
            category: {
                select: {
                  name: true,
                },
            },
        },
    })

    // const feedback = await getFeedbackById(params.id)
    return {props: { feedback }}
}

export default function CommentPage({feedback}) {
    console.log(feedback)

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
                        <FeedBackButton bgColor={'bg-dark-blue'}>Edit Feedback</FeedBackButton>
                    </div>
                </div>
                <div className='flex flex-col gap-5 mt-5'>
                    <CardFeedback 
                        category={feedback.category.name} 
                        upvoteNumber={feedback.upvotes} 
                        heading={feedback.title} 
                        body={feedback.detail} 
                        commentsNumber={feedback.comments.length} />

                    <Card tailwindStyles={'bg-white rounded-lg'}>
                        <p className='font-bold text-dark-grey text-xl'>{feedback.comments.length} Comments</p>

                        {feedback.comments.map(comment => (
                            <Comment key={comment.id} comment={comment} />
                        ))}
                    </Card>
                </div>

                <div className='mt-10 mb-20'>
                    <Card tailwindStyles={'bg-white rounded-lg'}>
                        <p className='font-bold text-dark-grey text-xl mb-8'>Add Comment</p>
                        <CommentForm />
                    </Card>
                </div>
            </div>
        </>
    )
}