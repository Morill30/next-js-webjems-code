import Image from "next/image";
import React from "react";
import Link from "next/link";
import Likes from "@/components/Likes";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { NextApiRequest, NextApiResponse } from "next";

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export default function Articles({ posts }: { posts: any }) {
  return (
    <main className={`relative flex flex-col`}>
      <div>
        <div className="flex flex-col justify-center md:justify-start ml-10 my-5">
          <h2
            className={` font-bold m-0 tracking-wide text-5xl flex items-center ${plus_Jakarta_Sans.className}`}
          >
            Articles
          </h2>
          <span className="text-gray-600 ">Latest articles from Jean</span>

          <div className={`${plus_Jakarta_Sans.className} mt-10 mb-4 `}>
            <ul
              className="flex flex-wrap -mb-px text-sm font-medium text-center"
              role="tablist"
            >
              <li className="mr-2" role="presentation">
                <button
                  className="inline-block p-4 border-b-2 rounded-t-lg hover:text-blue-400"
                  id="profile-tab"
                  data-tabs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  All Articles
                </button>
              </li>
            </ul>
          </div>
        </div>

        {posts ? (
          posts.data.map((post: any, index: number) => (
            <React.Fragment key={index + "-postsx"}>
              <div className=" max-w-[425px] text-left flex flex-col rounded-md border-4 border-white shadow-md">
                <div className=" w-full h-40 bg-gray-50  flex-shrink-0 relative">
                  <Image
                    className="object-cover w-5 rounded-md"
                    src={`${post.attributes.topImage.data.attributes.url}`}
                    fill
                    style={{ objectFit: "cover", objectPosition: "top" }}
                    alt="Background image"
                  />
                </div>
                <div className=" p-4">
                  <div className=" flex flex-col md:flex-row md:justify-between md:items-center pb-2">
                    <span className=" font-semibold text-gray-700">
                      {post.attributes.title}
                    </span>

                    <span className=" font-light text-[12px] text-gray-700">
                      {new Date(post.attributes.publishedAt).toLocaleDateString(
                        "en-US"
                      )}
                    </span>
                  </div>

                  <Likes user_likes={post.attributes.user_likes} />

                  <div
                    className="pb-3"
                    dangerouslySetInnerHTML={{
                      __html: post.attributes.Overview,
                    }}
                  />

                  <Link
                    href={`/articles/${post.id}`}
                    className=" relative block text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-5 mb-2"
                  >
                    Read More . . .
                  </Link>
                </div>
              </div>
            </React.Fragment>
          ))
        ) : (
          <div className=" flex justify-center items-center h-[50vh]">
            <span className=" text-gray-600 font-normal text-2xl text-center">
              Sorry the service your are trying to see is not available at the
              moment.
            </span>
          </div>
        )}
      </div>
    </main>
  );
}

// Triggered on each request
export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const session = await getServerSession(req, res, options);
  try {
    // Fetching data from an API
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts?populate=*`,
      {
        headers: {
          Authorization: `bearer ${process.env.STRAPI_KEY}`,
        },
      }
    );
    const posts = await res.json();
    return { props: { posts, session } };
  } catch (e) {
    console.log("api call not available");
    return { props: { posts: null, session } };
  }
}
