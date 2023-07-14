import { SignUpButton, SignInButton, useSession } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
function Home() {
  const { isLoaded, session } = useSession();

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  if (session?.user) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="m-auto mt-8 flex max-w-xl flex-col sm:mt-12 sm:items-center sm:text-center md:mt-20 md:max-w-2xl">
      <p className="text-2xl font-extrabold leading-tight text-black-700 sm:text-3xl sm:font-black md:text-4xl">
        Tap into collective intelligence for smarter business decisions.
      </p>
      <p className="mt-4 text-sm font-medium leading-snug text-black-300 md:max-w-lg">
        Revolutionize your feedback collection process. Gather valuable insights
        and suggestions effortlessly, empowering your organization to thrive.
      </p>
      <div className="mt-6 flex gap-0">
        <SignUpButton mode="modal">
          <button className="rounded-sm bg-primary-500 px-4 py-1 text-sm font-medium text-white-200">
            Sign up
          </button>
        </SignUpButton>
        <SignInButton mode="modal">
          <button className="hover:text-primary-700 rounded-sm px-5 py-1.5 text-xs font-medium text-primary-300">
            Already a member? Log in.
          </button>
        </SignInButton>
      </div>
      {/* <SignIn
        appearance={{
          elements: {
            card: "max-w-xs rounded-md",
          },
        }}
      /> */}
    </div>
  );
}

export default Home;
