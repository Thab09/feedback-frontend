import { useForm } from "react-hook-form";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { createBox } from "../api/boxes";
import ToggleButton from "../components/ToggleButton";

function CreateBox() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createBoxMutation = useMutation({
    mutationFn: createBox,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
      navigate("/dashboard");
    },
  });

  const onSubmit = (data) => {
    createBoxMutation.mutate({
      userId: user.id,
      userName: user.fullName,
      boxTitle: data.boxTitle,
      boxDescription: data.boxDescription,
      boxOpen: data.boxOpen,
      boxPublic: data.boxPublic,
    });
    //load all the user's boxes
  };
  return (
    <div>
      <p>CreateBox</p>
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

export default CreateBox;
