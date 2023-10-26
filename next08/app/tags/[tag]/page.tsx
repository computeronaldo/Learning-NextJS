import { getPostsMeta } from "@/lib/posts";
import ListItem from "@/app/components/ListItem";
import Link from "next/link";

export const revalidate = 86400;

type Props = {
  params: {
    tag: string;
  };
};

export const generateMetadata = ({ params: { tag } }: Props) => {
  return {
    title: `Posts about ${tag}`,
  };
};

export const generateStaticParams = async ({ params: { tag } }: Props) => {
  const posts = await getPostsMeta(); //deduped!

  if (!posts) return [];

  // this creates a set of unique tags from all posts
  const tags = new Set(posts.map((post) => post.tags).flat());

  // this creates an array of objects with each object of type
  // {tag: 'tagName'}
  return Array.from(tags).map((tag) => ({ tag }));
};

const TagPostList = async ({ params: { tag } }: Props) => {
  const posts = await getPostsMeta(); //deduped!

  if (!posts)
    return <p className="mt-10 text-center">Sorry, no posts available.</p>;

  const tagPosts = posts.filter((post) => post.tags.includes(tag));

  if (!tagPosts.length) {
    return (
      <div className="text-center">
        <p className="mt-10">Sorry, no posts for that keyword.</p>
        <Link href="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-3xl mt-4 mb-0">Results for: #{tag}</h2>
      <section className="mt-6 mx-auto max-w-2xl">
        <ul className="w-full list-none p-0">
          {tagPosts.map((post) => (
            <ListItem key={post.id} post={post} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default TagPostList;
