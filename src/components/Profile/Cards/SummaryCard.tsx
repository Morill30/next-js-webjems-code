import Card from "./Card";
import Icons from "@/styles/icons/Icons";
import Image from "next/image";

export default function SummaryCard() {
  return (
    <Card>
      <>
        <h5 className="mb-3 text-xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center">
          Summary
          <Icons type="Summary" className="ml-2" />
        </h5>
        <ul className="font-normal text-gray-700 dark:text-gray-400 text-sm">
          <li className="pt-2">
            <b>3+ years</b> of experience facilitating cutting-edge engineering
            solutions with a wide range of web application and technology
            skills.
          </li>
          <li className="pt-2">
            Proven ability to leverage <b>full-stack</b> knowledge and
            experience to build interactive and user- centered website designs
            to scale.
          </li>
          <li className="pt-2">
            <b>Extensive expertise</b> in large system architecture development
            and administration, as well as network design and configuration.
          </li>
        </ul>
        <div className="py-4">
          <hr />
        </div>
        <h5 className="mb-3 text-xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center">
          Education
          <Icons type="Education" className="ml-2" />
        </h5>
        <span className="mb-3 text-md font-bold tracking-tight text-gray-600 dark:text-white">
          Bachelor of Science in Computer Engineering
        </span>
        <div className="pt-4 flex flex-col text-sm text-gray-700">
          <a
            className="flex items-center cursor-pointer"
            href="https://www.pupr.edu/"
            target="_blank"
          >
            <div className="relative h-[25px] w-[20px] self-center sm:my-0 rounded-full">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/poly-logo.png`}
                fill
                style={{ objectFit: "contain" }}
                className="relative rounded-full"
                alt="Polytechnic University logo"
              />
            </div>
            <span className="font-semibold pl-2 md:text-lg text-blue-900 underline flex items-center">
              Polytechnic University of Puerto Rico{" "}
              <Icons
                type="up-right-arrow"
                className="fill-black h-[12px] ml-2"
              />
            </span>
          </a>

          <div className="flex flex-col py-2">
            <span>
              Graduation Date | October 2020 - Magna Cum Laude{" "}
              <span className=" text-yellow-400"> &#9733;&#9733;&#9733;</span>
            </span>
            <span></span>
          </div>
        </div>
      </>
    </Card>
  );
}
