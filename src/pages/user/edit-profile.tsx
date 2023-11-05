import ProfileEditTab from "@/components/User/Tab/ProfileEdit";
import "react-multi-carousel/lib/styles.css";
import { SessionData } from "../api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { Plus_Jakarta_Sans } from "next/font/google";
import TextHeader from "@/components/TextHeader";
import { useRef, useState } from "react";
import Card from "@/components/Profile/Cards/Card";

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

type TabObject = {
  title: string;
  selected: boolean;
};

export default function EditProfile() {
  const { data: session, status }: SessionData = useSession();
  const [selectedTab, setSelectedTab] = useState<string>("Profile");
  const [tabList, setTabList] = useState<TabObject[]>([
    {
      title: "Profile",
      selected: true,
    },
    {
      title: "Account",
      selected: false,
    },
  ]);

  const handleTabClick = (index: number) => {
    const newTabList = tabList.map((tab, i) => {
      if (i === index) {
        tab.selected = true;
        setSelectedTab(tab.title);
      } else {
        tab.selected = false;
      }
      return tab;
    });
    setTabList(newTabList);
  };

  function isSelectedTabClass(selected: boolean) {
    if (selected) {
      return "inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group";
    } else {
      return "inline-flex items-center justify-center p-4 border-b-2 border-transparent text-black rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group";
    }
  }

  function selectedTabContent() {
    switch (selectedTab) {
      case "Profile":
        return <ProfileEditTab />;
      case "Account":
        return "hello2";
      default:
        return "hello3";
    }
  }

  return (
    <>
      <main className={`relative flex flex-col px-4`}>
        <div>
          <div className="flex flex-col justify-center md:justify-start ml-10 my-5">
            <TextHeader headingSize="h2">Settings </TextHeader>
            <span className="text-gray-600 ">
              Change the desired user settings
            </span>

            <div
              className={`${plus_Jakarta_Sans.className} border-b border-gray-200 dark:border-gray-700 mt-10`}
            >
              <ul
                className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400"
                role="tablist"
              >
                {tabList.map((tab, index) => {
                  return (
                    <li key={index} className="mr-2" role="presentation">
                      <button
                        className={isSelectedTabClass(tab.selected)}
                        id={tab.title}
                        data-tabs-target={"#" + tab.title}
                        type="button"
                        role="tab"
                        aria-controls={tab.title}
                        aria-selected={tab.selected}
                        onClick={() => handleTabClick(index)}
                      >
                        {tab.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className=" py-10">
              {session?.user ? selectedTabContent() : "Loading"}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
