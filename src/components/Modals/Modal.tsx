import { ReactElement } from "react";

export default function Modal({
  children,
  show,
  setShow,
}: {
  children: ReactElement;
  show: boolean;
  setShow: Function;
}) {
  return (
    <>
      {show && (
        <div
          onClick={() => setShow(false)}
          className="fixed left-0 bottom-0 h-screen w-screen bg-slate-800/80 z-50 flex justify-center items-center py-5 cursor-pointer"
        >
          <div className="flex items-center justify-center max-w-[500px] w-full h-full max-h-[50%] md:max-h-[40% relative flex-shrink-0 -mt-20 px-3">
            {children}
          </div>
        </div>
      )}
    </>
  );
}
