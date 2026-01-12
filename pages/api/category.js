import prisma from "./prisma/prisma";
import validation from "@/services/validation";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
        },
      });

      res.status(200).json({ data: data });
    } catch (error) {
      res.status(400).json({ data: error });
    }
  }

  if (req.method === "POST") {
    try {
      const validated = validation(
        req.body,
        {
          name: "required|max:20",
        },
        {
          name: "profanity", // custom rule
        }
      );

      const created = await prisma.category.create({ data: validated });

      res.status(200).json({ message: `${created.name} added to categories` });
    } catch (error) {
      res.status(400).json(error);
    }
  }

  if (req.method === "DELETE") {
    try {
      const validated = validation({ category: parseInt(req.query.id) }, { category: "required|integer|min:1" });

      const deleted = await prisma.category.delete({
        where: { id: validated.category },
      });

      res.status(200).json({ message: `${deleted.name} deleted` });
    } catch (error) {
      res.status(400).json(error);
    }
  }

  if (req.method === "PUT") {
    try {
      validation(req.body, {
        name: "required",
      });

      const updated = await prisma.category.update({
        where: {
          id: parseInt(req.query.id),
        },
        data: {
          name: req.body.name,
        },
      });

      return res.status(200).json({ message: `${updated.name} updated` });
    } catch (error) {
      if (error.code === "P2002") {
        return res.status(400).json({ errors: { name: ["Category name already exists"] } });
      }

      return res.status(400).json(error);
    }
  }
}
