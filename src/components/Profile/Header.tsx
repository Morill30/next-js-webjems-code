import Image from "next/image";
import TopBackgroundHeader from "@/components/TopBackgroundHeader";
import Icons from "@/styles/icons/Icons";
import ImageModal from "@/components/Modals/ImageModal";

export default function ProfileHeader() {
  return (
    <header>
      <TopBackgroundHeader />
      <div className="w-full flex flex-col xl:flex-row max-[377px]:-mt-7 -mt-16 md:-mt-28 md:pl-16 max-w-[1300px]">
        <div className="flex flex-row items-end">
          <ImageModal imageURL={"/jean-avatar.jpeg"}>
            <div className="max-[377px]:w-20 max-[377px]:h-20 bg-white w-32 h-32 md:w-56 md:h-56 relative rounded-full border-4 border-white shadow-md flex-shrink-0">
              <Image
                className="red object-cover w-5 rounded-full cursor-pointer"
                src={"/jean-avatar.jpeg"}
                fill
                style={{ objectFit: "cover" }}
                alt="Background image"
              />

              <Icons
                type="Verified-Checkmark"
                className="absolute max-[377px]:left-12 max-[377px]:top-14 left-20 top-24 md:left-40 md:top-44 z-10 h-6 md:h-[30px]"
              />
            </div>
          </ImageModal>
          <div className="flex flex-col ml-4 md:ml-6 items-start bottom-2 md:bottom-10 relative">
            <span className="font-bold max-[377px]:text-sm text-md md:text-[20px] text-gray-700">
              Jean Morillo
            </span>
            <span className="font-normal max-[377px]:text-[10px] text-[12px] md:text-[14px] text-gray-500">
              I&apos;m a Software Engineer in Puerto Rico
            </span>
          </div>
        </div>
        <div className="flex items-end md:ml-auto relative pt-7 md:pt-0 pl-2 sm:pl-36 md:pl-0 md:bottom-10 ">
          <a
            type="button"
            href="https://github.com/Morill30"
            target="_blank"
            className="text-white bg-white border-[#4285F4] border-2 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-3 py-1.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#4285F4]/30 mr-2 mb-2"
          >
            <Icons type="Github" className="text-[#4285F4] w-6 h-6" />
          </a>
          <a
            type="button"
            href="mailto:morillo30@gmail.com"
            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
          >
            <Icons type="Google-Flat" />
            Send me a message
          </a>
        </div>
      </div>
    </header>
  );
}
