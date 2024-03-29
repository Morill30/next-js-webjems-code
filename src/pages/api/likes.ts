// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { options } from "./auth/[...nextauth]";
import { Session } from "next-auth/core/types";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session: Session | null = await getServerSession(req, res, options);

  const postId = req.query.postId;
  console.log(connectionParam(), req.query.disconnect);

  if (session) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}`,
      {
        method: "PUT",
        //Removed for safety purposes
      }
    );
    const data = await response.text();
    const responseMessage = JSON.parse(data);
    if (!responseMessage.error) {
      res.status(200).json({
        message: "Operation done!",
      });
    } else {
      res.status(400).json({
        message: "Wrong id or something is wrong",
      });
    }
  } else {
    res.status(400).json({
      message:
        "You must be sign in to view the protected content on this page.",
    });
  }
}
