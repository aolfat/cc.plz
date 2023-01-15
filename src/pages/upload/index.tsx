import { type NextPage } from "next";
import React, { useRef, useState } from "react";

const Upload: NextPage = () => {
  const [caption, setCaption] = useState("");
  const [, setEditedPhoto] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmitUpload = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitting", e);
  };

  const handleEditedFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("edited file staged");
    setEditedPhoto(e.target.files?.[0] || null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ab6822] to-[#242648]">
      {/* <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 "> */}
      {/* <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]"> */}

      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmitUpload}
      >
        <textarea
          className="h-64 w-96 rounded-xl bg-white/10 p-4 text-black"
          placeholder="Anything you want feedback on motherf'ckr?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required={true}
        />

        <label
          htmlFor="edited-photo-upload"
          className="custom-file-upload mt-4"
        >
          Edited Photo
        </label>
        <input
          onChange={handleEditedFileChange}
          id="edited-photo-upload"
          type="file"
          ref={fileInputRef}
          required
        />
        <button
          onClick={() => {
            if (!fileInputRef.current) return;
            fileInputRef.current.value = "";
            setEditedPhoto(null);
          }}
        >
          Remove Image
        </button>

        <label
          htmlFor="original-photo-upload"
          className="custom-file-upload mt-4"
        >
          Original Photo
        </label>
        <input id="original-photo-upload" type="file" />
        {/* </h1> */}
        {/* </div> */}

        <button className="mt-4 rounded-xl border-2 border-white bg-white/10 p-4 text-white hover:bg-white/20">
          Submit
        </button>
      </form>
    </main>
  );
};

export default Upload;
