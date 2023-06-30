import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { updateBox } from "../api/boxes";
import ToggleButton from "../components/ToggleButton";

function EditBoxForm({ userId, box }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      boxTitle: box[0].box_title,
      boxDescription: box[0].box_description,
      boxOpen: box[0].box_open,
      boxPublic: box[0].box_public,
    },
  });

  const updateBoxMutation = useMutation({
    mutationFn: updateBox,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getbox"] });
      navigate("/dashboard");
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    updateBoxMutation.mutate({
      userId: userId,
      boxId: box[0].box_id,
      boxTitle: data.boxTitle,
      boxDescription: data.boxDescription,
      boxOpen: data.boxOpen,
      boxPublic: data.boxPublic,
    });
    //load all the user's boxes
  };
  return (
    <div>
      <p>Edit Box</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="boxTitle">Box Title</label>
        <input
          type="text"
          id="boxTitle"
          {...register("boxTitle", {
            required: "You can't sumbit an empty field!",
            minLength: {
              value: 5,
              message: "Box title should atleast have 5 characters!",
            },
            maxLength: {
              value: 500,
              message: "Box title have a limit of 500 characters!",
            },
          })}
        />
        <p>{errors.boxTitle?.message}</p>

        <label htmlFor="boxDescription">Box Description</label>
        <input
          type="text"
          id="boxDescription"
          {...register("boxDescription", {
            required: "You can't sumbit an empty field!",
            minLength: {
              value: 10,
              message: "Box description should atleast have 10 characters!",
            },
            maxLength: {
              value: 800,
              message: "Box description have a limit of 800 characters!",
            },
          })}
        />
        <p>{errors.boxDescription?.message}</p>

        <div>
          <span>Box Open</span>
          <label
            htmlFor="boxOpen"
            className="relative inline-flex cursor-pointer items-center"
          >
            <input
              id="boxOpen"
              type="checkbox"
              {...register("boxOpen")}
              className="peer sr-only"
            ></input>
            <ToggleButton />
          </label>
        </div>
        <div>
          <span>Public Box</span>
          <label
            htmlFor="boxPublic"
            className="relative inline-flex cursor-pointer items-center"
          >
            <input
              id="boxPublic"
              type="checkbox"
              {...register("boxPublic")}
              className="peer sr-only"
            ></input>
            <ToggleButton />
          </label>
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default EditBoxForm;
