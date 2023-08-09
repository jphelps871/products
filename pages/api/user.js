import { generateFromEmail } from "unique-username-generator";
import prisma from "./prisma/prisma";

export default async function handler(req, res) {
    const body = req.body

    const user = await prisma.user.findUnique({
        where: {
            id: body.id
        }
    })

    if (user) return res.status(200).json({data: "User exists"})


    // Make sure username is unique if not, create new usernames
    let createUsername = generateFromEmail(body.email, 3)
    let isUsernameUnique = false

    while (!isUsernameUnique) { 
        const usernameExists = await prisma.user.findUnique({
            where: {
                username: createUsername
            }
        })

        if (!usernameExists) {
            isUsernameUnique = false
            break
        }

        createUsername = generateFromEmail(body.email, 3)
    }

    try {
        await prisma.user.create({
            data: {
                id: body.id,
                email: body.email,
                name: body.name,
                avatar: body.avatar,
                username: body.username,
            }
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({data: error})
    }

    res.status(200).json({data: "User added"})
}