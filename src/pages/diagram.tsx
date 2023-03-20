import TopBackgroundHeader from "@/components/TopBackgroundHeader";
import Image from "next/image";
import Icons from "@/styles/icons/Icons";
import FsLightbox from "fslightbox-react";
import { useState } from "react";

export default function Diagram() {
  const [toggler, setToggler] = useState(false);
  return (
    <main className={`relative flex flex-col`}>
      <TopBackgroundHeader />
      <div className=" -mt-24 z-10">
        <h2 className=" md:ml-10 mb-10 font-thin tracking-wide text-md text-white flex items-center justify-center md:justify-start">
          <Icons type="aws" className="h-14 fill-orange-400 mt-3 mr-3" />
          Articles and Diagrams
        </h2>

        <div
          onClick={() => setToggler(!toggler)}
          className=" max-w-[500px] text-left flex flex-col rounded-md border-4 border-white shadow-md cursor-pointer transform transition duration-500 hover:scale-[1.01]"
        >
          <div className=" w-full h-40 bg-gray-50  flex-shrink-0 relative">
            <Image
              className="object-cover w-5 rounded-md"
              src={"/aws-diagram.png"}
              fill
              style={{ objectFit: "contain" }}
              alt="Background image"
            />
          </div>
          <div className=" p-4">
            <div className=" flex flex-col md:flex-row md:justify-between md:items-center pb-2">
              <span className=" font-semibold text-gray-700">
                AWS site Architecture
              </span>

              <span className=" font-light text-[12px] text-gray-700">
                March 19, 2023
              </span>
            </div>

            <p className="pb-3">
              I used AWS <b>Elastic Container Service</b>(ECS) with the fargate
              technology. <b>Fargate</b> is far easier to configure and mantain
              than regular EC2. The only downside of using ECS was that you are
              likely to configure a <b>Application Load Balancer</b>(ALB) to set
              a domain with TLS. Application Load balancer is what will most
              likely be most expensive in your application if its pretty simple
              app
            </p>
            <span className=" font-bold text-gray-700">Pros</span>
            <ul className=" list-disc list-outside marker:text-gray-500 pl-6 pb-3">
              <li>The service is pretty flexible and scalable</li>
              <li>Service can be cheaper if use with SPOT instances</li>
            </ul>
            <span className=" font-bold text-gray-700">Crons</span>
            <ul className=" list-disc list-outside marker:text-gray-700 pl-6 pb-3">
              <li>The service can get pretty expensive for a simple app</li>
              <li>
                Only way to properly use it is with a load balancer which is
                expensive
              </li>
              <li>Even the Fargate service can be complicated to set up</li>
            </ul>
          </div>
        </div>
        <FsLightbox toggler={toggler} sources={["/aws-diagram.png"]} />
      </div>
    </main>
  );
}
