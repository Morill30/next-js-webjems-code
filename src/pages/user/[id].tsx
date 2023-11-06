import UserHeader from "@/components/Profile/UserHeader";
import SummaryCard from "@/components/Profile/Cards/SummaryCard";
import SkillsCard from "@/components/Profile/Cards/SkillsCard";
import "react-multi-carousel/lib/styles.css";
import { SessionData } from "../api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function UserProfile() {
  const { data: session, status }: SessionData = useSession();
  return (
    <>
      <main className={`relative flex flex-col px-4`}>
        <UserHeader />
        {session?.user && (
          <Link
            className=" bg-blue-500 w-fit p-2 rounded-lg text-white"
            href="/user/edit-profile/"
          >
            Edit Profle
          </Link>
        )}
        <div
          id="profile-content"
          className="px-2 md:px-16 flex flex-wrap gap-8 py-6 md:py-10"
        >
          <SummaryCard />
          <SkillsCard />
        </div>
      </main>
    </>
  );
}
