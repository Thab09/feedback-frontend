import { Link } from "react-router-dom";
import { useSession, UserButton } from "@clerk/clerk-react";
function Navbar() {
  const { isLoaded, session } = useSession();
  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  //logo ------------------ if the user is logged in user profile
  return (
    <nav>
      <ul>
        <div>
          <Link to={"/"}>feedbox</Link>
        </div>
        {session?.user && <UserButton />}
        {!session?.user && (
          <div>
            <Link to={"/features"}>Features</Link>
            <Link to={"/public"}>Public Boxes</Link>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
