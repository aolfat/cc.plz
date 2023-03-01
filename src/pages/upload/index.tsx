import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";

import { api } from "../../utils/api";
import uploadImageToS3 from "../api/s3";

const Upload: NextPage = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [caption, setCaption] = useState("");
  const [editedPhoto, setEditedPhoto] = useState<File | null>(null);
  const createPostMutation = api.posts.createPost.useMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmitUpload(e: React.FormEvent) {
    e.preventDefault();
    if (status !== "authenticated") return;
    if (session.user && session.user.id !== undefined) {
      if (!editedPhoto) return;
      const location = await uploadImageToS3(
        editedPhoto,
        `${session.user.id}/${editedPhoto.name}`
      );

      const post = await createPostMutation.mutateAsync({
        originalPhotoUrl: null,
        editedPhotoUrl: location,
        caption: caption,
        authorId: session.user.id,
      });

      router.push(`/posts/${post.id}`);
    }
  }

  const handleEditedFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("edited file staged");
    setEditedPhoto(e.target.files?.[0] || null);
  };

  if (status === "loading") return <div>Loading...</div>;
  // If not authenticated, route to home page
  if (status === "unauthenticated") router.push("/");
  if (status !== "authenticated") return <div>Not authenticated</div>;
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
