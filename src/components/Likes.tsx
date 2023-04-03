import { useState } from "react";

type UserLikes = {
  data: Object[];
};

export default function Likes({
  user_likes,
  session,
}: {
  user_likes: UserLikes;
  session: any;
}) {
  const [like, setLike] = useState(hasUserLiked());
  const [likeCount, setLikeCount] = useState(user_likes.data.length);

  function hasUserLiked() {
    const userHasLiked = user_likes.data.find(
      (item: any) => item.id === session?.id
    );
    return userHasLiked ? true : false;
  }

  function syncLike() {
    if (like) {
      // remove like
      setLikeCount(likeCount - 1);
      setLike(false);
    } else {
      if (session) {
        setLikeCount(likeCount + 1);
        setLike(true);
      } else {
        alert("login");
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
    </>
  );
}
