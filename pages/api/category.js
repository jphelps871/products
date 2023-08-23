import prisma from "./prisma/prisma";

export default async function handler(req, res) {
    if (req.method === 'GET') {

        try {
            const data = await prisma.category.findMany({
                select: {
                    id: true,
                    name: true,
                }
            })

            res.status(200).json({data: data})

        } catch(error) {

            res.status(400).json({data: error})
        }
    }
}