import TopBackgroundHeader from "@/components/TopBackgroundHeader";
import Image from "next/image";
import Icons from "@/styles/icons/Icons";
import FsLightbox from "fslightbox-react";
import { useState } from "react";

export default function Articles() {
  const [toggler, setToggler] = useState(false);
  return (
    <main className={`relative flex flex-col`}>
      <TopBackgroundHeader />
      hello
    </main>
  );
}

// Triggered on each request
export async function getServerSideProps({ params }: { params: any }) {
  console.log("hello", params);
  // Fetching data from an API
  //   const res = await fetch("https://worldtimeapi.org/api/ip");
  //   const time = await res.json();
  // Pass the data to the page via props
  return { props: { id: params.id } };
}
