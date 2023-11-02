// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { options } from "../auth/[...nextauth]";
import { Session } from "next-auth/core/types";

type Data = {
  data?: [] | string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session: Session | null = await getServerSession(req, res, options);

  if (session) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users?populate=id,username`,
      {
        method: "GET",
        headers: {
          Authorization: `bearer ${process.env.STRAPI_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.text();
    const responseMessage = JSON.parse(data);
    if (!responseMessage.error) {
      res.status(200).json(responseMessage);
    } else {
      res.status(400).json({
        data: "Fetch failed please check with administrator",
      });
    }
  } else {
    res.status(400).json({
      data: "You must be sign in to view the protected content on this page.",
    });
  }
}
