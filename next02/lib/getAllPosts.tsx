const getAllPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!res.ok) {
    throw new Error("failed to fetch posts.");
  }

  return res.json();
};

export default getAllPosts;
