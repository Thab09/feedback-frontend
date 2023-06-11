import { Outlet, Navigate } from "react-router-dom";
import { useSession } from "@clerk/clerk-react";
import UserNav from "../components/UserNav";

function AuthorizedUser() {
  const { isLoaded, session } = useSession();

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  if (!session?.user) {
    return <Navigate to="/" />;
  }
  //add a nav
  return (
    <div>
      <UserNav />
      <Outlet />
    </div>
  );
}

export default AuthorizedUser;
