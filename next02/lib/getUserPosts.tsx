const getUserPosts = async (userId: string) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`, {
      next: { revalidate: 60 }
    }
  );

  // { next: { revalidate: 60 } }
  // Since this is dynamic data being rendered on server so data is requested for
  // the first time and then cached to prevent subsequent calls but cached data 
  // might get staled after sometime so setting next option allows to fetch updated 
  // data after 60 seconds as specified in revalidate. Now user do have to navigate 
  // and comeback again on the page to see update data.
  // This is known as Incremental Static Re-generation (ISR).

  // We do have 2 other strategies either to just cache once ie on initial render but
  // then data get's staled or never cache it and always request new data but that might
  // result in unnecessary network calls. So ISR is an option which bring best of both of
  // these strategies.

  if (!res.ok) {
    return undefined;
  }

  return res.json();
};

export default getUserPosts;
