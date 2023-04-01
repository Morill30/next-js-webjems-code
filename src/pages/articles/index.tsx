import TopBackgroundHeader from "@/components/TopBackgroundHeader";
import Image from "next/image";
import FsLightbox from "fslightbox-react";
import React, { useEffect, useState } from "react";

export default function Articles({ posts }: { posts: any }) {
  useEffect(() => {
    console.log(posts);
  });
  const [toggler, setToggler] = useState(false);
  return (
    <main className={`relative flex flex-col`}>
      <TopBackgroundHeader />
      <div className=" -mt-16 z-10">
        <h2 className=" md:ml-10 mb-10 font-thin tracking-wide text-md text-white flex items-center justify-center md:justify-start">
          Articles
        </h2>

        {posts.data.map((post: any, index: number) => (
          <React.Fragment key={index + "-postsx"}>
            <div
              onClick={() => setToggler(!toggler)}
              className=" max-w-[500px] text-left flex flex-col rounded-md border-4 border-white shadow-md cursor-pointer transform transition duration-500 hover:scale-[1.01]"
            >
              <div className=" w-full h-40 bg-gray-50  flex-shrink-0 relative">
                <Image
                  className="object-cover w-5 rounded-md"
                  src={`${post.attributes.topImage.data.attributes.url}`}
                  fill
                  style={{ objectFit: "contain" }}
                  alt="Background image"
                />
              </div>
              <div className=" p-4">
                <div className=" flex flex-col md:flex-row md:justify-between md:items-center pb-2">
                  <span className=" font-semibold text-gray-700">
                    {post.attributes.title}
                  </span>

                  <span className=" font-light text-[12px] text-gray-700">
                    {new Date(post.attributes.publishedAt).toLocaleString()}
                  </span>
                </div>

                <div
                  className="pb-3"
                  dangerouslySetInnerHTML={{
                    __html: post.attributes.Overview,
                  }}
                />
                <span className=" font-bold text-gray-700">Pros</span>
                <ul className=" list-disc list-outside marker:text-gray-500 pl-6 pb-3">
                  {post.attributes.pros.map((text: string, index: number) => (
                    <li key={"pros-item" + index}>{text}</li>
                  ))}
                </ul>
                <span className=" font-bold text-gray-700">Crons</span>
                <ul className=" list-disc list-outside marker:text-gray-700 pl-6 pb-3">
                  <li>The service can get pretty expensive for a simple app</li>
                  <li>
                    Only way to properly use it is with a load balancer which is
                    expensive
                  </li>
                  <li>Even the Fargate service can be complicated to set up</li>
                </ul>
              </div>
            </div>
            <FsLightbox
              toggler={toggler}
              sources={[`${post.attributes.topImage.data.attributes.url}`]}
            />
          </React.Fragment>
        ))}
      </div>
    </main>
  );
}

// Triggered on each request
export async function getServerSideProps() {
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
  // Pass the data to the page via props
  return { props: { posts } };
}
