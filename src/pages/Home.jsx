import { SignIn, useSession } from "@clerk/clerk-react";
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
    <div>
      <p>home</p>
      <SignIn />
    </div>
  );
}

export default Home;
