import prisma from "./prisma/prisma";
import { allFeedback } from "@/lib/prismaQueries/feedback";
import * as Validator from "validatorjs";

async function createFeedback(req, res) {
  const body = JSON.parse(req.body);

  // Validation
  const validation = new Validator(body, {
    title: "required|max:150",
    detail: "required|max:450",
    category: "required",
  });

  if (validation.fails()) {
    res.status(400).json(validation.errors);
  }

  // Create data for send via Prisma
  const data = {
    title: body.title,
    detail: body.detail,
    categoryId: parseInt(body.category),
    statusId: 1, // "Planned"
    authorId: body.userId,
  };

  try {
    await prisma.feedback.create({ data });
    res.status(200).json({ message: "Feedback added" });
  } catch (error) {
    res.status(400).json({ error });
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    createFeedback(req, res);
  } else if (req.method === "GET") {
    const { feedbackId, category, sort } = req.query;

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
      } else if (sort) {
        const findManyObj = { select: allFeedback };
        const sortBy = sort.toUpperCase();

        if (sortBy == "MOST COMMENTS") {
          findManyObj.orderBy = {
            comments: {
              _count: "desc",
            },
          };
        } else if (sortBy == "LEAST COMMENTS") {
          findManyObj.orderBy = {
            comments: {
              _count: "asc",
            },
          };
        } else if (sortBy == "MOST UPVOTES") {
          findManyObj.orderBy = {
            upvotes: {
              _count: "desc",
            },
          };
        } else {
          findManyObj.orderBy = {
            upvotes: {
              _count: "asc",
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

    const validation = new Validator(body, {
      title: "required|max:150",
      detail: "required|max:450",
      category: "required",
    });

    if (validation.fails()) {
      res.status(400).json(validation.errors);
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
