import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getAllPublicBoxes } from "../api/boxes";
import NotFound from "../components/errors/NotFound";
function PublicBoxes() {
  const navigate = useNavigate();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["publicboxes"],
    queryFn: getAllPublicBoxes,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <div>
      <div>
        {!data.length && <NotFound message={"There are no public boxes."} />}
        {data.length &&
          data?.map((box) => (
            <div
              key={box.box_id}
              className="border-blue-500 flex gap-6 border border-solid"
              onClick={() => navigate(`/box/${box.box_id}`)}
            >
              <p>{box.box_title}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PublicBoxes;
