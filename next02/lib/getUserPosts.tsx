const getUserPosts = async (userId: string) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`
  );

  if (!res.ok) {
    throw new Error("failed to fetch user's posts");
  }

  return res.json();
};

export default getUserPosts;
