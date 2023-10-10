import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import { Suspense } from "react";
import UserPosts from "./components/UserPosts";
import type { Metadata } from "next";

type Params = {
  params: {
    userId: string;
  };
};

export const generateMetadata = async ({ params: { userId } }: Params): Promise<Metadata> => {
    const userData: Promise<User> = getUser(userId);
    const user: User = await userData;
    
    return {
        title: user.name,
        description: `This is the page of ${user.name}`
    } 
};

const UserPage = async ({ params: { userId } }: Params) => {
  const userData: Promise<User> = getUser(userId);
  const userPostsData: Promise<Post[]> = getUserPosts(userId);

  // Instead of putting an await keyword in front of each data fetching call
  // and creating a waterfall we can run both of these requests in parallel.

  // This line is commented to show an even elegant solution of Suspense to 
  // load our data.

  //const [user, userPosts] = await Promise.all([userData, userPostsData]);
  const user = await userData;

  return (
    <>
        <h2>{user.name}</h2>
        <br />
        <Suspense fallback={<h2>Loading...</h2>}>
            <UserPosts promise={userPostsData} />
        </Suspense>
    </>
  );
};

export default UserPage;
