const getAllUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!res.ok) {
    throw new Error("failed to fetch users data.");
  }

  return res.json();
};

export default getAllUsers;
