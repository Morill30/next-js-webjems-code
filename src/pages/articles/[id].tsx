import TopBackgroundHeader from "@/components/TopBackgroundHeader";
import Image from "next/image";
import FsLightbox from "fslightbox-react";
import { useState } from "react";
import Likes from "@/components/Likes";

export default function Article({ post }: { post: any }) {
  const [toggler, setToggler] = useState(false);
  return (
    <main className={`relative flex flex-col items-center`}>
      <TopBackgroundHeader />
      {post ? (
        <div className=" -mt-20 md:-mt-32 max-w-[1024px] rounded-lg px-6 md:px-10 shadow-lg border-gray-100 z-10 bg-white">
          <h1 className=" mt-5 md:mt-16 text-lg md:text-5xl">
            {post.data.attributes.title}
          </h1>
          <div className="flex flex-col sm:flex-row sm:justify-between my-2 md:my-6 text-sm md:text-md">
            <span>Author: {post.data.attributes.Author}</span>
            <span>
              {new Date(post.data.attributes.publishedAt).toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col items-center mb-6">
            <div className="w-full h-64 relative ">
              <div
                className="flex w-full h-64  flex-shrink-0 relative cursor-pointer rounded-lg shadow-inner overflow-hidden z-10"
                onClick={() => setToggler(!toggler)}
              />
              <Image
                className=" object-cover rounded-md hover:scale-50"
                src={`${post.data.attributes.topImage.data.attributes.url}`}
                fill
                style={{ objectFit: "cover" }}
                alt={
                  post.data.attributes.topImage.data.attributes.alternativeText
                }
              />
            </div>

            <span className="mt-4">
              {post.data.attributes.topImage.data.attributes.alternativeText}
            </span>
          </div>

          <div id="article-body" className=" xl:mx-24 pb-10">
            <div
              className="[&>p]:text-lg lg:[&>p]:text-2xl [&>p]:pb-5"
              dangerouslySetInnerHTML={{ __html: post.data.attributes.body }}
            />
            <h3 className=" font-bold text-gray-700 text-2xl mb-3">Pros</h3>
            <ul className=" list-disc list-outside marker:text-gray-500 pl-6 pb-3 text-xl">
              {post.data.attributes.pros.map((text: string, index: number) => (
                <li key={"pros-item" + index}>{text}</li>
              ))}
            </ul>
            <h3 className=" font-bold text-gray-700 text-2xl mb-3">Crons</h3>
            <ul className=" list-disc list-outside marker:text-gray-500 pl-6 pb-3 text-xl">
              {post.data.attributes.cons.map((text: string, index: number) => (
                <li key={"cons-item" + index}>{text}</li>
              ))}
            </ul>
            <h3 className=" font-bold text-gray-700 text-2xl mb-3">
              AI Explains
            </h3>
            <div
              className=" text-lg md:text-xl"
              dangerouslySetInnerHTML={{
                __html: post.data.attributes.AIExplain,
              }}
            />
            <div className=" flex items-center mt-10 flex-col md:flex-row">
              <span className=" text-lg font-semibold text-gray-700 mr-5">
                Please dont forget to like
              </span>

              <Likes user_likes={post.data.attributes.user_likes} />
            </div>
          </div>

          <FsLightbox
            toggler={toggler}
            sources={[`${post.data.attributes.topImage.data.attributes.url}`]}
          />
        </div>
      ) : (
        <>No Article please refresh</>
      )}
    </main>
  );
}

// Triggered on each request
export async function getServerSideProps({ params }: { params: any }) {
  try {
    // Fetching data from an API
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${params.id}?populate=*`,
      {
        headers: {
          Authorization: `bearer ${process.env.STRAPI_KEY}`,
        },
      }
    );
    const post = await res.json();
    return { props: { post } };
  } catch (e) {
    console.log("api call not available");
    return { props: { post: null } };
  }
}
