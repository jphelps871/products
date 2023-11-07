import prisma from "./prisma/prisma";
import { allFeedback } from "@/lib/prismaQueries/feedback";
import * as Validator from "validatorjs";

// CRUD OPERATIONS
export default async function handler(req, res) {
  if (req.method === "POST") {
    return createFeedback(req, res);
  } else if (req.method === "GET") {
    return getFeedback(req, res);
  } else if (req.method === "DELETE") {
    return deleteFeedback(req, res);
  } else if (req.method === "PUT") {
    return updateFeedback(req, res);
  }

  res.status(500).json({ message: "Something went wrong ☹️" });
}

// Create
async function createFeedback(req, res) {
  const body = JSON.parse(req.body);

  // Validation
  validate(body);

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

// Put
async function updateFeedback(req, res) {
  const body = JSON.parse(req.body);

  // Validation
  validate(body);

  const data = {
    title: body.title,
    detail: body.detail,
    categoryId: parseInt(body.category),
    statusId: parseInt(body.status),
  };

  try {
    await prisma.feedback.update({
      where: {
        id: body.feedbackId,
      },
      data: data,
    });

    res.status(200).json({ message: "Feedback updated" });
  } catch (error) {
    res.status(400).json({ error });
  }
}

// Get
async function getFeedback(req, res) {
  const { feedbackId, category, sort } = req.query;

  try {
    let feedback = null;

    if (feedbackId) {
      feedback = await getFeedbackById(feedbackId);
    } else if (category) {
      feedback = await getFeedbackByCategory(category);
    } else if (sort) {
      feedback = await getFeedbackBySortBy(sort);
    }

    res.status(200).json({ feedback });
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function getFeedbackById(feedbackId) {
  return prisma.feedback.findUnique({
    where: {
      id: parseInt(feedbackId),
    },
    select: allFeedback,
  });
}

async function getFeedbackByCategory(categoryName) {
  const findManyObj = { select: allFeedback };

  if (categoryName != "All") {
    findManyObj.where = {
      category: {
        name: categoryName,
      },
    };
  }

  return prisma.feedback.findMany(findManyObj);
}

async function getFeedbackBySortBy(sortText) {
  const findManyObj = { select: allFeedback };
  const sortBy = sortText.toUpperCase();

  // Update findManyObj using if else statements
  orderResultsBySortByText(findManyObj, sortBy);

  return prisma.feedback.findMany(findManyObj);
}

// Delete
async function deleteFeedback(req, res) {
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
}

// Helper functions
function validate(data) {
  const validation = new Validator(data, {
    title: "required|max:150",
    detail: "required|max:450",
    category: "required",
  });

  if (validation.fails()) {
    res.status(400).json(validation.errors);
  }
}

function orderResultsBySortByText(results, sortText) {
  if (sortText == "MOST COMMENTS") {
    results.orderBy = {
      comments: {
        _count: "desc",
      },
    };
  } else if (sortText == "LEAST COMMENTS") {
    results.orderBy = {
      comments: {
        _count: "asc",
      },
    };
  } else if (sortText == "MOST UPVOTES") {
    results.orderBy = {
      upvotes: {
        _count: "desc",
      },
    };
  } else {
    results.orderBy = {
      upvotes: {
        _count: "asc",
      },
    };
  }
}
