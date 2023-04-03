// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { options } from "./auth/[...nextauth]";

type Data = {
  message: string;
  session?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getServerSession(req, res, options);
  if (session) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/2`,
      {
        method: "PUT",
        headers: {
          Authorization: `bearer ${process.env.STRAPI_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            user_likes: {
              connect: [1],
            },
          },
        }),
      }
    );
    const posts = await response.text();
    console.log(posts);
    res.status(200).json({
      message: JSON.parse(posts),
      session,
    });
  } else {
    res.status(400).json({
      message:
        "You must be sign in to view the protected content on this page.",
    });
  }
  // res.status(200).json({ name: 'John Doe' })
}
