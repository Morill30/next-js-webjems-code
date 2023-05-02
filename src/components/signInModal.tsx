import Modal from "./Modals/Modal";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function SignInModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Function;
}) {
  function signInGoogle(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    signIn("google");
  }
  return (
    <>
      <Modal show={showModal} setShow={setShowModal}>
        <div className="relative w-full md:w-fit h-fit bg-white shadow-md rounded-lg flex flex-col justify-center items-center px-3">
          <span className=" p-5 text-gray-700 font-semibold">
            Sign in to continue
          </span>
          <button
            onClick={signInGoogle}
            className="flex mx-1 my-2 w-full justify-center text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-2"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/webjems-logo.png`}
              height={28}
              width={33}
              className="h-6 mr-3 sm:h-7"
              alt="Flowbite Logo"
            />
            <span className=""> Sign in with Google </span>
          </button>
          or
          <button
            onClick={() => setShowModal(false)}
            className="flex mx-1 my-2  w-full justify-center text-white bg-[#898e94] hover:bg-[#c4c8ce]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-2"
          >
            <span className=""> Go back </span>
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="absolute right-6 top-2 text-grey-700 text-3xl"
          >
            &#xd7;
          </button>
        </div>
      </Modal>
    </>
  );
}
