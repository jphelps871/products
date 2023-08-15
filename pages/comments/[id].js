// import { createPathsObject, getFeedbackById } from '../../lib/localData'
import Head from 'next/head'
import prisma from '../api/prisma/prisma'
import CommentForm from '@/components/CommentForm'
import Card from '@/components/Card'
import CardFeedback from '@/components/CardFeedback'
import FeedBackButton from "@/components/FeedBackButton"
import Comments from '@/components/Comments'
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
            // comments: {
            //     select: {
            //       id: true,
            //       comment: true,
            //       childComments: {
            //         select: {
            //             id: true,
            //             comment: true,
            //             user: {
            //                 select: {
            //                     id: true,
            //                     username: true,
            //                     name: true,
            //                     avatar: true                
            //                 }
            //             }
            //         }
            //       },
            //       user: {
            //         select: {
            //             id: true,
            //             username: true,
            //             name: true,
            //             avatar: true
            //         }
            //       }
            //     },
            // },
            category: {
                select: {
                  name: true,
                },
            },
        },
    })

    const allComments = await prisma.comment.findMany({
        where: {
            feedbackId: parseInt(params.id),
        },
        select: {
        id: true,
        comment: true,
        parentId: true,
        user: {
            select: {
                id: true,
                name: true,
                username: true,
                avatar: true
            }
        }
        }
    });

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

    const comments = buildCommentTree(allComments);
    return {props: { feedback, comments }}
}

export default function CommentPage({feedback, comments}) {
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
                        commentsNumber={comments.length} />

                    <Card tailwindStyles={'bg-white rounded-lg'}>
                        <p className='font-bold text-dark-grey text-xl'>{comments.length} Comments</p>

                        <Comments comments={comments} />
                    </Card>
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