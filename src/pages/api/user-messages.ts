// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { options } from "./auth/[...nextauth]";
import { Session } from "next-auth";

type Data = {
  data?: [] | string;
};

/**
 * User Messages API
 * @deprecated
 * @param req
 * @param res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session: Session | null = await getServerSession(req, res, options);

  if (session) {
    const responseMessage = { error: 0, data: "Sorry This API is deprecated" };
    if (!responseMessage.error) {
      res.status(200).json(responseMessage);
    } else {
      res.status(400).json({
        data: "Wrong id or something is wrong",
      });
    }
  } else {
    res.status(400).json({
      data: "You must be sign in to view the protected content on this page.",
    });
  }
}
