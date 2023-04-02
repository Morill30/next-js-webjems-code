// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { options } from "./auth/[...nextauth]";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getServerSession(req, res, options);
  if (session) {
    res.status(200).json({
      message:
        "This is protected content. You can access this content because you are signed in.",
    });
  } else {
    res.status(400).json({
      message:
        "You must be sign in to view the protected content on this page.",
    });
  }

  // res.status(200).json({ name: 'John Doe' })
}
