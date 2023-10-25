import Link from "next/link";

const NotFound = () => {
  return (
    <div className="text-center">
      <p className="mt-10">Sorry, the requested post does not exist.</p>
      <Link href="/">Back to Home</Link>
    </div>
  );
};

export default NotFound;
