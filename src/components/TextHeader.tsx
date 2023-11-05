import { Plus_Jakarta_Sans } from "next/font/google";
import React from "react";

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export default function TextHeader({
  children,
  headingSize,
}: {
  children: React.ReactNode;
  headingSize: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}) {
  return (
    <>
      {React.createElement(
        headingSize,
        {
          className: `font-bold m-0 tracking-wide text-5xl flex items-center ${plus_Jakarta_Sans.className}`,
        },
        children
      )}
    </>
  );
}
