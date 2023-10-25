import React from "react";
import { getPostByName, getPostsMeta } from "@/lib/posts";
import { notFound } from "next/navigation";
import getFormattedDate from "@/lib/getFormattedDate";
import Link from "next/link";

export const revalidate = 0;

type Props = {
  params: {
    postId: string;
  };
};

// export const generateStaticParams = async () => {
//   const posts = await getPostsMeta(); // deduped!

//   if(!posts) {
//     return [];
//   }

//   return posts.map((post) => ({
//     postId: post.id,
//   }));
// };

const generateMetadata = async ({ params: { postId } }: Props) => {
  const post = await getPostByName(`${postId}.mdx`); // deduped!

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.meta.title,
  };
};

const Post = async ({ params: { postId } }: Props) => {
  const post = await getPostByName(`${postId}.mdx`); // deduped!

  if (!post) {
    return notFound();
  }

  const { title, date, tags } = post.meta;
  const { content } = post;

  const pubDate = getFormattedDate(date);

  const relatedTags = tags.map((tag, i) => {
    return (
      <Link key={i} href={`/tags/${tag}`}>
        {tag}
      </Link>
    );
  });

  return (
    <>
      <h2 className="text-3xl mt-4 mb-0">{title}</h2>
      <p className="mt-0 text-sm">{pubDate}</p>
      <article>{content}</article>
      <section>
        <h3>Related:</h3>
        <div className="flex flex-row gap-4">{relatedTags}</div>
      </section>
      <p className="mb-10">
        <Link href="/">← Back to home</Link>
      </p>
    </>
  );
};

export default Post;
