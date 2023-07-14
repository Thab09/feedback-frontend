import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import { getUserBoxes } from "../api/boxes";
import NotFound from "../components/errors/NotFound";

import CreateBoxModal from "../components/modals/CreateBoxModal";
import EditBoxModal from "../components/modals/EditBoxModal";
import DeleteBoxModal from "../components/modals/DeleteBoxModal";

function UserDashboard() {
  const { user } = useUser();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["userboxes"],
    queryFn: () => getUserBoxes(user.id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  console.log(data);

  return (
    <div>
      <CreateBoxModal />
      <div>
        {!data.length && <NotFound message={"There are no boxes."} />}
        {data.length &&
          data?.map((box) => (
            <div
              key={box.box_id}
              className="border-blue-500 flex gap-3 border border-solid"
            >
              <p>{box.box_title}</p>
              <EditBoxModal box={box} />
              <DeleteBoxModal userId={user.id} boxId={box.box_id} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserDashboard;
