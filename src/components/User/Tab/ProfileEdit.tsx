import Card from "@/components/Profile/Cards/Card";
import { useUserContext } from "@/contexts/userContext";
import { SessionData } from "@/pages/api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function ProfileEditTab() {
  const { user, updateOnlineUser } = useUserContext();
  const { data: session, status }: SessionData = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageDidChange, setImageDidChange] = useState<boolean>(false);
  const [imageFile, setImage] = useState<File | Blob | undefined | null>();
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [showCropper, setShowCropper] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>("");
  const cropperRef = useRef<ReactCropperElement>(null);

  const crop = () => {
    const cropper = cropperRef.current?.cropper;
    const croppedCanvas = cropper?.getCroppedCanvas();
    const dataUrl = croppedCanvas?.toDataURL();
    setImage(dataURLtoFile(dataUrl as string, imageFile?.name as string));
    setShowCropper(false);
  };

  const dataURLtoFile = (dataurl: string, filename: string) => {
    const arr = dataurl.split(",");
    const mime = arr?.[0]?.match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n) {
      u8arr[n - 1] = bstr.charCodeAt(n - 1);
      n -= 1; // to make eslint happy
    }
    return new File([u8arr], filename, { type: mime });
  };

  const rotate = () => {
    const cropper = cropperRef.current?.cropper;
    cropper?.rotate(90);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const imageFileLocal = fileList[0];
      setImage(imageFileLocal);
      setImageDidChange(true);
      setShowCropper(true);
    }
  };

  const handleSave = async () => {
    // Trigger the file input element to open the file selection dialog.
    try {
      if (fileInputRef.current && imageDidChange) {
        await uploadImage();
      }
      await updateDisplayName();
      updateOnlineUser();
      alert("Profile updated successfully");
    } catch (error) {
      alert("Profile update failed");
    }
  };

  const updateDisplayName = async () => {
    try {
      const response = await axios(`/api/user/${session?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          displayName: displayName,
        },
      });
      console.log("Display name updated successfully", response.data);
    } catch (error) {
      console.error("Display name update failed", error);
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    if (imageFile) {
      formData.append(
        "ref",
        "plugin::users-permissions.user" // Model name
      );
      formData.append("refId", `${session?.id}`);
      formData.append("field", "profileImage");
      formData.append("files", imageFile);
    }
    try {
      const response = await fetch(`/api/user/update-image`, {
        method: "POST",
        body: formData,
      });
      console.log("Image uploaded successfully", await response.json());
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  useEffect(() => {
    if (user?.strapiUser?.displayName) {
      setDisplayName(user?.strapiUser?.displayName);
    }
  }, [user]);

  useEffect(() => {
    if (imageFile) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (typeof fileReader.result === "string")
          setImageUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  return (
    <Card>
      <>
        <h3> Profile Picture </h3>
        <div className="flex">
          <div className="flex justify-center items-center w-[140px] mr-5 overflow-hidden rounded-md shadow-sm">
            {user?.strapiUser?.profileImage?.url ? (
              <Image
                src={user?.strapiUser?.profileImage?.url}
                width={140}
                height={140}
                alt="Picture of the author"
                className=" h-[140px] w-[140px]"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <ul className="animate-pulse w-full h-full">
                <li className="bg-gray-200 rounded-md dark:bg-gray-700 w-full h-full"></li>
              </ul>
            )}
          </div>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-54 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF
                </p>
              </div>
              <input
                id="dropzone-file"
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            </label>
          </div>
        </div>
        <div className="mt-5 text-sm">
          <label className=" font-bold">
            {imageFile?.name && "File name:"}{" "}
          </label>
          <label>{imageFile?.name}</label>
        </div>
        <h3> Display Name </h3>
        <input
          type="text"
          id="display_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John Doe"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          maxLength={30}
        />
        <button onClick={handleSave} className=" btn rounded-lg mt-5">
          Save
        </button>
        {imageUrl && showCropper && (
          <>
            <Cropper
              src={imageUrl}
              style={{ height: 400, width: "100%" }}
              aspectRatio={1 / 1}
              guides={false}
              ref={cropperRef}
              rotatable={true}
              modal={true}
            />
            <button onClick={crop} className="btn rounded-lg mt-5 mr-5">
              Crop
            </button>
            <button onClick={rotate} className="btn rounded-lg mt-5">
              Rotate
            </button>
          </>
        )}
      </>
    </Card>
  );
}
