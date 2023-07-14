import { Link, NavLink } from "react-router-dom";
import { useSession, UserButton } from "@clerk/clerk-react";
import BurgerMenu from "./BurgerMenu";
function Navbar() {
  const { isLoaded, session } = useSession();
  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  //logo ------------------ if the user is logged in user profile
  return (
    <nav>
      <ul className="flex items-center justify-between">
        <div>
          <Link to={"/"} className="text-2xl font-bold text-primary-500">
            feedbox
          </Link>
        </div>
        {session?.user && (
          <UserButton
            appearance={{
              elements: {
                userButtonPopoverCard: "font-inter rounded-md",
              },
            }}
          />
        )}
        {!session?.user && (
          <div className="flex">
            <BurgerMenu />
            <div className="hidden gap-4 text-sm sm:flex">
              <NavLink
                to={"/public"}
                className={({ isActive }) =>
                  isActive ? "font-medium text-primary-400" : "text-primary-300"
                }
              >
                <h4>Public Boxes</h4>
              </NavLink>
              <NavLink
                to={"/features"}
                className={({ isActive }) =>
                  isActive ? "font-medium text-primary-400" : "text-primary-300"
                }
              >
                <h4>Features</h4>
              </NavLink>
              <NavLink
                to={"/contact"}
                className={({ isActive }) =>
                  isActive ? "font-medium text-primary-400" : "text-primary-300"
                }
              >
                <h4>Contact</h4>
              </NavLink>
            </div>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
