import prisma from "./prisma/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    let { userId, feedbackId } = req.query;
    feedbackId = parseInt(feedbackId);

    const existingUpvote = await prisma.upvote.findUnique({
      where: { userId_feedbackId: { userId, feedbackId } },
    });

    if (existingUpvote) {
      return res.status(200).json({ message: "User has already upvoted", upvote: true });
    }

    return res.status(200).json({ message: "User has not upvoted", upvote: false });
  } else {
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

      res.status(400).json({ error: "User has not voted on feedback" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while adding the upvote." });
    }
  }
}
