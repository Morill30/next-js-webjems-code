import { useEffect, useState } from "react";
import Modal from "./Modals/Modal";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { SessionWeb } from "@/pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";

type UserLikes = {
  data: Object[];
};

type SessionData = {
  data: SessionWeb | null;
  status: string;
};

export default function Likes({ user_likes }: { user_likes: UserLikes }) {
  const { data: session, status }: SessionData = useSession();
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(user_likes.data.length);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status !== "loading") {
      setLike(hasUserLiked());
    }
  }, [status]);

  function hasUserLiked() {
    const userHasLiked = user_likes.data.find(
      (item: any) => item.id === session?.id
    );
    return userHasLiked ? true : false;
  }

  async function syncLike() {
    if (status === "loading") {
      return;
    }

    if (like) {
      // remove like
      setLikeCount(likeCount - 1);
      setLike(false);
      await fetch("/api/likes?postId=2&disconnect");
    } else {
      if (status === "authenticated") {
        setLikeCount(likeCount + 1);
        setLike(true);
        await fetch("/api/likes?postId=2");
      } else {
        setShowModal(true);
      }
    }
  }

  return (
    <>
      <div className="flex items-center justify-center cursor-default">
        <div className={`heart-placement`} onClick={() => syncLike()}>
          <div className={`heart-icon ${like && "is-active"}`} />
        </div>
        <span className="inline-flex items-center justify-center px-2 py-0.5 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
          {likeCount} Likes
        </span>
      </div>
      <Modal show={showModal} setShow={setShowModal}>
        <div className="relative w-full md:w-fit h-fit bg-white shadow-md rounded-lg flex flex-col justify-center items-center px-3">
          <span className=" p-5 text-gray-700 font-semibold">
            Sign in to continue
          </span>
          <button
            onClick={() => signIn("google")}
            className="flex mx-1 my-2 w-full justify-center text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-2"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/webjems-logo.png`}
              height={28}
              width={33}
              className="h-6 mr-3 sm:h-7"
              alt="Flowbite Logo"
            />
            <span className=""> Sign in with Google </span>
          </button>
          or
          <button
            onClick={() => setShowModal(false)}
            className="flex mx-1 my-2  w-full justify-center text-white bg-[#898e94] hover:bg-[#c4c8ce]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-2"
          >
            <span className=""> Go back </span>
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="absolute right-6 top-2 text-grey-700 text-3xl"
          >
            &#xd7;
          </button>
        </div>
      </Modal>
    </>
  );
}
