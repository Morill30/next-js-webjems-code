import Image from "next/image";
import styles from "@/styles/Home.module.css";

export default function TopBackgroundHeader() {
  return (
    <div
      className={`${styles.fullWidth} relative rounded-b-lg animate-border inline-block bg-white from-blue-500 via-green-500 to-blue-100 bg-[length:400%_400%] p-0.5 bg-gradient-to-r mt-0`}
    >
      <div className="block text-white bg-slate-900 w-full h-24 md:h-56 relative rounded-b-lg overflow-hidden">
        <Image
          className="relative object-cover transform transition duration-500 hover:scale-110 blur-sm"
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/auroral-forest.jpeg`}
          fill
          style={{ objectFit: "cover" }}
          alt="Background image"
        />
      </div>
    </div>
  );
}
