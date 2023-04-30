import Header from "@/components/Profile/Header";
import SummaryCard from "@/components/Profile/Cards/SummaryCard";
import SkillsCard from "@/components/Profile/Cards/SkillsCard";
import Carousel from "react-multi-carousel";
import VideoCard from "@/components/Profile/Cards/VideoCard";
import Icons from "@/styles/icons/Icons";
import "react-multi-carousel/lib/styles.css";

export default function Home() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1400 },
      partialVisibilityGutter: 40,
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1400, min: 768 },
      partialVisibilityGutter: 40,
      items: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      partialVisibilityGutter: 40,
      items: 1,
    },
  };
  return (
    <>
      <main className={`relative flex flex-col px-4`}>
        <Header />
        <div
          id="profile-content"
          className="px-2 md:px-16 flex flex-wrap gap-8 py-6 md:py-10"
        >
          <SummaryCard />
          <SkillsCard />
        </div>

        <div className="h-auto pl-2 md:pl-16 pb-6">
          <h5 className="mb-6 text-xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center">
            Top Video Recommendations
            <Icons type="Summary" className="ml-2" />
          </h5>
          <Carousel responsive={responsive} ssr swipeable partialVisible={true}>
            <VideoCard
              iconType="Docker"
              title="Docker Tutorial"
              href="https://youtu.be/pTFZFxd4hOI"
              thumbnail="/docker-image.jpeg"
              alt="Recomendation video"
            />
            <VideoCard
              iconType="Google-Flat"
              title="Crocodile Hunter | Gabriel Iglesias"
              href="https://youtu.be/_M1VgfS4BVo"
              thumbnail="/gabriel-iglesias.jpeg"
              alt="Gabriel Igleasias funny video"
            />
            <VideoCard
              iconType="Google-Flat"
              title="Zelda Music"
              href="https://youtu.be/MXDF0wVcWfA"
              thumbnail="/zelda-music.png"
              alt="Zelda Music video"
            />
            <VideoCard
              iconType="Google-Flat"
              title="Sin Ti | by Macapo"
              href="https://youtu.be/TChDg-9UkeU"
              thumbnail="/sinti.jpeg"
              alt="Macapo music video"
            />
          </Carousel>
        </div>
      </main>
    </>
  );
}
