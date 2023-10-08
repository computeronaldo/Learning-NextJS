import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page",
  description: "This is the about page.",
};

const About = () => {
//   throw new Error("Not today!");
  return (
    <>
      <h1>About</h1>
      <Link href="/">Link to homepage.</Link>
    </>
  );
};

export default About;
