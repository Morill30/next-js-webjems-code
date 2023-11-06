import { createRef, ReactElement, useRef } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useUserContext } from "@/contexts/userContext";
import Image from "next/image";
import Icons from "@/styles/icons/Icons";
import Link from "next/link";
import Footer from "./Footer";
import { SessionData } from "@/pages/api/auth/[...nextauth]";

export default function SideBar({ children }: { children: ReactElement }) {
  const { data: session }: SessionData = useSession();
  const button = createRef<HTMLButtonElement>();
  const { user, updateOnlineUser } = useUserContext();
  const handleClick = () => {
    if (button.current && window.innerWidth < 768) {
      button.current.click();
    }
  };
  return (
    <>
      <div className="flex items-center justify-between md:hidden bg-white z-10 w-full sticky top-0 z-50">
        <Link href="/" className="flex items-center px-4">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/webjems-logo.png`}
            height={28}
            width={33}
            className="h-6 mr-3 sm:h-7"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            WebJems
          </span>
        </Link>
        <button
          data-drawer-target="logo-sidebar"
          data-drawer-toggle="logo-sidebar"
          aria-controls="logo-sidebar"
          type="button"
          ref={button}
          className="inline-flex items-center p-2 my-2 mx-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
      </div>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 md:z-0 w-64 h-screen transition-transform -translate-x-full md:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-[100vh] box-border px-3 py-4 overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-800">
          <Link href="/" className="flex items-center mb-5">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/webjems-logo.png`}
              height={28}
              width={33}
              className="h-6 mr-3 sm:h-7"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              WebJems
            </span>
          </Link>
          <ul className="space-y-2">
            {!session ? (
              <>
                <button
                  onClick={() => signIn("google")}
                  className="flex mx-1 my-2 mb-10 w-full text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-2"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/webjems-logo.png`}
                    height={28}
                    width={33}
                    className="h-6 mr-3 sm:h-7"
                    alt="Flowbite Logo"
                  />
                  <span> Sign in with Google </span>
                </button>
              </>
            ) : (
              <Link onClick={handleClick} href={`/user/${session?.id}`}>
                <div className="flex items-center pl-1 pb-2 pt-2 border rounded-lg border-gray-200 hover:bg-slate-100">
                  <div className=" rounded-full overflow-hidden h-8 w-8">
                    {user?.strapiUser?.profileImage?.url ? (
                      <Image
                        src={user?.strapiUser?.profileImage?.url}
                        width={33}
                        height={33}
                        alt="user image"
                        className=" object-cover"
                      />
                    ) : (
                      <Image
                        src={session?.user?.image || ""}
                        width={33}
                        height={33}
                        alt="user image"
                        className=" object-cover"
                      />
                    )}
                  </div>
                  <span className="pl-2">
                    {" "}
                    {user?.strapiUser?.displayName
                      ? user?.strapiUser?.displayName
                      : user?.authUser?.user?.name}
                  </span>
                </div>
              </Link>
            )}
            <li>
              <Link
                onClick={handleClick}
                href="/"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Jean&apos;s Profile
                </span>
                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span>
              </Link>
            </li>
            <li>
              <Link
                onClick={handleClick}
                href="/articles"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3">Articles</span>
              </Link>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/jean-morillo-30/"
                target="_blank"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Icons
                  type="Linkedin"
                  className=" h-[26px] w-[25px] fill-gray-500"
                />
                <span className="flex-1 ml-3 whitespace-nowrap flex items-center">
                  Linkedin{" "}
                  <Icons
                    type="up-right-arrow"
                    className="fill-black h-[12px] ml-2"
                  />
                </span>
              </a>
            </li>
            <li>
              <a
                href="mailto:morillo30@gmail.com"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                  <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Message Jean
                </span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </a>
            </li>
            <li>
              <Link
                onClick={handleClick}
                href="/chat/global"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Icons
                  type="globe"
                  className="stroke-gray-500 h-[25px] stroke-2"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Join Global Chat
                </span>
              </Link>
            </li>
            <li>
              <Link
                onClick={handleClick}
                href="/chat/users"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Icons
                  type="message"
                  className=" stroke-gray-500 stroke-2 h-[25px]"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Webjems Users
                </span>
              </Link>
            </li>
          </ul>
          {session && (
            <button
              onClick={() => signOut()}
              className="flex mx-1 my-2 mt-7 w-full text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-2 mb-2"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/webjems-logo.png`}
                height={28}
                width={33}
                className="h-6 mr-3 sm:h-7"
                alt="Flowbite Logo"
              />
              <span className=" ml-5"> Sign out </span>
            </button>
          )}
        </div>
      </aside>
      <div className=" md:ml-64">
        {children}
        <Footer />
      </div>
    </>
  );
}
