import Link from "next/link";

export default function Footer() {
  return (
    <div className=" mt-[15vh] md:mt-5 border-t -mx-4 h-10 md:h-20 flex items-center justify-center text-slate-500 font-thin text-[12px] md:text-sm ">
      <span className="">
        &copy; 2023 WebJems Designs | By Jean Morillo |{" "}
        <Link href="/privacy-policy" className=" underline">
          Privacy policy
        </Link>
      </span>
    </div>
  );
}
