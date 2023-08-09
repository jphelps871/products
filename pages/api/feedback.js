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
    const body = JSON.parse(req.body)
    const validationErrors = validateFeedback(body?.title || "", body?.detail || "", body?.category || "")

    if (JSON.stringify(validationErrors) !== '{}') {
        res.status(400).json({data: validationErrors})
    }

    const userId = body.userId ? body.userId : "12183309418-23491234"

    /*
        title     String   @db.VarChar(255)
        detail    String   @db.VarChar(255)
        authorId String
        categoryId Int
    */
    const feedbackCreated = await prisma.feedback.create({
        data: {
            title: body.title,
            detail: body.detail,
            categoryId: parseInt(body.category),
            authorId: userId
        }
    })

    if (!feedbackCreated) {
        res.status(400).json({data: feedbackCreated})
    }

    res.status(200).json({data: "Feedback added"})
}