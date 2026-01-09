import prisma from "./prisma/prisma";
import { allFeedback } from "@/lib/prismaQueries/feedback";
import * as Validator from "validatorjs";
import { Filter } from "profanity-check";

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
  const body = req.body;

  try {
    // Validation
    validation(
      body,
      {
        title: "required|max:250",
        detail: "required|max:450",
      },
      {
        title: "profanity",
        detail: "profanity",
      }
    );

    // Create data for send via Prisma
    const data = {
      title: body.title,
      detail: body.detail,
      categoryId: parseInt(body.category),
      statusId: 1, // "Planned"
      authorId: body.userId,
    };

    await prisma.feedback.create({ data });
    res.status(200).json({ message: "Feedback added" });
  } catch (error) {
    res.status(400).json(error);
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
function validation(data, rules, customRules) {
  let validation = new Validator(data, rules);

  // loop through fields with custom rules
  for (const field in customRules) {
    if (!Object.hasOwn(customRules, field)) continue;

    const rulesStr = customRules[field]; // e.g. "profanity|other"
    const rulesArr = rulesStr.split("|");

    for (const rule of rulesArr) {
      const value = data[field];

      if (!value) continue;

      // Profanity (Stop swear words)
      if (rule === "profanity") {
        const filter = new Filter();
        if (filter.isProfane(value)) {
          console.log("working");
          validation.errors.add(field, "Please refrain from bad words");
        }
      }
    }
  }

  const customValidationFails = Object.keys(validation.errors.all()).length > 0;

  if (validation.fails() || customValidationFails) {
    throw validation.errors;
  }

  return data;
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
