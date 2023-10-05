import prisma from "./prisma/prisma"

function validateFeedback(comment, userId, feedbackId) {
    const validationErrors= {}

    if (!comment || comment.trim().length === 0) {
        validationErrors['comment'] = "comment cannot be empty"
    } else if (comment.length > 250) {
        validationErrors['comment'] = "Must be less than 250 characters"
    }

    if (!userId) {
        validationErrors['userId'] = "User must be logged in"
    }

    if (!feedbackId) {
        validationErrors['feedbackId'] = "Comment must have a feedback"
    }

    return validationErrors
}

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const body = JSON.parse(req.body)
        const validationErrors = validateFeedback(body?.comment || "", body?.userId || "", body?.feedbackId || "")

        if (JSON.stringify(validationErrors) !== '{}') {
            res.status(400).json({data: validationErrors})
        }

        /*
            comment   String   @db.VarChar(255)
            feedbackId Int
            userId String
            parentId      Int?      @unique
        */
        const commentCreated = await prisma.comment.create({
            data: {
                comment: body.comment,
                feedbackId: parseInt(body.feedbackId),
                userId: body.userId,
                parentId: body?.commentId ? parseInt(body.commentId) : null,
            }
        })

        if (!commentCreated) {
            res.status(400).json({data: commentCreated})
        }

        res.status(200).json({data: "Comment added"})
    } else if (req.method === "GET") {

        const { feedbackId } = req.query

        try {
            const feedback = await prisma.feedback.findUnique({
                where: {
                    id: parseInt(feedbackId),
                },
                select: {
                    comments: {
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
                    }
                },
            })
        
            const comments = feedback.comments;
            res.status(200).json({ comments })

        } catch (error) {
            res.status(400).json({error})
        }
    }

}