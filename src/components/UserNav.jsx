import { Link } from "react-router-dom";
function UserNav() {
  return (
    <div>
      <Link to={"/dashboard"}>
        <h4>Dashboard</h4>
      </Link>
      <Link to={"/yourboxes"}>
        <h4>Your Boxes</h4>
      </Link>
      <Link to={"/settings"}>
        <h4>Settings</h4>
      </Link>
    </div>
  );
}

export default UserNav;
