import { NavLink } from "react-router-dom";
function UserNav() {
  return (
    <div className="mb-2 mt-4 flex gap-5 text-sm ">
      <NavLink
        to={"/dashboard"}
        className={({ isActive }) =>
          isActive ? "font-semibold text-primary-400" : "text-primary-300"
        }
      >
        <h4>Dashboard</h4>
      </NavLink>
      <NavLink
        to={"/yourboxes"}
        className={({ isActive }) =>
          isActive ? "font-semibold text-primary-400" : "text-primary-300"
        }
      >
        <h4>Your Boxes</h4>
      </NavLink>
      <NavLink
        to={"/settings"}
        className={({ isActive }) =>
          isActive ? "font-semibold text-primary-400" : "text-primary-300"
        }
      >
        <h4>Settings</h4>
      </NavLink>
    </div>
  );
}

export default UserNav;
