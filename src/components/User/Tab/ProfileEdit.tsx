import Card from "@/components/Profile/Cards/Card";
import { METHODS } from "http";
import { useRef, useState } from "react";

export default function ProfileEditTab() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageDidChange, setImageDidChange] = useState<boolean>(false);
  const [imageFile, setImage] = useState<File | undefined>();
  const [displayName, setDisplayName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const imageFileLocal = fileList[0];
      setImage(imageFileLocal);
      setImageDidChange(true);
    }
  };

  const handleSave = () => {
    // Trigger the file input element to open the file selection dialog.
    if (fileInputRef.current && imageDidChange) {
      uploadImage();
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    }
    try {
      const response = await fetch("/api/user/update-image", {
        method: "POST",
        body: formData,
      });
      console.log("Image uploaded successfully", response);
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  return (
    <Card>
      <>
        <h3> Profile Picture </h3>
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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
        <button onClick={handleSave} className=" rounded-lg mt-5">
          Save
        </button>
      </>
    </Card>
  );
}
