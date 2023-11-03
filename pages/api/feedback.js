import prisma from "./prisma/prisma";
import { allFeedback } from "@/lib/prismaQueries/feedback";

function validateFeedback(title, detail, category) {
  const validationErrors = {};

  if (!title || title.trim().length === 0) {
    validationErrors["title"] = "Title cannot be empty";
  } else if (title.length > 60) {
    validationErrors["title"] = "Must be less than 60 characters";
  }
  if (!detail || detail.trim().detail === 0) {
    validationErrors["detail"] = "Detail cannot be empty";
  } else if (title.detail > 100) {
    validationErrors["detail"] = "Must be less than 100 characters";
  }
  if (!category) {
    validationErrors["category"] = "Category cannot be empty";
  }

  return validationErrors;
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    const validationErrors = validateFeedback(body?.title || "", body?.detail || "", body?.category || "");

    if (JSON.stringify(validationErrors) !== "{}") {
      res.status(400).json({ validationErrors });
    }

    const data = {
      title: body.title,
      detail: body.detail,
      categoryId: parseInt(body.category),
      statusId: 1,
      authorId: body?.userId,
    };

    try {
      await prisma.feedback.create({ data });

      res.status(200).json({ message: "Feedback added" });
    } catch (error) {
      res.status(400).json({ error });
    }
  } else if (req.method === "GET") {
    const { feedbackId, category } = req.query;

    try {
      let feedback = null;

      if (feedbackId) {
        feedback = await prisma.feedback.findUnique({
          where: {
            id: parseInt(feedbackId),
          },
          select: allFeedback,
        });
      } else if (category) {
        const findManyObj = { select: allFeedback };

        if (category != "All") {
          findManyObj.where = {
            category: {
              name: category,
            },
          };
        }

        feedback = await prisma.feedback.findMany(findManyObj);
      }

      res.status(200).json({ feedback });
    } catch (error) {
      res.status(400).json({ error });
    }
  } else if (req.method === "DELETE") {
    const { feedbackId } = req.query;

    try {
      await prisma.feedback.delete({
        where: {
          id: parseInt(feedbackId),
        },
      });
    } catch (error) {
      res.status(400).json({ error });
    }

    res.status(200).json({ message: "Feedback deleted" });
  } else if (req.method === "PUT") {
    const body = JSON.parse(req.body);
    const validationErrors = validateFeedback(body?.title || "", body?.detail || "", body?.category || "");

    if (JSON.stringify(validationErrors) !== "{}") {
      res.status(400).json({ validationErrors });
    }

    try {
      await prisma.feedback.update({
        where: {
          id: body.feedbackId,
        },
        data: {
          title: body.title,
          detail: body.detail,
          categoryId: parseInt(body.category),
          statusId: parseInt(body.status),
        },
      });

      res.status(200).json({ message: "Feedback updated" });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}
