import UserHeader from "@/components/Profile/UserHeader";
import SummaryCard from "@/components/Profile/Cards/SummaryCard";
import SkillsCard from "@/components/Profile/Cards/SkillsCard";
import "react-multi-carousel/lib/styles.css";

export default function UserProfile() {
  return (
    <>
      <main className={`relative flex flex-col px-4`}>
        <UserHeader />

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
