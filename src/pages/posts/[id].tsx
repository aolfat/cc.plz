import { useRouter } from "next/router";
import { api } from "../../utils/api";

import Image from "next/image";
import { useState } from "react";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: post } = api.posts.getPost.useQuery({
    postId: id as string,
  });
  const [comment, setComment] = useState("");
  const imageUrl = post?.editedPhotoUrl ?? "";

  async function handleSubmitComment(e: React.FormEvent) {
    e.preventDefault();
    if (!comment) return;
    await api.comments.createComment.mutateAsync({
      content: comment,
      authorId: post.authorId,
      postId: post.id,
    });
  }

  if (!post) return <div>Loading...</div>;
  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      <div>Post: {id}</div>
      <text>{post.caption}</text>
      <img src={imageUrl} alt="" width={500} height={500} />
      <form onSubmit={handleSubmitComment}>
        <input
          type="text"
          value={comment}
          placeholder="What do you think?"
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">Comment</button>
      </form>
    </main>
  );
};

export default Post;
