// import { createPathsObject, getFeedbackById } from '../../lib/localData'
import Head from 'next/head'
import prisma from '../api/prisma/prisma'
import CommentForm from '@/components/CommentForm'
import Card from '@/components/Card'
import CardFeedback from '@/components/CardFeedback'
import FeedBackButton from "@/components/FeedBackButton"
import Comments from '@/components/Comments'
import BackLink from '@/components/BackLink'
import supabase from '@/utils/supabase'
import { getComments } from '@/services/getComments'
import { useEffect, useState } from 'react'


function buildCommentTree(comments) {
    const commentMap = {};
    const tree = [];

    comments.forEach(comment => {
        comment.children = [];
        commentMap[comment.id] = comment;
        if (!comment.parentId) {
            tree.push(comment);
        } else {
            const parentComment = commentMap[comment.parentId];
            if (parentComment) {
                const parentUsername = parentComment.user.username;
                parentComment.children.push({ ...comment, parentUsername });
            }
        }
    });

    return tree;
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    const feedback = await prisma.feedback.findUnique({
        where: {
            id: parseInt(id),
        },
        select: {
            id: true,
            upvotes: true,
            title: true,
            detail: true,
            category: {
                select: {
                  name: true,
                },
            },
            // comments: {
            //     select: {
            //         id: true,
            //         comment: true,
            //         parentId: true,
            //         user: {
            //             select: {
            //                 id: true,
            //                 name: true,
            //                 username: true,
            //                 avatar: true
            //             }
            //         }
            //     }
            // }
        },
    })

    return {props: { feedback }}
}

export default function CommentPage({feedback}) {
    const [allComments, setComments] = useState()
    const [commentsLength, setCommentsLength] = useState(0)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        getComments(feedback.id).then(data => {
            const comments = buildCommentTree(data.comments)
            setCommentsLength(data.comments.length)
            setComments(comments)
            setLoading(false)
        })
    }, [])

    const channel = supabase
        .channel('schema-db-changes')
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'Comment',
            },
            () => {
                getComments(feedback.id).then(data => {
                    const comments = buildCommentTree(data.comments)
                    setComments(comments)
                 })
            }
        )
        .subscribe()

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
                        commentsNumber={commentsLength} />

                    {isLoading ? (
                        <h1>Loading...</h1>
                    ) : (
                        <Card tailwindStyles={'bg-white rounded-lg'}>
                            <p className='font-bold text-dark-grey text-xl'>{commentsLength} Comments</p>

                            <Comments comments={allComments} />
                        </Card>
                    )}
                </div>

                <div className='mt-10 mb-20'>
                    <Card tailwindStyles={'bg-white rounded-lg'}>
                        <p className='font-bold text-dark-grey text-xl mb-8 '>Add Comment</p>
                        <CommentForm buttonText={"Post Comment"} feedbackId={feedback.id} />
                    </Card>
                </div>
            </div>
        </>
    )
}