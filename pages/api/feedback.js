import prisma from "./prisma/prisma"

function validateFeedback(title, detail, category) {
    const validationErrors= {}

    if (!title || title.trim().length === 0) {
        validationErrors['title'] = "Title cannot be empty"
    } else if (title.length > 60) {
        validationErrors['title'] = "Must be less than 60 characters"
    }
    if (!detail || detail.trim().detail === 0) {
        validationErrors['detail'] = "Detail cannot be empty"
    } else if (title.detail > 100) {
        validationErrors['detail'] = "Must be less than 100 characters"
    }
    if (!category) {
        validationErrors['category'] = "Category cannot be empty"
    } 

    return validationErrors
}

export default async function handler(req, res) {    
    console.log(req.body)

    if (req.method === 'POST') {
        const body = JSON.parse(req.body)
        const validationErrors = validateFeedback(body?.title || "", body?.detail || "", body?.category || "")

        if (JSON.stringify(validationErrors) !== '{}') {
            res.status(400).json({data: validationErrors})
        }

        /**
         * "12183309418-23491234" is the user ID of default user, when a user
         * is not logged in, the feedback will be created as if byt this user
         */
        const userId = body.userId ? body.userId : "12183309418-23491234"

        try {

            await prisma.feedback.create({
                data: {
                    title: body.title,
                    detail: body.detail,
                    categoryId: parseInt(body.category),
                    authorId: userId
                }
            })

            res.status(400).json({data: "Feedback added"})
        } catch (error) {

            res.status(400).json({data: error})
        }

    } else if (req.method === "GET") {
        const { feedbackId } = req.query

        try {
            const feedback = await prisma.feedback.findUnique({
                where: {
                    id: parseInt(feedbackId)
                },
                select: {
                    title: true,
                    detail: true,
                    authorId: true,
                    category: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            })

            res.status(200).json({ data: feedback })
        } catch (error) {

            res.status(400).json({ data: error })
        }

    } else if (req.method === 'DELETE') {
        const { feedbackId } = req.query

        try {
            await prisma.feedback.delete({
                where: {
                    id: parseInt(feedbackId)
                },
            })
        } catch (error) {

            res.status(400).json({ data: error })
        }
        
        res.status(200).json({ data: "Feedback deleted" })
    }

}