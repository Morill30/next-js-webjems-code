import { ReactElement, useEffect, useState } from "react";
import Image from "next/image";
type ImageModalProp = {
  imageURL: string;
  children: ReactElement;
  onClick?: Function;
};
export default function ImageModal({
  imageURL,
  children,
  onClick,
}: ImageModalProp) {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>{children}</button>

      {show && (
        <div
          onClick={() => setShow(false)}
          className="fixed left-0 bottom-0 h-screen w-screen bg-slate-800/80 z-50 flex justify-center items-center py-5 cursor-pointer"
        >
          <div className="max-w-[500px] w-full h-full max-h-[50%] md:max-h-[40%] relative rounded-md shadow-md flex-shrink-0 -mt-20">
            <Image
              className="object-cover w-5 rounded-md cursor-pointer"
              src={imageURL}
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
              alt="Background image"
            />
            <button
              onClick={() => setShow(false)}
              className="absolute right-6 top-2 text-white text-3xl"
            >
              &#xd7;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
