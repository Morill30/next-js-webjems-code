// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { options } from "../auth/[...nextauth]";
import { Session } from "next-auth";
import axios from "axios";

type Data = {
  data?: [] | string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session: Session | null = await getServerSession(req, res, options);

  try {
    if (session) {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
        req
        //Removed for safety purposes
      );

      res.status(response?.status).json({
        data: response?.data,
      });
    } else {
      res.status(400).json({
        data: "You must be sign in to view the protected content on this page.",
      });
    }
  } catch (error: Error | any) {
    console.log(error);
    res.status(400).json({
      data: error.message ? error.message : error,
    });
  }
}
