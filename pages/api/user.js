import { generateFromEmail } from "unique-username-generator";
import prisma from "./prisma/prisma";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const user = await prisma.user.findUnique({
    where: {
      id: body.id,
    },
  });
  if (user) return res.status(200).json({ data: "User exists" });

  /* 
    Make sure username is unique, if not, create a new username
    until the username does not exist. Multiple loops
    very unlikely
  */
  let createdUsername = generateFromEmail(body.email, 3);
  let isUsernameUnique = false;

  while (!isUsernameUnique) {
    const usernameExists = await prisma.user.findUnique({
      where: {
        username: createdUsername,
      },
    });

    if (!usernameExists) {
      isUsernameUnique = false;
      break;
    }

    createdUsername = generateFromEmail(body.email, 3);
  }

  try {
    await prisma.user.create({
      data: {
        id: body.id,
        email: body.email,
        name: body.user_metadata.name,
        avatar: body.user_metadata.avatar_url,
        username: createdUsername,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ data: error });
  }

  res.status(200).json({ data: "User added" });
}
