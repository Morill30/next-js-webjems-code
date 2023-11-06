import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { SessionData } from "@/pages/api/auth/[...nextauth]";

import { Plus_Jakarta_Sans } from "next/font/google";
import SignInModal from "@/components/signInModal";

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export default function Users() {
  const { data: session, status }: SessionData = useSession();
  const [users, setUsers] = useState<Array<any>>();
  const [showModal, setShowModal] = useState(false);

  function setShowModalRedirect(data: boolean): void {
    console.log(data);
    setShowModal(data);
    if (data === false) {
      window.location.href = "/";
    }
  }

  useEffect(() => {
    getUsers();
    if (status === "unauthenticated") {
      setShowModal(true);
    }
  }, [session]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  async function getUsers() {
    try {
      if (!session) return;
      const res = await fetch(`/api/chat/users`);
      const users = await res.json();
      const filteredUsers = users.filter(
        (user: any) => user.id !== session?.id
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className={`relative flex flex-col px-4`}>
      <div>
        <div className="flex flex-col justify-center md:justify-start ml-10 my-5">
          <h2
            className={` font-bold m-0 tracking-wide text-5xl flex items-center ${plus_Jakarta_Sans.className}`}
          >
            Users
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
                  All Users
                </button>
              </li>
            </ul>
          </div>
        </div>

        {users ? (
          users.map((user: any, index: number) => (
            <React.Fragment key={index + "-postsx"}>
              <div className=" max-w-[425px] text-left flex flex-col rounded-md border-4 border-white shadow-md">
                <div className=" p-4">
                  <div className=" flex flex-col md:flex-row md:justify-between md:items-center pb-2">
                    <span className=" font-semibold text-gray-700">
                      {user.username}
                    </span>
                  </div>

                  <Link
                    href={`/chat/user/${user.id}`}
                    className=" relative block text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-5 mb-2"
                  >
                    Chat with {user.username}
                  </Link>
                </div>
              </div>
            </React.Fragment>
          ))
        ) : (
          <div className=" flex justify-center items-center h-[50vh]">
            <span className=" text-gray-600 font-normal text-2xl text-center">
              Please Log in to chat!
            </span>
          </div>
        )}
      </div>
      <SignInModal showModal={showModal} setShowModal={setShowModalRedirect} />
    </main>
  );
}
