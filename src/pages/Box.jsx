import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBox } from "../api/boxes";
import NotFound from "../components/errors/NotFound";
import NewFeedback from "../components/NewFeedback";

function Box() {
  const navigate = useNavigate();
  const { boxid } = useParams();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["box"],
    queryFn: () => getBox(boxid),
  });

  //stale time or something? need to refetch after sometiem
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  console.log(data);
  return (
    <div>
      <button onClick={() => navigate(-1)}>Go Back</button>
      {!data?.length && (
        <NotFound message={"This box is not available right now."} />
      )}
      {data?.length && (
        <div>
          <div>
            <p>{data[0].user_name}</p>
            <p>{data[0].box_title}</p>
            <p>{data[0].box_description}</p>
            <p>
              {new Date(data[0].created).toLocaleString("en", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <NewFeedback boxId={data[0].box_id} />
          </div>
        </div>
      )}
      <div>
        {/* comment div // allow commenting if only the box is open and if the user
        opens it let him use the edit button */}
      </div>
    </div>
  );
}

export default Box;
