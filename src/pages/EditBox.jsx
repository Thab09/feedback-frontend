import { useUser } from "@clerk/clerk-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getBox } from "../api/boxes";
import EditBoxForm from "../components/EditBoxForm";
import NotAuthorized from "../components/errors/NotAuthorized";
import NotFound from "../components/errors/NotFound";

function EditBox() {
  const params = useParams();
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["getbox"],
    queryFn: () => getBox(params.id),
  });

  queryClient.invalidateQueries({ queryKey: ["getbox"] });

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (!data.length)
    return (
      <NotFound message={`There are no boxes with the id: ${params.id}`} />
    );

  if (!user.id === data[0].user_id) return <NotAuthorized />;
  return (
    <>
      <EditBoxForm userId={user.id} box={data} />
    </>
  );
}

export default EditBox;
