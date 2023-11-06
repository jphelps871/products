import prisma from "./prisma/prisma";

export default async function handler(req, res) {
  const { userId, feedbackId } = req.body;

  try {
    const existingUpvote = await prisma.upvote.findUnique({
      where: { userId_feedbackId: { userId, feedbackId } },
    });

    if (existingUpvote) {
      // Remove upvote
      await prisma.upvote.deleteMany({
        where: { userId: userId, feedbackId: feedbackId },
      });

      res.status(200).json({ message: "Upvote removed successfully", upvote: false });
    } else {
      await prisma.upvote.create({
        data: {
          userId,
          feedbackId,
        },
      });

      res.status(200).json({ message: "Upvote added successfully", upvote: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding the upvote." });
  }
}
