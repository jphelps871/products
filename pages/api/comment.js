import prisma from "./prisma/prisma";
import validation from "@/services/validation";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = req.body;

      validation(
        body,
        {
          comment: "required|max:250",
          userId: "required",
          feedbackId: "required",
        },
        {
          comment: "profanity",
        }
      );

      await prisma.comment.create({
        data: {
          comment: body.comment,
          feedbackId: parseInt(body.feedbackId),
          userId: body.userId,
          parentId: body?.commentId ? parseInt(body.commentId) : null,
        },
      });

      return res.status(200).json({ message: "Comment added" });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  if (req.method === "GET") {
    const { feedbackId } = req.query;

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
                  avatar: true,
                },
              },
            },
          },
        },
      });

      const comments = feedback.comments;
      res.status(200).json({ comments });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}
