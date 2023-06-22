import { UserButton } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { getAllBoxes } from "../api/boxes";
import NotFound from "../components/NotFound";

function UserDashboard() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["boxes"],
    queryFn: getAllBoxes,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <p>dashboard</p>
      <UserButton />

      {!data.length && <NotFound message={"There are no boxes."} />}
      {data.length &&
        data?.map((dat) => (
          <div key={dat.box_id}>
            <p>{dat.box_title}</p>
          </div>
        ))}
    </div>
  );
}

export default UserDashboard;
