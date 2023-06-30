import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { getUserBoxes } from "../api/boxes";
import NotFound from "../components/errors/NotFound";
import MyDialog from "../components/MyDialog";

import CreateBoxModal from "../components/modals/CreateBoxModal";
import EditBoxModal from "../components/modals/EditBoxModal";

function UserDashboard() {
  const { user } = useUser();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["userboxes"],
    queryFn: () => getUserBoxes(user.id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div>
      <p>dashboard</p>
      <CreateBoxModal />

      {!data.length && <NotFound message={"There are no boxes."} />}
      {data.length &&
        data?.map((dat) => (
          <div
            key={dat.box_id}
            className="flex gap-3 border border-solid border-blue-500"
          >
            {console.log(dat)}
            <p>{dat.box_title}</p>
            <EditBoxModal box={dat} />
            <Link to={`/editbox/${dat.box_id}`}>Edit</Link>
            <MyDialog>Delete</MyDialog>
          </div>
        ))}
    </div>
  );
}

export default UserDashboard;
